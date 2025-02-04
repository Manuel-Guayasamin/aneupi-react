import React, { useEffect, useState } from 'react';
import { FaPencil, FaTrash } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux'; // Importamos useSelector y useDispatch
import { toast } from 'react-toastify';
import useAdminResource from '../hooks/useAdminResource';
import { deleteUsuario, getUsuarios, searchUsuariosByCedula } from '../redux/slices/usuariosSlice';
import ModalActualizar from './Usuarios/ModalActualizar';
import ModalRegistro from './Usuarios/ModalRegistro';
import './admin.css';
import { useContext } from 'react';
import { ThemeContext } from '../admin_pages/adLayout';
import { Dark } from '../styles/DarkTheme';
import { Light } from '../styles/LightTheme';


const AdminUsuarios = () => {
	const dispatch = useDispatch(); // Creamos una instancia de useDispatch
	const { usuario } = useSelector((state) => state.authentication);
	const [identificacion, setIdentificacion] = useState('');
	const [searching, setSearching] = useState(false);
	const { theme } = useContext(ThemeContext);
	const currentTheme = theme === 'dark' ? Dark : Light;

	const {
		resources: usuarios,
		loading,
		showConfirmation,
		openConfirmation,
		closeConfirmation,
		confirmDelete,
		showRegistroModal,
		showActualizarModal,
		resourceSelected: usuarioSelected,
		openRegistroModal,
		openActualizarModal,
		closeRegistroModal,
		closeActualizarModal,
	} = useAdminResource(getUsuarios, deleteUsuario, 'usuarios');

	const handleCedulaChange = (event) => {
		setIdentificacion(event.target.value);
	};

	const handleBuscarUsuariosPorCedula = async () => {
		try {
			dispatch(searchUsuariosByCedula(identificacion));
			setSearching(true);
		} catch (error) {
			toast.error('Error al buscar usuarios por cédula');
		}
	};

	const handleRefresh = () => {
		dispatch(getUsuarios()); // Traer todos los usuarios
		setSearching(false); // Indicar que ya no se está realizando una búsqueda
		setIdentificacion(''); // Limpiar el campo de búsqueda
	};

	return (
		<div className='max-w-screen-xl py-12 mx-auto'>
			<ModalRegistro
				showModal={showRegistroModal}
				closeModal={closeRegistroModal}
			/>
			<ModalActualizar
				showModal={showActualizarModal}
				closeModal={closeActualizarModal}
				usuarioSelected={usuarioSelected}
			/>
			<header className='flex flex-col items-center justify-between gap-2 md:flex-row'>
				<h2 className='text-2xl font-bold text-center md:text-left md:text-4xl'>
					Listado de Usuarios
				</h2>
				<div className='flex flex-wrap items-center justify-center gap-2'>
					<input
						type='text'
						name='identificacion'
						id='identificacion'
						className='input input-bordered input-sm'
						value={identificacion}
						onChange={handleCedulaChange}
					/>
					<button
						className='text-white btn btn-info btn-sm'
						type='button'
						onClick={handleBuscarUsuariosPorCedula}
					>
						Buscar
					</button>
					<button
						className='text-white btn btn-accent btn-sm'
						type='button'
						onClick={handleRefresh}
						disabled={!searching}
					>
						Refrescar
					</button>
				</div>
			</header>
			<div className='mt-6 overflow-auto table-responsive min-h-96 max-h-96'>
				<table>
					<thead>
						<tr className={`text-sm ${theme === 'dark' ? 'border-b border-white' : 'border-b border-black'}`} style={{ color: theme === 'dark' ? '#ADD1FF' : 'inherit' }}>
							<th className='w-[5%]'>#</th>
							<th className='w-[8%]'>Rol</th>
							<th className='w-[10%]'>Identificación</th>
							<th className='w-[10%]'>Usuario</th>
							<th className='w-[25%]'>Nombre Completo</th>
							<th className='w-[10%]'>Correo Electrónico</th>
							<th className='w-[10%]'>Teléfono</th>
							<th className='w-[10%]'>Acciones</th>
						</tr>
					</thead>
					<tbody className='min-h-96'>
						{!loading &&
							usuarios.map((user, index) => (
								<tr
									key={user.id}
									className='text-xs'
								>

									<th>{index + 1}</th>
									<td className='flex items-center justify-center' style={{ padding: '5px' }}>
										<span style={{ textAlign: 'center' }}
											className={`my-auto text-xs badge ${user.Rol.nombre === 'Administrador'
												? 'badge-neutral'
												: user.Rol.nombre === 'Usuario'
													? 'badge-primary text-white'
													: 'badge-accent'
												}`}
										>
											{user.Rol.nombre}
										</span>
									</td>
									<td style={{ textAlign: 'center' }}>{user.identificacion}</td>
									<td style={{ textAlign: 'center' }}>{user.nombreUsuario}</td>
									<td style={{ textAlign: 'center' }}>
										{user.nombres} {user.apellidos}
									</td>
									<td style={{ textAlign: 'center' }}>
										<a href={`mailto:${user.email}`} style={{ color: theme === 'dark' ? 'white' : 'black' }}>
											{user.email}
										</a>
									</td>
									<td style={{ textAlign: 'center' }}>
										<a href={`tel:+${user.telefono}`} style={{ color: theme === 'dark' ? 'white' : 'black' }}>
											{user.telefono}
										</a>
									</td>
									<td className='flex items-center justify-center gap-2 pt-2'>
										<button
											className='text-white btn btn-info btn-xs'
											type='button'
											disabled={loading} // Deshabilita el botón durante la carga
											onClick={() => openActualizarModal(user)}
										>
											<span className='sr-only'>Actualizar</span>
											<FaPencil />
										</button>
										<button
											className='text-white btn btn-error btn-xs'
											type='button'
											disabled={usuario.id === user.id} // Deshabilita el botón durante la carga
											onClick={() => openConfirmation(user.id)}
										>
											<span className='sr-only'>Eliminar</span>
											<FaTrash />
										</button>
									</td>
								</tr>
							))}
					</tbody>
				</table>

				{showConfirmation && (
					<div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50'>
						<div className='p-6 space-y-4 bg-white rounded-lg'>
							<h2 className='text-lg font-bold md:text-2xl'>Confirmar eliminación</h2>
							<div className='text-sm'>
								<p className=''>¿Estás seguro de que deseas eliminar este usuario?</p>
							</div>
							<div className='flex justify-end gap-2 mt-4'>
								<button
									className='btn btn-error'
									onClick={confirmDelete}
								>
									Confirmar
								</button>
								<button
									className='btn'
									onClick={closeConfirmation}
								>
									Cancelar
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
			<button
				className='inline-block mt-4 ml-auto text-white btn btn-primary'
				onClick={openRegistroModal}
			>
				Crear Nuevo Usuario
			</button>
		</div >
	);
};

export default AdminUsuarios;
