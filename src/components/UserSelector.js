import React, { useState } from 'react';
import './UserSelector.css';

const UserSelector = ({ 
  usuarios, 
  selectedUsuario, 
  setSelectedUsuario, 
  onAgregarUsuario, 
  loading 
}) => {
  const [nuevoUsuario, setNuevoUsuario] = useState('');
  const [showAddUser, setShowAddUser] = useState(false);

  const handleAgregarUsuario = async () => {
    if (!nuevoUsuario.trim()) {
      return;
    }

    const resultado = await onAgregarUsuario(nuevoUsuario);
    if (resultado.success) {
      setSelectedUsuario(resultado.usuario.id.toString());
      setNuevoUsuario('');
      setShowAddUser(false);
    }
  };

  return (
    <div className="form-group">
      <label>👤 Usuario:</label>
      <div className="user-selection">
        <select 
          value={selectedUsuario} 
          onChange={(e) => setSelectedUsuario(e.target.value)}
          disabled={loading}
        >
          <option value="">Selecciona un usuario</option>
          {usuarios.map(usuario => (
            <option key={usuario.id} value={usuario.id}>
              {usuario.nombre}
            </option>
          ))}
        </select>
        <button 
          className="btn-add-user"
          onClick={() => setShowAddUser(!showAddUser)}
          disabled={loading}
        >
          ➕ Agregar Usuario
        </button>
      </div>

      {showAddUser && (
        <div className="add-user-form">
          <input
            type="text"
            placeholder="Nombre del nuevo usuario"
            value={nuevoUsuario}
            onChange={(e) => setNuevoUsuario(e.target.value)}
            disabled={loading}
            onKeyPress={(e) => e.key === 'Enter' && handleAgregarUsuario()}
          />
          <button onClick={handleAgregarUsuario} disabled={loading || !nuevoUsuario.trim()}>
            {loading ? '⏳' : '✅'} Agregar
          </button>
          <button onClick={() => setShowAddUser(false)}>❌ Cancelar</button>
        </div>
      )}
    </div>
  );
};

export default UserSelector;
