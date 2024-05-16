import { NavLink, Navigate } from "react-router-dom";
import "../../../../public/css/Admin/cabeceraAd.css";
import { useRef, useState } from "react";
import NavAdmin from "./NavAdmin";
import { useEffect } from "react";

const CabeceraAd = () => {
  const [usuario, setUsuario] = useState(JSON.parse(localStorage.getItem("usuario")));
  const toggleDarkMode = () => {
    const modoOscuro = document.querySelector(".modo-oscuro");
    const switchModo = document.querySelector(".switch");

    switchModo.addEventListener("click", () => {
      modoOscuro.classList.toggle("active");
    });
  };
  const handleThemeMode = () => {
    let body = document.body;
    const circulo = document.querySelector(".circulo");
    body.classList.toggle("dark-mode");
    circulo.classList.toggle("prendido");
  };

  //const handleClickSection = () => {};

  const handleCloudHide = () => {
    const linea = document.querySelector(".linea");
    const barraLateral = document.querySelector(".barra-lateral");
    barraLateral.classList.toggle("mini-barra-lateral");
    const spans = document.querySelectorAll("span");
    const main = document.querySelector("main");

    main.classList.toggle("min-main");
    spans.forEach((span) => {
      span.classList.toggle("oculto");
    });
    linea.classList.toggle("oculto-linea");
  };

  const handleClicLogout = () => {
    const buttonLogout = document.querySelector(".btn-logout");

    buttonLogout.classList.toggle("none");
  };

  const cerrarSesion = (e) => {
    e.preventDefault();
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  useEffect(() => {

    document.body.classList.add("body-ad");
    console.log("body-ad");

  },[]);

  return (
    <>
      <div className="menu-admin">
        <ion-icon name="menu-outline"></ion-icon>
        <ion-icon name="close-outline"></ion-icon>
      </div>

      <div className="barra-lateral">
        <div>
          <div className="nombre-pagina" onClick={handleCloudHide}>
            <ion-icon id="cloud" name="cloud-outline"></ion-icon>
            <span>Top Moda</span>
          </div>
        </div>

        <NavAdmin />

        <div className="content-usuario">
          <div className="linea"></div>

          <div className="modo-oscuro">
            <div className="info">
              <ion-icon name="moon-outline"></ion-icon>
              <span>Drak Mode</span>
            </div>
            <div className="switch" onClick={handleThemeMode}>
              <div className="base">
                <div className="circulo"></div>
              </div>
            </div>
          </div>

          <div className="usuario">
            <div className="info-usuario">
              <div className="nombre-email">
                <span className="nombre">{usuario.nombre}</span>{" "}
                <span className="email">{usuario.mail}</span>
              </div>
              <ion-icon
                name="ellipsis-vertical-outline"
                className="abrir-usuario"
                style={{ cursor: "pointer" }}
                onClick={handleClicLogout}
              ></ion-icon>
            </div>
          </div>
        </div>
        <button
          /*onClick="location.href='/usuario/cerrar'"*/

          className="none btn-logout"
          data-scroll-spy
          onClick={cerrarSesion}
        >
          <ion-icon name="log-out-outline"></ion-icon>
          Salir
        </button>
      </div>
    </>
  );
};

export default CabeceraAd;
