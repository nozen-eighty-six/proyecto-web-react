import "../../../../public/css/Admin/cabeceraAd.css"
const PedidoTable = ({ data, option}) => {
  console.log(data)
  const formatearFecha = (fecha) => {
    let date = new Date(fecha);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
 }




  return (
    <table className="table table-striped table-bordered" id="tablaPedidos">
      <thead>
        <tr>
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
                <td>{p.fPedido}</td>
                <td>{formatearFecha(p.fEntrega)}</td>
                <td>{p.proveedor.nombreProveedor}</td>
                <td>{p.total}</td>
                <td>{p.estado}</td>
                <td>
                  <button
                    className="btn btn-danger delete col-12"
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
