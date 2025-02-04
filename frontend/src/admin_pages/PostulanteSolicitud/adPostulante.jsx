import React from 'react';
import { FaPencil, FaTrash } from 'react-icons/fa6';
import useAdminResource from '../../hooks/useAdminResource';
import { deletePostulante, fetchPostulantes } from '../../redux/slices/postulantesSlice';
import ModalActualizarPostulantes from './ModalActualizarPostulantes';

const AdminPostulanteSolicitud = () => {
	const {
		resources: postulantes,
		loading,
		showConfirmation,
		deleteId,
		openConfirmation,
		closeConfirmation,
		confirmDelete,
		showActualizarModal,
		resourceSelected: postulanteSelected,
		openActualizarModal,
		closeActualizarModal,
	} = useAdminResource(fetchPostulantes, deletePostulante, 'postulantes');

	return (
		<div className='max-w-screen-xl py-12 mx-auto'>
			<ModalActualizarPostulantes
				showModal={showActualizarModal}
				closeModal={closeActualizarModal}
				postulanteSelected={postulanteSelected}
			/>
			<header className='flex flex-col items-center justify-between gap-2 md:flex-row'>
				<h2 className='text-2xl font-bold text-center text-indigo-900 md:text-left md:text-4xl'>
					Listado Solicitudes de Postulantes
				</h2>
			</header>
			<div className='mt-6 overflow-auto min-h-96 max-h-96'>
				<table className='table'>
					<thead>
						<tr className='text-sm text-center'>
							<th className='w-[5%]'>#</th>
							<th className='w-[10%]'>Estudios</th>
							<th className='w-[5%]'>En que es fuerte</th>
							<th className='w-[5%]'>Pais</th>
							<th className='w-[5%]'>Ciudad</th>
							<th className='w-[5%]'>Direccion</th>
							<th className='w-[5%]'>Telefono</th>
							<th className='w-[5%]'>Discapacidad</th>
							<th className='w-[5%]'>Estado</th>
							<th className='w-[5%]'>Acciones</th>
						</tr>
					</thead>
					<tbody className='min-h-96'>
						{!loading &&
							postulantes.map((postulante, index) => (
								<tr
									key={postulante.id}
									className='text-xs text-center'
								>
									<th>{index + 1}</th>
									<td className='truncate'>{postulante.universidad}</td>
									<td className='truncate'>{postulante.descripcion}</td>
									<td className='truncate'>{postulante.pais}</td>
									<td className='truncate'>{postulante.ciudad}</td>
									<td className='truncate'>{postulante.direccion}</td>
									<td className='truncate'>{postulante.telefono}</td>
									<td className='truncate'>{postulante.is_discapacidad ? 'Sí' : 'No'}</td>
									<td className='truncate'>
										<span
											className={`badge badge-sm ${
												postulante.Estado.id === 1
													? 'badge-warning'
													: postulante.Estado.id === 2
													? 'badge-accent'
													: postulante.Estado.id === 3
													? 'badge-secondary'
													: postulante.Estado.id === 4
													? 'badge-info'
													: 'badge-info text-white'
											}`}
										>
											{postulante.Estado.nombre}
										</span>
									</td>

									<td>
										<div className='flex items-center gap-2'>
											<button
												className='m-0 text-white btn btn-info btn-xs'
												type='button'
												disabled={loading}
												onClick={() => openActualizarModal(postulante)}
											>
												<span className='sr-only'>Actualizar</span>
												<FaPencil />
											</button>

											<button
												className='m-0 text-white btn btn-error btn-xs'
												type='button'
												onClick={() => openConfirmation(postulante.id)}
											>
												<span className='sr-only'>Eliminar</span>
												<FaTrash />
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
		</div>
	);
};

export default AdminPostulanteSolicitud;
