import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchModalidades } from '../../redux/slices/modalidadesSlice';
import { fetchPracticas, updatePractica } from '../../redux/slices/practicaSlice';

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

const ModalActualizarPracticas = ({ showModal, closeModal, practicaSelected }) => {
	const modalidades = useSelector((state) => state.modalidades.modalidades);
	const today = new Date().toISOString().split('T')[0];
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchModalidades());
	}, [dispatch]);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({});

	const onSubmit = async (practicaData) => {
		try {
			dispatch(updatePractica({ id: practicaSelected.id, practicaData })).then(() => {
				dispatch(fetchPracticas());
				closeModal();
			});
		} catch (error) {
			console.error('Error al actualizar trabajo:', error);
		}
	};

	useEffect(() => {
		// Establecer los valores del formulario cuando eventoSelected cambia
		if (practicaSelected) {
			Object.keys(practicaSelected).forEach((key) => {
				// Si la clave es fecha_inicio o fecha_fin, convierte la cadena a un objeto Date
				if (key === 'fecha_inicio' || key === 'fecha_fin') {
					const dateValue = new Date(practicaSelected[key]);
					const localDate = new Date(dateValue); // Ajuste para la zona horaria
					setValue(key, localDate.toISOString().split('T')[0]); // Establece el valor en formato YYYY-MM-DD
				} else {
					setValue(key, practicaSelected[key]);
				}
			});
		}
	}, [setValue, practicaSelected]);

	return (
		showModal && (
			<div className='fixed inset-0 z-50 grid p-2 overflow-auto bg-gray-900 bg-opacity-50 md:p-4 place-items-center'>
				<div className='w-full max-w-lg bg-white rounded-lg shadow'>
					<div className='p-6 space-y-4'>
						<h1 className='text-xl font-bold leading-tight text-center text-gray-900'>
							Actualizar Prácticas
						</h1>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className='space-y-4'
							encType='multipart/form-data'
						>
							<fieldset className='grid gap-2 md:grid-cols-2'>
								<div>
									<label
										htmlFor='id_modalidad'
										className='block text-sm font-medium text-gray-900'
									>
										Empresa
									</label>
									<select
										className='w-full mt-1 text-sm text-gray-900 select select-bordered select-ghost'
										{...register('empresa', {
											required: 'Empresa es obligatoria',
										})}
									>
										<option value='Fundacion ANEUPI'>Fundación ANEUPI</option>
										<option value='Academia ANEUPI'>Academia ANEUPI</option>
										<option value='Institución Financiera ANEUPI'>Institución Financiera ANEUPI</option>
										<option value='Constructora LECENI'>Constructora LECENI</option>
									</select>
									{errors.id_modalidad && (
										<span className='text-white badge badge-error badge-sm'>
											{errors.id_modalidad.message}
										</span>
									)}
								</div>

								<TextInput
									label='Carrera'
									name='carrera'
									register={register}
									errors={errors}
									required
								/>
							</fieldset>
							<fieldset className='grid gap-2'>
								<div className='items-center justify-center text-base rounded-md'>
									<label
										htmlfor='horario'
										className='block text-sm font-medium text-gray-900'
									>
										Horario
									</label>
									<select
										id='horario'
										label='horario'
										name='horario'
										{...register('horario', { required: 'Seleccione un horario' })}
										className='w-full mt-1 text-sm text-gray-900 select select-bordered select-ghost'
									>
										<option value='Mañana'>Mañana 08:00 a 12:00</option>
										<option value='Tarde'>Tarde 13:00 a 18:00</option>
										<option value='Noche'>Noche 19:00 a 23:00</option>
									</select>
									{errors.horario && (
										<span className='text-white badge badge-error badge-sm'>
											{errors.horario.message}
										</span>
									)}
								</div>
							</fieldset>
							<fieldset className='grid gap-2'>
								<div className='items-center justify-center text-base rounded-md'>
									<label
										htmlfor='tipo_practica'
										className='block text-sm font-medium text-gray-900'
									>
										Tipo de Practica
									</label>
									<select
										id='tipo_practica'
										label='Tipo_practica'
										name='tipo_practica'
										{...register('tipo_practica', { required: 'Seleccione un tipo de practica' })}
										className='w-full mt-1 text-sm text-gray-900 select select-bordered select-ghost'
									>
										<option value='Pre-Profesionales'>Pre-Profesionales</option>
										<option value='Pasantias'>Pasantias</option>
										<option value='Comunitarias'>Comunitarias</option>
										<option value='Master'>Master</option>
									</select>
									{errors.tipo_practica && (
										<span className='text-white badge badge-error badge-sm'>
											{errors.tipo_practica.message}
										</span>
									)}
								</div>
							</fieldset>
							<fieldset className='grid gap-2 md:grid-cols-2'>
								<TextInput
									type='date'
									label='Fecha de Inicio'
									name='fecha_inicio'
									register={register}
									errors={errors}
									isToday={today}
									required
								/>
								<TextInput
									type='date'
									label='Fecha de Fin'
									name='fecha_fin'
									register={register}
									errors={errors}
									isToday={today}
									required
								/>
							</fieldset>
							<fieldset className='grid gap-2 md:grid-cols-2'>
								<TextInput
									type='number'
									label='Total de Horas'
									name='total_horas'
									register={register}
									errors={errors}
									isToday={today}
									required
								/>
								<div>
									<label
										htmlfor='id_modalidad'
										className='block text-sm font-medium text-gray-900'
									>
										Modalidad
									</label>
									<select
										id='id_modalidad'
										name='id_modalidad'
										{...register('id_modalidad', {
											required: 'Tipo de modalidad de realizar practicas',
										})}
										className='w-full mt-1 text-sm text-gray-900 select select-bordered select-ghost'
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
										<span className='text-white badge badge-error badge-sm'>
											{errors.id_modalidad.message}
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
									Actualizar Práctica
								</button>
								<button
									type='button'
									className="px-10 py-3 text-red-700 bg-white rounded-lg hover:text-white hover:bg-red-600 hover:shadow-lg hover:shadow-gray-500"
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

export default ModalActualizarPracticas;
