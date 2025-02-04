import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { fetchModalidades } from '../../redux/slices/modalidadesSlice';
import { fetchTrabajos, updateTrabajo } from '../../redux/slices/trabajosSlice';

const TextInput = ({ label, name, type = 'text', register, errors, required, max = '50' }) => (
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
			maxLength={max}
			className={`w-full text-sm input input-bordered input-ghost text-gray-900`}
			placeholder={label}
			{...register(name, { required: required ? 'Este campo es obligatorio' : false })}
		/>
		{errors[name] && <span className='text-xs text-red-600'>{errors[name].message}</span>}
	</div>
);

const ModalActualizarTrabajo = ({ showModal, closeModal, trabajoSelected }) => {
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

	const onSubmit = async (trabajoData) => {
		try {
			dispatch(updateTrabajo({ id: trabajoSelected.id, trabajoData })).then(() => {
				dispatch(fetchTrabajos());
				closeModal();
			});
		} catch (error) {
			console.error('Error al actualizar trabajo:', error);
		}
	};

	useEffect(() => {
		// Establecer los valores del formulario cuando eventoSelected cambia
		if (trabajoSelected) {
			Object.keys(trabajoSelected).forEach((key) => {
				setValue(key, trabajoSelected[key]);
			});
		}
	}, [setValue, trabajoSelected]);

	return (
		showModal && (
			<div className='fixed inset-0 z-50 grid p-2 overflow-auto bg-gray-900 bg-opacity-50 md:p-4 place-items-center'>
				<div className='w-full max-w-lg bg-white rounded-lg shadow'>
					<div className='p-6 space-y-4'>
						<h1 className='text-xl font-bold leading-tight text-center text-gray-900'>Actualizar Trabajo</h1>
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
										className='w-full mt-1 text-sm text-gray-900 input input-bordered input-ghost'
										{...register('empresa', {
											required: 'Empresa es obligatoria',
										})}
									>
										<option value='Fundacion ANEUPI'>Fundación ANEUPI</option>
										<option value='Academia ANEUPI'>Academia ANEUPI</option>
										<option value='Institución Financiera ANEUPI'>Institución Financiera ANEUPI</option>
										<option value='Constructora LECENI'>Constructora LECENI</option>
									</select>
									{errors.empresa && (
										<span className='text-white badge badge-error badge-sm'>
											{errors.empresa.message}
										</span>
									)}
								</div>
								<TextInput
									label='Departamento'
									name='departamento'
									register={register}
									errors={errors}
									required
								/>
							</fieldset>
							<fieldset className='grid gap-2'>
								<TextInput
									label='Cargo'
									name='cargo'
									register={register}
									errors={errors}
									required
								/>
							</fieldset>
							<fieldset className='grid gap-2'>
								<TextInput
									label='Horario'
									name='horario'
									register={register}
									errors={errors}
									required
								/>
							</fieldset>
							<fieldset className='flex items-center gap-4'>
								<button
									type='submit'
									className="px-20 py-3 text-white rounded-lg bg-colorcito hover:text-colorcito border border-transparent
                 					hover:border-colorcito hover:bg-white hover:shadow-lg hover:shadow-gray-500 dark:bg-blue-700 dark:text-white 
                  					dark:hover:bg-white dark:hover:text-blue-700 dark:hover:border-blue-700"
								>
									Actualizar Trabajo
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

export default ModalActualizarTrabajo;
