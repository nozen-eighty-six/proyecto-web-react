import React from 'react'
import Cabecera from '../Tienda/Home/Cabecera';
import { Route, Routes } from 'react-router-dom';
import Home from '../../Pages/Tienda/Home';
import Contact from '../../Pages/Tienda/Contact';
import Productos from '../../Pages/Tienda/Productos';
import Cart from '../../Pages/Tienda/Cart';
import Error404 from '../../Pages/Error404';

const PublicRoutes = () => {
    return (
        <>
            <Cabecera /> {/* Renderizamos Cabecera fuera de Routes */}
    
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Productos />} />
          <Route path="/products/:category" element={<Productos />} />
          <Route path="/cart" element={<Cart />} />
          
          <Route path="*" element={<Error404 />} />
        </Routes>
        </>
      );
}

export default PublicRoutes