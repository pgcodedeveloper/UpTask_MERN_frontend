import { useEffect, useState } from "react";
import { useParams, Link} from 'react-router-dom';
import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/Alerta";

const ConfirmarCuenta = () => {

    const params = useParams();
    const { id } = params;
    const [ alerta, setAlerta ] = useState({});
    const [ cuentaConfirm, setCuentaConfirm ] = useState(false);

    useEffect(() =>{
        const confirmarCuenta = async () =>{
            try {
                const url= `/usuarios/confirmar/${id}`;
                const { data } = await clienteAxios(url);
                setAlerta({
                    msg: data.msg,
                    error: false
                });
                setCuentaConfirm(true);
                
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                });
            }
        }

        return () => {confirmarCuenta()};
    },[]);

    return (
        <>
            <h1 className="text-sky-600 font-black text-5xl capitalize">Confirma tu cuenta y administra tus{' '} <span className="text-slate-700">proyectos</span></h1>

            <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
                {alerta.msg && <Alerta alerta={alerta}/>} 

                {cuentaConfirm && (
                    <Link
                        to={"/"}
                        className="block text-center my-5 text-slate-500 uppercase text-sm font-bold"
                    >Inicia Sesión</Link>
                )}
            </div>
        </>
    )
}

export default ConfirmarCuenta
