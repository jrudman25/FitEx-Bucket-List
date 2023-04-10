import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { db } from './backend/FirebaseConfig';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import './Leaderboard.css';

function Leaderboard() {

    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGroups = async () => {
            const q = query(collection(db, 'groups'), orderBy('group_points', 'desc'));

            const querySnapshot = await getDocs(q);
            const fetchedGroups = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setGroups(fetchedGroups);
            setLoading(false);
        };

        fetchGroups();
    }, []);

    if (!(sessionStorage.getItem('isLoggedIn') === 'true')) {
        return <Navigate to="/" />;
    }

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <Typography variant="h4">Loading...</Typography>
            </Box>
        );
    }

    return (
        <div className="leaderboard-container">
            <h2>Leaderboard</h2>
            <table className="leaderboard-table">
                <thead>
                <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Points</th>
                </tr>
                </thead>
                <tbody>
                {groups.map(({ name, group_points }, index) => (
                    <tr className={index % 2 === 0 ? 'even-row' : 'odd-row'} key={name}>
                        <td>{index + 1}</td>
                        <td>{name}</td>
                        <td>{group_points.toFixed(2).toLocaleString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Leaderboard;
