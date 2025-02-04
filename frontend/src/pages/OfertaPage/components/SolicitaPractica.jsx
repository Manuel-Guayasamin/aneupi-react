import React from 'react';

const SolicitaPractica = ({ showModal, setShowModal, handleSubmit, onSubmit, register, errors }) => {
  return (
    showModal && (
      <div className='fixed inset-0 z-50 grid p-2 overflow-auto bg-gray-900 bg-opacity-50 md:p-4 place-items-center'>
        <div className='modal-box'>
          <h3 className='mb-4 text-2xl font-bold text-center'>Solicitud</h3>
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='grid w-full gap-2'
            >
              {/* ¿En qué área te gustaría trabajar? */}
              <fieldset>
                <label htmlFor='universidad'>¿De que Universidad vienes?</label>
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
              {/*
              // MARK: Carrera
              */}
              <fieldset>
                <label htmlFor='descripcion'>¿De que Carrera eres?</label>
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
              {/*
              // MARK: Pais y Ciudad
              */}
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
              {/*
              // MARK: Dirección
              */}
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
              {/*
              // MARK: WhatsApp
              */}
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
              {/*
              // MARK: Discapacidad?
              */}
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
              {/*
              // MARK: Hoja de Vida
              */}
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

export default SolicitaPractica;
