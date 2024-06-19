import "../../../../public/css/Admin/tablePrueba.css";

import "../../../../public/css/Admin/table.css";

const TableUser = ({ data }) => {
  return (
    <table className="table table-striped table-bordered">
      <thead>
        <tr className="sm:hidden lg:table-row">
          <th scope="col">Nombre</th>
          <th scope="col">Email</th>
          <th scope="col">Dirección</th>
        </tr>
      </thead>
      <tbody>
        {data.lenght !== 0 &&
          data.map((p, i) => (
            <tr key={i}>
              <td data-label="Nombre">{p.nombre}</td>
              <td data-label="Correo">{p.mail}</td>
              <td data-label="Address">{p.direccion}</td>

              <td className="excluir sm:table-cell md:hidden lg:hidden"></td>

              {/*<br />{" "}*/}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default TableUser;
