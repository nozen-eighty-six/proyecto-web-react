import React, { useState } from "react";
import helpHttp from "../../../helpers/helpHttp";

const ContactForm = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    //Envió una correo mediante formSubmit
    helpHttp().post("https://formsubmit.co/ajax/yuushaescalante@gmail.com", {
      body: {
        name: e.target.nombre.value,
        email: e.target.email.value,
        message: e.target.mensaje.value,
      },
      headers: {
        "Content-Type": "application/json",
       /* Accept: "application/json",*/
      },
    }).then(res => alert("Mensaje enviado")  
  )
    .catch(err => alert("Error al enviar mensaje"))
    .finally(() => {
      e.target.reset();
      setLoading(false);
    });
    
  };
  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <h3>Mensaje</h3>
      <input
        type="text"
        id="nombre"
        name="nombre"
        placeholder="Escriba su nombre"
        required
      />
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Escriba su correo"
        required
      />
      <textarea
        id="mensaje"
        name="mensaje"
        placeholder="Escriba su mensaje"
        required
      ></textarea>
      <button type="submit">Enviar Mensaje</button>
      <div className={`content-loader ${loading && 'is-loading'}`}>
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
