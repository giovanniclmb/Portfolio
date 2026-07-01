import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/vt323/400.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/600.css";
import "./styles/tokens.css";
import "./styles/global.css";
import "./styles/crt.css";
import "./styles/terminal.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
