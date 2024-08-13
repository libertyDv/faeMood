import React from "react";
import '../../styles/Modal.css'

const Modal = ({ isVisible, onClose, onConfirm }) => {
    if (!isVisible) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Are you sure you want to log out?</h3>
                <div className="modal-buttons">
                    <button onClick={onConfirm}>Yes</button>
                    <button onClick={onClose}>No</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
