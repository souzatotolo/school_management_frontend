import React from 'react';
import '../ConfirmModal/ConfirmModal.css';

export default function ConfirmModal({ isOpen, onClose, onConfirm, message }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Confirmação</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-actions">
          <button onClick={onConfirm}>Sim</button>
          <button className="cancelBtn" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
