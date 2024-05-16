import React from "react";

const helpHttp = () => {
  const customFetch = (endpoint, options, ismultipart) => {
    //No voy a indicar que tipo de dato espera

    const defaultHeader = {
      accept: "application/json",
    };

    const controller = new AbortController();
    options.signal = controller.signal;

    //Definir el método
    options.method = options.method || "GET";
    options.headers = options.headers
      ? { ...defaultHeader, ...options.headers }
      : defaultHeader;
    options.body = JSON.stringify(options.body) || false;

    if (!options.body) delete options.body;
    if (ismultipart == true){
      //delete options.headers;
      options.headers ={
        "Content-Type": "multipart/form-data",
      }
    } 

    //Cancelar la petición

    setTimeout(() => controller.abort(), 10000);

    return fetch(endpoint, options)
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject({
              err: true,
              status: res.status || "00",
              statusText: res.statusText || "Ocurrió un error",
            })
      )
      .catch((err) => err);
  };

  const get = (url, options = {}) => customFetch(url, options);

  const post = (url, options = {}) => {
    options.method = "POST";
    return customFetch(url, options);
  };
  const put = (url, options = {}) => {
    options.method = "PUT";
    return customFetch(url, options);
  };
  const del = (url, options = {}) => {
    options.method = "DELETE";
    return customFetch(url, options);
  };

  return {
    get,
    post,
    put,
    del,
  };
};

export default helpHttp;
