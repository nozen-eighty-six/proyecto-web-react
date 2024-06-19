import { useEffect, useRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import imagenPreCarga from "../../../../public/images/default.jpg";
import "react-lazy-load-image-component/src/effects/opacity.css";

const Carrusel = () => {
  console.log("Carrusel");
  const $slidesRef = useRef(null);
  const $btnsSlideRef = useRef(null);
  const $sectionRef = useRef(null);

  useEffect(() => {
    const $slides = $slidesRef.current.querySelectorAll(".slide-product");
    const $btnPrev = $btnsSlideRef.current.querySelector(".prev");
    const $btnNext = $btnsSlideRef.current.querySelector(".next");

    let i = 0;
    const handleClick = (e) => {
      console.log(e.target);
      if (e.target === $btnNext || e.target === $btnNext.querySelector("img")) {
        e.preventDefault();
        console.log("AH");
        //Al actual removerle la clase active
        $slides[i].classList.remove("active");
        i++;

        if (i >= $slides.length) {
          i = 0;
        }
        $slides[i].classList.add("active");
      }

      if (e.target === $btnPrev || e.target === $btnPrev.querySelector("img")) {
        e.preventDefault();
        i--;
        //Al actual removerle la clase active
        $slides[i].classList.remove("active");
        if (i < 0) {
          i = $slides.length - 1;
        }
        $slides[i].classList.add("active");
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <section
      className="products container sm:min-vh-70 sm:mb-4
       sm:w-90 sm:box-content xl:max-w-screen-xl lazy"
      id="lista-1"
      ref={$sectionRef}
    >
      <div className="slider sm:h-full">
        <h2>Productos</h2>

        <div className="slider-products sm:h-4/5" ref={$slidesRef}>
          <div className="slide-product active">
            <div className="product-img">
              <LazyLoadImage
                className="md:w-3/5 md:h-full md:mx-auto"
                effect="opacity"
                src="../../public/images/sobrecamisa-arica.webp"
              />
            </div>
            <div className="box-border product-txt text-center">
              <h3>Sobrecamisa Shacket</h3>

              <a href="product-camisa.html" className="informacion btn-2">
                Información
              </a>
            </div>
          </div>

          <div className="slide-product">
            <div className="product-img">
              <LazyLoadImage
                src="../../public/images/casaca-vaquera.webp"
                className="md:w-3/5 md:h-full md:mx-auto"
                effect="opacity"
              />
            </div>
            <div className="product-txt">
              <h3>Casaca Bomber</h3>
              <a href="product-casaca.html" className="btn-2">
                Información
              </a>
            </div>
          </div>
          <div className="slide-product">
            <div className="product-img">
              <LazyLoadImage
                src="../../public/images/gorra-flex.jpg"
                className="md:w-3/5 md:h-full md:mx-auto"
                effect="opacity"
              />
            </div>
            <div className="product-txt">
              <h3>Gorra Pinnacle</h3>

              <a href="product-gorra.html" className="btn-2">
                Información
              </a>
            </div>
          </div>
          <div className="slide-product">
            <div className="product-img">
              <LazyLoadImage
                src="../../public/images/polo-drymove-2.png"
                className="md:w-3/5 md:h-full md:mx-auto"
                effect="opacity"
              />
            </div>
            <div className="product-txt">
              <h3>Polo Sport</h3>

              <a href="product-polo.html" className="btn-2">
                Información
              </a>
            </div>
          </div>
          <div className="slide-product">
            <div className="product-img">
              <LazyLoadImage
                src="../../public/images/zapatilla-nike-3.jpg"
                className="md:w-3/5 md:h-full md:mx-auto"
                effect="opacity"
              />
            </div>
            <div className="product-txt">
              <h3>Zapatillas Urbanas</h3>
              <a href="product-zapatilla.html" className="btn-2">
                Información
              </a>
            </div>
          </div>
        </div>
        <div className="slider-btns" ref={$btnsSlideRef}>
          <button
            className="prev"
            style={{ backgroundColor: "transparent", cursor: "pointer" }}
          >
            <img src="../../public/images/icono-back.svg" alt="back" />
          </button>
          <button
            className="next mr-1   "
            href="#"
            style={{ backgroundColor: "transparent", cursor: "pointer" }}
          >
            <img src="../../public/images/icono-next.svg" alt="next" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Carrusel;
