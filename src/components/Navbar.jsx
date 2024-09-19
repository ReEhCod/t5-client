import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {} from '@fortawesome/free-brands-svg-icons';
import {faCaravan, faPhone, faInfoCircle} from '@fortawesome/free-solid-svg-icons';


const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <h1>Vehicle Management</h1>
                </div>
                <ul className="navbar-menu">
                    <li className="navbar-item">
                        <Link to="/" className="navbar-link"> Home <FontAwesomeIcon icon={faCaravan} /></Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/contact" className="navbar-link"> Contact Us <FontAwesomeIcon icon={faPhone} /> </Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/about" className="navbar-link">  About Us <FontAwesomeIcon icon={faInfoCircle}/> </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
