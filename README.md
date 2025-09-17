# ApexFit Chatbot - Asistente de IA para Fitness

## 📋 Descripción del Proyecto

ApexFit es un chatbot especializado en fitness que utiliza inteligencia artificial (Groq + Llama 3) para proporcionar respuestas precisas sobre entrenamiento deportivo, nutrición, suplementación y rutinas de ejercicio.

## 🚀 Características Principales

### Backend (Node.js + Express)

- **Especialización temática**: Respuestas limitadas a fitness y entrenamiento
- **Rate limiting**: Protección contra abuso (100 solicitudes cada 15 minutos)
- **Caching**: Respuestas en cache para mejorar rendimiento
- **Seguridad**: Filtrado de palabras prohibidas y temas no permitidos
- **Compresión**: Optimización de transferencia de datos

### Frontend (React + Vite)

- **Interfaz drag & drop**: Chatbot movible en la pantalla
- **Markdown support**: Formateo avanzado de respuestas
- **Typing animation**: Efectos de escritura progresiva
- **Diseño responsive**: Adaptable a diferentes dispositivos
- **Tailwind CSS**: Estilos modernos y consistentes

## 🛠️ Instalación y Configuración

### Prerrequisitos

- Node.js 16+
- Cuenta en [Groq](https://console.groq.com/) para API key

### Backend Setup

```bash
cd back_chat_ia_groq
npm install
```

Crear archivo `.env`:

```env
GROQ_API_KEY=tu_api_key_de_groq
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Frontend Setup

```bash
cd front_chat_ia
npm install
```

## 🎯 Ejemplos de Uso Concreto

### 1. Consultas sobre Rutinas de Ejercicio

**Pregunta:** "¿Cómo crear una rutina de pecho para principiantes?"
**Respuesta:** El chatbot proporcionará ejercicios como press de banca, flexiones y aperturas, con series, repeticiones y descansos recomendados.

### 2. Asesoramiento de Suplementación

**Pregunta:** "¿Qué suplementos tomar para ganar masa muscular?"
**Respuesta:** Recomendará proteína whey, creatina y BCAA's con dosis y timing de consumo.

### 3. Técnica de Ejercicios

**Pregunta:** "¿Cuál es la forma correcta de hacer sentadillas?"
**Respuesta:** Explicará posición de pies, espalda, profundidad y common mistakes.

### 4. Planificación de Entrenamiento

**Pregunta:** "Rutina de 3 días para full body"
**Respuesta:** Creará un plan detallado con ejercicios, volumen e intensidad.

## 🔄 Transformaciones Temáticas

### 1. Chatbot Nutricionista

**Modificaciones necesarias:**

- Actualizar `TEMATICAS_PERMITIDAS` con: dietas, macronutrientes, recetas, alergias
- Cambiar `PALABRAS_PROHIBIDAS` para permitir temas alimenticios
- Ajustar el prompt para especialización en nutrición

**Nuevo prompt ejemplo:**

```javascript
const prompt = `Eres un nutricionista especializado en...`;
```

### 2. Chatbot de Salud Mental

**Modificaciones necesarias:**

- Temáticas: mindfulness, meditación, estrés, ansiedad
- Respuestas empáticas y de apoyo
- Recursos de autoayuda y técnicas

### 3. Chatbot Académico (Matemáticas)

**Modificaciones necesarias:**

- Temáticas: álgebra, cálculo, geometría
- Capacidad para resolver problemas paso a paso
- Explicaciones didácticas

### 4. Chatbot de Programación

**Modificaciones necesarias:**

- Temáticas: JavaScript, Python, algoritmos
- Soporte para debugging y best practices
- Ejemplos de código

### 5. Chatbot de Viajes

**Modificaciones necesarias:**

- Temáticas: destinos, hoteles, vuelos, culturas
- Recomendaciones personalizadas
- Información práctica y tips

## 📊 Estructura de Archivos

```
back_chat_ia_groq/
├── config/
│   └── groqConfig.js          # Configuración de Groq
├── controller/
│   └── chatController.js      # Lógica del chatbot
├── routes/
│   └── chatBot.routes.js      # Rutas de API
├── util/
│   └── tematicas.js          # Listas de temas permitidos/prohibidos
├── index.js                  # Servidor principal
└── package.json

front_chat_ia/
├── src/
│   ├── service/
│   │   └── chat.service.js   # Cliente API
│   ├── util/
│   │   └── formatearTablas.js # Formateo de respuestas
│   ├── ApexFitChatbot.jsx    # Componente principal
│   └── main.jsx              # Punto de entrada
└── package.json
```

## ⚙️ Configuración Avanzada

### Personalización de Temáticas

Editar `back_chat_ia_groq/util/tematicas.js`:

```javascript
// Para chatbot de cocina
export const TEMATICAS_PERMITIDAS = [
  'recetas', 'ingredientes', 'técnicas culinarias', 'dietas', ...
];

export const PALABRAS_PROHIBIDAS = [
  // Mantener palabras peligrosas o inapropiadas
];
```

### Modificación del Comportamiento

En `chatController.js`, ajustar:

```javascript
const prompt = `Eres un experto en [nueva temática]...`;
```

### Personalización de la UI

En `ApexFitChatbot.jsx`, modificar:

- Colores del gradient
- Iconos y branding
- Flujo de conversación

## 🚀 Deployment

### Backend (Railway/Vercel)

```bash
npm install
# Configurar variables de entorno
npm start
```

### Frontend (Netlify/Vercel)

```bash
npm run build
# Deploy dist/ folder
```

## 🧪 Testing

### Probando el Backend

```bash
curl -X POST http://localhost:3000/api/v1/chatbot \
  -H "Content-Type: application/json" \
  -d '{"pregunta":"¿Cómo empezar en el gym?"}'
```

### Probando el Frontend

```bash
npm run dev
# Abrir http://localhost:5173
```

## 🔒 Seguridad y Consideraciones

- **Rate limiting**: Previene abuso del servicio
- **Filtrado de contenido**: Bloquea temas inapropiados
- **Validación de entrada**: Sanitiza preguntas del usuario
- **Error handling**: Manejo elegante de errores

## 📈 Monitoreo y Logs

El backend incluye:

- Morgan para logging de requests
- Cache para mejorar performance
- Manejo de errores específicos por tipo

## 🤝 Contribución

Para adaptar a nuevas temáticas:

1. Modificar `tematicas.js` con nuevas listas
2. Ajustar el prompt en `chatController.js`
3. Actualizar la UI en el frontend
4. Testear thoroughly

## 📞 Soporte

Para issues o adaptaciones:

- Revisar logs del backend
- Verificar API key de Groq
- Probar endpoints con curl

---

**Nota**: Este chatbot está diseñado para ser fácilmente adaptable a diferentes dominios temáticos manteniendo la misma infraestructura técnica.
