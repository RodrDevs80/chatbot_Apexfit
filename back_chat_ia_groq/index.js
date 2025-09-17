import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import rateLimit from "express-rate-limit";
import chatRoutes from "./routes/chatBot.routes.js";


dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { error: 'Demasiadas solicitudes, intenta más tarde' }
});

app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? process.env.FRONTEND_URL
        : '*',
    credentials: true
}));
app.use(morgan('combined'));
app.use('/chatbot', limiter);


app.get('/', (req, res) => {
    res.json({
        status: true,
        msg: "Funcionando correctamente con Groq 🚀",
        especializacion: "Pesas, Crossfit, Suplementación, Rutinas de Ejercicio",
        modelo: "Llama 3 8B (Groq)"
    });
});

app.use('/api/v1/', chatRoutes)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en: http://localhost:${PORT}`);
    console.log('🤖 Usando Groq + Llama 3 como proveedor de IA');
});



