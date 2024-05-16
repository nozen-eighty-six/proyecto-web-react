import React, { useEffect, useState } from "react";
import helpHttp from "../../helpers/helpHttp";
import PedidoTable from "../../Components/Admin/PedidoSection/PedidoTable";
import Buscador from "../../Components/Admin/Reusable/Buscador";
import ModalPedido from "../../Components/Admin/Modals/ModalPedido";
import { useModal } from "../../hooks/useModal";
import LoaderComponent from "../../Components/Reusable/LoaderComponent";
import PaginationButton from "../../Components/Admin/Reusable/PaginationButton";

const Pedido = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [pagina, setPagina] = useState(1);
  const [option, setOption] = useState({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const [pedidos, setPedidos] = useState([]);
  const [isOpen, openModal, closeModal] = useModal(false);
  const [proveeId, setProveeId] = useState(0);
  const [ident, setIdent] = useState(null);
  const [pedidoSE, setPedidoSE] = useState(null);
  const [issaved, setIssaved] = useState(false);

  const handleClick = () => {
    let aPedido = document.querySelector(
      ".navegacion-ad a[href='/admin/pedidos']"
    );
    const $todosA = document.querySelectorAll(".navegacion-ad a");

    $todosA.forEach((el) => el.removeAttribute("id"));
    if (aPedido) {
      aPedido.setAttribute("id", "inbox");
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
    const getPedidos = () => {

      helpHttp()
        .get("http://localhost:8080/pedidos/listar-siguientes-5",option)
        .then((res) => {
          if (!res.err) {
            setPedidos(res);
          } else {
            console.log(res);
          }
        });
    };

    getPedidos();
    handleClick();
  }, [option]);

  useEffect(() => {
    const getPedidos = () => {
      helpHttp()
        .get("http://localhost:8080/pedidos/listar-siguientes-5", option)
        .then((res) => {
          if (!res.err) {
            setPedidos(res);
          } else {
            console.log(res);
          }
        });
    };

    if (issaved) {
      getPedidos();
    }

  }, [issaved, option]);

  useEffect(() => {
    const paginationBtn = async ()=>{
      const datos = await getData();
      setPagina(Math.ceil(datos.length / 5));
    }
    paginationBtn();
  },[]);

  const getData = async () => {
    try {
      const url = "http://localhost:8080/pedidos/listar";
      const res = await fetch(url, option);
      if(!res.ok) throw {err: true, status: res.status, statusText: res.statusText};
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main style={{ position: "relative", minHeight: "100vh" }}>
      <h2 style={{ fontWeight: "normal" }}>Top Moda | Pedido</h2>
      <Buscador
        seccion="pedidos"
        abrirModalCrearSeccion={true}
        crearButton={true}
        openModal={openModal}
        setIdent={setIdent}
      />
      <div className="table-content">
        <PedidoTable data={pedidos} openModal={openModal} option={option} />
      </div>
    <PaginationButton pagina={pagina} controlador={"pedidos"} option={option}  setObjeto={setPedidos} />
      <ModalPedido
        isOpen={isOpen}
        closeModal={closeModal}
        setProveeId={setProveeId}
        proveeId={proveeId}
        setIssaved={setIssaved}
        option={option}
      />
      <LoaderComponent page={true} />
    </main>
  );
};

export default Pedido;
