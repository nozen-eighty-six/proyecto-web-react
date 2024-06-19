import React, { useEffect, useRef, useState } from "react";
import "../../../../public/css/Admin/paginationButton.css";
import helpHttp from "../../../helpers/helpHttp";
const PaginationButton = ({ pagina, controlador, setObjeto, option }) => {
  console.log(pagina);
  const [numPaginas, setNumPaginas] = useState([]);
  const refButton = useRef(null);
  const styleButton = {
    width: "40px",
    height: "40px",
    color: "#000",
    cursor: "pointer",
    border: "1px solid #000",
  };

  const handleClick = (e) => {
    console.log(e.target.dataset.ruta);

    let ruta = e.target.dataset.ruta;
    let url = `http://localhost:8080/${controlador}/${ruta}`;
    const res = helpHttp().get(url, option);
    res.then((res) => {
      if (!res.err) {
        setObjeto(res);
      } else {
        console.log(res);
      }
    });
    changePage(e);
  };

  const changePage = (e) => {
    refButton.current.querySelector(".active").classList.remove("active");
    e.target.classList.add("active");
  };
  useEffect(() => {
    const calcPaginas = () => {
      let paginas = [];
      for (let i = 1; i <= pagina; i++) {
        paginas.push(i);
        console.log("pasando for");
      }
      setNumPaginas(paginas);
    };

    calcPaginas();
  }, [pagina]);
  return (
    <div
      className="content-pagination-button sm:bottom-1 lg:bottom-2"
      style={{
        position: "absolute",
        right: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      ref={refButton}
    >
      {console.log(numPaginas)}
      {numPaginas.map((item, index) =>
        index == 0 ? (
          <button
            key={item}
            className="pagination-button active"
            data-ruta={`listar-siguientes-` + 5 * item}
            style={styleButton}
            onClick={handleClick}
          >
            {item}
          </button>
        ) : (
          <button
            key={item}
            className="pagination-button"
            data-ruta={`listar-siguientes-` + 5 * item}
            style={styleButton}
            onClick={handleClick}
          >
            {item}
          </button>
        )
      )}
    </div>
  );
};

export default PaginationButton;
