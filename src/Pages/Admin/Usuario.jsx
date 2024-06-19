import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import helpHttp from "../../helpers/helpHttp";
import TableUser from "../../Components/Admin/UsuarioSection/TableUser";
import Buscador from "../../Components/Admin/Reusable/Buscador";
import LoaderComponent from "../../Components/Reusable/LoaderComponent";
import { useSelector } from "react-redux";
import { SERVER_URL } from "../../consts/server";

const Usuario = () => {
  //const [token, setToken] = useState(localStorage.getItem("token"));
  const state = useSelector((state) => state.token);
  const [usuarioData, setUsuarioData] = useState([]);

  console.log(state.tokenUser);
  const handleClick = () => {
    let aUsuario = document.querySelector(
      ".navegacion-ad a[href='/admin/usuarios']"
    );
    const $todosA = document.querySelectorAll(".navegacion-ad a");

    $todosA.forEach((el) => el.removeAttribute("id"));
    if (aUsuario) {
      aUsuario.setAttribute("id", "inbox");
    }
    /*
    if (e.target.matches(".navegacion a *")) {
      $todosA.forEach((el) => el.removeAttribute("id"));
      //e.target.parentElement.preventDefault();
      // e.target.parentElement.stopPropagation();
      e.target.parentElement.setAttribute("id", "inbox");
    }*/
  };

  useEffect(() => {
    const options = {
      headers: {
        Authorization: `Bearer ${state.tokenUser}`,
      },
    };

    helpHttp()
      .get(SERVER_URL + "/usuario/listar", options)
      .then((res) => setUsuarioData(res))
      .catch((err) => console.log(err));
    handleClick();
  }, [state]);

  return (
    <main
      className="lg:m-l-63"
      style={{ position: "relative", minHeight: "100vh" }}
    >
      <h2 style={{ fontWeight: "normal" }}>Top Moda | Usuario</h2>
      <Buscador
        seccion="usuario"
        data={usuarioData}
        setSeccionData={setUsuarioData}
        abrirModalCrearSeccion={true}
        crearButton={false}
      />

      <div className="table-content">
        <TableUser data={usuarioData} />
      </div>
      <LoaderComponent page={true} />
    </main>
  );
};

export default Usuario;
