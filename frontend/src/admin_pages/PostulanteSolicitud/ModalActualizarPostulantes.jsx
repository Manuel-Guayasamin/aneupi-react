import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEstados } from '../../redux/slices/estadosSlice';
import { fetchPostulantes, updatePostulante } from '../../redux/slices/postulantesSlice';

const TextInput = ({ label, name, type = 'text', register, errors, required }) => (
	<div>
		<div className='flex items-center justify-between mb-1'>
			<label
				htmlFor={name}
				className='block text-sm font-bold text-gray-900'
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

const ModalActualizarPostulantes = ({ showModal, closeModal, postulanteSelected }) => {
	const estados = useSelector((state) => state.estados.estados);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchEstados());
	}, [dispatch]);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({});

	const onSubmit = async (postulanteData) => {
		try {
			postulanteData.is_discapacidad = postulanteData.is_discapacidad.toString();

			dispatch(updatePostulante({ id: postulanteSelected.id, postulanteData })).then(() => {
				dispatch(fetchPostulantes());
				closeModal();
			});
		} catch (error) {
			console.error('Error al actualizar trabajo:', error);
		}
	};

	useEffect(() => {
		// Establecer los valores del formulario cuando eventoSelected cambia
		if (postulanteSelected) {
			Object.keys(postulanteSelected).forEach((key) => {
				setValue(key, postulanteSelected[key]);
			});
		}
	}, [setValue, postulanteSelected]);

	return (
		showModal && (
			<div className='fixed inset-0 z-50 grid p-2 overflow-auto bg-gray-900 bg-opacity-50 md:p-4 place-items-center'>
				<div className='w-full max-w-lg bg-white rounded-lg shadow'>
					<div className='p-6 space-y-4'>
						<h1 className='text-xl font-bold leading-tight text-center text-gray-900'>
							Actualizar Practicas
						</h1>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className='space-y-4'
							encType='multipart/form-data'
						>
							<div className='grid gap-2'>
								<fieldset>
									<TextInput
										label='Estudios'
										name='universidad'
										register={register}
										errors={errors}
										required
									/>
								</fieldset>

								<fieldset>
									<TextInput
										label='En que es fuerte'
										name='descripcion'
										register={register}
										errors={errors}
										required
									/>
								</fieldset>
							</div>

							<fieldset className='grid gap-2'>
								<div className='items-center justify-center text-base rounded-md'>
									<label
										htmlfor='pais'
										className='block text-sm font-bold text-gray-900'
									>
										Pais
									</label>
									<select
										id='pais'
										name='pais'
										{...register('pais', { required: 'Seleccione un Pais' })}
										className='w-full mt-1 text-sm text-gray-900 select select-bordered select-ghost'
									>
										<option value='Ecuador'>Ecuador</option>
										<option value='Peru'>Peru</option>
									</select>
									{errors.pais && (
										<span className='text-white badge badge-error badge-sm'>
											{errors.pais.message}
										</span>
									)}
								</div>
							</fieldset>

							<fieldset className='grid gap-2'>
								<TextInput
									label='Ciudad'
									name='ciudad'
									register={register}
									errors={errors}
									required
								/>
							</fieldset>

							<fieldset className='grid gap-2 md:grid-cols-2'>
								<TextInput
									label='Direccion'
									name='direccion'
									register={register}
									errors={errors}
									required
								/>
								<TextInput
									label='Whatsapp'
									name='telefono'
									register={register}
									errors={errors}
									required
								/>
							</fieldset>

							<fieldset className='grid gap-2'>
								<label htmlFor='is_discapacidad'>¿Eres Persona con Discapacidad?</label>
								<select
									name='is_discapacidad'
									{...register('is_discapacidad', { required: false })}
									class='select select-bordered w-full'
								>
									<option value='false'>No</option>
									<option value='true'>Si</option>
								</select>
							</fieldset>

							<fieldset className='grid gap-2'>
								<div>
									<label
										htmlfor='id_estado'
										className='block text-sm font-bold text-gray-900'
									>
										Estado
									</label>
									<select
										id='id_estado'
										name='id_estado'
										{...register('id_estado', {
											required: 'Tipo de modalidad de realizar practicas',
										})}
										className='w-full mt-1 text-sm text-gray-900 select select-bordered select-ghost'
									>
										{estados.map((estado) => (
											<option
												key={estado.id}
												value={estado.id}
											>
												{estado.nombre}
											</option>
										))}
									</select>
									{errors.id_estado && (
										<span className='text-white badge badge-error badge-sm'>
											{errors.id_estado.message}
										</span>
									)}
								</div>
							</fieldset>
							<fieldset className='flex items-center gap-4'>
								<button
									type='submit'
									className='flex-1 text-white btn btn-primary'
								>
									Actualizar Practica
								</button>
								<button
									type='button'
									className='btn btn-error'
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

export default ModalActualizarPostulantes;
