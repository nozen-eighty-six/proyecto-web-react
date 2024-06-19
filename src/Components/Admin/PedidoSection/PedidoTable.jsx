import "../../../../public/css/Admin/cabeceraAd.css";
import "../../../../public/css/Admin/tablePrueba.css";

import "../../../../public/css/Admin/table.css";

const PedidoTable = ({ data, option }) => {
  console.log(data);
  const formatearFecha = (fecha) => {
    let date = new Date(fecha);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    return `${year}-${month < 10 ? `0${month}` : month}-${
      day < 10 ? `0${day}` : day
    }`;
  };

  return (
    <table className="table table-striped table-bordered " id="tablaPedidos">
      <thead>
        <tr className="sm:hidden lg:table-row">
          <th scope="col">Fecha pedido</th>
          <th scope="col">Fecha entrega</th>
          <th scope="col">Proveedor</th>
          <th scope="col">Total</th>
          <th scope="col">Estado</th>
          <th scope="col">Acción</th>
        </tr>
      </thead>
      <tbody>
        {data.length != 0 &&
          data.map((p, i) => {
            return (
              <tr key={i}>
                <td data-label="Fecha Pedido">{p.fPedido}</td>
                <td data-label="Fecha Entrega">{formatearFecha(p.fEntrega)}</td>
                <td data-label="Proveedor">{p.proveedor.nombreProveedor}</td>
                <td data-label="Total">{p.total ? 0 : "Sin definir"}</td>
                <td data-label="Estado">
                  {!p.estado ? "Sin definir" : p.estado}
                </td>
                <td>
                  <button
                    className="btn btn-danger delete col-12 bg-gray-200 hover:bg-gray-300"
                    data-id={p.id}
                    data-name="pedidos"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default PedidoTable;
