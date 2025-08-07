import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

// Componentes
import Header from './components/Header';
import MessageAlert from './components/MessageAlert';
import ReservaForm from './components/ReservaForm';
import ReservasList from './components/ReservasList';

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
      setMessage('¡Reserva creada exitosamente!');
    } catch (error) {
      console.error('Error al crear reserva:', error);
      if (error.response?.status === 400) {
        setMessage('La cancha ya está reservada para esa fecha y hora');
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
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
