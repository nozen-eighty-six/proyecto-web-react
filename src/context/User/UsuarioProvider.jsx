import  { createContext, useState } from 'react'

const UsuarioContext = createContext();

export const UsuarioProvider = ({children}) => {
    const [usuario, setUsuario] = useState(false);
  return (
    <UsuarioContext.Provider value={{usuario, setUsuario}}>
        {children}
    </UsuarioContext.Provider>
  )
}

export default UsuarioContext
