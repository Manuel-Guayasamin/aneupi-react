import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import ModalActualizarPracticas from '../../admin_pages/Practicas/ModalActualizarPracticas';
import ModalRegistroPracticas from '../../admin_pages/Practicas/ModalRegistroPracticas';
import useAdminResource from '../../hooks/useAdminResource';
import DshContainer from '../layout/dshContainer';
import ReactPaginate from 'react-paginate';
import ActionButton from '../components/Buttons/ActionButton';

import { FaDeleteLeft, FaPencil, FaList, FaTrash } from 'react-icons/fa6';
import { FaBriefcase, FaFileExcel } from 'react-icons/fa';
import { MdAssignmentAdd } from "react-icons/md";
import { deletePractica, fetchPracticas, generatePostulantesExcel } from '../../redux/slices/practicaSlice';
import "../../App.css"

const DshPracticas = () => {
    const dispatch = useDispatch();

    // Estado de los filtros
    const [tipoPracticaFilter, setTipoPracticaFilter] = useState('');
    const [modalidadFilter, setModalidadFilter] = useState('');

    // Estado de las prácticas filtradas
    const [filteredPracticas, setFilteredPracticas] = useState([]);

    // Manejador del cambio en el filtro de tipo de práctica
    const handleTipoPracticaFilterChange = (event) => {
        setTipoPracticaFilter(event.target.value);
    };

    // Manejador del cambio en el filtro de modalidad
    const handleModalidadFilterChange = (event) => {
        setModalidadFilter(event.target.value);
    };

    // Función para restablecer los filtros
    const resetFilters = () => {
        setTipoPracticaFilter('');
        setModalidadFilter('');
    };

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
        resourceUpdated,
        setResourceUpdated,
    } = useAdminResource(fetchPracticas, deletePractica, 'practicas');

    const handleGenerateExcel = (id) => {
        dispatch(generatePostulantesExcel(id))
            .unwrap()
            .then(() => {
                console.log('Excel generated successfully');
            })
            .catch((error) => {
                console.error('Error generating Excel:', error);
            });
    };

    const handleDeletePracticas = () => {
        setResourceUpdated({
            ...resourceUpdated,
            isRegistered: {
                ...resourceUpdated.isUdated,
                value: true,
            },
        });
        confirmDelete();
    }

    // Filtrar prácticas según los criterios seleccionados
    useEffect(() => {
        let filtered = practicas.filter((practica) => {
            // Filtrar por tipo de práctica
            if (tipoPracticaFilter && practica.tipo_practica !== tipoPracticaFilter) {
                return false;
            }
            // Filtrar por modalidad
            if (modalidadFilter && practica.Modalidad.nombre !== modalidadFilter) {
                return false;
            }
            return true;
        });
        setFilteredPracticas(filtered);
    }, [practicas, tipoPracticaFilter, modalidadFilter]);

    const practicasOrden = [...filteredPracticas].sort((a, b) => a.id - b.id);

    return (
        <DshContainer title="Practicas" content={<ActionButton ActionIcon={FaBriefcase} label="Crear Nueva Practica" onClick={openRegistroModal} />}>
            <ModalRegistroPracticas
                resourceUpdated={resourceUpdated}
                setResourceUpdated={setResourceUpdated}
                showModal={showRegistroModal}
                closeModal={closeRegistroModal}
            />
            <ModalActualizarPracticas
                resourceUpdated={resourceUpdated}
                setResourceUpdated={setResourceUpdated}
                showModal={showActualizarModal}
                closeModal={closeActualizarModal}
                practicaSelected={practicaSelected}
            />
            <div className="mb-8 overflow-x-auto ">
                <div className="grid items-center grid-cols-1 gap-4 mb-4 md:grid-cols-5">
                    <div>
                        <label className="form-control">
                            <span className="label-text dark:text-slate-100 ">Tipo de Práctica</span>
                            <select
                                value={tipoPracticaFilter}
                                onChange={handleTipoPracticaFilterChange}
                                className="select select-bordered select-sm dark:text-slate-800"
                            >
                                <option value="">Todas</option>
                                <option value="Comunitarias">Comunitarias</option>
                                <option value="Pre-Profesionales">Pre-Profesionales</option>
                                <option value="Master">Master</option>
                                <option value="Pasantias">Pasantias</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label className="form-control">
                            <span className="label-text dark:text-slate-100">Modalidad</span>
                            <select
                                value={modalidadFilter}
                                onChange={handleModalidadFilterChange}
                                className="select select-bordered select-sm dark:text-slate-800"
                            >
                                <option value="">Todas</option>
                                <option value="Virtual">Virtual</option>
                                <option value="Hibrida">Hibrida</option>
                                <option value="Presencial">Presencial</option>
                            </select>
                        </label>
                    </div>
                    <div className="md:mt-3"> {/* Agrega una clase de margen superior solo en dispositivos medianos y grandes */}
                        <button
                            className="flex items-center gap-4 px-4 py-2 text-sm font-medium text-white rounded-md dark:bg-blue-700 dark:hover:bg-blue-800 bg-colorcito hover:bg-slate-700 focus:outline-none"
                            onClick={resetFilters}
                        >
                            Restablecer filtros
                        </button>
                    </div>
                </div>

                <table className="w-full"><thead className="text-xs font-bold tracking-wider text-white uppercase">
                    <tr className='text-left colorcito dark:bg-blue-700'>
                        <th className="px-6 py-3 text-left whitespace-nowrap">#</th>
                        <th className="px-6 py-3 text-left whitespace-nowrap">Empresa</th>
                        <th className="px-6 py-3 text-left whitespace-nowrap">Carrera</th>
                        <th className="px-6 py-3 text-left whitespace-nowrap">Tipo de Práctica</th>
                        <th className="px-6 py-3 text-left whitespace-nowrap">Total de Horas</th>
                        <th className="px-6 py-3 text-left whitespace-nowrap">Horario</th>
                        <th className="px-6 py-3 text-left whitespace-nowrap">Fecha de inicio</th>
                        <th className="px-6 py-3 text-left whitespace-nowrap">Fecha de Fin</th>
                        <th className="px-6 py-3 text-left whitespace-nowrap">Modalidad</th>
                        <th className="px-6 py-3 text-left whitespace-nowrap">Acciones</th>
                    </tr>
                </thead>

                    <tbody className='text-left dsh-tertiary divider-y divider-yellow-400'>
                        {!loading && Array.isArray(practicasOrden) && practicasOrden.map((practica, index) => (
                            <tr key={practica.id}>
                                <td className='px-6 py-4'>{index + 1}</td>
                                <td className='px-6 py-4 font-bold whitespace-nowrap'>
                                    {practica.empresa === "Fundacion ANEUPI" ? (
                                        <span className="text-sm text-white bg-colorcito badge px-4 py-3">
                                            {practica.empresa}
                                        </span>
                                    )
                                        : practica.empresa === "Academia ANEUPI" ? (
                                            <span className="text-sm text-white bg-academia badge px-4 py-3">
                                                {practica.empresa}
                                            </span>)
                                            : practica.empresa === "Institución Financiera ANEUPI" ? (
                                                <span className="text-sm text-white bg-colorCoop badge px-4 py-3">
                                                    {practica.empresa}
                                                </span>)
                                                : (
                                                    <span className="text-sm text-white bg-colorcitoleceni1 badge px-4 py-3">
                                                        {practica.empresa}
                                                    </span>
                                                )}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap'>{practica.carrera}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{practica.tipo_practica}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{practica.total_horas}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{practica.horario}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    {' '}
                                    {new Date(
                                        new Date(practica.fecha_inicio).getTime() + 24 * 60 * 60,
                                    ).toLocaleDateString('es-ES', {
                                        year: 'numeric',
                                        month: 'numeric',
                                        day: 'numeric',
                                    })}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    {' '}
                                    {new Date(
                                        new Date(practica.fecha_fin).getTime() + 24 * 60 * 60,
                                    ).toLocaleDateString('es-ES', {
                                        year: 'numeric',
                                        month: 'numeric',
                                        day: 'numeric',
                                    })}
                                </td>
                                <td className='truncate'>{practica.Modalidad.nombre}</td>
                                <td className="px-6 py-4 text-sm whitespace-nowrap">
                                    <button onClick={() => openActualizarModal(practica)} className="mr-2 hover:text-blue-500 p-1.5 hover:bg-black/0 rounded-md badge badge-info"
                                    >
                                        <div className="tooltip" data-tip="Actualizar">
                                            <FaPencil />
                                        </div>
                                    </button>
                                    <button onClick={() => openConfirmation(practica.id)} className="mr-2 hover:text-red-500 p-1.5 hover:bg-black/0 rounded-md badge badge-error"
                                    >
                                        <div className="tooltip" data-tip="Eliminar">
                                            <FaTrash />
                                        </div>
                                    </button>
                                    <button onClick={() => handleGenerateExcel(practica.id)} className="mr-2 hover:text-green-500 p-1.5 hover:bg-black/0 rounded-md badge badge-success"
                                    >
                                        <div className="tooltip" data-tip="Excel">
                                            <FaFileExcel />
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
                                    onClick={handleDeletePracticas}
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

export default DshPracticas;