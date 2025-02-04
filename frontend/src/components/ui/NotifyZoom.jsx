import React from 'react';
import PropTypes from 'prop-types';
import { FaCircleCheck, FaCircleXmark } from 'react-icons/fa6';
<<<<<<< HEAD
 {/* cambio de link de whatsapp a link de zoom*/}
const NotifyZoom = ({
	showNotification,
	setShowNotification,
	path = 'https://us06web.zoom.us/j/81064260165?pwd=bJrpKbi6HDxt9g8bBpxA82Bv7OzVlr.1',
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
				 {/* cambio de mensaje para unirse al zoom*/}
				<FaCircleCheck className='text-blue-500 text-8xl' />
				<p className='mt-4 font-semibold md:text-xl'>¡Solicitud Envíada!</p>
				<p className='mt-2 text-sm text-center'>Porfavor, notificanos por Zoom</p>
				<a
					href={path}
					target='_blank'
					className='mt-4 text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-md'
				>
					únete a la Reunión 
				</a>
			</div>
		</div>
	);

NotifyZoom.propTypes = {
	showNotification: PropTypes.bool.isRequired,
	setShowNotification: PropTypes.func.isRequired,
	path: PropTypes.string,
=======

const NotifyZoom = ({
    showNotification,
    setShowNotification,

    path = 'https://zoom.us/j/1234567891', //Enlace de zoom definido
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
                <FaCircleCheck className='text-blue-500 text-8xl ' />
                <p className='mt-4 font-semibold md:text-xl'>Solicitud enviada</p>
                <p className='mt-2 text-sm text-center'>Porfavor, únete a la reunión de zoom</p>
                <a
                    href={path}
                    target='_blank'
                    rel="noopener noreferrer"
                    className='mt-4 text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded.md'
                //btn btn-success
                >
                    Unirse a la reunión
                </a>
            </div>
        </div>
    );

NotifyZoom.propTypes = {
    showNotification: PropTypes.bool.isRequired,
    setShowNotification: PropTypes.func.isRequired,
    path: PropTypes.string,
>>>>>>> 9717738f1562404e4095fd150380873d553bf48a
};

export default NotifyZoom;