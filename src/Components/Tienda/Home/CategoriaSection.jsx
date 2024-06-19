import { useCallback, useEffect } from "react";
import { NavLink } from "react-router-dom";

const CategoriaSection = () => {
  // console.log("CategoriaSection");
  const cargaLazyBlog = () => {
    const lazyImages = document.querySelectorAll(".blog-1 img[data-src]");
    const $divBlog = document.querySelectorAll(".blog-1");
    //  lazyImages.forEach((img) => {
    //  img.src = img.getAttribute("data-src");
    //});
    $divBlog.forEach((div) => {
      div.classList.add("fade-in");
    });
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          console.log(entry.intersectionRatio);
          if (entry.isIntersecting) {
            console.log(entry.intersectionRatio);

            // cargaLazyBlog();
            console.log("Intersecting");
            cargaLazyBlog();
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.9,
      }
    );

    const $blog = document.querySelector(".category-section");
    observer.observe($blog);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      className="category-section icons container sm:flex
     sm:flex-col sm:w-90 sm:gap-5 sm:mb-6 lg:grid lg:grid-cols-3 xl:flex  xl:flex-row xl:max-w-screen-xl"
    >
      <NavLink to={"/products/hombre"} className="icon-1">
        <div className="icon-img">
          <img src="images/i1.svg" alt="" id="_1" />
        </div>
        <div className="icon-txt">Hombre</div>
      </NavLink>

      <NavLink to={"/products/mujer"} className="icon-1">
        <div className="icon-img">
          <img src="images/i2.svg" alt="" id="_2" />
        </div>
        <div className="icon-txt">Mujer</div>
      </NavLink>

      <NavLink to={"/products/bebe"} className="icon-1">
        <div className="icon-img">
          <img src="images/stroller.png" alt="" id="_3" />
        </div>
        <div className="icon-txt">Bebes</div>
      </NavLink>

      <NavLink to={"/products/ninio"} className="icon-1">
        <div className="icon-img">
          <img src="images/i3.svg" alt="" id="_4" />
        </div>
        <div className="icon-txt">Niños</div>
      </NavLink>

      <NavLink to={"/products/sport"} className="icon-1">
        <div className="icon-img">
          <img src="images/shoe.png" alt="" id="_5" />
        </div>
        <div className="icon-txt">Sport</div>
      </NavLink>

      <NavLink to={"/products/accesorios"} className="icon-1">
        <div className="icon-img">
          <img src="images/bracelet.png" alt="" id="_6" />
        </div>
        <div className="icon-txt">Accesorios</div>
      </NavLink>
    </section>
  );
};

export default CategoriaSection;
