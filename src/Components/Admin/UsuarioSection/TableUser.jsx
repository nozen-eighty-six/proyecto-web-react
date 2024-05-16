import "../../../../public/css/Admin/table.css"


const TableUser = ({data}) => {
  return (
    <table className="table table-striped table-bordered" >
    <thead>
      <tr>
        <th scope="col">Nombre</th>
        <th scope="col">Email</th>
        <th scope="col">Dirección</th>
      </tr>
    </thead>
    <tbody>
       {data.lenght !== 0 && (
          data.map((p, i) => (
            <tr key={i}>
              <td>{p.nombre}</td>
              <td>{p.mail}</td>
              <td>{p.direccion}</td>
            </tr>
          ))
        )}       
    </tbody>
  </table>
  )
}

export default TableUser