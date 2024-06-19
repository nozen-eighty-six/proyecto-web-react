import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Navigate } from "react-router-dom";
import { activarDesacMenu } from "../../../redux/reponsiveOpSlice";
import { removeToken } from "../../../redux/tokenSlice";
import { removeUser } from "../../../redux/userSlice";

const MenuToggle = () => {
  const { usuario } = useSelector((state) => state.user);
  console.log(usuario);
  const { menuresponsive } = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  const verificarEstadoMenu = () => {
    const menuToogleUser = document.querySelector(".toggle-option");

    if (!menuresponsive) {
      menuToogleUser.classList.remove("origin-top");
      menuToogleUser.classList.remove("scale-y-100");

      menuToogleUser.classList.add("origin-bottom");

      menuToogleUser.classList.add("scale-y-0");
    } else {
      menuToogleUser.classList.remove("origin-bottom");

      menuToogleUser.classList.remove("scale-y-0");

      menuToogleUser.classList.add("origin-top");
      menuToogleUser.classList.add("scale-y-100");
    }
  };

  const cerrarSesion = (e) => {
    e.preventDefault();
    localStorage.removeItem("usuario");
    dispatch(removeToken());
    dispatch(removeUser());
    <Navigate to={"/"} />;
  };
  return (
    <nav
      className={`toggle-option 
      sm:fixed sm:top-vh-15 sm:right-0 sm:left-0 sm:bottom-0 sm:bg-black
        sm:flex sm:items-start sm:justify-center sm:transition sm:duration-500 
        md:transition md:duration-500
        lg:transition lg:scale-y-0 lg:origin-bottom ${
          menuresponsive ? "sm:flex" : "sm:hidden"
        }`}
    >
      <div className="border rounded-md border-white border-solid sm:p-10 sm:w-90 sm:h-90 sm:mt-3">
        <ul className="sm:flex sm:flex-col sm:text-gray-200 sm:text-xl sm:w-1/2 ">
          <li className="sm:mb-4 sm:w-2/5 ">
            <NavLink
              to="/"
              className={({ isActive }) =>
                (isActive ? "is-active" : null) +
                " sm:block w-full sm:text-center sm:hover:text-gray-400"
              }
              onClick={() => {
                dispatch(activarDesacMenu());

                verificarEstadoMenu();
              }}
            >
              Home
            </NavLink>
          </li>
          <li className="sm:mb-4 sm:w-2/5">
            <NavLink
              to="/products"
              className={({ isActive }) =>
                (isActive ? "is-active" : null) +
                " sm:block sm:w-full sm:text-center sm:hover:text-gray-400"
              }
              onClick={() => {
                dispatch(activarDesacMenu());

                verificarEstadoMenu();
              }}
            >
              Productos
            </NavLink>
          </li>
          <li className="sm:mb-4 sm:w-2/5">
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                (isActive ? "is-active" : null) +
                " sm:block sm:w-full sm:text-center sm:hover:text-gray-400"
              }
              onClick={() => {
                dispatch(activarDesacMenu());

                verificarEstadoMenu();
              }}
            >
              Contacto
            </NavLink>
          </li>
          <li className="sm:w-2/5">
            {usuario == null ? (
              <a
                href="/login"
                className="sm:block  sm:w-full sm:text-center sm:cursor-pointer sm:hover:text-gray-400"
                onClick={() => {
                  dispatch(activarDesacMenu());

                  verificarEstadoMenu();
                }}
              >
                Iniciar Sesión
              </a>
            ) : (
              <a
                href="/login"
                className="sm:block  sm:w-full sm:text-center sm:cursor-pointer sm:hover:text-gray-400"
                onClick={(e) => {
                  dispatch(activarDesacMenu());
                  verificarEstadoMenu();
                  cerrarSesion(e);
                }}
              >
                Cerrar Sesión
              </a>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MenuToggle;
