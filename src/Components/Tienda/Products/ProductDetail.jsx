import { useEffect, useState } from "react";
import helpHttp from "../../../helpers/helpHttp";
import { NavLink } from "react-router-dom";



const ProductDetail = ({
  productoRec,
  usuario,
  isOpenDetail,
  closeModal,
  productoId,
}) => {
  const [productoDetalle, setProductoDetalle] = useState({});
  const [inCarrito, setInCarrito] = useState(false);
  //console.log(productoId);
  const handlePropagate = (e) => {
    e.stopPropagation();
  }

  const agregarCarrito = (e) => {
    e.preventDefault();
    const id = e.target.getAttribute("data-id");
    console.log(id);
    console.log(e.target.parentNode.parentNode);
    //e.target.parentNode.parentNode.querySelector(".link-carrito").classList.remove("none");
    //e.target.classList.add("none");
    agregarProductoCarrito(e.target.parentNode.parentNode, id);
  };
  const agregarProductoCarrito = (elementoPro, id) => {
    console.log(elementoPro.parentNode);
    const producto = {
      id: id,
      nombre: elementoPro.querySelector(".modal__title").textContent,
      precio: elementoPro.querySelector(".modal__price").textContent.substr(1),
      image: elementoPro.parentNode.querySelector(".modal__img img").src,
      cantidad: 1,
    };
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    setInCarrito(true);
   // localStorage.setItem("carrito", JSON.stringify([...carrito, producto]));
  };
  const verificarProductoCarrito = (id) => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    return carrito.some((item) => item.id === id);
  };

  

  useEffect(() => {
    const productoCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const productoCarritoBoo = productoCarrito.some( producto => producto.id === productoId);

      
    if (productoCarritoBoo) {
      setInCarrito(true);
    }
    else{
      setInCarrito(false);
    }
  }, [productoId]);

  useEffect(() => {

   
    
    const getData = () => {
      helpHttp()
        .get("http://localhost:8080/productos/get/" + parseInt(productoId))
        .then((res) => setProductoDetalle(res))
        .catch((err) => console.log(err));
    };

    const actItemProducto = ()=>{
          
      const enlaceAgregar = document.querySelectorAll(".product .agregar-barrito");
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
    }
    getData();

    return () => actItemProducto(); 

  }, [productoId]);



  return (
    <article className={`modal ${isOpenDetail && "is-active"} `} onClick={closeModal}>
      <div className="modal__border" onClick={handlePropagate}>
        <div className="modal__container">
          <div className="modal__img">
            <img src={`../../public/images/${productoDetalle.imagen}`} alt="1_png" />
          </div>

          <div className="modal__content">
            <h2 className="modal__title">{productoDetalle.nombre}</h2>
            <p className="modal__description">{productoDetalle.descripcion}</p>
            <p className="modal__price">{productoDetalle.precio}</p>
            <div className="content__talla">
              <label htmlFor="cbotalla">Talla</label>
              <select name="cbotalla" id="">
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
              </select>
            </div>
            <div className="content__button">
              {inCarrito==true  && (
                <NavLink
                  to={"/cart"}
                  className="link-carrito btn2"
                  id="modal-agregar"
                  data-id ={`${productoDetalle.id}`}
                  
                >
                  Ir al carrito
                </NavLink>
              )}

              {inCarrito == false && (
                <a
                  href="#"
                  className="agregar-barrito btn2 "
                  id="modal-agregar"
                  data-id ={`${productoDetalle.id}`}
                  onClick={agregarCarrito}
                >
                  Agregar al carrito
                </a>
              )}
              {/*
                   
                    <a
                  href="/carrito"
                  className="link-carrito btn2 none"
                  id="modal-agregar"
                  th:unless="${sesion==null}"
                >
                  Ir al carrito
                </a>
                   
                   
                   */}

              {/*

                
                <a
                  href="#"
                  className="agregar-barrito btn2 none"
                  id="modal-agregar"
                  th:unless="${sesion==null}"
                >
                  Agregar al carrito
                </a>
                */}
            </div>
          </div>
        </div>
        <button className="cerrar-modal" onClick={closeModal}>
          X
        </button>
      </div>
    </article>
  );
};

export default ProductDetail;
