# 🏟️ Sistema de Reservas de Canchas - Frontend

Frontend desarrollado en React para el sistema de reservas de canchas deportivas con arquitectura modular de componentes.

## 🚀 Características

- **Interfaz moderna y atractiva** con diseño responsive
- **Arquitectura modular** con componentes reutilizables
- **Gestión de usuarios** - seleccionar usuarios existentes o agregar nuevos
- **Reserva de canchas** - sistema completo de reservas con validación
- **Vista de reservas actuales** - lista de todas las reservas con información detallada
- **Eliminación de reservas** - posibilidad de cancelar reservas
- **Validaciones** - evita reservas duplicadas y valida formularios

## 📋 Requisitos Previos

- Node.js (versión 14 o superior)
- Backend del sistema de reservas ejecutándose en `http://localhost:3002`
- Base de datos configurada con las canchas predefinidas

## 🛠️ Instalación

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar la base de datos:**
   - Asegúrate de que el backend esté ejecutándose
   - Ejecuta el script `database_setup.sql` en tu base de datos para insertar las canchas predefinidas

3. **Iniciar la aplicación:**
   ```bash
   npm start
   ```

La aplicación se abrirá en `http://localhost:3000`

## 🏗️ Estructura de Componentes

```
src/
├── components/
│   ├── Header.js              # Encabezado principal
│   ├── Header.css
│   ├── MessageAlert.js        # Sistema de mensajes/notificaciones
│   ├── MessageAlert.css
│   ├── ReservaForm.js         # Formulario principal de reservas
│   ├── ReservaForm.css
│   ├── UserSelector.js        # Selector y creador de usuarios
│   ├── UserSelector.css
│   ├── CanchaSelector.js      # Selector de canchas
│   ├── CanchaSelector.css
│   ├── DateTimeSelector.js    # Selector de fecha y hora
│   ├── DateTimeSelector.css
│   ├── ReservasList.js        # Lista de reservas
│   ├── ReservasList.css
│   ├── ReservaCard.js         # Tarjeta individual de reserva
│   ├── ReservaCard.css
│   └── index.js               # Índice de exportaciones
├── App.js                     # Componente principal (lógica de estado)
├── App.css                    # Estilos globales
└── index.js                   # Punto de entrada
```

### 🧩 Descripción de Componentes

#### **Header**
- Muestra el título principal y descripción
- Incluye iconos de deportes disponibles
- Diseño responsive con gradientes

#### **MessageAlert**
- Sistema de notificaciones unificado
- Maneja mensajes de éxito y error
- Animaciones suaves de entrada/salida

#### **ReservaForm**
- Formulario principal que orquesta todos los selectores
- Validación de campos completos
- Botón inteligente que se habilita solo cuando es válido

#### **UserSelector**
- Selector dropdown de usuarios existentes
- Formulario emergente para agregar nuevos usuarios
- Validación de nombres únicos

#### **CanchaSelector**
- Selector simple de canchas disponibles
- Estilizado personalizado

#### **DateTimeSelector**
- Input de fecha y hora con validación
- Previene selección de fechas pasadas
- Ayuda contextual para el usuario

#### **ReservasList**
- Lista completa de reservas
- Estado vacío personalizado
- Contador de reservas totales

#### **ReservaCard**
- Tarjeta individual para cada reserva
- Información completa (usuario, cancha, fecha, ID)
- Botón de eliminación integrado

## 🎨 Diseño y Estilos

### Características del Diseño
- **Arquitectura CSS modular** - cada componente tiene su propio CSS
- **Gradientes modernos** en tonos morados y azules
- **Efectos de vidrio esmerilado** (glassmorphism)
- **Animaciones suaves** en botones y tarjetas
- **Diseño responsive** para todos los dispositivos
- **Iconos emoji** para mejor UX

### Paleta de Colores
- Gradiente principal: `#667eea` → `#764ba2`
- Botón éxito: `#4CAF50` → `#45a049`
- Botón error: `#f44336` → `#da190b`
- Fondos: Transparencias con backdrop-filter

## 📱 Responsive Design

La aplicación está optimizada para:
- **Desktop** - Layout en dos columnas
- **Tablet** - Layout adaptativo
- **Mobile** - Layout en una columna con componentes optimizados

## 🔄 Estados de la Aplicación

### Estados de Carga
- Indicadores visuales durante operaciones
- Deshabilitación de componentes durante procesos
- Spinners y mensajes de carga

### Manejo de Errores
- Sistema centralizado de mensajes en `MessageAlert`
- Validación distribuida en cada componente
- Manejo de errores de conexión

## 🌟 Características Avanzadas

### Arquitectura Modular
- **Separación de responsabilidades** - cada componente tiene una función específica
- **Reutilización** - componentes independientes y reutilizables
- **Mantenibilidad** - fácil de mantener y expandir

### Validaciones Distribuidas
- **Fecha mínima** en `DateTimeSelector`
- **Campos requeridos** en `ReservaForm`
- **Nombres únicos** en `UserSelector`

### UX Mejorada
- **Feedback visual** inmediato en todas las acciones
- **Animaciones** específicas por componente
- **Estados inteligentes** que guían al usuario

## 🔧 Configuración de la API

```javascript
const API_BASE_URL = 'http://localhost:3002/api';
```

### Endpoints Utilizados:
- `GET /usuarios` - Obtener lista de usuarios
- `POST /usuarios` - Crear nuevo usuario
- `GET /canchas` - Obtener lista de canchas
- `GET /reservas` - Obtener todas las reservas
- `POST /reservas` - Crear nueva reserva
- `DELETE /reservas/:id` - Eliminar reserva

## 🚀 Scripts Disponibles

```bash
# Iniciar en modo desarrollo
npm start

# Construir para producción
npm run build

# Ejecutar tests
npm test

# Analizar el bundle
npm run eject
```

## 📦 Dependencias Principales

- **React** - Framework de UI
- **axios** - Cliente HTTP para API calls
- **CSS modules** - Estilos encapsulados por componente

## 🔮 Ventajas de la Arquitectura Modular

### ✅ Mantenibilidad
- Cada componente es independiente
- Cambios aislados no afectan otros componentes
- Fácil debugging y testing

### ✅ Escalabilidad
- Nuevos componentes se pueden agregar fácilmente
- Componentes existentes son reutilizables
- Estructura clara para equipos grandes

### ✅ Performance
- Componentes se pueden optimizar individualmente
- CSS específico por componente reduce overhead
- React puede optimizar re-renders por componente

### ✅ Developer Experience
- Estructura clara y organizada
- Fácil de entender para nuevos desarrolladores
- Componentes autocontenidos

## 🎯 Casos de Uso por Componente

### UserSelector
- Selección de usuario existente
- Creación de nuevo usuario
- Validación de nombres

### CanchaSelector
- Selección simple de cancha
- Integración con datos del backend

### DateTimeSelector
- Selección de fecha/hora
- Validación de fechas futuras
- UX mejorada con ayuda contextual

## 📝 Notas de Desarrollo

1. **Importaciones limpias** - usar el índice de componentes
2. **Props claramente definidas** - cada componente documenta sus props
3. **Estados locales** - componentes manejan su propio estado cuando es apropiado
4. **Comunicación por callbacks** - componentes se comunican hacia arriba via funciones

---

**¡Disfruta del Sistema de Reservas de Canchas con arquitectura modular!** 🎉
