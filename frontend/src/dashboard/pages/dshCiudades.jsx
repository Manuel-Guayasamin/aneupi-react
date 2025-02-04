import { useDispatch } from "react-redux"
import useAdminResource from "../../hooks/useAdminResource";
import DshContainer from "../layout/dshContainer";
import ActionButton from "../components/Buttons/ActionButton";
import { MdAssignmentAdd } from "react-icons/md";
import { FaPencil, FaTrash } from "react-icons/fa6"
import ModalRegistroCiudad from "../../admin_pages/Ciudades/ModalRegistroCiudad";


import { useEffect } from "react";
import { deleteCiudad, fetchCiudades } from "../../redux/slices/ciudadesSlice";
import { getAllPaises } from "../../redux/slices/paisesSlice";
import ModalActualizarCiudad from "../../admin_pages/Ciudades/ModalActualizarCiudad";

const DshCiudades = () => {
    const dispatch = useDispatch();

    const {
        resources: ciudades,
        loading,
        showConfirmation,
        openConfirmation,
        closeConfirmation,
        confirmDelete,
        showRegistroModal,
        showActualizarModal,
        resourceSelected: ciudadSelected,
        openRegistroModal,
        openActualizarModal,
        closeRegistroModal,
        closeActualizarModal,
    } = useAdminResource(fetchCiudades, deleteCiudad, "ciudades");

    useEffect(() => {
        dispatch(fetchCiudades());
        dispatch(getAllPaises());
    }, [dispatch]);

    return (
        <DshContainer title="Ciudades" content={<ActionButton ActionIcon={MdAssignmentAdd} label="Crear Nueva Ciudad" onClick={openRegistroModal} />}>

            <ModalRegistroCiudad
                showModal={showRegistroModal}
                closeModal={closeRegistroModal}
            />

            <ModalActualizarCiudad
                showModal={showActualizarModal}
                closeModal={closeActualizarModal}
                ciudadSelected={ciudadSelected}
            />

            <div className="overflow-x-auto">
                <table className="w-full mb-8">
                    <thead className="text-xs font-bold tracking-wider text-white uppercase ">
                        <tr className='text-left colorcito dark:bg-blue-700'>
                            <th className="px-6 py-3">#</th>
                            <th className="px-6 py-3">Nombre</th>
                            <th className="px-6 py-3">Zona Horaria</th>
                            <th className="px-6 py-3">País</th>
                            <th className="px-6 py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="dsh-tertiary divider-y divider-yellow-400">
                        {!loading && ciudades.map((cd, index) => (
                            <tr key={cd.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{cd.nombre}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{cd.zona_horaria}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{cd.Pai?.nombre}</td>
                                <td className="px-6 py-4 text-sm whitespace-nowrap">
                                    <button
                                        onClick={() => openActualizarModal(cd)} className="mr-2 hover:text-blue-500 p-1.5 hover:bg-black/0 rounded-md badge badge-info"
                                    ><FaPencil />
                                    </button>
                                    <button
                                        onClick={() => openConfirmation(cd.id)} className="mr-2 hover:text-red-500 p-1.5 hover:bg-black/0 rounded-md badge badge-error"
                                    ><FaTrash />
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
                                <p className=''>¿Estás seguro de que deseas eliminar esta ciudad?</p>
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
        </DshContainer>
    )
}

export default DshCiudades;