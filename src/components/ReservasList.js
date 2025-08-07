import React from 'react';
import ReservaCard from './ReservaCard';
import './ReservasList.css';

const ReservasList = ({ reservas, onEliminarReserva, onEditarReserva }) => {
  if (reservas.length === 0) {
    return (
      <div className="no-reservas">
        <div className="no-reservas-icon">📋</div>
        <h3>No hay reservas registradas</h3>
        <p>Crea tu primera reserva usando el formulario</p>
      </div>
    );
  }

  return (
    <div className="reservas-list">
      <div className="reservas-header">
        <h3>📊 Total de reservas: {reservas.length}</h3>
      </div>
      {reservas.map(reserva => (
        <ReservaCard 
          key={reserva.id} 
          reserva={reserva} 
          onEliminar={onEliminarReserva}
          onEditar={onEditarReserva}
        />
      ))}
    </div>
  );
};

export default ReservasList;
