import { useState } from 'react';

export default function AdminControls({ onToggleAdmin, isAdminMode }) {
  return (
    <div className="admin-controls">
      <button
        className={`admin-toggle-btn ${isAdminMode ? 'active' : ''}`}
        onClick={onToggleAdmin}
        title={isAdminMode ? 'Desativar modo admin' : 'Ativar modo admin'}
      >
        <i className={`fas ${isAdminMode ? 'fa-lock-open' : 'fa-lock'}`}></i>
        {isAdminMode ? ' Modo Admin' : ' Admin'}
      </button>
    </div>
  );
}
