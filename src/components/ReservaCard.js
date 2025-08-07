import React from 'react';
import './ReservaCard.css';
import { formatearDuracionReserva } from '../utils/timeValidation';

const ReservaCard = ({ reserva, onEliminar }) => {
  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  return (
    <div className="reserva-card">
      <div className="reserva-info">
        <h3>🏟️ {reserva.Cancha?.nombre}</h3>
        <p><strong>👤 Usuario:</strong> {reserva.Usuario?.nombre}</p>
        <p><strong>📅 Fecha:</strong> {formatearFecha(reserva.fecha_hora)}</p>
        <p><strong>🕐 Horario:</strong> {formatearDuracionReserva(reserva.fecha_hora)}</p>
        <p><strong>🆔 Reserva:</strong> #{reserva.id}</p>
      </div>
      <button 
        className="btn-delete"
        onClick={() => onEliminar(reserva.id)}
        title="Eliminar reserva"
      >
        🗑️ Eliminar
      </button>
    </div>
  );
};

export default ReservaCard;
