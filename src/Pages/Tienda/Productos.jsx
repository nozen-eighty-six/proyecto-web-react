import "../../../public/css/Tienda/general.css";
import "../../../public/css/Tienda/moda-detalle-producto.css";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ItemProducto from "../../Components/Tienda/Products/ItemProducto";
import helpHttp from "../../helpers/helpHttp";
import LoaderComponent from "../../Components/Reusable/LoaderComponent";
import { useModal } from "../../hooks/useModal";
import ProductDetail from "../../Components/Tienda/Products/ProductDetail";
import PiePagina from "../../Components/Tienda/Home/PiePagina";
import MenuToggle from "../../Components/Tienda/Home/MenuToggle";

const Productos = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [usuario, setUsuario] = useState(false);
  const itemProductRef = useRef(null);
  const [dataCamisa, setDataCamisa] = useState(null);
  let [dataPolo, setDataPolo] = useState(null);
  let [dataGorra, setDataGorra] = useState(null);
  let [dataCasaca, setDataCasaca] = useState(null);
  let [dataZapatilla, setDataZapatilla] = useState(null);
  let [dataMujer, setDataMujer] = useState(null);
  let [dataHombre, setDataHombre] = useState(null);
  let [dataNinio, setDataNinio] = useState(null);
  let [dataBebe, setDataBebe] = useState(null);
  let [dataSport, setDataSport] = useState(null);
  let [dataAccesorio, setDataAccesorio] = useState(null);
  const [productoId, setProductoId] = useState("");
  const [productCategory, setProductCategory] = useState(null);
  const [isOpen, openModal, closeModal] = useModal(false);
  const { category } = useParams();

  useEffect(() => {
    const usuarioLoc = localStorage.getItem("usuario");
    if (usuarioLoc && !category) {
      console.log("Usuario logueado");
      setUsuario(true);
      getProducts(token);
    } else if (!usuarioLoc && !category) {
      console.log("Usuario no logueado");
      setUsuario(false);
      getProducts();
    }
    if (usuarioLoc && category) {
      console.log("Usuario logueado");
      setUsuario(true);
      getProductByCategory(category);
    } else if (!usuarioLoc && category) {
      console.log("Usuario no logueado");
      setUsuario(false);
      getProductByCategory(category);
    }

    function getProductByCategory(category) {
      helpHttp()
        .get(`http://localhost:8080/productos/${category}`)
        .then((res) => {
          if (!res.err) {
            setProductCategory(res);
          }
        })
        .catch((err) => console.log(err));
    }

    function getProducts(token) {
      console.log("token: ", token);
      if (token) {
        const options = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        helpHttp()
          .get("http://localhost:8080/productos/camisa", options)
          .then((res) => {
            if (!res.err) setDataCamisa(res);
          })
          .catch((err) => console.log(err));

        helpHttp()
          .get("http://localhost:8080/productos/polo", options)
          .then((res) => {
            if (!res.err) setDataPolo(res);
          })
          .catch((err) => console.log(err));

        helpHttp()
          .get("http://localhost:8080/productos/gorra", options)
          .then((res) => {
            if (!res.err) setDataGorra(res);
          })
          .catch((err) => console.log(err));
        helpHttp()
          .get("http://localhost:8080/productos/casaca", options)
          .then((res) => {
            if (!res.err) setDataCasaca(res);
          })
          .catch((err) => console.log(err));
        helpHttp()
          .get("http://localhost:8080/productos/zapatilla", options)
          .then((res) => {
            if (!res.err) setDataZapatilla(res);
          })
          .catch((err) => console.log(err));
        helpHttp()
          .get("http://localhost:8080/productos/mujer", options)
          .then((res) => {
            if (!res.err) setDataMujer(res);
          })
          .catch((err) => console.log(err));
        helpHttp()
          .get("http://localhost:8080/productos/hombre", options)
          .then((res) => {
            if (!res.err) setDataHombre(res);
          })
          .catch((err) => console.log(err));
        helpHttp()
          .get("http://localhost:8080/productos/ninio", options)
          .then((res) => {
            if (!res.err) setDataNinio(res);
          })
          .catch((err) => console.log(err));
        helpHttp()
          .get("http://localhost:8080/productos/bebes", options)
          .then((res) => {
            if (!res.err) setDataBebe(res);
          })
          .catch((err) => console.log(err));
        helpHttp()
          .get("http://localhost:8080/productos/sport", options)
          .then((res) => {
            if (!res.err) setDataSport(res);
          })
          .catch((err) => console.log(err));
        helpHttp()
          .get("http://localhost:8080/productos/accesorios", options)
          .then((res) => {
            if (!res.err) setDataAccesorio(res);
          })
          .catch((err) => console.log(err));
      } else {
        helpHttp()
          .get("http://localhost:8080/productos/camisa")
          .then((res) => {
            if (!res.err) setDataCamisa(res);
          })
          .catch((err) => console.log(err));

        helpHttp()
          .get("http://localhost:8080/productos/polo")
          .then((res) => {
            if (!res.err) setDataPolo(res);
          })
          .catch((err) => console.log(err));

        helpHttp()
          .get("http://localhost:8080/productos/gorra")
          .then((res) => {
            if (!res.err) setDataGorra(res);
          })
          .catch((err) => console.log(err));
        helpHttp()
          .get("http://localhost:8080/productos/casaca")
          .then((res) => {
            if (!res.err) setDataCasaca(res);
          })
          .catch((err) => console.log(err));
        helpHttp()
          .get("http://localhost:8080/productos/zapatilla")
          .then((res) => {
            if (!res.err) setDataZapatilla(res);
          })
          .catch((err) => console.log(err));
        helpHttp()
          .get("http://localhost:8080/productos/mujer")
          .then((res) => {
            if (!res.err) setDataMujer(res);
          })
          .catch((err) => console.log(err));
        helpHttp()
          .get("http://localhost:8080/productos/hombre")
          .then((res) => {
            if (!res.err) setDataHombre(res);
          })
          .catch((err) => console.log(err));
        helpHttp()
          .get("http://localhost:8080/productos/ninio")
          .then((res) => {
            if (!res.err) setDataNinio(res);
          })
          .catch((err) => console.log(err));
        helpHttp()
          .get("http://localhost:8080/productos/bebes")
          .then((res) => {
            if (!res.err) setDataBebe(res);
          })
          .catch((err) => console.log(err));
        helpHttp()
          .get("http://localhost:8080/productos/sport")
          .then((res) => {
            if (!res.err) setDataSport(res);
          })
          .catch((err) => console.log(err));
        helpHttp()
          .get("http://localhost:8080/productos/accesorios")
          .then((res) => {
            if (!res.err) setDataAccesorio(res);
          })
          .catch((err) => console.log(err));
      }
    }

    // getProducts();

    return () => {
      setDataCamisa(null);
      setDataPolo(null);
      setDataGorra(null);
      setDataCasaca(null);
      setDataZapatilla(null);
      setDataMujer(null);
      setDataHombre(null);
      setDataNinio(null);
      setDataBebe(null);
      setDataSport(null);
      setDataAccesorio(null);
      setProductCategory(null);
      setUsuario(false);
    };
  }, [token, category]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //const memoizedDataCamisa  = useMemo(()=> dataCamisa, [dataCamisa]);
  // Memoizar el mapeo de dataCamisa
  const productosRenderizados = useMemo(() => {
    return (
      dataCamisa &&
      dataCamisa.map((productoR) => (
        <ItemProducto
          key={productoR.id}
          productoRec={productoR}
          usuario={usuario}
          setProductoId={setProductoId}
          openModal={openModal}
        />
      ))
    );
  }, [dataCamisa, usuario, setProductoId, openModal]);

  return (
    <>
      <main className="products container md:px-0" id="lista-1">
        {!category ? (
          <>
            <h2>camisas</h2>
            <div className="container product-content">
              {dataCamisa === undefined && <p>Loading...</p>}

              {console.log(dataCamisa)}
              {productosRenderizados}
            </div>

            <h2>polos</h2>
            <div className="product-content">
              {dataPolo === undefined && <p>Loading...</p>}
              {dataPolo &&
                dataPolo.map((productoR) => (
                  <ItemProducto
                    key={productoR.id}
                    productoRec={productoR}
                    usuario={usuario}
                    setProductoId={setProductoId}
                    openModal={openModal}
                    ref={itemProductRef}
                  />
                ))}
            </div>
            <h2>gorras</h2>
            <div className="product-content">
              {dataGorra === undefined && <p>Loading...</p>}
              {dataGorra &&
                dataGorra.map((productoR) => (
                  <ItemProducto
                    key={productoR.id}
                    productoRec={productoR}
                    usuario={usuario}
                    setProductoId={setProductoId}
                    openModal={openModal}
                    ref={itemProductRef}
                  />
                ))}
            </div>
            <h2>casacas</h2>
            <div className="product-content">
              {dataCasaca === undefined && <p>Loading...</p>}
              {dataCasaca &&
                dataCasaca.map((productoR) => (
                  <ItemProducto
                    key={productoR.id}
                    productoRec={productoR}
                    usuario={usuario}
                    setProductoId={setProductoId}
                    openModal={openModal}
                    ref={itemProductRef}
                  />
                ))}
            </div>
            <h2>zapatillas</h2>

            <div className="product-content">
              {dataZapatilla === undefined && <p>Loading...</p>}
              {dataZapatilla &&
                dataZapatilla.map((productoR) => (
                  <ItemProducto
                    key={productoR.id}
                    productoRec={productoR}
                    usuario={usuario}
                    setProductoId={setProductoId}
                    openModal={openModal}
                    ref={itemProductRef}
                  />
                ))}
            </div>

            <h2>mujer</h2>

            <div className="product-content">
              {dataMujer === undefined && <p>Loading...</p>}
              {dataMujer &&
                dataMujer.map((productoR) => (
                  <ItemProducto
                    key={productoR.id}
                    productoRec={productoR}
                    usuario={usuario}
                    setProductoId={setProductoId}
                    openModal={openModal}
                    ref={itemProductRef}
                  />
                ))}
            </div>

            <h2>hombre</h2>

            <div className="product-content">
              {dataHombre === undefined && <p>Loading...</p>}
              {dataHombre &&
                dataHombre.map((productoR) => (
                  <ItemProducto
                    key={productoR.id}
                    productoRec={productoR}
                    usuario={usuario}
                    setProductoId={setProductoId}
                    openModal={openModal}
                    ref={itemProductRef}
                  />
                ))}
            </div>

            <h2>niños</h2>

            <div className="product-content">
              {dataNinio === undefined && <p>Loading...</p>}
              {dataNinio &&
                dataNinio.map((productoR) => (
                  <ItemProducto
                    key={productoR.id}
                    productoRec={productoR}
                    usuario={usuario}
                    setProductoId={setProductoId}
                    openModal={openModal}
                    ref={itemProductRef}
                  />
                ))}
            </div>

            <h2>bebes</h2>

            <div className="product-content">
              {dataBebe === undefined && <p>Loading...</p>}
              {dataBebe &&
                dataBebe.map((productoR) => (
                  <ItemProducto
                    key={productoR.id}
                    productoRec={productoR}
                    setProductoId={setProductoId}
                    openModal={openModal}
                    usuario={usuario}
                    ref={itemProductRef}
                  />
                ))}
            </div>

            <h2>sport</h2>

            <div className="product-content">
              {dataSport === undefined && <p>Loading...</p>}
              {dataSport &&
                dataSport.map((productoR) => (
                  <ItemProducto
                    key={productoR.id}
                    productoRec={productoR}
                    usuario={usuario}
                    setProductoId={setProductoId}
                    openModal={openModal}
                    ref={itemProductRef}
                  />
                ))}
            </div>
            <h2>accesorios</h2>

            <div className="product-content">
              {dataAccesorio === undefined && <p>Loading...</p>}
              {dataAccesorio &&
                dataAccesorio.map((productoR) => (
                  <ItemProducto
                    key={productoR.id}
                    productoRec={productoR}
                    usuario={usuario}
                    setProductoId={setProductoId}
                    openModal={openModal}
                    ref={itemProductRef}
                  />
                ))}
            </div>
          </>
        ) : (
          <>
            <h2>{category == "ninio" ? "Niños" : category.toUpperCase()}</h2>
            <div className="product-content">
              {productCategory === undefined && <p>Loading...</p>}
              {productCategory &&
                productCategory.map((productoR) => (
                  <ItemProducto
                    key={productoR.id}
                    productoRec={productoR}
                    usuario={usuario}
                    setProductoId={setProductoId}
                    openModal={openModal}
                    ref={itemProductRef}
                  />
                ))}
            </div>
          </>
        )}
        {/*<article className="modal"></article>*/}
        {isOpen && (
          <ProductDetail
            isOpenDetail={isOpen}
            productoId={productoId}
            closeModal={closeModal}
          />
        )}
      </main>
      <MenuToggle />

      <LoaderComponent page={true} />

      <PiePagina />
    </>
  );
};

export default Productos;
