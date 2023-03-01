import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const navigate = useNavigate();
    const [auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(false);
    
    useEffect(() => {
        const authUsuario = async () =>{
            setCargando(true);
            const token = localStorage.getItem('token');

            if(!token){
                setCargando(false);
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            try {
                const { data } = await clienteAxios('/usuarios/perfil', config);
                setAuth(data);
                
            } catch (error) {
                setAuth({});
                console.log(error);
            }
            finally{
                setCargando(false);
            }
        }

        return () =>{authUsuario()};
    },[]);

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
