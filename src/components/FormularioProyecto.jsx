import { useState, useEffect } from "react"
import useProyecto from "../hooks/useProyecto";
import { useParams } from "react-router-dom";

const FormularioProyecto = () => {

    const { handleAlerta, submitProyecto, proyecto } = useProyecto();
    const [id, setId] = useState(null);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaEntrega, setFechaEntrega] = useState('');
    const [cliente, setCliente] = useState('');
    const params = useParams();

    useEffect(() => {
        if(params.id && proyecto.nombre){
            setId(proyecto._id);
            setNombre(proyecto.nombre);
            setDescripcion(proyecto.descripcion);
            setFechaEntrega(proyecto.fechaEntrega?.split('T')[0]);
            setCliente(proyecto.cliente);
        }
    },[params,proyecto]);

    const handleSubmit = async (e) =>{
        e.preventDefault();

        if([nombre,descripcion,fechaEntrega,cliente].includes('')){
            handleAlerta({msg: 'Todos los campos son obligatorios', error: true});
            return;
        }   

        //Pasar los datos al provider y almacenar el proyecto
        await submitProyecto({id,nombre,descripcion,fechaEntrega,cliente});

        setId(null);
        setNombre('');
        setCliente('');
        setDescripcion('');
        setFechaEntrega('');
    }
    return (
        <form onSubmit={handleSubmit} className="bg-white py-10 px-5 md:w-8/12 rounded-lg shadow">
            <div className="mb-5">
                <label 
                    htmlFor="nombre"
                    className="text-gray-700 uppercase font-bold text-sm"
                >Nombre Proyecto</label>

                <input 
                    type="text"
                    id="nombre"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Nombre del Proyecto"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)} 
                />
            </div>

            <div className="mb-5">
                <label 
                    htmlFor="descripcion"
                    className="text-gray-700 uppercase font-bold text-sm"
                >Descripción Proyecto</label>

                <textarea 
                    id="descripcion" 
                    cols="30" 
                    rows="10"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Descripción del Proyecto"
                    value={descripcion}
                    onChange={e => setDescripcion(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label 
                    htmlFor="fecha"
                    className="text-gray-700 uppercase font-bold text-sm"
                >Fecha de Entrega</label>

                <input 
                    type="date"
                    id="fecha"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={fechaEntrega}
                    onChange={e => setFechaEntrega(e.target.value)} 
                />
            </div>

            <div className="mb-5">
                <label 
                    htmlFor="cliente"
                    className="text-gray-700 uppercase font-bold text-sm"
                >Cliente del Proyecto</label>

                <input 
                    type="text"
                    id="cliente"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Nombre del Cliente"
                    value={cliente}
                    onChange={e => setCliente(e.target.value)} 
                />
            </div>

            <input 
                type="submit" 
                value={params.id ? "Actualizar Proyecto" : "Crear Proyecto"}
                className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded-lg cursor-pointer hover:bg-sky-800 transition-colors" 
            />
        </form>
    )
}

export default FormularioProyecto
