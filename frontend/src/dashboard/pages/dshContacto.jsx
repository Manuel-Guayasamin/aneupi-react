import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaPencil, FaTrash } from 'react-icons/fa6';
import { PiMicrosoftExcelLogoFill } from 'react-icons/pi';
import { useForm } from 'react-hook-form';
import useAdminResource from '../../hooks/useAdminResource';
import DshContainer from '../layout/dshContainer';
import { createContacto, deleteContacto, fetchContactos } from '../../redux/slices/contactosSlice';
import ActionButton from '../components/Buttons/ActionButton';
import { FaCalendarPlus } from 'react-icons/fa';
import ModalActualizar from '../../admin_pages/Eventos/ModalActualizarEvento';
import ModalRegistro from '../../admin_pages/Eventos/ModalRegistroEvento';

const DshContacto = () => {
  const dispatch = useDispatch();
  const {
    resources: contactos, // Updated variable name
    loading,
    showConfirmation,
    openConfirmation,
    closeConfirmation,
    confirmDelete,
    showRegistroModal,
    showActualizarModal,
    resourceSelected: contactoSelected,
    openRegistroModal,
    openActualizarModal,
    closeRegistroModal,
    closeActualizarModal,
    resourceUpdated,
    setResourceUpdated,
  } = useAdminResource(fetchContactos, deleteContacto, 'contactos');


  useEffect(() => {
    dispatch(fetchContactos());
  }, [dispatch]);

  const handleDeleteContacto = () => {
    setResourceUpdated({
      ...resourceUpdated,
      isRegistered: {
        ...resourceUpdated.isUdated,
        value: true,
      },
    });
    confirmDelete();
  }

  const ContactoOrden = [...contactos].sort((a, b) => a.id - b.id);

  return (
    <DshContainer title="Contactos" >
      <ModalRegistro
        resourceUpdated={resourceUpdated}
        setResourceUpdated={setResourceUpdated}
        showModal={showRegistroModal}
        closeModal={closeRegistroModal}
      />
      <ModalActualizar
        resourceUpdated={resourceUpdated}
        setResourceUpdated={setResourceUpdated}
        showModal={showActualizarModal}
        closeModal={closeActualizarModal}
        eventoSelected={contactoSelected} // Corregir el nombre de la prop para pasar el usuario seleccionado
      />

      <div className="overflow-x-auto">
        <table className="w-full mb-8">
          <thead className="text-xs font-bold tracking-wider text-white uppercase ">
            <tr className='text-left bg-colorcito dark:bg-blue-700'>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3 ">Nombres</th>
              <th className="px-6 py-3">Apellidos</th>
              <th className="px-6 py-3">Telefono</th>
              <th className="px-6 py-3">País</th>
              <th className="px-6 py-3">Lugar</th>
              <th className="px-6 py-3">Discapacidad</th>
              <th className="px-6 py-3">Correo Electronico</th>
              <th className="px-6 py-3">Asunto</th>
              <th className="px-6 py-3">Mensaje</th>
              <th className="px-6 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="dsh-tertiary divider-y divider-yellow-400">
            {!loading && ContactoOrden.map((contacto, index) => (
              <tr key={contacto.id}>
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{contacto.nombres}</td>
                <td className="px-6 py-4 whitespace-nowrap">{contacto.apellidos}</td>
                <td className="px-6 py-4 whitespace-nowrap">{contacto.telefono}</td>
                <td className="px-6 py-4 whitespace-nowrap">{contacto.Pai.nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap">{contacto.ciudad}</td>
                <td className="px-6 py-4 whitespace-nowrap">{contacto.discapacidad ? 'Sí' : 'No'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{contacto.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{contacto.asunto}</td>
                <td className="px-6 py-4 whitespace-normal line-clamp-5 overflow-y-auto w-80">{contacto.mensaje}</td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">
                  {/* <button onClick={() => openActualizarModal(contacto.id)} className="mr-2 hover:text-blue-500 p-1.5 hover:bg-black/0 rounded-md badge badge-info">
                    <FaPencil />
                  </button> */}
                  <div className="flex justify-center">
                    <button onClick={() => openConfirmation(contacto.id)} className=" hover:text-red-500 p-1.5 hover:bg-black/0 rounded-md badge badge-error">
                      <div className="tooltip" data-tip="Eliminar">
                        <FaTrash />
                      </div>
                    </button>
                  </div>
                  {/* <button onClick={() => handleGenerateExcel(contacto.id)} className="hover:text-green-500 p-1.5 hover:bg-black/0 rounded-md badge badge-success">
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
                  onClick={handleDeleteContacto}
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



export default DshContacto;
