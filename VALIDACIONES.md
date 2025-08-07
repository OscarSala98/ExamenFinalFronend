# 🔒 Sistema de Validación de Reservas

## 📋 Descripción General

El sistema implementa validaciones avanzadas para las reservas de canchas, considerando que **cada reserva tiene una duración fija de 30 minutos** y evitando conflictos de horarios.

## ⏰ Reglas de Negocio

### Duración de Reservas
- **Duración fija**: 30 minutos por reserva
- **Hora de inicio**: La seleccionada por el usuario
- **Hora de fin**: Automáticamente calculada (inicio + 30 minutos)

### Conflictos de Horarios
Una reserva tiene conflicto con otra si:
1. **Solapamiento parcial**: La nueva reserva comienza antes de que termine una existente
2. **Contenimiento**: La nueva reserva está completamente dentro de una existente
3. **Envolvimiento**: La nueva reserva abarca completamente una existente

## 🛠️ Implementación Técnica

### Archivo: `utils/timeValidation.js`

#### Constantes
```javascript
DURACION_RESERVA_MINUTOS = 30
```

#### Funciones Principales

##### `hayConflictoHorario(fecha1, fecha2)`
- **Propósito**: Detecta si dos reservas tienen conflicto
- **Algoritmo**: Verifica solapamiento de intervalos de tiempo
- **Retorna**: `boolean`

##### `validarDisponibilidadCancha(reservas, idCancha, fechaHora, idReservaExcluir)`
- **Propósito**: Valida si una cancha está disponible para una fecha/hora
- **Parámetros**:
  - `reservas`: Array de todas las reservas
  - `idCancha`: ID de la cancha a verificar
  - `fechaHora`: Fecha/hora de la nueva reserva
  - `idReservaExcluir`: ID a excluir (para ediciones)
- **Retorna**: 
  ```javascript
  {
    disponible: boolean,
    mensaje: string,
    conflicto?: Object
  }
  ```

##### `obtenerHorariosSugeridos(reservas, idCancha, fecha)`
- **Propósito**: Genera horarios disponibles para una cancha en un día
- **Rango**: 8:00 AM - 8:00 PM
- **Intervalos**: Cada 30 minutos
- **Retorna**: Array de horarios disponibles

## 📱 Integración en Componentes

### DateTimeSelector
- **Validación visual**: Borde rojo para horarios no válidos
- **Mensajes contextuales**: Muestra motivo del conflicto
- **Duración visible**: Muestra horario de inicio y fin

### ReservaForm
- **Validación en tiempo real**: Verifica disponibilidad al cambiar cancha/hora
- **Prevención de envío**: Deshabilita botón si hay conflictos
- **Mensajes específicos**: Feedback detallado por campo

### HorariosSugeridos
- **Horarios alternativos**: Muestra opciones disponibles
- **Selección rápida**: Un clic para seleccionar horario
- **Interfaz colapsable**: No ocupa espacio innecesariamente

## 🎯 Casos de Uso

### Caso 1: Reserva Sin Conflicto
```
Usuario: Juan Pérez
Cancha: Fútbol Principal
Hora: 14:00 - 14:30
Estado: ✅ Disponible
```

### Caso 2: Reserva Con Conflicto
```
Usuario: María García
Cancha: Fútbol Principal
Hora: 14:15 - 14:45
Conflicto con: Juan Pérez (14:00 - 14:30)
Estado: ❌ No disponible
Mensaje: "La cancha ya está reservada por Juan Pérez de 14:00 a 14:30"
```

### Caso 3: Horarios Sugeridos
```
Cancha: Fútbol Principal
Fecha: Hoy
Disponibles: [
  "15:00 - 15:30",
  "15:30 - 16:00",
  "16:00 - 16:30",
  "16:30 - 17:00"
]
```

## 🔍 Algoritmo de Detección de Conflictos

```javascript
function hayConflicto(nuevaReserva, reservaExistente) {
  const inicio1 = nuevaReserva.inicio;
  const fin1 = nuevaReserva.inicio + 30_minutos;
  
  const inicio2 = reservaExistente.inicio;
  const fin2 = reservaExistente.inicio + 30_minutos;
  
  // Hay conflicto si los intervalos se solapan
  return (inicio1 < fin2) && (fin1 > inicio2);
}
```

## 🚨 Validaciones del Frontend

### Tiempo Real
- Se ejecuta en `useEffect` cuando cambian cancha o fecha/hora
- Actualiza estado de validación instantáneamente
- Previene envío de formularios inválidos

### Validaciones Específicas
1. **Fecha futura**: No permite reservas en el pasado
2. **Campos requeridos**: Usuario, cancha y fecha/hora obligatorios
3. **Disponibilidad**: Verifica conflictos con reservas existentes
4. **Duración fija**: Automáticamente calcula fin de reserva

## 💡 Características Avanzadas

### Mensajes Inteligentes
```javascript
// Mensaje específico con detalles del conflicto
"La cancha ya está reservada por Juan Pérez de 
14 de agosto de 2025, 14:00 a 14:30. 
Cada reserva dura 30 minutos."
```

### Sugerencias Automáticas
- Calcula horarios libres en el mismo día
- Presenta opciones en formato fácil de leer
- Permite selección con un clic

### Interfaz Reactiva
- Colores visuales para estados (verde/rojo)
- Iconos contextual (✅/❌)
- Animaciones suaves de transición

## 🔧 Configuración

### Horarios de Operación
```javascript
// Configurables en timeValidation.js
const HORA_INICIO = 8;  // 8:00 AM
const HORA_FIN = 20;    // 8:00 PM
const INTERVALO = 30;   // 30 minutos
```

### Personalización de Mensajes
Los mensajes se generan dinámicamente con:
- Nombre del usuario en conflicto
- Fecha/hora formateada en español
- Duración de la reserva
- Sugerencias de acción

## 📊 Beneficios del Sistema

### Para Usuarios
- **Claridad**: Saben exactamente por qué no pueden reservar
- **Alternativas**: Reciben sugerencias de horarios libres
- **Eficiencia**: Selección rápida de horarios alternativos

### Para Administradores
- **Prevención**: Evita reservas duplicadas desde el frontend
- **Consistencia**: Validaciones uniformes en toda la aplicación
- **Mantenibilidad**: Lógica centralizada y reutilizable

---

Este sistema asegura que **todas las reservas respeten la duración de 30 minutos** y **evita conflictos de horarios** de manera inteligente y user-friendly. 🎉
