import React from 'react';
import './CanchaSelector.css';

const CanchaSelector = ({ 
  canchas, 
  selectedCancha, 
  setSelectedCancha, 
  loading 
}) => {
  return (
    <div className="form-group">
      <label>🏟️ Cancha:</label>
      <select 
        value={selectedCancha} 
        onChange={(e) => setSelectedCancha(e.target.value)}
        disabled={loading}
        className="cancha-select"
      >
        <option value="">Selecciona una cancha</option>
        {canchas.map(cancha => (
          <option key={cancha.id} value={cancha.id}>
            {cancha.nombre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CanchaSelector;
