import { useForm } from 'react-hook-form';
import BrandImage from '../../assets/brand/brand.png';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { iniciarSesion } from '../../redux/slices/authSlice';
import { useEffect } from 'react';

const LoginPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { usuario } = useSelector((state) => state.authentication);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		dispatch(iniciarSesion(data));
	};

	useEffect(() => {
		if (usuario) navigate('/');
	}, [usuario]);

	return (
		<>
			<section className='h-screen p-4 bg-indigo-800'>
				<article className='flex flex-col items-center justify-center h-full max-w-screen-xl gap-10 mx-auto text-white'>
					<a
						href='/'
						rel='noreferrer'
						className='block bg-white btn btn-ghost btn-lg'
					>
						<img
							className='object-contain h-full w-60'
							src={BrandImage}
							alt='Fundación ANEUPI'
						/>
					</a>
					<div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0'>
						<div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
							<h1 className='text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl'>
								Iniciar Sesión
							</h1>
							<form
								className='space-y-4 md:space-y-6'
								onSubmit={handleSubmit(onSubmit)}
							>
								<div>
									<div className='flex items-center justify-between mb-1'>
										<label
											htmlFor='email'
											className='block text-sm font-medium text-gray-900'
										>
											Correo Electrónico
										</label>
									</div>
									<input
										type='email'
										id='email'
										className='w-full text-sm text-gray-900 input input-bordered input-ghost'
										placeholder='correo@example.com'
										{...register('email', { required: true })}
									/>
									{errors.email && (
										<span className='text-white badge badge-error badge-sm'>
											Este campo es obligatorio
										</span>
									)}
								</div>
								<div>
									<div className='flex items-center justify-between'>
										<label
											htmlFor='password'
											className='block mb-1 text-sm font-medium text-gray-900'
										>
											Contraseña
										</label>
									</div>
									<input
										type='password'
										name='password'
										id='password'
										placeholder='••••••••'
										className='w-full text-sm text-gray-900 input input-bordered input-ghost'
										{...register('password', { required: true })}
									/>
									{errors.password && (
										<span className='text-white badge badge-error badge-sm'>
											Este campo es obligatorio
										</span>
									)}
								</div>
								<button
									type='submit'
									className='w-full text-white btn btn-primary'
								>
									Iniciar Sesión
								</button>
							</form>
							<div className='space-y-2 text-gray-900'>
								<p className='text-sm text-center'>¿Aún no tienes una cuenta?</p>
								<a
									className='block w-full mx-auto text-sm text-center link link-primary'
									href='/registrarse'
									rel='noreferrer'
								>
									Regístrate aquí
								</a>
							</div>
						</div>
					</div>
				</article>
			</section>
		</>
	);
};

export default LoginPage;
