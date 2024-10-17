import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './Modal.css'; // Import the CSS file for the modal styling

const Modal = ({ isOpen, onClose }) => {
    return (
        <CSSTransition
            in={isOpen}
            timeout={300}
            classNames="fade"
            unmountOnExit
        >
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <h2>Thanks for coming!</h2>
                    <p>Your document has been successfully generated.</p>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </CSSTransition>
    );
};

export default Modal;
