import "../../../../public/css/Tienda/index.css";
import { NavLink, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserOpcion from "../../Tienda/Home/UserOpcion";
import { useDispatch, useSelector } from "react-redux";
import { removeToken } from "../../../redux/tokenSlice";
import { activarDesacMenu, activarMenu } from "../../../redux/reponsiveOpSlice";
import { removeUser } from "../../../redux/userSlice";

const Cabecera = () => {
  const { usuario } = useSelector((state) => state.user);
  const { menuresponsive } = useSelector((state) => state.menu);
  console.log(menuresponsive);
  console.log(usuario);
  const dispatch = useDispatch();
  const [usuarioP, setUsuarioP] = useState(false);
  const [opcionesUsuario, setOpcionesUsuario] = useState(false);
  useEffect(() => {
    if (usuario) {
      setUsuarioP(true);
    }
    //Ya a partir de aquí puedo hacer renderizados condicionales, vuelvo después de dar comida a mis pollos
  }, [usuario]);
  /*
  const handleChange = (e) => {
    setMenuToogle(e.target.checked);
  };*/
  /*
  const handleClick = (e) => {
    const menuToogleUser = document.querySelector(".toggle-option");
    console.log(e.target);
    if (menuToogle) {
      menuToogleUser.classList.remove("origin-bottom");

      menuToogleUser.classList.remove("scale-y-0");

      menuToogleUser.classList.add("origin-top");
      menuToogleUser.classList.add("scale-y-100");
    } else {
      menuToogleUser.classList.remove("origin-top");
      menuToogleUser.classList.remove("scale-y-100");

      menuToogleUser.classList.add("origin-bottom");

      menuToogleUser.classList.add("scale-y-0");
    }
  };
*/
  const opcionesCarrito = (e) => {
    console.log("click");
    setOpcionesUsuario(!opcionesUsuario);
  };

  const cerrarSesion = (e) => {
    e.preventDefault();
    localStorage.removeItem("usuario");
    dispatch(removeToken());
    dispatch(removeUser());
    setUsuarioP(false);
    setOpcionesUsuario(false);
    <Navigate to={"/"} />;
  };

  useEffect(() => {
    const verificarEstadoMenu = () => {
      const menuToogleUser = document.querySelector(".toggle-option");
      if (menuToogleUser) {
        console.log("menuToogleUser");
        menuToogleUser.classList.remove("sm:hidden");
        menuToogleUser.classList.add("sm:flex");
        if (!menuresponsive) {
          console.log("pasando por aquí porque es falso");
          menuToogleUser.classList.remove("origin-top");
          menuToogleUser.classList.remove("scale-y-100");

          menuToogleUser.classList.add("origin-bottom");

          menuToogleUser.classList.add("scale-y-0");
        } else {
          console.log("pasando por aquí porque es true");

          menuToogleUser.classList.remove("origin-bottom");

          menuToogleUser.classList.remove("scale-y-0");

          menuToogleUser.classList.add("origin-top");
          menuToogleUser.classList.add("scale-y-100");
        }
      }
    };

    verificarEstadoMenu();
  }, [menuresponsive]);

  return (
    <header className="header">
      <div className="menu container1">
        <a href="/" className="logo sm:block">
          TOP MODA
        </a>
        <input type="checkbox" id="menu" name="menu" />
        <label
          htmlFor="menu"
          className="sm:block md:block lg:hidden"
          onClick={() => dispatch(activarDesacMenu())}
        >
          <img src="/images/menu.png" alt="menu" className="menu-icono" />
        </label>

        <nav className="navbar  justify-center items-center sm:hidden  sm:text-xl xl:text-lg lg:flex">
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
        <div className="opcion-usuario sm:hidden lg:block">
          {usuario && (
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
            {usuario == null && (
              <div className="ingresar" id="ingresarContainer">
                <a href="/login">
                  <img src="../../public/images/ingresar.png" id="ingresar" />
                </a>
              </div>
            )}
            {usuario && (
              <div
                className="usuario"
                id="usuarioContainer"
                onClick={opcionesCarrito}
              >
                <img src="../../public/images/user.png" id="openCardBtn" />
              </div>
            )}
            {opcionesUsuario && (
              <UserOpcion user={usuario} cerrarSesion={cerrarSesion} />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Cabecera;
