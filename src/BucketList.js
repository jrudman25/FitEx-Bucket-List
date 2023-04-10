import React, { useState, useRef, useEffect, forwardRef } from "react";
import { Box, FormControl, Button, MenuItem, Select, InputLabel, FormHelperText, Dialog, DialogTitle,
    DialogContent, DialogActions, Card, CardContent, CardMedia, CardActions, Typography, Link, FormGroup,
    FormLabel, FormControlLabel, Checkbox, Snackbar } from '@mui/material';
import { Navigate } from 'react-router-dom';
import BucketListGlobal from "./BucketListGlobal";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import HikingRoundedIcon from '@mui/icons-material/HikingRounded';
import CameraEnhanceRoundedIcon from '@mui/icons-material/CameraEnhanceRounded';
import { db, auth, storage } from './backend/FirebaseConfig';
import { doc, getDoc, updateDoc, onSnapshot, arrayRemove, arrayUnion, increment } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import MuiAlert from '@mui/material/Alert';

const BucketList = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogContent, setDialogContent] = useState("");
    const [completedItems, setCompletedItems] = useState([]);
    const [value, setValue] = React.useState('hikes');
    const [latCurr, setLatCurr] = React.useState(null);
    const [lngCurr, setLngCurr] = React.useState(null);
    const [latPrev, setLatPrev] = React.useState(null);
    const [lngPrev, setLngPrev] = React.useState(null);
    const [id, setId] = React.useState(-1);
    const [distanceTravelled, setDistanceTravelled] = React.useState(0);
    const [started, setStarted] = useState(-1);
    const initRef = useRef(false);
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState({});
    const [userGroup, setUserGroup] = useState(null);
    const [acquiredData, setAcquiredData] = useState(false);
    const [openGroupDialog, setOpenGroupDialog] = useState(false);
    const [groupMembers, setGroupMembers] = useState([]);
    const [linked, setLinked] = useState(false);
    const [linkedDialog, setLinkedDialog] = useState(false);
    const [linkedDialogIndex, setLinkedDialogIndex] = useState(-1);
    const [checkScav, setCheckScav] = useState(false);
    const [isInGroup, setIsInGroup] = useState(false);
    const [loading, setLoading] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [severity, setSeverity] = useState('warning');

    const Alert2 = forwardRef((props, ref) => {
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

    //loads the necessary data from firebase into the webpage
    useEffect(() => {
        (async () => {
            const unsubscribe = onAuthStateChanged(auth, async (user) => {
                if (user) {
                    setUser(auth.currentUser);

                    let userRef = doc(db, 'users', auth.currentUser.email);
                    const userDoc = await getDoc(userRef);
                    let userDocClone = { ...userDoc.data() };
                    setUserData(userDocClone);

                    if (userDocClone.group) {
                        let groupRef = doc(db, 'groups', userDoc.data().group);
                        const groupDoc = await getDoc(groupRef);
                        let groupDocClone = { ...groupDoc.data() };
                        setUserGroup(groupDocClone);
                        setIsInGroup(true);

                        for (let i = 0; i < groupDocClone.members.length; i++) {
                            if (groupDocClone.members[i] !== auth.currentUser.email) {
                                setGroupMembers(groupMembers => [...groupMembers, { name: groupDocClone.members[i], bool: false }]);
                            }
                            if (i === groupDocClone.members.length - 1) {
                                setAcquiredData(true);
                            }
                        }
                    }

                    const unsub = onSnapshot(userRef, (userDoc) => {
                        setLinked(userDoc.data().linked);
                    });
                }
                // Set fetchingDone to true and setLoading to false after fetching process is completed
                setLoading(false);
            });

            return () => {
                // Unsubscribe from onAuthStateChanged when the component is unmounted
                unsubscribe();
            };
        })();
    }, []);


    //if linked changes then this function executes
    useEffect(() => {
        if (initRef.current && linked) {
            setLinkedDialog(true);
        }
        else {
            initRef.current = true;
        }
    }, [linked])

    if (!(sessionStorage.getItem('isLoggedIn') === 'true')) {
        return <Navigate to="/" />;
    }

    //opens the dialog for the necessary bucket list item
    const handleClick = (content) => {
        setOpenDialog(true);
        setDialogContent(content);
    };

    //opens the dialog to start a hike
    const handleStartDialog = (content) => {
        if (started === -1) {
            setOpenGroupDialog(true);
            setDialogContent(content);
        }
        else {
            setSeverity('warning');
            showSnackbar("You need to finish the hike you started before you start a new hike.");
        }
    };

    //adjusts the value for the checkbox in the start hike dialog
    const handleCheckboxChange = (name) => {
        for (let i = 0; i < groupMembers.length; i++) {
            if (groupMembers[i].name === name) {
                groupMembers[i].bool = !groupMembers[i].bool;
            }
        }
    };

    //changes the linked value for the desired group members that will be joining on the hike
    const checkGroupMembersLocation = async (index, from) => {
        setOpenGroupDialog(false);
        let userRef;
        for (let i = 0; i < groupMembers.length; i++) {
            if (groupMembers[i].bool) {
                userRef = doc(db, 'users', groupMembers[i].name);
                await updateDoc(userRef, { linked: true }).then(() => {
                    setSeverity("success")
                    showSnackbar("Group Member " + groupMembers[i].name + " will be notified shortly.");
                })
            }
        }

        handleStartHike(index, from);
    };

    //lets you close out the group dialog
    const cancelGroupDialog = () => {
        setOpenGroupDialog(false);

        for (let i = 0; i < groupMembers.length; i++) {
            groupMembers[i].bool = false;
        }
    }

    //sets the dialog index from the linked dialog
    const handleLinkedLabel = (event) => {
        setLinkedDialogIndex(event.target.value);
    }

    //allows the linked user to begin the hike
    const continueAsLinked = (index) => {
        if (started === -1 && index !== -1) {
            setLinkedDialog(false);
            handleStartHike(index, "all");
        }
        else if (index === -1) {
            setSeverity('warning');
            showSnackbar("Please select a hike to start.");
        }
        else {
            setSeverity('warning');
            showSnackbar("Please complete your current hike before starting another.");
        }
    }

    //closes the bucket list item dialog
    const handleClose = () => {
        setOpenDialog(false);
        setDialogContent("");
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    //if a hike is in the personal bucket list and is completed, then it is removed from
    //the personal bucket list and moved to the completed list
    const adjustBucketLists = async (index, from) => {
        let hike;
        if (from === "all") {
            hike = BucketListGlobal[index];
        }
        else {
            hike = userData.bucketlist[index]
        }
        let hike_name = hike.name;
        for (let i = 0; i < userData.bucketlist.length; i++) {
            if (hike_name === userData.bucketlist[i].name) {
                let temp = userData.bucketlist.splice(i, 1);
                userData.completed.push(temp[0]);
            }
        }

        let userRef = doc(db, 'users', user.email);
        await updateDoc(userRef, { bucketlist: userData.bucketlist, completed: userData.completed }).then(() => {
            console.log("Adjusted bucketlist!");
        });
    }

    //performs all the necessary functions when a hike is completed
    const handleComplete = async (index, from) => {
        let hike;
        if (from === "all") {
            hike = BucketListGlobal[index];
        }
        else {
            hike = userData.bucketlist[index];
        }
        if (started === index) {
            clearWatch();
            let userRef = doc(db, 'users', user.email);
            await updateDoc(userRef, {miles: increment(distanceTravelled)}).then(() => {
                console.log("Miles walked has been updated.")
            });
            await awardPoints(index, from);

            await adjustBucketLists(index, from);

            if (linked) {
                let userRef = doc(db, 'users', user.email);
                await updateDoc(userRef, { linked: false }).then(() => {
                    console.log("Changed linked back to false");
                });
            }

            for (let i = 0; i < groupMembers.length; i++) {
                groupMembers[i].bool = false;
            }

            setDistanceTravelled(0);
            setLatCurr(null);
            setLngCurr(null);
            setLatPrev(null);
            setLngPrev(null);
            setCompletedItems(completedItems => [...completedItems, hike]);
            setStarted(-1);
            setDialogContent("");
        }
        else {
            setSeverity('warning');
            showSnackbar("You need to start the hike to be able to complete it!");
        }
    }

    //allows user to refuse a link
    const rejectLinked = async () => {
        setLinkedDialog(false);

        let userRef = doc(db, 'users', user.email);
        await updateDoc(userRef, { linked: false }).then(() => {
            console.log("Link has been rejected.");
            setSeverity('warning');
            showSnackbar("You are no longer linked!");
        });
    }

    //clears the watch position which was established when the hike started
    const clearWatch = () => {
        setSeverity('warning');
        showSnackbar("We have stopped tracking your position.");
        navigator.geolocation.clearWatch(id);
    }

    //awards points to the user
    const awardPoints = async (index, from) => {
        let hike;
        if (from === "all") {
            hike = BucketListGlobal[index];
        }
        else {
            hike = userData.bucketlist[index];
        }
        let hike_distance = hike.length_distance;
        let hike_points = hike.points;
        let hike_difficulty = hike.difficulty;

        let earned_points_raw;
        let userRef = doc(db, 'users', user.email);
        let groupRef = doc(db, 'groups', userData.group);

        if (linked) {
            earned_points_raw = ((distanceTravelled / hike_distance) * hike_points);
            earned_points_raw = earned_points_raw + (earned_points_raw * 0.2);
            if (hike_difficulty === "EASY" && earned_points_raw > 6) {
                await updateDoc(userRef, {user_points: increment(6)}).then(() => {
                    console.log("Successfully awarded user " + String(6) + " points.");
                    setSeverity('success');
                    showSnackbar("You got " + String(6) + " points!");
                });
                await updateDoc(groupRef, {group_points: increment(6)}).then(() => {
                    console.log("Successfully awarded group " + String(6) + " points.");
                });
            }
            else if (hike_difficulty === "MODERATE" && earned_points_raw > 12) {
                await updateDoc(userRef, {user_points: increment(12)}).then(() => {
                    console.log("Successfully awarded user " + String(12) + " points.");
                    setSeverity('success');
                    showSnackbar("You got " + String(12) + " points!");
                });
                await updateDoc(groupRef, {group_points: increment(12)}).then(() => {
                    console.log("Successfully awarded group " + String(12) + " points.");
                });
            }
            else if (hike_difficulty === "HARD" && earned_points_raw > 18) {
                await updateDoc(userRef, {user_points: increment(18)}).then(() => {
                    console.log("Successfully awarded user " + String(18) + " points.");
                    setSeverity('success');
                    showSnackbar("You got " + String(18) + " points!");
                });
                await updateDoc(groupRef, {group_points: increment(18)}).then(() => {
                    console.log("Successfully awarded group " + String(18) + " points.");
                });
            }
            else {
                await updateDoc(userRef, {user_points: increment(earned_points_raw)}).then(() => {
                    console.log("Successfully awarded user " + String(earned_points_raw.toFixed(2)) + " points.");
                    setSeverity('success');
                    showSnackbar("You got " + String(earned_points_raw.toFixed(2)) + " points!");
                });
                await updateDoc(groupRef, {group_points: increment(earned_points_raw)}).then(() => {
                    console.log("Successfully awarded group " + String(earned_points_raw.toFixed(2)) + " points.");
                });
            }
        }
        else {
            earned_points_raw = (distanceTravelled / hike_distance) * hike_points;
            if (hike_difficulty === "EASY" && earned_points_raw > 5) {
                await updateDoc(userRef, {user_points: increment(5)}).then(() => {
                    console.log("Successfully awarded user " + String(5) + " points.");
                    setSeverity('success');
                    showSnackbar("You got " + String(5) + " points!");
                });
                await updateDoc(groupRef, {group_points: increment(5)}).then(() => {
                    console.log("Successfully awarded group " + String(5) + " points.");
                });
            }
            else if (hike_difficulty === "MODERATE" && earned_points_raw > 10) {
                await updateDoc(userRef, {user_points: increment(10)}).then(() => {
                    console.log("Successfully awarded user " + String(10) + " points.");
                    setSeverity('success');
                    showSnackbar("You got " + String(10) + " points!");
                });
                await updateDoc(groupRef, {group_points: increment(10)}).then(() => {
                    console.log("Successfully awarded group " + String(10) + " points.");
                });
            }
            else if (hike_difficulty === "HARD" && earned_points_raw > 15) {
                await updateDoc(userRef, {user_points: increment(15)}).then(() => {
                    console.log("Successfully awarded user " + String(15) + " points.");
                    setSeverity('success');
                    showSnackbar("You got " + String(15) + " points!");
                });
                await updateDoc(groupRef, {group_points: increment(15)}).then(() => {
                    console.log("Successfully awarded group " + String(15) + " points.");
                });
            }
            else {
                await updateDoc(userRef, {user_points: earned_points_raw}).then(() => {
                    console.log("Successfully awarded user " + String(earned_points_raw.toFixed(2)) + " points.");
                    setSeverity('success');
                    showSnackbar("You got " + String(earned_points_raw.toFixed(2)) + " points!");
                });
                await updateDoc(groupRef, {group_points: increment(earned_points_raw)}).then(() => {
                    console.log("Successfully awarded group " + String(earned_points_raw.toFixed(2)) + " points.");
                });
            }
        }
    };

    //checks if a hike is completed
    const isCompleted = (index) => {
        return completedItems.includes(BucketListGlobal[index]);
    }

    //starts a hike for the user
    const handleStartHike = (index, from) => {
        let hike;
        if (from === "hikes") {
            hike = userData.bucketlist[index];
        }
        else {
            hike = BucketListGlobal[index];
        }
        let hike_lat = hike.lat;
        let hike_lng = hike.lng;
        let dis_travelled = 0;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                setLatCurr(position.coords.latitude);
                setLngCurr(position.coords.longitude);
                let lat = position.coords.latitude;
                let lng = position.coords.longitude;
                let dis = distance(lat, lng, hike_lat, hike_lng);
                if (dis <= 0.1) {
                    alert("The hike has been started, we are tracking your position, do not turn your phone off or close out of the web page.");
                    setStarted(index);
                    setDialogContent(hike.name);
                    let x = navigator.geolocation.watchPosition((position) => {
                        setId(x);
                        setLatPrev(latCurr);
                        setLngPrev(lngCurr);
                        setLatCurr(position.coords.latitude);
                        setLngCurr(position.coords.longitude);
                        let lat_prev = lat;
                        let lng_prev = lng;
                        lat = position.coords.latitude;
                        lng = position.coords.longitude;
                        if (lat_prev != null && lng_prev != null) {
                            dis_travelled = dis_travelled + distance(lat_prev, lng_prev, lat, lng);
                            setDistanceTravelled(dis_travelled);
                        }

                    }, () => {
                        alert("Lost your position");
                    }, {
                        enableHighAccuracy: true
                    })
                }
                else {
                    setSeverity('warning');
                    showSnackbar("Please get closer to the beginning of the hike!");

                    if (linked) {
                        let userRef = doc(db, 'users', user.email);
                        await updateDoc(userRef, { linked: false }).then(() => {
                            console.log("Changed linked back to false");
                        });
                    }

                    for (let i = 0; i < groupMembers.length; i++) {
                        groupMembers[i].bool = false;
                    }
                }
            }, () => {
                setSeverity('error');
                showSnackbar("Couldn't get your coordinates");
            }, {
                enableHighAccuracy: true
            })
        }
        else {
            setSeverity('error');
            showSnackbar("Geolocation is not supported");
        }
    }

    //starts a hunt for a user
    const handleStartHunt = (index) => {
        let hunt = userData.scavengerlist[index];
        let hunt_lat = hunt.lat;
        let hunt_lng = hunt.lng;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLatCurr(position.coords.latitude);
                setLngCurr(position.coords.longitude);
                let lat = position.coords.latitude;
                let lng = position.coords.longitude;
                let dis = distance(lat, lng, hunt_lat, hunt_lng);
                if (dis <= 0.1) {
                    setDialogContent(hunt.name);
                    setCheckScav(true);
                }
                else {
                    setSeverity('warning');
                    showSnackbar("Please get closer to the hunt!");
                    setCheckScav(false);

                }
            }, () => {
                setSeverity('error');
                showSnackbar("Couldn't get your coordinates");
                setCheckScav(false);
            }, {
                enableHighAccuracy: true
            });
        }
        else {
            setSeverity('error');
            showSnackbar("Geolocation is not supported");
            setCheckScav(false);
        }
    }

    const cancelImageUpload = () => {
        setCheckScav(false);
        setDialogContent("");
    }

    //uploads an image to firebase storage
    const handleImageUpload = async (index, event) => {
        const file = event.target.files[0];
        if (file) {
            const imageRef = ref(storage, `images/${user.email}/${file.name}`);
            await uploadBytes(imageRef, file).then(async () => {
                await getDownloadURL(imageRef).then(async (url) => {
                    let temp = {...userData.scavengerlist[index] };
                    userData.scavengerlist[index].image = url;
                    userData.scavengerlist[index].found = true;

                    const userRef = doc(db, 'users', user.email);
                    await updateDoc(userRef, {
                        scavengerlist: arrayRemove(temp)
                    }).then(() => {
                        console.log("removed item from array");
                    });
                    await updateDoc(userRef, {
                        scavengerlist: arrayUnion(userData.scavengerlist[index])
                    }).then(async () => {
                        console.log("updated the image location!");
                        let userRef = doc(db, 'users', user.email);
                        await updateDoc(userRef, { user_points: increment(2) }).then(() => {
                            console.log("awarded the player 2 points!");
                            setSeverity('success');
                            showSnackbar("You got 2 points!");
                            setCheckScav(false);
                            setDialogContent("");

                        });

                        let groupRef = doc(db, 'groups', userData.group);
                        await updateDoc(groupRef, { group_points: increment(2) }).then(() => {
                            console.log("updated user points as well.")
                        })
                    });
                });
            });
        }
        else {
            setCheckScav(false);
        }
    }

    //calculates distance between two coordinates
    const distance = (lat1, lng1, lat2, lng2) => {
        let lat1_rad = lat1 * Math.PI / 180;
        let lng1_rad = lng1 * Math.PI / 180;
        let lat2_rad = lat2 * Math.PI / 180;
        let lng2_rad = lng2 * Math.PI / 180;

        let dlng = lng2_rad - lng1_rad;
        let dlat = lat2_rad - lat1_rad;

        let haversine = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1_rad) * Math.cos(lat2_rad) * Math.pow(Math.sin(dlng / 2), 2);

        let  c = 2 * Math.asin(Math.sqrt(haversine));

        return c * 3956;
    }

    return (
        <React.Fragment>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                    <Typography variant="h4">Loading...</Typography>
                </Box>
            ) : !isInGroup ? (
                <Typography align="center" variant="h6">
                    You must first create or join a group before viewing the bucket list.
                </Typography>
            ) : (
                <>
            <BottomNavigation sx={{ width: '100%', maxWidth: '500px', margin: '0 auto' }} value={value} onChange={handleChange}>
                <BottomNavigationAction
                    label="Your Hikes"
                    value="hikes"
                    icon={<HikingRoundedIcon />}
                />
                <BottomNavigationAction
                    label="Hunts"
                    value="hunt"
                    icon={<CameraEnhanceRoundedIcon />}
                />
                <BottomNavigationAction
                    label="All Hikes"
                    value="all"
                    icon={<FormatListBulletedRoundedIcon />}
                />
                <BottomNavigationAction
                    label="Completed"
                    value="completed"
                    icon={<DoneAllRoundedIcon />}
                />
            </BottomNavigation>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', minHeight: '100vh' }}>
                {value === 'all' && (
                    <Box>
                        {BucketListGlobal.map((item, index) => (
                            <React.Fragment key={item.name + "_all"}>
                                <Card sx={{ width: 350, maxWidth: 499 }} >
                                    <CardMedia
                                        sx={{ height: 140 }}
                                        component="img"
                                        image={item.image}
                                        alt="hike"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {item.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.difficulty}, {item.length_distance}mi, {item.length_time}min, {item.elevation_gain}ft
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.points} Points
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        {started === -1 && (
                                            <Button size="small" onClick={() => handleStartDialog(item.name)}>Start</Button>
                                        )}
                                        {started !== -1 && dialogContent === item.name && (
                                            <Button size="small" onClick={() => handleComplete(index, "all")}>Complete</Button>
                                        )}
                                        <Button size="small" onClick={() => handleClick(item.name)}>Learn More</Button>
                                    </CardActions>
                                </Card>
                                <Dialog open={openDialog && dialogContent === item.name} onClose={handleClose}>
                                    <DialogTitle>{item.name}</DialogTitle>
                                    <DialogContent>
                                        <Link href={item.link} target="_blank">Directions</Link>
                                        <p>Difficulty: {item.difficulty}</p>
                                        <p>Points: {item.points}</p>
                                        <p>Length (distance): {item.length_distance} miles</p>
                                        <p>Length (time): {item.length_time} minutes</p>
                                        <p>Elevation gain: {item.elevation_gain} feet</p>
                                        <p>Distance from campus: {item.distance_from_campus} miles</p>
                                        {item.bonus_quests.length > 0 && (
                                            <React.Fragment>
                                                <p>Bonus quests:</p>
                                                <ul>
                                                    {item.bonus_quests.map((quest, index) => (
                                                        <li key={String(index) + "_all"}>{quest}</li>
                                                    ))}
                                                </ul>
                                            </React.Fragment>
                                        )}
                                        {isCompleted(index) && (
                                            <p>Completed</p>
                                        )}
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose}>Close</Button>
                                    </DialogActions>
                                </Dialog>
                                <Dialog open={openGroupDialog && dialogContent === item.name}>
                                    <DialogTitle>Add Group Members for Extra Points?</DialogTitle>
                                    <DialogContent>
                                        <FormLabel component="legend">Members:</FormLabel>
                                        <FormGroup>
                                            {acquiredData && groupMembers.map((item) => (
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox onChange={() => handleCheckboxChange(item.name)} name={item.name}/>
                                                    }
                                                    key={item.name}
                                                    label={item.name}
                                                    sx={{ marginLeft: 2 }}
                                                />
                                            ))}
                                        </FormGroup>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button size="small" onClick={() => checkGroupMembersLocation(index, "all")}>Continue</Button>
                                        <Button size="small" onClick={() => cancelGroupDialog()}>Cancel</Button>
                                    </DialogActions>
                                </Dialog>
                                <p></p>
                            </React.Fragment>
                        ))}
                    </Box>
                )}
                {value === 'hunt' && (
                    <Box>
                        {acquiredData && userData.scavengerlist.map((item, index2) => (
                            <React.Fragment key={item.name + "_hunt"}>
                                <Card sx={{ width: 350, maxWidth: 499 }} >
                                    <CardMedia
                                        sx={{ height: 140 }}
                                        component="img"
                                        alt="scavenger hunt"
                                        image={item.image}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {item.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.points} Points
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        {!item.found && !checkScav && (
                                            <Button size="small" onClick={() => handleStartHunt(index2)}>Start</Button>
                                        )}
                                        {checkScav && dialogContent === item.name && (
                                            <div>
                                                <Button size="small" component="label">
                                                    Upload Picture
                                                    <input hidden id="myFile" type="file" accept="image/*" name="myFile" onChange={(e) => handleImageUpload(index2, e)}/>
                                                </Button>
                                                <Button size="small" onClick={cancelImageUpload}>Cancel</Button>
                                            </div>
                                        )}
                                        <Button size="small" onClick={() => handleClick(item.name)}>Learn More</Button>
                                    </CardActions>
                                </Card>
                                <Dialog open={openDialog && dialogContent === item.name} onClose={handleClose}>
                                    <DialogTitle>{item.name}</DialogTitle>
                                    <DialogContent>
                                        <p>Objective: {item.objective}</p>
                                        <p>Points: {item.points}</p>
                                        {isCompleted(item.name) && (
                                            <p>Completed</p>
                                        )}
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose}>Close</Button>
                                    </DialogActions>
                                </Dialog>
                                <p></p>
                            </React.Fragment>
                        ))}
                    </Box>
                )}
                {value === 'hikes' && (
                    <Box>
                        {acquiredData && userData.bucketlist.map((item, index3) => (
                            <React.Fragment key={item.name + "_hikes"}>
                                <Card sx={{ width: 350, maxWidth: 499 }} >
                                    <CardMedia
                                        sx={{ height: 140 }}
                                        component="img"
                                        image={item.image}
                                        alt="hike"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {item.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.difficulty}, {item.length_distance}mi, {item.length_time}min, {item.elevation_gain}ft
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.points} Points
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        {started === -1 && (
                                            <Button size="small" onClick={() => handleStartDialog(item.name)}>Start</Button>
                                        )}
                                        {started !== -1 && dialogContent === item.name && (
                                            <Button size="small" onClick={() => handleComplete(index3, "hikes")}>Complete</Button>
                                        )}
                                        <Button size="small" onClick={() => handleClick(item.name)}>Learn More</Button>
                                    </CardActions>
                                </Card>
                                <Dialog open={openDialog && dialogContent === item.name} onClose={handleClose}>
                                    <DialogTitle>{item.name}</DialogTitle>
                                    <DialogContent>
                                        <Link href={item.link} target="_blank">Directions</Link>
                                        <p>Difficulty: {item.difficulty}</p>
                                        <p>Points: {item.points}</p>
                                        <p>Length (distance): {item.length_distance} miles</p>
                                        <p>Length (time): {item.length_time} minutes</p>
                                        <p>Elevation gain: {item.elevation_gain} feet</p>
                                        <p>Distance from campus: {item.distance_from_campus} miles</p>
                                        {item.bonus_quests.length > 0 && (
                                            <React.Fragment>
                                                <p>Bonus quests:</p>
                                                <ul>
                                                    {item.bonus_quests.map((quest, index) => (
                                                        <li key={String(index) + "_hikes"}>{quest}</li>
                                                    ))}
                                                </ul>
                                            </React.Fragment>
                                        )}
                                        {isCompleted(index3) && (
                                            <p>Completed</p>
                                        )}
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose}>Close</Button>
                                    </DialogActions>
                                </Dialog>
                                <Dialog open={openGroupDialog && dialogContent === item.name}>
                                    <DialogTitle>Add Group Members for Extra Points?</DialogTitle>
                                    <DialogContent>
                                        <FormLabel component="legend">Members:</FormLabel>
                                        <FormGroup>
                                            {acquiredData && groupMembers.map((item) => (
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox onChange={() => handleCheckboxChange(item.name)} name={item.name}/>
                                                    }
                                                    key={item.name}
                                                    label={item.name}
                                                    sx={{ marginLeft: 2 }}
                                                />
                                            ))}
                                        </FormGroup>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button size="small" onClick={() => checkGroupMembersLocation(index3, "hikes")}>Continue</Button>
                                        <Button size="small" onClick={() => cancelGroupDialog()}>Cancel</Button>
                                    </DialogActions>
                                </Dialog>
                                <p></p>
                            </React.Fragment>
                        ))}
                    </Box>
                )}
                {value === 'completed' && (
                    <Box>
                        {acquiredData && userData.completed.map((item, index4) => (
                            <React.Fragment key={item.name + "_completed"}>
                                <Card sx={{ width: 350, maxWidth: 499 }} >
                                    <CardMedia
                                        sx={{ height: 140 }}
                                        component="img"
                                        image={item.image}
                                        alt="hike"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {item.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.difficulty}, {item.length_distance}mi, {item.length_time}min, {item.elevation_gain}ft
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.points} Points
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" onClick={() => handleClick(item.name)}>Learn More</Button>
                                    </CardActions>
                                </Card>
                                <Dialog open={openDialog && dialogContent === item.name} onClose={handleClose}>
                                    <DialogTitle>{item.name}</DialogTitle>
                                    <DialogContent>
                                        <Link href={item.link} target="_blank">Directions</Link>
                                        <p>Difficulty: {item.difficulty}</p>
                                        <p>Points: {item.points}</p>
                                        <p>Length (distance): {item.length_distance} miles</p>
                                        <p>Length (time): {item.length_time} minutes</p>
                                        <p>Elevation gain: {item.elevation_gain} feet</p>
                                        <p>Distance from campus: {item.distance_from_campus} miles</p>
                                        {item.bonus_quests.length > 0 && (
                                            <React.Fragment>
                                                <p>Bonus quests:</p>
                                                <ul>
                                                    {item.bonus_quests.map((quest, index) => (
                                                        <li key={String(index) + "_completed"}>{quest}</li>
                                                    ))}
                                                </ul>
                                            </React.Fragment>
                                        )}
                                        <p>Completed</p>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose}>Close</Button>
                                    </DialogActions>
                                </Dialog>
                                <p></p>
                            </React.Fragment>
                        ))}
                    </Box>
                )}
            </Box>
            <Dialog open={linkedDialog}>
                <DialogTitle>You have been linked to be in a hike!</DialogTitle>
                <DialogContent>
                    <FormControl>
                        <InputLabel id='linked-hike-dropdown'>Bucketlist</InputLabel>
                        <Select id='linked-hike-dropdown-helper' labelId='linked-hike-dropdown' onChange={handleLinkedLabel}>
                            {BucketListGlobal.map((item, index) => (
                                <MenuItem key={index} value={index}>{item.name}</MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>Please select the hike you are doing together!</FormHelperText>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button size="small" onClick={() => continueAsLinked(linkedDialogIndex)}>Select</Button>
                    <Button size="small" onClick={() => rejectLinked()}>Reject</Button>
                    <Button size="small" onClick={() => setLinkedDialog(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={snackbarOpen} autoHideDuration={4500} onClose={handleSnackbarClose}>
                <Alert2 onClose={handleSnackbarClose} severity={severity}>
                    {snackbarMessage}
                </Alert2>
            </Snackbar>
            </>
            )}
        </React.Fragment>
    );
};

export default BucketList;
