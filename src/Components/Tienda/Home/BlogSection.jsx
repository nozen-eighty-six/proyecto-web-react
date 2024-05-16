import { useEffect } from "react";

const BlogSection = () => {
  console.log("BlogSection");

  useEffect(() => {

    const observer = new IntersectionObserver((entries)=>{
      entries.forEach((entry)=>{
        const image = entry.target;
        const src = image.getAttribute("data-src");
        if(entry.isIntersecting){
          console.log("Intersecting", entry.target);
          image.src = src;
          entry.target.closest("div.blog-1").classList.add("fade-in");

         // image.classList.add("fade-in");
          observer.disconnect();
        }
      })

    })

    const imagesContent = document.querySelectorAll(".blog img[data-src]");
    console.log(imagesContent);
    imagesContent.forEach(image => observer.observe(image, {threshold: 0.5}));
  }, []);
  return (
    <section className="blog container">
      <div className="blog-1 lazy">
        <img data-src="/public/images/b1.jpg" alt="" />
        <h3>Las tendencias más recientes en moda urbana</h3>
        <p>
          Descubre las últimas colecciones y tendencias que marcan la pauta en
          el mundo de la moda urbana.
        </p>
      </div>
      <div className="blog-1 lazy">
        <img data-src="/public/images/b2.jpg" alt="" />
        <h3>Consejos para combinar tus prendas favoritas</h3>
        <p>
          Aprende a crear looks únicos y estilosos combinando diferentes prendas
          de nuestra colección.
        </p>
      </div>
      <div className="blog-1 lazy">
        <img data-src="/public/images/b3.jpg" alt="" />
        <h3>La historia detrás de nuestras exclusivas gorras Pinnacle</h3>
        <p>
          Descubre cómo se fabrican nuestras famosas gorras Tech Flexfit y qué
          las hace tan especiales.
        </p>
      </div>
    </section>
  );
};

export default BlogSection;
