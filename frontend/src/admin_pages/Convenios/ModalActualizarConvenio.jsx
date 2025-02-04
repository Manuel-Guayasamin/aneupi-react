import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateConvenio, fetchConvenios } from '../../redux/slices/conveniosSlice'; // Importamos la acción para actualizar un convenio
import { fetchModalidades } from '../../redux/slices/modalidadesSlice';
import { fetchTipoConvenios } from '../../redux/slices/tipoconveniosSlice';

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

const ModalActualizarConvenio = ({ showModal, closeModal, convenioSelected }) => {
	const dispatch = useDispatch();
	const modalidades = useSelector((state) => state.modalidades.modalidades); // Agregado para obtener las modalidades desde el estado
	const tipoconvenios = useSelector((state) => state.tipoconvenios.tipoConvenios);
	console.log(tipoconvenios)
	const estados = useSelector((state) => state.estados.estados); // Agregado para obtener las modalidades desde el estado

	useEffect(() => {
		dispatch(fetchModalidades());
		dispatch(fetchTipoConvenios());
		dispatch(fetchEstados());
	}, [dispatch]);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({});

	const onSubmit = async (convenioData) => {
		try {
			dispatch(updateConvenio({ id: convenioSelected.id, convenioData })).then(() => {
				dispatch(fetchConvenios());
				closeModal();
			});
		} catch (error) {
			console.error('Error al actualizar convenio:', error);
		}
	};

	return (
		showModal && (
			<div className='fixed inset-0 z-50 grid p-2 overflow-auto bg-gray-900 bg-opacity-50 md:p-4 place-items-center'>
				<div className='w-full max-w-lg bg-white rounded-lg shadow'>
					<div className='p-6 space-y-4'>
						<h1 className='text-xl font-bold leading-tight text-center text-gray-900'>Actualizar Convenio</h1>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className='space-y-4'
							encType='multipart/form-data'
						>
							<fieldset className='grid gap-2 md:grid-cols-2'>
								<div>
									<label
										htmlFor='id_tipoconvenio'
										className='block text-sm font-medium text-gray-900'
									>
										Tipo de Convenio
									</label>
									<select
										className='w-full mt-1 select select-bordered'
										{...register('id_tipoconvenio', {
											required: 'Tipo de convenio es obligatoria',
										})}
									>
										{tipoconvenios.map((convenio) => (
											<option
												key={convenio.id}
												value={convenio.id}
											>
												{convenio.nombre}
											</option>
										))}
									</select>
									{errors.id_modalidad && (
										<span className='text-xs font-semibold text-red-600'>
											{errors.id_modalidad.message}
										</span>
									)}
								</div>
								<TextInput
									label='Organizacion'
									name='nombreOrganizacion'
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
									className='text-base resize-none textarea textarea-bordered'
									{...register('descripcion', { required: 'Descripción del convenio es obligatoria' })}
									rows={5}
								/>
								{errors.descripcion && (
									<span className='text-xs font-semibold text-red-600'>
										{errors.descripcion.message}
									</span>
								)}
							</fieldset>
							<fieldset className='grid gap-2'>
								<div>
									<label
										htmlFor='id_modalidad'
										className='block text-sm font-medium text-gray-900'
									>
										Modalidad
									</label>
									<select
										className='w-full mt-1 select select-bordered'
										{...register('id_modalidad', {
											required: 'Modalidad del convenio es obligatoria',
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

							<fieldset className='grid'>
								<div>
									<label
										htmlFor='id_estado'
										className='block text-sm font-medium text-gray-900'
									>
										Estado
									</label>
									<select
										className='w-full select select-bordered'
										{...register('id_estado', {
											required: 'Estado del convenio es obligatoria',
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
									className='flex-1 btn btn-primary'
								>
									Actualizar Convenio
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

export default ModalActualizarConvenio;
