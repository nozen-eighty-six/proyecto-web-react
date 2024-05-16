
const ModalSeccion = () => {
  const handlePropagate = (e) => {
    e.stopPropagation();
  };
  return (
    <article className="modal">
      <div className="modal__border" onClick={handlePropagate}>
        <div className="modal__container">
          {/*
            <div className="modal__img">
            <img src={`../../public/images/${productoDetalle.imagen}`} alt="1_png" />
          </div>
            */}

          <div className="modal__content">
            <h2 className="modal__title"></h2>
            <p className="modal__description"></p>
            <p className="modal__price"></p>
            <div className="content__talla">
              <label htmlFor="cbotalla">Talla</label>
              <select name="cbotalla" id="">
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
              </select>
            </div>
            <div className="content__button"></div>
          </div>
        </div>
        <button className="cerrar-modal">X</button>
      </div>
    </article>
  );
};

export default ModalSeccion;
