import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png'
import './Header.css'
const Header = () => {

    const [loggedInUser , setLoggedInUser] = useContext(UserContext);
    
    return (
        <div className="header">
            <img src={logo} alt="" />

            <nav>
                <Link to="/home">Home</Link>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Review</Link>
                <Link to="/manage">Manage Inventory</Link>
                {
                    loggedInUser.email ? <span><small style={{color:"white"}}>{loggedInUser.name} </small> <button onClick={()=>setLoggedInUser([])}>Sign Out</button> </span>: <Link to="/login"><button>Sign in</button></Link>
                }
               
            </nav>

        </div>
    );
};

export default Header;