import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState(sessionStorage.getItem('username') || '');
    const navigate = useNavigate();
    const [users, setUsers] = useState(
        JSON.parse(localStorage.getItem('users')) || []
    );

    const handleUsernameChange = event => setUsername(event.target.value);

    const handleSubmit = event => {
        event.preventDefault();
        // Use username to authenticate the user
        // Redirect to main screen if login is successful
        // Display error message if login is unsuccessful
        if(users.includes(username)) {
            sessionStorage.setItem('isLoggedIn', true);
            navigate('/home', { state: { username } });
        }
        else {
            alert("This user does not exist")
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
                            value={username}
                            onChange={handleUsernameChange}
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
