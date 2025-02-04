import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServicioLineas, updateServicioLinea } from '../../redux/slices/serviciolineasSlice';
import { getAllPaises, updatePais } from '../../redux/slices/paisesSlice';

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

const ModalActualizarPais = ({ showModal, closeModal, paisSelected }) => {
	const dispatch = useDispatch();
	const paises = useSelector((state) => state.usuarios.usuarios);

	useEffect(() => {
		dispatch(getAllPaises());
	}, [dispatch]);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm();

	const onSubmit = async (data) => {
		try {
			dispatch(updatePais({ id: paisSelected.id, paisData: data })).then(() => {
				dispatch(getAllPaises());
				closeModal();
			});
		} catch (error) {
			console.error('Error al actualizar país:', error);
		}
	};

	useEffect(() => {
		if (paisSelected) {
			Object.keys(paisSelected).forEach((key) => {
				setValue(key, paisSelected[key]);
			});
		}
	}, [setValue, paisSelected]);

	return (
		showModal && (
			<div className='fixed inset-0 z-50 grid p-2 overflow-auto bg-gray-900 bg-opacity-50 md:p-4 place-items-center'>
				<div className='w-full max-w-lg bg-white rounded-lg shadow'>
					<div className='p-6 space-y-4'>
						<h1 className='text-xl font-bold leading-tight text-center text-gray-900'>Actualizar País</h1>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className='space-y-4'
							encType='multipart/form-data'
						>
							<fieldset className='grid gap-2'>
								<TextInput
									label="Nombre"
									name="nombre"
									register={register}
									errors={errors}
									required
								/>
							</fieldset>

							<fieldset className="grid gap-2">
								<TextInput
									label="Código Telefónico"
									name="tlf_code"
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
									Actualizar País
								</button>
								<button
									type='button'
									className="px-12 py-3 text-red-700 bg-white rounded-lg  border border-transparent
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

export default ModalActualizarPais;
