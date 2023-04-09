import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import { auth } from './backend/FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        return <Navigate to="/bucketlist" />;
    }

    const handleUsernameChange = event => setEmail(event.target.value);
    const handlePasswordChange = event => setPassword(event.target.value);

    const handleSubmit = async event => {
        event.preventDefault();
        await signInWithEmailAndPassword(auth, email, password).then(() => {
            navigate('/home');
            sessionStorage.setItem('username', email);
            sessionStorage.setItem('isLoggedIn', true);
        }).catch((error) => {
            if (error.code === 'auth/invalid-email') {
                alert("Please log in with a valid email");
            }
            else if (error.code === 'auth/user-not-found') {
                alert("User not found");
            }
            else if (password === '' || error.code === 'auth/wrong-password') {
                alert("Incorrect password");
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
                <h1>Log in</h1>
                <a href="/signup">
                    Don't have an account?
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
            </Box>
        </div>
    );
};

export default Login;
