import { useState } from "react";
import "../../../../public/css/Admin/reseteo.css";
import { useSelector } from "react-redux";
import helpHttp from "../../../helpers/helpHttp";
import { SERVER_URL } from "../../../consts/server";

const initial = {
  nombre: "",
};
const Buscador = ({
  seccion,
  abrirModalCrearSeccion,
  crearButton,
  openModal,
  setIdent,
  setSeccionData,
  data,
}) => {
  const [search, setSearch] = useState({});
  const { tokenUser } = useSelector((state) => state.token);
  const handleChange = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };
  const searchUser = (nombre) => {
    helpHttp()
      .get(
        SERVER_URL + "/" + seccion.toLowerCase() + "/buscar/" + search.nombre,
        {
          headers: {
            Authorization: `Bearer ${tokenUser}`,
          },
        }
      )
      .then((res) => setSeccionData(res))
      .catch((err) => console.log(err));
  };

  const clearCampo = () => {
    try {
      setSearch(initial);
    } catch (error) {
      console.log(error);
    }
  };
  const backData = () => {
    try {
      helpHttp()
        .get(SERVER_URL + "/" + seccion.toLowerCase() + "/listar", {
          headers: {
            Authorization: `Bearer ${tokenUser}`,
          },
        })
        .then((res) => setSeccionData(res))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="contenedor-form mb-4 *:box-border"
      style={{
        marginTop: "30px",
      }}
    >
      <div className="from-inline" style={{ width: "100%" }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
          className="form-group mb-2 d-flex justify-content-between align-items-center "
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              name="nombre"
              className="form-control me-2 col-4"
              style={{
                marginRight: "10px",
                width: "300px",
                height: "40px",
                paddingLeft: "10px",
              }}
              id="palabraClave"
              value={search.nombre || ""}
              onChange={handleChange}
              placeholder="Digite el valor a buscar"
            />
            <div>
              <input
                type="submit"
                className="btn btn-primary box-border hover:border-black hover:border"
                value="Buscar"
                style={{
                  marginRight: "20px",
                  fontSize: "1rem",
                  cursor: "pointer",
                  padding: ".5rem 1rem",
                  transition: "border .3s",
                }}
                onClick={() => searchUser(search.nombre)}
              />
              &nbsp;&nbsp;{" "}
              <input
                type="button"
                className="btn btn-secondary box-border hover:border-black hover:border"
                value="Limpiar"
                style={{
                  fontSize: "1rem",
                  cursor: "pointer",
                  padding: ".5rem 1rem",
                  transition: "border .3s",
                }}
                onClick={(e) => {
                  console.log("limpiar");
                  clearCampo();
                  backData();
                }}
              />
            </div>
          </div>

          {crearButton && (
            <button
              style={{
                fontSize: "1rem",
                padding: ".5rem 1rem",
                cursor: "pointer",
              }}
              onMouseOver={(e) => {
                e.target.style.border = "1px solid #000";
              }}
              onMouseOut={(e) => {
                e.target.style.border = "none";
              }}
              onClick={() => {
                openModal();
                setIdent(0);
              }}
            >
              {"Crear " + seccion}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Buscador;
