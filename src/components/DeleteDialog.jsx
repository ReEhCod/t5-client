import React from 'react';
import '../styles/DeleteDialog.css'; 

const DeleteDialog = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="confirmation-dialog-overlay">
            <div className="confirmation-dialog">
                <h3>Are you sure you want to delete this vehicle?</h3>
                <div className="confirmation-dialog-buttons">
                    <button onClick={onConfirm}>Yes</button>
                    <button onClick={onClose}>No</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteDialog;
