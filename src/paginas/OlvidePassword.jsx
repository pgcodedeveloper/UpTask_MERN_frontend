import clienteAxios from "../config/clienteAxios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";

const OlvidePassword = () => {

    const [email, setEmail] = useState('');
    const [ alerta, setAlerta] = useState({});

    const handleSubmit = async (e) =>{
        e.preventDefault();

        if(email === "" || email.length < 6 ){
            setAlerta({
                msg: 'El email es obligatorio',
                error: true
            });
        }

        setAlerta({});
        try {
            const url = `/usuarios/olvide-password`;
            const { data } = await clienteAxios.post(url,{email});
            
            setEmail('');
            setAlerta({
                msg: data.msg,
                error: false
            });
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
        }
    } 
    return (
        <>
            <h1 className="text-sky-600 font-black text-5xl capitalize">Recupera tu acceso y administra tus{' '} <span className="text-slate-700">proyectos</span></h1>

            {alerta?.msg && <Alerta alerta={alerta}/>}

            <form onSubmit={handleSubmit} className="my-10 bg-white shadow rounded-lg p-10">
                <div className="my-5 ">
                    <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                    <input 
                        type="email" 
                        placeholder="Tu Email"
                        className="w-full my-3 p-3 border rounded-xl bg-gray-50"                        
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <input 
                    type="submit" 
                    value="Enviar Instrucciones"
                    className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-900 transition-colors" 
                />

            </form>

            <nav className="lg:flex lg:justify-between">
                
                <Link
                    to={"/"}
                    className="block text-center my-5 text-slate-500 uppercase text-sm font-bold"
                >¿Ya tienes una cuenta? Inicia Sesión</Link>
                <Link
                    to={"/registrar"}
                    className="block text-center my-5 text-slate-500 uppercase text-sm font-bold"
                >¿Aún no tienes una cuenta? Obten una</Link>
                
            </nav>
        </>
    )
}

export default OlvidePassword
