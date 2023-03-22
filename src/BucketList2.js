import React, {useState} from "react";
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Card, CardContent, CardMedia, Typography } from '@mui/material';
import BucketListGlobal from "./BucketListGlobal2";
import ScavengerListGlobal from "./ScavengerListGlobal";
import heritage from "./eyJidWNrZXQiOiJhc3NldHMuYWxsdHJh.jpg";
import bucketList from "./BucketListGlobal2";

const BucketList2 = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogContent, setDialogContent] = useState("");
    const [completedItems, setCompletedItems] = useState([]);

    const handleClick = (content) => {
        setOpenDialog(true);
        setDialogContent(content);
    };

    const handleClose = () => {
        setOpenDialog(false);
        setDialogContent("");
    };

    const handleComplete = (itemName) => {
        setCompletedItems([...completedItems, itemName]);
    }

    const isCompleted = (itemName) => {
        return completedItems.includes(itemName);
    }

    return (
        <Box>
            {BucketListGlobal.map((item, index) => (
                <React.Fragment key={index}>
                    <Card sx={{ maxWidth: 499 }} onClick={() => handleClick(item.name)}>
                        <CardMedia
                            sx={{ height: 140 }}
                            component="img"
                            image={heritage}
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
    );
};

export default BucketList2;
