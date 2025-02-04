import React from 'react';
import { FaFileExcel, FaList, FaPencil, FaTrash } from 'react-icons/fa6';
import { deleteTrabajo, fetchTrabajos, generatePostulantesExcel } from '../../redux/slices/trabajosSlice';
import ModalActualizarTrabajo from './ModalActualizarTrabajo';
import ModalRegistroTrabajo from './ModalRegistroTrabajo';
import useAdminResource from '../../hooks/useAdminResource';
import { useDispatch } from 'react-redux';
import { useContext } from 'react';
import { ThemeContext } from '../adLayout';
import { Dark } from '../../styles/DarkTheme';
import { Light } from '../../styles/LightTheme';

const AdminTrabajos = () => {
	const dispatch = useDispatch();
	const { theme } = useContext(ThemeContext);
	const currentTheme = theme === 'dark' ? Dark : Light;

	const {
		resources: trabajos,
		loading,
		showConfirmation,
		openConfirmation,
		closeConfirmation,
		confirmDelete,
		showRegistroModal,
		showActualizarModal,
		resourceSelected: trabajoSelected,
		openRegistroModal,
		openActualizarModal,
		closeRegistroModal,
		closeActualizarModal,
	} = useAdminResource(fetchTrabajos, deleteTrabajo, 'trabajos');

	const handleGenerateExcel = (id) => {
		// Dispatch the generatePostulantesExcel thunk
		dispatch(generatePostulantesExcel(id))
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

	return (
		<div className='max-w-screen-xl py-12 mx-auto'>
			<ModalRegistroTrabajo
				showModal={showRegistroModal}
				closeModal={closeRegistroModal}
			/>
			<ModalActualizarTrabajo
				showModal={showActualizarModal}
				closeModal={closeActualizarModal}
				trabajoSelected={trabajoSelected}
			/>
			<header className='flex flex-col items-center justify-between gap-2 md:flex-row'>
				<h2 className='text-2xl font-bold text-center md:text-left md:text-4xl'>
					Listado de Trabajos
				</h2>
			</header>
			<div className='mt-6 overflow-auto min-h-96 max-h-96'>
				<table>
					<thead>
						<tr className={`text-sm ${theme === 'dark' ? 'border-b border-white' : 'border-b border-black'}`} style={{ color: theme === 'dark' ? '#ADD1FF' : 'inherit' }}>
							<th className='w-[5%]'>#</th>
							<th className='w-[10%]'>Empresa</th>
							<th className='w-[5%]'>Departamento</th>
							<th className='w-[5%]'>Cargo</th>
							<th className='w-[5%]'>Horarios</th>
							<th className='w-[5%]'>Acciones</th>
						</tr>
					</thead>
					<tbody className='min-h-96'>
						{!loading &&
							trabajos.map((trabajo, index) => (
								<tr
									key={trabajo.id}
									className='text-xs'
								>
									<th>{index + 1}</th>
									<td className='flex items-center justify-center text-black' style={{ padding: '5px' }}>
										{trabajo.empresa === 'Fundacion ANEUPI' ? (
											<span className='text-white badge badge-primary badge-sm'>
												{trabajo.empresa}
											</span>
										) : (
											<span className='text-black badge badge-accent badge-sm'>
												{trabajo.empresa}
											</span>
										)}
									</td>
									<td style={{ textAlign: 'center' }}>{trabajo.departamento}</td>
									<td style={{ textAlign: 'center' }}>{trabajo.cargo}</td>
									<td style={{ textAlign: 'center' }}>{trabajo.horario}</td>
									<td className='flex items-center justify-center gap-2 pt-2'>
										<div className='flex items-center gap-2'>
											<button
												className='m-0 text-white btn btn-info btn-xs'
												type='button'
												disabled={loading}
												onClick={() => openActualizarModal(trabajo)}
											>
												<span className='sr-only'>Actualizar</span>
												<FaPencil />
											</button>

											<button
												className='m-0 text-white btn btn-error btn-xs'
												type='button'
												onClick={() => openConfirmation(trabajo.id)}
											>
												<span className='sr-only'>Eliminar</span>
												<FaTrash />
											</button>
											<button
												className='m-0 text-white btn btn-success btn-xs'
												type='button'
												onClick={() => handleGenerateExcel(trabajo.id)}
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
								<p className=''>¿Estás seguro de que deseas eliminar este evento?</p>
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
				className='inline-block mt-4 ml-auto btn btn-primary text-white'
				onClick={openRegistroModal}
			>
				Crear Nuevo Trabajo
			</button>
		</div>
	);
};

export default AdminTrabajos;
