import { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

const BlogSection = () => {
  console.log("BlogSection");

  return (
    <section
      className="blog xl:container xl:mx-auto  sm:w-full sm:mx-auto  sm:flex-col md:flex-col md:grid md:grid-cols-10 md:grid-rows-2
      xl:flex xl:flex-row
    "
    >
      <div className="blog-1 lazy sm:mb-18 md:col-start-1 md:col-end-5 md:row-start-1 md:row-end-2">
        <LazyLoadImage
          className="sm:w-90  md:min-vh-50 mx-auto "
          src="/public/images/b1.jpg"
          effect="opacity"
        />
        <h3 className="text-xl text-center mb-9 sm:mb-4 xl:w-90 xl:mx-auto xl:mb-11">
          Las tendencias más recientes en moda urbana
        </h3>
        <div className="sm:w-90 mx-auto">
          <p className=" break-words text-lg hyphens-auto">
            Descubre las últimas colecciones y tendencias que marcan la pauta en
            el mundo de la moda urbana.
          </p>
        </div>
      </div>
      <div className="blog-1 lazy sm:mb-18 md:col-start-7 md:col-end-11 md:row-start-1 md:row-end-2">
        <LazyLoadImage
          className="sm:w-90  md:min-vh-50 mx-auto"
          src="/public/images/b2.jpg"
          effect="opacity"
        />
        <h3 className="text-xl text-center mb-9 sm:mb-4 xl:w-90 xl:mx-auto xl:mb-11 xl:break-words">
          Consejos para combinar tus prendas favoritas
        </h3>
        <div className="sm:w-90 mx-auto">
          <p className=" break-words text-lg hyphens-auto">
            Aprende a crear looks únicos y estilosos combinando diferentes
            prendas de nuestra colección.
          </p>
        </div>
      </div>
      <div className="blog-1 lazy sm:mb-8 md:col-start-4 md:col-end-8 md:row-start-2  md:row-end-3">
        <LazyLoadImage
          className="sm:w-90  md:min-vh-50 mx-auto"
          src="/public/images/b3.jpg"
          effect="opacity"
        />
        <h3 className="text-xl text-center  mb-2 sm:mb-4 md:w-90 md:text-center md:mx-auto">
          La historia detrás de nuestras exclusivas gorras Pinnacle
        </h3>
        <div className="sm:w-90 mx-auto">
          <p className="break-words text-lg hyphens-auto">
            Descubre cómo se fabrican nuestras famosas gorras Tech Flexfit y qué
            las hace tan especiales.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
