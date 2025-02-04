import React from 'react';
import PropTypes from 'prop-types';
import { FaCircleCheck, FaCircleXmark } from 'react-icons/fa6';

const NotifyWhatsapp = ({
	showNotification,
	setShowNotification,
	path = 'https://chat.whatsapp.com/BuQIHzyLKJP43PoHpgdZ5L',
}) =>
	showNotification && (
		<div className='fixed top-0 left-0 grid w-full h-full overflow-auto z-50 bg-gray-900 bg-opacity-50 md:p-4 place-items-center !mt-0'>
			<div className='z-50 flex flex-col items-center justify-center max-w-sm modal-box animate__animated animate__bounceInDown'>
				<button
					type='button'
					className='px-0 ml-auto text-white hover:bg-transparent group'
					onClick={() => setShowNotification(false)}
				>
					<span className='sr-only'>Cerrar</span>
					<FaCircleXmark className='text-4xl text-red-500 group-hover:text-black' />
				</button>
				<FaCircleCheck className='text-green-500 text-8xl' />
				<p className='mt-4 font-semibold md:text-xl'>¡Solicitud Envíada!</p>
				<p className='mt-2 text-sm text-center'>Porfavor, notificanos por WhatsApp</p>
				<a
					href={path}
					target='_blank'
					className='mt-4 text-white btn btn-success'
				>
					Contactar
				</a>
			</div>
		</div>
	);

NotifyWhatsapp.propTypes = {
	showNotification: PropTypes.bool.isRequired,
	setShowNotification: PropTypes.func.isRequired,
	path: PropTypes.string,
};

export default NotifyWhatsapp;
