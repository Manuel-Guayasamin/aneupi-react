import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEstados } from '../../redux/slices/estadosSlice';
import { fetchPostulantes, updatePostulante } from '../../redux/slices/postulantesSlice';


const ModalActualizarPostula = ({ showModal, closeModal, pasanteSelected }) => {
  const dispatch = useDispatch();

  const estados = useSelector((state) => state.estados.estados);
  // console.log(pasanteSelected)

  useEffect(() => {
    dispatch(fetchEstados());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({});

  const onSubmit = async (postulanteData) => {
    try {
      const payload = {
        ...postulanteData,
        pais_id: postulanteData.pais_id,
        modalidad_id: postulanteData.modalidad_id,
      };

      dispatch(updatePostulante({ id: pasanteSelected.id, postulanteData: payload })).then(() => {
        dispatch(fetchPostulantes());
        closeModal();
      });
    } catch (error) {
      console.error('Error al actualizar:', error);
    }
  };


  useEffect(() => {
    // Establecer los valores del formulario cuando eventoSelected cambia
    if (pasanteSelected) {
      Object.keys(pasanteSelected).forEach((key) => {
        setValue(key, pasanteSelected[key]);
      });
      // Establecer la empresa por defecto
      if (!pasanteSelected.empresa) {
        setValue('empresa', 'Fundacion ANEUPI');
      }
    } else {
      // Si no hay solicitudSelected, establecer la empresa por defecto
      reset({ empresa: 'Fundacion ANEUPI' });
    }
  }, [setValue, reset, pasanteSelected]);



  return (
    showModal && (
      <div className='fixed inset-0 z-50 grid p-2 overflow-auto bg-gray-900 bg-opacity-50 md:p-4 place-items-center'>
        <div className='w-full max-w-lg bg-white rounded-lg shadow'>
          <div className='p-6 space-y-4'>
            <h1 className='text-xl font-bold leading-tight text-center text-gray-900'>Actualizar Estado del postulante</h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='space-y-4'
              encType='multipart/form-data'
            >
              <div>
                <label
                  htmlFor='empresa'
                  className='block text-sm font-medium text-gray-900'
                >
                  Empresa
                </label>
                <select

                  name='empresa'
                  id="empresa"
                  className='w-full text-sm input input-bordered input-ghost text-gray-900'
                  {...register('empresa', {
                    required: 'La empresa es obligatoria',
                    validate: (value) => value !== '' || 'Debes seleccionar una empresa',
                  })}
                >
                  <option value=''>Selecciona la Empresa</option>
                  <option value='Fundación ANEUPI'>Fundación ANEUPI</option>
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
                    required: 'Es obligatorio seleccionar un estado',
                  })}
                >
                  <option value=''>Selecciona un estado</option>
                  {estados.map((estado) => (
                    <option key={estado.id} value={estado.id}>
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
              <fieldset className='flex justify-end items-center gap-4'>
                <button
                  type='submit'
                  // className='flex-1 text-white btn btn-primary'
                  className="px-20 py-3 text-white rounded-lg bg-colorcito hover:text-colorcito border border-transparent
                  hover:border-colorcito hover:bg-white hover:shadow-lg hover:shadow-gray-500 dark:bg-blue-700 dark:text-white 
                  dark:hover:bg-white dark:hover:text-blue-700 dark:hover:border-blue-700"
                >
                  Actualizar Solicitud
                </button>
                <button
                  type='button'
                  // className='btn btn-error'
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

export default ModalActualizarPostula;
