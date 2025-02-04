import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { fetchEstados } from "../../redux/slices/estadosSlice";
import {
  fetchExpedientes,
  updateExpediente,
} from "../../redux/slices/expedienteSlice";

const TextInput = ({
  label,
  name,
  type = "text",
  register,
  errors,
  required,
}) => (
  <div>
    <div className="flex items-center justify-between mb-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-900">
        {label}
      </label>
    </div>
    <input
      id={name}
      type={type}
      className={`w-full text-sm input input-bordered input-ghost text-gray-900`}
      placeholder={label}
      {...register(name, {
        required: required ? "Este campo es obligatorio" : false,
      })}
    />
    {errors[name] && (
      <span className="text-xs text-red-600">{errors[name].message}</span>
    )}
  </div>
);

const ModalActualizarExpediente = ({
  showModal,
  closeModal,
  expedienteSelected,
}) => {
  const dispatch = useDispatch();

  const estados = useSelector((state) => state.estados.estados);

  useEffect(() => {
    dispatch(fetchEstados());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({});

  const onSubmit = async (expedienteData) => {
    try {
      dispatch(
        updateExpediente({ id: expedienteSelected.id, expedienteData })
      ).then(() => {
        dispatch(fetchExpedientes());
        closeModal();
      });
    } catch (error) {
      console.error("Error al actualizar el expediente:", error);
    }
  };

  useEffect(() => {
    // Establecer los valores del formulario cuando eventoSelected cambia
    if (expedienteSelected) {
      Object.keys(expedienteSelected).forEach((key) => {
        setValue(key, expedienteSelected[key]);
      });
    }
  }, [setValue, expedienteSelected]);

  return (
    showModal && (
      <div className="fixed inset-0 z-50 grid p-2 overflow-auto bg-gray-900 bg-opacity-50 md:p-4 place-items-center">
        <div className="w-full max-w-lg bg-white rounded-lg shadow">
          <div className="p-6 space-y-4">
            <h1 className="text-xl font-bold leading-tight text-center text-gray-900">
              Actualizar Estado del expediente
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
              encType="multipart/form-data"
            >
              <div>
                <label
                  htmlFor="id_estado"
                  className="block text-sm font-medium text-gray-900"
                >
                  Estado
                </label>
                <select
                  className="w-full text-sm text-gray-900 input input-bordered input-ghost"
                  {...register("id_estado", {
                    required: "Es obligatorio seleccionar un estado",
                  })}
                >
                  <option value="">Selecciona un estado</option>
                  {estados.map((estado) => (
                    <option key={estado.id} value={estado.id}>
                      {estado.nombre}
                    </option>
                  ))}
                </select>
                {errors.id_estado && (
                  <span className="text-white badge badge-error badge-sm">
                    {errors.id_estado.message}
                  </span>
                )}
              </div>
              <fieldset className="flex items-center gap-4">
                <button
                  type="submit"
                  className="px-16 py-3 text-white rounded-lg bg-colorcito hover:text-colorcito border border-transparent
									hover:border-colorcito hover:bg-white hover:shadow-lg hover:shadow-gray-500 dark:bg-blue-700 dark:text-white 
									dark:hover:bg-white dark:hover:text-blue-700 dark:hover:border-blue-700"
                >
                  Actualizar Expediente
                </button>
                <button
                  type="button"
                  className="px-11 py-3 text-red-700 bg-white rounded-lg  border border-transparent
                  border-red-700 hover:text-white hover:bg-red-600 hover:shadow-lg hover:shadow-gray-500"
                  onClick={closeModal}
                >
                  Cancelar
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default ModalActualizarExpediente;
