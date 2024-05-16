import React, { useEffect, useState } from "react";
import helpHttp from "../../helpers/helpHttp";
import TableCTMR from "../../Components/Admin/Reusable/TableCTMR";
import Buscador from "../../Components/Admin/Reusable/Buscador";
import ModalSeccionCM from "../../Components/Admin/Modals/ModalSeccionCM";
import { useModal } from "../../hooks/useModal";
import LoaderComponent from "../../Components/Reusable/LoaderComponent";
import PaginationButton from "../../Components/Admin/Reusable/PaginationButton";

const Marca = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [pagina, setPagina] = useState(1);
  const [option, setOption] = useState({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const [marcas, setMarcas] = useState([]);
  const [isOpen, openModal, closeModal] = useModal(false);
  const [ident, setIdent] = useState(null);
  const [issaved, setIssaved] = useState(false);
  const [isupdated, setIsupdated] = useState(false);
  const [marcaSE, setMarcaSE] = useState(null);
  const handleClick = () => {
    let aMarca = document.querySelector(
      ".navegacion-ad a[href='/admin/marcas']"
    );
    const $todosA = document.querySelectorAll(".navegacion-ad a");

    $todosA.forEach((el) => el.removeAttribute("id"));
    if (aMarca) {
      aMarca.setAttribute("id", "inbox");
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
    const getMarcas = () => {
      helpHttp()
        .get("http://localhost:8080/marcas/listar-siguientes-5", option)
        .then((res) => {
          if (!res.err) {
            setMarcas(res);
          } else {
            console.log(res);
          }
        });
    };

    getMarcas();
    handleClick();
  }, [token, option]);

  useEffect(() => {
    const getMarcas = () => {
      helpHttp()
        .get("http://localhost:8080/marcas/listar-siguientes-5", option)
        .then((res) => {
          if (!res.err) {
            setMarcas(res);
          } else {
            console.log(res);
          }
        });
    };
    if (issaved || isupdated) {
      getMarcas();
    }
  }, [issaved, isupdated, option]);

  useEffect(() => {
    const paginationBtn = async () => {
      try {
        const datos = await getData();
        console.log(Math.ceil(datos.length / 5));
        setPagina(Math.ceil(datos.length / 5));
      } catch (error) {
        console.log(error);
      }
    };
    paginationBtn();
  }, []);

  const getData = async () => {
    try {
      const url = `http://localhost:8080/marcas/listar`;
      const res = await fetch(url, option);
      if (!res.ok)
        throw {
          err: res.error,
          status: res.status,
          statusText: res.statusText,
        };
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main style={{ position: "relative", minHeight: "100vh" }}>
      <h2 style={{ fontWeight: "normal" }}>Top Moda | Marcas</h2>
      <Buscador
        seccion="marcas"
        abrirModalCrearSeccion={true}
        crearButton={true}
        openModal={openModal}
        setIdent={setIdent}
      />

      <div className="table-content">
        {marcas.length !== 0 && (
          <TableCTMR
            data={marcas}
            controlador={"marcas"}
            openModal={openModal}
            setIdent={setIdent}
            setObjetoSE={setMarcaSE}
            option={option}
          />
        )}
      </div>

      <PaginationButton pagina={pagina} controlador={"marcas"} option={option} setObjeto={setMarcas}/>
      <ModalSeccionCM
        isOpen={isOpen}
        closeModal={closeModal}
        opcion={"M"}
        objetoSE={marcaSE}
        setIssaved={setIssaved}
        setIsupdated={setIsupdated}
        ident={ident}
        controlador={"marcas"}
      />
      <LoaderComponent page={true} />
    </main>
  );
};

export default Marca;
