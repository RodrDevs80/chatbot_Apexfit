# ApexFit Chatbot - Frontend React

Frontend moderno para un chatbot especializado en fitness, construido con React, Vite y Tailwind CSS.

## 🚀 Características

- **Interfaz flotante**: Chatbot movible y redimensionable
- **Typing animations**: Efectos de escritura progresiva
- **Markdown support**: Formateo avanzado de respuestas
- **Drag & Drop**: Mueve el chatbot por la pantalla
- **Diseño responsive**: Adaptable a todos los dispositivos
- **Tailwind CSS**: Estilos modernos y consistentes

## 📦 Instalación

```bash
cd front_chat_ia
npm install
```

## ⚙️ Configuración

Asegúrate de que el backend esté corriendo en `http://localhost:3000` o modifica la URL en el servicio:

```javascript
// En src/service/chat.service.js
const API_URL = "http://localhost:3000/api/v1/chatbot";
```

## 🏃‍♂️ Ejecución

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

## 🎨 Componentes Principales

### ApexFitChatbot.jsx

Componente principal que contiene:

- Interfaz de chat flotante
- Lógica de arrastre y movimiento
- Manejo de mensajes y estado
- Integración con el backend

### chat.service.js

Servicio para comunicación con la API del backend:

- Envío de preguntas al chatbot
- Manejo de errores
- Headers y configuración de axios

### formatearTablas.js

Utilidad para formatear respuestas en formato tabla Markdown

## 🎯 Uso del Chatbot

### Interacción Básica

```jsx
import ApexFitChatbot from "./ApexFitChatbot";

function App() {
  return (
    <div className="App">
      <ApexFitChatbot />
    </div>
  );
}
```

### Integración en una Página Existente

```jsx
import { useState } from "react";
import ApexFitChatbot from "./components/ApexFitChatbot";

function HomePage() {
  return (
    <div>
      {/* Tu contenido existente */}
      <header>...</header>
      <main>...</main>

      {/* Chatbot flotante */}
      <ApexFitChatbot />
    </div>
  );
}
```

### Personalización del Chatbot

Puedes modificar los colores, estilos y comportamiento editando `ApexFitChatbot.jsx`:

```jsx
// Cambiar colores del gradient
const gradientColors = "from-green-500 to-blue-600";

// Modificar el tamaño inicial
const [isMinimized, setIsMinimized] = useState(true);

// Personalizar mensaje de bienvenida
const [messages, setMessages] = useState([
  {
    id: 1,
    text: "¡Bienvenido! ¿En qué puedo ayudarte con tu entrenamiento?",
    sender: "bot",
    isTyping: false,
  },
]);
```

## 🔌 API Integration

### Servicio de Chat

```javascript
import chatService from "./service/chat.service";

// Uso básico
const respuesta = await chatService("¿Cómo hacer sentadillas?");

// Con manejo de errores
try {
  const respuesta = await chatService(pregunta);
  console.log(respuesta);
} catch (error) {
  console.error("Error:", error.message);
}
```

### Ejemplo de Consumo desde Otro Componente

```jsx
import { useState } from "react";
import chatService from "../service/chat.service";

function CustomFitnessAssistant() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const askQuestion = async (question) => {
    setLoading(true);
    try {
      const answer = await chatService(question);
      setResponse(answer);
    } catch (error) {
      setResponse("Error al obtener respuesta");
    }
    setLoading(false);
  };

  return (
    <div>
      <button onClick={() => askQuestion("Rutina para principiantes")}>
        Obtener Rutina
      </button>
      {loading ? <p>Cargando...</p> : <p>{response}</p>}
    </div>
  );
}
```

## 🎨 Personalización

### Cambiar Tema de Colores

Modifica las clases de Tailwind en `ApexFitChatbot.jsx`:

```jsx
// Gradient principal
bg-gradient-to-r from-blue-500 to-purple-600

// Puedes cambiarlo por:
bg-gradient-to-r from-green-500 to-teal-600
bg-gradient-to-r from-orange-500 to-red-600
bg-gradient-to-r from-purple-500 to-pink-600
```

### Modificar Iconos

Reemplaza los iconos de Lucide React:

```jsx
import { Dumbbell, HeartPulse, Clock, Target } from 'lucide-react';

// En el array de ventajas:
{
  id: 1,
  titulo: "Planificación Personalizada",
  texto: "Desde perder peso hasta ganar masa muscular.",
  icono: <HeartPulse className="text-red-500" size={24} />,
}
```

### Ajustar Animaciones

Modifica la velocidad de escritura:

```jsx
// En la función typeText
const typeText = (text, messageId, speed = 30) => {
  // speed en milisegundos entre caracteres
};
```

## 📱 Responsive Design

El chatbot es completamente responsive:

- **Mobile**: 100% width en dispositivos pequeños
- **Tablet**: Tamaño adaptable
- **Desktop**: Chatbot flotante movible

## 🔧 Configuración de Build

### Variables de Entorno

Crea un archivo `.env` para configuraciones:

```env
VITE_API_URL=http://localhost:3000/api/v1
VITE_APP_TITLE=ApexFit Chatbot
```

### Modificar Vite Config

`vite.config.js` ya incluye:

- Plugin de React
- Tailwind CSS
- Configuración base

## 🚀 Deployment

### Netlify/Vercel

```bash
npm run build
# Subir la carpeta dist/ a tu plataforma de hosting
```

### Configuración para Producción

Asegúrate de actualizar la URL de la API:

```javascript
// En producción
const API_URL = "https://tu-backend.com/api/v1/chatbot";
```

## 📊 Estructura del Proyecto

```
front_chat_ia/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   └── ApexFitChatbot.jsx
│   ├── service/
│   │   └── chat.service.js
│   ├── util/
│   │   └── formatearTablas.js
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── eslint.config.js
```

## 🎯 Ejemplos de Preguntas

El chatbot está especializado en:

- 🏋️‍♂️ Rutinas de ejercicio
- 💪 Técnicas de entrenamiento
- 🍎 Nutrición deportiva
- 🔥 Entrenamiento funcional
- ⚡ Suplementación

```javascript
// Ejemplos de preguntas:
const preguntasEjemplo = [
  "¿Cómo crear una rutina de gym para principiantes?",
  "¿Qué ejercicios son mejores para pectoral?",
  "¿Cómo mejorar mi técnica en deadlift?",
  "¿Qué suplementos tomar para ganar masa muscular?",
  "¿Cuántas series y repeticiones hacer para hipertrofia?",
];
```

## 🤝 Integración con Backend

El frontend espera que el backend responda con:

```json
{
  "respuesta": "Texto de la respuesta...",
  "cached": false,
  "tematica_permitida": true
}
```

## 🐛 Troubleshooting

### Error de CORS

Asegúrate de que el backend tenga CORS configurado correctamente.

### Conexión con Backend

Verifica que:

- El backend esté corriendo
- La URL en chat.service.js sea correcta
- No haya errores en la consola del navegador

### Estilos no Cargados

Ejecuta:

```bash
npm install
npm run dev
```

## 📝 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build para producción
- `npm run preview` - Preview del build
- `npm run lint` - Análisis de código

## 🎨 Personalización Avanzada

### Temas CSS Personalizados

Agrega en `index.css`:

```css
:root {
  --apex-primary: #3b82f6;
  --apex-secondary: #8b5cf6;
  --apex-background: #f8fafc;
}

.apex-chatbot {
  background: linear-gradient(
    135deg,
    var(--apex-primary),
    var(--apex-secondary)
  );
}
```

### Internacionalización

Para soporte multiidioma:

```jsx
const messages = {
  es: {
    welcome: "¡Bienvenido a ApexFit!",
    placeholder: "Escribe tu mensaje...",
    // ...
  },
  en: {
    welcome: "Welcome to ApexFit!",
    placeholder: "Type your message...",
    // ...
  },
};
```

Este frontend proporciona una interfaz moderna y responsive para interactuar con el chatbot especializado en fitness de ApexFit.
