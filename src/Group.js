import React, { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Navigate, useLocation } from 'react-router-dom';

const Group = () => {
    const location = useLocation();

    const [username, setUsername] = useState(sessionStorage.getItem('username') || '');
    useEffect(() => {
        if (location.state && location.state.username) {
            sessionStorage.setItem('username', location.state.username);
            setUsername(location.state.username);
        }
    }, [location.state]);

    const [open, setOpen] = useState(false);
    const [group, setGroup] = useState(getGroup(username) || '');
    useEffect(() => {
        const userGroup = JSON.parse(localStorage.getItem('userGroup') || '{}');
        setGroup(userGroup[username] || '');
    }, [username]);

    const [groupMembers, setGroupMembers] = useState([]);
    useEffect(() => {
        const userGroup = JSON.parse(localStorage.getItem('userGroup') || '{}');
        const members = Object.keys(userGroup).filter(key => userGroup[key] === group);
        setGroupMembers(members);
    }, [group]);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleInvite = () => {
        setOpen(false);
    };

    function getGroup(username) {
        const userGroup = JSON.parse(localStorage.getItem('userGroup') || '{}');
        return userGroup[username];
    }

    const handleCreateGroup = () => {
        const groupName = prompt('Enter group name:');
        if (groupName) {
            const userGroup = JSON.parse(localStorage.getItem('userGroup') || '{}');
            userGroup[username] = groupName;
            localStorage.setItem('userGroup', JSON.stringify(userGroup));
            setGroup(groupName);
        }
    };

    const handleLeaveGroup = () => {
        const userGroup = JSON.parse(localStorage.getItem('userGroup') || '{}');
        delete userGroup[username];
        localStorage.setItem('userGroup', JSON.stringify(userGroup));
        setGroup('');
    };

    if (!(sessionStorage.getItem('isLoggedIn') === 'true')) {
        return <Navigate to="/" />;
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ width: '100%', maxWidth: 500 }}>
                <Typography variant="h2" sx={{ mb: 3 }} textAlign="center">
                    {group ? `You Are In ${group}` : 'You Are Not In a Group'}
                </Typography>
                {group && (
                    <>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
                            <Typography variant="h5" sx={{ mb: 2 }} textAlign="center">
                                Members
                            </Typography>
                            {groupMembers.map((member, index) => (
                                <Box key={index} sx={{ my: 1 }}>
                                    <Typography>{member}</Typography>
                                </Box>
                            ))}
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                <Button variant="contained" onClick={handleOpen} sx={{ mr: 7 }}>
                                    Invite Members
                                </Button>
                                <Button variant="contained" onClick={handleLeaveGroup}>
                                    Leave Group
                                </Button>
                            </Box>
                        </Box>
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>Invite Members</DialogTitle>
                            <DialogContent>
                                <p>Enter the username of the member you want to add to your group</p>
                            </DialogContent>
                            <TextField autoFocus label="Username" type="email" variant="standard" />
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={handleInvite}>Invite</Button>
                            </DialogActions>
                        </Dialog>
                    </>
                )}
                {!group && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Button variant="contained" onClick={handleCreateGroup}>
                            Create Group
                        </Button>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default Group;
