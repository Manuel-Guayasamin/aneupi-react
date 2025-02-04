import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchModalidades } from '../../redux/slices/modalidadesSlice';
import { fetchEstados } from '../../redux/slices/estadosSlice';
import { fetchConvenios, updateConvenio } from '../../redux/slices/conveniosSlice';
import { fetchTipoConvenios } from '../../redux/slices/tipoconveniosSlice';

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

  const estados = useSelector((state) => state.estados.estados);
  const [showFile, setShowFile] = useState(false);
  const [seleccion, setSeleccion] = useState("");

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
    console.log(convenioData);
    try {
      dispatch(updateConvenio({ id: convenioSelected.id, convenioData })).then(() => {
        dispatch(fetchConvenios());
        closeModal();
      });
    } catch (error) {
      console.error('Error al actualizar el convenio:', error);
    }
  };

  const handleSeleccion = (event) => {
    setSeleccion(event.target.value);
    // console.log("click");
    // setSeleccion(event.target.value)
    // console.log(seleccion);
    // if (event.target.value == 2) {
    //   setShowFile(true);
    // } else {
    //   setShowFile(false);
    // }
  }

  useEffect(() => {
    // Establecer los valores del formulario cuando eventoSelected cambia
    if (convenioSelected) {
      Object.keys(convenioSelected).forEach((key) => {
        setValue(key, convenioSelected[key]);
      });
    }
  }, [setValue, convenioSelected]);

  return (
    showModal && (
      <div className='fixed inset-0 z-50 grid p-2 overflow-auto bg-gray-900 bg-opacity-50 md:p-4 place-items-center'>
        <div className='w-full max-w-lg bg-white rounded-lg shadow'>
          <div className='p-6 space-y-4'>
            <h1 className='text-xl font-bold leading-tight text-center text-gray-900'>Actualizar Estado del Convenio</h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='space-y-4'
              encType='multipart/form-data'
            >
              <div>
                <label
                  htmlFor='id_estado'
                  className='block text-base font-normal text-gray-900'
                >
                  Estado
                </label>
                <select
                  // value={seleccion}
                  // onChange={handleSeleccion}
                  className='w-full text-sm text-gray-900 input input-bordered input-ghost'
                  {...register('id_estado', {
                    required: 'Es obligatorio seleccionar un estado',
                  })}
                >
                  <option value=''>Selecciona un estado</option>
                  {estados.map((estado) => (
                    <option
                      key={estado.id}
                      value={estado.id}>
                      {estado.nombre}
                    </option>
                  ))}
                </select>
                {errors.id_estado && (
                  <span className='text-white badge badge-error badge-sm'>
                    {errors.id_estado.message}
                  </span>
                )}
              </div>

              {/* {showFile && (
                // Convenio Parcial (Para mostrar al público)
                <fieldset>
                  <label htmlFor='convenio_parcial'>Convenio Parcial</label>
                  <input
                    name='convenio_parcial'
                    type='file'
                    {...register('convenio_parcial', {
                      required: 'El documento es requerido',
                    })}
                    className='w-full file:py-2 file:px-4 file:border-0 file:text-white file:bg-[#00335f] file:cursor-pointer mb-3'
                  />
                  {errors.convenio_parcial && (
                    <span className='mt-2 text-white badge badge-error badge-sm'>
                      {errors.convenio_parcial.message}
                    </span>
                  )}
                </fieldset>
              )} */}

              <fieldset className='text-black text font-normal'>
                <label htmlFor='convenio_parcial' className='text font-normal'>Convenio Parcial</label>
                <input
                  name='convenio_parcial'
                  type='file'
                  {...register('convenio_parcial', {
                    required: 'El documento es requerido',
                  })}
                  className='w-full file:py-2 file:px-4 file:border-0 file:text-white file:bg-colorcito file:cursor-pointer mb-3 hover:file:text-colorcito hover:file:bg-white
                 dark:file:bg-blue-700 dark:hover:file:text-blue-700 dark:hover:file:bg-white file-input file-input-bordered'
                />
                {errors.convenio_parcial && (
                  <span className='mt-2 text-white badge badge-error badge-sm'>
                    {errors.convenio_parcial.message}
                  </span>
                )}
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

export default ModalActualizarConvenio;
