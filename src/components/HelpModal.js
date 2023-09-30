// HelpModal.js
import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the root element for accessibility

function HelpModal({ isOpen, onRequestClose, content }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Help Modal"
      className="help-modal"
      overlayClassName="help-modal-overlay"
    >
      <div>
        <button className="close-button" onClick={onRequestClose}>
            X
        </button>
        <div>
            <h2>Key 36</h2>
            <div className="modal-text">{content}</div>
        </div>
      </div>
    </Modal>
  );
}

export default HelpModal;