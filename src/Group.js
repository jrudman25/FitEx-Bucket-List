import React, { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Navigate } from 'react-router-dom';
import { collection, query, where, addDoc, deleteDoc, doc, getDocs, updateDoc, getDoc } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { getFirestore } from "firebase/firestore";

const Group = () => {

    const firestore = getFirestore();
    const groupsRef = collection(firestore, "groups");
    const [groupMembers, setGroupMembers] = useState([]);
    const username = sessionStorage.getItem("username");
    const [open, setOpen] = useState(false);

    const [group, setGroup] = useState('');
    useEffect(() => {
        const fetchGroup = async () => {
            const userRef = doc(firestore, "users", username);
            const userData = await getDoc(userRef);
            if (userData.exists()) {
                setGroup(userData.data().group);
            }
        };
        if (username) {
            fetchGroup();
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
            alert("You're already in this group, invite your friends!");
            return;
        }
        else if (groupMembers.includes(invitee)) {
            alert("This user is already in the group.");
            return;
        }
        const userRef = doc(firestore, "users", invitee);
        const userData = await getDoc(userRef);
        if (userData.exists()) {
            if (userData.data().group) {
                alert("This user is already in a group, please have them leave it before inviting.");
                return;
            }
            sendInvite(invitee);
            alert("Invite sent!");
            setOpen(false);
        } else {
            alert("User not found.");
        }
    };

    const handleCreateGroup = async () => {
        const groupName = prompt("Enter group name:");
        if (groupName) {
            const existingGroup = await getDocs(query(groupsRef, where("name", "==", groupName)));
            if (!existingGroup.empty) {
                alert(`The group name '${groupName}' is already taken. Please choose a different name.`);
                return;
            }
            await addDoc(groupsRef, { name: groupName, members: [username], group_points: 0 });

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

    const sendInvite = async (invitee) => {
        const invitationsRef = collection(firestore, "invitations");
        const existingInvitation = await getDocs(query(invitationsRef, where("email", "==", invitee)));
        if (existingInvitation.empty) {
            await addDoc(invitationsRef, { email: invitee, from: username, groupName: group });
        } else {
            alert("This user has already been invited.");
        }
    };

    if (!(sessionStorage.getItem('isLoggedIn') === 'true')) {
        return <Navigate to="/" />;
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ width: '100%', maxWidth: 500 }}>
                <Typography variant="h3" sx={{ mb: 3 }} textAlign="center">
                    {group ? `You Are In: ${group}` : 'You Are Not In a Group'}
                </Typography>
                {group && (
                    <Typography variant="h5" textAlign="center" sx={{ mb: 4 }}>
                        Group points: {groupPoints}
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
                                <p>Enter the email of the member you want to add to your group</p>
                            </DialogContent>
                            <TextField autoFocus label="Email" type="email" variant="standard" id="invitee" />
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

export default Group
