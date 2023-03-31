import React, { useEffect } from 'react';
import { Nav } from './NavBarElement';
import bucketListIcon from './img/bucketListIcon.png'
import { auth } from './backend/FirebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const NavBar = () => {
    const isLoggedIn = onAuthStateChanged(auth, (user) => {
        if (user) {
            sessionStorage.setItem('isLoggedIn', true);
            return true;
        }
        else {
            sessionStorage.setItem('isLoggedIn', false);
            return false;
        }
    } );

    useEffect(() => {

    }, [isLoggedIn]);

    return (
        <>
            <Nav style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div id={"imageContainer"} style={{ height: '50px', marginRight: '10px' }}>
                        <img src={bucketListIcon} style={{ width: '100%', height: '100%' }} alt="clipboard logo"/>
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
