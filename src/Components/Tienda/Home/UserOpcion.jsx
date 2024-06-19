import React from "react";

const UserOpcion = ({ user, cerrarSesion }) => {
  console.log(user);
  const { nombre, mail } = JSON.parse(user);
  console.log(nombre);
  return (
    <div className="card-option" id="card">
      <header className="card-header">
        <h2>TOP MODA</h2>
      </header>
      <section className="datos">
        <h2 className="text-xl text-black">Usuario: {nombre}</h2>
        <span className="text-xl" id="usuarioCorreo">
          {mail}
        </span>
      </section>
      <section className="cerrarsesion">
        <a
          href="/usuario/cerrar"
          id="cerrarSesionBtn"
          className="cerrarsesion btn"
          onClick={cerrarSesion}
        >
          <img
            src="../../public/images/close.svg"
            className="user-icons inline"
            id="close"
            onClick={cerrarSesion}
          />
          Cerrar sesión
        </a>
      </section>
    </div>
  );
};

export default UserOpcion;
