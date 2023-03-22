import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css'

export default props => {
    return (
        <Menu>
            <a className="menu-item" href="/">
                Login
            </a>
            <a className="menu-item" href="/home">
                Home
            </a>
            <a className="menu-item" href="/bucketlist">
                Bucket List
            </a>
            <a className="menu-item" href="/group">
                Group
            </a>
            <a className="menu-item" href="/leaderboard">
                Leaderboard
            </a>
            <a className="menu-item" href="/questionnaire">
                Questionnaire
            </a>
        </Menu>
    );
};