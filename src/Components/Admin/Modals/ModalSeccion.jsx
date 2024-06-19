import { useEffect, useState } from "react";
import "../../../../public/css/Admin/modal.css";
import "../../../../public/css/Admin/modalProveedor.css";
import { useForm } from "../../../hooks/useForm";
import ErrorModals from "./ErrorModals";
import helpHttp from "../../../helpers/helpHttp";
const initial = {
  nombreProveedor: "",
  direccion: "",
  correo: "",
  telefono: "",
};

const validation = (form) => {
  const error = {};
  const regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  const regexEmail =
    /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/;
  const regexPhone = /^9\d{0,8}$/;
  const regexAddress = /^[A-Za-z0-9\s]+$/;

  if (!form.nombreProveedor.trim()) {
    error.nombre = "El campo nombre es requerido";
  } else if (!regexName.test(form.nombreProveedor)) {
    error.nombre = "El campo nombre solo acepta letras y espacios en blanco";
  }

  if (!form.direccion.trim()) {
    error.direccion = "El campo dirección es requerido";
  } else if (!regexAddress.test(form.direccion)) {
    error.direccion =
      "El campo dirección solo acepta letras y espacios en blanco";
  }
  if (!form.telefono.trim()) {
    error.telefono = "El campo teléfono es requerido";
  } else if (!regexPhone.test(parseInt(form.telefono))) {
    error.telefono = "El campo teléfono solo acepta números";
  }

  if (!form.correo.trim()) {
    error.correo = "El campo correo es requerido";
  } else if (!regexEmail.test(form.correo)) {
    error.correo = "El campo correo debe ser correcto";
  }

  return error;
};

const ModalSeccion = ({
  isOpen,
  closeModal,
  ident,
  proveeSE,
  setIssaved,
  setIsupdate,
}) => {
  const { form, errors, handleBlur, handleChange, setErrors, setForm } =
    useForm(initial, validation);

  const styleError = {
    width: "95%",
    border: "1px solid red",
    color: "red",
  };
  const handlePropagate = (e) => {
    e.stopPropagation();
  };

  const resetearForm = () => {
    setForm({});
  };
  const resetearError = () => {
    setErrors({});
  };

  const guardarProveedor = async () => {
    const formData = new FormData();
    formData.append("proveedor", JSON.stringify(form));

    console.log("guardando");
    console.log("id ");
    if (ident == 0) {
      const url = "http://localhost:8080/proveedores/save";
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setIssaved(true);
      }

      /* helpHttp()
        .post(url, {
          body: formData,
        }, true)
        .then((res) => {
          if (!res.err) {
            console.log(res);
          } else {
            console.log(res);
          }
        });*/
    } else {
      const url = "http://localhost:8080/proveedores/editar/" + ident;
      const response = await fetch(url, {
        method: "PUT",
        body: formData,
      });
      if (response.ok) {
        console.log("Proveedor actualizado");
        setIsupdate(true);
      }
      //const data = await response.json();
      //console.log(data);
    }
  };

  useEffect(() => {
    if (ident != 0 && proveeSE) {
      setForm(proveeSE);
    } else {
      setForm(initial);
    }
  }, [ident, proveeSE, setForm]);

  return (
    <article
      className={`modal_seccion transition-opacity  duration-500 ${
        isOpen && "is-open-mp"
      }`}
    >
      <div
        className={`modal_container ${
          Object.keys(errors).length != 0 && "error"
        }`}
        onClick={handlePropagate}
      >
        <div
          className={`content_title ${
            Object.keys(errors).length != 0 && "error"
          }`}
          style={{ background: "#000" }}
        >
          <h2 className="modal_title" style={{ color: "#fff" }}>
            Proveedores
          </h2>
        </div>

        <div
          className={`modal_content ${
            Object.keys(errors).length != 0 && "error"
          }`}
        >
          <div className="content-nombre">
            <label className="form-label">Nombre</label>{" "}
            <input
              type="text"
              className="form-control"
              id="textnombre"
              name="nombreProveedor"
              placeholder="Escriba el nombre del proveedor"
              required
              title="El nombre solo acepta letras y espacios en blanco"
              pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$"
              value={form.nombreProveedor || ""}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <div className="content-direccion">
            <label className="form-label">Dirección: </label>{" "}
            <input
              type="text"
              className="form-control"
              id="textdireccion"
              name="direccion"
              placeholder="Escriba la dirección"
              required
              title="El nombre solo acepta letras y espacios en blanco"
              pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$"
              value={form.direccion || ""}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <div className="content-mail">
            <label className="form-label">Correo:</label>
            <input
              type="email"
              className="form-control"
              placeholder="Escriba el correo"
              name="correo"
              required
              pattern="^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$"
              title="El email debe ser correcto"
              autoComplete="off"
              value={form.correo || ""}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>

          <div className="content-telefono">
            <label className="form-label">Teléfono:</label>{" "}
            <input
              type="text"
              className="form-control"
              id="txttelefono"
              name="telefono"
              placeholder="Escriba el número telefónico"
              required
              pattern="^9\d{0,8}$"
              title="Solo debe ingresar 9 dígitos"
              step="1"
              value={form.telefono || ""}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {Object.keys(errors).length !== 0 && (
            <ErrorModals error={errors} seccion="pv" />
          )}

          <div
            className={`content_button ${Object.keys(errors) != 0 && "error"}`}
          >
            <button
              type="button"
              className="btn btn-secondary col-2"
              data-bs-dismiss="modal"
              onClick={(e) => {
                closeModal();
                resetearForm();
                resetearError();
                setIssaved(false);
                setIsupdate(false);
              }}
            >
              Cerrar
            </button>
            <button
              type="button"
              className="btn btn-primary col-2"
              onClick={(e) => {
                if (Object.keys(errors).length === 0) {
                  guardarProveedor();
                  resetearForm();
                  resetearError();
                  closeModal();
                  setIssaved(false);
                  setIsupdate(false);
                } else {
                  alert("Debe llenar los campos correctamente");
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
            resetearForm();
            resetearError();
            setIssaved(false);
            setIsupdate(false);
          }}
        >
          X
        </button>
      </div>
    </article>
  );
};

export default ModalSeccion;
