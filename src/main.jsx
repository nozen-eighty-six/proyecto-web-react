import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "../public/css/Tienda/index.css";
import { TokenProvider } from "../src/context/User/TokenProvider.jsx"
import { UsuarioProvider } from "../src/context/User/UsuarioProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UsuarioProvider>
      <TokenProvider>
        <App />
      </TokenProvider>
    </UsuarioProvider>
  </React.StrictMode>
) 
