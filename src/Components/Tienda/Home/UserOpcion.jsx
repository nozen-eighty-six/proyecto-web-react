import React from "react";

const UserOpcion = ({usuario, cerrarSesion}) => {
  return (
    <div className="card-user" id="card">
      <header className="card-header">
        <h1>TOP MODA</h1>
      </header>
      <section className="datos">
        <h2>Usuario: {usuario.nombre}</h2>
        <span id="usuarioCorreo">{usuario.mail}</span>
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
            className="user-icons"
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
