import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="App-header">
      <div className="header-content">
        <h1>🏟️ Sistema de Reservas de Canchas</h1>
        <p>Reserva tu cancha deportiva de manera fácil y rápida</p>
        <div className="header-features">
          <span className="feature">⚽ Fútbol</span>
          <span className="feature">🏀 Básquet</span>
          <span className="feature">🎾 Tenis</span>
          <span className="feature">🏐 Polideportiva</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
