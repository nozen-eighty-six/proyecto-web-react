import "../../../public/css/Tienda/index.css";
import LandingPage from "../../Components/Tienda/Home/LandingPage";
import Carrusel from "../../Components/Tienda/Home/Carrusel";
import Oferts from "../../Components/Tienda/Home/Oferts";
import CategoriaSection from "../../Components/Tienda/Home/CategoriaSection";
import PiePagina from "../../Components/Tienda/Home/PiePagina";
import BlogSection from "../../Components/Tienda/Home/BlogSection";
import { useCallback, useEffect } from "react";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  /*
  const cargaLazy = ()=>{
    const lazyImages = document.querySelectorAll(".slide-product img[data-src]");

    lazyImages.forEach((img) => {
      img.src = img.getAttribute("data-src");
    });
    
  
  }
*/
  const cargaLazy = useCallback(() => {
    const lazyImages = document.querySelectorAll(
      ".slide-product img[data-src]"
    );
    lazyImages.forEach((img) => {
      img.src = img.getAttribute("data-src");
    });
  }, []);
  return (
    <>
      <LandingPage  cargaLazy={cargaLazy}/>
      <Carrusel />
      <Oferts />
      <CategoriaSection />
      <BlogSection />
      <PiePagina />
    </>
  );
};

export default Home;
