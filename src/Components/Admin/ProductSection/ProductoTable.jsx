import "../../../../public/css/Admin/table.css"

import React from "react";
import helpHttp from "../../../helpers/helpHttp";

const ProductoTable = ({ productos,setIdent,setProductoSE,openModal,option }) => {

  const getProductById = (id) => {  
    helpHttp().get(`http://localhost:8080/productos/get/${id}`, option)
      .then((res) => {
        if (!res.err) {
          const {id,nombre,descripcion, imagen,precio, cantidad, categoria, marca, itemsProveedor } = res;
          let productEnv = {
            id: id, 
            nombre: nombre,
            imagen: imagen,
            descripcion: descripcion,
            precio: precio,
            cantidad: cantidad,
            cbocategoria: categoria.id.toString(),
            cbomarca: marca.id.toString(),
            cboproveedor: itemsProveedor[0].id.toString()
          }
          console.log(productEnv);
          setProductoSE(productEnv);
        } else {
          console.log(res);
        }
      });
  }
  return (
    <table className="table table-bordered table-striped" id="tablaProductos">
      <thead>
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Descripción</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Precio</th>
          <th scope="col">Marca</th>
          <th scope="col">Categoria</th>
          <th scope="col">Acción</th>
          <th scope="col">Acción</th>
        </tr>
      </thead>
      <tbody>
        {productos.length != 0 &&
          productos.map((producto) => {
            return (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td>{producto.descripcion}</td>
                <td>{producto.cantidad}</td>
                <td>{producto.precio}</td>
                <td>{producto.marca ? producto.marca.nombre : ""}</td>{" "}
                {/* Verificación de la existencia de la marca */}
                <td>
                  {producto.categoria ? producto.categoria.nombre : ""}
                </td>{" "}
                {/* Verificación de la existencia de la categoría */}
                <td>
                  <button
                    className="btn btn-warning edit col-12"
                    data-id={producto.id}
                    data-name="productos"
                    onClick={() => {
                      openModal();
                      setIdent(producto.id);
                      getProductById(producto.id);
                    }}
                  >
                    Editar
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger delete col-12"
                    data-id={producto.id}
                    data-name="productos"
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

export default ProductoTable;
