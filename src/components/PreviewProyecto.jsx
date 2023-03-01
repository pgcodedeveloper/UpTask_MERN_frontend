import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PreviewProyecto = ({proyecto}) => {
    const { auth } = useAuth();
    const { _id, nombre, cliente, creador } = proyecto;
    
    return (
        <div className="border-b p-5 flex flex-col md:flex-row justify-between">
            
            <div className="flex items-center gap-2">
                <p className="flex-1 text-gray-800 font-black">{nombre}: <span className="text-sm text-gray-500 uppercase font-bold">{cliente}</span></p>

                {auth?._id !== creador ? (
                    <p className="p-1 text-xs rounded-lg text-white bg-green-500 font-bold uppercase">Colaborador</p>
                ) : (
                    <p className="p-1 text-xs rounded-lg text-white bg-sky-500 font-bold uppercase">Administrador</p>
                )}
            </div>
            
            <Link
                to={`${_id}`}
                className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold"
            >
                Ver Proyecto
            </Link>
        </div>
    )
}

export default PreviewProyecto

