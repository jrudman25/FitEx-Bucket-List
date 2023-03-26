import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './NavBar';
import Sidebar from './Sidebar';
import Login from './Login';
import Home from './Home';
import Leaderboard from './Leaderboard';
import Questionnaire from './Questionnaire';
import BucketList from './BucketList';
import Group from './Group';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('username'));

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        sessionStorage.clear();
        setIsLoggedIn(false);
        window.location.replace('/');
    };

    return (
        <Router>
            <Sidebar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            <NavBar />
            <Routes>
                <Route
                    exact
                    path="/"
                    element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} />}
                />
                <Route path="/home" element={<Home />} />
                <Route path="/bucketlist" element={<BucketList />} />
                <Route path="/group" element={<Group />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/questionnaire" element={<Questionnaire />} />
            </Routes>
        </Router>
    );
}

export default App;
