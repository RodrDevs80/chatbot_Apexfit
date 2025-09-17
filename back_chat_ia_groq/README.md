# Backend Chat IA con Groq - Especializado en Fitness

Este backend proporciona un servicio de chatbot especializado en fitness, entrenamiento deportivo, suplementación y rutinas de ejercicio utilizando Groq y el modelo Llama 3.

## 🚀 Características

- **Especialización temática**: Solo responde sobre fitness y entrenamiento
- **Rate Limiting**: 100 solicitudes cada 15 minutos por IP
- **Caching**: Respuestas cacheadas para mejor rendimiento
- **Seguridad**: Filtrado de palabras prohibidas y temas no permitidos
- **Compresión**: Optimización de transferencia de datos

## 📦 Instalación

```bash
cd back_chat_ia_groq
npm install
```

## ⚙️ Configuración

Crear archivo `.env` en la raíz del proyecto:

```env
GROQ_API_KEY=tu_api_key_de_groq_aqui
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## 🏃‍♂️ Ejecución

```bash
# Desarrollo (con watch mode)
npm run dev

# Producción
npm start
```

## 📡 API Endpoints

### POST /api/v1/chatbot

Envía una pregunta al chatbot especializado en fitness.

**Body:**

```json
{
  "pregunta": "¿Cómo hacer sentadillas correctamente?"
}
```

**Response:**

```json
{
  "respuesta": "Para hacer sentadillas correctamente: 1. Pies separados al ancho de hombros...",
  "cached": false,
  "tematica_permitida": true
}
```

### GET /

Verifica el estado del servidor.

**Response:**

```json
{
  "status": true,
  "msg": "Funcionando correctamente con Groq 🚀",
  "especializacion": "Pesas, Crossfit, Suplementación, Rutinas de Ejercicio",
  "modelo": "Llama 3 8B (Groq)"
}
```

## 🎯 Ejemplos de Uso desde Frontend

### Ejemplo 1: React con Axios

```jsx
import React, { useState } from "react";
import axios from "axios";

const FitnessChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/chatbot",
        {
          pregunta: input,
        }
      );

      setMessages((prev) => [
        ...prev,
        { type: "user", text: input },
        { type: "bot", text: response.data.respuesta },
      ]);
      setInput("");
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { type: "error", text: "Error al conectar con el servidor" },
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.type}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Pregunta sobre fitness..."
          disabled={loading}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} disabled={loading}>
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </div>
    </div>
  );
};
```

### Ejemplo 2: JavaScript Vanilla con Fetch

```javascript
class FitnessChatbot {
  constructor(baseURL = "http://localhost:3000") {
    this.baseURL = baseURL;
    this.conversation = [];
  }

  async askQuestion(question) {
    try {
      const response = await fetch(`${this.baseURL}/api/v1/chatbot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pregunta: question }),
      });

      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }

      const data = await response.json();

      this.conversation.push({
        question,
        answer: data.respuesta,
        cached: data.cached,
        allowed: data.tematica_permitida,
      });

      return data;
    } catch (error) {
      console.error("Error:", error);
      return { error: error.message };
    }
  }

  // Ejemplo de uso
  async ejemploUso() {
    const preguntas = [
      "¿Cómo empezar en el gym?",
      "¿Qué suplementos tomar para ganar masa muscular?",
      "Rutina de pecho para principiantes",
    ];

    for (const pregunta of preguntas) {
      const respuesta = await this.askQuestion(pregunta);
      console.log("Pregunta:", pregunta);
      console.log("Respuesta:", respuesta.respuesta);
      console.log("---");
    }
  }
}

// Uso del chatbot
const chatbot = new FitnessChatbot();
chatbot.ejemploUso();
```

### Ejemplo 3: Vue.js

```vue
<template>
  <div class="chatbot">
    <div
      v-for="(msg, index) in messages"
      :key="index"
      :class="['message', msg.type]"
    >
      {{ msg.text }}
    </div>

    <div class="input-group">
      <input
        v-model="inputMessage"
        @keyup.enter="sendMessage"
        placeholder="Pregunta sobre fitness..."
        :disabled="loading"
      />
      <button @click="sendMessage" :disabled="loading">
        {{ loading ? "Enviando..." : "Enviar" }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
      inputMessage: "",
      loading: false,
    };
  },
  methods: {
    async sendMessage() {
      if (!this.inputMessage.trim() || this.loading) return;

      this.loading = true;
      this.messages.push({ type: "user", text: this.inputMessage });

      try {
        const response = await fetch("http://localhost:3000/api/v1/chatbot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pregunta: this.inputMessage }),
        });

        const data = await response.json();
        this.messages.push({ type: "bot", text: data.respuesta });
      } catch (error) {
        this.messages.push({ type: "error", text: "Error de conexión" });
      }

      this.inputMessage = "";
      this.loading = false;
    },
  },
};
</script>
```

### Ejemplo 4: Angular Service

```typescript
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

interface ChatResponse {
  respuesta: string;
  cached: boolean;
  tematica_permitida: boolean;
}

@Injectable({
  providedIn: "root",
})
export class FitnessChatService {
  private apiUrl = "http://localhost:3000/api/v1/chatbot";

  constructor(private http: HttpClient) {}

  askQuestion(question: string): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(this.apiUrl, { pregunta: question });
  }

  // Ejemplo de uso en componente
  async ejemploUso() {
    const questions = [
      "¿Cómo mejorar mi técnica de deadlift?",
      "¿Qué ejercicios hacer para pectoral?",
      "¿Es buena la creatina?",
    ];

    for (const question of questions) {
      this.askQuestion(question).subscribe({
        next: (response) => {
          console.log("Pregunta:", question);
          console.log("Respuesta:", response.respuesta);
        },
        error: (error) => {
          console.error("Error:", error);
        },
      });
    }
  }
}
```

### Ejemplo 5: Python con requests

```python
import requests
import json

class FitnessChatbot:
    def __init__(self, base_url="http://localhost:3000"):
        self.base_url = base_url
        self.conversation = []

    def ask_question(self, question):
        try:
            response = requests.post(
                f"{self.base_url}/api/v1/chatbot",
                headers={"Content-Type": "application/json"},
                data=json.dumps({"pregunta": question}),
                timeout=30
            )

            data = response.json()
            self.conversation.append({
                "question": question,
                "answer": data["respuesta"],
                "cached": data["cached"]
            })

            return data

        except requests.exceptions.RequestException as e:
            print(f"Error de conexión: {e}")
            return {"error": str(e)}

    def ejemplo_uso(self):
        preguntas = [
            "¿Cómo hacer press banca correctamente?",
            "¿Cuántas series y repeticiones para hipertrofia?",
            "¿Qué suplementos tomar para resistencia?"
        ]

        for pregunta in preguntas:
            respuesta = self.ask_question(pregunta)
            if "respuesta" in respuesta:
                print(f"P: {pregunta}")
                print(f"R: {respuesta['respuesta']}")
                print("-" * 50)

# Uso del chatbot
if __name__ == "__main__":
    chatbot = FitnessChatbot()
    chatbot.ejemplo_uso()
```

## 🎯 Preguntas Ejemplo para Probar

```javascript
// Preguntas dentro de la temática permitida
const preguntasFitness = [
  "¿Cómo hacer sentadillas correctamente?",
  "¿Qué rutina recomiendas para principiantes?",
  "¿Cuáles son los mejores suplementos para ganar masa muscular?",
  "¿Cómo mejorar mi técnica en press de banca?",
  "¿Qué ejercicios hacer para abdominales?",
  "¿Es bueno el crossfit para perder peso?",
  "¿Cómo aumentar mi fuerza en peso muerto?",
  "¿Qué proteína whey recomiendas?",
  "¿Cómo crear una rutina de 4 días?",
  "¿Qué ejercicios para espalda son más efectivos?",
];

// Preguntas fuera de la temática (serán rechazadas)
const preguntasNoPermitidas = [
  "¿Qué piensas sobre la política actual?",
  "¿Cuál es el mejor banco para invertir?",
  "¿Cómo programar en JavaScript?",
  "¿Qué película recomiendas ver?",
];
```

## 🔒 Manejo de Errores

El backend devuelve diferentes códigos de estado:

- `200`: Respuesta exitosa
- `400`: Pregunta vacía o mal formada
- `429`: Demasiadas solicitudes (rate limit)
- `500`: Error interno del servidor
- `504`: Timeout en la respuesta de Groq

## 🎨 Temáticas Permitidas

El chatbot está especializado en:

- 🏋️‍♂️ Entrenamiento con pesas
- 🔥 Crossfit y functional training
- 💊 Suplementación deportiva
- 📋 Rutinas y programas de ejercicio
- 🍎 Nutrición deportiva básica
- 🏃‍♂️ Ejercicios cardiovasculares
- 🤸‍♂️ Movilidad y flexibilidad

## ❌ Temáticas Prohibidas

Incluye filtros para:

- Política y gobierno
- Religión y espiritualidad
- Finanzas y economía
- Tecnología y programación
- Entretenimiento y medios
- Y muchos otros temas no relacionados con fitness

Este backend está optimizado para proporcionar respuestas rápidas, seguras y especializadas en el ámbito del fitness y entrenamiento deportivo.
