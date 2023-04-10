import React, { useEffect } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { useNavigate } from 'react-router-dom';
import { auth } from './backend/FirebaseConfig';
import { signOut } from 'firebase/auth';
import './Sidebar.css';

const Sidebar = () => {
    const navigate = useNavigate();
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    useEffect(() => {

    }, [isLoggedIn]);

    const handleLogout = async () => {
        sessionStorage.setItem('isLoggedIn', false);
        await signOut(auth);
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
                    <a className="bm-item" href="/community">
                        Community Photos
                    </a>
                    <a className="bm-item" href="/contact">
                        Contact Us
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
                    <a className="bm-item" href="/contact">
                        Contact Us
                    </a>
                </>
            )}
        </Menu>
    );
};

export default Sidebar;
