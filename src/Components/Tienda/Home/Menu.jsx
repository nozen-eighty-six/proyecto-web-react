import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
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
  );
};

export default Menu;
