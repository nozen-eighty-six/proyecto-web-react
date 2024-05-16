import { useEffect, useState } from "react";
import  "../../../public/css/Tienda/carrito.css";
import PiePagina from "../../Components/Tienda/Home/PiePagina";
import ProductCarrito from "../../Components/Tienda/Cart/ProductCarrito";
import ButtonPaypal from "../../Components/Tienda/Cart/ButtonPaypal";
import LoaderComponent from "../../Components/Reusable/LoaderComponent"

const Cart = () => {
  const [totalCarrito, setTotalCarrito] = useState(0);
  const [usuario, setUsuario] = useState(false);
  const [productos, setProductos] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const vaciarCarrito = (e) => {
    e.preventDefault();
    localStorage.removeItem("carrito");
    setProductos(null);
    setIsDisabled(true);
    document.querySelector("#total-carrito").textContent = 0;
  };
  useEffect(() => {
    const usuarioLoc = localStorage.getItem("usuario");

    if (usuarioLoc) {
      setUsuario(true);
    }

    const llenarProductosCarrito = () => {
      const productos = JSON.parse(localStorage.getItem("carrito"));
      if (productos == null || productos.length == 0) {
        setProductos([]);
        setIsDisabled(true);
        return;
      }

      setProductos(productos);
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
      setTotalCarrito(total);
    };
      actualizarPrice();
  }, [productos]);

  useEffect(() => {
    window.scrollTo(0, 0);

  }, []);


  return (
    <>
      <div
        className="content-cart"
        style={{ position: "relative", overflowY: "hidden", }}
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
                    (productos == null || productos.length == 0) &&
                    "is-active-cart "
                  }`}
                >
                  <span>No se ha agregado ningún producto</span>
                </div>

                {productos &&
                  productos.map((producto) => {
                    return (
                      <ProductCarrito
                        key={producto.id}
                        producto={producto}
                        setTotalCarrito={setTotalCarrito}
                        totalCarrito={totalCarrito}
                        productosCarrito={productos}
                        setProductos={setProductos}
                      />
                    );
                  })}
              </tbody>
            </table>
            <a href="#" id="vaciar-carrito" className={`${isDisabled && 'is-disabled'}`} onClick={vaciarCarrito}  >
              <span>Vaciar carrito</span>
            </a>
          </div>

          <div className="content-pago">
            <div className="col-lg-3 carrito-total">
              <h2 className="card-total">
                TOTAL: $ <span id="total-carrito">{totalCarrito}</span>
              </h2>
            </div>
            <ButtonPaypal />
            <div className="desabilitar"></div>
          </div>
        </section>
        <LoaderComponent />
        <PiePagina />
      </div>
    </>
  );
};

export default Cart;
