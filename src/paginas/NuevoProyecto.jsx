import React from 'react';
import useProyecto from '../hooks/useProyecto';
import FormularioProyecto from '../components/FormularioProyecto';
import { ToastContainer } from 'react-toastify';

const NuevoProyecto = () => {
    return (
        <>
            <h1 className="text-4xl font-black"> Crear Nuevo Proyecto</h1>

            <div className='mt-10 flex justify-center'>
                <FormularioProyecto />
            </div>

            <ToastContainer />
        </>
    )
}

export default NuevoProyecto
