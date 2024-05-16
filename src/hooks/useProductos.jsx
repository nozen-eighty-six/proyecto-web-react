import React from "react";
import helpHttp from "../helpers/helpHttp";

export const useProductos = ({ obj, setObj, elementoseccion, options, token }) => {
  if (options && token) {
    options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
  const getProductoElemento = () => {
    helpHttp()
      .get(`http://localhost:8080/productos/${elementoseccion}`, (options || null))
      .then((res) => {
        if (!res.err) {
          setObj(res);
        } else {
          setObj(null);
        }
      });
  };
  return { getProductoElemento };
};
