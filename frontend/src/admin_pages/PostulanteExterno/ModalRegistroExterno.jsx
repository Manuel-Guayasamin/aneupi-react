import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
 // Importamos la acción para actualizar un evento
import { fetchModalidades } from '../../redux/slices/modalidadesSlice';
import { createPostulanteExterno, fetchPostulantesExternos } from '../../redux/slices/postulanteExternoSlice';
import { fetchEstados } from '../../redux/slices/estadosSlice';
import { fetchPostulantes } from '../../redux/slices/postulantesSlice';


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

const ModalRegistroExterno = ({ showModal, closeModal }) => {
	const dispatch = useDispatch();
	const modalidades = useSelector((state) => state.modalidades.modalidades); // Agregado para obtener las modalidades desde el estado
	const postExternos = useSelector((state) => state.postulantesExternos.postulantesExternos); // Agregado para obtener las modalidades desde el estado
    const usuario = useSelector((state) => state.authentication.usuario);
   
	

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		reset,
	} = useForm();

	const onSubmit = async (ExternoData) => {
		try {
            console.log(ExternoData);
			ExternoData.id_usuario = usuario.id;
			
			dispatch(createPostulanteExterno(ExternoData)).then(() => {
				dispatch(fetchPostulantesExternos());
				closeModal();
			});
		} catch (error) {
			console.error('Error al Registrarse en Postulante Externo:', error);
		}
	};

  

	
    useState(() => {
		setValue('nombres', usuario?.nombres || '');
		setValue('apellidos', usuario?.apellidos || '');
        // setValue('completo', usuario?.nombres || '') + ' ' + (usuario?.apellidos || '');
		// setValue('email', usuario?.email || '');
		// setValue('telefono', usuario?.telefono || '');
	}, [usuario, setValue]);

	
	
	useEffect(() => {
		dispatch(fetchModalidades());
		
	}, [dispatch]);

	// useEffect(() => {
	// 	// Establecer los valores del formulario cuando eventoSelected cambia
	// 	if (postExternosSelected) {
	// 		Object.keys(postExternosSelected).forEach((key) => {
	// 			if (key === 'fecha_inicio' || key === 'fecha_fin') {
	// 				// Formatear la fecha al formato "YYYY-MM-DD"
	// 				const formattedDate = new Date(postExternosSelected[key]).toISOString().split('T')[0];
	// 				setValue(key, formattedDate);
	// 			} else {
	// 				setValue(key, postExternosSelected[key]);
	// 			}
	// 		});
	// 	}
	// }, [setValue, postExternosSelected]);

	return (
		showModal && (
			<div className='fixed inset-0 z-50 grid p-2 overflow-auto bg-gray-900 bg-opacity-50 md:p-4 place-items-center'>
				<div className='w-full max-w-lg bg-white rounded-lg shadow'>
					<div className='p-6 space-y-4'>
						<h1 className='text-xl font-bold leading-tight text-center text-gray-900'>Propuesta de Postulante en Practicas</h1>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className='space-y-4'
							encType='multipart/form-data'
						>
							<fieldset className='grid gap-2 md:grid-cols-2'>
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
                            <fieldset className='grid gap-2'>
                            <div>
		                     <div className='flex items-center justify-between mb-1'>
			                   <label
				                  htmlfor='universidad'
                                  className='block text-sm font-semibold text-gray-900'
			>
				                  Estudios
			                   </label>
		                     </div>
		                       <input
			                    id='universidad'
                                name='universidad'
                                className='w-full text-sm text-gray-900 input input-bordered input-ghost'
                                {...register('universidad', { required: 'Este campo es obligatorio' })}
                               placeholder='En que universidad esta'
		                       />
		                        {errors.universidad && <span className='text-xs text-red-600'>{errors.universidad.message}</span>}
	                        </div>

                            <div>
		                     <div className='flex items-center justify-between mb-1'>
			                   <label
				                  htmlfor='descripcion'
                                  className='block text-sm font-semibold text-gray-900'
			>
				                  Carrera
			                   </label>
		                     </div>
		                       <input
			                    id='descripcion'
                                name='descripcion'
                                className='w-full text-sm text-gray-900 input input-bordered input-ghost'
                                placeholder='En que Carrera se encuentra'
			                   {...register('descripcion', { required: 'Este campo es obligatorio' })}
		                       />
		                        {errors.descripcion && <span className='text-xs text-red-600'>{errors.descripcion.message}</span>}
	                        </div>
							</fieldset>
						
							<fieldset className='grid gap-2 md:grid-cols-2'>
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

							<div className='grid gap-4 md:grid-cols-2'>
								<fieldset>
									<label htmlFor='pais'>País</label>
									<select
										name='pais'
										{...register('pais', {
											required: 'Este campo es requerido',
										})}
										className='w-full select select-bordered'
									>
										<option value='Ecuador'>Ecuador</option>
										<option value='Peru'>Perú</option>
									</select>
									{errors.pais && (
										<span className='mt-2 text-white badge badge-error badge-sm'>
											{errors.pais.message}
										</span>
									)}
								</fieldset>
								{/* Ciudad */}
								<fieldset>
									<label htmlFor='ciudad'>Ciudad</label>
									<input
										name='ciudad'
										type='text'
										{...register('ciudad', {
											required: 'Este campo es requerido',
										})}
										placeholder='Ciudad'
										className='w-full text-sm input input-bordered'
									/>
									{errors.ciudad && (
										<span className='mt-2 text-white badge badge-error badge-sm'>
											{errors.ciudad.message}
										</span>
									)}
								</fieldset>
							</div>
							

							<fieldset className='grid gap-2 md:grid-cols-2'>
								<TextInput
									label='Direccion'
									name='direccion'
									register={register}
									errors={errors}
									required
								/>
								
							</fieldset>
							<fieldset className='grid gap-4 md:grid-cols-2'>
                                <div>
                                <label htmlFor='is_dispacidad'>¿Tienes discapacidad?</label>
								  <select
									name='is_dispacidad'
									{...register('is_dispacidad', {
										required: 'Este campo es requerido',
									})}
									className='w-full select select-bordered'
								  >
									<option value='false'>No</option>
									<option value='true'>Si</option>
								  </select>
								  {errors.is_dispacidad && (
									<span className='mt-2 text-white badge badge-error badge-sm'>
										{errors.is_dispacidad.message}
									</span>
								   )}
                                </div>
                               
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
                            <fieldset className='grid gap-4 md:grid-cols-2'>
                                <div>
                                <label
										htmlfor='tipo_practica'
										className='text-sm '
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
										<option
											className='text-black'
											value=''
											disabled
											hidden
											selected
										></option>
										<option
											className='text-black'
											value='Pre-Profesionales'
										>
											Pre-Profesionales
										</option>
										<option
											className='text-black'
											value='Pasantias'
										>
											Pasantias
										</option>
										<option
											className='text-black'
											value='Comunitarias'
										>
											Comunitarias
										</option>
										<option
											className='text-black'
											value='Master'
										>
											Master
										</option>
									</select>
									{errors.tipo_practica && (
										<span className='text-white badge badge-error badge-sm'>
											{errors.tipo_practica.message}
										</span>
									)}
                                </div>
                               
								<div>
                                <label
										htmlfor='total_horas'
										className='text-sm'
									>
										Total de Horas
									</label>
									<input
										id='total_horas'
										type='number'
										max='240'
										label='Total_horas'
										name='total_horas'
										{...register('total_horas', {
											required: 'Este campo está vacío',
											maxLength: {
												value: 3,
												message: 'Solo se puede utilizar 3 digitos',
											},
										})}
										className='w-full mt-1 text-sm text-gray-900 input input-bordered input-ghost'
									/>

									{errors.total_horas && errors.total_horas.type === 'required' && (
										<span className='text-white badge badge-error badge-sm'></span>
									)}
									{errors.total_horas && errors.total_horas.type.maxLength !== 'value' && (
										<span className='text-white badge badge-error badge-sm'>
											{errors.total_horas.message}
										</span>
									)}
								</div>
							</fieldset>
                            {/* Curriculum Vitae */}
							<fieldset>
								<label htmlFor='curriculum'>Curriculum Vitae</label>
								<input
									name='curriculum'
									type='file'
									{...register('curriculum', {
										required: 'Este campo es requerido',
									})}
									className='w-full file-input file-input-bordered'
								/>
								{errors.curriculum && (
									<span className='mt-2 text-white badge badge-error badge-sm'>
										{errors.curriculum.message}
									</span>
								)}
							</fieldset>
							{/* <fieldset className='grid'>
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
							</fieldset> */}
							<fieldset className='flex items-center gap-4'>
								<button
									type='submit'
									className='flex-1 btn btn-primary'
								>
									Registrar Propuesta
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

export default ModalRegistroExterno;
