import React, { useEffect } from 'react';
import { Nav } from './NavBarElement';
import bucketListIcon from './img/bucketListIcon.png'

const NavBar = () => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");

    useEffect(() => {

    }, [isLoggedIn]);

    return (
        <>
            <Nav style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div id={"imageContainer"} style={{ height: '50px', marginRight: '10px' }}>
                        <img src={bucketListIcon} className="bucket-list-icon" style={{ width: 'auto%', height: '100%' }} alt="clipboard logo"/>
                    </div>
                    {isLoggedIn ? (
                        <a href="/home" style={{ textDecoration: 'none' }}>
                            <div style={{ color: 'white', fontSize: '24px' }}>Hokie Bucket List</div>
                        </a>
                    ) : (
                        <div style={{ color: 'white', fontSize: '24px' }}>Hokie Bucket List</div>
                    )}
                </div>
            </Nav>
        </>
    );
};

export default NavBar;
