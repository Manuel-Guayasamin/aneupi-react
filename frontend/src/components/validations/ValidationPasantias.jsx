import React from 'react'
import { useSelector } from 'react-redux';

const ValidationPasantias = () => {
    const active = useSelector((state) => state.authentication.active);

  return (
    !active && (
        <section className='p-4'>
            <article className='max-w-screen-xl py-12 mx-auto'>
                <header className='py-10 space-y-2 text-center bg-indigo-100 rounded-xl '>
                    <h2 className='text-2xl font-bold text-indigo-900 md:text-4xl'>¡Para postular a las Practicas (Inicie Sesión)!</h2>
                    <p className='max-w-md mx-auto text-sm text-gray-800 md:text-base'>
                        Usted debe tener una cuenta para poder participar.
                    </p>
                    <a
                        href='/iniciar-sesion'
                        className='text-white btn btn-primary'
                    >
                        Iniciar Sesión
                    </a>
                </header>
            </article>
        </section>
    )
  );
};

export default ValidationPasantias