import "../../../../public/css/Admin/tablePrueba.css";
import "../../../../public/css/Admin/table.css";

import helpHttp from "../../../helpers/helpHttp";
const ProveedorTable = ({
  proveedores,
  openModal,
  setIdent,
  setProveeSE,
  option,
}) => {
  console.log(proveedores);
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
    <table
      className="table table-striped table-bordered text-black "
      id="tablaProveedores"
    >
      <thead>
        <tr className="sm:hidden lg:table-row">
          <th scope="col">Nombre</th>
          <th scope="col" className="sm:hidden lg:table-cell">
            Dirección
          </th>
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
              <tr key={proveedor.id} className="lg:table-row">
                <td data-label="Nombre" className="lg:table-cell">
                  {" "}
                  {proveedor.nombreProveedor}
                </td>
                <td className="sm:hidden lg:table-cell" data-label="Dirección">
                  {proveedor.direccion}
                </td>
                <td data-label="Correo"> {proveedor.correo}</td>
                <td data-label="Teléfono">{proveedor.telefono}</td>
                <td>
                  <button
                    className="btn btn-warning edit col-12 bg-gray-200 hover:bg-gray-300"
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
                    className="btn btn-danger delete col-12 bg-gray-200 hover:bg-gray-300"
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
