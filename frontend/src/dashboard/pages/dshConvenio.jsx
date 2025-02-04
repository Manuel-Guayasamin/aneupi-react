import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaFilePdf, FaPencil, FaTrash } from 'react-icons/fa6';
import { PiMicrosoftExcelLogoFill } from 'react-icons/pi';
import { fetchConvenios, deleteConvenio } from '../../redux/slices/conveniosSlice';
import useAdminResource from '../../hooks/useAdminResource';
import DshContainer from '../layout/dshContainer';
import ModalActualizar from '../../admin_pages/Convenios/ModalActualizarConvenio';
import ModalActualizarConvenio from '../../admin_pages/Convenios/ConvenioActualizar';
const serverURL = import.meta.env.VITE_API_URL;

const DshConvenio = () => {
  const dispatch = useDispatch();
  const {
    resources: convenios, // Updated variable name
    loading,
    showConfirmation,
    openConfirmation,
    closeConfirmation,
    confirmDelete,
    showRegistroModal,
    showActualizarModal,
    resourceSelected: convenioSelected,
    openRegistroModal,
    openActualizarModal,
    closeRegistroModal,
    closeActualizarModal,
    resourceUpdated,
    setResourceUpdated,
  } = useAdminResource(fetchConvenios, deleteConvenio, 'convenios');

  useEffect(() => {
    dispatch(fetchConvenios());
  }, [dispatch]);

  const handleDeleteConvenio = () => {
    setResourceUpdated({
      ...resourceUpdated,
      isRegistered: {
        ...resourceUpdated.isUdated,
        value: true,
      },
    });
    confirmDelete();
  }

  const conveniOrden = [...convenios].sort((a, b) => a.id - b.id);

  return (
    <DshContainer title="Convenios">
      <ModalActualizarConvenio
        resourceUpdated={resourceUpdated}
        setResourceUpdated={setResourceUpdated}
        showModal={showActualizarModal}
        closeModal={closeActualizarModal}
        convenioSelected={convenioSelected}
      />
      <div className="overflow-x-auto">
        <table className="w-full mb-8 ">
          <thead className="text-xs font-bold tracking-wider text-white uppercase ">
            <tr className='text-left colorcito dark:bg-blue-700'>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3 ">Tipo Convenio</th>
              <th className="px-6 py-3">Organización</th>
              <th className="px-6 py-3">Descripción</th>
              {/* <th className="px-6 py-3">Modalidad</th> */}
              <th className="px-6 py-3">Fecha Inicio</th>
              <th className="px-6 py-3">Fecha Fin</th>
              <th className="px-6 py-3">Duración</th>
              <th className="px-6 py-3">Estado</th>
              <th className="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody className="dsh-tertiary divider-y divider-yellow-400 ">
            {!loading && conveniOrden.map((convenio, index) => (
              <tr key={index + 1}>
                <td className="px-6 py-4 whitespace-nowrap">{convenio.id}</td>

                <td className="px-6 py-4 whitespace-nowrap">

                  <span
                    className={`badge badge-sm ${convenio.TipoConvenio?.id === 1
                      ? 'badge-warning'
                      : convenio.TipoConvenio?.id === 2
                        ? 'badge-accent'
                        : convenio.TipoConvenio?.id === 3
                          ? 'badge-error'
                          : 'badge-success text-white'
                      }`}
                  >
                    {convenio.TipoConvenio?.nombre}
                  </span>
                </td>




                <td className="px-6 py-4 whitespace-nowrap">{convenio.nombreOrganizacion}</td>
                {/* <td className="px-6 py-4 whitespace-normal break-words max-lg:line-clamp-5 max-lg:overflow-y-auto">{convenio.descripcion}</td> */}
                <td className="px-6 py-4 whitespace-normal line-clamp-5 overflow-y-auto w-80">{convenio.descripcion}</td>
                {/* <td className="px-6 py-4 whitespace-nowrap">{convenio.Modalidad?.nombre}</td> */}
                <td className="px-6 py-4 whitespace-nowrap">{getFormatDate(convenio.fecha_inicio)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{getFormatDate(convenio.fecha_fin)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{convenio.duracion + ' años'}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`badge badge-sm ${convenio.Estado?.id === 1
                      ? 'badge-warning'
                      : convenio.Estado?.id === 2
                        ? 'badge-accent'
                        : convenio.Estado?.id === 3
                          ? 'badge-error'
                          : convenio.Estado?.id === 4
                            ? 'badge-info'
                            : 'badge-success text-white'
                      }`}
                  >
                    {convenio.Estado?.nombre}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">
                  <button onClick={() => openActualizarModal(convenio)} className="mr-2 hover:text-blue-500 p-1.5 hover:bg-black/0 rounded-md badge badge-info">
                    <div className="tooltip" data-tip="Actualizar">
                      <FaPencil />
                    </div>
                  </button>
                  <button onClick={() => openConfirmation(convenio.id)} className="mr-2 hover:text-red-500 p-1.5 hover:bg-black/0 rounded-md badge badge-error">
                    <div className="tooltip" data-tip="Eliminar">
                      <FaTrash />
                    </div>
                  </button>
                  <a href={convenio.propuesta} target='_blank' download className='mr-2 hover:text-yellow-500 p-1.5 hover:bg-black/0 rounded-md badge badge-warning'>
                    <div className="tooltip" data-tip="Propuesta">
                      <FaFilePdf />
                    </div>
                  </a>
                  <a href={convenio.convenio_parcial} target='_blank' download className='mr-2 hover:text-green-500 p-1.5 hover:bg-black/0 rounded-md badge badge-success'>
                    <div className="tooltip" data-tip="Convenio Parcial">
                      <FaFilePdf />
                    </div>
                  </a>
                  {/* <button onClick={() => handleGenerateExcel(convenio.id)} className="hover:text-green-500 p-1.5 hover:bg-black/0 rounded-md badge badge-success">
                    <PiMicrosoftExcelLogoFill />
                  </button> */}
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
                <p className=''>¿Estás seguro de que deseas eliminar este convenio?</p>
              </div>
              <div className='flex justify-end gap-2 mt-4'>
                <button
                  className="px-5 py-3 text-white rounded-lg bg-red-600 hover:text-red-600 border border-transparent
                  hover:border-red-600 hover:bg-white hover:shadow-lg hover:shadow-gray-500 dark:bg-red-700 dark:text-white 
                  dark:hover:bg-white dark:hover:text-red-700 dark:hover:border-red-700"
                  onClick={handleDeleteConvenio}
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

function getFormatDate(date) {
  const d = new Date(date);
  // return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}

export default DshConvenio;
