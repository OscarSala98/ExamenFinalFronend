import React, { useState, useEffect } from 'react';
import { validarHorarioPrevioAgendamiento } from '../utils/timeValidation';
import HorariosSugeridos from './HorariosSugeridos';
import './EditarReservaModal.css';

const EditarReservaModal = ({ 
  reserva, 
  isOpen, 
  onClose, 
  onSave, 
  reservasExistentes,
  canchas
}) => {
  const [fecha, setFecha] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (reserva && isOpen) {
      const fechaReserva = new Date(reserva.fecha);
      const fechaFormateada = fechaReserva.toISOString().split('T')[0];
      setFecha(fechaFormateada);

      // Extraer la hora de inicio de la reserva
      const horaInicioReserva = new Date(reserva.horaInicio);
      const horaFormateada = horaInicioReserva.toTimeString().slice(0, 5);
      setHoraInicio(horaFormateada);
      
      setError('');
    }
  }, [reserva, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!fecha || !horaInicio) {
      setError('Por favor complete todos los campos');
      return;
    }

    // Validar que no sea un horario pasado
    const validacionHorario = validarHorarioPrevioAgendamiento(fecha, horaInicio);
    if (!validacionHorario.esValido) {
      setError(validacionHorario.mensaje);
      return;
    }

    // Crear las fechas para la nueva reserva
    const fechaReserva = new Date(fecha);
    const [horas, minutos] = horaInicio.split(':');
    
    const nuevaHoraInicio = new Date(fechaReserva);
    nuevaHoraInicio.setHours(parseInt(horas), parseInt(minutos), 0, 0);
    
    const nuevaHoraFin = new Date(nuevaHoraInicio);
    nuevaHoraFin.setMinutes(nuevaHoraFin.getMinutes() + 30);

    // Verificar conflictos con otras reservas (excluyendo la actual)
    const hayConflicto = reservasExistentes.some(r => {
      if (r.id === reserva.id) return false; // Excluir la reserva actual
      if (r.canchaId !== reserva.canchaId) return false;
      
      const fechaExistente = new Date(r.fecha);
      if (fechaExistente.toDateString() !== fechaReserva.toDateString()) return false;

      const inicioExistente = new Date(r.horaInicio);
      const finExistente = new Date(r.horaFin);

      return (
        (nuevaHoraInicio < finExistente && nuevaHoraFin > inicioExistente)
      );
    });

    if (hayConflicto) {
      setError('Ya existe una reserva en ese horario. Por favor seleccione otro horario.');
      return;
    }

    // Crear la reserva actualizada
    const reservaActualizada = {
      ...reserva,
      fecha: fechaReserva.toISOString(),
      horaInicio: nuevaHoraInicio.toISOString(),
      horaFin: nuevaHoraFin.toISOString()
    };

    onSave(reservaActualizada);
  };

  if (!isOpen || !reserva) return null;

  const canchaActual = canchas.find(c => c.id === reserva.canchaId);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Editar Reserva</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="reserva-info-section">
            <h4>Información de la Reserva</h4>
            <p><strong>Usuario:</strong> {reserva.usuario?.nombre}</p>
            <p><strong>Cancha:</strong> {canchaActual?.nombre}</p>
            <p><strong>Tipo:</strong> {canchaActual?.tipo}</p>
          </div>

          <form onSubmit={handleSubmit} className="edit-form">
            <div className="form-group">
              <label htmlFor="fecha">Nueva Fecha:</label>
              <input
                type="date"
                id="fecha"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="horaInicio">Nueva Hora:</label>
              <input
                type="time"
                id="horaInicio"
                value={horaInicio}
                onChange={(e) => setHoraInicio(e.target.value)}
                step="1800"
                required
              />
              <small className="time-help">
                Solo se permiten intervalos de 30 minutos (ej: 08:00, 08:30, 09:00)
              </small>
            </div>

            {error && <div className="error-message">{error}</div>}

            {fecha && (
              <HorariosSugeridos
                reservas={reservasExistentes.map(r => ({
                  id_cancha: r.canchaId || r.id_cancha,
                  fecha_hora: r.fecha_hora || r.horaInicio,
                  id: r.id
                }))}
                selectedCancha={reserva.canchaId.toString()}
                fechaHora={`${fecha}T${horaInicio || '08:00'}`}
                onSeleccionarHorario={(fechaHoraISO) => {
                  const nuevaFecha = fechaHoraISO.split('T')[0];
                  const nuevaHora = fechaHoraISO.split('T')[1];
                  setFecha(nuevaFecha);
                  setHoraInicio(nuevaHora);
                  setError('');
                }}
                reservaAExcluir={reserva.id}
              />
            )}

            <div className="modal-actions">
              <button type="button" className="btn-cancel" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="btn-save">
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditarReservaModal;
