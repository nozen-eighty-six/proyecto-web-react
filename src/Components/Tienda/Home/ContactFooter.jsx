import React from 'react'

const ContactFooter = () => {
  return (
    <footer className="footer">
    <div className="footer-content container">
      <div className="link">
        <h3>Contacto</h3>
        <ul>
          <li>Dirección: Av. Prolongacion Javier Prado 9515</li>
          <li>Teléfono: 994001450</li>
          <li>RUC: 10253061647</li>
        </ul>
      </div>
      <div className="link">
        <h3>Horario de Atención</h3>
        <ul>
          <li>Lunes a Viernes: 9:00 AM - 8:00 PM</li>
          <li>Sábados y Domingos: 10:00 AM - 6:00 PM</li>
        </ul>
      </div>
      <div className="link">
        <h3>Redes Sociales</h3>
        <ul>
          <li><a href="#">Facebook</a></li>
          <li><a href="#">Instagram</a></li>
          <li><a href="#">Twitter</a></li>
        </ul>
      </div>
      <div className="link">
        <h3>Servicios</h3>
        <ul>
          <li>Envíos a domicilio disponibles</li>
          <li>Amplia variedad de tallas y estilos</li>
          <li>Promociones especiales para clientes frecuentes</li>
        </ul>
      </div>
    </div>
  </footer>
  )
}

export default ContactFooter