import "../../../../public/css/Admin/cabeceraAd.css";
import React, { forwardRef } from 'react'
import { NavLink } from 'react-router-dom';

const NavAdmin =  ()=> {


    const handleClick = (e) => {
        console.log(e.target);
        const $todosA = document.querySelectorAll(".navegacion-ad a");
        if(e.target.matches(".barra-lateral .navegacion-ad a")){
                
               e.preventDefault();
               e.stopPropagation();
               $todosA.forEach(el=> el.removeAttribute("id"));
               e.target.setAttribute("id","inbox");
            }
        if( e.target.matches(".navegacion-ad a *")){
            
            $todosA.forEach(el=> el.removeAttribute("id"));
            //e.target.parentElement.preventDefault();
           // e.target.parentElement.stopPropagation();
            e.target.parentElement.setAttribute("id","inbox");
        }
    }
  return (
    <nav className="navegacion-ad"  onClick={handleClick}>
    <ul>
      <li>
        <NavLink
          to="/admin/usuarios"
          data-ruta="/usuarios"
          data-scroll-spy
        >
          {" "}
          <ion-icon name="person"></ion-icon> <span>Usuarios</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/admin/proveedores"
          data-ruta="/proveedores"
          data-controlador="proveedores"
          data-scroll-spy
        >
          {" "}
          <ion-icon name="person-circle"></ion-icon>{" "}
          <span>Proveedores</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/admin/productos"
          data-controlador="productos"
          data-table="tablaProductos"
          data-scroll-spy
        >
          {" "}
          <ion-icon name="cube"></ion-icon> <span>Productos</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/admin/marcas"
          data-controlador="marcas"
          data-table="tablaMarcas"
          data-scroll-spy
        >
          {" "}
          <ion-icon name="pricetag"></ion-icon> <span>Marcas</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/admin/categorias"
          data-controlador="categorias"
          data-table="tablaCategorias"
          data-scroll-spy
        >
          {" "}
          <ion-icon name="list"></ion-icon> <span>Categorías</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/admin/pedidos"
          data-controlador="pedidos"
          data-table="tablaPedidos"
          data-scroll-spy
        >
          <ion-icon name="receipt-outline"></ion-icon>{" "}
          <span>Pedidos</span>{" "}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/admin/entradas"
          data-controlador="entradas"
          data-table="tablaEntradas"
          data-scroll-spy
        >
          <ion-icon name="bus-outline"></ion-icon> <span>Entradas</span>{" "}
        </NavLink>
      </li>
      {/*
              <li th:if="${usuario.tipo == 'ADMIN'}"><a th:href="@{/ventas}" data-controlador="ventas"
              data-table="tablaVentas" data-scroll-spy><ion-icon
                      name="cash-outline"></ion-icon> <span>Ventas</span> </a></li>
              */}
    </ul>
  </nav>
  )
};
NavAdmin.displayName = "NavAdmin";

export default NavAdmin
