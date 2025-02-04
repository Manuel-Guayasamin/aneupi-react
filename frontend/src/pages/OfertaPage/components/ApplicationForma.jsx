import React from 'react';

const ApplicationFormModale = ({ showModal, setShowModal, handleSubmit, onSubmit, register, errors }) => {
	return (
		showModal && (
			<div className='fixed inset-0 z-50 grid p-2 overflow-auto bg-gray-900 bg-opacity-50 md:p-4 place-items-center'>
				<div className='modal-box'>
					<h3 className='mb-4 text-3xl font-bold text-center'>¡Aplica ya!</h3>
					<div>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className='grid w-full gap-2'
						>
							{/* ¿En qué área te gustaría trabajar? */}
							<fieldset>
								<label htmlFor='universidad'>Universidad o Institución</label>
								<input
									name='universidad'
									type='text'
									{...register('universidad', {
										required: 'Este campo es requerido',
									})}
									placeholder='Universidad de Cuenca, etc..'
									className='w-full text-sm input input-bordered'
								/>
								{errors.universidad && (
									<span className='mt-2 text-white badge badge-error badge-sm'>
										{errors.descripcion.message}
									</span>
								)}
							</fieldset>
							{/* ¿En qué área te gustaría trabajar? */}
							<fieldset>
								<label htmlFor='descripcion'>Carrera que estudia</label>
								<input
									name='descripcion'
									type='text'
									{...register('descripcion', {
										required: 'Este campo es requerido',
									})}
									placeholder='Psicologia, Software, etc..'
									className='w-full text-sm input input-bordered'
								/>
								{errors.descripcion && (
									<span className='mt-2 text-white badge badge-error badge-sm'>
										{errors.descripcion.message}
									</span>
								)}
							</fieldset>
							{/* País */}
							<div className='grid gap-4 md:grid-cols-2'>
								<fieldset>
									<label htmlFor='pais'>Países</label>
									<select
										name='pais'
										{...register('pais', {
											required: 'Este campo es requerido',
										})}
										className='w-full select select-bordered'
									>
										<option value="Africa">África</option>
										<option value='Argentina'>Argentina</option>
										<option value='Bolivia'>Bolivia</option>
										<option value='Brasil'>Brasil</option>
										<option value="Canada">Canada</option>
										<option value='Chile'>Chile</option>
										<option value="China">China</option>
										<option value='Colombia'>Colombia</option>
										<option value='Costa Rica'>Costa Rica</option>
										<option value='Cuba'>Cuba</option>
										<option value='Ecuador'>Ecuador</option>
										<option value='El Salvador'>El Salvador</option>
										<option value="Espania">España</option>
										<option value="Estados Unidos">Estados Unidos</option>
										<option value='Guatemala'>Guatemala</option>
										<option value='Haití'>Haití</option>
										<option value='Honduras'>Honduras</option>
										<option value="India">India</option>
										<option value='México'>México</option>
										<option value='Nicaragua'>Nicaragua</option>
										<option value='Panamá'>Panamá</option>
										<option value='Paraguay'>Paraguay</option>
										<option value='Perú'>Perú</option>
										<option value='República Dominicana'>República Dominicana</option>
										<option value="Rusia">Rusia</option>
										<option value='Uruguay'>Uruguay</option>
										<option value='Venezuela'>Venezuela</option>
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
							{/* Dirección */}
							<fieldset>
								<label htmlFor='direccion'>Dirección</label>
								<input
									name='direccion'
									type='text'
									{...register('direccion', {
										required: 'Este campo es requerido',
									})}
									placeholder='Dirección'
									className='w-full text-sm input input-bordered'
								/>
								{errors.direccion && (
									<span className='mt-2 text-white badge badge-error badge-sm'>
										{errors.direccion.message}
									</span>
								)}
							</fieldset>
							{/* WhatsApp */}
							<fieldset>
								<label htmlFor='telefono'>WhatsApp</label>
								<input
									name='telefono'
									type='text'
									{...register('telefono', {
										required: 'Este campo es requerido',
									})}
									placeholder='Agregar su código de su país, EJ: +593'
									className='w-full text-sm input input-bordered'
								/>
								{errors.telefono && (
									<span className='mt-2 text-white badge badge-error badge-sm'>
										{errors.telefono.message}
									</span>
								)}
							</fieldset>
							{/* ¿Eres Persona con Discapacidad? */}
							<fieldset>
								<label htmlFor='is_discapacidad'>¿Tiene alguna discapacidad?</label>
								<select
									name='is_discapacidad'
									{...register('is_discapacidad', {
										required: 'Este campo es requerido',
									})}
									className='w-full select select-bordered'
								>
									<option value='false'>No</option>
									<option value='true'>Si</option>
								</select>
								{errors.is_discapacidad && (
									<span className='mt-2 text-white badge badge-error badge-sm'>
										{errors.is_discapacidad.message}
									</span>
								)}
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
									className='w-full file:py-2 file:px-4 file:border-0 file:text-white file:bg-[#007bff] file:cursor-pointer mb-3'
								/>
								{errors.curriculum && (
									<span className='mt-2 text-white badge badge-error badge-sm'>
										{errors.curriculum.message}
									</span>
								)}
							</fieldset>
							{/* Enviar */}
							<fieldset className='flex items-center gap-2'>
								<button
									type='submit'
									className='flex-1 text-white btn btn-primary'
								>
									Enviar
								</button>
								<button
									className='btn btn-error'
									type='button'
									onClick={() => {
										setShowModal(false);
									}}
								>
									Cerrar
								</button>
							</fieldset>
						</form>
					</div>
				</div>
			</div>
		)
	);
};

export default ApplicationFormModale;
