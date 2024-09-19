import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faCogs, faDatabase } from '@fortawesome/free-solid-svg-icons';

const AboutUs = () => {
    return (
        <div className="about-us-container">
            <h1>About Us</h1>
            <p><FontAwesomeIcon icon={faCar} /> Our platform is dedicated to helping you manage and keep track of all your vehicles efficiently. We understand how crucial it is to maintain accurate records of vehicles and their equipment, ensuring that every detail is accounted for and easily accessible.</p>
            <p><FontAwesomeIcon icon={faDatabase} /> Our mission is to simplify fleet management, offering a solution that lets you store detailed information about each vehicle, including model, brand, VIN, and any associated equipment. This makes it easier to track the condition and status of vehicles over time.</p>
            <p><FontAwesomeIcon icon={faCogs} /> With our platform, fleet operators and individual vehicle owners can easily manage everything in one place, ensuring smooth operation and timely maintenance.</p>
        </div>
    );
};

export default AboutUs;
