import React, { useState } from "react";
import helpHttp from "../../../helpers/helpHttp";

const ContactForm = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    //Envió una correo mediante formSubmit
    helpHttp()
      .post("https://formsubmit.co/ajax/yuushaescalante@gmail.com", {
        body: {
          name: e.target.nombre.value,
          email: e.target.email.value,
          message: e.target.mensaje.value,
        },
        headers: {
          "Content-Type": "application/json",
          /* Accept: "application/json",*/
        },
      })
      .then((res) => alert("Mensaje enviado"))
      .catch((err) => alert("Error al enviar mensaje"))
      .finally(() => {
        e.target.reset();
        setLoading(false);
      });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="border-black border-2 border-solid sm:grid sm:grid-cols-1 sm:grid-rows-5 lg:grid-cols-2 lg:grid-rows-4 w-90 min-vh-80 overflow-y-auto my-8 mx-auto md:w-full"
    >
      <div className="content-title md:flex justify-center items-center md:col-span-2 md:row-span-1">
        <h3
          className="sm:inline-block text-center w-full h-10 text-3xl mb-0 
      md:text-4xl lg:col-end-3 md:col-start-1
     "
        >
          Mensaje
        </h3>
      </div>
      <input
        type="text"
        id="nombre"
        className="focus:outline-2 outline-black sm:w-90 h-2/5 sm:text-xl border-2 border-black border-solid pl-2 my-0 mx-auto rounded col-start-1 col-end-3 row-start-2 row-end-3
        lg:col-start-1 lg:col-end-2 lg:text-2xl xl:text-xl"
        name="nombre"
        placeholder="Escriba su nombre"
        required
      />
      <input
        type="email"
        id="email"
        className="focus:outline-2 outline-black sm:w-90 h-2/5 sm:text-xl border-2 border-black border-solid pl-2 my-0 mx-auto rounded col-start-1 col-end-3 row-start-3 row-end-4
        lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3 lg:text-2xl xl:text-xl
        "
        name="email"
        placeholder="Escriba su correo"
        required
      />
      <textarea
        id="mensaje"
        className="focus:outline-2 outline-black sm:w-90 mx-auto col-span-2 text-xl pl-2 rounded border-black border-2 border-solid resize-none 
        col-start-1 col-end-3 row-start-4 row-end-5 lg:row-start-3 lg:row-end-4 lg:text-2xl xl:text-xl"
        style={{ width: "95%" }}
        name="mensaje"
        placeholder="Escriba su mensaje"
        required
      ></textarea>
      <button
        className=" sm:w-1/2 h-1/2 m-auto text-white text-base font-bold 
        py-3 px-0 border-none rounded cursor-pointer bg-black bottom-2 
        left-1/4 col-start-1 col-end-3 row-start-5 row-end-6
        lg:row-start-4 lg:row-end-5 lg:text-2xl xl:w-1/4 xl:h-2/5 xl:text-xl"
        type="submit"
      >
        Enviar Mensaje
      </button>
      <div className={`content-loader ${loading && "is-loading"}`}>
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#000"
        >
          <g fill="none" fillRule="evenodd" strokeWidth="2">
            <circle cx="22" cy="22" r="1">
              <animate
                attributeName="r"
                begin="0s"
                dur="1.8s"
                values="1; 20"
                calcMode="spline"
                keyTimes="0; 1"
                keySplines="0.165, 0.84, 0.44, 1"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-opacity"
                begin="0s"
                dur="1.8s"
                values="1; 0"
                calcMode="spline"
                keyTimes="0; 1"
                keySplines="0.3, 0.61, 0.355, 1"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="22" cy="22" r="1">
              <animate
                attributeName="r"
                begin="-0.9s"
                dur="1.8s"
                values="1; 20"
                calcMode="spline"
                keyTimes="0; 1"
                keySplines="0.165, 0.84, 0.44, 1"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-opacity"
                begin="-0.9s"
                dur="1.8s"
                values="1; 0"
                calcMode="spline"
                keyTimes="0; 1"
                keySplines="0.3, 0.61, 0.355, 1"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        </svg>
      </div>
    </form>
  );
};

export default ContactForm;
