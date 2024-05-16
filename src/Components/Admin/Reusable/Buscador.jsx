import "../../../../public/css/Admin/reseteo.css"

const Buscador = ({ seccion, abrirModalCrearSeccion, crearButton, openModal, setIdent }) => {
  return (
    <div
      className="contenedor-form"
      style={{
        marginTop: "30px",
      }}
    >
      <div className="from-inline" style={{ width: "100%" }}>
        <div
          style={{
            "width": "100%",
            "display": "flex",
            "justifyContent": "space-between",
            "alignItems": "center",
            "marginBottom": "10px",
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
              name="palabraClave"
              className="form-control me-2 col-4"
              style={{
                marginRight: "20px",
                width: "300px",
                height: "40px",
                paddingLeft: "10px",
              }}
              id="palabraClave"
              placeholder="Digite el valor a buscar"
            />
            <div>
              <input
                type="submit"
                className="btn btn-primary "
                value="Buscar"
                style={{
                  marginRight: "20px",
                  fontSize: "1rem",
                  cursor: "pointer",
                  padding: ".5rem 1rem",
                  transition: "border 4s",
                }}
                onMouseOver={(e) => {
                  e.target.style.border = "1px solid #000";
                }}
                onMouseOut={(e) => {
                  e.target.style.border = "none";
                }}
              />
              &nbsp;&nbsp;{" "}
              <input
                type="button"
                className="btn btn-secondary "
                value="Limpiar"
                style={{
                  fontSize: "1rem",
                  cursor: "pointer",
                  padding: ".5rem 1rem",
                }}
                onMouseOver={(e) => {
                  e.target.style.border = "1px solid #000";
                }}
                onMouseOut={(e) => {
                  e.target.style.border = "none";
                }}
                onClick={(e) => {alert("Limpiar campos")}}
              />
            </div>
          </div>

          {crearButton &&
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
            onClick={()=>{
              openModal();
              setIdent(0);

            }

            }
          >
             {"Crear "+ seccion}
          </button>}
        </div>
      </div>
    </div>
  );
};

export default Buscador;
