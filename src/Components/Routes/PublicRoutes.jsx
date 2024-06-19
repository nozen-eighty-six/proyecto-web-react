import React, { Suspense, lazy, useState } from "react";
import Cabecera from "../Tienda/Home/Cabecera";
import { Route, Routes } from "react-router-dom";
/*
import Home from "../../Pages/Tienda/Home";
import Contact from "../../Pages/Tienda/Contact";
import Productos from "../../Pages/Tienda/Productos";
import Cart from "../../Pages/Tienda/Cart";
import Error404 from "../../Pages/Error404";
*/
const Home = lazy(() => import("../../Pages/Tienda/Home"));
const Contact = lazy(() => import("../../Pages/Tienda/Contact"));
const Productos = lazy(() => import("../../Pages/Tienda/Productos"));
const Cart = lazy(() => import("../../Pages/Tienda/Cart"));
const Error404 = lazy(() => import("../../Pages/Error404"));

const PublicRoutes = () => {
  return (
    <>
      <Cabecera /> {/* Renderizamos Cabecera fuera de Routes */}
      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Productos />} />
          <Route path="/products/:category" element={<Productos />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="*" element={<Error404 />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default PublicRoutes;
