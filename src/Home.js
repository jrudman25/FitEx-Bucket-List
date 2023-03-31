import React, { useState, useEffect } from "react";
import { Typography } from '@mui/material';
import defaultUser from './img/defaultUser.jpg';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [username, setUsername] = useState(sessionStorage.getItem('username') || '');
    useEffect(() => {
        if (location.state && location.state.username) {
            sessionStorage.setItem('username', location.state.username);
            setUsername(location.state.username);
        }
    }, [location.state]);

    const [image, setImage] = useState(getUserImage(username) || defaultUser);
    useEffect(() => {
        const userImages = JSON.parse(localStorage.getItem('userImages') || '{}');
        setImage(userImages[username] || defaultUser);
    }, [username]);

    const handleImageUpload = (event) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const base64Image = e.target.result;
            const userImages = JSON.parse(localStorage.getItem('userImages') || '{}');
            userImages[username] = base64Image;
            localStorage.setItem('userImages', JSON.stringify(userImages));
            setImage(base64Image);
        };
        reader.readAsDataURL(event.target.files[0]);
    }

    function getUserImage(username) {
        const userImages = JSON.parse(localStorage.getItem('userImages') || '{}');
        return userImages[username];
    }

    function handleClick(event) {
        event.preventDefault();
        navigate('/group', { state: { username } });
    }

    if (!(sessionStorage.getItem('isLoggedIn') === 'true')) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <div className="image-upload-container">
                <Typography variant="h4" sx={{ marginTop: '1rem', marginBottom: '1rem' }}>
                    Welcome{username ? `, ${username}` : ''}!
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
                <a href="/group" className="home-link" onClick={handleClick}>Group</a>
                <a href="/leaderboard" className="home-link">Leaderboard</a>
                <a href="/bucketlist" className="home-link">Bucket List</a>
            </div>
        </div>
    );
};

export default Home;
