import { useState } from "react";
import { Link } from "react-router-dom";
import useProyecto from "../hooks/useProyecto";
import useAuth from "../hooks/useAuth";
import Busqueda from "./Busqueda";
import Swal from 'sweetalert2';
import ModalInfo from "./ModalInfo";

const Header = () => {
    const { handleBuscador, cerrarSesionProyecto } = useProyecto();
    const { cerrarSesionAuth } = useAuth();

    const [modalInfo, setModalInfo] = useState(false);

    const handleCerrarSesion = () =>{
        Swal.fire({
            title: 'Atención',
            text: '¿Desea Cerrar la Sesión?',
            confirmButtonText: 'Si, cerrar',
            icon: 'question',
            cancelButtonText: 'No',
            showCancelButton: true,
            showConfirmButton: true
        }).then((response) =>{
            if(response.isConfirmed){
                cerrarSesionProyecto();
                cerrarSesionAuth();
                localStorage.removeItem('token');
            }
        });
    }
    return (
        <header className="px-4 py-5 bg-white border-b">
            <div className="md:flex md:justify-between md:items-center">
                <div className="flex gap-5 items-center justify-between">
                    <h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">UpTask</h2>
                    <button
                        type="button"
                        className="text-sky-600"
                        onClick={() => setModalInfo(!modalInfo)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                        </svg>
                    </button>
                </div>
                

                <div className="flex flex-col md:flex-row items-center gap-4">

                    <button
                        type="button"
                        className="font-bold uppercase"
                        onClick={handleBuscador}
                    >
                        Buscar Proyecto
                    </button>
                    <Link to={'/proyectos'} className="font-bold uppercase">Proyectos</Link>

                    <button 
                        type="button" 
                        className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold"
                        onClick={handleCerrarSesion}
                    >Cerrar Sesión</button>
                    <Busqueda />
                </div>
            </div>

            <ModalInfo 
                modalInfo={modalInfo}
                setModalInfo={setModalInfo}
            />
        </header>
    )
}

export default Header
