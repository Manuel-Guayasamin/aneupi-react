import { useDispatch } from "react-redux"
import useAdminResource from "../../hooks/useAdminResource";
import { deletePais, getAllPaises } from "../../redux/slices/paisesSlice";
import { useEffect } from "react";
import DshContainer from "../layout/dshContainer";
import ActionButton from "../components/Buttons/ActionButton";
import { MdAssignmentAdd } from "react-icons/md";
import { FaPencil, FaTrash } from "react-icons/fa6"
import ModalRegistroPais from "../../admin_pages/Paises/ModalRegistroPais";
import ModalActualizarPais from "../../admin_pages/Paises/ModalActualizarPais";

const DshPaises = () => {
  const dispatch = useDispatch();

  const {
    resources: paises,
    loading,
    showConfirmation,
    openConfirmation,
    closeConfirmation,
    confirmDelete,
    showRegistroModal,
    showActualizarModal,
    resourceSelected: paisSelected,
    openRegistroModal,
    openActualizarModal,
    closeRegistroModal,
    closeActualizarModal,
  } = useAdminResource(getAllPaises, deletePais, "paises");

  useEffect(() => {
    dispatch(getAllPaises());
  }, [dispatch]);

  return (
    <DshContainer
      title="Países"
      content={<ActionButton
        ActionIcon={MdAssignmentAdd}
        label="Registrar Nuevo País"
        onClick={openRegistroModal} />
      }
    >

      <ModalRegistroPais
        showModal={showRegistroModal}
        closeModal={closeRegistroModal}
      />

      <ModalActualizarPais
        showModal={showActualizarModal}
        closeModal={closeActualizarModal}
        paisSelected={paisSelected}
      />

      <div className="overflow-x-auto">
        <table className="w-full mb-8">
          <thead className="text-xs font-bold tracking-wider text-white uppercase ">
            <tr className='text-left colorcito dark:bg-blue-700'>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Nombre</th>
              <th className="px-6 py-3">Código Telefónico</th>
              <th className="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody className="dsh-tertiary divider-y divider-yellow-400">
            {!loading && paises.map((pais, index) => (
              <tr key={pais.id}>
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{pais.nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {pais.tlf_code}
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">
                  <button onClick={() => openActualizarModal(pais)} className="mr-2 hover:text-blue-500 p-1.5 hover:bg-black/0 rounded-md badge badge-info">
                    <div className="tooltip" data-tip="Actualizar">
                      <FaPencil />
                    </div>

                  </button>
                  <button onClick={() => openConfirmation(pais.id)} className="mr-2 hover:text-red-500 p-1.5 hover:bg-black/0 rounded-md badge badge-error">
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
                <p className=''>¿Estás seguro de que deseas eliminar este país?</p>
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

export default DshPaises;
