import "../../public/css/login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from '../../src/consts/server';

import helpHttp from "../helpers/helpHttp";
const Login = () => {
  console.log(SERVER_URL);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState(null);
  //const {setToken} = useContext(TokenContext);
  //const {setUsuario} = useContext(UsuarioContext);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  function back() {
    navigate(-1);
  }
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    helpHttp()
      .get("http://localhost:8080/usuario/verificar-usario/" + form.username)
      .then((res) => {
        //  setUsuario(res);
        //console.log(res);
        generarToken().then((token) => {
          console.log(token);
          guardarTokenLocalStorage(token);
          // setToken(token);
          // const usuarioObt = obtenerUsuario(inputUsername);
          //console.log(usuarioObt);
          guardarUsuarioLocalStorageRedirigir(res);
        });

        //Guardar datos del user en el localstorage
      })
      .catch((err) => {
        console.log(err);

        alert("Usuario o contraseña incorrectos");
      });
  };

  function generarToken() {
    const url = `${SERVER_URL}/login`;

    const data = {
      mail: form.username,
      password: form.password,
    };

    return fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Usuario o contraseña incorrectos");
        }
        return response.json();
      })
      .then((data) => {
        // handle data
        return data.token;
      })
      .catch((err) => {
        setError(err.message);
      });
  }

  const guardarTokenLocalStorage = (token) => {
    localStorage.setItem("token", token);
  };

  const guardarUsuarioLocalStorageRedirigir = (usuario) => {
    localStorage.setItem("usuario", JSON.stringify(usuario));
    setLoader(true);

    if (usuario.tipo == "USER") {
      setTimeout(() => {
        //Redirigir a la página de inicio
        //window.location.href = "/";
        console.log("Redirigiendo a la página de inicio");
        back();
      }, 2500);
    } else {
      setTimeout(() => {
        //Redirigir a la página de inicio
        //window.location.href = "/admin";
        console.log("Redirigiendo a la página de admin");
        navigate("/admin/usuarios");
      }, 2500);
    }
  };

  return (
    <div className="login-container" id="container">
      <input type="checkbox" id="chk" aria-hidden="true" />

      <div className="signup">
        <form className="login" onSubmit={handleSubmit}>
          <label htmlFor="chk" aria-hidden="true">
            Iniciar Sesion
          </label>
          <p>Utiliza tu correo electronico y contraseña para iniciar sesión</p>
          <input
            type="email"
            name="username"
            placeholder="Email"
            required=""
            pattern="^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$"
            title="El email debe ser correcto"
            onChange={handleChange}
            autoComplete="off"
          />
          <input
            type="password"
            placeholder="Contraseña"
            id="password"
            name="password"
            required=""
            onChange={handleChange}
          />
          {loader == false && (
            <button type="submit" id="iniciarSesion">
              Iniciar Sesión
            </button>
          )}

          {loader && (
            <button type="submit" id="iniciarSesion">
              <svg
                width="38"
                height="38"
                viewBox="0 0 38 38"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#fff"
              >
                <g fill="none" fillRule="evenodd">
                  <g transform="translate(1 1)" strokeWidth="2">
                    <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
                    <path d="M36 18c0-9.94-8.06-18-18-18">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 18 18"
                        to="360 18 18"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </path>
                  </g>
                </g>
              </svg>
            </button>
          )}
          <br />
          <p id="log">
            Si aún no tiene cuenta,{" "}
            <a href="/registro" style={{"color":"blue{"}}>aquí puede registrarse</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
