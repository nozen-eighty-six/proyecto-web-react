import { useEffect, useState } from "react";
import "../../../../public/css/Admin/modal.css";
import "../../../../public/css/Admin/modalProd.css";

import helpHttp from "../../../helpers/helpHttp";
import SelectSeccion from "../../Admin/Reusable/SelectSeccion";
import { useForm } from "../../../hooks/useForm";
import ErrorModals from "./ErrorModals";
const initial = {
  nombre: "",
  descripcion: "",
  precio: "",
  cantidad: "",
  imagen: "",
  cobcategoria: "",
  cbomarca: "",
  cboproveedor: "",
};

const validation = (form) => {
  let errors = {};
  const regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  const regexPrice = /^\d+(\.\d{1,2})?$/;
  const regexStock = /^[0-9]+$/;
  const regexDescrip = /^.{1,60}$/;

  if (!form.nombre) {
    errors.nombre = "El campo nombre es requerido";
  } else if (!regexName.test(form.nombre)) {
    errors.nombre = "El campo nombre solo acepta letras y espacios en blanco";
  }
  if (!form.descripcion) {
    errors.descripcion = "El campo descripción es requerido";
  } else if (!regexDescrip.test(form.descripcion)) {
    errors.descripcion = "El campo descripción solo acepta 60 caracteres";
  }
  if (!form.precio) {
    errors.precio = "El campo precio es requerido";
  } else if (!regexPrice.test(form.precio)) {
    errors.precio = "El campo precio solo acepta números";
  }
  if (!form.cantidad) {
    errors.cantidad = "El campo cantidad es requerido";
  } else if (!regexStock.test(form.cantidad)) {
    errors.cantidad = "El campo cantidad solo acepta números";
  }
  /*
  if (imagen) {
    errors.imagen = "El campo imagen es requerido";
  }*/
  if (!form.cbocategoria) {
    errors.categoria = "El campo categoria es requerido";
  }
  if (!form.cbomarca) {
    errors.marca = "El campo marca es requerido";
  }

  if (!form.cboproveedor) {
    errors.proveedor = "El campo proveedor es requerido";
  }
  return errors;
};

const ModalProducto = ({
  isOpen,
  closeModal,
  ident,
  productoSE,
  setIssaved,
  setIsupdate,
  option,
}) => {
  const { form, errors, handleBlur, handleChange, setErrors, setForm } =
    useForm(initial, validation);
  const [imagen, setImagen] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const handlePropagate = (e) => {
    e.stopPropagation();
  };

  const resetearForm = () => {
    /*
    document.getElementById("cbocategoria").selectedIndex = 0;
    document.getElementById("cbocarca").selectedIndex = 0;
    document.getElementById("cboproveedor").selectedIndex = 0;
    */ setForm({});
  };

  const reseterarCbo = () => {
    document.getElementById("cbocategoria").selectedIndex = 0;
    document.getElementById("cbocategoria").value = 0;
    document.getElementById("cbomarca").selectedIndex = 0;
    document.getElementById("cbomarca").value = 0;
    document.getElementById("cboproveedor").selectedIndex = 0;
    document.getElementById("cboproveedor").value = 0;
  };

  const resetearError = () => {
    setErrors({});
  };

  const mostrarProducto = (input) => {
    var fileInput = input;
    var imgElement = document.getElementById("img-producto");

    // Verifica si se seleccionó un archivo
    if (fileInput.files && fileInput.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        // Muestra la vista previa de la imagen
        if (e.target.result) {
          console.log(e.target.result);
          imgElement.src = e.target.result;
        } else {
          imgElement.src = "";
        }
      };

      // Lee el contenido del archivo como una URL de datos
      reader.readAsDataURL(fileInput.files[0]);
    }
  };

  const mostrarProductoEdit = (ruta) => {
    var imgElement = document.getElementById("img-producto");
    imgElement.src = "../../../../public/images/" + ruta;
  };

  const quitarImagen = () => {
    document.getElementById("img-producto").src =
      "../../../../public/images/gray2.jpg";
  };

  const saveProducto = async () => {
    try {
      if (ident == 0) {
        const formData = new FormData();
        const imagenSelec = document.getElementById("imagen").files[0];
        const productoEnvi = {
          id: 0,
          nombre: form.nombre,
          descripcion: form.descripcion,
          precio: form.precio,
          cantidad: form.cantidad,
          imagen: "",
          categoria: { id: parseInt(form.cbocategoria) },
          marca: { id: parseInt(form.cbomarca) },
          itemsProveedor: [{ id: parseInt(form.cboproveedor) }],
        };
        formData.append("img", imagenSelec);
        formData.append("producto", JSON.stringify(productoEnvi));
        const url = "http://localhost:8080/productos/save";
        const response = await fetch(url, {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          setIssaved(true);
        }
      } else {
        const formData = new FormData();
        const imagenSelec = document.getElementById("imagen").files[0];
        const productoEnvi = {
          id: ident,
          nombre: form.nombre,
          descripcion: form.descripcion,
          precio: form.precio,
          cantidad: form.cantidad,
          imagen: "",
          categoria: { id: parseInt(form.cbocategoria) },
          marca: { id: parseInt(form.cbomarca) },
          itemsProveedor: [{ id: parseInt(form.cboproveedor) }],
        };
        formData.append("img", imagenSelec);
        formData.append("producto", JSON.stringify(productoEnvi));
        const url = "http://localhost:8080/productos/editar/" + ident;
        const response = await fetch(url, {
          method: "PUT",
          body: formData,
        });
        if (response.ok) {
          setIsupdate(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    helpHttp()
      .get("http://localhost:8080/categorias/listar", option)
      .then((res) => {
        if (!res.err) {
          setCategorias(res);
        } else {
          console.log(res);
        }
      });

    helpHttp()
      .get("http://localhost:8080/marcas/listar", option)
      .then((res) => {
        if (!res.err) {
          setMarcas(res);
        } else {
          console.log(res);
        }
      });

    helpHttp()
      .get("http://localhost:8080/proveedores/listar", option)
      .then((res) => {
        if (!res.err) {
          setProveedores(res);
        } else {
          console.log(res);
        }
      });
    quitarImagen();
    /*
      const resetearCbo = () => {
        document.getElementById("cbocategoria").selectedIndex = 0;
        document.getElementById("cbocarca").selectedIndex = 0;
        document.getElementById("cboproveedor").selectedIndex = 0;
      }
      resetearCbo();*/
  }, []);

  useEffect(() => {
    if (ident != 0 && productoSE) {
      setForm(productoSE);
      mostrarProductoEdit(productoSE.imagen);
    } else {
      setForm({ initial });
    }
  }, [ident, productoSE, setForm]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "visible";
  }, [isOpen]);
  return (
    <article className={`modal_seccion_pd ${isOpen && " is-open-mpr"}`}>
      <div
        className={`modal_container_pd ${
          Object.keys(errors).length != 0 && "error"
        }`}
        onClick={handlePropagate}
      >
        <div className="content_title_pd" style={{ background: "#000" }}>
          <h2 className="modal_title_pd" style={{ color: "#fff" }}>
            Productos
          </h2>
        </div>

        <div
          className={`modal_content_pd ${
            Object.keys(errors).length != 0 && "error"
          }`}
        >
          <div className="content-img_pd">
            <div className="content-view">
              <img id="img-producto" src="" />
            </div>
            <input
              type="file"
              name="imagen"
              id="imagen"
              /*accept="image/*"*/
              value={imagen || ""}
              onChange={(e) => {
                setImagen(e.target.value);
                mostrarProducto(e.target);
              }}
            />
          </div>
          <div className="content-nombre_pd">
            <label className="form-label">Nombre</label>{" "}
            <input
              type="text"
              className="form-control"
              id="textnombre"
              name="nombre"
              placeholder="Escriba el nombre del proveedor"
              required
              title="El nombre solo acepta letras y espacios en blanco"
              pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$"
              value={form.nombre || ""}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <div className="content-descripcion_pd">
            <label className="form-label">Descripción:</label>
            <textarea
              className="form-control"
              name="descripcion"
              id="descripcion"
              cols="30"
              rows="10"
              placeholder="Escriba la descripción del producto"
              value={form.descripcion || ""}
              onChange={handleChange}
              onBlur={handleBlur}
            ></textarea>
          </div>
          <div className="content-categoria_pd">
            <label className="form-label">Categoría: </label>{" "}
            <SelectSeccion
              seccion="categoria"
              data={categorias}
              handleChangeSl={handleChange}
              handleBlur={handleBlur}
              form={form.cbocategoria}
            />
          </div>
          <div className="content-marca_pd">
            <label className="form-label">Marca:</label>
            <SelectSeccion
              seccion="marca"
              data={marcas}
              handleChangeSl={handleChange}
              handleBlur={handleBlur}
              form={form.cbomarca}
            />
          </div>

          <div className="content-proveedor_pd">
            <label className="form-label">Proveedor:</label>
            <SelectSeccion
              seccion="proveedor"
              data={proveedores}
              handleChangeSl={handleChange}
              handleBlur={handleBlur}
              form={form.cboproveedor}
            />
          </div>

          <div className="content-precio_pd">
            <label className="form-label">Precio:</label>{" "}
            <input
              type="text"
              className="form-control"
              id="txtprecio"
              name="precio"
              autoComplete="off"
              required
              title="Debe ingresar valores válidos"
              pattern="\d+(\.\d{1,2})?$"
              value={form.precio || ""}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>

          <div className="content-stock_pd">
            <label className="form-label">Stock:</label>{" "}
            <input
              type="number"
              className="form-control"
              id="txtstock"
              name="cantidad"
              required
              title="Solo se pueden ingresar números enteros"
              step="1"
              value={form.cantidad || ""}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {Object.keys(errors).length != 0 && (
            <ErrorModals error={errors} seccion="pd" />
          )}
          <div
            className={`content_button_pd ${
              Object.keys(errors).length != 0 && "error"
            }`}
          >
            <button
              type="button"
              className="btn btn-secondary col-2"
              data-bs-dismiss="modal"
              onClick={(e) => {
                closeModal();
                resetearForm();
                reseterarCbo();
                resetearError();
                quitarImagen();
                setImagen("");
                setIssaved(false);
                setIsupdate(false);
              }}
            >
              Cerrar
            </button>
            <button
              type="button"
              className="btn btn-primary col-2"
              onClick={() => {
                if (Object.keys(errors).length === 0) {
                  saveProducto();
                  closeModal();
                  resetearForm();
                  reseterarCbo();
                  resetearError();
                  quitarImagen();
                  setImagen("");
                  setIssaved(false);
                  setIsupdate(false);
                } else {
                  alert("Debe completar los campos correctamente");
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
            reseterarCbo();
            resetearError();
            quitarImagen();
            setImagen("");
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

export default ModalProducto;
