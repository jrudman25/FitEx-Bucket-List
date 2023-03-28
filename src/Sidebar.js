import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ setUsers }) => {
    const navigate = useNavigate();
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

    const handleLogout = () => {
        setUsers([]);
        sessionStorage.setItem('isLoggedIn', false);
        navigate('/');
    };

    return (
        <Menu>
            {isLoggedIn ? (
                <>
                    <a className="bm-item" href="/home">
                        Home
                    </a>
                    <a className="bm-item" href="/bucketlist">
                        Bucket List
                    </a>
                    <a className="bm-item" href="/group">
                        Group
                    </a>
                    <a className="bm-item" href="/leaderboard">
                        Leaderboard
                    </a>
                    <a className="bm-item" href="/questionnaire">
                        Questionnaire
                    </a>
                    <a className="menu-item-logout" onClick={handleLogout} href="/">
                        Logout
                    </a>
                </>
            ) : (
                <>
                    <a className="bm-item" href="/">
                        Login
                    </a>
                    <a className="bm-item" href="/signup">
                        Sign-up
                    </a>
                </>
            )}
        </Menu>
    );
};

export default Sidebar;
