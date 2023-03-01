import { useState } from "react";
import { toast } from "react-toastify";
import useProyecto from "../hooks/useProyecto";

const FormularioColaborador = () => {

    const [email, setEmail] = useState('');
    const { submitColaborador } = useProyecto();

    const handleSubmit = async (e) =>{
        e.preventDefault();

        if([email].includes('')){
            toast.error('El Email es obligatorio');
            return;
        }

        await submitColaborador(email);

        setEmail('');
    }
    return (
        <form 
            onSubmit={handleSubmit}
            className='bg-white py-10 px-5 w-full md:w-8/12 rounded-lg shadow'
        >
            <div className="mb-5">
                <label 
                    htmlFor="email"
                    className="text-gray-700 uppercase font-bold text-sm"
                >Email Colaborador</label>

                <input 
                    type="email"
                    id="email"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Email del Colaborador"
                    value={email}
                    onChange={e => setEmail(e.target.value)} 
                />
            </div>

            <input 
                type="submit" 
                value="Buscar Colaborador"
                className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded-lg cursor-pointer hover:bg-sky-800 transition-colors" 
            />
        </form>
    )
}

export default FormularioColaborador
