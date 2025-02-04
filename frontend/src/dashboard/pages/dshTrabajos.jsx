import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import useAdminResource from "../../hooks/useAdminResource";
import DshContainer from "../layout/dshContainer";
import ActionButton from "../components/Buttons/ActionButton";

import ModalActualizarTrabajo from "../../admin_pages/Trabajos/ModalActualizarTrabajo";
import ModalRegistroTrabajo from "../../admin_pages/Trabajos/ModalRegistroTrabajo";
import {
  deleteTrabajo,
  fetchTrabajos,
  generatePostulantesExcel,
} from "../../redux/slices/trabajosSlice";

import { FaDeleteLeft, FaPencil, FaList, FaTrash } from "react-icons/fa6";
import { BiIdCard } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { BsPersonFillAdd } from "react-icons/bs";
import { FaBriefcase, FaFileExcel } from "react-icons/fa";

function DshTrabajos() {
  const dispatch = useDispatch();

  const {
    resources: trabajos,
    loading,
    showConfirmation,
    openConfirmation,
    closeConfirmation,
    confirmDelete,
    showRegistroModal,
    showActualizarModal,
    resourceSelected: trabajoSelected,
    openRegistroModal,
    openActualizarModal,
    closeRegistroModal,
    closeActualizarModal,
    resourceUpdated,
    setResourceUpdated,
  } = useAdminResource(fetchTrabajos, deleteTrabajo, "trabajos");

  const handleGenerateExcel = (id) => {
    // Dispatch the generatePostulantesExcel thunk
    dispatch(generatePostulantesExcel(id))
      .unwrap()
      .then(() => {
        // Excel generated successfully
        console.log("Excel generated successfully");
      })
      .catch((error) => {
        // Error generating Excel
        console.error("Error generating Excel:", error);
      });
  };

  const handleDeleteWork = () => {
    setResourceUpdated({
      ...resourceUpdated,
      isRegistered: {
        ...resourceUpdated.isUdated,
        value: true,
      },
    });
    confirmDelete();
  };

  return (
    <DshContainer
      title="Trabajos"
      content={
        <ActionButton
          ActionIcon={FaBriefcase}
          label="Crear Nuevo Trabajo"
          onClick={openRegistroModal}
        />
      }
    >
      <ModalRegistroTrabajo
        resourceUpdated={resourceUpdated}
        setResourceUpdated={setResourceUpdated}
        showModal={showRegistroModal}
        closeModal={closeRegistroModal}
      />

      <ModalActualizarTrabajo
        resourceUpdated={resourceUpdated}
        setResourceUpdated={setResourceUpdated}
        showModal={showActualizarModal}
        closeModal={closeActualizarModal}
        trabajoSelected={trabajoSelected} // Corregir el nombre de la prop para pasar el trabajo seleccionado
      />
      <div className="flex items-center mx-auto mb-8 whitespace-nowrap">
        <div className="relative w-full">
          <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3"></div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full mb-8">
          <thead className="text-xs font-bold tracking-wider text-white uppercase">
            <tr className="text-left colorcito dark:bg-blue-700">
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Empresa</th>
              <th className="px-6 py-3">Departamento</th>
              <th className="px-6 py-3">Cargo</th>
              <th className="px-6 py-3">Horarios</th>
              <th className="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody className="dsh-tertiary divider-y divider-yellow-400">
            {!loading &&
              Array.isArray(trabajos) &&
              trabajos
                .slice() // Creamos una copia del arreglo para no modificar el original
                .sort((a, b) => a.id - b.id) // Ordenamos los trabajos por ID de manera ascendente
                .map((trabajo, index) => (
                  <tr key={trabajo.id}>
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4 font-normal whitespace-nowrap">
                      {trabajo.empresa === "Fundacion ANEUPI" ? (
                        <span className="px-4 py-3 text-sm text-white bg-colorcito badge">
                          {trabajo.empresa}
                        </span>
                      ) : trabajo.empresa === "Academia ANEUPI" ? (
                        <span className="px-4 py-3 text-sm text-white bg-colores badge">
                          {trabajo.empresa}
                        </span>
                      ) : trabajo.empresa ===
                        "Institución Financiera ANEUPI" ? (
                        <span className="px-4 py-3 text-sm text-white bg-neutral-600 badge">
                          {trabajo.empresa}
                        </span>
                      ) : (
                        <span className="px-4 py-3 text-sm text-white bg-colorcitoleceni1 badge">
                          {trabajo.empresa}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {trabajo.departamento}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {trabajo.cargo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {trabajo.horario}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                      <button
                        onClick={() => openActualizarModal(trabajo)}
                        className="mr-2 hover:text-blue-500 p-1.5 hover:bg-black/0 rounded-md badge badge-info"
                      >
                        <div className="tooltip" data-tip="Actualizar">
                          <FaPencil />
                        </div>
                      </button>
                      <button
                        onClick={() => openConfirmation(trabajo.id)}
                        className="mr-2 hover:text-red-500 p-1.5 hover:bg-black/0 rounded-md badge badge-error"
                      >
                        <div className="tooltip" data-tip="Eliminar">
                          <FaTrash />
                        </div>
                      </button>
                      <button
                        onClick={() => handleGenerateExcel(trabajo.id)}
                        className="hover:text-green-500 p-1.5 hover:bg-black/0 rounded-md badge badge-success"
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
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="p-6 space-y-4 bg-white rounded-lg">
              <h2 className="text-lg font-bold md:text-2xl">
                Confirmar eliminación
              </h2>
              <div className="text-sm dark:text-black">
                <p className="">
                  ¿Estás seguro de que deseas eliminar este trabajo?
                </p>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  className="px-5 py-3 text-white bg-red-600 border border-transparent rounded-lg hover:text-red-600 hover:border-red-600 hover:bg-white hover:shadow-lg hover:shadow-gray-500 dark:bg-red-700 dark:text-white dark:hover:bg-white dark:hover:text-red-700 dark:hover:border-red-700"
                  onClick={handleDeleteWork}
                >
                  Confirmar
                </button>

                <button
                  className="px-5 py-3 text-black bg-gray-300 border border-transparent rounded-lg hover:text-black hover:border-gray-500 hover:bg-white hover:shadow-lg hover:shadow-gray-500"
                  onClick={closeConfirmation}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pagination section */}
    </DshContainer>
  );
}

export default DshTrabajos;
