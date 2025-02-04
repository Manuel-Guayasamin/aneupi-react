import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllReporte, updateReporte } from '../../redux/slices/reporteSlice';
import { fetchEstadoReportes } from '../../redux/slices/estadoReporteSlice';



const ModalActualizarReporte = ({ showModal, closeModal, reporteSelected }) => {
  const dispatch = useDispatch();

  const estados = useSelector((state) => state.estadosReportes.estadosReportes);

  useEffect(() => {
    dispatch(fetchEstadoReportes());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({});

  const onSubmit = async (reporteData) => {
    try {
      const payload = {
        ...reporteData,
      };

      dispatch(updateReporte({ id: reporteSelected.id, reporteData: payload })).then(() => {
        dispatch(fetchAllReporte());
        closeModal();
      });
    } catch (error) {
      console.error('Error al actualizar:', error);
    }
  };


  useEffect(() => {
    // Establecer los valores del formulario cuando eventoSelected cambia
    if (reporteSelected) {
      Object.keys(reporteSelected).forEach((key) => {
        setValue(key, reporteSelected[key]);
      });
    }
  }, [setValue, reporteSelected]);

  return (
    showModal && (
      <div className='fixed inset-0 z-50 grid p-2 overflow-auto bg-gray-900 bg-opacity-50 md:p-4 place-items-center'>
        <div className='w-full max-w-lg bg-white rounded-lg shadow'>
          <div className='p-6 space-y-4'>
            <h1 className='text-xl font-bold leading-tight text-center text-gray-900'>Actualizar Estado de la Denuncia</h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='space-y-4'
              encType='multipart/form-data'
            >

              <div>
                <label
                  htmlFor='estado_id'
                  className='block text-sm font-medium text-gray-900'
                >
                  Estado
                </label>
                <select
                  className='w-full text-sm text-gray-900 input input-bordered input-ghost'
                  {...register('estado_id', {
                    required: 'Es obligatorio seleccionar un estado',
                  })}
                >
                  <option value=''>Selecciona un estado</option>
                  {estados.map((estado) => (
									  <option
                      key={estado.id}
											value={estado.id}
										>
										  {estado.nombre}
										</option>
											))}
                </select>
                {errors.estado_id && (
                  <span className='text-white badge badge-error badge-sm'>
                    {errors.estado_id.message}
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

export default ModalActualizarReporte;
