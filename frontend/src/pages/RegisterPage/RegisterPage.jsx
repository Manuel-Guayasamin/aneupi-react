import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import BrandImage from '../../assets/brand/brand.png';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { registrarUsuario } from '../../redux/slices/authSlice';
import { useState } from 'react';

// Custom validation rule for email format
const validateEmailFormat = (value) => {
	// Regular expression for email validation
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(value) || 'El email no es válido';
};

// Custom validation rule for identification numbers format
const validateIdentification = (value) => {
	// Regular expression for identification validation
	const idRegex = /^[0-9]+$/;
	return idRegex.test(value) || 'La cédula/pasaporte solo puede contener números';
};

// Custom validation rule for phone numbers format
const validatePhoneNumber = (value) => {
	// Regular expression for phone number validation
	const phoneRegex = /^\d{10}$/;
	return phoneRegex.test(value) || 'El teléfono debe contener 10 números';
};
const TextInput = ({ label, name, type = 'text', register, errors, required, validate }) => (
	<div className='space-y-2'>
		<div className='flex items-center justify-between'>
			<label
				htmlFor={name}
				className='block text-sm font-medium text-gray-900'
			>
				{label}
			</label>
			{errors[name] && <span className='text-white badge badge-error badge-sm'>{errors[name].message}</span>}
		</div>

		<input
			id={name}
			type={type}
			className={`w-full text-sm input input-bordered input-ghost text-gray-900`}
			placeholder={label}
			{...register(name, {
				required: required ? 'Este campo es obligatorio' : false,
				validate: validate, // Include custom validation function here
			})}
		/>
	</div>
);

const RegisterPage = () => {
	const dispatch = useDispatch();
	const { error, loading } = useSelector((state) => state.authentication);
	const [registrationSuccess, setRegistrationSuccess] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const navigate = useNavigate();

	const onSubmit = async (userData) => {
		userData.idRol = 2;
		try {
			await dispatch(registrarUsuario(userData)).then(() => {
				setRegistrationSuccess(true);
			});
		} catch (error) {
			console.error('Error al crear usuario:', error);
			// Manejar errores de registro aquí
		}
	};

	// Redirigir a la página de inicio de sesión después de un registro exitoso
	if (registrationSuccess && !loading && !error) {
		navigate('/iniciar-sesion');
	}

	return (
		<>
			<div className='h-full min-h-screen p-4 bg-indigo-800'>
				<div className='flex flex-col items-center justify-center h-full max-w-screen-xl mx-auto text-white bg-white rounded-xl md:grid md:grid-cols-2'>
					<a
						href='/'
						rel='noreferrer'
						className='block h-full btn btn-ghost btn-lg'
					>
						<img
							className='object-contain h-full mx-auto md:w-96'
							src={BrandImage}
							alt='Fundación ANEUPI'
						/>
					</a>
					<div className='w-full bg-white rounded-lg shadow-xl md:bg-transparent md:mt-0 xl:p-0'>
						<div className='p-6 sm:p-8'>
							<h2 className='mb-10 text-3xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-4xl'>
								¡Registrate Ahora!
							</h2>
							<form
								onSubmit={handleSubmit(onSubmit)}
								className='space-y-4'
							>
								<TextInput
									label='Cédula/Pasaporte'
									name='identificacion'
									register={register}
									errors={errors}
									required
									validate={validateIdentification} // Add custom validation for identification
								/>
								<div className='grid gap-4 md:grid-cols-2'>
									<TextInput
										label='Nombres'
										name='nombres'
										register={register}
										errors={errors}
										required
									/>
									<TextInput
										label='Apellidos'
										name='apellidos'
										register={register}
										errors={errors}
										required
									/>
								</div>
								<TextInput
									label='Usuario'
									name='nombreUsuario'
									register={register}
									errors={errors}
									required
								/>
								<fieldset className='grid gap-4 md:grid-cols-2'>
									<TextInput
										label='Email'
										name='email'
										type='email'
										register={register}
										errors={errors}
										required
										validate={validateEmailFormat} // Add custom validation for email
									/>
									<TextInput
										label='Teléfono'
										name='telefono'
										register={register}
										errors={errors}
										required
										validate={validatePhoneNumber} // Add custom validation for phone number
									/>
								</fieldset>
								<TextInput
									label='Contraseña'
									name='password'
									type='password'
									register={register}
									errors={errors}
									required
								/>
								<button
									type='submit'
									className='w-full text-white btn btn-primary'
								>
									Crea tu cuenta
								</button>
								<div className='space-y-2 text-gray-900'>
									<p className='text-sm text-center'>¿Ya tienes una cuenta?</p>
									<a
										className='block w-full mx-auto text-sm text-center link link-primary'
										href='/iniciar-sesion'
										rel='noreferrer'
									>
										Iniciar Sesión
									</a>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default RegisterPage;
