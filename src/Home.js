import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent, CardHeader,
    CardMedia, Checkbox,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle, FormControlLabel, FormGroup, FormLabel, IconButton, Link,
    Typography
} from '@mui/material';
import defaultUser from './img/defaultUser.jpg';
import { useLocation, Navigate } from 'react-router-dom';
import './Home.css';
import BucketListGlobal from "./BucketListGlobal";
import {ChevronLeft, ChevronRight} from "@mui/icons-material";

const Home = () => {

    const location = useLocation();

    const [email, setEmail] = useState(sessionStorage.getItem('username') || '');
    useEffect(() => {
        if (location.state && location.state.username) {
            sessionStorage.setItem('username', location.state.username);
            setEmail(location.state.username);
        }
    }, [location.state]);

    const [image, setImage] = useState(getUserImage(email) || defaultUser);
    useEffect(() => {
        const userImages = JSON.parse(localStorage.getItem('userImages') || '{}');
        setImage(userImages[email] || defaultUser);
    }, [email]);

    const handleImageUpload = (event) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const base64Image = e.target.result;
            const userImages = JSON.parse(localStorage.getItem('userImages') || '{}');
            userImages[email] = base64Image;
            localStorage.setItem('userImages', JSON.stringify(userImages));
            setImage(base64Image);
        };
        reader.readAsDataURL(event.target.files[0]);
    }

    function getUserImage(username) {
        const userImages = JSON.parse(localStorage.getItem('userImages') || '{}');
        return userImages[username];
    }

    if (!(sessionStorage.getItem('isLoggedIn') === 'true')) {
        return <Navigate to="/" />;
    }

    const totalVal = localStorage.getItem('RecommenderVal');

    const easyHikes = BucketListGlobal.filter(hike => hike.difficulty === 'EASY');
    const moderateHikes = BucketListGlobal.filter(hike => hike.difficulty === 'MODERATE');
    const hardHikes = BucketListGlobal.filter(hike => hike.difficulty === 'HARD');



    return (
        <div>
            <div className="image-upload-container">
                <Typography variant="h4" sx={{ marginTop: '1rem', marginBottom: '1rem' }}>
                    Welcome{email ? `, ${email}` : ''}!
                </Typography>
                <label htmlFor="image-upload" className="image-upload-label">
                    <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: "none" }}
                    />
                    <img src={image} alt="Profile" className="profile-image" />
                </label>
            </div>
            <div className="link-container">
                <a href="/group" className="home-link">Group</a>
                <a href="/leaderboard" className="home-link">Leaderboard</a>
                <a href="/bucketlist" className="home-link">Bucket List</a>
            </div>

            <div className="link-container">
                <Typography variant="h5" sx={{ mt: 3 }} textAlign="center">
                    Recommended Hikes
                </Typography>

                {0 < totalVal <= 4 && (
                    {easyHikes.map((item, index) => (
                            <Card key={index}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={item.image}
                                    alt={item.name}
                                />
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        {item.name}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Points: {item.points}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Distance: {item.length_distance} miles
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}

                    )}

                {4 < totalVal <= 9 && (
                    {moderateHikes.map((item, index) => (
                            <Card key={index}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={item.image}
                                    alt={item.name}
                                />
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        {item.name}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Points: {item.points}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Distance: {item.length_distance} miles
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}

                )}
                {9 < totalVal <= 12 && (
                    {hardHikes.map((item, index) => (
                            <Card key={index}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={item.image}
                                    alt={item.name}
                                />
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        {item.name}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Points: {item.points}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Distance: {item.length_distance} miles
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}

                )}
            </div>
        </div>
    );
};

export default Home;
