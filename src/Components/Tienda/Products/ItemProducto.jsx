import { forwardRef, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const ItemProducto = forwardRef(function (props, ref) {
  const [carritoAgr, setCarritoAgr] = useState(false);
  const { productoRec, usuario, openModal,setProductoId } = props;
  console.log(usuario)

  const agregarCarrito = (e) => {
    e.preventDefault();
    //const id = e.target.id;
    // console.log(id);
    console.log(e.target.parentNode.parentNode);
    e.target.parentNode.parentNode.querySelector(".link-carrito").classList.remove("none");
    e.target.classList.add("none");
    agregarProductoCarrito(e.target.parentNode.parentNode, e.target.id);
  };

  const abrirModalDetalle = (e)=>{
    e.preventDefault();
    setProductoId(e.target.id);
    openModal();
  }

  const agregarProductoCarrito = (elementoPro, id) => {
    const producto = {
      id: id,
      nombre: elementoPro.querySelector("h3").textContent,
      precio: elementoPro.querySelector(".precio").textContent.substr(1),
      image: elementoPro.parentNode.querySelector("img").src,
      cantidad: 1,
    };
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
   // localStorage.setItem("carrito", JSON.stringify([...carrito, producto]));
  };

  const verificarProductoCarrito = (id) => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    return carrito.some((item) => item.id === id);
  };


  useEffect(() => {
    const verificarProductoEnCarrito = () => {
      
      const enlaceAgregar = document.querySelectorAll(".agregar-barrito");
      //console.log(enlaceAgregar);
      enlaceAgregar.forEach((enlace) => {
        //console.log(enlace.getAttribute("id"));
        if (verificarProductoCarrito(enlace.getAttribute("id"))) {
          //setCarritoAgr(true);
          enlace.classList.add("none");
          enlace.parentNode.querySelector(".link-carrito").classList.remove("none");

        }
        else{ 
          enlace.classList.remove("none");
          enlace.parentNode.querySelector(".link-carrito").classList.add("none");

        }
      });
    };
    verificarProductoEnCarrito();

    return()=>{
      
    }
  }, []);

  return (
    <div className="product" ref={ref}>
      <img src={`../../public/images/${productoRec.imagen}`} alt="" id="_1" />
      <div className="product-txt">
        <h3>{productoRec.nombre}</h3>
        <p>{productoRec.descripcion}</p>
        <p className="precio">${productoRec.precio}</p>

        {usuario == false && (
          <div className="button-container">
            <button className=" detalle-producto btn2" id={`${productoRec.id}`} onClick={abrirModalDetalle}>
              Ver Detalles
            </button>
          </div>
        )}
        {usuario == true && (
          <div className="button-container">
            <a
              href="#"
              className={`agregar-barrito btn2`}
              id={`${productoRec.id}`}
              onClick={agregarCarrito}
            >
              Agregar al carrito{" "}
            </a>
            
            <NavLink
                to="/cart"
                className={`link-carrito none`}
                id={`${productoRec.id}`}
              >
                Ir al carrito{" "}
                </NavLink>
            
            
          </div>
        )}
      </div>
    </div>
  );
});
ItemProducto.displayName = "ItemProducto";

export default ItemProducto;
