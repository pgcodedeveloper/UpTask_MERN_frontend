import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import  io from "socket.io-client";

let socket;

const ProyectoContext = createContext();

const ProyectoProvider = ({children}) => {

    const [proyectos, setProyectos] = useState([]);
    const [alerta, setAlerta] = useState({});
    const [proyecto, setProyecto] = useState({});
    const [cargando, setCargando] = useState(false);
    const [cargandoColab, setCargandoColab] = useState(false);
    const [modalFormTarea, setModalFormTarea] = useState(false);
    const [tarea, setTarea] = useState({});
    const [modalElimTarea, setModalElimTarea] = useState(false);
    const [colaborador, setColaborador] = useState({});
    const [modalElimColaborador, setModalElimColaborador] = useState(false);
    const [buscador, setBuscador] = useState(false);

    const navigate = useNavigate();
    const { auth } = useAuth();

    //Obtener Proyectos
    useEffect(() => {
        const obtenerProyectos = async () =>{
            setCargando(true);
            try {
                const token = localStorage.getItem('token');

                if(!token) return;
            
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                };

                const { data } = await clienteAxios('/proyectos',config);

                setProyectos(data);
            } catch (error) {
                console.log(error);
            }
            finally{
                setCargando(false);
            }
        }
        return () => {obtenerProyectos()};
    },[auth]);

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
    },[]);

    const handleAlerta = (alert) =>{
        setAlerta(alert);
        if(alerta.error){
            toast.error(alerta.msg);
        }
        else{
            toast.success(alerta.msg);
        }
    }

    const submitProyecto = async proyecto =>{

        if(proyecto.id){
            await editarProyecto(proyecto);
        }
        else{
            await nuevoProyecto(proyecto);
        }
    }

    const editarProyecto = async proyecto =>{
        try {
            const token = localStorage.getItem('token');

            if(!token) return;
           
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            const { data } = await clienteAxios.put(`/proyectos/${proyecto.id}`,proyecto, config);
            
            const proyectoAct = proyectos.map(proy => proy._id === data._id ? data : proy);
            setProyectos(proyectoAct);
            toast.success('Proyecto Actualizado Correctamente');

            setTimeout(() => {
                setAlerta({});
                navigate('/proyectos');
            }, 2500);
        } catch (error) {
            console.log(error);
        }
    }

    const nuevoProyecto = async proyecto =>{
        try {
            const token = localStorage.getItem('token');

            if(!token) return;
           
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            const { data } = await clienteAxios.post('/proyectos',proyecto, config);
            
            setProyectos([...proyectos, data]);
            toast.success('Proyecto Creado Correctamente');

            setTimeout(() => {
                setAlerta({});
                navigate('/proyectos');
            }, 2500);
        } catch (error) {
            console.log(error);
        }
    }

    const eliminarProyecto = async id =>{
        try {
            const token = localStorage.getItem('token');

            if(!token) return;
           
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            const { data } = await clienteAxios.delete(`/proyectos/${id}`, config);
            const proyectoAct = proyectos.filter(proy => proy._id !== id);
            setProyectos(proyectoAct);
            toast.success(data.msg);

            setTimeout(() => {
                setAlerta({});
                navigate('/proyectos');
            }, 2500);
        } catch (error) {
            console.log(error);
        }
    }

    const obtenerProyecto = async id =>{
        setCargando(true);
        try {
            const token = localStorage.getItem('token');

            if(!token) return;
           
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            const { data } = await clienteAxios(`/proyectos/${id}`,config);
            setProyecto(data);
        } catch (error) {
            navigate('/proyectos');
            toast.error(error.response.data.msg);
        }
        finally{
            setCargando(false);
        }
    }

    const handleModalTarea = () =>{
        setModalFormTarea(!modalFormTarea);
        setTarea({});
    }

    const submitTarea = async tarea =>{
        if(tarea?.id){
            await editarTarea(tarea);
        }
        else {
            await nuevaTarea(tarea);
        }
    }

    const nuevaTarea = async tarea =>{
        try {
            const token = localStorage.getItem('token');

            if(!token) return;
           
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            const { data } = await clienteAxios.post('/tareas',tarea,config);
            
            setModalFormTarea(false);

            socket.emit('nueva tarea', data);
        } catch (error) {
            console.log(error);
        }
    }

    const editarTarea = async tarea=>{
        try {
            const token = localStorage.getItem('token');

            if(!token) return;
           
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            const { data } = await clienteAxios.put(`/tareas/${tarea.id}`,tarea,config);
            
            setModalFormTarea(false);

            socket.emit('editar tarea', data);
        } catch (error) {
            console.log(error);
        }
    }

    const eliminarTarea = async () =>{
        try {
            const token = localStorage.getItem('token');

            if(!token) return;
           
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            const { data } = await clienteAxios.delete(`/tareas/${tarea._id}`,config);
            
            toast.success(data.msg);
            setModalElimTarea(false);
            
            socket.emit('eliminar tarea', tarea);
            setTarea({});
        } catch (error) {
            console.log(error);
        }
    }

    const handleTarea = tarea =>{
        setTarea(tarea);
        setModalFormTarea(true);
    }

    const handleElimTarea = (tar) =>{
        setTarea(tar);
        setModalElimTarea(!modalElimTarea);
    }

    const handleElimColaborador = colab =>{
        setColaborador(colab);
        setModalElimColaborador(!modalElimColaborador);
    }

    const submitColaborador = async email =>{
        setColaborador({});
        setCargandoColab(true);
        try {
            const token = localStorage.getItem('token');

            if(!token) return;
           
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            const { data } = await clienteAxios.post('/proyectos/colaboradores',{email},config);
            setColaborador(data);

        } catch (error) {
            toast.error(error.response.data.msg);
        } finally{
            setCargandoColab(false);
        }
    }

    const agregarColaborador = async email =>{
        try {
            const token = localStorage.getItem('token');

            if(!token) return;
           
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            const { data } = await clienteAxios.post(`/proyectos/colaboradores/${proyecto._id}`,email,config);

            toast.success(data.msg);
            setColaborador({});
            
        } catch (error) {
            toast.error(error.response.data.msg);
        }
    }

    const eliminarColaborador = async () =>{
        try {
            const token = localStorage.getItem('token');

            if(!token) return;
           
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            const { data } = await clienteAxios.post(`/proyectos/eliminar-colaborador/${proyecto._id}`,{id: colaborador._id},config);

            const proyectoAct = {...proyecto};
            proyectoAct.colaboradores = proyectoAct.colaboradores.filter(colab => colab._id !== colaborador._id);
            setProyecto(proyectoAct);
            
            toast.success(data.msg);
            setColaborador({});

            setModalElimColaborador(false);
        } catch (error) {
            toast.error(error.response.data.msg);
        }
    }

    const completarTarea = async id =>{
        try {
            const token = localStorage.getItem('token');

            if(!token) return;
           
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            const { data } = await clienteAxios.post(`/tareas/estado/${id}`,{},config);
            
            toast.success("Estado Actualizado Correctamente");
            socket.emit('completar tarea', data);
            setTarea({});
            

        } catch (error) {
            console.log(error.response);
        }
    }

    const handleBuscador = () =>{
        setBuscador(!buscador);
    }


    // Socket IO

    const submitTareaProyecto = tareaNueva =>{
        const proyectoAct = { ...proyecto};
        proyectoAct.tareas = [...proyectoAct.tareas, tareaNueva];
        setProyecto(proyectoAct);
    }

    const submitElimTareaProy = tareaElim =>{
        const proyectoAct = {...proyecto};
        proyectoAct.tareas = proyectoAct.tareas.filter(task => task._id !== tareaElim._id);
        setProyecto(proyectoAct);
    }

    const submitEditTareaProy = tareaEdit =>{
        const proyectoAct = {...proyecto};
        proyectoAct.tareas = proyectoAct.tareas.map(task => task._id === tareaEdit._id ? tareaEdit : task);
        setProyecto(proyectoAct);
    }

    const submitComTareaProy = tareaCom =>{
        const proyectoAct = {...proyecto};
        proyectoAct.tareas = proyectoAct.tareas.map(tareaState => tareaState._id === tareaCom._id ? tareaCom : tareaState);
        setProyecto(proyectoAct);
    }


    const cerrarSesionProyecto = () =>{
        setProyectos([]);
        setProyecto({});
        setColaborador({});
    }
    return (
        <ProyectoContext.Provider
            value={{
                proyectos,
                handleAlerta,
                submitProyecto,
                obtenerProyecto,
                proyecto,
                cargando,
                eliminarProyecto,
                modalFormTarea,
                handleModalTarea,
                submitTarea,
                handleTarea,
                tarea,
                modalElimTarea,
                handleElimTarea,
                eliminarTarea,
                submitColaborador,
                colaborador,
                cargandoColab,
                agregarColaborador,
                modalElimColaborador,
                handleElimColaborador,
                eliminarColaborador,
                completarTarea,
                buscador,
                handleBuscador,
                submitTareaProyecto,
                submitElimTareaProy,
                submitEditTareaProy,
                submitComTareaProy,
                cerrarSesionProyecto
            }}
        >
            {children}
        </ProyectoContext.Provider>
    )
}

export {
    ProyectoProvider
};
export default ProyectoContext;
