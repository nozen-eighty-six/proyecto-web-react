import "../../../../public/css/Admin/detallePedido.css";
import { useEffect, useState } from "react";
import helpHttp from "../../../helpers/helpHttp";
const ModalDetPedido = ({
  isOpen,
  closeModal,
  identificador,
  setIdentificador,
  option
}) => {
  const [pedido, setPedido] = useState([]);
  const [total, setTotal] = useState(0);

  
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "visible";


  },[isOpen]);

  useEffect(() => {
    const getData = () => {
      helpHttp()
        .get("http://localhost:8080/lineaP/" + identificador, option)
        .then((res) => {
          if (!res.err) {
            console.log(res);
            setPedido(res);
          } else {
            console.log(res);
          }
        });
    };

    if(identificador !== "") getData();
  }, [identificador, option]);

  useEffect(() => {
    const getTotal = () => {
      let total = 0;
      pedido.forEach((item) => {
        console.log(item);
        total += (item.cantidad * item.productos.precio);
      });
      setTotal(total);
    };
    getTotal();
  }, [pedido]);

  return (
    <div className={`modal-detalle ${isOpen && "is-open"}`} id="miModal">
      <div style={{ position: "relative" }} className="modal-content-detalle">
        <span className="close-button-dt" onClick={closeModal}>
          &#10006;
        </span>
        <h2>Detalles</h2>
        <div className="table-container">
          <table id="product-table">
            <thead>
              <tr className="text-product" style={{ color: "#000" }}>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {pedido.length > 0 &&
                pedido.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.productos.nombre || ""}</td>
                      <td>{item.cantidad}</td>
                      <td>{item.productos.precio}</td>
                      <td>{item.total}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <span
            className="total-entrada"
            style={{
              position: "absolute",
              left: "78%",
              marginTop: "0.75rem",
              fontWeight: "bold",
            }}
          >
            Total: {total}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ModalDetPedido;
