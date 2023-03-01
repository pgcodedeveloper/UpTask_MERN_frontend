import { useEffect } from "react";
import PreviewProyecto from "../components/PreviewProyecto";
import Spinner from "../components/Spinner";
import useProyecto from "../hooks/useProyecto";
import { ToastContainer } from "react-toastify";
import io from 'socket.io-client';
import 'react-toastify/dist/ReactToastify.css';

let socket;
const Proyectos = () => {

    const { proyectos, cargando } = useProyecto();

    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL, {
            reconnectionDelay: 1000,
            reconnection: true,
            reconnectionAttemps: 10,
            transports: ['websocket'],
            agent: false,
            upgrade: false,
            rejectUnauthorized: false
        });
    });
    return (
        <>
            <h1 className="text-4xl font-black">Proyectos</h1>
            {cargando ? <Spinner /> : (
                <div className="bg-white shadow mt-10 rounded-lg">
                    {proyectos?.length ? 
                        proyectos.map(proyecto => (
                            <PreviewProyecto 
                                key={proyecto._id}
                                proyecto={proyecto}
                            />
                        ))
                    :<p className="text-center text-gray-600 uppercase p-5">Aún no hay proyectos</p>}
                </div>
            )}

            <ToastContainer />
        </>
    )
}

export default Proyectos
