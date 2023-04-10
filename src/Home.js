import React, { useState, useEffect } from "react";
import { Button, Box, Card, CardContent, CardMedia, CircularProgress, Typography } from '@mui/material';
import defaultUser from './img/defaultUser.jpg';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { getFirestore, doc, updateDoc, deleteDoc, arrayUnion } from "firebase/firestore";
import { collection, query, where, getDocs, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import BucketListGlobal from "./BucketListGlobal";
import './Home.css';

function useUserInvitation(username) {
    const firestore = getFirestore();

    const [invitationData, setInvitationData] = useState(null);
    useEffect(() => {
        const fetchInvitation = async () => {
            const invitationsRef = collection(firestore, "invitations");
            const invitationQuery = query(invitationsRef, where("email", "==", username));
            const invitationSnapshot = await getDocs(invitationQuery);
            if (!invitationSnapshot.empty) {
                const invitationDoc = invitationSnapshot.docs[0];
                setInvitationData({ ...invitationDoc.data(), id: invitationDoc.id });
            }
        };
        fetchInvitation();
    }, [username, firestore]);

    const clearInvitation = () => {
        setInvitationData(null);
    };

    return [invitationData, clearInvitation];
}

const Home = () => {

    const firestore = getFirestore();
    const navigate = useNavigate();

    const username = sessionStorage.getItem('username');
    const user = username.substring(0, username.lastIndexOf('@'));
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState(getUserImage(username) || defaultUser);
    const [isUserInGroup, setIsUserInGroup] = useState(false);
    useEffect(() => {
        const fetchUserData = async () => {
            const userRef = doc(firestore, "users", username);
            const userSnapshot = await getDoc(userRef);
            if (userSnapshot.exists()) {
                const userData = userSnapshot.data();
                setIsUserInGroup(!!userData.group);
                setUserPoints(userData.user_points || 0);
                setUserMiles(userData.miles || 0);
            }
        };
        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchUserImage = async () => {
            const imageUrl = await getUserImage(username);
            setImage(imageUrl || defaultUser);
            setLoading(false);
        };
        fetchUserImage();
    }, [username]);

    const [invitation, clearInvitation] = useUserInvitation(username);
    const [userPoints, setUserPoints] = useState(0);
    const [userMiles, setUserMiles] = useState(0);


    const [hasDeclinedInvite, setHasDeclinedInvite] = useState(false);
    useEffect(() => {
        if (hasDeclinedInvite) {
            clearInvitation();
        }
    }, [hasDeclinedInvite, clearInvitation]);

    const [hasJoinedGroup, setHasJoinedGroup] = useState(false);
    useEffect(() => {
        if (hasJoinedGroup) {
            clearInvitation();
            navigate('/group', { state: { username } });
        }
    }, [hasJoinedGroup, clearInvitation, navigate, username]);

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        const storage = getStorage();
        const storageRef = ref(storage, `profile_pictures/${username}`);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            null, // Removed the error handler from state_changed
            (error) => {
                console.error("Error uploading image:", error);
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

                // Update the user's profile_picture in Firestore
                const userRef = doc(firestore, "users", username);
                await updateDoc(userRef, {
                    profile_picture: downloadURL
                });

                setImage(downloadURL);
            }
        );
    };

    async function getUserImage(username) {
        const userRef = doc(firestore, "users", username);
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
            return userSnapshot.data().profile_picture;
        }
        return null;
    }

    function handleClick(event) {
        event.preventDefault();
        navigate('/group', { state: { username } });
    }

    const acceptInvite = async () => {
        // Update user's group in Firestore
        const userRef = doc(firestore, "users", username);
        await updateDoc(userRef, {
            group: invitation.groupName
        });

        // Find the group document
        const groupsRef = collection(firestore, "groups");
        const groupQuery = query(groupsRef, where("name", "==", invitation.groupName));
        const groupSnapshot = await getDocs(groupQuery);

        if (!groupSnapshot.empty) {
            const groupDoc = groupSnapshot.docs[0];

            // Update group's member list in Firestore
            const groupRef = doc(firestore, "groups", groupDoc.id);
            await updateDoc(groupRef, {
                members: arrayUnion(username)
            });
            // Delete the invitation document
            const invitationDoc = doc(firestore, "invitations", invitation.id);
            await deleteDoc(invitationDoc);
        } else {
            console.error("Error: group document not found");
        }
        clearInvitation();
        setHasJoinedGroup(true);
    };

    const declineInvite = async () => {
        const invitationsRef = collection(firestore, "invitations");
        const invitationQuery = query(invitationsRef, where("email", "==", username));
        const invitationSnapshot = await getDocs(invitationQuery);
        if (!invitationSnapshot.empty) {
            const invitationDoc = invitationSnapshot.docs[0];
            await deleteDoc(doc(invitationsRef, invitationDoc.id));
        }
        clearInvitation();
        setHasDeclinedInvite(true);
    };

    const randomIntFromInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const randomHike = BucketListGlobal[randomIntFromInterval(0, BucketListGlobal.length - 1)];

    if (!(sessionStorage.getItem('isLoggedIn') === 'true')) {
        return <Navigate to="/" />;
    }

    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minHeight: '100vh',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                    }}
                >
                    <CircularProgress />
                </Box>
            </Box>
        );
    }

    return (
        <div>
            <div className="image-upload-container">
                <Typography variant="h4" sx={{ marginTop: '1rem', marginBottom: '1rem' }}>
                    Welcome{user ? `, ${user}` : ''}!
                </Typography>
                <label htmlFor="image-upload" className="image-upload-label">
                    <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: "none" }}
                    />
                    <img src={image} alt="Profile" className="profile-image" />
                </label>
                <Typography variant="h6" sx={{ marginTop: '0.75rem' }}>
                    Your Points: {userPoints.toFixed(2)}
                </Typography>
                <Typography variant="h6" sx={{ marginTop: '0.75rem' }}>
                    You've hiked: {userMiles.toFixed(2)} miles
                </Typography>
            </div>
            {invitation && (
                <div className="invitation-container">
                    <Typography variant="h6">
                        You have been invited to join group {invitation.groupName} by {invitation.from}.
                    </Typography>
                    <div className="invitation-buttons">
                        <Button variant="contained" color="primary" onClick={acceptInvite}>
                            Accept
                        </Button>
                        <Button variant="contained" color="secondary" onClick={declineInvite}>
                            Decline
                        </Button>
                    </div>
                </div>
            )}
            <div className="link-container">
                <a href="/group" className="home-link" onClick={handleClick}>Group</a>
                <a href="/leaderboard" className="home-link">Leaderboard</a>
                <a href="/bucketlist" className="home-link">Bucket List</a>
            </div>
            <div className="link-container">
                {isUserInGroup ? (
                    <div className="recommendation-container">
                        <Link to="/bucketlist" style={{ textDecoration: 'none' }}>
                            <Card key="recommendedHike" sx={{ width: 350, maxWidth: 499 }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    width="300"
                                    image={randomHike.image}
                                    alt={randomHike.name}
                                />
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        {randomHike.name}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Points: {randomHike.points}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Distance: {randomHike.length_distance} miles
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Recommended for you!
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>
                ) : (
                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',  textAlign: 'center'}}>
                        <Typography variant="h6" sx={{ marginTop: '1rem', marginBottom: '1rem' }}>
                            Please join a group to get a recommended hike here!
                        </Typography>
                    </Box>
                )}
            </div>
        </div>
    );
};

export default Home;
