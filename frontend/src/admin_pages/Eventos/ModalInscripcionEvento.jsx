import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { registerForEvent } from '../../redux/slices/eventSlice';

const TextInput = ({ label, name, type = 'text', register, errors }) => (
    <div>
        <label htmlFor={name} className='block text-sm font-medium text-gray-900'>
            {label}
        </label>
        <input
            id={name}
            type={type}
            className='w-full p-2 mt-1 border rounded-md'
            {...register(name, { required: 'Este campo es obligatorio' })}
        />
        {errors[name] && <p className='mt-1 text-xs text-red-600'>{errors[name].message}</p>}
    </div>
);

const ModalInscripcionEvento = ({ showModal, closeModal, eventId }) => {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    useEffect(() => {
        reset();
    }, [reset, showModal]);

    const onSubmit = (data) => {
        data.eventId = eventId;
        dispatch(registerForEvent(data)).then(() => {
            closeModal();
        });
    };

    return (
        showModal && (
            <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50'>
                <div className='w-full max-w-md p-6 bg-white rounded-lg shadow'>
                    <h3 className='text-lg font-medium text-center'>Inscríbete al Evento</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                        <TextInput label='Nombre Completo' name='fullName' register={register} errors={errors} />
                        <TextInput label='Correo Electrónico' name='email' type='email' register={register} errors={errors} />
                        <TextInput label='Teléfono' name='phone' type='tel' register={register} errors={errors} />
                        <div className='flex justify-end space-x-4'>
                            <button type='button' onClick={closeModal} className='btn btn-error'>Cancelar</button>
                            <button type='submit' className='btn btn-primary'>Inscribirse</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};

export default ModalInscripcionEvento;
