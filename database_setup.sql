-- Script para insertar canchas predefinidas
-- Ejecutar este script en tu base de datos para tener las canchas iniciales

INSERT INTO canchas (id, nombre) VALUES 
(1, 'Cancha de Fútbol Principal'),
(2, 'Cancha de Básquet Norte'),
(3, 'Cancha de Tenis Sur'),
(4, 'Cancha Polideportiva')
ON DUPLICATE KEY UPDATE nombre = VALUES(nombre);

-- También agregar algunos usuarios de ejemplo
INSERT INTO usuarios (nombre) VALUES 
('Juan Pérez'),
('María García'),
('Carlos López'),
('Ana Martínez')
ON DUPLICATE KEY UPDATE nombre = VALUES(nombre);
