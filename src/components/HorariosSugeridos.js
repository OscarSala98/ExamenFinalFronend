import React, { useState, useEffect } from 'react';
import { obtenerHorariosSugeridos } from '../utils/timeValidation';
import './HorariosSugeridos.css';

const HorariosSugeridos = ({ 
  reservas, 
  selectedCancha, 
  fechaHora, 
  onSeleccionarHorario,
  reservaAExcluir = null
}) => {
  const [sugerencias, setSugerencias] = useState([]);
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);

  useEffect(() => {
    if (selectedCancha && fechaHora) {
      const fecha = fechaHora.split('T')[0]; // Extraer solo la fecha
      const horarios = obtenerHorariosSugeridos(
        reservas, 
        parseInt(selectedCancha), 
        fecha,
        reservaAExcluir
      );
      setSugerencias(horarios.slice(0, 20)); // Mostrar máximo 20 sugerencias
    } else {
      setSugerencias([]);
    }
  }, [reservas, selectedCancha, fechaHora, reservaAExcluir]);

  if (!selectedCancha || sugerencias.length === 0) {
    return null;
  }

  return (
    <div className="horarios-sugeridos">
      <div className="sugerencias-header">
        <button 
          className="btn-toggle-sugerencias"
          onClick={() => setMostrarSugerencias(!mostrarSugerencias)}
        >
          💡 {mostrarSugerencias ? 'Ocultar' : 'Ver'} horarios disponibles ({sugerencias.length})
        </button>
      </div>

      {mostrarSugerencias && (
        <div className="sugerencias-list">
          <h4>⏰ Horarios disponibles hoy:</h4>
          <div className="horarios-grid">
            {sugerencias.map((sugerencia, index) => (
              <button
                key={index}
                className="horario-sugerido"
                onClick={() => {
                  const fechaISO = sugerencia.fecha.toISOString().slice(0, 16);
                  onSeleccionarHorario(fechaISO);
                  setMostrarSugerencias(false);
                }}
              >
                {sugerencia.texto}
              </button>
            ))}
          </div>
          {sugerencias.length === 0 && (
            <p className="no-sugerencias">
              😔 No hay horarios disponibles para esta fecha
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default HorariosSugeridos;
