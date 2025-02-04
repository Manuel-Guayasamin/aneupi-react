import { useEffect } from "react";
import { useDispatch } from "react-redux"

import useAdminResource from "../../hooks/useAdminResource";
import DshContainer from "../layout/dshContainer";
import ActionButton from "../components/Buttons/ActionButton";
import ModalRegistroServicio from "../../admin_pages/Servicios/ModalRegistroServicio";
import ModalActualizarServicio from "../../admin_pages/Servicios/ModalActualizarServicio";

import { fetchServicios, deleteServicio, generateServiciosExcel } from "../../redux/slices/serviciosSlice";
import { getAllUsuarios } from "../../redux/slices/usuariosSlice";

import { MdAssignmentAdd } from "react-icons/md";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { FaPencil, FaTrash } from "react-icons/fa6"


const DshServices = () => {
  const dispatch = useDispatch();
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
    dispatch(getAllUsuarios());
  }, [dispatch]);

  return (
    <DshContainer title="Servicios" content={<ActionButton ActionIcon={MdAssignmentAdd} label="Crear Nuevo Servicio" onClick={openRegistroModal} />}>
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
      <div className="overflow-x-auto">
        <table className="w-full mb-8">
          <thead className="text-xs font-bold tracking-wider text-white uppercase ">
            <tr className='text-left colorcito dark:bg-blue-700'>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Titulo</th>
              <th className="px-6 py-3">Descripción</th>
              {/* <th className="px-6 py-3">Profesional</th> */}
              <th className="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody className="dsh-tertiary divider-y divider-yellow-400">
            {!loading && servicios.map((servicio, index) => (
              <tr key={servicio.id}>
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{servicio.nombre}</td>
                <td className="px-6 py-4 whitespace-normal line-clamp-5 overflow-y-auto">{servicio.descripcion}</td>
                {/* <td className="px-6 py-4 whitespace-nowrap">
                  {`${servicio.Usuario?.nombres.split(' ')[0]} ${servicio.Usuario?.apellidos.split(' ')[0]
                    }`}
                </td> */}
                <td className="px-6 py-4 text-sm whitespace-nowrap">
                  <button onClick={() => openActualizarModal(servicio)} className="mr-2 hover:text-blue-500 p-1.5 hover:bg-black/0 rounded-md badge badge-info">
                    <div className="tooltip" data-tip="Actualizar">
                      <FaPencil />
                    </div>
                  </button>
                  <button onClick={() => openConfirmation(servicio.id)} className="mr-2 hover:text-red-500 p-1.5 hover:bg-black/0 rounded-md badge badge-error">
                    <div className="tooltip" data-tip="Eliminar">
                      <FaTrash />
                    </div>
                  </button>
                  {/* <button onClick={() => handleGenerateExcel(servicio.id)} className="hover:text-green-500 p-1.5 hover:bg-black/0 rounded-md badge badge-success">
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
                <p className=''>¿Estás seguro de que deseas eliminar este servicio?</p>
              </div>
              <div className='flex justify-end gap-2 mt-4'>
                <button
                  className="px-5 py-3 text-white rounded-lg bg-red-600 hover:text-red-600 border border-transparent
                  hover:border-red-600 hover:bg-white hover:shadow-lg hover:shadow-gray-500 dark:bg-red-700 dark:text-white 
                  dark:hover:bg-white dark:hover:text-red-700 dark:hover:border-red-700"
                  onClick={confirmDelete}
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

export default DshServices;
