import "../../../../public/css/Admin/table.css";
import helpHttp from "../../../helpers/helpHttp";
const ProveedorTable = ({ proveedores, openModal, setIdent, setProveeSE, option }) => {
  const getProveedorById = (id) => {
    const url = `http://localhost:8080/proveedores/${id}`;
    helpHttp()
      .get(url, option)
      .then((res) => {
        if (!res.err) {
          setProveeSE(res);
        } else {
          console.log(res);
        }
      });
  };

  return (
    <table className="table table-striped table-bordered" id="tablaProveedores">
      <thead>
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Dirección</th>
          <th scope="col">Correo</th>
          <th scope="col">Teléfono</th>
          <th scope="col">Acción</th>
          <th scope="col">Acción</th>
        </tr>
      </thead>
      <tbody>
        {proveedores.length != 0 &&
          proveedores.map((proveedor) => {
            return (
              <tr key={proveedor.id}>
                <td>{proveedor.nombreProveedor}</td>
                <td>{proveedor.direccion}</td>
                <td>{proveedor.correo}</td>
                <td>{proveedor.telefono}</td>
                <td>
                  <button
                    className="btn btn-warning edit col-12"
                    data-id={proveedor.id}
                    data-name="proveedores"
                    onClick={() => {
                      openModal();
                      setIdent(proveedor.id);
                      getProveedorById(proveedor.id);
                    }}
                  >
                    Editar
                  </button>
                </td>

                <td>
                  <button
                    className="btn btn-danger delete col-12"
                    data-id={proveedor.id}
                    data-name="proveedores"
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

export default ProveedorTable;
