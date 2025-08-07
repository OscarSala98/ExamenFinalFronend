import React from 'react';
import './DateTimeSelector.css';

const DateTimeSelector = ({ 
  fechaHora, 
  setFechaHora, 
  loading 
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
        className="datetime-input"
      />
      <small className="datetime-help">
        Selecciona una fecha y hora futuras para tu reserva
      </small>
    </div>
  );
};

export default DateTimeSelector;
