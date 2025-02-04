import React, { useEffect } from 'react';
import { FaFileExcel, FaPencil, FaTrash } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import useAdminResource from '../../hooks/useAdminResource';
import { deleteServicio, fetchServicios, generateServiciosExcel } from '../../redux/slices/serviciosSlice'; // Updated im
import { getUsuarios } from '../../redux/slices/usuariosSlice';
import ModalActualizarServicio from './ModalActualizarServicio';
import ModalRegistroServicio from './ModalRegistroServicio';
import { useContext } from 'react';
import { ThemeContext } from '../adLayout';
import { Dark } from '../../styles/DarkTheme';
import { Light } from '../../styles/LightTheme';

const AdminServicios = () => {
	const dispatch = useDispatch();
	const { theme } = useContext(ThemeContext);
	const currentTheme = theme === 'dark' ? Dark : Light;

	const {
		resources: servicios, // Updated variable name
		loading,
		showConfirmation,
		openConfirmation,
		closeConfirmation,
		confirmDelete,
		showRegistroModal,
		showActualizarModal,
		resourceSelected: servicioSelected,
		openRegistroModal,
		openActualizarModal,
		closeRegistroModal,
		closeActualizarModal,
	} = useAdminResource(fetchServicios, deleteServicio, 'servicios');

	const handleGenerateExcel = (id) => {
		dispatch(generateServiciosExcel(id))
			.unwrap()
			.then(() => {
				// Excel generated successfully
				console.log('Excel generated successfully');
			})
			.catch((error) => {
				// Error generating Excel
				console.error('Error generating Excel:', error);
			});
	};

	useEffect(() => {
		dispatch(getUsuarios());
	}, [dispatch]);

	return (
		<div className='max-w-screen-xl py-12 mx-auto'>
			{
				<ModalRegistroServicio
					showModal={showRegistroModal}
					closeModal={closeRegistroModal}
				/>
			}
			<ModalActualizarServicio
				showModal={showActualizarModal}
				closeModal={closeActualizarModal}
				servicioSelected={servicioSelected}
			/>
			<header className='flex flex-col items-center justify-between gap-2 md:flex-row'>
				<h2 className='text-2xl font-bold text-center md:text-left md:text-4xl'>
					Listado de Servicios
				</h2>
			</header>
			<div className='mt-6 overflow-auto min-h-96 max-h-96'>
				<table>
					<thead>
						<tr className={`text-sm ${theme === 'dark' ? 'border-b border-white' : 'border-b border-black'}`} style={{ color: theme === 'dark' ? '#ADD1FF' : 'inherit' }}>
							<th className='w-[5%]'>#</th>
							<th className='w-[10%]'>Nombre</th>
							<th className='w-[10%]'>Descripcion</th>
							<th className='w-[5%]'>Profesional</th>
							<th className='w-[5%]'>Acciones</th>
						</tr>
					</thead>
					<tbody className='min-h-96'>
						{!loading &&
							servicios.map((servicio, index) => (
								<tr
									key={servicio.id}
									className='text-xs'
								>
									<th>{index + 1}</th>
									<td style={{ textAlign: 'center' }}>{servicio.nombre}</td>
									<td style={{ textAlign: 'center' }}>{servicio.descripcion}</td>
									<td style={{ textAlign: 'center' }}>
										{`${servicio.Usuario?.nombres.split(' ')[0]} ${servicio.Usuario?.apellidos.split(' ')[0]
											}`}
									</td>{' '}
									<td className='flex items-center justify-center gap-2 pt-2'>
										<div className='flex items-center gap-2'>
											<button
												className='m-0 text-white btn btn-info btn-xs'
												type='button'
												disabled={loading}
												onClick={() => openActualizarModal(servicio)}
											>
												<span className='sr-only'>Actualizar</span>
												<FaPencil />
											</button>

											<button
												className='m-0 text-white btn btn-error btn-xs'
												type='button'
												onClick={() => openConfirmation(servicio.id)}
											>
												<span className='sr-only'>Eliminar</span>
												<FaTrash />
											</button>
											<button
												className='m-0 text-white btn btn-success btn-xs'
												type='button'
												onClick={() => handleGenerateExcel(servicio.id)}
											>
												<span className='sr-only'>Excel</span>
												<FaFileExcel />
											</button>
										</div>
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
								<p className=''>¿Estás seguro de que deseas eliminar este servicio?</p>
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
				Crear Nuevo Servicio
			</button>
		</div>
	);
};

export default AdminServicios;
