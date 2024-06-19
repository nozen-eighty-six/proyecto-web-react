import CabeceraAd from "../../Components/Admin/AdminSection/CabeceraAd";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
//import Usuario from "../../Pages/Admin/Usuario";
/*import Proveedor from "../../Pages/Admin/Proveedor";
import Producto from "../../Pages/Admin/Producto";
import Marca from "../../Pages/Admin/Marca";
import Categoria from "../../Pages/Admin/Categoria";
import Pedido from "../../Pages/Admin/Pedido";
import Entrada from "../../Pages/Admin/Entrada";
import Error404 from "../../Pages/Error404";*/
import { Suspense, lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeToken } from "../../redux/tokenSlice";
import { SERVER_URL } from "../../consts/server";
import helpHttp from "../../helpers/helpHttp";

const Usuario = lazy(() => import("../../Pages/Admin/Usuario"));
const Proveedor = lazy(() => import("../../Pages/Admin/Proveedor"));
const Producto = lazy(() => import("../../Pages/Admin/Producto"));
const Marca = lazy(() => import("../../Pages/Admin/Marca"));
const Categoria = lazy(() => import("../../Pages/Admin/Categoria"));
const Pedido = lazy(() => import("../../Pages/Admin/Pedido"));
const Entrada = lazy(() => import("../../Pages/Admin/Entrada"));
const Error404 = lazy(() => import("../../Pages/Error404"));
const PrivateRoute = () => {
  const user = JSON.parse(localStorage.getItem("usuario")) || null;
  // const { usuario } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const state = useSelector((state) => state.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const verificar = async () => {
      console.log("Hola");
      //if (user == null && !tokenValido) {
      let tokenValido = await validateToken();

      console.log(tokenValido);
      if (tokenValido == false) {
        console.log("No hay usuario");
        //<Navigate to="/login" />;
        navigate("/login");
        //logear();
      }
      /*
    else {
      if (user.tipo != "ADMIN") {
        navigate("/");
      }
    }*/
    };

    verificar();
  }, [state.tokenUser]);

  const logear = () => <Navigate to="/login" />;

  const removeTokenUser = () => {
    dispatch(removeToken());
  };

  async function validateToken() {
    const url = SERVER_URL + "/token/verificarToken";
    let valido = false;
    const option = {
      headers: {
        Authorization: `Bearer ${state.tokenUser}`,
      },
    };

    try {
      const res = await helpHttp().get(url, option);
      if (res.status === 403) {
        console.log("No autorizado");
        removeUserLocal();
        removeTokenUser();
        valido = false;
      } else {
        console.log("Autorizado");
        valido = true;
      }
    } catch (error) {
      console.log(error);
      console.log("Error");
      valido = false;
    }
    return valido;
  }

  function removeUserLocal() {
    localStorage.removeItem("usuario");
  }

  return (
    <>
      <CabeceraAd usuario={user} removeTokenUser={removeTokenUser} />{" "}
      {/* Renderizamos A0dminCabecera fuera de Routes */}
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path="/usuarios" element={<Usuario />} />
          <Route path="/proveedores" element={<Proveedor />} />
          <Route path="/productos" element={<Producto />} />
          <Route path="/marcas" element={<Marca />} />
          <Route path="/categorias" element={<Categoria />} />
          <Route path="/pedidos" element={<Pedido />} />
          <Route path="/entradas" element={<Entrada o />} />
          <Route path="*" element={<Error404 />} />
          {/* Agregar más rutas protegidas aquí */}
        </Routes>
      </Suspense>
    </>
  );
};

export default PrivateRoute;
