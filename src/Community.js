import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography, Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import { ImageList, ImageListItem } from '@mui/material';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { styled } from '@mui/system';

const StyledImageList = styled(ImageList)(() => ({
    width: '100%',
    height: 'auto',
}));

async function getAllUsers() {
    const firestore = getFirestore();
    const usersCol = collection(firestore, 'users');
    const userSnapshot = await getDocs(usersCol);
    return userSnapshot.docs.map((doc) => doc.id);
}

async function getAllImages(userList) {
    const storage = getStorage();
    let images = [];

    for (const user of userList) {
        const imagesRef = ref(storage, `images/${user}`);
        const listResult = await listAll(imagesRef);
        const imageURLs = await Promise.all(
            listResult.items.map(async (itemRef) => {
                const url = await getDownloadURL(itemRef);
                return {
                    url,
                    user,
                    timestamp: itemRef.name.split('_')[0],
                    activity: itemRef.name.split('_')[1],
                };
            })
        );
        images = images.concat(imageURLs);
    }

    // Sort images by timestamp in descending order (newest first)
    images.sort((a, b) => parseInt(b.timestamp) - parseInt(a.timestamp));

    return images;
}

const Community = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [imageData, setImageData] = useState({});

    const handleClickOpen = (image) => {
        setImageData(image);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            const users = await getAllUsers();
            const allImages = await getAllImages(users);
            setImages(allImages);
            setLoading(false);
        };
        fetchData();
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: 'auto',
            }}
        >
            <Typography variant="h4" component="h1" gutterBottom sx={{marginTop: '0.5rem'}}>
                Community Photos
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                }}
            >
                {loading ? (
                    <CircularProgress />
                ) : (
                    <StyledImageList
                        cols={3}
                        gap={8}
                        sx={{ maxWidth: '80%', margin: '0 auto' }}
                    >
                        {images.map((image, index) => (
                            <ImageListItem key={index}>
                                <img
                                    src={`${image.url}`}
                                    alt={`Uploaded by ${image.user}`}
                                    loading="lazy"
                                    onClick={() => handleClickOpen(image)}
                                />
                            </ImageListItem>
                        ))}
                    </StyledImageList>
                )}
            </Box>
                <Dialog onClose={handleClose} aria-labelledby="activity-dialog-title" open={open}>
                    <DialogTitle id="activity-dialog-title">
                        Activity: {imageData.activity}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Uploaded by: {imageData.user?.split('@')[0]}
                        </DialogContentText>
                        <DialogContentText>
                            Date: {new Date(parseInt(imageData.timestamp)).toLocaleString()}
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </Box>
    );
};

export default Community;
