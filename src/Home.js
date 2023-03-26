import React, { useState, useEffect } from "react";
import { Typography } from '@mui/material';
import defaultUser from './img/defaultUser.jpg';
import './Home.css';

const Home = () => {
    const [image, setImage] = useState(sessionStorage.getItem('image') || defaultUser);
    useEffect(() => {
        if (!sessionStorage.getItem('image')) {
            setImage(defaultUser);
        }
    }, []);

    const [username, setUsername] = useState(sessionStorage.getItem('username') || '');
    useEffect(() => {
        setUsername(sessionStorage.getItem('username') || '');
    }, []);


    const handleImageUpload = (event) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const base64Image = e.target.result;
            sessionStorage.setItem('image', base64Image);
            setImage(base64Image);
        };
        reader.readAsDataURL(event.target.files[0]);
    }

    return (
        <div className="image-upload-container">
            <Typography variant="h4">Welcome{username ? `, ${username}` : ''}!</Typography>
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
    );
};

export default Home;
