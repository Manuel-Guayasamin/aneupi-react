import React, { useState } from 'react';
import { FaFileExcel, FaPencil, FaTrash } from 'react-icons/fa6';
import { deletePractica, fetchPracticas, generatePostulantesExcel } from '../../redux/slices/practicaSlice';
import ModalActualizarPracticas from './ModalActualizarPracticas';
import ModalRegistroPracticas from './ModalRegistroPracticas';
import useAdminResource from '../../hooks/useAdminResource';
import { useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { useContext } from 'react';
import { ThemeContext } from '../adLayout';
import { Dark } from '../../styles/DarkTheme';
import { Light } from '../../styles/LightTheme';

const AdminPracticas = () => {
	const dispatch = useDispatch();
	const { theme } = useContext(ThemeContext);
	const currentTheme = theme === 'dark' ? Dark : Light;

	const {
		resources: practicas,
		loading,
		showConfirmation,
		openConfirmation,
		closeConfirmation,
		confirmDelete,
		showRegistroModal,
		showActualizarModal,
		resourceSelected: practicaSelected,
		openRegistroModal,
		openActualizarModal,
		closeRegistroModal,
		closeActualizarModal,
	} = useAdminResource(fetchPracticas, deletePractica, 'practicas');

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

	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = itemOffset + 10;
	const currentItems = practicas.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(practicas.length / 10);

	// Invoke when user click to request another page.
	const handlePageClick = (event) => {
		const newOffset = (event.selected * 10) % practicas.length;
		setItemOffset(newOffset);
	};

	return (
		<div className='max-w-screen-xl py-12 mx-auto'>
			<ModalRegistroPracticas
				showModal={showRegistroModal}
				closeModal={closeRegistroModal}
			/>
			<ModalActualizarPracticas
				showModal={showActualizarModal}
				closeModal={closeActualizarModal}
				practicaSelected={practicaSelected}
			/>
			<header className='flex flex-col items-center justify-between gap-2 md:flex-row'>
				<h2 className='text-2xl font-bold text-center md:text-left md:text-4xl'>
					Listado de Practicas
				</h2>
			</header>
			<div className='mt-6 overflow-auto min-h-96 max-h-96'>
				<table>
					<thead>
						<tr className={`text-sm ${theme === 'dark' ? 'border-b border-white' : 'border-b border-black'}`} style={{ color: theme === 'dark' ? '#ADD1FF' : 'inherit' }}>
							<th className='w-[5%]'>#</th>
							<th className='w-[10%]'>Empresa</th>
							<th className='w-[5%]'>Carrera</th>
							<th className='w-[5%]'>Tipo de Práctica</th>
							<th className='w-[5%]'>Total de Horas</th>
							<th className='w-[5%]'>Horario</th>
							<th className='w-[5%]'>Fecha de Inicio</th>
							<th className='w-[5%]'>Modalidad</th>
							<th className='w-[5%]'>Acciones</th>
						</tr>
					</thead>
					<tbody className='min-h-96'>
						{!loading &&
							currentItems.map((practica, index) => (
								<tr
									key={practica.id}
									className='text-xs'
								>
									<th>{index + 1}</th>
									<td className='flex items-center justify-center text-black' style={{ padding: '5px' }}>
										{practica.empresa === 'Fundacion ANEUPI' ? (
											<span className='text-white badge badge-primary badge-sm'>
												{practica.empresa}
											</span>
										) : (
											<span className='text-white badge badge-accent badge-sm'>
												{practica.empresa}
											</span>
										)}
									</td>
									<td style={{ textAlign: 'center' }}>{practica.carrera}</td>
									<td style={{ textAlign: 'center' }}>{practica.tipo_practica}</td>
									<td style={{ textAlign: 'center' }}>{practica.total_horas}</td>
									<td style={{ textAlign: 'center' }}>{practica.horario}</td>
									<td style={{ textAlign: 'center' }}>
										{' '}
										{new Date(
											new Date(practica.fecha_inicio).getTime() + 24 * 60 * 60 * 1000,
										).toLocaleDateString('es-ES', {
											year: 'numeric',
											month: 'numeric',
											day: 'numeric',
										})}
									</td>
									<td style={{ textAlign: 'center' }}>{practica.Modalidad.nombre}</td>
									<td className='flex items-center justify-center gap-2 pt-2'>
										<div className='flex items-center gap-2'>
											<button
												className='m-0 text-white btn btn-info btn-xs'
												type='button'
												disabled={loading}
												onClick={() => openActualizarModal(practica)}
											>
												<span className='sr-only'>Actualizar</span>
												<FaPencil />
											</button>

											<button
												className='m-0 text-white btn btn-error btn-xs'
												type='button'
												onClick={() => openConfirmation(practica.id)}
											>
												<span className='sr-only'>Eliminar</span>
												<FaTrash />
											</button>
											<button
												className='m-0 text-white btn btn-success btn-xs'
												type='button'
												disabled={loading}
												onClick={() => handleGenerateExcel(practica.id)}
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
			<div className='flex items-center justify-between'>
				<button
					className='inline-block mt-4 text-white btn btn-primary '
					onClick={openRegistroModal}
				>
					Crear Nueva Practica
				</button>
				<div>
					<ReactPaginate
						breakLabel='...'
						nextLabel='>'
						pageRangeDisplayed={5}
						pageCount={pageCount}
						onPageChange={handlePageClick}
						previousLabel='<'
						previousClassName='mr-2'
						nextClassName='ml-2'
						renderOnZeroPageCount={null}
						className='flex items-center'
						pageClassName=' w-8 h-8 grid place-items-center rounded'
						activeClassName='grid place-items-center bg-primary text-white w-8 h-8 rounded'
					/>
				</div>
			</div>
		</div>
	);
};

export default AdminPracticas;
