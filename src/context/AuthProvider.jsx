import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const navigate = useNavigate();
    const [auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(true);
    
    useEffect(() => {
        const autenticarUsuario = async () => {
            try {
                setCargando(true)
                const token = localStorage.getItem('token')
        
                if (token) {
                    const config = {
                        headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                        }
                    }
        
                    const { data } = await clienteAxios('/usuarios/perfil', config)
                    setAuth(data)
                }
            } catch (error) {
                console.log(error.response)
                setAuth({})
            } finally {
                setCargando(false)
            }
        }
        autenticarUsuario()
      }, [])

    const cerrarSesionAuth = () =>{
        setAuth({});
    }
    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesionAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {AuthProvider}

export default AuthContext;
