import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function HelpModal({ isOpen, onRequestClose, content }) {
  const modalStyles = {
    overlay: {
      backgroundColor: 'rgba(230, 230, 230, 0.5)',
      backdropFilter: 'blur(5px)',
      transition: 'backdrop-filter 0.3s ease-in-out',
    },
    content: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '60%',
      height: '60%',
      padding: '2%',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Help Modal"
      style={modalStyles}
      shouldCloseOnOverlayClick={true}
    >
      <div>
        <button className="close-button" onClick={onRequestClose}>
            X
        </button>
        <div>
            <h1>Key 36</h1>
            <div className="modal-text">{content}</div>
        </div>
      </div>
    </Modal>
  );
}

export default HelpModal;