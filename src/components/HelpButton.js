// HelpButton.js
import React, { useState } from 'react';
import HelpModal from './HelpModal';

function HelpButton({ content }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal} className="help">
        ?
      </button>
      <HelpModal isOpen={modalIsOpen} onRequestClose={closeModal} content={content} />
    </div>
  );
}

export default HelpButton;