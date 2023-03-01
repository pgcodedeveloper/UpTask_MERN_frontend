import {useEffect} from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormularioColaborador from '../components/FormularioColaborador';
import useProyecto from '../hooks/useProyecto';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

const NuevoColaborador = () => {

    const { obtenerProyecto, proyecto, cargando,cargandoColab, colaborador,agregarColaborador } = useProyecto();
    const params = useParams();
    const { id } = params;
    const navigate = useNavigate();

    useEffect(() =>{
        obtenerProyecto(id);
    },[])

    const { nombre } = proyecto;

    return (
        <>
            {cargando ? <Spinner /> : (
                <>
                    {proyecto?._id && (
                        <>
                            <h1 className='font-black text-4xl'>Añadir Colaborador(a) / {nombre}</h1>
                            <div className='mt-10 flex justify-center'>
                                <FormularioColaborador />
                            </div>


                            {cargandoColab ? <Spinner/> : (
                                colaborador?._id ? (
                                    <div className='flex justify-center mt-10'>
                                        <div className='bg-white py-10 px-5 w-full md:w-8/12 rounded-lg shadow'>
                                            <h2 className='text-center mb-10 text-2xl font-bold'>Resultado: </h2>

                                            <div className='flex justify-between items-center'>
                                                <p className='text-sm text-gray-600'>{colaborador.nombre}</p>
                                                
                                                <button
                                                    type='button'
                                                    className='bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm'
                                                    onClick={() => agregarColaborador({
                                                        email: colaborador?.email
                                                    })}
                                                >
                                                    Agregar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='flex justify-center mt-10'>
                                        <p className='text-center'>No hay resultados</p>
                                    </div>
                                )
                            )}
                        </>
                    )}
                </>
            )}
            <ToastContainer/>
        </>
    )
}

export default NuevoColaborador
