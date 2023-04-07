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
    const [users, setUsers] = useState(
        JSON.parse(localStorage.getItem('users')) || []
    );

    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        return <Navigate to="/home" />;
    }

    const handleUsernameChange = event => setEmail(event.target.value);

    const handlePasswordChange = event => setPassword((event.target.value));

    function isAlphanumeric(str) {
        return /^[a-zA-Z0-9]+$/.test(str);
    }

    function validUser(name) {
        return (name.length >= 5 && isAlphanumeric(name));
    }

    const handleSubmit = async event => {
        event.preventDefault();
        await createUserWithEmailAndPassword(auth, email, password).then(async (cred) => {
            console.log(cred);
            user.email = email;
            await setDoc(doc(db, 'users', email), user);
            navigate('/questionnaire', {state : email});
        }).catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
                alert("This email is already in use. Please sign up with a different email.");
            }
            else {
                console.log(error.code);
            }
        })
        // if (!users.includes(email) && validUser(email)) {
        //     const updatedUsers = [...users, email];
        //     localStorage.setItem('users', JSON.stringify(updatedUsers));
        //     setUsers(updatedUsers);
        //     sessionStorage.setItem('email', email);
        //     navigate('/', { email: email });
        // }
        // else if(!validUser(email)) {
        //     alert('Invalid name!');
        // }
        // else {
        //     alert('Username already taken!');
        // }
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
                <Typography sx={{ marginTop: '1rem', marginBottom: '0.01rem' }}>
                    Usernames and Passwords must be:
                </Typography>
                <ul>
                    <li>At least 5 characters</li>
                    <li>Alphanumeric</li>
                    <li>Not already taken by another user</li>
                </ul>

            </Box>
        </div>
    );
};

export default Signup;
