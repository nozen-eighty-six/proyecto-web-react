import '../../../public/css/Tienda/contactos.css'
import ContactForm from '../../Components/Tienda/Contact/ContactForm'
import ContactFooter from '../../Components/Tienda/Home/ContactFooter'
import { useEffect } from 'react';

const Contact = () => {

  useEffect(() => {
    window.scrollTo(0, 0);

  }, []);

  return (
    <>
    <section id="contacto" style={{"backgroundColor":"#fff"}}>
    <div className="container">
      <h2 style={{"fontSize":"25px","fontWeight":800}}>Contacto</h2>
      <p>Estamos aquí para responder tus preguntas y atender tus consultas. Contáctanos a través de:</p>
      <ul>
        <li>Email: info@topmoda.com</li>
        <li>Teléfono: +51 994001450</li>
        <li>Dirección: Av. Prolongacion Javier Prado 9515, Lima, Perú</li>
      </ul>
      <p>O si prefieres, completa el siguiente formulario y nos pondremos en contacto contigo:</p>
      <ContactForm />
    </div>
  </section>
  <ContactFooter />
  </>
  )
}

export default Contact