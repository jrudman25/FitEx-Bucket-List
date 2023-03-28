import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState(sessionStorage.getItem('username') || '');
    const navigate = useNavigate();
    const [users, setUsers] = useState(
        JSON.parse(localStorage.getItem('users')) || []
    );

    const handleUsernameChange = event => setUsername(event.target.value);

    function isAlphanumeric(str) {
        return /^[a-zA-Z0-9]+$/.test(str);
    }

    function validUser(name) {
        return (name.length >= 5 && isAlphanumeric(name));
    }

    const handleSubmit = event => {
        event.preventDefault();
        if (!users.includes(username) && validUser(username)) {
            const updatedUsers = [...users, username];
            localStorage.setItem('users', JSON.stringify(updatedUsers));
            setUsers(updatedUsers);
            sessionStorage.setItem('username', username);
            navigate('/', { username: username });
        }
        else if(!validUser(username)) {
            alert('Invalid name!');
        }
        else {
            alert('Username already taken!');
        }
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
                            value={username}
                            onChange={handleUsernameChange}
                        />
                        <Button type="submit" variant="contained" sx={{ marginTop: '1rem' }}>
                            Submit
                        </Button>
                    </Box>
                </form>
                <Typography sx={{ marginTop: '1rem', marginBottom: '0.01rem' }}>
                    Username must be:
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
