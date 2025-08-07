import React from 'react';
import './DateTimeSelector.css';
import { formatearDuracionReserva } from '../utils/timeValidation';

const DateTimeSelector = ({ 
  fechaHora, 
  setFechaHora, 
  loading,
  validationMessage,
  isValid = true
}) => {
  const now = new Date();
  const minDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);

  return (
    <div className="form-group">
      <label>📅 Fecha y Hora:</label>
      <input
        type="datetime-local"
        value={fechaHora}
        onChange={(e) => setFechaHora(e.target.value)}
        disabled={loading}
        min={minDateTime}
        className={`datetime-input ${!isValid ? 'invalid' : ''}`}
      />
      
      <div className="datetime-info">
        <small className="datetime-help">
          ⏱️ Duración de la reserva: 30 minutos
        </small>
        
        {fechaHora && (
          <small className="datetime-duration">
            🕐 Horario: {formatearDuracionReserva(fechaHora)}
          </small>
        )}
      </div>

      {validationMessage && (
        <div className={`validation-message ${isValid ? 'valid' : 'invalid'}`}>
          <span className="validation-icon">
            {isValid ? '✅' : '❌'}
          </span>
          <span className="validation-text">{validationMessage}</span>
        </div>
      )}
    </div>
  );
};

export default DateTimeSelector;
