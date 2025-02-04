import React from 'react';
import { useSelector } from 'react-redux';
import { FaCheck } from "react-icons/fa";

const ValidationConvenio = () => {
	const active = useSelector((state) => state.authentication.active);

	return (
		!active && (
			<section className='p-4'>
				<article className='max-w-screen-xl py-12 mx-auto'>
					<header className='py-10 space-y-2 text-center bg-indigo-100 rounded-xl '>
						<h2 className='text-2xl font-bold text-indigo-900 md:text-4xl'>¿Que Convenio desearian Firmar con Nosotros?</h2>
						<div className="flex items-center justify-center py-10 text-lg">
						 <ul >
                          <li className='flex items-center gap-3'><FaCheck />Convenio Marco y de Practicas Pre-Profesionales (Universidades).</li>
                          <li className='flex items-center gap-3'><FaCheck />Convenio Marco o de Cooperacion (Instituciones Privadas y Publicas).</li>
                          <li className='flex items-center gap-3'><FaCheck />Convenios (Personas Naturales).</li>
                         </ul>
						</div>
						
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

export default ValidationConvenio;
