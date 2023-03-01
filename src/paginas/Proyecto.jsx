import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import useProyecto from "../hooks/useProyecto";
import ModalFormularioTarea from "../components/ModalFormularioTarea";
import ModalElimTarea from "../components/ModalElimTarea";
import ModalElimColaborador from "../components/ModalElimColaborador";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Tarea from "../components/Tarea";
import Colaborador from "../components/Colaborador";
import useAdmin from "../hooks/useAdmin";
import io from "socket.io-client";

let socket;
const Proyecto = () => {
    const params = useParams();
    const { id } = params;
    const { obtenerProyecto, proyecto, cargando,handleModalTarea, submitTareaProyecto,submitElimTareaProy,submitEditTareaProy,submitComTareaProy } = useProyecto();
    const admin = useAdmin();

    useEffect(() => {
        obtenerProyecto(id);
    },[]);

    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL);
        socket.emit('abrir proyecto', params.id);
    },[]);

    useEffect(() =>{
        socket.on('tarea agregada', tareaNueva =>{
            if(tareaNueva.proyecto === proyecto._id){
                submitTareaProyecto(tareaNueva);
            }
            
        });

        socket.on('tarea eliminada', tareaElim => {
            if(tareaElim.proyecto === proyecto._id){
                submitElimTareaProy(tareaElim);
            }
        });

        socket.on('tarea editada', tareaEdit =>{
            if(tareaEdit.proyecto._id === proyecto._id){
                submitEditTareaProy(tareaEdit);
            }
        });
        
        socket.on('tarea completa', tareaCom =>{
            if(tareaCom.proyecto._id === proyecto._id){
                submitComTareaProy(tareaCom);
            } 
        });
    });

    const { nombre } = proyecto;

    return (
        <>
            {cargando ? (
                <Spinner/>
            ) : (
                <>
                    <div className="flex justify-between items-center">
                        <h1 className="font-black text-4xl">{nombre}</h1>
                        
                        {admin && (
                            <div className="flex items-center gap-2 text-gray-400 hover:text-black">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>

                                <Link
                                    to={`/proyectos/editar/${id}`}
                                    className='uppercase font-bold'
                                >Editar</Link>
                            </div>   
                        )}
                    </div>

                    {admin && (
                        <button 
                            onClick={handleModalTarea}
                            type="button"
                            className="mt-5 text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-500 text-white text-center flex items-center gap-2 justify-center hover:cursor-pointer hover:bg-sky-600 transition-colors"
                        >
                            Nueva Tarea 
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                            </svg>

                        </button>
                    )}

                    
                    <p className="font-bold text-xl mt-10">Tareas del Proyecto</p>

                    <div className="bg-white shadow mt-10 rounded-lg">
                        {proyecto?.tareas?.length ? 
                            proyecto.tareas?.map(tarea => (
                                <Tarea 
                                    key={tarea._id}
                                    tarea={tarea}
                                />
                            )) :
                            <p className="text-center my-5 p-10">No hay tareas en este proyecto</p>
                        }
                    </div>
                    
                    {admin && (
                        <>
                            <div className="mt-10 flex items-center justify-between">
                                <p className="font-bold text-xl">Colaboradores del Proyecto</p>
                                
                                <div className="flex items-center gap-2 text-gray-400 hover:text-black">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
                                    </svg>

                                    <Link
                                        to={`/proyectos/nuevo-colaborador/${id}`}
                                        className='uppercase font-bold'
                                    >Añadir</Link>
                                </div>
                            </div>

                            <div className="bg-white shadow mt-10 rounded-lg">
                                {proyecto?.colaboradores?.length ? 
                                    proyecto.colaboradores?.map(colaborador => (
                                        <Colaborador 
                                            key={colaborador._id}
                                            colaborador={colaborador}
                                        />
                                    )) :
                                    <p className="text-center my-5 p-10">No hay colaboradores en este proyecto</p>
                                }
                            </div>
                        </>
                    )}

                    <ModalFormularioTarea />
                    <ModalElimTarea />
                    <ModalElimColaborador/>

                    <ToastContainer/>
                </>
            )}
        </>
        
    )
}

export default Proyecto
