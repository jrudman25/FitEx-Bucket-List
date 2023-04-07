import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import { db, auth } from './backend/FirebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from "firebase/auth";
import BucketListGlobal from './BucketListGlobal';
import ScavengerListGlobal from './ScavengerListGlobal';

let user = {
    bucketlist: BucketListGlobal,
    completed: [],
    scavengerlist: ScavengerListGlobal,
    group: "",
    email: "",
    user_points: 0,
    profile_picture: "",
    linked: false
}

const Signup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        return <Navigate to="/home" />;
    }

    const handleUsernameChange = event => setEmail(event.target.value);
    const handlePasswordChange = event => setPassword((event.target.value));

    const handleSubmit = async event => {
        event.preventDefault();
        await createUserWithEmailAndPassword(auth, email, password).then(async (cred) => {
            alert("Successfully created account!")
            user.email = email;
            await setDoc(doc(db, 'users', email), user);
            navigate('/home', {state : email});
        }).catch((error) => {
            console.log(error.code)
            if (error.code === 'auth/email-already-in-use') {
                alert("This email is already in use. Please sign up with a different email.");
            }
            else if(error.code === 'auth/weak-password') {
                alert("Please create a password that meets the specifications below.")
            }
            else {
                alert("An unexpected error has occurred. Please reload and try again.");
            }
        })
    };

    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minHeight: '100vh'
                }}
            >
                <h1>Sign-up</h1>
                <a href="/">
                    Already have an account?
                </a>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem' }}>
                        <TextField
                            id="username"
                            label="Email"
                            type="text"
                            value={email}
                            onChange={handleUsernameChange}
                            sx={{margin: 0.5}}
                        />
                        <TextField
                            id="password"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            sx={{margin: 0.5}}
                        />
                        <Button type="submit" variant="contained" sx={{ marginTop: '1rem' }}>
                            Submit
                        </Button>
                    </Box>
                </form>
                <Typography sx={{ marginTop: '1rem', marginBottom: '0.01rem' }}>
                    Account Creation Requirements:
                </Typography>
                <ul>
                    <li>Valid email</li>
                    <li>Email not already used</li>
                    <li>Password must be at least 6 characters</li>
                </ul>
            </Box>
        </div>
    );
};

export default Signup;
