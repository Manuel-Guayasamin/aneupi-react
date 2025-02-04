import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createServicio, fetchServicios } from '../../redux/slices/serviciosSlice';

const TextInput = ({ label, name, type = 'text', register, errors, required }) => (
	<div>
		<div className='flex items-center justify-between mb-1'>
			<label
				htmlFor={name}
				className='block text-sm font-medium text-gray-900'
			>
				{label}
			</label>
		</div>
		<input
			id={name}
			type={type}
			className={`w-full text-sm input input-bordered input-ghost text-gray-900`}
			placeholder={label}
			{...register(name, { required: required ? 'Este campo es obligatorio' : false })}
		/>
		{errors[name] && <span className='mt-2 text-white badge badge-error badge-sm'>{errors[name].message}</span>}
	</div>
);

const ModalRegistroServicio = ({ showModal, closeModal }) => {
	const dispatch = useDispatch();
	const usuarios = useSelector((state) => state.usuarios.usuarios);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const onSubmit = async (servicioData) => {
		try {
			dispatch(createServicio(servicioData)).then(() => {
				dispatch(fetchServicios());
				closeModal();
			});
		} catch (error) {
			console.error('Error al crear servicio:', error);
		}
	};

	useEffect(() => {
		reset();
	}, [reset, showModal]);

	return (
		showModal && (
			<div className='fixed inset-0 z-50 grid p-2 overflow-auto bg-gray-900 bg-opacity-50 md:p-4 place-items-center'>
				<div className='w-full max-w-lg bg-white rounded-lg shadow'>
					<div className='p-6 space-y-4'>
						<h1 className='text-xl font-bold leading-tight text-center text-gray-900'>Crear Servicio</h1>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className='space-y-4'
							encType='multipart/form-data'
						>
							<fieldset className='grid gap-2'>
								<TextInput
									label='Nombre'
									name='nombre'
									register={register}
									errors={errors}
									required
								/>
							</fieldset>
							<fieldset className='grid gap-2'>
								<label
									htmlFor='descripcion'
									className='block text-sm font-medium text-gray-900'
								>
									Descripción
								</label>
								<textarea
									className='mt-1 w-full text-sm input input-bordered input-ghost text-gray-900'
									{...register('descripcion', { required: 'Descripción es obligatoria' })}
									rows={5}
								></textarea>
								{errors.descripcion && (
									<span className='mt-2 text-white badge badge-error badge-sm'>
										{errors.descripcion.message}
									</span>
								)}
							</fieldset>
							{/* <fieldset className='grid gap-2'>
								<div>
									<label
										htmlFor='id_profesional'
										className='block text-sm font-medium text-gray-900'
									>
										Profesional Encargado
									</label>
									<select
										id='id_profesional'
										className='mt-1 w-full text-sm input input-bordered input-ghost text-gray-900'
										{...register('id_profesional', {

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
							</fieldset> */}
							<fieldset className='flex items-center gap-4'>
								<button
									type='submit'
									className='flex-1 text-white btn btn-primary'
								>
									Crear Servicio
								</button>
								<button
									type='button'
									className='text-white btn btn-error'
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

export default ModalRegistroServicio;