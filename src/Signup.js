import React, { useState, forwardRef } from 'react';
import { Box, TextField, Button, Snackbar, Typography } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import { db, auth } from './backend/FirebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, sendEmailVerification  } from "firebase/auth";
import ScavengerListGlobal from './ScavengerListGlobal';
import MuiAlert from '@mui/material/Alert';

let user = {
    bucketlist: [],
    completed: [],
    scavengerlist: ScavengerListGlobal,
    group: "",
    email: "",
    miles: 0,
    user_points: 0,
    profile_picture: "",
    linked: false
}

const Signup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [severity, setSeverity] = useState('error');
    const navigate = useNavigate();

    const Alert = forwardRef((props, ref) => {
        return <MuiAlert ref={ref} elevation={6} variant="filled" {...props} />;
    });

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const showSnackbar = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        return <Navigate to="/home" />;
    }

    const handleUsernameChange = event => setEmail(event.target.value);
    const handlePasswordChange = event => setPassword((event.target.value));
    const handlePasswordConfirmChange = event => setPasswordConfirm((event.target.value));

    const handleSubmit = async event => {
        event.preventDefault();
        if (password !== passwordConfirm) {
            showSnackbar("Passwords do not match!");
            return;
        }
        await createUserWithEmailAndPassword(auth, email, password)
            .then(async (cred) => {
                // Send email verification
                await sendEmailVerification(cred.user).then(() => {
                    setSeverity('success');
                    showSnackbar("Successfully created account! Please check your email for verification.");
                }).catch(() => {
                    showSnackbar("An error occurred while sending the verification email. Please try again.");
                });
                await setDoc(doc(db, 'users', email), user);
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }).catch((error) => {
                if (error.code === 'auth/invalid-email' || error.code === 'auth/missing-email') {
                    showSnackbar("Please enter a valid email.");
                }
                else if (error.code === 'auth/email-already-in-use') {
                    showSnackbar("This email is already in use. Please sign up with a different email.");
                }
                else if (error.code === 'auth/weak-password' || password === '') {
                    showSnackbar("Please create a password that meets the specifications below.");
                }
                else {
                    showSnackbar("An unexpected error has occurred. Please reload and try again.");
                }
            });
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
                        <TextField
                            id="password-confirm"
                            label="Confirm Password"
                            type="password"
                            value={passwordConfirm}
                            onChange={handlePasswordConfirmChange}
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
            <Snackbar open={snackbarOpen} autoHideDuration={4500} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={severity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Signup;
