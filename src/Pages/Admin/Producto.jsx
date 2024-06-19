import React, { useEffect, useState } from "react";
import helpHttp from "../../helpers/helpHttp";
import ProductoTable from "../../Components/Admin/ProductSection/ProductoTable";
import Buscador from "../../Components/Admin/Reusable/Buscador";
import { useModal } from "../../hooks/useModal";
import ModalProducto from "../../Components/Admin/Modals/ModalProducto";
import LoaderComponent from "../../Components/Reusable/LoaderComponent";
import PaginationButton from "../../Components/Admin/Reusable/PaginationButton";

const Producto = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [option, setOption] = useState({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const [pagina, setPagina] = useState(1); //No se usa
  const [productos, setProductos] = useState([]);
  const [isOpen, openModal, closeModal] = useModal(false);
  const [ident, setIdent] = useState(null);
  const [productoSE, setProductoSE] = useState(null);
  const [issaved, setIssaved] = useState(false);
  const [isupdate, setIsupdate] = useState(false);

  const handleClick = () => {
    let aProducto = document.querySelector(
      ".navegacion-ad a[href='/admin/productos']"
    );
    const $todosA = document.querySelectorAll(".navegacion-ad a");

    $todosA.forEach((el) => el.removeAttribute("id"));
    if (aProducto) {
      aProducto.setAttribute("id", "inbox");
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
    const getProductos = async () => {
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const url = "http://localhost:8080/productos/listar-siguientes-5";
      helpHttp()
        .get(url, options)
        .then((res) => {
          if (!res.err) {
            console.log(res);
            setProductos(res);
          } else {
            console.log(res);
          }
        });
    };

    getProductos();
    handleClick();
  }, [token]);

  useEffect(() => {
    const getProductos = async () => {
      const url = "http://localhost:8080/productos/listar-siguientes-5";
      helpHttp()
        .get(url)
        .then((res) => {
          if (!res.err) {
            setProductos(res);
          } else {
            console.log(res);
          }
        });
    };
    if (issaved || isupdate) {
      getProductos();
    }
  }, [issaved, isupdate]);

  useEffect(() => {
    const paginationButton = async () => {
      try {
        const datos = await getData();
        console.log(Math.ceil(datos.length / 5));
        setPagina(Math.ceil(datos.length / 5));
      } catch (error) {
        console.log(error);
      }
    };
    paginationButton();
  }, []);

  const getData = async () => {
    try {
      const url = "http://localhost:8080/productos/listar";
      const res = await fetch(url, option);
      if (!res.ok) throw { status: res.status, statusText: res.statusText };
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
      <h2 style={{ fontWeight: "normal" }}>Top Moda | Productos</h2>
      <Buscador
        seccion="productos"
        setSeccionData={setProductos}
        crearButton={true}
        openModal={openModal}
        setIdent={setIdent}
      />
      <div className="table-content overflow-x-auto">
        {productos.length != 0 && (
          <ProductoTable
            productos={productos}
            setIdent={setIdent}
            setProductoSE={setProductoSE}
            openModal={openModal}
            option={option}
          />
        )}
      </div>
      <ModalProducto
        isOpen={isOpen}
        closeModal={closeModal}
        ident={ident}
        productoSE={productoSE}
        setIssaved={setIssaved}
        setIsupdate={setIsupdate}
        option={option}
      />
      <PaginationButton
        pagina={pagina}
        controlador={"productos"}
        option={option}
        setObjeto={setProductos}
      />
      <LoaderComponent page={true} />
    </main>
  );
};

export default Producto;
