
const Oferts = () => {
    console.log('Oferts')
  return (
    <section className="ofert container">
        <div className="ofert-1">
            <div className="ofert-img">
                <img src="images/1.png" alt=""/>
            </div>
            <div className="ofert-txt">
                <h3>Camisas</h3>
                <a href="product-camisa.html" className="btn-2">Información</a>
            </div>
        </div>

        <div className="ofert-1">
            <div className="ofert-img">
                <img src="images/casaca-demin.png" alt=""/>
            </div>
            <div className="ofert-txt">
                <h3>Casacas</h3>
                <a href="product-casaca.html" className="btn-2">Información</a>
            </div>
        </div>
        <div className="ofert-1">
            <div className="ofert-img">
                <img src="images/gorra-fox2.png" alt=""/>
            </div>
            <div className="ofert-txt">
                <h3>Gorras</h3>
                <a href="product-gorra.html" className="btn-2">Información</a>
            </div>
        </div>
    </section>
  )
}

export default Oferts