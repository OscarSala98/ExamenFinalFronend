import React from 'react';
import UserSelector from './UserSelector';
import CanchaSelector from './CanchaSelector';
import DateTimeSelector from './DateTimeSelector';
import './ReservaForm.css';

const ReservaForm = ({
  usuarios,
  canchas,
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
  const isFormValid = selectedUsuario && selectedCancha && fechaHora;

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
      />

      <button 
        className="btn-reserve" 
        onClick={onCrearReserva}
        disabled={loading || !isFormValid}
      >
        {loading ? '⏳ Procesando...' : '🎯 Crear Reserva'}
      </button>

      {!isFormValid && (
        <div className="form-hint">
          <small>💡 Completa todos los campos para crear una reserva</small>
        </div>
      )}
    </div>
  );
};

export default ReservaForm;
