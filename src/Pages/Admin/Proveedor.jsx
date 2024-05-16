import React, { useEffect, useState } from "react";
import ProveedorTable from "../../Components/Admin/ProveedorSection/ProveedorTable";
import helpHttp from "../../helpers/helpHttp";
import Buscador from "../../Components/Admin/Reusable/Buscador";
import ModalSeccion from "../../Components/Admin/Modals/ModalSeccion";
import { useModal } from "../../hooks/useModal";
import LoaderComponent from "../../Components/Reusable/LoaderComponent";
import PaginationButton from "../../Components/Admin/Reusable/PaginationButton";

const Proveedor = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [pagina, setPagina] = useState(1);
  const [option, setOption] = useState({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const [proveedores, setProveedores] = useState([]);
  const [isOpen, openModal, closeModal] = useModal(false);
  const [ident, setIdent] = useState(null);
  const [proveeSE, setProveeSE] = useState(null);
  const [isupdate, setIsupdate] = useState(false);
  const [issaved, setIssaved] = useState(false);

  const handleClick = () => {
    let aProveedor = document.querySelector(
      ".navegacion-ad a[href='/admin/proveedores']"
    );
    const $todosA = document.querySelectorAll(".navegacion-ad a");

    $todosA.forEach((el) => el.removeAttribute("id"));
    if (aProveedor) {
      aProveedor.setAttribute("id", "inbox");
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
    console.log("token", token);
    const getProveedores = async () => {
      const url = "http://localhost:8080/proveedores/listar";
      helpHttp()
        .get(url, option)
        .then((res) => {
          if (!res.err) {
            setProveedores(res);
          } else {
            console.log(res);
          }
        });
    };

    getProveedores();
    handleClick();
  }, [token, option]);

  useEffect(() => {
    const getProveedores = async () => {
      const url = "http://localhost:8080/proveedores/listar";
      helpHttp()
        .get(url, option)
        .then((res) => {
          if (!res.err) {
            setProveedores(res);
          } else {
            console.log(res);
          }
        });
    };
    if (issaved || isupdate) {
      getProveedores();
    }
  }, [isupdate, issaved, option]);

  useEffect(() => {
    const paginationBtn = async () => {
      try {
        const datos = await getData();
        setPagina(Math.ceil(datos.length / 5));
      } catch (error) {
        console.log(error);
      }
    };
    paginationBtn();
  }, []);

  const getData = async () => {
    try {
      const url = "http://localhost:8080/proveedores/listar";
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
      <h2 style={{ fontWeight: "normal" }}>Top Moda | Proveedor</h2>

      <Buscador
        seccion="proveedores"
        abrirModalCrearSeccion={true}
        crearButton={true}
        openModal={openModal}
        setIdent={setIdent}
      />
      <div className="table-content">
        {proveedores.length != 0 && (
          <ProveedorTable
            proveedores={proveedores}
            openModal={openModal}
            setIdent={setIdent}
            setProveeSE={setProveeSE}
            option={option}
          />
        )}
      </div>
      <PaginationButton pagina={pagina} controlador={"proveedores"} option={option} setObjeto={setProveedores}/>
      <ModalSeccion
        isOpen={isOpen}
        closeModal={closeModal}
        ident={ident}
        proveeSE={proveeSE}
        setIssaved={setIssaved}
        setIsupdate={setIsupdate}
      />
      <LoaderComponent page={true} />
    </main>
  );
};

export default Proveedor;
