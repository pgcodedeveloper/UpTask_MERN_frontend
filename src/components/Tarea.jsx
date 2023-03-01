import { formaterFecha } from "../helpers/formatearFecha";
import useProyecto from "../hooks/useProyecto";
import useAdmin from "../hooks/useAdmin";

const Tarea = ({tarea}) => {

    const { handleTarea, handleElimTarea,completarTarea } = useProyecto();
    const { nombre, descripcion, prioridad, fechaEntrega,estado, _id } = tarea;
    const admin = useAdmin();

    return (
        <div className="border-b p-5 flex justify-between items-center">
            <div className="flex flex-col items-start">
                <p className="mb-1 text-xl font-bold">{nombre}</p>
                <p className="mb-1 text-sm text-gray-500 uppercase">{descripcion}</p>
                <p className="mb-1 text-sm">{formaterFecha(fechaEntrega)}</p>
                <p className="mb-1 text-gray-600"><span className="font-black">Prioridad:</span> {prioridad}</p>
                {estado && <p className="text-xs bg-green-600 uppercase p-1 rounded-lg text-white">Completada por: {tarea.completado.nombre}</p>}
            </div>

            <div className="flex flex-col lg:flex-row gap-2 items-center ">
                {admin && (
                    <button
                        type="button"
                        className="bg-indigo-600 px-4 py-3 w-full text-white uppercase font-bold text-xs rounded-lg flex items-center justify-center gap-2"
                        onClick={() => handleTarea(tarea)}
                    >
                        Editar
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                        </svg>
                    </button>
                )}

                <button
                    type="button"
                    onClick={() => completarTarea(_id)}
                    className={`${estado ? "bg-sky-600" : "bg-gray-600"} px-4 py-3 w-full text-center text-white uppercase font-bold text-xs rounded-lg`}
                >
                    {estado ? "Completa" : "Incompleta"}
                </button>

                {admin && (
                    <button
                        type="button"
                        className="bg-red-600 px-4 py-3 text-xs w-full text-white uppercase font-bold rounded-lg flex items-center justify-center gap-2"
                        onClick={() => handleElimTarea(tarea)}
                    >
                        Eliminar
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                        </svg>

                    </button>
                )}
            </div>
        </div>
    )
}

export default Tarea
