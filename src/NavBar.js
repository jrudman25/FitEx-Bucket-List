import { Nav } from './NavBarElement';

const NavBar = () => {
    return (
        <>
            <Nav style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div id={"imageContainer"} style={{ height: '50px', marginRight: '10px' }}>
                        <img src={"bucketListIcon.png"} style={{ width: '100%', height: '100%' }} />
                    </div>
                    <div style={{ color: 'white', fontSize: '24px' }}>Hokie Bucket List</div>
                </div>
            </Nav>
        </>
    );
};

export default NavBar;
