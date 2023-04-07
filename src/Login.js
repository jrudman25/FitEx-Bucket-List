import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import { db, auth } from './backend/FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {

    const [email, setEmail] = useState(sessionStorage.getItem('username') || '');
    const [password, setPassword] = useState(sessionStorage.getItem('password') || '');
    const navigate = useNavigate();
    const [users, setUsers] = useState(
        JSON.parse(localStorage.getItem('users')) || []
    );

    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        return <Navigate to="/bucketlist" />;
    }

    const handleUsernameChange = event => setEmail(event.target.value);

    const handlePasswordChange = event => setPassword(event.target.value);

    const handleSubmit = async event => {
        event.preventDefault();
        await signInWithEmailAndPassword(auth, email, password).then((cred) => {
            console.log("success");
            navigate('/bucketlist', { state: { email } });
            console.log(cred);
            console.log(auth.currentUser);
        }).catch((error) => {
            if (error.code === 'auth/invalid-password') {
                alert("Invalid password!");
            }
            else {
                console.log(error.code);
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
                            label="Username"
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
