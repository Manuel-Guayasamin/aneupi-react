import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServicioLineas, updateServicioLinea } from '../../redux/slices/serviciolineasSlice';

const ModalActualizarProfesional = ({ showModal, closeModal, servicioSelected }) => {
	const dispatch = useDispatch();
	const usuarios = useSelector((state) => state.usuarios.usuarios);
	const servicios = useSelector((state) => state.servicios.servicios);

	useEffect(() => {
		dispatch(fetchServicioLineas());
	}, [dispatch]);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm();

	const onSubmit = async (data) => {
		try {
			const updatedProfesional = {
				id: servicioSelected?.id,
				servicioLineaData: {
					id_profesional: +data.id_profesional,
					id_servicio: +data.id_servicio,
				}
			}
			dispatch(updateServicioLinea(updatedProfesional)).then(() => {
				dispatch(fetchServicioLineas());
				closeModal();
			});
		} catch (error) {
			console.error('Error al actualizar profesional:', error);
		}
	};

	useEffect(() => {
		if (servicioSelected) {
			Object.keys(servicioSelected).forEach((key) => {
				setValue(key, servicioSelected[key]);
			});
		}
	}, [setValue, servicioSelected]);

	return (
		showModal && (
			<div className='fixed inset-0 z-50 grid p-2 overflow-auto bg-gray-900 bg-opacity-50 md:p-4 place-items-center'>
				<div className='w-full max-w-lg bg-white rounded-lg shadow'>
					<div className='p-6 space-y-4'>
						<h1 className='text-xl font-bold leading-tight text-center text-gray-900'>
							Actualizar Profesional
						</h1>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className='space-y-4'
							encType='multipart/form-data'
						>
							<fieldset className='grid gap-2'>
								<div>
									<label
										htmlFor='id_servicio'
										className='block text-sm font-medium text-gray-900'
									>
										Servicio Ofrecido
									</label>
									<select
										id='id_servicio'
										className='w-full text-sm input input-bordered input-ghost text-gray-900'
										{...register('id_servicio', {
											required: 'Servicio es obligatorio',
										})}
									>
										<option value=''>Seleccione un Servicio</option>
										{servicios
											.map((s) => (
												<option
													key={s.id}
													value={s.id}
												>
													{s.nombre}
												</option>
											))}
									</select>
									{errors.id_servicio && (
										<span className='mt-2 text-white badge badge-error badge-sm'>
											{errors.id_servicio.message}
										</span>
									)}
								</div>
							</fieldset>
							<fieldset className='grid gap-2'>
								<div>
									<label
										htmlFor='id_profesional'
										className='block text-sm font-medium text-gray-900'
									>
										Profesional Encargado
									</label>
									<select
										id='id_profesional'
										className='w-full text-sm input input-bordered input-ghost text-gray-900'
										{...register('id_profesional', {
											required: 'Profesional es obligatorio',
										})}
									>
										<option value=''>Seleccione un Profesional</option>
										{usuarios
											.filter((usuario) => usuario.id_rol === 3)
											.map((usuario) => (
												<option
													key={usuario.id}
													value={usuario.id}
												>
													{`${usuario.nombres.split(' ')[0]} ${usuario.apellidos.split(' ')[0]
														}`}
												</option>
											))}
									</select>
									{errors.id_profesional && (
										<span className='mt-2 text-white badge badge-error badge-sm'>
											{errors.id_profesional.message}
										</span>
									)}
								</div>
							</fieldset>
							<fieldset className='flex items-center gap-4'>
								<button
									type='submit'
									className="px-16 py-3 text-white rounded-lg bg-colorcito hover:text-colorcito border border-transparent
									hover:border-colorcito hover:bg-white hover:shadow-lg hover:shadow-gray-500 dark:bg-blue-700 dark:text-white 
									dark:hover:bg-white dark:hover:text-blue-700 dark:hover:border-blue-700"
								>
									Actualizar Profesional
								</button>
								<button
									type='button'
									className="px-11 py-3 text-red-700 bg-white rounded-lg  border border-transparent
                  					border-red-700 hover:text-white hover:bg-red-600 hover:shadow-lg hover:shadow-gray-500"
									onClick={closeModal}
								>
									Cancelar
								</button>
							</fieldset>
						</form>
					</div>
				</div>
			</div>
		)
	);
};

export default ModalActualizarProfesional;
