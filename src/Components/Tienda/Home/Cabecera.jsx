import '../../../../public/css/Tienda/index.css'
import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserOpcion from "../../Tienda/Home/UserOpcion";

const Cabecera = () => {
  const [usuario, setUsuario] = useState(JSON.parse(localStorage.getItem("usuario")));
  const [usuarioP, setUsuarioP] = useState(false);
  const [opcionesUsuario, setOpcionesUsuario] = useState(false);

  useEffect(() => {
    if (usuario) {
      setUsuarioP(true);
    }
    //Ya a partir de aquí puedo hacer renderizados condicionales, vuelvo después de dar comida a mis pollos
  }, [usuario]);

  const opcionesCarrito = (e) => {
    console.log("click");
    setOpcionesUsuario(!opcionesUsuario);
  };

  const cerrarSesion = (e) => {
    e.preventDefault();
    localStorage.removeItem("usuario");
    setUsuarioP(false);
    setOpcionesUsuario(false);
    window.location.href = "/";
  };

  return (
    <header className="header">
      <div className="menu container1">
        <a href="/" className="logo">
          TOP MODA
        </a>

        <nav className="navbar">
          <NavLink
            className={({ isActive }) => (isActive ? "is-active" : null)}
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "is-active" : null)}
            to="/products"
          >
            Productos
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "is-active" : null)}
            to="/contact"
          >
            Contacto
          </NavLink>
        </nav>
        <div className="opcion-usuario">
          {usuarioP && (
            <div className="imgcarrito">
              <ul>
                <li className="submenu">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "is-active" : null
                    }
                    to="/cart"
                  >
                     <img
                    src="../../public/images/car.svg"
                    id="img-carrito"
                    alt="carrito"
                  />
                  </NavLink>
                 
                </li>
              </ul>
            </div>
          )}

          <div className="card-container">
            {/*Es como decir, esto se cumple, entonces renderiza tal */}
            {usuarioP == false && (
              <div className="ingresar" id="ingresarContainer">
                <a href="/login">
                  <img src="../../public/images/ingresar.png" id="ingresar" />
                </a>
              </div>
            )}
            {usuarioP && (
              <div
                className="usuario"
                id="usuarioContainer"
                onClick={opcionesCarrito}
              >
                <img src="../../public/images/user.png" id="openCardBtn" />
              </div>
            )}
            {opcionesUsuario && (
              <UserOpcion usuario={usuario} cerrarSesion={cerrarSesion} />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Cabecera;
