import React from 'react';
import { Navigate } from 'react-router-dom';
import './Leaderboard.css';

const leaderboardData = [
    { name: 'Player 1', score: 300 },
    { name: 'Player 2', score: 200 },
    { name: 'Player 3', score: 150 },
    { name: 'Player 4', score: 50 },
];

function Leaderboard() {

    if (!(sessionStorage.getItem('isLoggedIn') === 'true')) {
        return <Navigate to="/" />;
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
                {leaderboardData.map(({ name, score }, index) => (
                    <tr className={index % 2 === 0 ? 'even-row' : 'odd-row'} key={index}>
                        <td>{index + 1}</td>
                        <td>{name}</td>
                        <td>{score.toLocaleString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Leaderboard;