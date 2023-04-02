import React, {useState, useRef, useEffect} from "react";
import { Box, FormControl, Button, MenuItem, Select, InputLabel, FormHelperText, Dialog, DialogTitle, DialogContent, DialogActions, Card, CardContent, CardMedia, CardActions, Typography, Link, FormGroup, FormLabel, FormControlLabel, Checkbox } from '@mui/material';
import { Navigate } from 'react-router-dom';
import BucketListGlobal from "./BucketListGlobal";
import ScavengerListGlobal from "./ScavengerListGlobal";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import HikingRoundedIcon from '@mui/icons-material/HikingRounded';
import CameraEnhanceRoundedIcon from '@mui/icons-material/CameraEnhanceRounded';
import { db, auth } from './backend/FirebaseConfig';
import { doc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged, fetchSignInMethodsForEmail } from "firebase/auth";

const BucketList = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogContent, setDialogContent] = useState("");
    const [completedItems, setCompletedItems] = useState([]);
    const [value, setValue] = React.useState('all');
    const [latCurr, setLatCurr] = React.useState(null);
    const [lngCurr, setLngCurr] = React.useState(null);
    const [latPrev, setLatPrev] = React.useState(null);
    const [lngPrev, setLngPrev] = React.useState(null);
    const [id, setId] = React.useState(-1);
    const [distanceTravelled, setDistanceTravelled] = React.useState(0);
    const [started, setStarted] = useState(-1);
    const inputFile = useRef(null);
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

    // const user = auth.currentUser;
    // const userData = null;
    //
    // let docRef = doc(db, 'users', user.email);
    // await getDoc(docRef).then((user) => {
    //     console.log(user);
    // });

    useEffect(() => {
        (async () => {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    setUser(auth.currentUser);

                    let userRef = doc(db, 'users', auth.currentUser.email);
                    await getDoc(userRef).then(async (userDoc) => {
                        setUserData(userDoc.data());

                        let groupRef = doc(db, 'groups', userDoc.data().group);
                        await getDoc(groupRef).then((groupDoc) => {
                            setUserGroup(groupDoc.data());
                            setAcquiredData(true);
                            for (let i = 0; i < groupDoc.data().members.length; i++) {
                                setGroupMembers(groupMembers => [...groupMembers, {name: groupDoc.data().members[i], bool: false}]);
                            }
                        })
                    });

                    const unsub = onSnapshot(userRef, (userDoc) => {
                        setLinked(userDoc.data().linked);
                    })
                }
            });
        })();

        return () => {};
    }, []);

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

    const handleClick = (content) => {
        setOpenDialog(true);
        setDialogContent(content);
    };

    const handleStartDialog = (content) => {
        if (started === -1) {
            setOpenGroupDialog(true);
            setDialogContent(content);
        }
        else {
            alert("You need to finish the hike you started before you start a new hike.");
        }
    };

    const handleCheckboxChange = (name) => {
        for (let i = 0; i < groupMembers.length; i++) {
            if (groupMembers[i].name === name) {
                groupMembers[i].bool = !groupMembers[i].bool;
            }
        }
    };

    const checkGroupMembersLocation = async (index) => {
        setOpenGroupDialog(false);
        let userRef;
        for (let i = 0; i < groupMembers.length; i++) {
            if (groupMembers[i].bool) {
                userRef = doc(db, 'users', groupMembers[i].name);
                await updateDoc(userRef, { linked: true }).then(() => {
                    alert("Group Member " + groupMembers[i].name + " will be notified shortly.");
                })
            }
        }

        handleStartHike(index);
    };

    const cancelGroupDialog = () => {
        setOpenGroupDialog(false);

        for (let i = 0; i < groupMembers.length; i++) {
            groupMembers[i].bool = false;
        }
    }

    const handleLinkedLabel = (event) => {
        setLinkedDialogIndex(event.target.value);
    }

    const continueAsLinked = (index) => {
        if (started === -1 && index !== -1) {
            setLinkedDialog(false);
            handleStartHike(index);
        }
        else if (index === -1) {
            alert("Please select a hike to start.");
        }
        else {
            alert("Please complete your current hike before starting another.");
        }

    }

    const handleClose = () => {
        setOpenDialog(false);
        setDialogContent("");
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleComplete = async (index) => {
        if (started === index) {
            clearWatch();
            await awardPoints(index);

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
            setCompletedItems(completedItems => [...completedItems, BucketListGlobal[index]]);
            setStarted(-1);
            setDialogContent("");
        }
        else {
            alert("You need to start the hike to be able to complete it!");
        }
    }

    const rejectLinked = async () => {
        setLinkedDialog(false);

        let userRef = doc(db, 'users', user.email);
        await updateDoc(userRef, { linked: false }).then(() => {
            console.log("Link has been rejected.");
        });
    }

    const clearWatch = () => {
        alert("We have stopped tracking your position");
        navigator.geolocation.clearWatch(id);
    }

    const awardPoints = async (index) => {
        let hike_distance = BucketListGlobal[index].length_distance;
        let hike_points = BucketListGlobal[index].points;
        let hike_difficulty = BucketListGlobal[index].difficulty;

        let earned_points_raw;

        if (linked) {
            earned_points_raw = ((distanceTravelled / hike_distance) * hike_points) * 0.2;
            if (hike_difficulty === "EASY" && earned_points_raw > 5) {
                let userRef = doc(db, 'users', user.email);
                await getDoc(userRef).then(async (userDoc) => {
                    let userPoints = userDoc.data().user_points + 1;

                    await updateDoc(userRef, {user_points: userPoints}).then(() => {
                        console.log("Successfully awared user " + String(userPoints) + " points.");
                    });
                })
            }
            else if (hike_difficulty === "MODERATE" && earned_points_raw > 10) {
                let userRef = doc(db, 'users', user.email);
                await getDoc(userRef).then(async (userDoc) => {
                    let userPoints = userDoc.data().user_points + 2;

                    await updateDoc(userRef, {user_points: userPoints}).then(() => {
                        console.log("Successfully awared user " + String(userPoints) + " points.");
                    });
                })
            }
            else if (hike_difficulty === "HARD" && earned_points_raw > 15) {
                let userRef = doc(db, 'users', user.email);
                await getDoc(userRef).then(async (userDoc) => {
                    let userPoints = userDoc.data().user_points + 3;

                    await updateDoc(userRef, {user_points: userPoints}).then(() => {
                        console.log("Successfully awared user " + String(userPoints) + " points.");
                    });
                })
            }
            else {
                let userRef = doc(db, 'users', user.email);
                await getDoc(userRef).then(async (userDoc) => {
                    let userPoints = userDoc.data().user_points + earned_points_raw;

                    await updateDoc(userRef, {user_points: userPoints}).then(() => {
                        console.log("Successfully awared user " + String(userPoints) + " points.");
                    });
                })
            }
        }
        else {
            earned_points_raw = (distanceTravelled / hike_distance) * hike_points;
            if (hike_difficulty === "EASY" && earned_points_raw > 5) {
                let userRef = doc(db, 'users', user.email);
                await getDoc(userRef).then(async (userDoc) => {
                    let userPoints = userDoc.data().user_points + 5;

                    await updateDoc(userRef, {user_points: userPoints}).then(() => {
                        console.log("Successfully awared user " + String(userPoints) + " points.");
                    });
                })
            }
            else if (hike_difficulty === "MODERATE" && earned_points_raw > 10) {
                let userRef = doc(db, 'users', user.email);
                await getDoc(userRef).then(async (userDoc) => {
                    let userPoints = userDoc.data().user_points + 10;

                    await updateDoc(userRef, {user_points: userPoints}).then(() => {
                        console.log("Successfully awared user " + String(userPoints) + " points.");
                    });
                })
            }
            else if (hike_difficulty === "HARD" && earned_points_raw > 15) {
                let userRef = doc(db, 'users', user.email);
                await getDoc(userRef).then(async (userDoc) => {
                    let userPoints = userDoc.data().user_points + 15;

                    await updateDoc(userRef, {user_points: userPoints}).then(() => {
                        console.log("Successfully awared user " + String(userPoints) + " points.");
                    });
                })
            }
            else {
                let userRef = doc(db, 'users', user.email);
                await getDoc(userRef).then(async (userDoc) => {
                    let userPoints = userDoc.data().user_points + earned_points_raw;

                    await updateDoc(userRef, {user_points: userPoints}).then(() => {
                        console.log("Successfully awared user " + String(userPoints) + " points.");
                    });
                })
            }
        }
    };


    const isCompleted = (index) => {
        return completedItems.includes(BucketListGlobal[index]);
    }

    const handleStartHike = (index) => {
        let hike = BucketListGlobal[index];
        let hike_lat = hike.lat;
        let hike_lng = hike.lng;
        let dis_travelled = 0;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLatCurr(position.coords.latitude);
                setLngCurr(position.coords.longitude);
                let lat = position.coords.latitude;
                let lng = position.coords.longitude;
                let dis = distance(lat, lng, hike_lat, hike_lng);
                alert(dis);
                if (dis <= 1) {
                    alert("The hike has been started, we are tracking your position, you may turn off your phone but do not exit the page.");
                    setStarted(index);
                    setDialogContent(BucketListGlobal[index].name);
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
                    alert("Please get closer to the beginning of the hike!");
                }
            }, () => {
                alert("Couldn't get your coordinates");
            }, {
                enableHighAccuracy: true
            })
        }
        else {
            alert("Geolocation is not supported");
        }
    }

    const handleStartHunt = (index) => {
        let hunt = ScavengerListGlobal[index];
        let hunt_lat = hunt.lat;
        let hunt_lng = hunt.lng;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLatCurr(position.coords.latitude);
                setLngCurr(position.coords.longitude);
                let lat = position.coords.latitude;
                let lng = position.coords.longitude;
                let dis = distance(lat, lng, hunt_lat, hunt_lng);
                if (dis <= 0.3) {
                    inputFile.current.click();
                }
                else {
                    alert("Please get closer to the hunt!");

                }
            }, () => {
                alert("Couldn't get your coordinates");
            }, {
                enableHighAccuracy: true
            });
        }
        else {
            alert("Geolocation is not supported");
        }
    }


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
            <BottomNavigation sx={{ width: '100%', maxWidth: '500px', margin: '0 auto' }} value={value} onChange={handleChange}>
                <BottomNavigationAction
                    label="All"
                    value="all"
                    icon={<FormatListBulletedRoundedIcon />}
                />
                <BottomNavigationAction
                    label="Hunt"
                    value="hunt"
                    icon={<CameraEnhanceRoundedIcon />}
                />
                <BottomNavigationAction
                    label="Hikes"
                    value="hikes"
                    icon={<HikingRoundedIcon />}
                />
                <BottomNavigationAction
                    label="Completed"
                    value="completed"
                    icon={<DoneAllRoundedIcon />}
                />
            </BottomNavigation>

            {value === 'all' && (
                <Box>
                    {BucketListGlobal.map((item, index) => (
                        <React.Fragment key={index}>
                            <Card sx={{ maxWidth: 499 }} >
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
                                        <Button size="small" onClick={() => handleComplete(index)}>Complete</Button>
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
                                                    <li key={index}>{quest}</li>
                                                ))}
                                            </ul>
                                        </React.Fragment>
                                    )}
                                    {!isCompleted(index) && (
                                        <Button variant="contained" onClick={() => handleComplete(index)}>Complete</Button>
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
                                        {acquiredData && userGroup.members.map((item, index) => (
                                            <FormControlLabel
                                                control={
                                                    <Checkbox onChange={() => handleCheckboxChange(item)} name={item}/>
                                                }
                                                label={item}
                                                key={item}
                                                sx={{ marginLeft: 2 }}
                                            />
                                        ))}
                                    </FormGroup>
                                </DialogContent>
                                <DialogActions>
                                    <Button size="small" onClick={() => checkGroupMembersLocation(index)}>Continue</Button>
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
                    {ScavengerListGlobal.map((item, index2) => (
                        <React.Fragment key={index2}>
                            <Card sx={{ maxWidth: 499 }} >
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
                                    <Button size="small" onClick={() => handleStartHunt(index2)}>
                                        Upload Picture
                                        <input hidden accept="image/*" multiple type="file" ref={inputFile}/>
                                    </Button>
                                    <Button size="small" onClick={() => handleClick(item.name)}>Learn More</Button>
                                </CardActions>
                            </Card>
                            <Dialog open={openDialog && dialogContent === item.name} onClose={handleClose}>
                                <DialogTitle>{item.name}</DialogTitle>
                                <DialogContent>
                                    <p>Objective: {item.objective}</p>
                                    <p>Points: {item.points}</p>
                                    {!isCompleted(item.name) && (
                                        <Button variant="contained" onClick={() => handleComplete(item.name)}>Complete</Button>
                                    )}
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
                <Card sx={{ maxWidth: 499 }}>
                    <CardMedia
                        component="img"
                        alt="hike"
                        height="140"
                        image=""
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Hike 1
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Description for hike 1
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Start</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            )}
            {value === 'completed' && (
                <Box>
                    {completedItems.map((item, index3) => (
                        <React.Fragment>
                            <Card sx={{ maxWidth: 499 }} >
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
                                                    <li key={index}>{quest}</li>
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
            <Dialog open={linkedDialog}>
                <DialogTitle>You have been linked to be in a hike!</DialogTitle>
                <DialogContent>
                    <FormControl>
                        <InputLabel id='linked-hike-dropdown'>Bucketlist</InputLabel>
                        <Select id='linked-hike-dropdown-helper' labelId='linked-hike-dropdown' onChange={handleLinkedLabel}>
                            {BucketListGlobal.map((item, index) => (
                                <MenuItem value={index}>{item.name}</MenuItem>
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
        </React.Fragment>

    );
};

export default BucketList;
