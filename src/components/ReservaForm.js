import React, { useState, useEffect } from 'react';
import UserSelector from './UserSelector';
import CanchaSelector from './CanchaSelector';
import DateTimeSelector from './DateTimeSelector';
import { validarDisponibilidadCancha } from '../utils/timeValidation';
import './ReservaForm.css';

const ReservaForm = ({
  usuarios,
  canchas,
  reservas,
  selectedUsuario,
  setSelectedUsuario,
  selectedCancha,
  setSelectedCancha,
  fechaHora,
  setFechaHora,
  onAgregarUsuario,
  onCrearReserva,
  loading
}) => {
  const [validacionDisponibilidad, setValidacionDisponibilidad] = useState(null);

  // Validar disponibilidad cuando cambian la cancha o fecha/hora
  useEffect(() => {
    if (selectedCancha && fechaHora) {
      const resultado = validarDisponibilidadCancha(
        reservas, 
        parseInt(selectedCancha), 
        fechaHora
      );
      setValidacionDisponibilidad(resultado);
    } else {
      setValidacionDisponibilidad(null);
    }
  }, [selectedCancha, fechaHora, reservas]);

  const isFormValid = selectedUsuario && 
                     selectedCancha && 
                     fechaHora && 
                     validacionDisponibilidad?.disponible !== false;

  const handleCrearReserva = () => {
    if (validacionDisponibilidad && !validacionDisponibilidad.disponible) {
      return; // No permitir crear reserva si hay conflicto
    }
    onCrearReserva();
  };

  return (
    <div className="form-section">
      <h2>📝 Nueva Reserva</h2>
      
      <UserSelector
        usuarios={usuarios}
        selectedUsuario={selectedUsuario}
        setSelectedUsuario={setSelectedUsuario}
        onAgregarUsuario={onAgregarUsuario}
        loading={loading}
      />

      <CanchaSelector
        canchas={canchas}
        selectedCancha={selectedCancha}
        setSelectedCancha={setSelectedCancha}
        loading={loading}
      />

      <DateTimeSelector
        fechaHora={fechaHora}
        setFechaHora={setFechaHora}
        loading={loading}
        validationMessage={validacionDisponibilidad?.mensaje}
        isValid={validacionDisponibilidad?.disponible !== false}
      />

      <button 
        className="btn-reserve" 
        onClick={handleCrearReserva}
        disabled={loading || !isFormValid}
      >
        {loading ? '⏳ Procesando...' : '🎯 Crear Reserva'}
      </button>

      {!isFormValid && (
        <div className="form-hint">
          <small>
            {!selectedUsuario && '� Selecciona un usuario'}
            {!selectedCancha && selectedUsuario && ' • 🏟️ Selecciona una cancha'}
            {!fechaHora && selectedUsuario && selectedCancha && ' • 📅 Selecciona fecha y hora'}
            {validacionDisponibilidad?.disponible === false && ' • ❌ Resuelve el conflicto de horario'}
          </small>
        </div>
      )}
    </div>
  );
};

export default ReservaForm;
