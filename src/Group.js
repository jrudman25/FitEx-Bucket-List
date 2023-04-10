import React, { useState, useEffect, forwardRef } from "react";
import Typography from '@mui/material/Typography';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Snackbar } from "@mui/material";
import { Navigate } from 'react-router-dom';
import { collection, query, where, addDoc, deleteDoc, doc, getDocs, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { getFirestore } from "firebase/firestore";
import MuiAlert from '@mui/material/Alert';

const Group = () => {

    const firestore = getFirestore();
    const [loading, setLoading] = useState(true);
    const groupsRef = collection(firestore, "groups");
    const [groupMembers, setGroupMembers] = useState([]);
    const username = sessionStorage.getItem("username");
    const [open, setOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [severity, setSeverity] = useState('warning');

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

    const [group, setGroup] = useState('');
    useEffect(() => {
        const fetchGroup = async () => {
            const userRef = doc(firestore, "users", username);
            const userData = await getDoc(userRef);
            if (userData.exists()) {
                setGroup(userData.data().group);
            }
            // Set loading to false once data is fetched
            setLoading(false);
        };
        if (username) {
            fetchGroup();
        } else {
            setLoading(false);
        }
    }, [username, firestore]);

    const groupQuery = query(groupsRef, where("name", "==", group));
    const [groupData] = useCollectionData(groupQuery, { idField: "groupDoc.id" });
    useEffect(() => {
        if (groupData && groupData[0]) {
            setGroupMembers(groupData[0].members);
        } else {
            setGroupMembers([]);
        }
    }, [groupData]);

    const [groupPoints, setGroupPoints] = useState(0);
    useEffect(() => {
        if (groupData && groupData[0]) {
            setGroupMembers(groupData[0].members);
            setGroupPoints(groupData[0].group_points);
        } else {
            setGroupMembers([]);
            setGroupPoints(0);
        }
    }, [groupData]);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleInvite = async () => {
        const invitee = document.getElementById("invitee").value;
        if (invitee === username) {
            showSnackbar("You're already in this group, invite your friends!");
            return;
        }
        else if (groupMembers.includes(invitee)) {
            showSnackbar("This user is already in the group.");
            return;
        }
        const userRef = doc(firestore, "users", invitee);
        const userData = await getDoc(userRef);
        if (userData.exists()) {
            if (userData.data().group) {
                showSnackbar("This user is already in a group, please have them leave it before inviting.");
                return;
            }
            const invitationsRef = collection(firestore, "invitations");
            const existingInvitation = await getDocs(query(invitationsRef, where("email", "==", invitee)));
            if (existingInvitation.empty) {
                await addDoc(invitationsRef, { email: invitee, from: username, groupName: group });
                setSeverity("success")
                showSnackbar("Invite sent!");
            }
            else {
                showSnackbar("This user has already been invited.");
            }
            setOpen(false);
        }
        else {
            showSnackbar("User not found.");
        }
    };

    const handleCreateGroup = async () => {
        const groupName = prompt("Enter group name:");
        if (groupName) {
            const existingGroup = await getDocs(query(groupsRef, where("name", "==", groupName)));
            if (!existingGroup.empty) {
                showSnackbar(`The group name '${groupName}' is already taken. Please choose a different name.`);
                return;
            }
            await setDoc(doc(groupsRef, groupName), { name: groupName, members: [username], group_points: 0 });

            // Update the user's group in Firebase
            const userRef = doc(firestore, "users", username);
            await updateDoc(userRef, { group: groupName });

            setGroup(groupName);
        }
    };

    const handleLeaveGroup = async () => {
        if (group) {
            const groupDocs = await getDocs(query(groupsRef, where("name", "==", group)));

            if (!groupDocs.empty) {
                const groupDoc = groupDocs.docs[0];
                const groupDocRef = doc(firestore, "groups", groupDoc.id);

                const updatedMembers = groupDoc.data().members.filter(member => member !== username);
                if (updatedMembers.length > 0) {
                    await updateDoc(groupDocRef, { members: updatedMembers });
                } else {
                    await deleteDoc(groupDocRef);
                }

                // Update the user's group in Firebase
                const userRef = doc(firestore, "users", username);
                await updateDoc(userRef, { group: "" });
                setGroup("");
            } else {
                console.error("Error: group document not found");
            }
        }
    };

    if (!(sessionStorage.getItem('isLoggedIn') === 'true')) {
        return <Navigate to="/" />;
    }

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <Typography variant="h4">Loading...</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ width: '100%', maxWidth: 500 }}>
                <Typography variant="h3" sx={{ mb: 3 }} textAlign="center">
                    {group ? `You Are In: ${group}` : 'You Are Not In a Group'}
                </Typography>
                {group && (
                    <Typography variant="h5" textAlign="center" sx={{ mb: 4 }}>
                        Group points: {groupPoints.toFixed(2)}
                    </Typography>
                )}
                {group && (
                    <>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
                            <Typography variant="h6" sx={{ mb: 1 }} textAlign="center">
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
                                <p>Enter the email of the member you want to add to your group.</p>
                            </DialogContent>
                            <TextField autoFocus label="Email" type="email" variant="standard" id="invitee" sx={{ margin: 2}}/>
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
            <Snackbar open={snackbarOpen} autoHideDuration={4500} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={severity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Group
