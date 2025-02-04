import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import BreadCrumb from '../../components/navigation/BreadCrumb';
import Loading from '../../components/ui/Loading';
import Subtitle from '../../components/ui/Subtitle';
import { fetchBibliotecas } from '../../redux/slices/bibliotecaSlice';
import Layout from '../layout';
import { IoIosArrowBack } from "react-icons/io";

const serverURL = import.meta.env.VITE_API_URL;

const RevistaDetallePage = () => {
    const dispatch = useDispatch();
    const bibliotecas = useSelector((state) => state.bibliotecas.bibliotecas);
    const { id } = useParams(); // Obtener el ID de la biblioteca desde la URL
    const bibliotecaId = parseInt(id, 10);

    useEffect(() => {
        dispatch(fetchBibliotecas());
    }, [dispatch]);

    const bibliotecaEspecifica = bibliotecas.find((biblioteca) => biblioteca.id === bibliotecaId);

    if (!bibliotecaEspecifica) {
        return <Loading />;
    }
    console.log(bibliotecaEspecifica)
    return (
        <Layout>
            <section className='p-4'>
                <article className='max-w-screen-xl py-12 mx-auto md:py-24'>
                    <Subtitle title='Información de la revista' />
                    <main className='grid items-center gap-10 mt-10 md:grid-cols-2 md:gap-20'>
                        <picture className='min-h-[30] max-h-[40] grid place-items-center'>
                            <img
                                src={`${serverURL}/${bibliotecaEspecifica.imagen}`}
                                alt={bibliotecaEspecifica.titulo}
                                className='block object-cover w-full h-full shadow-xl rounded-xl shadow-indigo-800/20'
                            />
                        </picture>
                        <a class="block max-w-sm sm:max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            <a href="/revistas" class="bg-colorcito text-white font-bold py-2 px-4 rounded 
                            inline-flex items-center text-sm transition duration-300 ease-in-out transform 
                            hover:bg-white hover:text-colorcito border-2 hover:border-colorcito hover:scale-105">
                                <IoIosArrowBack />
                                Regresar
                            </a>
                            <br></br>
                            <br></br>
                            <span className='mr-2 font-bold text-lg'>Editorial:</span>
                            <span className='mb-0 text-lg text-white uppercase badge badge-info badge-sm'>
                                {bibliotecaEspecifica.editorial}
                            </span>
                            <h2 className='!mt-6 truncate text-lg'>{bibliotecaEspecifica.titulo}</h2>
                            <span className='mr-2 font-bold text-lg'>Autor:</span>
                            <a className='text-lg'>{bibliotecaEspecifica.nombre_autor}</a>
                            <p className="text-base text-gray-700 mb-2 break-words whitespace-normal text-justify">
                                <strong className='text-lg'>Descripción:</strong> {bibliotecaEspecifica.descripcion}
                            </p>
                            <br></br>
                            <span className='mr-2 font-bold text-lg'>Fecha de publicación:</span>
                            <a className='text-lg'>{new Date(bibliotecaEspecifica.fecha_publicacion).toLocaleDateString({ day: '2-digit', month: '2-digit', year: 'numeric' })}</a>
                            <br></br>
                            <br></br>
                            <a href={`${serverURL}/${bibliotecaEspecifica.archivo}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-colorcito hover:bg-white hover:text-colorcito 
                            hover:border-colorcito border-2 border-transparent text-white 
                            py-2 px-4 rounded cursor-pointer transition-all duration-300 font-bold"
                            >Leer en línea</a>
                        </a>
                    </main>
                </article>
            </section>
        </Layout>
    );
};

export default RevistaDetallePage;