import React from 'react';
import './updateModal.css';

export default function UpdateModal({
  isOpen,
  onClose,
  formData,
  onChange,
  onSubmit,
  title,
  editableFields = [],
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={onSubmit} className="modal-body">
          {editableFields.map((field) => (
            <div key={field} className="form-group">
              <label htmlFor={field}>{field}</label>
              <input
                id={field}
                name={field}
                value={formData[field] || ''}
                onChange={onChange}
                placeholder={`${field}`}
                type={field === 'data_nascimento' ? 'date' : 'text'}
              />
            </div>
          ))}
          <div className="modal-actions">
            <button type="submit">Salvar</button>
            <button type="button" className="cancelBtn" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
