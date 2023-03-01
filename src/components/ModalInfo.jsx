import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import useProyecto from '../hooks/useProyecto';
import { Link } from 'react-router-dom';

const ModalInfo = ({modalInfo, setModalInfo}) => {

    return (
        <Transition.Root show={ modalInfo } as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={ () => setModalInfo(false) }>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay 
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
                        />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={ () => setModalInfo(false)  }
                                >
                                <span className="sr-only">Cerrar</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>


                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full text-sky-600 bg-sky-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                                        </svg>
                                    </div>

                                    <Dialog.Title as="h3" className="text-xl leading-6 mt-5 font-bold text-gray-900">
                                        Acerca De
                                    </Dialog.Title>

                                    <div className='mt-2 '>
                                        <p className='text-sm text-gray-500'>
                                            Proyecto realizado por <span className='font-black'>PG .CODE</span>
                                        </p>

                                        <p className='mt-2 text-md text-gray-500'>
                                            El objetivo principal de este sistema es el de facilitar el orden y productividad de los usuarios; para eso le permite a cada usuario administrar sus diferentes proyectos (CRUD completo), administrar sus tareas, e inclusive si es necesario agregar colaboradores para que tambien accedan al proyecto y completen las diferentes tareas
                                        </p>

                                        <p className='mt-2 text-sm text-gray-500'>Las principales tecnologias/iconos/estilos:</p>
                                        <ul className='list-none mt-5 grid grid-cols-2 md:grid-cols-3 gap-3'>
                                            <li className='p-2 bg-sky-600 font-black text-white text-md text-center rounded-2xl'>React JS</li>
                                            <li className='p-2 bg-sky-600 font-black text-white text-md text-center rounded-2xl'>Node JS</li>
                                            <li className='p-2 bg-sky-600 font-black text-white text-md text-center rounded-2xl'>Express JS</li>
                                            <li className='p-2 bg-sky-600 font-black text-white text-md text-center rounded-2xl'>MongoDB</li>
                                            <li className='p-2 bg-sky-600 font-black text-white text-md text-center rounded-2xl'>Tailwindcss</li>
                                            <li className='p-2 bg-sky-600 font-black text-white text-md text-center rounded-2xl'>Heroicons</li>
                                            <li className='p-2 bg-sky-600 font-black text-white text-md text-center rounded-2xl'>Context API</li>
                                        </ul>
                                    </div>
                                </div>
                                
                                
                            </div>

                            <div className='flex justify-between items-center mt-5'>
                                <p className='text-sm text-gray-500'>Visite para más información...</p>

                                <Link
                                    to={'https://pgcodedeveloper.netlify.app/'}
                                    target='_blank'
                                    className='font-black text-md'
                                >PG .CODE</Link>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ModalInfo
