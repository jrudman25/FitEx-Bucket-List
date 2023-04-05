import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia, Checkbox,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle, FormControlLabel, FormGroup, FormLabel, Link,
    Typography
} from '@mui/material';
import defaultUser from './img/defaultUser.jpg';
import { useLocation, Navigate } from 'react-router-dom';
import './Home.css';
import BucketListGlobal from "./BucketListGlobal";

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

                {0 < totalVal < 4 && (
                    {BucketListGlobal.map((item) => (
                            <React.Fragment key={item.name + "_all"}>
                                <Card sx={{ maxWidth: 499 }} >
                                    <CardMedia
                                        sx={{ height: 140 }}
                                        component="img"
                                        image={item.image}
                                        alt="hike"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {item.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.difficulty}, {item.length_distance}mi, {item.length_time}min, {item.elevation_gain}ft
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.points} Points
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </React.Fragment>
                        ))}
                )}
            </div>
        </div>
    );
};

export default Home;
