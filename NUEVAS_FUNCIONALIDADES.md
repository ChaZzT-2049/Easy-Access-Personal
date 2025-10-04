# Nuevas Funcionalidades - Sistema de Control de Acceso QR

Este documento detalla las mejoras implementadas en el sistema de control de acceso mediante código QR.

## 🆕 Funcionalidades Agregadas

### 1. Sistema de Entrada/Salida
**Descripción:** El sistema ahora permite registrar tanto entradas como salidas de las instalaciones.

**Ubicación:** `src/pages/app/admin/instalation/AccessScaner.jsx`

**Características:**
- Botón alternador entre "Entrada" y "Salida"
- Indicador visual del tipo de registro (verde para entrada, rojo para salida)
- Iconos diferenciados (login/logout)
- Mensaje de confirmación personalizado según el tipo

**Uso:**
1. En el escáner QR, haz clic en el botón de tipo de acceso
2. Selecciona "Entrada" o "Salida"
3. Escanea el código QR del usuario
4. El sistema registrará el tipo seleccionado

### 2. Cálculo de Duración de Estancia
**Descripción:** Calcula automáticamente el tiempo que los usuarios permanecen en las instalaciones.

**Ubicación:** `src/utils/accessDuration.js`

**Funciones disponibles:**
- `calculateAccessDuration(records, userID)` - Calcula la duración total y promedio de estancia
- `formatDuration(milliseconds)` - Formatea la duración en formato legible (ej: "2h 30m")
- `getCurrentStatus(records)` - Determina si un usuario está actualmente "Dentro" o "Fuera"

**Ejemplo de uso:**
```javascript
import { calculateAccessDuration, formatDuration } from './utils/accessDuration';

const stats = calculateAccessDuration(records, userId);
console.log(stats.avgDurationMinutes); // Duración promedio en minutos
console.log(formatDuration(stats.avgDuration)); // "2h 30m"
```

### 3. Visualización Mejorada de Registros
**Descripción:** Interfaz renovada para mostrar registros con estadísticas y mejor presentación visual.

**Ubicación:** `src/features/Admin/Records/Records.jsx`

**Características:**
- Tarjetas de estadísticas con:
  - Total de registros
  - Número de entradas
  - Número de salidas
  - Usuarios únicos
  - Duración promedio de estancia
- Lista de registros con formato mejorado
- Código de colores (verde para entradas, rojo para salidas)
- Formato de fecha/hora en español mexicano

### 4. Exportación de Reportes a CSV
**Descripción:** Permite exportar los registros de acceso en formato CSV para análisis externo.

**Ubicación:** `src/utils/exportCSV.js`

**Funciones disponibles:**

#### 4.1. Exportación Simple
```javascript
exportRecordsToCSV(records, filename)
```
Exporta todos los registros con:
- Fecha
- Hora
- Usuario
- Tipo (Entrada/Salida)
- Instalación
- Punto de Acceso

#### 4.2. Exportación con Análisis de Duración
```javascript
exportRecordsWithDurationToCSV(records, filename)
```
Exporta registros pareados (entrada-salida) con:
- Usuario
- Fecha y hora de entrada
- Fecha y hora de salida
- Duración en minutos
- Instalación

**Uso en la interfaz:**
- En la página de Registros, haz clic en "Exportar Todos los Registros" o "Exportar con Duración"
- El archivo CSV se descarga automáticamente con codificación UTF-8 compatible con Excel

### 5. Historial de Accesos para Usuarios
**Descripción:** Nueva página que permite a los usuarios consultar su propio historial de accesos.

**Ubicación:** `src/pages/app/user/AccessHistory.jsx`

**Características:**
- Estado actual (Dentro/Fuera de las instalaciones)
- Estadísticas personales:
  - Total de registros
  - Número de entradas y salidas
  - Tiempo total de permanencia
  - Tiempo promedio de permanencia
- Lista de últimos 20 accesos
- Botón para exportar historial personal a CSV

**Cómo integrar en las rutas:**
Agregar en el archivo de rutas de usuario:
```javascript
import AccessHistory from './pages/app/user/AccessHistory';

// En las rutas:
<Route path="access-history" element={<AccessHistory />} />
```

## 📊 Estadísticas Disponibles

### En Panel de Administrador:
- Total de registros
- Entradas vs Salidas
- Usuarios únicos
- Duración promedio de estancia
- Capacidad actual de la instalación

### En Vista de Usuario:
- Estado actual (dentro/fuera)
- Total de visitas
- Tiempo total acumulado
- Tiempo promedio por visita
- Historial de accesos

## 🔧 Componentes Técnicos

### Utilities Agregadas:
1. **accessDuration.js** - Funciones para calcular y formatear duraciones
2. **exportCSV.js** - Funciones para exportar datos a CSV

### Componentes Modificados:
1. **AccessScaner.jsx** - Agregado selector de tipo de acceso
2. **Records.jsx** - Interfaz mejorada con estadísticas y exportación
3. **datoswelcome.js** - Actualizado con las nuevas características

### Componentes Nuevos:
1. **AccessHistory.jsx** - Página de historial para usuarios

## 🎨 Mejoras de UX/UI

### Código de Colores:
- 🟢 Verde (#4caf50): Entradas
- 🔴 Rojo (#f44336): Salidas
- 🔵 Azul: Información general

### Iconos Utilizados:
- `login`: Entrada
- `logout`: Salida
- `download`: Exportar
- `schedule`: Duración/Tiempo

### Formato de Fechas:
- Formato: español mexicano (es-MX)
- Ejemplo: "15 ene 2024, 14:30"

## 📱 Responsividad

Todos los componentes nuevos son totalmente responsivos y se adaptan a:
- 📱 Dispositivos móviles
- 💻 Tablets
- 🖥️ Escritorio

## 🚀 Próximas Mejoras Sugeridas

1. **Notificaciones en Tiempo Real**
   - Usar Firebase Cloud Messaging
   - Alertas cuando usuarios entran/salen
   - Notificaciones push a administradores

2. **Dashboard Avanzado**
   - Gráficos de afluencia por hora
   - Predicción de horarios pico
   - Análisis de patrones de uso

3. **Límites de Capacidad**
   - Alertas cuando se alcanza capacidad máxima
   - Control de aforo en tiempo real
   - Sistema de reservaciones

4. **Integración con Hardware**
   - Torniquetes automáticos
   - Cerraduras inteligentes
   - Cámaras de vigilancia

5. **Reportes Programados**
   - Envío automático de reportes por correo
   - Reportes semanales/mensuales
   - Comparativas de períodos

6. **Reconocimiento Facial**
   - Alternativa al código QR
   - Mayor seguridad
   - Acceso sin contacto

## 🐛 Consideraciones

### Firestore Rules:
Asegúrate de que las reglas de Firestore permitan:
- Lectura de registros por userID para usuarios
- Escritura de registros para administradores
- Lectura de estadísticas agregadas

### Índices Requeridos:
Firestore puede requerir índices para:
- `records` collection: `userID` + `date` (desc)
- `records` collection: `instID` + `date` (desc)

Los índices se crearán automáticamente cuando se ejecuten las queries por primera vez.

## 📖 Documentación Adicional

Para más información sobre React y Firebase:
- [React Documentation](https://reactjs.org/)
- [Firebase Firestore](https://firebase.google.com/docs/firestore)
- [Styled Components](https://styled-components.com/)

## 👥 Contribución

Estas mejoras fueron implementadas para el proyecto académico de control de acceso mediante código QR. Si deseas contribuir:

1. Fork el repositorio
2. Crea una rama para tu feature
3. Implementa los cambios
4. Crea un Pull Request

## 📄 Licencia

Este proyecto es de uso académico y educativo.
