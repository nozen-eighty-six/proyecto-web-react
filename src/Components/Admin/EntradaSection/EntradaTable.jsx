import "../../../../public/css/Admin/table.css";
import helpHttp from "../../../helpers/helpHttp";

const EntradaTable = ({ entradas, openModal, setIdentificador, setEntradaSE, openModalDet,option }) => {
  const formatearFecha = (fecha) => {
    let date = new Date(fecha);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    return `${year}-${month < 10 ? `0${month}` : month}-${
      day < 10 ? `0${day}` : day
    }`;
  };

  const abrirModal = (e) => {
    let id = e.target.getAttribute("data-id");
    // let name = e.target.getAttribute("data-name");
    setIdentificador(id);
    openModal();
  };

  const getEntradaById = (id) => {
    const url = `http://localhost:8080/entradas/${id}`;
    helpHttp()
      .get(url, option)
      .then((res) => {
        if (!res.err) {
          setEntradaSE(res);
        } else {
          console.log(res);
        }
      });
  };

  return (
    <table className="table table-striped table-bordered" id="tablaEntradas">
      <thead>
        <tr>
          <th scope="col">Pedido</th>
          <th scope="col">Fecha Recepción</th>
          <th scope="col">Proveedor</th>
          <th scope="col">Ubicación</th>
          <th scope="col">Estado</th>
          <th scope="col">Acción</th>
          <th scope="col">Acción</th>
        </tr>
      </thead>
      <tbody>
        {entradas.length != 0 &&
          entradas.map((p, i) => {
            return (
              <tr key={i}>
                <td>{p.pedidoEntrada.id}</td>
                <td>{formatearFecha(p.pedidoEntrada.fEntrega)}</td>
                <td>{p.pedidoEntrada.proveedor.nombreProveedor}</td>
                <td>{p.ubicacion}</td>
                <td>
                  {p.estado == "NRecepcionado"
                    ? "No Recepcionado"
                    : "Recepcionado"}
                </td>
                <td>
                  <button
                    className="btn btn-primary see col-12"
                    data-id={p.pedidoEntrada.id}
                    data-name="productos"
                    onClick={abrirModal}
                  >
                    Detalles
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-warning edit col-12 "
                    data-id={p.id}
                    data-name="productos"
                    onClick={() => {
                      openModalDet();
                      setIdentificador(p.id);
                      getEntradaById(p.id);
                    }}
                  >
                    Actualizar
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default EntradaTable;
