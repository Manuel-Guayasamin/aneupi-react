import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ApplicationFormModal = ({ showModal, setShowModal, handleSubmit, onSubmit, register, errors, tipoconvenios, modalidades, setDuracion, paises }) => {
  const today = new Date().toISOString().split('T')[0];

  const [fechaInicio, setFechaInicio] = useState('');
	const [fechaFin, setFechaFin] = useState('');

  const minFinDate = fechaInicio ? new Date(fechaInicio).setFullYear(new Date(fechaInicio).getFullYear() + 1) : new Date(today).setFullYear(new Date(today).getFullYear() + 1);
	const maxFinDate = fechaInicio ? new Date(fechaInicio).setFullYear(new Date(fechaInicio).getFullYear() + 5) : new Date(today).setFullYear(new Date(today).getFullYear() + 5);

  const min = new Date(minFinDate).toISOString().split('T')[0];
  const max = new Date(maxFinDate).toISOString().split('T')[0];

  const handleFechaInicioChange = (event) => {
		const nuevaFechaInicio = event.target.value;
		setFechaInicio(nuevaFechaInicio);
		fechaFin ? calcularDuracion(nuevaFechaInicio, fechaFin, setDuracion) : toast.warning('Seleccione la fecha de fin');
	};

	const handleFechaFinChange = (event) => {
		const nuevaFechaFin = event.target.value;
		setFechaFin(nuevaFechaFin);
		fechaInicio ? calcularDuracion(fechaInicio, nuevaFechaFin, setDuracion) : toast.warning('Seleccione la fecha de inicio');
	};

  // Función para calcular la duración entre las fechas
	const calcularDuracion = (inicio, fin, setDuracion) => {
		const fechaInicio = new Date(inicio);
		const fechaFin = new Date(fin);
		const diferenciaAnios = fechaFin.getFullYear() - fechaInicio.getFullYear();
		const diferenciaMeses = fechaFin.getMonth() - fechaInicio.getMonth();

		// Si la diferencia de meses es negativa, significa que el año de fechaInicio es mayor
		// que el año de fechaFin, por lo que restamos un año a la diferencia de años
		const duracionAnios = diferenciaMeses < 0 ? diferenciaAnios - 1 : diferenciaAnios;

		// Validamos que la duración cumpla con los requisitos mínimos y máximos
		if (duracionAnios < 1 || duracionAnios > 5) {
			setDuracion(0);
			toast.error('La duración del convenio debe ser de 1 a 5 años');
		} else {
			setDuracion(duracionAnios);
		}
	};

  const handleInput = (event) => {
		// Filtra el valor de entrada para permitir solo letras
		const inputValue = event.target.value;
		const filteredValue = inputValue.replace(/[^a-zA-Z\sáéíóúñ]/g, '');
		// Si el valor filtrado es diferente al valor de entrada, actualiza el valor del campo
		if (inputValue !== filteredValue) {
			event.target.value = filteredValue;
		}
	};

	return (
		showModal && (
			<div className='fixed inset-0 z-50 grid p-2 overflow-auto bg-gray-900 bg-opacity-50 md:p-4 place-items-center'>
				<div className='modal-box'>
					<h3 className='mb-4 text-2xl font-bold text-center'>Propuesta de Convenio</h3>
					<div>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className='grid w-full gap-2'
						>
							{/* Nombres y Apellidos */}
							<div className='grid gap-4 md:grid-cols-2'>
                {/* Nombres */}
                <fieldset>
                  <label htmlFor='nombres'>Nombres</label>
                  <input
                    name='nombres'
                    type='text'
                    {...register('nombres', {
                      required: 'Ingrese sus nombres',
                    })}
                    placeholder='Juan'
                    className='w-full text-sm input input-bordered'
                  />
                  {errors.nombres && (
                    <span className='mt-2 text-white badge badge-error badge-sm'>
                      {errors.nombres.message}
                    </span>
                  )}
                </fieldset>
                {/* Apellidos */}
                <fieldset>
                  <label htmlFor='apellidos'>Apellidos</label>
                  <input
                    name='apellidos'
                    type='text'
                    {...register('apellidos', {
                      required: 'Ingrese sus apellidos',
                    })}
                    placeholder='Pérez'
                    className='w-full text-sm input input-bordered'
                  />
                  {errors.apellidos && (
                    <span className='mt-2 text-white badge badge-error badge-sm'>
                      {errors.apellidos.message}
                    </span>
                  )}
                </fieldset>
							</div>

              {/* Teléfono y Correo */}
							<div className='grid gap-4 md:grid-cols-2'>
                <fieldset>
                  <label htmlFor='telefono'>Teléfono</label>
                  <input
                    name='telefono'
                    type='text'
                    {...register('telefono', {
                      required: 'Ingrese su número de teléfono',
                    })}
                    // placeholder='09'
                    className='w-full text-sm input input-bordered'
                  />
                  {errors.telefono && (
                    <span className='mt-2 text-white badge badge-error badge-sm'>
                      {errors.telefono.message}
                    </span>
                  )}
                </fieldset>
                <fieldset>
                  <label htmlFor='email'>Email</label>
                  <input
                    name='email'
                    type='text'
                    {...register('email', {
                      required: 'Ingrese su email',
                    })}
                    placeholder='juan@gmail.com'
                    className='w-full text-sm input input-bordered'
                  />
                  {errors.email && (
                    <span className='mt-2 text-white badge badge-error badge-sm'>
                      {errors.email.message}
                    </span>
                  )}
                </fieldset>
							</div>

              {/* Tipo de Convenio */}
              <fieldset>
                <label
                  htmlFor='id_tipoconvenio'
                  // className='inline-block mb-2 text-sm text-indigo-800 sm:text-base'
                >
                  Tipo de convenio
                </label>
                <select
                  {...register('id_tipoconvenio', {
                    required: 'Seleccione un tipo de convenio',
                  })}
                  id='id_tipoconvenio'
                  className='w-full text-sm input input-bordered'
                >
                  {/* Agregar opciones para el menú desplegable */}
                  <option value=''>Seleccione una opción</option>
                  {tipoconvenios.map((tipoconvenio) => (
                    <option key={tipoconvenio.id} value={tipoconvenio.id}>
                      {tipoconvenio.nombre}
                    </option>
                  ))}
                </select>

                {errors.id_tipoconvenio && (
                  <p className='mt-1 text-white badge badge-error badge-sm'>{errors.id_tipoconvenio.message}</p>
                )}
              </fieldset>

              {/* Fecha de inicio y fecha de fin */}
							<div className='grid gap-4 md:grid-cols-2'>
                {/* Fecha de inicio */}
								<fieldset>
                  <label
                    htmlFor='fecha_inicio'
                    // className='inline-block mb-2 text-sm text-indigo-800 sm:text-base'
                  >
                    Fecha de inicio
                  </label>
                  <input
                    {...register('fecha_inicio', {
                      required: 'Seleccione fecha de inicio',
                    })}
                    type='date'
                    id='fecha_inicio'
                    className='w-full text-sm input input-bordered'
                    min={today}
                    onChange={handleFechaInicioChange}
                  />
                {errors.fecha_inicio && (
                  <p className='mt-1 text-white badge badge-error badge-sm'>{errors.fecha_inicio.message}</p>
                )}
								</fieldset>
								{/* Fecha de fin */}
								<fieldset>
                  <label
                    htmlFor='fecha_fin'
                    // className='inline-block mb-2 text-sm text-indigo-800 sm:text-base'
                  >
                    Fecha de fin
                  </label>
                  <input
                    {...register('fecha_fin', {
                      required: 'Seleccione fecha de fin',
                    })}
                    type='date'
                    id='fecha_fin'
                    className='w-full text-sm input input-bordered'
                    min={min}
                    max={max}
                    onChange={handleFechaFinChange}
                  />
                  {errors.fecha_fin && (
                    <p className='mt-1 text-white badge badge-error badge-sm'>{errors.fecha_fin.message}</p>
                  )}
								</fieldset>
							</div>

              {/* Nombre de la organización */}
              <fieldset>
                <label
                  htmlFor='nombreOrganizacion'
                  // className='block mb-2 text-sm text-indigo-800 sm:text-base'
                >
                  Nombre de la Organización
                </label>
                <input
                  {...register('nombreOrganizacion', { required: 'Ingrese el nombre de la organización' })}
                  type='text'
                  id='nombreOrganizacion'
                  className='w-full text-sm input input-bordered'
                  onInput={handleInput}
                />
                {errors.nombreOrganizacion && (
                  <p className='mt-1 text-white badge badge-error badge-sm'>{errors.nombreOrganizacion.message}</p>
                )}
              </fieldset>

              {/* Descripción de las actividades de la organización */}
              <fieldset>
                <label
                  htmlFor='descripcion'
                  // className='block mb-2 text-sm text-indigo-800 sm:text-base'
                >
                  Descripción
                </label>
                <textarea
                  {...register('descripcion', { required: 'Ingrese la descripción' })}
                  id='descripcion'
                  className='w-full resize-none textarea textarea-bordered'
                />
                {errors.descripcion && (
                  <p className='mt-1 text-white badge badge-error badge-sm'>{errors.descripcion.message}</p>
                )}
              </fieldset>

              {/* Modalidad y país */}
							<div className='grid gap-4 md:grid-cols-2'>
                {/* Modalidad */}
                <fieldset>
                  <label
                    htmlFor='modalidad'
                    // className='inline-block mb-2 text-sm text-indigo-800 sm:text-base'
                  >
                    Modalidad
                  </label>
                  <select
                    {...register('id_modalidad', {
                      required: 'Seleccione una modalidad',
                    })}
                    id='id_modalidad'
                    className='w-full text-sm input input-bordered'
                  >
                    {/* Agregar opciones para el menú desplegable */}
                    <option value=''>Seleccione una opción</option>
                    {modalidades.map((modalidad) => (
                      <option key={modalidad.id} value={modalidad.id}>
                        {modalidad.nombre}
                      </option>
                    ))}
                  </select>
                  {errors.id_modalidad && (
                    <p className='mt-1 text-white badge badge-error badge-sm'>{errors.id_modalidad.message}</p>
                  )}
                </fieldset>

                {/* País */}
                <fieldset>
                  <label
                    htmlFor='id_pais'
                    // className='inline-block mb-2 text-sm text-indigo-800 sm:text-base'
                  >
                    País
                  </label>
                  <select
                    {...register('id_pais', {
                      required: 'Seleccione un país',
                    })}
                    id='id_pais'
                    className='w-full text-sm input input-bordered'
                  >
                    {/* Agregar opciones para el menú desplegable */}
                    <option value=''>Seleccione un país</option>
                    {paises.map((pais) => (
                      <option key={pais.id} value={pais.id}>
                        {pais.nombre}
                      </option>
                    ))}
                  </select>
                  {errors.id_pais && (
                    <p className='mt-1 text-white badge badge-error badge-sm'>{errors.id_pais.message}</p>
                  )}
                </fieldset>
              </div>

              {/* Documento de propuesta de convenio */}
							<fieldset>
								<label htmlFor='propuesta'>Propuesta de Convenio</label>
								<input
									name='propuesta'
									type='file'
									{...register('propuesta', {
										required: 'El documento es requerido',
									})}
									className='w-full file:py-2 file:px-4 file:border-0 file:text-white file:bg-[#00335f] file:cursor-pointer mb-3'
								/>
								{errors.propuesta && (
									<span className='mt-2 text-white badge badge-error badge-sm'>
										{errors.propuesta.message}
									</span>
								)}
							</fieldset>

							{/* Enviar */}
							<fieldset className='flex items-center gap-2'>
								<button
									type='submit'
									className='flex-1 text-white btn bg-colorcito hover:bg-colorcito'
								>
									Enviar
								</button>
								<button
									className='btn color-secundario color-secundario-hover'
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

export default ApplicationFormModal;
