//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import PrivateRoute from "./Components/Routes/PrivateRoute";
import PublicRoutes from "./Components/Routes/PublicRoutes";
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<PrivateRoute />} />
        <Route path="/login" element={<Login />} />{" "}
        
        {/* Definición de la ruta para "/login" */}
        <Route path="*" element={<PublicRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

/*
function PrivateRoute() {
  const {usuario} = useContext(UsuarioContext); // Función para obtener el estado de autenticación
  console.log(usuario);
  if (usuario == null) {
    console.log("No hay usuario");
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Routes>
        <Route path="/admin/usuarios" element={<Usuario />} />
        <Route path="/admin/proveedores" element={<Proveedor />} />
        <Route path="/admin/productos" element={<Producto />} />
        <Route path="/admin/marcas" element={<Marca />} />
        <Route path="/admin/categorias" element={<Categoria />} />
        <Route path="/admin/pedidos" element={<Pedido />} />
        <Route path="/admin/entradas" element={<Entrada />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}*/

// Definir un enrutamiento separado para el componente de inicio de sesión

export default App;
