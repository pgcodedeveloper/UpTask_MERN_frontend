import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import Alerta from '../components/Alerta';
import useAuth from "../hooks/useAuth";

const Login = () => {

    const { setAuth } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alerta,setAlerta] = useState({});
    const navigate = useNavigate();
    
    const handleSubmit = async (e) =>{
        e.preventDefault();

        if([email,password].includes('')){
            setAlerta({
                msg: "Todos los campos son obligatorios",
                error: true
            });
            return;
        }

        setAlerta({});

        try {
            const url = '/usuarios/login';
            const { data } = await clienteAxios.post(url,{email,password});

            setAlerta({});
            localStorage.setItem('token', data.token);
            setAuth(data);
            navigate('/proyectos');
        } catch (error) {
            console.log(error);
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
        }
    }
    return (
        <>
            <h1 className="text-sky-600 font-black text-5xl capitalize">Inicia sesión y administra tus{' '} <span className="text-slate-700">proyectos</span></h1>

            {alerta?.msg && <Alerta alerta={alerta}/>}

            <form onSubmit={handleSubmit} className="my-10 bg-white shadow rounded-lg p-10">
                <div className="my-5 ">
                    <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                    <input 
                        type="email" 
                        placeholder="Email de Registro"
                        className="w-full my-3 p-3 border rounded-xl bg-gray-50"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        id="email"
                    />
                </div>

                <div className="my-5 ">
                    <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Password</label>
                    <input 
                        type="password" 
                        placeholder="Password de Registro"
                        className="w-full my-3 p-3 border rounded-xl bg-gray-50"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        id="password"
                    />
                </div>

                <input 
                    type="submit" 
                    value="Iniciar Sesión"
                    className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-900 transition-colors" 
                />

            </form>

            <nav className="lg:flex lg:justify-between">
                <Link
                    to={"/registrar"}
                    className="block text-center my-5 text-slate-500 uppercase text-sm font-bold"
                >¿Aún no tienes una cuenta? Obten una</Link>
                
                <Link
                    to={"/olvide-password"}
                    className="block text-center my-5 text-slate-500 uppercase text-sm font-bold"
                >Olvide Mi Password</Link>
            </nav>
        </>

    )
}

export default Login
