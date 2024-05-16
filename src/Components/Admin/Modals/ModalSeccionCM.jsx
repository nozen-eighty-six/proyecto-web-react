import "../../../../public/css/Admin/modal.css";
import "../../../../public/css/Admin/modalCM.css";

import React, { useEffect, useState } from "react";
import { useForm } from "../../../hooks/useForm";
import ErrorModals from "./ErrorModals";

const initialForm = {
  nombre: "",
  activo: "1",
};

const validations = (form) => {
  let errors = {};
  const regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;

  if (!form.nombre.trim()) {
    errors.nombre = "El campo nombre es requerido";
  } else if (!regexName.test(form.nombre)) {
    errors.nombre = "El campo nombre solo acepta letras y espacios en blanco";
  }

  if (initialForm.activo === "0") {
    errors.activo = "El campo activo es requerido";
  }
  return errors;
};

const ModalSeccionCM = ({
  isOpen,
  closeModal,
  opcion,
  objetoSE,
  setIssaved,
  setIsupdated,
  ident,
  controlador,
}) => {
  const { form, errors, handleBlur, handleChange, setErrors, setForm } =
    useForm(initialForm, validations);
  const handlePropagate = (e) => {
    e.stopPropagation();
  };

  const resetearForm = () => {
    setForm({});
  };

  const resetearError = () => {
    setErrors({});
  };

  const guardarObjeto = async () => {
    try {
      const formData = new FormData();
      const objetoEnvi = {
        id: ident,
        nombre: form.nombre,
        activo: parseInt(form.activo),
      };
      formData.append(controlador, JSON.stringify(objetoEnvi));

      if (ident == 0) {
        const url = "http://localhost:8080/" + controlador + "/save";

        const res = await fetch(url, {
          method: "POST",
          body: formData,
        });
        if (res.ok) {
          setIssaved(true);
          console.log("Guardado con éxito");
        }
      } else {
        const url = "http://localhost:8080/" + controlador + "/editar/" + ident;

        const res = await fetch(url, {
          method: "PUT",
          body: formData,
        });
        if (res.ok) {
          setIsupdated(true);
          console.log("Actualizado con éxito");
        }
      }
    } catch (error) {
      console.log(error);
    } 
  };

  useEffect(() => {
    if (ident !== 0 && objetoSE) {
      setForm(objetoSE);
    } else {
      setForm(initialForm);
    }
  }, [ident, objetoSE, setForm]);
  return (
    <article className={`modal_seccion ${isOpen && "is-active"}`}>
      <div
        className={`modal_container_mc ${
          Object.keys(errors).length != 0 && "error"
        }`}
        onClick={handlePropagate}
      >
        <div className="content_title_mc" style={{ background: "#000" }}>
          <h2 className="modal_title" style={{ color: "#fff" }}>
            {opcion === "M" ? "Crear Marca" : "Crear Categoría"}
          </h2>
        </div>

        <div
          className={`modal_content_mc ${
            Object.keys(errors).length != 0 && "error"
          } `}
        >
          <div className="content-nombre_mc">
            <label className="form-label">Nombre</label>{" "}
            <input
              type="text"
              className="form-control"
              id="textnombre"
              name="nombre"
              placeholder="Escriba el nombre de la categoría"
              required
              title="El nombre solo acepta letras y espacios en blanco"
              pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$"
              value={form.nombre || ""}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <div className="content-activo_mc">
            <label className="form-label">Estado: </label>{" "}
            <select
              name="activo"
              id="activo-select"
              value={form.activo || "1"}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="1">Activo</option>
              <option value="0">Inactivo</option>
            </select>
          </div>
          {Object.keys(errors).length !== 0 && (
            <ErrorModals error={errors} seccion="mc" />
          )}

          <div
            className={`content_button_mc  ${
              Object.keys(errors).length != 0 && "error"
            }`}
          >
            <button
              type="button"
              className="btn btn-secondary col-2"
              data-bs-dismiss="modal"
              onClick={(e) => {
                resetearForm();
                resetearError();
                closeModal(e);
                setIssaved(false);
                setIsupdated(false);
              }}
            >
              Cerrar
            </button>
            <button
              type="button"
              className="btn btn-primary col-2"
              onClick={() => {
                if (Object.keys(validations(form)).length === 0) {
                  guardarObjeto();
                  resetearForm();
                  resetearError();
                  closeModal();
                  setIssaved(false);
                  setIsupdated(false);
                } else {
                  alert("Error en los campos");
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
            resetearForm();
            resetearError();
            closeModal(e);
            setIssaved(false);
            setIsupdated(false);
          }}
        >
          X
        </button>
      </div>
    </article>
  );
};

export default ModalSeccionCM;
