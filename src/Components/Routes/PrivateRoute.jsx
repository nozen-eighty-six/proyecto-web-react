import CabeceraAd from "../../Components/Admin/AdminSection/CabeceraAd";
import { Navigate, Route, Routes } from "react-router-dom";
import Usuario from "../../Pages/Admin/Usuario";
import Proveedor from "../../Pages/Admin/Proveedor";
import Producto from "../../Pages/Admin/Producto";
import Marca from "../../Pages/Admin/Marca";
import Categoria from "../../Pages/Admin/Categoria";
import Pedido from "../../Pages/Admin/Pedido";
import Entrada from "../../Pages/Admin/Entrada";
import Error404 from "../../Pages/Error404";
import { useState } from "react";

const PrivateRoute = () => {
  const [showAlert, setShowAlert] = useState(false);
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  if (usuario == null) {
    console.log("No hay usuario");
    return <Navigate to="/login" />;
  }
  if(usuario.tipo != "ADMIN"){
    console.log("No es admin");
    if(!showAlert){
      alert("No tienes permisos para acceder a esta página");
      setShowAlert(true);
    }
    //que redireccione a una ruta no permitida
    return <Navigate to="/" />;

  }

  return (
    <>
      <CabeceraAd usuario={usuario} />{" "}
      {/* Renderizamos AdminCabecera fuera de Routes */}
      <Routes>
        <Route  path="/usuarios" element={<Usuario  />} />
        <Route path="/proveedores" element={<Proveedor  />} />
        <Route path="/productos" element={<Producto />} />
        <Route path="/marcas" element={<Marca />} />
        <Route path="/categorias" element={<Categoria />} />
        <Route path="/pedidos" element={<Pedido  />} />
        <Route path="/entradas" element={<Entrada o />} />
        <Route path="*" element={<Error404 />} />
        {/* Agregar más rutas protegidas aquí */}
      </Routes>
    </>
  );
};

export default PrivateRoute;
