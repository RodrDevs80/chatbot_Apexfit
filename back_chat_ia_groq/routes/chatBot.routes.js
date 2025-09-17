import { Router } from "express";
import { obtenerRespuesta } from "../controller/chatController.js";

const chatRoutes = Router();

chatRoutes.post('/chatbot', obtenerRespuesta);

export default chatRoutes;