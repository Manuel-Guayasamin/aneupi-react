import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchModalidades } from '../../redux/slices/modalidadesSlice';
import { createPractica, fetchPracticas } from '../../redux/slices/practicaSlice';

const TextInput = ({ label, name, type = 'text', register, errors, required, min, defaultValue, max }) => (
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
			{...register(name, {
				required: required ? 'Este campo es obligatorio' : false,
				min: min || undefined,
				max: max || undefined,
			})}
			min={min}
			max={max}
			defaultValue={defaultValue}
		/>
		{errors[name] && <span className='text-xs text-red-600'>{errors[name].message}</span>}
	</div>
);

const ModalRegistroPracticas = ({ showModal, closeModal }) => {
	const dispatch = useDispatch();
	const modalidades = useSelector((state) => state.modalidades.modalidades);
	const today = new Date().toISOString().split('T')[0];

	const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
	const totalHoras = watch('total_horas', 0);
	const fechaInicio = watch('fecha_inicio');
	const horario = watch('horario');

	useEffect(() => {
		dispatch(fetchModalidades());
		reset();
	}, [reset, showModal]);

	const getHoursPerDay = (horario) => {
		switch (horario) {
			case 'Mañana':
				return 4;
			case 'Tarde':
			case 'Noche':
				return 5;
			default:
				return 0;
		}
	};

	const calculateFechaFin = (fechaInicio, totalHoras, horario) => {
		if (!fechaInicio || !totalHoras || !horario) return '';
		const hoursPerDay = getHoursPerDay(horario);
		const totalDaysNeeded = Math.ceil(totalHoras / hoursPerDay);

		let currentDate = new Date(fechaInicio);
		let daysAdded = 0;

		while (daysAdded < totalDaysNeeded) {
			currentDate.setDate(currentDate.getDate() + 1);
			const dayOfWeek = currentDate.getDay();
			if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Exclude weekends
				daysAdded++;
			}
		}

		return currentDate.toISOString().split('T')[0];
	};

	const onSubmit = async (data) => {
		try {
			const fechaFin = calculateFechaFin(data.fecha_inicio, data.total_horas, data.horario);
			const submitData = { ...data, fecha_fin: fechaFin };
			dispatch(createPractica(submitData)).then(() => {
				dispatch(fetchPracticas());
				closeModal();
			});
		} catch (error) {
			console.error('Error al crear práctica:', error);
		}
	};

	return (
		showModal && (
			<div className='fixed inset-0 z-50 grid p-2 overflow-auto bg-gray-900 bg-opacity-50 md:p-4 place-items-center'>
				<div className='w-full max-w-lg bg-white rounded-lg shadow'>
					<div className='p-6 space-y-4'>
						<h1 className='text-xl font-bold leading-tight text-center text-gray-900'>Crear Práctica</h1>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className='space-y-4'
						>
							<fieldset className='grid gap-2 md:grid-cols-2'>
								<div>
									<label htmlFor='empresa' className='block text-sm font-medium text-gray-900'>
										Empresa
									</label>
									<select
										className='w-full mt-1 text-sm text-gray-900 select select-bordered select-ghost'
										{...register('empresa', { required: 'Empresa es obligatoria' })}
									>
										<option value='Fundacion ANEUPI'>Fundación ANEUPI</option>
										<option value='Academia ANEUPI'>Academia ANEUPI</option>
										<option value='Institución Financiera ANEUPI'>Institución Financiera ANEUPI</option>
										<option value='Constructora LECENI'>Constructora LECENI</option>
									</select>
									{errors.empresa && (
										<span className='text-white badge badge-error badge-sm'>{errors.empresa.message}</span>
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
									<label htmlFor='horario' className='block text-sm font-medium text-gray-900'>
										Horario
									</label>
									<select
										id='horario'
										name='horario'
										{...register('horario', { required: 'Seleccione un horario' })}
										className='w-full mt-1 text-sm text-gray-900 select select-bordered select-ghost'
									>
										<option value='Mañana'>Mañana 08:00 a 12:00</option>
										<option value='Tarde'>Tarde 13:00 a 18:00</option>
										<option value='Noche'>Noche 19:00 a 23:00</option>
									</select>
									{errors.horario && (
										<span className='text-white badge badge-error badge-sm'>{errors.horario.message}</span>
									)}
								</div>
							</fieldset>
							<fieldset className='grid gap-2'>
								<div className='items-center justify-center text-base rounded-md'>
									<label htmlFor='tipo_practica' className='block text-sm font-medium text-gray-900'>
										Tipo de Practica
									</label>
									<select
										id='tipo_practica'
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
										<span className='text-white badge badge-error badge-sm'>{errors.tipo_practica.message}</span>
									)}
								</div>
							</fieldset>
							<fieldset className='grid'>
								<TextInput
									type='date'
									label='Fecha de Inicio'
									name='fecha_inicio'
									register={register}
									errors={errors}
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
									required
								/>
								<div>
									<label htmlFor='id_modalidad' className='block text-sm font-medium text-gray-900'>
										Modalidad
									</label>
									<select
										id='id_modalidad'
										name='id_modalidad'
										{...register('id_modalidad', { required: 'Tipo de modalidad de realizar practicas' })}
										className='w-full mt-1 text-sm text-gray-900 select select-bordered select-ghost'
									>
										{modalidades.map((modalidad) => (
											<option key={modalidad.id} value={modalidad.id}>
												{modalidad.nombre}
											</option>
										))}
									</select>
									{errors.id_modalidad && (
										<span className='text-white badge badge-error badge-sm'>{errors.id_modalidad.message}</span>
									)}
								</div>
							</fieldset>
							<fieldset className='flex items-center gap-4'>
								<button
									type='submit'
									className="px-24 py-3 text-white rounded-lg bg-colorcito hover:text-colorcito border border-transparent
                  					hover:border-colorcito hover:bg-white hover:shadow-lg hover:shadow-gray-500 dark:bg-blue-700 dark:text-white 
                  					dark:hover:bg-white dark:hover:text-blue-700 dark:hover:border-blue-700"
								>
									Crear Practica
								</button>
								<button
									type='button'
									className="px-10 py-3 text-red-700 bg-white rounded-lg  border border-transparent
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

export default ModalRegistroPracticas;
