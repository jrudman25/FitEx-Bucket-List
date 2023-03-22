import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import HikingRoundedIcon from '@mui/icons-material/HikingRounded';
import CameraEnhanceRoundedIcon from '@mui/icons-material/CameraEnhanceRounded';
import Box from '@mui/material/Box';
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import bucketList from './BucketListGlobal2';
import scavengerList from './ScavengerListGlobal';
import heritage from './eyJidWNrZXQiOiJhc3NldHMuYWxsdHJh.jpg';

//Used from: https://mui.com/material-ui/react-bottom-navigation/, https://mui.com/material-ui/react-card/
export default function BucketList() {
    const [value, setValue] = React.useState('all');
    const [lat, setLat] = React.useState(null);
    const [lng, setLng] = React.useState(null);
    const [status, setStatus] = React.useState(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
            <BottomNavigation sx={{ width: 500 }} value={value} onChange={handleChange}>
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
                <Card sx={{ maxWidth: 499 }}>
                    <CardMedia
                        sx={{ height: 140 }}
                        component="img"
                        image={heritage}
                        alt="hike"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {bucketList[1].name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {bucketList[1].difficulty}, {bucketList[1].length_distance}mi, {bucketList[1].length_time}min, {bucketList[1].elevation_gain}ft
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {bucketList[1].points} Points
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={() => checkCoordinates("Lib")}>Start</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>



            )}
            {value === 'hunt' && (
                <Card sx={{ maxWidth: 499 }}>
                    <CardMedia
                        component="img"
                        alt="hike"
                        height="140"
                        image=""
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Hunt 1
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Description for hunt 1
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Start</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
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
                    <CardActions>
                        <Button size="small">Start</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            )}
        </React.Fragment>
    );
}