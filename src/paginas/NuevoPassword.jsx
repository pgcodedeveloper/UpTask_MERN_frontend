import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/Alerta";


const NuevoPassword = () => {

    const [ password, setPassword] = useState('');
    const [ alerta , setAlerta ] = useState({});
    const [ tokenValido, setTokenValido] = useState(false);
    const [passwordOK, setPasswordOK] = useState(false);
    const params = useParams();
    const { token } = params;

    useEffect(() => {

        const validarToken = async ()=>{
            
            try {
                const url = `/usuarios/olvide-password/${token}`;
                const { data } =  await clienteAxios(url);

                setTokenValido(true);
                setAlerta({
                    msg: data.msg,
                    error: false
                });

            } catch (error) {
                setTokenValido(false);
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                });
            }
        }

        return () => {validarToken()};
    },[]);


    const handleSubmit = async (e) =>{
        e.preventDefault();

        if(password.length < 6){
            setAlerta({
                msg: "El password es muy corto, debe tener al menos 6 caracteres",
                error: true
            });
            return;
        }

        setAlerta({});

        try {
            const url = `/usuarios/olvide-password/${token}`;
            const { data } = await clienteAxios.post(url,{password});
            setPassword('');
            setPasswordOK(true);
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
            <h1 className="text-sky-600 font-black text-5xl capitalize">Crea un Nuevo Password y administra tus{' '} <span className="text-slate-700">proyectos</span></h1>

            {alerta.msg && <Alerta alerta={alerta}/>}

            {tokenValido && (
                <form onSubmit={handleSubmit} className="my-10 bg-white shadow rounded-lg p-10">
                    <div className="my-5 ">
                        <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Nuevo Password</label>
                        <input 
                            type="password" 
                            placeholder="Escribe tu nuevo password"
                            className="w-full my-3 p-3 border rounded-xl bg-gray-50"
                            name="password"
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <input 
                        type="submit" 
                        value="Cambiar Password"
                        className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-900 transition-colors" 
                    />

                </form>
            )}

                {passwordOK && (
                    <Link
                        to={"/"}
                        className="block text-center my-5 text-slate-500 uppercase text-sm font-bold"
                    >Inicia Sesión</Link>
                )}
            
        </>
    )
}

export default NuevoPassword
