import React, { useEffect, useState } from "react";
import helpHttp from "../../helpers/helpHttp";
import EntradaTable from "../../Components/Admin/EntradaSection/EntradaTable";
import Buscador from "../../Components/Admin/Reusable/Buscador";
import ModalDetPedido from "../../Components/Admin/Modals/ModalDetPedido";
import { useModal } from "../../hooks/useModal";
import LoaderComponent from "../../Components/Reusable/LoaderComponent";
import ModalSeccionEntrada from "../../Components/Admin/Modals/ModalSeccionEntrada";
import PaginationButton from "../../Components/Admin/Reusable/PaginationButton";

const Entrada = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [pagina, setPagina] = useState(1);
  const [option, setOption] = useState({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const [entradas, setEntradas] = useState([]);
  const [isOpen, openModal, closeModal] = useModal(false);
  const [isOpenDet, openModalDet, closeModalDet] = useModal(false);
  const [identificador, setIdentificador] = useState("");
  const [entradaSE, setEntradaSE] = useState(null);
  const [isupdated, setIsupdated] = useState(false);
  const handleClick = () => {
    let aEntrada = document.querySelector(
      ".navegacion-ad a[href='/admin/entradas']"
    );
    const $todosA = document.querySelectorAll(".navegacion-ad a");

    $todosA.forEach((el) => el.removeAttribute("id"));
    if (aEntrada) {
      aEntrada.setAttribute("id", "inbox");
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
    const getEntradas = () => {
      helpHttp()
        .get("http://localhost:8080/entradas/listar-siguientes-5", option)
        .then((res) => {
          if (!res.err) {
            console.log(res);
            setEntradas(res);
          } else {
            console.log(res);
          }
        });
    };
    getEntradas();
    handleClick();
  }, [token, option]);

  useEffect(() => {
    const getEntradas = () => {
      helpHttp()
        .get("http://localhost:8080/entradas/listar-siguientes-5", option)
        .then((res) => {
          if (!res.err) {
            console.log(res);
            setEntradas(res);
          } else {
            console.log(res);
          }
        });
    };
    if (isupdated) {
      getEntradas();
    }
  }, [isupdated, option]);

  useEffect(() => {
    const paginationBtn = async () => {
      const datos = await getData();
      setPagina(Math.ceil(datos.length / 5));
    };
    paginationBtn();
  }, []);

  const getData = async () => {
    try {
      const url = `http://localhost:8080/entradas/listar`;
      const res = await fetch(url, option);
      if (!res.ok)
        throw { err: true, status: res.status, statusText: res.statusText };
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main
      className="lg:m-l-63"
      style={{ position: "relative", minHeight: "100vh" }}
    >
      <h2 style={{ fontWeight: "normal" }}>Top Moda | Entradas</h2>
      <Buscador
        seccion="entradas"
        abrirModalCrearSeccion={true}
        crearButton={false}
      />
      <div className="table-content">
        <EntradaTable
          entradas={entradas}
          setIdentificador={setIdentificador}
          openModal={openModal}
          openModalDet={openModalDet}
          setEntradaSE={setEntradaSE}
          option={option}
        />
      </div>
      <ModalSeccionEntrada
        isOpenDet={isOpenDet}
        closeModalDet={closeModalDet}
        identificador={identificador}
        setIdentificador={setIdentificador}
        objetoSE={entradaSE}
        setIsupdated={setIsupdated}
      />

      <PaginationButton
        pagina={pagina}
        setObjeto={setEntradas}
        controlador={"entradas"}
        option={option}
      />
      <ModalDetPedido
        isOpen={isOpen}
        closeModal={closeModal}
        identificador={identificador}
        setIdentificador={setIdentificador}
        option={option}
      />
      <LoaderComponent page={true} />
    </main>
  );
};

export default Entrada;
