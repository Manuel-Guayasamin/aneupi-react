import React from 'react'
import { useSelector } from 'react-redux';

const ValidationPractica = () => {
    const servicios = useSelector((state) => state.servicios.servicios);
  return (
    servicios.length === 0 && (
        <section className='p-4'>
            <article className='max-w-screen-xl py-12 mx-auto'>
                <header className='py-10 space-y-2 text-center bg-yellow-100 rounded-xl '>
                    <h2 className='text-2xl font-bold text-indigo-900 md:text-4xl'>¡Atencion en línea no Disponible!</h2>
                    <p className='max-w-md mx-auto text-sm text-gray-800 md:text-base'>
                        Servicio esta temporalmente deshabilitado.
                    </p>
                    
                </header>
            </article>
        </section>
    )
  )
}

export default ValidationPractica