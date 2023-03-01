import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

const Registrar = () => {
    const [ nombre, setNombre ] = useState('');
    const [ email, setEmail ] = useState(''); 
    const [ password, setPassword ] = useState(''); 
    const [ password2, setPassword2 ] = useState(''); 
    const [ alerta, setAlerta ] = useState({});

    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        if([nombre,email,password,password2].includes('')){
           setAlerta({
                msg: "Todos los campos son obligatorios",
                error: true
           });
           return;
        }

        if(password !== password2){
            setAlerta({
                msg: "Los Password no son iguales",
                error: true
            });
            return;
        }

        if(password.length < 6){
            setAlerta({
                msg: "Password muy corto, agrega mínimo 6 caracteres",
                error: true
            });
            return;
        }
        setAlerta({});
        //Crear el usuario en la API

        try {
            const { data } = await clienteAxios.post('/usuarios',{
                nombre,
                email,
                password
            });

            setAlerta({
                msg: data.msg,
                error: false
            });

            //Limpiar los campos 
            setNombre('');
            setEmail('');
            setPassword('');
            setPassword2('');

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
        }

        
    }
    return (
        <>
            <h1 className="text-sky-600 font-black text-5xl capitalize">Regístrate y administra tus{' '} <span className="text-slate-700">proyectos</span></h1>

            {alerta.msg && <Alerta  alerta={alerta}/>}

            <form onSubmit={handleSubmit} className="my-10 bg-white shadow rounded-lg p-10">
                <div className="my-5 ">
                    <label htmlFor="nombre" className="uppercase text-gray-600 block text-xl font-bold">Nombre</label>
                    <input 
                        type="text" 
                        placeholder="Nombre de Registro"
                        className="w-full my-3 p-3 border rounded-xl bg-gray-50"
                        name="nombre"
                        id="nombre"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className="my-5 ">
                    <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                    <input 
                        type="email" 
                        placeholder="Email de Registro"
                        className="w-full my-3 p-3 border rounded-xl bg-gray-50"
                        name="email"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="my-5 ">
                    <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Password</label>
                    <input 
                        type="password" 
                        placeholder="Password de Registro"
                        className="w-full my-3 p-3 border rounded-xl bg-gray-50"
                        name="password"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <div className="my-5 ">
                    <label htmlFor="password2" className="uppercase text-gray-600 block text-xl font-bold">Repetir Password</label>
                    <input 
                        type="password" 
                        placeholder="Repetir tu Password"
                        className="w-full my-3 p-3 border rounded-xl bg-gray-50"
                        name="password2"
                        id="password2"
                        value={password2}
                        onChange={e => setPassword2(e.target.value)}
                    />
                </div>

                <input 
                    type="submit" 
                    value="Crear Cuenta"
                    className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-900 transition-colors" 
                />

            </form>

            <nav className="lg:flex lg:justify-between">
                <Link
                    to={"/"}
                    className="block text-center my-5 text-slate-500 uppercase text-sm font-bold"
                >¿Ya tienes una cuenta? Inicia Sesión</Link>
                
                <Link
                    to={"/olvide-password"}
                    className="block text-center my-5 text-slate-500 uppercase text-sm font-bold"
                >Olvide Mi Password</Link>
            </nav>
        </>
    )
}

export default Registrar
