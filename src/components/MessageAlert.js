import React from 'react';
import './MessageAlert.css';

const MessageAlert = ({ message, onClose }) => {
  if (!message) return null;

  const isError = message.includes('Error') || message.includes('error');
  
  return (
    <div className={`message ${isError ? 'error' : 'success'}`}>
      <div className="message-content">
        <span className="message-icon">
          {isError ? '❌' : '✅'}
        </span>
        <span className="message-text">{message}</span>
      </div>
      <button onClick={onClose} className="message-close">
        ×
      </button>
    </div>
  );
};

export default MessageAlert;
