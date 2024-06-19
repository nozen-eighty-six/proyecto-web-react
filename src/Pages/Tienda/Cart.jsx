import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "../../../public/css/Tienda/carrito.css";
import PiePagina from "../../Components/Tienda/Home/PiePagina";
import ProductCarrito from "../../Components/Tienda/Cart/ProductCarrito";
import ButtonPaypal from "../../Components/Tienda/Cart/ButtonPaypal";
import LoaderComponent from "../../Components/Reusable/LoaderComponent";
import {
  clearCart,
  updateTotalPrice,
  uploadProducts,
} from "../../redux/shoppingSlice";
import MenuToggle from "../../Components/Tienda/Home/MenuToggle";

const Cart = () => {
  // const [totalCarrito, setTotalCarrito] = useState(0);
  //const [productos, setProductos] = useState(null);
  const state = useSelector((state) => state.carrito);
  console.log(state);
  const dispatch = useDispatch();
  const [usuario, setUsuario] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const vaciarCarrito = (e) => {
    e.preventDefault();
    localStorage.removeItem("carrito");
    // setProductos(null);
    dispatch(clearCart());
    setIsDisabled(true);
    //document.querySelector("#total-carrito").textContent = 0;
  };
  useEffect(() => {
    const usuarioLoc = localStorage.getItem("usuario");

    if (usuarioLoc) {
      setUsuario(true);
    }
    //llenar el producto cuando se cargue el componente
    const llenarProductosCarrito = () => {
      const productos = JSON.parse(localStorage.getItem("carrito"));
      if (productos == null || productos.length == 0) {
        //setProductos([]);
        dispatch(uploadProducts([]));
        setIsDisabled(true);
        return;
      }

      //setProductos(productos);
      dispatch(uploadProducts(productos));
    };
    /*
    const actualizarPrice = () => {
      const productosCarr = JSON.parse(localStorage.getItem("carrito"));
      let total = 0;
      productosCarr.forEach((producto) => {
        total += producto.precio.slice(1) * producto.cantidad;
      });
      setTotalCarrito(total);
    };
    if (productos.length > 0 || productos != null) {
      actualizarPrice();
      }*/

    llenarProductosCarrito();

    //return () => setProductos([]);
  }, []);

  useEffect(() => {
    const actualizarPrice = () => {
      const productosCarr = JSON.parse(localStorage.getItem("carrito"));
      let total = 0;

      if (productosCarr) {
        productosCarr.forEach((producto) => {
          total += producto.precio * producto.cantidad;
        });
      }
      //setTotalCarrito(total);
      dispatch(updateTotalPrice(total));
    };
    actualizarPrice();
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div
        className="content-cart"
        style={{ position: "relative", overflowY: "hidden" }}
      >
        <header className="header-cart">
          <img id="flechaAtras" className="img" src="images/flecha.png" />
          <main className="products container" id="lista-1">
            <h2>Carrito de Compras</h2>
          </main>
        </header>

        <section className="section-pago">
          <div id="carrito">
            <table id="lista-carrito">
              <thead>
                <tr>
                  <th></th>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Accion</th>
                </tr>
              </thead>
              <tbody>
                <div
                  className={`content-message ${
                    (state?.products == null || state?.products.length == 0) &&
                    "is-active-cart "
                  }`}
                >
                  <span>No se ha agregado ningún producto</span>
                </div>

                {state?.products &&
                  state?.products.map((producto) => {
                    console.log(producto);
                    return (
                      <ProductCarrito key={producto.id} producto={producto} />
                    );
                  })}
              </tbody>
            </table>
            <a
              href="#"
              id="vaciar-carrito"
              className={`${isDisabled && "is-disabled"}`}
              onClick={vaciarCarrito}
            >
              <span>Vaciar carrito</span>
            </a>
          </div>

          <div className="content-pago">
            <div className="col-lg-3 carrito-total">
              <h2 className="card-total">
                TOTAL: $ <span id="total-carrito">{state?.totalPrice}</span>
              </h2>
            </div>
            <ButtonPaypal />
            <div className="desabilitar"></div>
          </div>
        </section>
        <MenuToggle />
        <LoaderComponent page={true} />
        <PiePagina />
      </div>
    </>
  );
};

export default Cart;
