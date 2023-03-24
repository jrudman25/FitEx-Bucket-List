import React, {useState} from "react";
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Card, CardContent, CardMedia, CardActions, Typography } from '@mui/material';
import BucketListGlobal from "./BucketListGlobal";
import ScavengerListGlobal from "./ScavengerListGlobal";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import HikingRoundedIcon from '@mui/icons-material/HikingRounded';
import CameraEnhanceRoundedIcon from '@mui/icons-material/CameraEnhanceRounded';

const BucketList = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogContent, setDialogContent] = useState("");
    const [completedItems, setCompletedItems] = useState([]);
    const [value, setValue] = React.useState('all');
    const [lat, setLat] = React.useState(null);
    const [lng, setLng] = React.useState(null);
    const [status, setStatus] = React.useState(null);

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

    const handleComplete = (itemName) => {
        setCompletedItems([...completedItems, itemName]);
    }

    const isCompleted = (itemName) => {
        return completedItems.includes(itemName);
    }

    const coordinates = () => {
        setStatus("checking geolocation");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLat(position.coords.latitude);
                setLng(position.coords.longitude);
                setStatus("Successfully got the Coordinates");
            }, () => {
                setStatus("No coordinates available");
            });
        }
        else {
            setStatus("Geolocation is not supported");
        }
    }

    const checkCoordinates = (location_str) => {
        setStatus("Gathering Coordinates");
        coordinates()
        setStatus(null);
        if (location_str === "Home") {
            if (lat >= 37.24 && lat <= 37.25 && lng >= -80.43 && lng <= -80.42) {
                alert("You are able to begin this hike!")
            }
            else {
                alert("You are not within range to start this hike :(");
            }
        }
        else if (location_str === "Lib") {
            if (lat >= 37.22 && lat <= 37.23 && lng >= -80.42 && lng <= -80.41) {
                alert("You are able to begin this hike!");
            }
            else {
                alert("You are not within range to start this hike :(");
            }
        }
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
                                    <Button size="small" onClick={() => checkCoordinates("Lib")}>Start</Button>
                                    <Button size="small" onClick={() => handleClick(item.name)}>Learn More</Button>
                                </CardActions>
                            </Card>
                            <Dialog open={openDialog && dialogContent === item.name} onClose={handleClose}>
                                <DialogTitle>{item.name}</DialogTitle>
                                <DialogContent>
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
                                    <Button size="small" onClick={() => checkCoordinates("Lib")}>Start</Button>
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
                </Card>
            )}
        </React.Fragment>

    );
};

export default BucketList;
