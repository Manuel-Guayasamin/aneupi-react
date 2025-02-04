import React, { useEffect, useState } from "react";
import DshContainer from "../layout/dshContainer";
//import ActionButton from "../components/Buttons/ActionButton";

// import ModalRegistroExpediente from "../../admin_pages/Expediente/ModalRegistroExpediente";
import ModalActualizarExpediente from "../../admin_pages/Expediente/ModalActualizarExpediente";

import {
    deleteExpediente,
    fetchExpedientes,
} from "../../redux/slices/expedienteSlice";
import useAdminResource from "../../hooks/useAdminResource";
import { useDispatch } from "react-redux";
import { FaPencil } from "react-icons/fa6";
import { FaFilePdf, FaTrash } from "react-icons/fa";

const serverURL = import.meta.env.VITE_API_URL;

const DshExpediente = () => {
    //const [showRegistroModal, setShowRegistroModal] = useState(false);

    const dispatch = useDispatch();

    // Estado de los filtros
    const [tipoExpedienteFilter, setTipoExpedienteFilter] = useState('');
    const [estadoFilter, setEstadoFilter] = useState('');

    // Estado de los expedientes filtrados
    const [filteredExpedientes, setFilteredExpedientes] = useState([]);

    // Manejador del cambio en el filtro de Tipo de expediente
    const handleTipoExpedienteFilterChange = (event) => {
        setTipoExpedienteFilter(event.target.value);
    }

    // Manejador del cambio en el filtro de estado
    const handleEstadoFilterChange = (event) => {
        setEstadoFilter(event.target.value);
    }

    // Función para restablecer los filtros
    const resetFilters = () => {
        setTipoExpedienteFilter('');
        setEstadoFilter('');
    }

    /* const openRegistroModal = () => {
         setShowRegistroModal(true);
     };*/

    /* const closeRegistroModal = () => {
         setShowRegistroModal(false);
     };*/

    const {
        resources: expedientes,
        loading,
        showConfirmation,
        openConfirmation,
        closeConfirmation,
        confirmDelete,
        showActualizarModal,
        resourceSelected: expedienteSelected,
        openActualizarModal,
        closeActualizarModal,
        resourceUpdated,
        setResourceUpdated,
    } = useAdminResource(fetchExpedientes, deleteExpediente, "expedientes");

    const handleDeleteExpediente = () => {
        setResourceUpdated({
            ...resourceUpdated,
            isRegistered: {
                ...resourceUpdated.isUdated,
                value: true,
            },
        });
        confirmDelete();
    };

    // Filtrar expedientes según los criterios seleccionados
    useEffect(() => {
        const filtered = expedientes.filter((item) => {
            // Filtrar por tipo de expediente
            if (tipoExpedienteFilter && item.TipoExpediente?.nombre !== tipoExpedienteFilter) {
                return false;
            }
            // Filtrar por estado
            if (estadoFilter && item.Estado?.nombre !== estadoFilter) {
                return false;
            }
            return true;
        });
        setFilteredExpedientes(filtered);
    }, [expedientes, tipoExpedienteFilter, estadoFilter]);

    const expedienteOrden = [...filteredExpedientes].sort((a, b) => a.id - b.id);

    return (
        <DshContainer
            title="Expedientes"

        >
            {/* <ModalRegistroExpediente
                resourceUpdated={resourceUpdated}
                setResourceUpdated={setResourceUpdated}
                showModal={showRegistroModal}
                closeModal={closeRegistroModal}
            />*/}

            <ModalActualizarExpediente
                resourceUpdated={resourceUpdated}
                setResourceUpdated={setResourceUpdated}
                showModal={showActualizarModal}
                closeModal={closeActualizarModal}
                expedienteSelected={expedienteSelected}
            />

            <div className="overflow-x-auto">
                <div className="grid items-center grid-cols-1 gap-4 mb-4 md:grid-cols-5">
                    <div>
                        <label className="form-control">
                            <span className="label-text dark:text-slate-100 ">Tipo de expediente</span>
                            <select
                                className="select select-bordered select-sm dark:text-slate-800"
                                onChange={handleTipoExpedienteFilterChange}
                                value={tipoExpedienteFilter}
                            >
                                <option value="">Todas</option>
                                <option value="Sentencia">Sentencia</option>
                                <option value="Resoluciones">Resolucion</option>
                            </select>
                        </label>
                    </div>

                    <div>
                        <label className="form-control">
                            <span className="label-text dark:text-slate-100 ">Estado</span>
                            <select
                                className="select select-bordered select-sm dark:text-slate-800"
                                onChange={handleEstadoFilterChange}
                                value={estadoFilter}
                            >
                                <option value="">Todas</option>
                                <option value="Pendiente">Pendiente</option>
                                <option value="Aprobado">Aprobado</option>
                                <option value="Rechazado">Rechazado</option>
                                <option value="Finalizado">Finalizado</option>
                            </select>
                        </label>
                    </div>

                    <div className="md:mt-3">
                        <button
                            className="flex items-center gap-4 px-4 py-2 text-sm font-medium text-white rounded-md dark:bg-blue-700 dark:hover:bg-blue-800 bg-colorcito hover:bg-slate-700 focus:outline-none"
                            onClick={resetFilters}
                        >
                            Restablecer filtros
                        </button>
                    </div>
                </div>

                <table className="w-full mb-8">
                    <thead className="text-xs font-bold tracking-wider text-white uppercase ">
                        <tr className="text-left bg-colorcito dark:bg-blue-700">
                            <th className="px-6 py-3">#</th>
                            <th className="px-6 py-3 ">Nombres</th>
                            <th className="px-6 py-3 ">Apellidos</th>
                            <th className="px-6 py-3 ">Profesión</th>
                            <th className="px-6 py-3 ">Cédula</th>
                            <th className="px-6 py-3 ">Dirección</th>
                            <th className="px-6 py-3 ">Edad</th>
                            <th className="px-6 py-3 ">País</th>
                            <th className="px-6 py-3 ">Institución</th>
                            <th className="px-6 py-3 ">Tipo de expediente</th>
                            <th className="px-6 py-3 ">Certificado de discapacidad</th>
                            <th className="px-6 py-3 ">Costo</th>
                            <th className="px-6 py-3 ">Comprobante</th>
                            <th className="px-6 py-3 ">Archivo</th>
                            <th className="px-6 py-3 ">Estado</th>
                            <th className="px-6 py-3 text-center">Acciones</th>

                        </tr>
                    </thead>
                    <tbody className="dsh-tertiary divider-y divider-yellow-400">
                        {!loading &&
                            Array.isArray(expedienteOrden) &&
                            expedienteOrden.map((expediente, index) => (
                                <tr key={expediente.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {index + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {expediente.nombres}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {expediente.apellidos}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {expediente.profesion}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {expediente.cedula}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {expediente.direccion}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {expediente.edad}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {expediente.pais}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {expediente.institucion}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`badge badge-sm ${expediente.TipoExpediente?.id === 1
                                                ? "badge-warning"
                                                : expediente.TipoExpediente?.id === 2
                                                    ? "badge-accent"
                                                    : expediente.TipoExpediente?.id === 3
                                                        ? "badge-error"
                                                        : "badge-success text-white"
                                                }`}
                                        >
                                            {expediente.TipoExpediente?.nombre}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                    {expediente.certificado_url ? (
                                        <a
                                        href={`${serverURL}/${expediente.certificado_url}`}
                                        download
                                        target="_blank"
                                        className="mr-2 hover:text-green-500 p-1.5 hover:bg-black/0 rounded-md badge badge-success"
                                        >
                                        <div className="tooltip" data-tip="Certificado de Discapacidad">
                                            <FaFilePdf />
                                        </div>
                                        </a>
                                    ) : (
                                        <span className="text-red-500">No existe certificado</span>
                                    )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {expediente.costo}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                    {expediente.certificado_url ? (
                                        <a
                                            href={`${serverURL}/${expediente.comprobante_url}`}
                                            download
                                            target="_blank"
                                            className="mr-2 hover:text-green-500 p-1.5 hover:bg-black/0 rounded-md badge badge-success"
                                        >
                                            <div className="tooltip" data-tip="Comprovantes">
                                                <FaFilePdf />
                                            </div>
                                        </a>
                                    ) : ( <span className="text-red-500">No existe comprobante</span>
                                    )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <a
                                            href={`${serverURL}/${expediente.archivo_url}`}
                                            download
                                            target="_blank"
                                            className="mr-2 hover:text-green-500 p-1.5 hover:bg-black/0 rounded-md badge badge-success"
                                        >
                                            <div className="tooltip" data-tip="Archivo">
                                                <FaFilePdf />
                                            </div>
                                        </a>
                                    </td>

                                    <td>
                                        <span
                                            className={`badge badge-sm ${expediente.Estado?.id === 1
                                                ? "badge-warning"
                                                : expediente.Estado?.id === 2
                                                    ? "badge-accent"
                                                    : expediente.Estado?.id === 3
                                                        ? "badge-error"
                                                        : expediente.Estado?.id === 4
                                                            ? "badge-info"
                                                            : "badge-success text-white"
                                                }`}
                                        >
                                            {expediente.Estado?.nombre}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                                        <button
                                            onClick={() => openActualizarModal(expediente)}
                                            className="mr-2 hover:text-blue-500 p-1.5 hover:bg-black/0 rounded-md badge badge-info"
                                        >
                                            <div className="tooltip" data-tip="Actualizar">
                                                <FaPencil />
                                            </div>
                                        </button>
                                        <button
                                            onClick={() => openConfirmation(expediente.id)}
                                            className="mr-2 hover:text-red-500 p-1.5 hover:bg-black/0 rounded-md badge badge-error"
                                        >
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
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                        <div className="p-6 space-y-4 bg-white rounded-lg">
                            <h2 className="text-lg font-bold md:text-2xl">
                                Confirmar eliminación
                            </h2>
                            <div className="text-sm dark:text-black">
                                <p className="">
                                    ¿Estás seguro de que deseas eliminar este expediente?
                                </p>
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    className="btn btn-error"
                                    onClick={handleDeleteExpediente}
                                >
                                    Confirmar
                                </button>
                                <button className="btn" onClick={closeConfirmation}>
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DshContainer>
    );
};
export default DshExpediente;
