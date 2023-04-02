import React, { useState, useEffect } from "react";
import { Typography } from '@mui/material';
import defaultUser from './img/defaultUser.jpg';
import { useLocation, Navigate } from 'react-router-dom';
import './Home.css';

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
        </div>
    );
};

export default Home;
