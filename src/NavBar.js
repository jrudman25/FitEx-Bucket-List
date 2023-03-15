import React from 'react';
import { Nav, NavLink, NavMenu }
    from "./NavBarElement";

const NavBar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/home" activeStyle>
                        Home
                    </NavLink>
                    <NavLink to="/Bucketlist" activeStyle>
                        Bucket List
                    </NavLink>
                    <NavLink to="/Group" activeStyle>
                        Group
                    </NavLink>
                    <NavLink to="/Leaderboard" activeStyle>
                        Leaderboard
                    </NavLink>
                    <NavLink to="/Questionnaire" activeStyle>
                        Questionnaire
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default NavBar;