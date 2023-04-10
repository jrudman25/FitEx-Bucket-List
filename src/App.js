import React from 'react';
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
import Signup from './Signup';
import Contact from './Contact'
import Community from "./Community";

function App() {

    const isLoggedIn = sessionStorage.getItem('isLoggedIn');

    return (
        <Router>
            <Sidebar />
            <NavBar />
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/home" element={<Home />} />
                <Route path="/bucketlist" element={<BucketList />} />
                <Route path="/group" element={<Group />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/community" element={<Community />} />
                <Route path="/questionnaire" element={<Questionnaire />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/" />} />
                <Route
                    path="*"
                    element={isLoggedIn ? <Home /> : <Login />}
                />
            </Routes>
        </Router>
    );
}

export default App;
