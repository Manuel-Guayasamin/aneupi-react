import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateEvent, fetchEvents } from '../../redux/slices/eventSlice'; // Importamos la acción para actualizar un evento
import { fetchModalidades } from '../../redux/slices/modalidadesSlice';
import { fetchEstados } from '../../redux/slices/estadosSlice';


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

const ModalActualizarEvento = ({ showModal, closeModal, eventoSelected }) => {
	const dispatch = useDispatch();
	const modalidades = useSelector((state) => state.modalidades.modalidades); // Agregado para obtener las modalidades desde el estado
	const estados = useSelector((state) => state.estados.estados); // Agregado para obtener las modalidades desde el estado

	useEffect(() => {
		dispatch(fetchModalidades());
		dispatch(fetchEstados());
	}, [dispatch]);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({});

	const onSubmit = async (eventoData) => {
		try {
			dispatch(updateEvent({ id: eventoSelected.id, eventoData })).then(() => {
				dispatch(fetchEvents());
				closeModal();
			});
		} catch (error) {
			console.error('Error al actualizar evento:', error);
		}
	};

	useEffect(() => {
		// Establecer los valores del formulario cuando eventoSelected cambia
		if (eventoSelected) {
			Object.keys(eventoSelected).forEach((key) => {
				if (key === 'fecha_inicio' || key === 'fecha_fin') {
					// Formatear la fecha al formato "YYYY-MM-DD"
					const formattedDate = new Date(eventoSelected[key]).toISOString().split('T')[0];
					setValue(key, formattedDate);
				} else {
					setValue(key, eventoSelected[key]);
				}
			});
		}
	}, [setValue, eventoSelected]);

	return (
		showModal && (
			<div className='fixed inset-0 z-50 grid p-2 overflow-auto bg-gray-900 bg-opacity-50 md:p-4 place-items-center'>
				<div className='w-full max-w-lg bg-white rounded-lg shadow'>
					<div className='p-6 space-y-4'>
						<h1 className='text-xl font-bold leading-tight text-center text-gray-900'>Actualizar Evento</h1>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className='space-y-4'
							encType='multipart/form-data'
						>
							<fieldset className='grid gap-2 md:grid-cols-2'>
								<TextInput
									label='Código'
									name='codigo'
									register={register}
									errors={errors}
									required
								/>
								<TextInput
									label='Nombre'
									name='nombre'
									register={register}
									errors={errors}
									required
								/>
							</fieldset>
							<fieldset className='text-gray-900 grid gap-2'>
								<label
									htmlFor='imagen'
									className='block text-sm font-medium text-gray-900'
								>
									Imagen
								</label>
								<input
									className='w-full file:py-2 file:px-4 file:border-0 file:text-white file:bg-colorcito file:cursor-pointer mb-3 hover:file:text-colorcito hover:file:bg-white
                					dark:file:bg-blue-700 dark:hover:file:text-blue-700 dark:hover:file:bg-white file-input file-input-bordered'
									{...register('imagen', {
										required: false,
									})}
									type='file'
									accept='image/*'
								/>
							</fieldset>
							<fieldset className='grid gap-4 md:grid-cols-2'>
								<TextInput
									label='Fecha de Inicio'
									name='fecha_inicio'
									type='date'
									register={register}
									errors={errors}
									required
								/>
								<TextInput
									label='Fecha de Fin'
									name='fecha_fin'
									type='date'
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
									className='w-full text-sm text-gray-900 input input-bordered input-ghost'
									{...register('descripcion', { required: 'Descripción del evento es obligatoria' })}
									rows={5}
								/>
								{errors.descripcion && (
									<span className='text-xs font-semibold text-red-600'>
										{errors.descripcion.message}
									</span>
								)}
							</fieldset>

							<fieldset className='grid gap-4 md:grid-cols-2'>
								<TextInput
									type='number'
									label='Participantes'
									name='participantes'
									register={register}
									errors={errors}
									required
								/>
								{/* <TextInput
									label='Costo'
									name='costo'
									type='number'
									register={register}
									errors={errors}
									required
								/> */}

								<div>
									<label
										htmlFor='costo'
										className='block text-sm font-medium text-gray-900'
									>
										Costo
									</label>
									<select
										className='w-full mt-1 text-sm text-gray-900 select select-bordered select-ghost'
										{...register('costo', {
											required: 'Costo del evento es obligatorio',
										})}
									>
										<option value='39.99'>$39.99 </option>
										<option value='29.99'>$29.99 </option>
										<option value='19.99'>$19.99 </option>
									</select>
									{errors.costo && (
										<span className='text-white badge badge-error badge-sm'>
											{errors.costo.message}
										</span>
									)}
								</div>
							</fieldset>

							<fieldset className='grid gap-4 md:grid-cols-2'>
								<TextInput
									label='Dirección'
									name='direccion'
									register={register}
									errors={errors}
									required
								/>
								<div>
									<label
										htmlFor='id_modalidad'
										className='block text-sm font-medium text-gray-900'
									>
										Modalidad
									</label>
									<select
										id='id_modalidad'
										name='id_modalidad'
										className='w-full mt-1 text-sm text-gray-900 select select-bordered select-ghost'
										{...register('id_modalidad', {
											required: 'Modalidad del evento es obligatoria',
										})}
									>
										{modalidades.map((modalidad) => (
											<option
												key={modalidad.id}
												value={modalidad.id}
											>
												{modalidad.nombre}
											</option>
										))}
									</select>
									{errors.id_modalidad && (
										<span className='text-xs font-semibold text-red-600'>
											{errors.id_modalidad.message}
										</span>
									)}
								</div>
							</fieldset>
							<fieldset className='grid'>
								<div>
									<label
										htmlFor='id_estado'
										className='block text-sm font-medium text-gray-900'
									>
										Estado
									</label>
									<select
										className='w-full text-sm text-gray-900 input input-bordered input-ghost'
										{...register('id_estado', {
											required: 'Estado del evento es obligatoria',
										})}
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
										<span className='text-xs font-semibold text-red-600'>
											{errors.id_estado.message}
										</span>
									)}
								</div>
							</fieldset>
							<fieldset className='flex items-center gap-4'>
								<button
									type='submit'
									className="px-20 py-3 text-white rounded-lg bg-colorcito hover:text-colorcito border border-transparent
									hover:border-colorcito hover:bg-white hover:shadow-lg hover:shadow-gray-500 dark:bg-blue-700 dark:text-white 
									dark:hover:bg-white dark:hover:text-blue-700 dark:hover:border-blue-700"
								>
									Actualizar Evento
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

export default ModalActualizarEvento;
