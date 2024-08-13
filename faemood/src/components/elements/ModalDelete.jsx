import React from "react";
import '../../styles/Modal.css'

const ModalDelete = ({ isVisible, onClose, onConfirm }) => {
    if (!isVisible) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Are you sure you want to delete your account?</h3>
                <p className="aviso">This action is permanent</p>
                <div className="modal-buttons">
                    <button onClick={onConfirm}>Yes</button>
                    <button onClick={onClose}>No</button>
                </div>
            </div>
        </div>
    );
};

export default ModalDelete;
