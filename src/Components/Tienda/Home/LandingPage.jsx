import { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

const LandingPage = ({ cargaLazy }) => {
  console.log("LandingPage");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          console.log(entry.intersectionRatio);
          if (!entry.isIntersecting) {
            console.log(entry.intersectionRatio);

            console.log("Intersecting");
            document.querySelector(".products").classList.add("fade-in");
            //cargaLazy();
            observer.unobserve(entry.target); // Desconecta solo el elemento observado
          }
        });
      },
      {
        threshold: 1, // Observe at 0%, 50%, and 100%
      }
    );
    const $products = document.querySelector(".header-txt");
    observer.observe($products);

    /* if ($sectionRef.current) {
      observer.observe($sectionRef.current);
    }*/
  }, []);
  return (
    <div
      className="header-content container sm:min-h-75 sm:box-content sm:flex sm:justify-center sm:items-center 
    sm:px-0 sm:pb-16 md:pb-20 xl:max-w-screen-xl xl:pb-10"
    >
      <div className="header-img sm:hidden md:hidden lg:block xl:block">
        <LazyLoadImage
          className=" mx-auto"
          src="images/hombre.png"
          effect="opacity"
        />
      </div>
      <div className="header-txt">
        <h1>Ofertas especiales</h1>
        <p>Estrena las mejores prendas</p>
        <a href="general.html" className="btn-1">
          Información
        </a>
      </div>
    </div>
  );
};

export default LandingPage;
