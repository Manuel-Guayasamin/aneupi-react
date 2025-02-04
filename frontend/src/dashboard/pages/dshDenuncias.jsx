import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaPencil, FaTrash, FaFilePdf } from 'react-icons/fa6';
import useAdminResource from '../../hooks/useAdminResource';
import { deleteReporte, fetchAllReporte } from '../../redux/slices/reporteSlice';
import DshContainer from '../layout/dshContainer';
import ModalActualizarReporte from '../../admin_pages/Reporte/ModalActualizarReporte';


const DshDenuncia = () => {
    const dispatch = useDispatch();
    const {
        resources: reportes,
        loading,
        showConfirmation,
        openConfirmation,
        closeConfirmation,
        confirmDelete,
        showRegistroModal,
        showActualizarModal,
        resourceSelected: reporteSelected,
        openRegistroModal,
        openActualizarModal,
        closeRegistroModal,
        closeActualizarModal,
        resourceUpdated,
        setResourceUpdated,
    } = useAdminResource(fetchAllReporte, deleteReporte, 'reportes');


    useEffect(() => {
        dispatch(fetchAllReporte());
    }, [dispatch]);

    const handleDeleteReporte = () => {
        setResourceUpdated({
            ...resourceUpdated,
            isRegistered: {
                ...resourceUpdated.isUdated,
                value: true,
            },
        });
        confirmDelete();
    }

    const reporteOrden = [...reportes].sort((a, b) => a.id - b.id);

    console.log(reporteOrden);

    return (
        <DshContainer title="Denuncias">
            <ModalActualizarReporte
                resourceUpdated={resourceUpdated}
                setResourceUpdated={setResourceUpdated}
                showModal={showActualizarModal}
                closeModal={closeActualizarModal}
                reporteSelected={reporteSelected} // Corregir el nombre de la prop para pasar el trabajo seleccionado
            />

            <div className="mb-8 overflow-x-auto ">
                <table className="w-full">
                    <thead className="text-xs font-bold tracking-wider text-white uppercase">
                        <tr className='text-left colorcito dark:bg-blue-700'>
                            <th className="px-6 py-3 text-left whitespace-nowrap">#</th>
                            <th className="px-6 py-3 text-left whitespace-nowrap">Nombres y apellidos</th>
                            <th className="px-6 py-3 text-left whitespace-nowrap">Universidad</th>
                            <th className="px-6 py-3 text-left whitespace-nowrap">Correo Electrónico</th>
                            <th className="px-6 py-3 text-left whitespace-nowrap">Télefono</th>
                            <th className="px-6 py-3 text-left whitespace-nowrap">Asunto</th>
                            <th className="px-6 py-3 text-left whitespace-nowrap">Mensaje</th>
                            <th className="px-6 py-3 text-left whitespace-nowrap">Estado</th>
                            <th className="px-6 py-3 text-left whitespace-nowrap">Acciones</th>
                        </tr>
                    </thead>

                    <tbody className='text-left dsh-tertiary divider-y divider-yellow-400'>
                        {!loading && Array.isArray(reporteOrden) && reporteOrden.map((reporte, index) => (
                            <tr key={reporte.id}>
                                <td className='px-6 py-4'>{index + 1}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{reporte.nombres}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{reporte.universidad !== "" ? reporte.universidad : "No es Estudiante"}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{reporte.email}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{reporte.asunto}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{reporte.telefono}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{reporte.mensaje}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{reporte.EstadoReporte?.nombre}</td>
                                <td className="px-6 py-4 text-sm whitespace-nowrap">
                                    <button onClick={() => openActualizarModal(reporte)} className="mr-2 hover:text-blue-500 p-1.5 hover:bg-black/0 rounded-md badge badge-info">
                                        <div className="tooltip" data-tip="Actualizar">
                                            <FaPencil />
                                        </div>
                                    </button>
                                    <button onClick={() => openConfirmation(reporte.id)} className="mr-2 hover:text-red-500 p-1.5 hover:bg-black/0 rounded-md badge badge-error">
                                        <div className="tooltip" data-tip="Eliminar">
                                            <FaTrash />
                                        </div>
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
                            <div className="text-sm dark:text-black">
                                <p className=''>¿Estás seguro de que deseas eliminar esta práctica?</p>
                            </div>
                            <div className='flex justify-end gap-2 mt-4'>
                                <button
                                    className="px-5 py-3 text-white rounded-lg bg-red-600 hover:text-red-600 border border-transparent
                                hover:border-red-600 hover:bg-white hover:shadow-lg hover:shadow-gray-500 dark:bg-red-700 dark:text-white
                                dark:hover:bg-white dark:hover:text-red-700 dark:hover:border-red-700"
                                    onClick={handleDeleteReporte}
                                >
                                    Confirmar
                                </button>
                                <button
                                    className="px-5 py-3 text-black bg-gray-300 rounded-lg hover:text-black border border-transparent
                                hover:border-gray-500 hover:bg-white hover:shadow-lg hover:shadow-gray-500"
                                    onClick={closeConfirmation}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DshContainer>
    )

}

export default DshDenuncia
