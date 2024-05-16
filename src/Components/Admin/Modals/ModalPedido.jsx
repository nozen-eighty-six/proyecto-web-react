import { useEffect, useState } from "react";
import "../../../../public/css/Admin/modal.css";
import "../../../../public/css/Admin/modalPedido.css";
import "../../Admin/Reusable/SelectSeccion.jsx";
import SelectSeccion from "../../Admin/Reusable/SelectSeccion.jsx";
import helpHttp from "../../../helpers/helpHttp.jsx";
import { useModal } from "../../../hooks/useModal.jsx";
import ModalPedidoProd from "./ModalPedidoProd.jsx";
import { useForm } from "../../../hooks/useForm.jsx";
import ErrorModals from "./ErrorModals.jsx";

const initialForm = {
  cboproveedor: "0",
  fpedido: "",
};

const validations = (form) => {
  let errors = {};
  let fechaHoy = new Date();
  let fechaPedido = new Date(form.fpedido);
  if (form.cboproveedor === "0") {
    errors.cboproveedor = "El campo proveedor es requerido";
  }
  if (!form.fpedido.trim()) {
    errors.fpedido = "El campo fecha pedido es requerido";
  } else if (fechaPedido < fechaHoy) {
    errors.fpedido = "La fecha del pedido no puede ser menor a la fecha actual";
  }
  return errors;
};

const ModalPedido = ({
  isOpen,
  closeModal,
  setProveeId,
  proveeId,
  pedidoSE,
  setIssaved,
  setIsupdate,
}) => {
  const { form, errors, handleBlur, handleChange, setErrors, setForm } =
    useForm(initialForm, validations);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [prodCantiSelect, setProdCantiSelect] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [isOpenPro, openModalPro, closeModalPro] = useModal(false);
  const [input, setInput] = useState({});
  const [idPedidoUlt, setIdPedidoUlt] = useState(null);

  const handlePropagate = (e) => {
    e.stopPropagation();
  };

  const reseteoForm = () => {
    setForm(initialForm);
  };
  const resetearErrores = () => {
    setErrors({});
  };

  const asiganarProveedorId = (e) => {
    setProveeId(e.target.value);
  };

  const guardarPedido = async () => {
    try {
      const formData = new FormData();
      const pedido = {
        id: "PE16",
        proveedor: {
          id: form.cboproveedor,
        },
        fPedido: new Date().toISOString().slice(0, 10),
        fEntrega: form.fpedido,
        estado: "Enviado",
        itemsProducto: productosSeleccionados,
      };

      formData.append("pedido", JSON.stringify(pedido));
      const url = "http://localhost:8080/pedidos/save";

      const option = {
        method: "POST",
        body: formData,
      };
      const res = await fetch(url, option);

      if (res.ok) {
        guardarLineaPedido();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const guardarLineaPedido = async () => {
    try {
      const formData = new FormData();
      formData.append("lineapedido", JSON.stringify(prodCantiSelect));
      const url = "http://localhost:8080/lineaP/save";

      const option = {
        method: "POST",
        body: formData,
      };
      const res = await fetch(url, option);

      if (res.ok) {
        setProductosSeleccionados([]);
        setProdCantiSelect([]);
        const idUltimo = await getLastIdPedido();
        setIdPedidoUlt(idUltimo);
        generarPedidoPDF(idUltimo);
      }
    } catch (error) {
      console.log(error);
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
  function generarPedidoPDF(idUltimo) {
    const idUlt =
      idUltimo.substring(0, 2) + (parseInt(idUltimo.substring(2)) - 1);
    console.log(idUlt);
    const url = "http://localhost:8080/lineaP/export-pdf/" + idUlt;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Error al descargar el archivo: ${response.status} - ${response.statusText}`
          );
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "pedidosReport.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        enviarPDFProveedor(idUlt);
      })
      .catch((error) => console.error(error));
  }

  function enviarPDFProveedor(idUltimo) {
    let url = "http://localhost:8080/lineaP/enviar-pdf/" + idUltimo;
    fetch(url)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    helpHttp()
      .get("http://localhost:8080/proveedores/listar")
      .then((res) => {
        if (!res.err) {
          setProveedores(res);
        } else {
          console.log(res);
        }
      });
  }, []);
  return (
    <article className={`modal_seccion_po ${isOpen && "is-active"}`}>
      <div
        className={`modal_container_po ${
          Object.keys(errors).length != 0 && "error"
        }`}
        onClick={handlePropagate}
      >
        <div className="content_title_po" style={{ background: "#000" }}>
          <h2 className="modal_title" style={{ color: "#fff" }}>
            Crear Pedido
          </h2>
        </div>

        <div
          className={`modal_content_po ${
            Object.keys(errors).length != 0 && "error"
          }`}
        >
          <div className="content-proveedor_po">
            <label className="form-label">Proveedor</label>{" "}
            <SelectSeccion
              seccion="proveedor"
              data={proveedores}
              handleChangeSl={(e) => {
                handleChange(e);
              }}
              handleBlur={handleBlur}
              form={form.cboproveedor}
            />
          </div>
          <div className="content-fpedido_po">
            <label className="form-label">Fecha Pedido: </label>{" "}
            <input
              type="date"
              name="fpedido"
              id="fpedido"
              value={form.fpedido || ""}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>

          <div
            className={`content-btnProductos_po ${
              (Object.keys(errors).length != 0 || form.cboproveedor == "0") &&
              "disabled"
            }`}
          >
            <label className="form-label">Seleccionar Producto</label>{" "}
            <button onClick={openModalPro}>Productos</button>
          </div>

          {Object.keys(errors).length != 0 && (
            <ErrorModals error={errors} seccion="po" />
          )}

          <div
            className={`content_button_po ${
              Object.keys(errors).length != 0 && "error disbled"
            }`}
          >
            <button
              type="button"
              className="btn btn-secondary col-2"
              data-bs-dismiss="modal"
              onClick={(e) => {
                closeModal();
                reseteoForm();
                resetearErrores();
                setProdCantiSelect([]);
                setProductosSeleccionados([]);
                setIssaved(false);
              }}
            >
              Cerrar
            </button>
            <button
              type="button"
              className="btn btn-primary col-2"
              onClick={(e) => {
                if (Object.keys(errors).length === 0) {
                  guardarPedido();
                  closeModal();
                  reseteoForm();
                  resetearErrores();
                  setIssaved(false);
                } else {
                  alert("Debe completar los campos requeridos");
                }
              }}
            >
              Guardar
            </button>
          </div>
        </div>
        <button
          className="cerrar-modal"
          onClick={(e) => {
            closeModal();
            reseteoForm();
            resetearErrores();
            setProdCantiSelect([]);
            setProductosSeleccionados([]);
            setIssaved(false);
          }}
        >
          X
        </button>
      </div>
      <ModalPedidoProd
        isOpen={isOpenPro}
        closeModal={closeModalPro}
        proveeId={form.cboproveedor}
        productosSeleccionados={productosSeleccionados}
        setProductosSeleccionados={setProductosSeleccionados}
        prodCantiSelect={prodCantiSelect}
        setProdCantiSelect={setProdCantiSelect}
        setInput={setInput}
        input={input}
      />
    </article>
  );
};

export default ModalPedido;
