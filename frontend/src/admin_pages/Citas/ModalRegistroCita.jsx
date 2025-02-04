import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServiciosCitas, createServicioCita } from '../../redux/slices/serviciocitasSlice'
import { fetchModalidades } from '../../redux/slices/modalidadesSlice';
import { fetchCiudades } from '../../redux/slices/ciudadesSlice';
import { getAllPaises } from '../../redux/slices/paisesSlice';
import { fetchEstados } from '../../redux/slices/estadosSlice';

const TextInput = ({ label, name, type = 'text', register, errors, required, min, defaultValue, max }) => (
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
            {...register(name, {
                required: required ? 'Este campo es obligatorio' : false,
                min: min || undefined, // Use min validation rule if min prop is provided
                max: max || undefined,
            })}
            min={min} // Set min attribute if min prop is provided
            defaultValue={defaultValue}
        />
        {errors[name] && <span className='text-xs text-red-600'>{errors[name].message}</span>}
    </div>
);

const ModalRegistroCita = ({ showModal, closeModal, idServicio, setShowNotification }) => {
    const dispatch = useDispatch();
    const modalidades = useSelector((state) => state.modalidades.modalidades);
    const paises = useSelector((state) => state.paises.paises);
    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        dispatch(fetchModalidades());
        dispatch(fetchServiciosCitas());
        dispatch(fetchCiudades());
        dispatch(fetchEstados());
        dispatch(getAllPaises());
    }, [dispatch]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();


    const onSubmit = async (data) => {
        try {
            // Obtener la fecha y hora del formulario
            const fecha = new Date(data.fecha);
            const hora = data.hora;
            const date = new Date();
            const [hours, minutes] = hora.split(':').map(Number);
            date.setHours(hours, minutes);

            // Agregar 1 hora a fecha de fin
            date.setHours(date.getHours() + 1)

            // Formatear la nueva hora en el formato 'HH:mm'
            const nuevaHora = date.toTimeString().slice(0, 5);

            //Se extrae los campos de acuerdo a la zona horaria
            const year = fecha.getUTCFullYear();
            const month = fecha.getUTCMonth() + 1;
            const day = fecha.getUTCDate();

            // Formatear la fecha y hora
            const fechaFormateada = `${year}-${month}-${day} ${hora}:00`;
            const fechaFinFormateada = `${year}-${month}-${day} ${nuevaHora}:00`;

            // Crear el objeto con los datos a enviar
            const submitData = { ...data, fecha_inicio: fechaFormateada, fecha_fin: fechaFinFormateada };

            delete submitData.fecha; //Se elimina esos campos porque solo se requiere fecha de inicio y fin
            delete submitData.hora;

            // Ejecutar la acción para crear el servicio de cita
            dispatch(createServicioCita(submitData)).then((data) => {
                dispatch(fetchServiciosCitas());
                closeModal();
                if (!data.error) {
                  setShowNotification(true);
                }
            });
        } catch (error) {
            console.error('Error al crear cita:', error);
        }
    };

    useEffect(() => {
        reset();
    }, [reset, showModal]);

    return (
        showModal && (
            <div className='fixed inset-0 z-50 grid p-2 overflow-auto bg-gray-900 bg-opacity-50 md:p-4 place-items-center'>
                <div className='w-full max-w-lg bg-white rounded-lg shadow'>
                    <div className='p-6 space-y-4'>
                        <h1 className='text-xl font-bold leading-tight text-center text-gray-900'>
                            Agenda tu cita
                        </h1>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className='space-y-4'
                            encType='multipart/form-data'
                        >
                            <fieldset className='grid gap-2 md:grid-cols-2'>
                                <input
                                    type="hidden"
                                    {...register('id_servicio_linea', { value: idServicio })}
                                />
                                <TextInput
                                    label='Nombre Solicitante'
                                    name='solicitante_nombre' //campo relacionado a la bd
                                    register={register}
                                    errors={errors}
                                    required
                                />
                                <TextInput
                                    type='number'
                                    label='Telefono'
                                    name='solicitante_telefono'
                                    register={register}
                                    errors={errors}
                                    required
                                />
                                <TextInput
                                    label='Email'
                                    name='solicitante_email'
                                    type='email'
                                    register={register}
                                    errors={errors}
                                    required
                                />
                                <TextInput
                                    label='Dia de cita'
                                    name='fecha' //la fecha de inicio de la cita no puede ser menor a la fecha actual
                                    type='date'
                                    register={register}
                                    errors={errors}
                                    required
                                    min={today}
                                />
                                <TextInput
                                    label='Hora de cita'
                                    name='hora'
                                    type='time'
                                    register={register}
                                    errors={errors}
                                    required
                                />
                                {/*                               <div className="mt-1">
                                    <input
                                        type='time'
                                        {...register}
                                        className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                    />
                                    {errors && <span className="text-red-500">Campo requerido</span>}
                                </div> */}
                                <div>
                                    <label htmlFor='pais_id' className='block text-sm font-medium text-gray-900'>
                                        Pais
                                    </label>
                                    <select
                                        className='w-full mt-1 text-sm text-gray-900 input input-bordered input-ghost'
                                        {...register('pais_id', { required: 'País obligatorio' })}
                                    >
                                        {paises.map((pais) => (
                                            <option key={pais.id} value={pais.id}>
                                                {pais.nombre}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.pais_id && (
                                        <span className='text-xs font-semibold text-red-600'>
                                            {errors.pais_id.message}
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <label
                                        htmlFor='modalidad_id'
                                        className='block text-sm font-medium text-gray-900'
                                    >
                                        Modalidad
                                    </label>
                                    <select
                                        className='w-full mt-1 text-sm text-gray-900 input input-bordered input-ghost'
                                        {...register('modalidad_id', {
                                            required: 'Modalidad del evento es obligatoria',
                                        })}
                                    >
                                        {modalidades.map((modalidad) => (
                                            <option
                                                key={modalidad.id}
                                                value={modalidad.id}
                                            >
                                                {modalidad.nombre}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.id_modalidad && (
                                        <span className='text-xs font-semibold text-red-600'>
                                            {errors.id_modalidad.message}
                                        </span>
                                    )}
                                </div>
                                <TextInput
                                    label='Ciudad/Cantón/Pueblo'
                                    name='ciudad'
                                    type='text'
                                    register={register}
                                    errors={errors}
                                    required
                                />
                            </fieldset>

                            <fieldset className='grid gap-2'>
                                <label
                                    htmlFor='motivo'
                                    className='block text-sm font-medium text-gray-900'
                                >
                                    Motivo
                                </label>
                                <textarea
                                    className='w-full mt-1 text-sm text-gray-900 input input-bordered input-ghost'
                                    {...register('motivo', { required: 'El motivo es obligatorio' })}
                                    rows={5}
                                ></textarea>
                                {errors.motivo && (
                                    <span className='text-xs font-semibold text-red-600'>
                                        {errors.motivo.message}
                                    </span>
                                )}
                            </fieldset>
                            <fieldset className='flex items-center gap-4'>
                                <button
                                    type='submit'
                                    className='flex-1 btn btn-primary'
                                >
                                    Crear Cita
                                </button>
                                <button
                                    type='button'
                                    className='btn btn-error'
                                    onClick={closeModal}
                                >
                                    Cancelar
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div >
        )
    );
};

export default ModalRegistroCita;
