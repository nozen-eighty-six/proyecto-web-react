import React, { useContext } from 'react'
import UsuarioContext from './JWT/UsuarioProvider';
import { Navigate } from 'react-router-dom';

const Authenticate = ({children}) => {
    const usuario = useContext(UsuarioContext);

    return usuario ? children : <Navigate to="/login" />;
}

export default Authenticate