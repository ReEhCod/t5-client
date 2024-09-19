import React from 'react';
import '../styles/About+Contact.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const ContactUs = () => {
    return (
        <div className="contact-us-container">
            <h1>Contact Us</h1>
            <p>If you have any questions or need assistance with managing your fleet, feel free to reach out to us. We're here to help!</p>
            <div className="contact-details">
                <p><FontAwesomeIcon icon={faEnvelope}/> Email: support@vehicletracker.com</p>
                <p><FontAwesomeIcon icon={faPhone} /> Phone: +46 072 654 62 64</p>
                <p><FontAwesomeIcon icon={faMapMarkerAlt} /> Address: Balladgatan 37, 215 73 Malmö</p>
            </div>
        </div>
    );
};

export default ContactUs;
