import { NavLink } from "react-router-dom"

const CategoriaSection = () => {
    console.log("CategoriaSection");
  return (
    <section className="icons container">
    <NavLink to={"/products/hombre"} className="icon-1">
        <div className="icon-img">
            <img src="images/i1.svg" alt="" id="_1"/>
        </div>
        <div className="icon-txt">
            Hombre
        </div>
    </NavLink>

    <NavLink to={"/products/mujer"} className="icon-1">
        <div className="icon-img">
            <img src="images/i2.svg" alt="" id="_2"/>
        </div>
        <div className="icon-txt">
            Mujer
        </div>
    </NavLink>

    <NavLink to={"/products/bebe"} className="icon-1">
        <div className="icon-img">
            <img src="images/stroller.png" alt="" id="_3"/>
        </div>
        <div className="icon-txt">
            Bebes
        </div>
    </NavLink>
    
    <NavLink to={"/products/ninio"} className="icon-1">
        <div className="icon-img">
            <img src="images/i3.svg" alt="" id="_4"/>
        </div>
        <div className="icon-txt">
            Niños
        </div>
    </NavLink>

    <NavLink to={"/products/sport"} className="icon-1">
        <div className="icon-img">
            <img src="images/shoe.png" alt="" id="_5"/>
        </div>
        <div className="icon-txt">
            Sport
        </div>
    </NavLink>

    <NavLink to={"/products/accesorios"} className="icon-1">
        <div className="icon-img">
            <img src="images/bracelet.png" alt="" id="_6"/>
        </div>
        <div className="icon-txt">
            Accesorios
        </div>
    </NavLink>
</section>
  )
}

export default CategoriaSection