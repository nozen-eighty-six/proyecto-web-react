import "../../../../public/css/Admin/modal.css";
import "../../../../public/css/Admin/modalEntrada.css";

import React, { useEffect, useState } from "react";
import { useForm } from "../../../hooks/useForm";
import ErrorModals from "./ErrorModals";

const initialForm = {
  ubicacion: "",
  estado: "",
};

const validations = (form) => {
  let errors = {};
  const regexUbicacion = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;

  if (!form.ubicacion.trim()) {
    errors.nombre = "El campo nombre es requerido";
  } else if (!regexUbicacion.test(form.ubicacion)) {
    errors.nombre = "El campo nombre solo acepta letras y espacios en blanco";
  }

  if (form.estado === "") {
    errors.estado = "El campo activo es requerido";
  }
  return errors;
};

const ModalSeccionEntrada = ({
  isOpenDet,
  closeModalDet,
  identificador,
  setIdentificador,
  objetoSE,
  setIsupdated

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
        ubicacion: form.ubicacion,
        estado: form.estado,
      };
      formData.append("entradas", JSON.stringify(objetoEnvi));

        const url = "http://localhost:8080/" + "entradas" + "/editar/" + parseInt(identificador);

        const res = await fetch(url, {
          method: "PUT",
          body: formData,
        });
        if (res.ok) {
          setIsupdated(true);
          console.log("Actualizado con éxito");
        }
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (parseInt(identificador) !== 0 && objetoSE) {
      setForm(objetoSE);
    } else {
      setForm(initialForm);
    }
  }, [identificador, objetoSE, setForm]);

  useEffect(() => {

    isOpenDet ? document.body.style.overflow = "hidden" : document.body.style.overflow = "visible";


  },[isOpenDet]);
  return (
    <article className={`modal_seccion_en ${isOpenDet && "is-active"}`}>
      <div
        className={`modal_container_en ${
          Object.keys(errors).length != 0 && "error"
        }`}
        onClick={handlePropagate}
      >
        <div className="content_title_en" style={{ background: "#000" }}>
          <h2 className="modal_title" style={{ color: "#fff" }}>
            Actualizar Entrada
          </h2>
        </div>

        <div
          className={`modal_content_en ${
            Object.keys(errors).length != 0 && "error"
          } `}
        >
          <div className="content-nombre_en">
            <label className="form-label">Nombre</label>{" "}
            <input
              type="text"
              className="form-control"
              id="textubicacion"
              name="ubicacion"
              placeholder="Escriba la ubicación de los productos"
              required
              title="Solo debe ingresar letras y espacios en blanco"
              pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$"
              value={form.ubicacion || ""}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <div className="content-activo_en">
            <label className="form-label">Estado: </label>{" "}
            <select
              name="estado"
              id="activo-select"
              value={form.estado || "NRecepcionado"}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="NRecepcionado">No recepcionado</option>
              <option value="Recepcionado">Recepcionado</option>
            </select>
          </div>
          {Object.keys(errors).length !== 0 && (
            <ErrorModals error={errors} seccion="mc" />
          )}

          <div
            className={`content_button_en  ${
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
                closeModalDet(e);
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
                  closeModalDet();
                  
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
            closeModalDet(e);
            setIsupdated(false);
          }}
        >
          X
        </button>
      </div>
    </article>
  );
};

export default ModalSeccionEntrada;
