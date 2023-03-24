import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

const Login = () => {
    const [username, setUsername] = useState('');

    const handleUsernameChange = event => setUsername(event.target.value);

    const handleSubmit = event => {
        event.preventDefault();
        // Use username to authenticate the user
        // Redirect to main screen if login is successful
        // Display error message if login is unsuccessful
        alert("login attempted with username: " + username)
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
                <h1>Sign in</h1>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <TextField
                            id="username"
                            label="Username"
                            type="text"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                        <Button type="submit" variant="contained" sx={{ marginTop: '1rem' }}>
                            Login
                        </Button>
                    </Box>
                </form>
            </Box>
        </div>
    );
};

export default Login;
