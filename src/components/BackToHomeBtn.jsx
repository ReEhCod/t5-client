import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../styles/BackToHomeBtn.css';

const BackButton = () => {
    const navigate = useNavigate();

    const handleBackBtn = () => {
        navigate('/');
    };

    return (
        <button className="back-btn" onClick={handleBackBtn}>
            <FontAwesomeIcon icon={faArrowLeft} /> Back
        </button>
    );
};

export default BackButton;