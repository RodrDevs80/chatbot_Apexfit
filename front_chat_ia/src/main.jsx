import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ApexFitChatbot from "./ApexFitChatbot.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApexFitChatbot />
  </StrictMode>
);
