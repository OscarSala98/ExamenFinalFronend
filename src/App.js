import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

// Componentes
import Header from './components/Header';
import MessageAlert from './components/MessageAlert';
import ReservaForm from './components/ReservaForm';
import ReservasList from './components/ReservasList';
import EditarReservaModal from './components/EditarReservaModal';

// Utilidades
import { validarDisponibilidadCancha } from './utils/timeValidation';

const API_BASE_URL = 'http://localhost:3002/api';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [canchas, setCanchas] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [selectedUsuario, setSelectedUsuario] = useState('');
  const [selectedCancha, setSelectedCancha] = useState('');
  const [fechaHora, setFechaHora] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  // Estados para el modal de edición
  const [reservaParaEditar, setReservaParaEditar] = useState(null);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);

  // Cargar datos iniciales
  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const [usuariosRes, canchasRes, reservasRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/usuarios`),
        axios.get(`${API_BASE_URL}/canchas`),
        axios.get(`${API_BASE_URL}/reservas`)
      ]);
      
      setUsuarios(usuariosRes.data);
      setCanchas(canchasRes.data);
      setReservas(reservasRes.data);
    } catch (error) {
      console.error('Error al cargar datos:', error);
      setMessage('Error al cargar datos del servidor. Asegúrate de que el backend esté ejecutándose en el puerto 3002.');
    } finally {
      setLoading(false);
    }
  };

  const agregarUsuario = async (nombreUsuario) => {
    if (!nombreUsuario.trim()) {
      setMessage('Por favor ingresa un nombre válido');
      return { success: false };
    }

    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/usuarios`, {
        nombre: nombreUsuario
      });
      
      setUsuarios([...usuarios, response.data]);
      setMessage('Usuario agregado exitosamente');
      return { success: true, usuario: response.data };
    } catch (error) {
      console.error('Error al agregar usuario:', error);
      setMessage('Error al agregar usuario');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const crearReserva = async () => {
    if (!selectedUsuario || !selectedCancha || !fechaHora) {
      setMessage('Por favor completa todos los campos');
      return;
    }

    // Validar disponibilidad antes de enviar al servidor
    const validacion = validarDisponibilidadCancha(
      reservas, 
      parseInt(selectedCancha), 
      fechaHora
    );

    if (!validacion.disponible) {
      setMessage(validacion.mensaje);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/reservas`, {
        id_usuario: parseInt(selectedUsuario),
        id_cancha: parseInt(selectedCancha),
        fecha_hora: fechaHora
      });
      
      setReservas([...reservas, response.data]);
      setSelectedUsuario('');
      setSelectedCancha('');
      setFechaHora('');
      setMessage('¡Reserva creada exitosamente! La cancha está reservada por 30 minutos.');
    } catch (error) {
      console.error('Error al crear reserva:', error);
      if (error.response?.status === 400) {
        setMessage('La cancha ya está reservada para esa fecha y hora. Cada reserva dura 30 minutos.');
      } else {
        setMessage('Error al crear la reserva');
      }
    } finally {
      setLoading(false);
    }
  };

  const eliminarReserva = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${API_BASE_URL}/reservas/${id}`);
      setReservas(reservas.filter(reserva => reserva.id !== id));
      setMessage('Reserva eliminada exitosamente');
    } catch (error) {
      console.error('Error al eliminar reserva:', error);
      setMessage('Error al eliminar la reserva');
    } finally {
      setLoading(false);
    }
  };

  const editarReserva = (reserva) => {
    setReservaParaEditar(reserva);
    setMostrarModalEdicion(true);
  };

  const guardarEdicionReserva = async (reservaActualizada) => {
    try {
      setLoading(true);
      const response = await axios.put(`${API_BASE_URL}/reservas/${reservaActualizada.id}`, {
        fecha_hora: reservaActualizada.horaInicio
      });
      
      // Actualizar la lista de reservas con la reserva editada
      setReservas(reservas.map(reserva => 
        reserva.id === reservaActualizada.id ? response.data : reserva
      ));
      
      setMostrarModalEdicion(false);
      setReservaParaEditar(null);
      setMessage('Reserva editada exitosamente');
    } catch (error) {
      console.error('Error al editar reserva:', error);
      if (error.response?.status === 400) {
        setMessage('Error: Ya existe una reserva en ese horario');
      } else {
        setMessage('Error al editar la reserva');
      }
    } finally {
      setLoading(false);
    }
  };

  const cerrarModalEdicion = () => {
    setMostrarModalEdicion(false);
    setReservaParaEditar(null);
  };

  return (
    <div className="App">
      <Header />

      <main className="App-main">
        <MessageAlert 
          message={message} 
          onClose={() => setMessage('')} 
        />

        <div className="container">
          <ReservaForm
            usuarios={usuarios}
            canchas={canchas}
            reservas={reservas}
            selectedUsuario={selectedUsuario}
            setSelectedUsuario={setSelectedUsuario}
            selectedCancha={selectedCancha}
            setSelectedCancha={setSelectedCancha}
            fechaHora={fechaHora}
            setFechaHora={setFechaHora}
            onAgregarUsuario={agregarUsuario}
            onCrearReserva={crearReserva}
            loading={loading}
          />

          <div className="reservas-section">
            <h2>📋 Reservas Actuales</h2>
            <ReservasList 
              reservas={reservas} 
              onEliminarReserva={eliminarReserva}
              onEditarReserva={editarReserva}
            />
          </div>
        </div>

        {/* Modal de edición */}
        <EditarReservaModal
          reserva={reservaParaEditar}
          isOpen={mostrarModalEdicion}
          onClose={cerrarModalEdicion}
          onSave={guardarEdicionReserva}
          reservasExistentes={reservas}
          canchas={canchas}
        />
      </main>
    </div>
  );
}

export default App;
