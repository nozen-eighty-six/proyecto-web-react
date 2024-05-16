import { useEffect, useState } from "react";
import "../../../../public/css/Admin/modalPedidoProd.css";
import helpHttp from "../../../helpers/helpHttp";
const ModalPedidoProd = ({
  isOpen,
  closeModal,
  proveeId,
  setProductosSeleccionados,
  productosSeleccionados,
  prodCantiSelect,
  setProdCantiSelect,
  setInput,
  input
}) => {
  const [data, setData] = useState([]);
  const handlePropagate = (e) => {
    e.stopPropagation();
  };
  const actualizaEstado = (e) => {
    setInput({...input, [e.target.name]: e.target.value});
  }

  const actualizarEstado = (e) => {

    const identificador = e.target.dataset.productoId;
    const indexC = input.findIndex(canti=> canti.id=== identificador);

    if(indexC !== -1){
      console.log("existe input");
      
      const nuevosProductos = [...input];
      nuevosProductos[indexC] = {
        id: identificador,
        [e.target.name]: e.target.value};
      setInput(nuevosProductos);
     /* setInput([
        ...input,
        {id: identificador, [e.target.name]: e.target.value}
      ]);*/
    }
    else{
      console.log("no existe input");
      setInput(cantidadAn => [...cantidadAn, {id: identificador, [e.target.name]: e.target.value}]);
    }
    

  }

  const handleChange = async  (e) => {
    const idP = e.target.id;
    const productoId = e.target.dataset.productoId;
 
    const check = e.target.checked;

    // Verificar si el producto ya está en la lista
    const indexPS = productosSeleccionados.findIndex(
      (producto) => producto.id === parseInt(productoId)
    );

    //console.log(cantidad);

    const indexPC = prodCantiSelect.findIndex(
      (product) => product.productos.id === parseInt(productoId)
    );
    if (indexPS !== -1) {
      console.log("producto ya seleccionado");
      // Si el producto ya está en la lista, actualizar su estado
      const productId = parseInt(productoId);
      const nuevosProductos = [...productosSeleccionados];
      nuevosProductos[indexPS] = { id: productId };

      setProductosSeleccionados(nuevosProductos);
    } else {
      console.log("producto no seleccionado");
      // Si el producto no está en la lista, agregarlo
      const productId = parseInt(productoId);

      setProductosSeleccionados((prevProductos) => [
        ...prevProductos,
        { id: productId },
      ]);
    }
    if (indexPS !== -1 && !check) {
      const nuevoArreglo = productosSeleccionados.filter(
        (producto) => producto.id !== parseInt(productoId)
      );
      setProductosSeleccionados(nuevoArreglo);
    }

    if (indexPC !== -1) {
      console.log("producto ya seleccionado");
      const nuevosProductosC = [...prodCantiSelect];
      const cantidad = document.querySelector(`input[type='text'][id='${idP}']`).value;

      const productId = parseInt(productoId);
      console.log("cantidad", cantidad);

      nuevosProductosC[indexPC] = {
        pedido: {
          id: await getLastIdPedido(),
        },
        productos: {id: productId },
        cantidad: cantidad
      };
      setProdCantiSelect(nuevosProductosC);
    } else {
      console.log("producto y cantidad no seleccionado");
      const ultimoId = await getLastIdPedido();
      const productId = parseInt(productoId);

      const cantidad = document.querySelector(`input[type='text'][id='${idP}']`).value;

      console.log("cantidad", cantidad);
      setProdCantiSelect((prodCanti) => [
        ...prodCanti,
        {
          pedido: {
            id: ultimoId,
          },
          productos:{id: productId},
            cantidad: cantidad
        },
      ]);
    }

    if (indexPC !== -1 && !check) {
      const nuevoArreglo = prodCantiSelect.filter(
        (producto) => producto.productos.id !== parseInt(productoId)
      );
      setProdCantiSelect(nuevoArreglo);
    }
  };

  const getLastIdPedido = async () => {
    try {
      const url = "http://localhost:8080/pedidos/ultimoid";
      const res = await fetch(url);

      if (!res.ok) throw new Error("Error al obtener el id del pedido");

      const data = await res.text();

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const activarInputCantidad = (e) => {
    let productoId = e.target.getAttribute("data-producto-id");
    let inputCantidad = document.querySelector(
      `input[name='cnt${productoId}']`
    );
    if (e.target.checked) {
      inputCantidad.disabled = false;
    } else {
      inputCantidad.disabled = true;
    }
  };

  useEffect(() => {
    const getProductByProveedor = () => {
      helpHttp()
        .get(`http://localhost:8080/productos/${proveeId}`)
        .then((res) => {
          if (!res.err) {
            console.log(res);
            setData(res);
          } else {
            console.log(res);
          }
        });
    };
    getProductByProveedor();
  }, [proveeId]);

  return (
    <div id="productos-dtp" className={`${isOpen && "block"}`}>
      {data.map((item) => {
        return (
          <>
            <div className="content-dtp">
              <div className="contenedor-check">
                <input
                  type="checkbox"
                  name={"cbo" + item.id}
                  id={item.id}
                  className="producto-checkbox"
                  data-producto-id={item.id}
                  onChange={(e) => {
                    handleChange(e);
                    activarInputCantidad(e);
                  }}
                />{" "}
                <label htmlFor={"cbo" + item.id}>{item.nombre}</label>
              </div>
              <input
                type="text"
                name={"cnt" + item.id}
                id={item.id}
                className="cantidad-input"
                placeholder="Ingresar cantidad"
                data-producto-id={item.id}
                disabled
                value={input[`cnt${item.id}`] || ""  }
                onChange={(e)=>{
                  handleChange(e);
                  actualizaEstado(e);
                }}
              />
            </div>
          </>
        );
      })}
      <div className="container-button-guadar">
        <button className="guardarSeleccionProd" onClick={closeModal}>Guardar Selección</button>
        <button className="cerrarSeleccionProd" onClick={closeModal}>
          Cancelar Selección
        </button>
      </div>
    </div>
  );
};

export default ModalPedidoProd;
