import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "../public/css/Tienda/index.css";
import "../public/css/styles.css";
import { Provider } from "react-redux";
import store from "./redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
