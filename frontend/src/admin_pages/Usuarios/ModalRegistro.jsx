import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createUsuario, getUsuarios } from '../../redux/slices/usuariosSlice';

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
		{errors[name] && <span className='text-xs text-red-600'>{errors[name].message}</span>}
	</div>
);

const SelectInput = ({ label, name, register, errors, options, required }) => (
	<div>
		<div className='flex items-center justify-between mb-1'>
			<label
				htmlFor={name}
				className='block text-sm font-medium text-gray-900'
			>
				{label}
			</label>
			{errors[name] && <span className='text-xs text-red-600'>{errors[name].message}</span>}
		</div>
		<select
			id={name}
			className={`w-full text-sm input input-bordered input-ghost text-gray-900`}
			{...register(name, { required: required ? 'Este campo es obligatorio' : false })}
		>
			{options.map((option) => (
				<option
					key={option.value}
					value={option.value}
				>
					{option.label}
				</option>
			))}
		</select>
	</div>
);

const ModalRegistro = ({ showModal, closeModal, resourceUpdated, setResourceUpdated }) => {
	const dispatch = useDispatch();
	const error = useSelector((store) => store.usuarios.error);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const onSubmit = async (userData) => {
		try {
			dispatch(createUsuario(userData)).then(() => {
				dispatch(getUsuarios());
				closeModal();
				setResourceUpdated({
					...resourceUpdated,
					isRegistered: {
						...resourceUpdated.isUdated,
						value: true, // Actualiza el valor a true
					},
				});
			});
		} catch (error) {
			console.error('Error al crear usuario:', error);
		}
	};

	useEffect(() => {
		reset();
	}, [reset, showModal]);

	return (
		showModal && (
			<div className='fixed inset-0 z-50 grid p-2 overflow-auto bg-gray-900 bg-opacity-50 place-items-center md:p-4'>
				<div className='w-full max-w-md bg-white rounded-lg shadow'>
					<div className='p-6 space-y-4'>
						<h1 className='text-xl font-bold leading-tight text-center text-gray-900'>Registrarse</h1>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className='space-y-4'
						>
							<fieldset className='grid gap-4 md:grid-cols-2'>
								<SelectInput
									label='Rol'
									name='id_rol'
									register={register}
									errors={errors}
									options={[
										{ label: 'Administrador', value: 1 },
										{ label: 'Usuario', value: 2 },
										{ label: 'Profesional', value: 3 },
									]}
									required
								/>
								<TextInput
									name='identificacion'
									label='Identificación'
									register={register}
									errors={errors}
									required
								/>
							</fieldset>

							<fieldset className='grid gap-4 md:grid-cols-2'>
								<TextInput
									label='Nombres'
									name='nombres'
									register={register}
									errors={errors}
									required
								/>
								<TextInput
									label='Apellidos'
									name='apellidos'
									register={register}
									errors={errors}
									required
								/>
							</fieldset>
							<TextInput
								label='Usuario'
								name='nombreUsuario'
								register={register}
								errors={errors}
								required
							/>
							<TextInput
								name='telefono'
								label='Teléfono'
								register={register}
								errors={errors}
								required
							/>
							<TextInput
								label='Email'
								name='email'
								type='email'
								register={register}
								errors={errors}
								required
							/>
							<TextInput
								label='Contraseña'
								name='password'
								type='password'
								register={register}
								errors={errors}
								required
							/>

							<fieldset className='flex items-center justify-end gap-4'>
								<button
									type='submit'
									className="px-20 py-3 text-white rounded-lg bg-colorcito hover:text-colorcito border border-transparent
                 					hover:border-colorcito hover:bg-white hover:shadow-lg hover:shadow-gray-500 dark:bg-blue-700 dark:text-white 
                 					dark:hover:bg-white dark:hover:text-blue-700 dark:hover:border-blue-700"
								>
									Crear Cuenta
								</button>
								<button
									type='button'
									className="px-7 py-3 text-red-700 bg-white rounded-lg  border border-transparent
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

export default ModalRegistro;