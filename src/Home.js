import React, { useState } from "react";
import defaultUser from './img/defaultUser.jpg'
import './Home.css'

const Home = () => {

    const [image, setImage] = useState(defaultUser);
    const handleImageUpload = (event) => {
        setImage(URL.createObjectURL(event.target.files[0]));
    }

    return (
        <div className="image-upload-container">
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