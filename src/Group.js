import React, {useState} from "react";
import Typography from '@mui/material/Typography';
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded';
//import '@material-ui/core/styles';


//from: https://mui.com/material-ui/react-progress/
function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}


const Group = () => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInvite = () => {
        setOpen(false);
        //update backend when new member is invited
    };

    //handleLeave

    //this info will need to be retrieved from backend
    const group_members = ["John", "Ashley", "Bob"];
    const member_progress = [40, 33, 55]
    const group_name = "Hiking Hokies"

    return (
        <Box sx={{ width: '100%', maxWidth: 500 }}>

        <Typography variant="h2" sx={{ mb: 3 }} textAlign="center">
           You Are In
        </Typography>
        <Typography variant="h4" sx={{mb: 8 }} textAlign="center">
            <Groups2RoundedIcon sx={{mr: 1 }}></Groups2RoundedIcon >
             Group {group_name}
        </Typography>

            <Typography variant="h5" sx={{ mb: 2 }} textAlign="center">
                Members
            </Typography>

            <Typography variant="h6" sx={{ mb: 12 }} >
                {group_members.map((item, index) => (
                    <div key={item} >
                        {item}
                        <LinearProgressWithLabel sx={{ ml: 2, mr:2 }} value={member_progress[index]} />
                    </div>
                ))}
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Button variant="contained" onClick={handleOpen} sx={{ mr: 7 }}>
                    Invite Members
                </Button>
                <Button variant="contained">Leave Group</Button>
            </Box>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Invite Members</DialogTitle>
                <DialogContent>
                    <p>Enter the username of the member you want to add to your group</p>
                </DialogContent>

                <TextField
                    autoFocus
                    label="Username"
                    type="email"
                    variant="standard"
                />
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleInvite}>Invite</Button>
                </DialogActions>
            </Dialog>

        </Box>





    );
};
export default Group;