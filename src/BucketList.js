import React, {useState, useEffect} from "react";
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Card, CardContent, CardMedia, CardActions, Typography, Link } from '@mui/material';
import BucketListGlobal from "./BucketListGlobal";
import ScavengerListGlobal from "./ScavengerListGlobal";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import HikingRoundedIcon from '@mui/icons-material/HikingRounded';
import CameraEnhanceRoundedIcon from '@mui/icons-material/CameraEnhanceRounded';
import defaultUser from "./img/defaultUser.jpg";


const BucketList = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogContent, setDialogContent] = useState("");
    const [completedItems, setCompletedItems] = useState([]);
    const [value, setValue] = React.useState('all');
    const [latCurr, setLatCurr] = React.useState(null);
    const [lngCurr, setLngCurr] = React.useState(null);
    const [latPrev, setLatPrev] = React.useState(null);
    const [lngPrev, setLngPrev] = React.useState(null);
    const [status, setStatus] = React.useState(null);
    const [id, setId] = React.useState(-1);
    const [distanceTravelled, setDistanceTravelled] = React.useState(0);
    const [image, setImage] = useState(defaultUser);

    useEffect(() => {
        console.log("Coordinates have been updated!");
    }, [latCurr, lngCurr, latPrev, lngPrev]);

    const handleClick = (content) => {
        setOpenDialog(true);
        setDialogContent(content);
    };

    const handleClose = () => {
        setOpenDialog(false);
        setDialogContent("");
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleComplete = (index) => {
        clearWatch();
        awardPoints(index);
        setCompletedItems(completedItems => [...completedItems, BucketListGlobal[index]]);
    }

    const clearWatch = () => {
        setStatus("Clearing watch...");
        navigator.geolocation.clearWatch(id);
    }


    const awardPoints = (index) => {
        let hike_distance = BucketListGlobal[index].length_distance;
        let hike_points = BucketListGlobal[index].points;
        let hike_difficulty = BucketListGlobal[index].difficulty;

        let earned_points_raw = (distanceTravelled / hike_distance) * hike_points;
        if (hike_difficulty === "EASY" && earned_points_raw > 5) {
            //award 5
        }
        else if (hike_difficulty === "MODERATE" && earned_points_raw > 10) {
            //award 10
        }
        else if (hike_difficulty === "HARD" && earned_points_raw > 15) {
            //award 15
        }
        else {
            //award earned_points_raw;
        }
    }


    const isCompleted = (index) => {
        return completedItems.includes(BucketListGlobal[index]);
    }

    const handleStart = (index) => {
        if (checkCoordinates(index)) {
            watchingPosition();
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

    const watchingPosition = () => {
        setStatus("Checking Geolocation...");
        if (navigator.geolocation) {
            setStatus("Watching Position...")
            let x = navigator.geolocation.watchPosition((position) => {
                setLatPrev(latCurr);
                setLngPrev(lngCurr);
                setLatCurr(position.coords.latitude);
                setLngCurr(position.coords.longitude);
                let totalDistance = distanceTravelled;
                if (latPrev != null && lngPrev != null) {
                    let currDistance = distance(latPrev, lngPrev, latCurr, lngCurr);
                    setDistanceTravelled(totalDistance + currDistance);
                }
            }, () => {
                setStatus("Couldn't get coordinates.")
            }, {
                enableHighAccuracy: true
            });
            setId(x);
        }
        setStatus("Geolocation is not supported.");
    }



    const coordinates = () => {
        setStatus("Checking Geolocation...");
        if (navigator.geolocation) {
            setStatus("Requesting Coordinates...")
            navigator.geolocation.getCurrentPosition((position) => {
                setLatCurr(position.coords.latitude);
                setLngCurr(position.coords.longitude);
                setStatus("Successfully got the Coordinates!");
            }, () => {
                setStatus("No coordinates available.");
            });
        }
        else {
            setStatus("Geolocation is not supported.");
        }
    }

    const checkCoordinates = (index) => {
        let hike = BucketListGlobal[index];
        coordinates();
        setStatus("Comparing Coordinates...");
        let hike_lat = hike.lat;
        let hike_lng = hike.lng;
        let dis = distance(latCurr, lngCurr, hike_lat, hike_lng);
        if (dis <= 0.1) {
            setStatus("Passed!");
            return true;
        }
        else {
            setStatus("Failed");
            alert("Please get closer to the start of the hike!");
            return false;
        }


    }

    const handleImageUpload = (event) => {
        setImage(URL.createObjectURL(event.target.files[0]));
    }

    const uploadPic = () => {
        return;
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
                                    <Button size="small" onClick={() => handleStart(index)}>Start</Button>
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
                                    <Button size="small" component="label">
                                        Upload Picture
                                        <input hidden accept="image/*" multiple type="file"/>
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
        </React.Fragment>

    );
};

export default BucketList;
