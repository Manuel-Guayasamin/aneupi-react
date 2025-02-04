import DshContainer from "../../layout/dshContainer"
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAdminResource from '../../../hooks/useAdminResource';
import { fetchSolicitudPractica, deleteSolicitudPractica } from "../../../redux/slices/solicitarPracticasSlice";
import { fetchEstados } from "../../../redux/slices/estadosSlice";
import { fetchModalidades } from "../../../redux/slices/modalidadesSlice";
import { FaTrash, FaFilePdf, FaPencil } from "react-icons/fa6";
import ModalActualizarSolicitudPostula from "../../../admin_pages/PostulaSolicitudes/ModalActualizarSolicitudPostula";

const DshPostulaSolicitudes = () => {

  const dispatch = useDispatch();

  const {
    resources: solicitarPractica, // Updated variable name
    loading,
    showConfirmation,
    openConfirmation,
    closeConfirmation,
    confirmDelete,
    showRegistroModal,
    showActualizarModal,
    resourceSelected: solicitudSelected,
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


  const handleDeleteSolicitudes = () => {
    setResourceUpdated({
      ...resourceUpdated,
      isRegistered: {
        ...resourceUpdated.isUdated,
        value: true,
      },
    });
    confirmDelete();
  }




  return (
    <DshContainer title="Solicitudes Extraordinarias">
      <ModalActualizarSolicitudPostula
        resourceUpdated={resourceUpdated}
        setResourceUpdated={setResourceUpdated}
        showModal={showActualizarModal}
        closeModal={closeActualizarModal}
        solicitudSelected={solicitudSelected}
      />
      <div className="mb-8 overflow-x-auto ">
        <table className="w-full"><thead className="text-xs font-bold tracking-wider text-white uppercase">
          <tr className='text-left colorcito dark:bg-blue-700'>
            <th className="px-6 py-3 text-left whitespace-nowrap">ID</th>
            <th className="px-6 py-3 text-left whitespace-nowrap">Empresa</th>
            <th className="px-6 py-3 text-left whitespace-nowrap">Nombre</th>
            <th className="px-6 py-3 text-left whitespace-nowrap">Apellido</th>
            <th className="px-6 py-3 text-left whitespace-nowrap">Correo</th>
            <th className="px-6 py-3 text-left whitespace-nowrap">Profesión</th>
            <th className="px-6 py-3 text-left whitespace-nowrap">Área</th>
            <th className="px-6 py-3 text-left whitespace-nowrap">País</th>
            <th className="px-6 py-3 text-left whitespace-nowrap">Ciudad</th>
            <th className="px-6 py-3 text-left whitespace-nowrap">Dirección</th>
            <th className="px-6 py-3 text-left whitespace-nowrap">Télefono</th>
            <th className="px-6 py-3 text-left whitespace-nowrap">Discapacidad</th>
            <th className="px-6 py-3 text-left whitespace-nowrap">Total de Horas</th>
            <th className="px-6 py-3 text-left whitespace-nowrap">Inicio</th>
            <th className="px-6 py-3 text-left whitespace-nowrap">Fin</th>
            <th className="px-6 py-3">Estado</th>
            <th className="px-6 py-3">CV</th>
            <th className="px-6 py-3 text-left whitespace-nowrap">Acciones</th>
          </tr>
        </thead>

          <tbody className='text-left dsh-tertiary divider-y divider-yellow-400'>
            {!loading &&
              Array.isArray(solicitarPractica) && solicitarPractica.map((solicitar, index) => (
                <tr key={solicitar.id}>
                  <td className='px-6 py-4'>{solicitar.id}</td>
                  <td className='px-6 py-4 font-bold whitespace-nowrap'>
                                    {solicitar.empresa === 'Fundacion ANEUPI' ? (
                                        <span className='text-white badge badge-primary badge-sm '>
                                            {solicitar.empresa}
                                        </span>
                                    ) : (
                                      solicitar.empresa === 'Constructora LECENI' ? (
                                        <span className='text-white badge badge-accent badge-sm'>
                                          {solicitar.empresa}
                                        </span>
                                      ) : (
                                        <span className='text-black badge badge-warning badge-sm'>
                                          Por asignar
                                        </span>
                                      )
                                    )}
                                </td>
                  {/* <td className='px-6 py-4 font-bold whitespace-nowrap'>
                    {solicitar.empresa === 'Fundacion ANEUPI' ? (
                      <span className='text-white badge badge-primary badge-sm '>
                        {solicitar.empresa}
                      </span>
                    ) : (
                      solicitar.empresa === 'Constructora LECENI' ? (
                        <span className='text-white badge badge-accent badge-sm'>
                          {solicitar.empresa}
                        </span>
                      ) : (
                        <span className='text-black badge badge-warning badge-sm'>
                          Por asignar
                        </span>
                      )
                    )}
                  </td> */}
                  <td className='px-6 py-4'>{solicitar.Usuario?.nombres}</td>
                  <td className='px-6 py-4'>{solicitar.Usuario?.apellidos}</td>
                  <td className='px-6 py-4'>{solicitar.Usuario?.email}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    {solicitar.universidad}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>{solicitar.carrera}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{solicitar.pais}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{solicitar.ciudad}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{solicitar.direccion}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{solicitar.telefono}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    {solicitar.is_discapacidad ? 'Sí' : 'No'}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>{solicitar.total_horas}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    {' '}
                    {new Date(
                      new Date(solicitar.fecha_inicio).getTime() + 24 * 60 * 60 * 1000,
                    ).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                    })}
                  </td>

                  <td className='px-6 py-4 whitespace-nowrap'>
                    {' '}
                    {new Date(
                      new Date(solicitar.fecha_fin).getTime() + 24 * 60 * 60 * 1000,
                    ).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                    })}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`badge badge-sm ${solicitar.Estado?.id === 1
                        ? 'badge-warning'
                        : solicitar.Estado?.id === 2
                          ? 'badge-accent'
                          : solicitar.Estado?.id === 3
                            ? 'badge-error'
                            : solicitar.Estado?.id === 4
                              ? 'badge-info'
                              : 'badge-success text-white'
                        }`}
                    >
                      {solicitar.Estado?.nombre}
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'><a href={solicitar.curriculum} download target="_blank" className="mr-2 hover:text-green-500 p-1.5 hover:bg-black/0 rounded-md badge badge-success"><FaFilePdf /></a></td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap">
                    <button onClick={() => openActualizarModal(solicitar)} className="mr-2 hover:text-blue-500 p-1.5 hover:bg-black/0 rounded-md badge badge-info">
                      <FaPencil />
                    </button>
                    <button onClick={() => openConfirmation(solicitar.id)} className="mr-2 hover:text-red-500 p-1.5 hover:bg-black/0 rounded-md badge badge-error">
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
              <div className="text-sm dark:text-black">
                <p className=''>¿Estás seguro de que deseas eliminar esta práctica?</p>
              </div>
              <div className='flex justify-end gap-2 mt-4'>
                <button
                  className='btn btn-error'
                  onClick={handleDeleteSolicitudes}
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
    </DshContainer>
  )
}

export default DshPostulaSolicitudes
