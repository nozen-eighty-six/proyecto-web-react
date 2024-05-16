import { useEffect } from "react";

const LandingPage = ({cargaLazy}) => {
  console.log("LandingPage");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio < 0.6) {
            console.log("Intersecting");
            document.querySelector(".products").classList.add("fade-in");
            cargaLazy();
            observer.unobserve(entry.target); // Desconecta solo el elemento observado
          }
        });
      },
      {
        threshold: [0, 0.5, 1], // Observe at 0%, 50%, and 100%
      }
    );
    const $products = document.querySelector(".header-content");
    observer.observe($products);

    /* if ($sectionRef.current) {
      observer.observe($sectionRef.current);
    }*/
  }, []);
  return (
    <div className="header-content container">
      <div className="header-img">
        <img src="images/hombre.png" alt="" />
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
