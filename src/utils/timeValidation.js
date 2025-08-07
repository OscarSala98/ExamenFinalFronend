// Utilidades para validación de horarios de reservas

/**
 * Duración de una reserva en minutos
 */
export const DURACION_RESERVA_MINUTOS = 30;

/**
 * Convierte una fecha string a objeto Date
 * @param {string} fechaString - Fecha en formato ISO string
 * @returns {Date} Objeto Date
 */
export const stringToDate = (fechaString) => {
  return new Date(fechaString);
};

/**
 * Verifica si dos reservas tienen conflicto de horario
 * @param {Date} fecha1 - Fecha de la primera reserva
 * @param {Date} fecha2 - Fecha de la segunda reserva
 * @returns {boolean} True si hay conflicto
 */
export const hayConflictoHorario = (fecha1, fecha2) => {
  const inicio1 = fecha1.getTime();
  const fin1 = inicio1 + (DURACION_RESERVA_MINUTOS * 60 * 1000);
  
  const inicio2 = fecha2.getTime();
  const fin2 = inicio2 + (DURACION_RESERVA_MINUTOS * 60 * 1000);
  
  // Hay conflicto si:
  // - La nueva reserva empieza antes de que termine la existente Y después de que empiece
  // - La nueva reserva termina después de que empiece la existente Y antes de que termine
  // - La nueva reserva abarca completamente la existente
  return (inicio1 < fin2) && (fin1 > inicio2);
};

/**
 * Verifica si una cancha está disponible para una fecha/hora específica
 * @param {Array} reservas - Lista de todas las reservas
 * @param {number} idCancha - ID de la cancha a verificar
 * @param {string} fechaHora - Fecha y hora de la nueva reserva
 * @param {number} idReservaExcluir - ID de reserva a excluir (para ediciones)
 * @returns {Object} Resultado de la validación
 */
export const validarDisponibilidadCancha = (reservas, idCancha, fechaHora, idReservaExcluir = null) => {
  const nuevaFecha = stringToDate(fechaHora);
  
  // Filtrar reservas de la misma cancha (excluyendo la reserva que se está editando)
  const reservasCancha = reservas.filter(reserva => 
    reserva.id_cancha === idCancha && 
    (idReservaExcluir === null || reserva.id !== idReservaExcluir)
  );
  
  // Buscar conflictos
  const conflictos = reservasCancha.filter(reserva => {
    const fechaReservaExistente = stringToDate(reserva.fecha_hora);
    return hayConflictoHorario(nuevaFecha, fechaReservaExistente);
  });
  
  if (conflictos.length > 0) {
    const reservaConflicto = conflictos[0];
    const fechaConflicto = stringToDate(reservaConflicto.fecha_hora);
    const inicioConflicto = fechaConflicto.toLocaleString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    const finConflicto = new Date(fechaConflicto.getTime() + (DURACION_RESERVA_MINUTOS * 60 * 1000))
      .toLocaleString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
      });
    
    return {
      disponible: false,
      mensaje: `La cancha ya está reservada por ${reservaConflicto.Usuario?.nombre} de ${inicioConflicto} a ${finConflicto}. Cada reserva dura 30 minutos.`,
      conflicto: reservaConflicto
    };
  }
  
  return {
    disponible: true,
    mensaje: 'Cancha disponible para la fecha y hora seleccionada'
  };
};

/**
 * Formatea la duración de una reserva para mostrar al usuario
 * @param {string} fechaHora - Fecha y hora de inicio
 * @returns {string} Texto formateado con hora de inicio y fin
 */
export const formatearDuracionReserva = (fechaHora) => {
  const inicio = stringToDate(fechaHora);
  const fin = new Date(inicio.getTime() + (DURACION_RESERVA_MINUTOS * 60 * 1000));
  
  const formatoHora = { hour: '2-digit', minute: '2-digit' };
  const horaInicio = inicio.toLocaleTimeString('es-ES', formatoHora);
  const horaFin = fin.toLocaleTimeString('es-ES', formatoHora);
  
  return `${horaInicio} - ${horaFin}`;
};

/**
 * Obtiene sugerencias de horarios disponibles para una cancha en un día específico
 * @param {Array} reservas - Lista de todas las reservas
 * @param {number} idCancha - ID de la cancha
 * @param {string} fecha - Fecha (YYYY-MM-DD)
 * @returns {Array} Lista de horarios sugeridos disponibles
 */
export const obtenerHorariosSugeridos = (reservas, idCancha, fecha) => {
  const reservasCancha = reservas.filter(reserva => {
    const fechaReserva = stringToDate(reserva.fecha_hora);
    const fechaBuscada = new Date(fecha);
    return reserva.id_cancha === idCancha && 
           fechaReserva.toDateString() === fechaBuscada.toDateString();
  });
  
  // Generar horarios desde las 8:00 hasta las 20:00 en intervalos de 30 minutos
  const horariosSugeridos = [];
  const fechaBase = new Date(fecha);
  
  for (let hora = 8; hora <= 20; hora++) {
    for (let minuto = 0; minuto < 60; minuto += 30) {
      const horarioSugerido = new Date(fechaBase);
      horarioSugerido.setHours(hora, minuto, 0, 0);
      
      // Verificar si este horario está disponible
      const disponible = !reservasCancha.some(reserva => {
        const fechaReserva = stringToDate(reserva.fecha_hora);
        return hayConflictoHorario(horarioSugerido, fechaReserva);
      });
      
      if (disponible) {
        horariosSugeridos.push({
          fecha: horarioSugerido,
          texto: formatearDuracionReserva(horarioSugerido.toISOString())
        });
      }
    }
  }
  
  return horariosSugeridos;
};
