import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateCiudad, fetchCiudades } from '../../redux/slices/ciudadesSlice';


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

const ModalActualizarCiudad = ({ showModal, closeModal, ciudadSelected }) => {
    const dispatch = useDispatch();
    const paises = useSelector((state) => state.paises.paises);
    console.log(ciudadSelected);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    const onSubmit = async (data) => {
        try {
            dispatch(updateCiudad({ id: ciudadSelected.id, CiudadData: data })).then(() => {
                dispatch(fetchCiudades());
                closeModal();
            });
        } catch (error) {
            console.error('Error al actualizar ciudad:', error);
        }
    };


    useEffect(() => {
        if (ciudadSelected) {
            Object.keys(ciudadSelected).forEach((key) => {
                setValue(key, ciudadSelected[key]);
            });
        }
    }, [setValue, ciudadSelected]);

    return (
        showModal && (
            <div className='fixed inset-0 z-50 grid p-2 overflow-auto bg-gray-900 bg-opacity-50 md:p-4 place-items-center'>
                <div className='w-full max-w-lg bg-white rounded-lg shadow'>
                    <div className='p-6 space-y-4'>
                        <h1 className='text-xl font-bold leading-tight text-center text-gray-900'>Actualizar Ciudad</h1>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className='space-y-4'
                            encType='multipart/form-data'
                        >
                            <fieldset className='grid gap-2 md:grid-cols-2'>
                                <TextInput
                                    label='Nombre'
                                    name='nombre'
                                    type='text'
                                    register={register}
                                    errors={errors}
                                    required
                                />
                                <TextInput
                                    label='Zona Horaria'
                                    name='zona_horaria'
                                    type='text'
                                    register={register}
                                    errors={errors}
                                    required
                                />
                            </fieldset>
                            <fieldset className='grid gap-2'>
                                <div>
                                    <label
                                        htmlFor='pais_id'
                                        className='block text-sm font-medium text-gray-900'
                                    >
                                        Pais
                                    </label>
                                    <select
                                        id='pais_id'
                                        className='w-full mt-1 text-sm text-gray-900 select select-bordered select-ghost'
                                        {...register('pais_id', {
                                            required: 'Pais es obligatorio',
                                        })}
                                    >
                                        <option value=''>Seleccione un Pais</option>
                                        {paises
                                            .map((pais) => (
                                                <option
                                                    key={pais.id}
                                                    value={pais.id}
                                                >
                                                    {pais.nombre}
                                                </option>
                                            ))}
                                    </select>
                                    {errors.pais_id && (
                                        <span className='mt-2 text-white badge badge-error badge-sm'>
                                            {errors.pais_id.message}
                                        </span>
                                    )}
                                </div>
                            </fieldset>
                            <fieldset className='flex items-center gap-4'>
                                <button
                                    type='submit'
                                    className='flex-1 text-white btn btn-primary'
                                >
                                    Actualizar Ciudad
                                </button>
                                <button
                                    type='button'
                                    className='text-white btn btn-error'
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
}

export default ModalActualizarCiudad;
