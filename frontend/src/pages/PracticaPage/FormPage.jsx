import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchModalidades } from '../../redux/slices/modalidadesSlice';

function FormPage({ titulo }) {
	const dispatch = useDispatch();
	const today = new Date().toISOString().split('T')[0];

	//const inscripcionRealizada = useSelector((state) => state.practica.inscripcionRealizada);
	const usuario = useSelector((state) => state.authentication.usuario);
	const modalidades = useSelector((state) => state.modalidades.modalidades);
	const [inputValue, setInputValue] = useState('');

	const handleInputChange = (e) => {
		// Permitir solo letras y espacios en blanco
		const value = e.target.value.replace(/[^A-Za-z\s]/g, '');
		setInputValue(value);
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm();

	const onSubmit = (data) => {
		if (usuario) data.id_usuario = usuario.id;
		//data.codigo = '2024'
		console.log(data);

		/* 	dispatch(guardarPractica(data));
		reset();
 */
		//toast.success("Usuario inscrito correctamente");
	};

	useState(() => {
		setValue('nombres', usuario?.nombres || '');
		setValue('apellidos', usuario?.apellidos || '');
		setValue('email', usuario?.email || '');
		setValue('telefono', usuario?.telefono || '');
	}, [usuario, setValue]);

	useEffect(() => {
		dispatch(fetchModalidades());
	}, [dispatch]);

	return (
		<div className='h-full min-h-screen p-4 mt-10'>
			<div className='flex flex-col items-center justify-center h-full max-w-screen-xl gap-10 mx-auto text-white'>
				<div className='w-full bg-indigo-900 rounded-lg shadow md:mt-0 sm:max-w-xl xl:p-0'>
					<div className='p-4 space-y-4 md:space-y-6 sm:p-6'>
						<h1 className='py-4 text-2xl font-bold leading-tight tracking-tight text-center text-white truncate md:text-3xl'>
							Realizar tus Prácticas
						</h1>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className='px-4 space-y-6'
						>
							<fieldset className='grid gap-6 md:grid-cols-2'>
								<div className='items-center justify-center text-base rounded-md '>
									<label
										htmlFor='nombres'
										className='text-sm'
									>
										Nombres
									</label>
									<input
										type='text'
										id='nombres'
										label='Nombres'
										name='nombres'
										{...register('nombres', { required: 'Sus nombres completos' })}
										className='bg-transparent input-bordered !ring-white !border-2 border-white rounded-md input mt-1 w-full'
									/>
									{errors.nombres && (
										<span className='text-white badge badge-error badge-sm'>
											{errors.nombres.message}
										</span>
									)}
								</div>

								<div className='items-center justify-center text-base rounded-md '>
									<label
										htmlFor='apellidos'
										className='text-sm'
									>
										Apellidos
									</label>
									<input
										type='text'
										id='apellidos'
										label='Apellidos'
										name='apellido'
										{...register('apellidos', { required: 'Sus apellidos completos' })}
										className='bg-transparent input-bordered !ring-white !border-2 border-white rounded-md input mt-1 w-full'
									/>
									{errors.apellidos && (
										<span className='text-white badge badge-error badge-sm'>
											{errors.apellidos.message}
										</span>
									)}
								</div>
							</fieldset>

							<fieldset className='grid gap-6 md:grid-cols-2'>
								{/* Correo Electrónico */}
								<div className='items-center justify-center text-base rounded-md '>
									<label
										htmlFor='email'
										className='text-sm '
									>
										Correo
									</label>
									<input
										id='email'
										label='Email'
										name='email'
										type='email'
										{...register('email', { required: true })}
										className='bg-transparent input-bordered !ring-white !border-2 border-white rounded-md input mt-1 w-full'
									/>
									{errors.email && (
										<span className='text-white badge badge-error badge-sm'>
											Este campo es requerido
										</span>
									)}
								</div>

								{/* Universidad */}
								<div className='items-center justify-center text-base rounded-md '>
									<label
										htmlfor='universidad'
										className='text-sm '
									>
										Universidad
									</label>
									<input
										id='universidad'
										label='Universidad'
										name='universidad'
										{...register('universidad', {
											required: 'Universidad de las practicas es obligatorio',
										})}
										value={inputValue}
										onChange={handleInputChange}
										className='bg-transparent input-bordered !ring-white !border-2 border-white rounded-md input mt-1 w-full'
									/>
									{errors.universidad && (
										<span className='text-white badge badge-error badge-sm'>
											{errors.universidad.message}
										</span>
									)}
								</div>
							</fieldset>

							<fieldset className='grid gap-6 md:grid-cols-2'>
								<div className='items-center justify-center text-base rounded-md '>
									<label
										htmlfor='fecha_inicio'
										className='text-sm '
									>
										Fecha de Inicio
									</label>
									<input
										id='fecha_inicio'
										label='Fecha_inicio'
										name='fecha_inicio'
										{...register('fecha_inicio', { required: 'Fecha de inicio es obligatoria' })}
										className='bg-transparent input-bordered !ring-white !border-2 border-white rounded-md input mt-1 w-full'
										type='date'
										min={today}
									/>
									{errors.fecha_inicio && (
										<span className='text-white badge badge-error badge-sm'>
											{errors.fecha_inicio.message}
										</span>
									)}
								</div>

								<div className='items-center justify-center text-base rounded-md'>
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
										className='bg-transparent input-bordered !ring-white !border-2 border-white rounded-md input mt-1 w-full'
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
							</fieldset>

							<fieldset className='grid gap-6 md:grid-cols-2'>
								{/* Telefono*/}
								<div className='items-center justify-center text-base rounded-md'>
									<label
										htmlfor='telefono'
										className='text-sm'
									>
										Telefono
									</label>
									<input
										type='text'
										id='telefono'
										label='Telefono'
										name='telefono'
										{...register('telefono', { required: 'Se requiere el numero de telefono' })}
										className='bg-transparent input-bordered !ring-white !border-2 border-white rounded-md input mt-1 w-full'
									/>
									{errors.telefono && (
										<span className='text-white badge badge-error badge-sm'>
											{errors.telefono.message}
										</span>
									)}
								</div>

								{/* Total de Horas*/}
								<div className='items-center justify-center text-base rounded-md '>
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
										className='bg-transparent input-bordered !ring-white !border-2 border-white rounded-md input mt-1 w-full'
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
							{/* Modalidad*/}
							<div className='items-center justify-center text-base rounded-md'>
								<label
									htmlfor='id_modalidad'
									className='text-sm'
								>
									Modalidad
								</label>
								<select
									id='id_modalidad'
									name='id_modalidad'
									{...register('id_modalidad', {
										required: 'Tipo de modalidad de realizar practicas',
									})}
									className='bg-transparent input-bordered !ring-white !border-2 border-white rounded-md input mt-1 w-full'
								>
									{modalidades.map((modalidad) => (
										<option
											key={modalidad.id}
											value={modalidad.id}
											className='text-black'
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

							{/* Boton*/}
							<div className='flex flex-1 gap-2 p-6 mx-auto md:p-8 md:gap-4'>
								<button
									type='submit'
									className='w-3/6 text-center text-white truncate btn btn-success'
								>
									Enviar Formulario
								</button>

								<a
									className='w-3/6 mx-auto text-sm text-center text-white truncate btn btn-error'
									href='/convenios/practicas-pasantias'
									rel='noreferrer'
								>
									Regresar
								</a>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

FormPage.propTypes = {
	titulo: PropTypes.string.isRequired,
};

export default FormPage;
