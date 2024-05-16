import React, { useEffect, useState } from "react";
import helpHttp from "../../helpers/helpHttp";
import TableCTMR from "../../Components/Admin/Reusable/TableCTMR";
import Buscador from "../../Components/Admin/Reusable/Buscador";
import { useModal } from "../../hooks/useModal";
import ModalSeccionCM from "../../Components/Admin/Modals/ModalSeccionCM";
import LoaderComponent from "../../Components/Reusable/LoaderComponent";
import PaginationButton from "../../Components/Admin/Reusable/PaginationButton";

const Categoria = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [option, setOption] = useState({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const [categorias, setCategorias] = useState([]);
  const [isOpen, openModal, closeModal] = useModal(false);
  const [ident, setIdent] = useState(null);
  const [issaved, setIssaved] = useState(false);
  const [isupdated, setIsupdated] = useState(false);
  const [categoriaSE, setCategoriaSE] = useState(null);
  const [pagina, setPagina] = useState(1);

  const handleClick = () => {
    let aCategoria = document.querySelector(
      ".navegacion-ad a[href='/admin/categorias']"
    );
    const $todosA = document.querySelectorAll(".navegacion-ad a");

    $todosA.forEach((el) => el.removeAttribute("id"));
    if (aCategoria) {
      aCategoria.setAttribute("id", "inbox");
    }
    /*
    if (e.target.matches(".navegacion a *")) {
      $todosA.forEach((el) => el.removeAttribute("id"));
      //e.target.parentElement.preventDefault();
      // e.target.parentElement.stopPropagation();
      e.target.parentElement.setAttribute("id", "inbox");
    }*/
  };

  useEffect(() => {
    //No hay razón para validar si el usuario está o no, debe de estar
    //se supone que si está en esta página es porque ya está logueado

    function getCategories() {
      helpHttp()
        .get("http://localhost:8080/categorias/listar-siguientes-5", option)
        .then((res) => {
          if (!res.err) {
            setCategorias(res);
          } else {
            console.log(res);
          }
        });
    }
    getCategories();

    handleClick();
  }, [token, option]);

  useEffect(() => {
    const getCategories = () => {
      helpHttp()
        .get("http://localhost:8080/categorias/listar", option)
        .then((res) => {
          if (!res.err) {
            setCategorias(res);
          } else {
            console.log(res);
          }
        });
    };

    if (issaved || isupdated) {
      getCategories();
    }
  }, [isupdated, issaved, option]);

  useEffect(() => {
    const paginationButton = async () => {
      try {
        const datos = await getData();
        console.log(datos.length);
        setPagina(Math.ceil(datos.length / 5));
        //console.log();
      } catch (error) {
        console.log(error);
      }
    };
    paginationButton();
    
  }, []);
  
  

  const getData = async () => {
    try {
      const url = `http://localhost:8080/categorias/listar`;
      const res = await fetch(url, option);
      if (!res.ok) throw { status: res.status, statusText: res.statusText };
      const data = await res.json();

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main style={{ position: "relative", minHeight: "100vh" }}>
      <h2 style={{ fontWeight: "normal" }}>Top Moda | Categorías</h2>
      <Buscador
        seccion="categorias"
        abrirModalCrearSeccion={true}
        crearButton={true}
        openModal={openModal}
        setIdent={setIdent}
      />
      <div className="table-content">
        {categorias.length !== 0 && (
          <TableCTMR
            data={categorias}
            controlador="categorias"
            openModal={openModal}
            setIdent={setIdent}
            setObjetoSE={setCategoriaSE}
            option={option}
          />
        )}
      </div>
      <ModalSeccionCM
        isOpen={isOpen}
        closeModal={closeModal}
        opcion={"C"}
        objetoSE={categoriaSE}
        setIssaved={setIssaved}
        setIsupdated={setIsupdated}
        ident={ident}
        controlador={"categorias"}
      />
      <PaginationButton pagina={pagina} controlador={"categorias"} setObjeto={setCategorias} option={option}/>
      <LoaderComponent page={true} />
    </main>
  );
};

export default Categoria;
