import React, { useEffect, useState } from 'react';
import DshContainer from "../../layout/dshContainer"
import { useDispatch } from 'react-redux';
import { FaPencil, FaTrash, FaFilePdf } from 'react-icons/fa6';
import { PiMicrosoftExcelLogoFill } from 'react-icons/pi';
import { fetchPostulantes, deletePostulante } from '../../../redux/slices/postulantesSlice';
import useAdminResource from '../../../hooks/useAdminResource';
import ModalActualizarPostula from '../../../admin_pages/PostulaSolicitudes/ModalActualizarSolicitudPostula';
import { deleteSolicitudPractica, fetchSolicitudPractica } from '../../../redux/slices/solicitarPracticasSlice';

const DshPostulaPracticasLibres = () => {
  const dispatch = useDispatch();
  const {
    resources: solicitudes, // Updated variable name
    loading,
    showConfirmation,
    openConfirmation,
    closeConfirmation,
    confirmDelete,
    showRegistroModal,
    showActualizarModal,
    resourceSelected: pasanteSelected,
    openRegistroModal,
    openActualizarModal,
    closeRegistroModal,
    closeActualizarModal,
    resourceUpdated,
    setResourceUpdated,
  } = useAdminResource(fetchSolicitudPractica, deleteSolicitudPractica, 'solicitudes');

  useEffect(() => {
    dispatch(fetchSolicitudPractica());
  }, [dispatch]);

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
  const registrosPractica = solicitudes.filter((registro) => {
    return registro.practica_id === null;
  });

  const sortedSolicitudes = [...registrosPractica].sort((a, b) => a.id - b.id);

  return (
    <DshContainer title="Postulaciones Libres a Prácticas">
      <ModalActualizarPostula
        resourceUpdated={resourceUpdated}
        setResourceUpdated={setResourceUpdated}
        showModal={showActualizarModal}
        closeModal={closeActualizarModal}
        solicitudSelected={pasanteSelected}
      />
      <div className="mb-8 overflow-x-auto ">
        <table className="w-full"><thead className="text-xs font-bold tracking-wider text-white uppercase">
          <tr className='text-left colorcito dark:bg-blue-700'>
            <th className="px-6 py-3 text-left whitespace-nowrap">#</th>
            <th className="px-6 py-3 text-left whitespace-nowrap">Universidad</th>
            <th className="px-6 py-3 text-left whitespace-nowrap">Carrera</th>
            <th className="px-6 py-3 text-left whitespace-nowrap">Empresa</th>
            <th className="px-6 py-3 text-left whitespace-nowrap">Pais</th>
            <th className="px-6 py-3 text-left whitespace-nowrap">Lugar</th>
            <th className="px-6 py-3 text-left whitespace-nowrap">Télefono</th>
            <th className="px-6 py-3 text-left whitespace-nowrap">Correo Electronico</th>
            <th className="px-6 py-3 text-left whitespace-nowrap">Tipo de Práctica</th>
            <th className="px-6 py-3 text-left whitespace-nowrap">Fecha de Inicio</th>
            <th className="px-6 py-3 text-left whitespace-nowrap">Fecha de Fin</th>
            <th className="px-6 py-3 text-left whitespace-nowrap">Total de Horas</th>
            <th className="px-6 py-3 text-left whitespace-nowrap">Discapacidad</th>
            <th className="px-6 py-3 text-left whitespace-nowrap">Modalidad</th>
            <th className="px-6 py-3">Estado</th>
            <th className="px-6 py-3 text-left whitespace-nowrap">Acciones</th>
          </tr>
        </thead>

          <tbody className='text-left dsh-tertiary divider-y divider-yellow-400'>
            {!loading && Array.isArray(sortedSolicitudes) && sortedSolicitudes.map((postulante, index) => (
              <tr key={postulante.id}>
                <td className='px-6 py-4'>{index + 1}</td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  {postulante.universidad}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>{postulante.carrera}</td>
                <td className='px-6 py-4 whitespace-nowrap font-bold'>
                  {postulante.empresa === "Fundación ANEUPI" ? (
                    <span className="text-sm text-white bg-colorcito badge px-4 py-3">
                      {postulante.empresa}
                    </span>
                  )
                    : postulante.empresa === "Academia ANEUPI" ? (
                      <span className="text-sm text-white bg-academia badge px-4 py-3">
                        {postulante.empresa}
                      </span>)
                      : postulante.empresa === "Institución Financiera ANEUPI" ? (
                        <span className="text-sm text-white bg-colorCoop badge px-4 py-3">
                          {postulante.empresa}
                        </span>)
                        : (
                          <span className="text-sm text-white bg-colorcitoleceni1 badge px-4 py-3">
                            {postulante.empresa}
                          </span>
                        )}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>{postulante.Pai.nombre}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{postulante.lugar}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{postulante.telefono}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{postulante.email}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{postulante.tipo_practica}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{new Date(postulante.fecha_inicio).toLocaleDateString("es-EC")}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{new Date(postulante.fecha_fin).toLocaleDateString("es-EC")}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{postulante.total_horas}</td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  {postulante.is_discapacidad ? 'Sí' : 'No'}
                </td>
                {/*
                <td className='px-6 py-4 whitespace-nowrap'>
                  {' '}
                  {new Date(
                    new Date(postulante.createdAt).getTime() + 24 * 60 * 60 * 1000,
                  ).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                  })}
                </td> */}

                <td className='px-6 py-4 whitespace-nowrap'>{postulante.Modalidad.nombre}</td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`badge badge-sm ${postulante.Estado?.id === 1
                      ? 'badge-warning'
                      : postulante.Estado?.id === 2
                        ? 'badge-accent'
                        : postulante.Estado?.id === 3
                          ? 'badge-error'
                          : postulante.Estado?.id === 4
                            ? 'badge-info'
                            : 'badge-success text-white'
                      }`}
                  >
                    {postulante.Estado?.nombre}
                  </span>
                </td>

                <td className="px-6 py-4 text-sm whitespace-nowrap">
                  <button onClick={() => openActualizarModal(postulante)} className="mr-2 hover:text-blue-500 p-1.5 hover:bg-black/0 rounded-md badge badge-info">
                    <div className="tooltip" data-tip="Actualizar">
                      <FaPencil />
                    </div>
                  </button>
                  <button onClick={() => openConfirmation(postulante.id)} className="mr-2 hover:text-red-500 p-1.5 hover:bg-black/0 rounded-md badge badge-error">
                    <div className="tooltip" data-tip="Eliminar">
                      <FaTrash />
                    </div>
                  </button>

                  <a href={postulante.curriculum} target='_blank' download className='mr-2 hover:text-green-500 p-1.5 hover:bg-black/0 rounded-md badge badge-success'>
                    <div className="tooltip" data-tip="Curriculum">
                      <FaFilePdf />
                    </div>
                  </a>
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

export default DshPostulaPracticasLibres;
