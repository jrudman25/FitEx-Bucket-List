import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import './App.css';
import NavBar from './NavBar';
import Sidebar from './Sidebar';
import Login from './Login';
import Home from './Home';
import Leaderboard from './Leaderboard';
import Questionnaire from './Questionnaire';
import BucketList from './BucketList';
import Group from './Group';
import Signup from "./Signup";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('isLoggedIn'));
    const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);

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
            <Sidebar isLoggedIn={isLoggedIn} handleLogout={handleLogout} setUsers={setUsers} />
            <NavBar />
            <Routes>
                <Route exact path="/" element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} users={users} />} />
                <Route path="/signup" element={<Signup users={users} setUsers={setUsers} />} />
                <Route path="/home" element={<Home />} />
                <Route path="/bucketlist" element={<BucketList />} />
                <Route path="/group" element={<Group />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/questionnaire" element={<Questionnaire />} />
                <Route path="*" element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/" />} />
                <Route
                    path="*"
                    element={isLoggedIn ? <Home /> : <Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} users={users} />}
                />
            </Routes>
        </Router>
    );
}

export default App;
