import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeProductFromCart,
  updateTotalPrice,
} from "../../../redux/shoppingSlice";

const ProductCarrito = ({ producto }) => {
  //const [cantidadProducto, setCantidadProducto] = useState(producto.cantidad);
  const carritoUser = useSelector((state) => state.carrito);
  const dispatch = useDispatch();

  const actualizarTotal = (e) => {
    let total = 0;
    const carrito = JSON.parse(localStorage.getItem("carrito"));

    carrito.forEach((producto) => {
      total += parseFloat(producto.precio) * producto.cantidad;
    });

    dispatch(updateTotalPrice(total));
  };

  const actualizarCantidadProducto = (e) => {
    const id = e.target.getAttribute("data-id");
    const carrito = JSON.parse(localStorage.getItem("carrito"));
    const productoAct = carrito.findIndex((prd) => prd.id === id);
    let carritoAct = null;

    if (e.target.textContent == "+") {
      carrito[productoAct].cantidad += 1;
      dispatch(increaseQuantity(id));
      localStorage.setItem("carrito", JSON.stringify(carrito));
    }
    if (e.target.textContent == "-") {
      if (carrito[productoAct].cantidad > 1) {
        carrito[productoAct].cantidad -= 1;
        dispatch(decreaseQuantity(id));
        localStorage.setItem("carrito", JSON.stringify(carrito));
      } else {
        carritoAct = carrito.filter((prd) => prd.id !== id);
        //setProductos(carritoAct);
        dispatch(removeProductFromCart(id));
        localStorage.setItem("carrito", JSON.stringify(carritoAct));
      }
    }

    //setCantidadProducto(carrito[productoAct].cantidad);
    actualizarTotal();
  };

  return (
    <tr className="row-product">
      <td className="content-img">
        <img
          src={producto.image}
          alt={producto.nombre}
          style={{
            width: "150px",
            height: "150px",
            display: "block",
            margin: "0 auto",
          }}
        />
      </td>
      <td>
        <span>{producto.nombre}</span>
      </td>
      <td>
        <span>{`${producto.precio}`}</span>
      </td>
      <td>
        <div className="buttons-agr-red">
          <button
            className="btn-agr"
            data-id={producto.id}
            onClick={actualizarCantidadProducto}
          >
            +
          </button>
          <span>{producto.cantidad}</span>
          <button
            className="btn-red"
            data-id={producto.id}
            onClick={actualizarCantidadProducto}
          >
            -
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProductCarrito;
