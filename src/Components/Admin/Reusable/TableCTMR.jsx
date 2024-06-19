import "../../../../public/css/Admin/tablePrueba.css";

import "../../../../public/css/Admin/table.css";
import helpHttp from "../../../helpers/helpHttp";
const TableCTMR = ({
  data,
  controlador,
  openModal,
  setIdent,
  setObjetoSE,
  option,
}) => {
  const getObjetoById = (id) => {
    helpHttp()
      .get(`http://localhost:8080/${controlador}/${id}`, option)
      .then((res) => {
        if (!res.err) {
          setObjetoSE(res);
        } else {
          console.log(res);
        }
      });
  };

  return (
    <table className="table table-striped table-bordered" id="tablaMarcas">
      <thead>
        <tr className="sm:hidden lg:table-row">
          <th scope="col">Nombre</th>
          <th scope="col">Activo</th>
          <th scope="col">Acción</th>
          <th scope="col">Acción</th>
        </tr>
      </thead>
      <tbody>
        {data.length !== 0 &&
          data.map((p, i) => (
            <tr key={i}>
              <td data-label="Nombre">{p.nombre}</td>
              <td data-label="Activo">{p.activo ? "SI" : "NO"}</td>
              <td>
                <button
                  className="btn btn-warning edit col-6 bg-gray-200 hover:bg-gray-300"
                  data-id={p.id}
                  data-name={controlador}
                  onClick={() => {
                    openModal();
                    setIdent(p.id);
                    getObjetoById(p.id);
                  }}
                >
                  Editar
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger delete col-6 bg-gray-200 hover:bg-gray-300"
                  data-id={p.id}
                  data-name={controlador}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default TableCTMR;
