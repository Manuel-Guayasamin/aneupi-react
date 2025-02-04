import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchEstados } from "../../redux/slices/estadosSlice";
import { fetchTiposBibliotecas } from "../../redux/slices/tipoBibliotecaSlice";
import {
  createBiblioteca,
  fetchBibliotecas,
} from "../../redux/slices/bibliotecaSlice";

const TextInput = ({
  label,
  name,
  type = "text",
  register,
  errors,
  required,
  min,
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
        min: min || undefined, // Use min validation rule if min prop is provided
      })}
      min={min} // Set min attribute if min prop is provided
    />
    {errors[name] && (
      <span className="text-xs text-red-600">{errors[name].message}</span>
    )}
  </div>
);

const ModalRegistroBiblioteca = ({ showModal, closeModal }) => {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.authentication.usuario);


  useEffect(() => {
    dispatch(fetchTiposBibliotecas()).then((response) => {
      console.log(response); // Log the fetched modalidades
    });
    dispatch(fetchEstados());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (bibliotecaData) => {
    try {
      console.log(bibliotecaData);
      bibliotecaData.id_usuario = usuario.id;
      dispatch(createBiblioteca(bibliotecaData)).then(() => {
        dispatch(fetchBibliotecas());
        closeModal();
      });
    } catch (error) {
      console.error("Error al proponer evento:", error);
    }
  };

  useEffect(() => {
    reset();
  }, [reset, showModal]);

  return (
    showModal && (
      <div className="fixed inset-0 z-50 grid p-2 overflow-auto bg-gray-900 bg-opacity-50 md:p-4 place-items-center">
        <div className="w-full max-w-lg bg-white rounded-lg shadow">
          <div className="p-6 space-y-4">
            <h1 className="text-xl font-bold leading-tight text-center text-gray-900">
              Propuesta de Biblioteca
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
              encType="multipart/form-data"
            >
              <fieldset className="grid gap-4 ">
                <label
                  htmlFor="id_tipo_biblioteca"
                  className="block text-sm font-medium text-gray-900"
                >
                  Tipo
                </label>
                {/* <select
                                        id='id_tipo_biblioteca'
                                        label='id_tipo_biblioteca'
                                        name='id_tipo_biblioteca.id'
                                        className='w-full mt-1 text-sm text-gray-900 select select-bordered select-ghost'
                                        {...register('id_tipo_biblioteca.id', {
                                            required: 'Campo obligatorio',
                                        })}
                                    >
                                        <option value={1}>libro </option>
                                        <option value={2}>Articulo </option>
                                        <option value={3}>Revista </option>
                                    </select> */}
                <select
                  id="id_tipo_biblioteca"
                  label="id_tipo_biblioteca"
                  name="id_tipo_biblioteca"
                  className="w-full mt-1 text-sm text-gray-900 select select-bordered select-ghost"
                  {...register("id_tipo_biblioteca", {
                    required: "Campo obligatorio",
                  })}
                >
                  <option value={1}>Libro </option>
                  <option value={2}>Articulo </option>
                  <option value={3}>Revista </option>
                </select>
                {errors.id_tipo_biblioteca &&
                  errors.id_tipo_biblioteca.tipo && (
                    <span className="text-white badge badge-error badge-sm">
                      {errors.id_tipo_biblioteca.tipo.message}
                    </span>
                  )}
              </fieldset>
              <fieldset className="grid gap-2 md:grid-cols-2">
                <TextInput
                  label="Título"
                  name="titulo"
                  register={register}
                  errors={errors}
                  required
                />
                <TextInput
                  label="Nombre"
                  name="nombre_autor"
                  register={register}
                  errors={errors}
                  required
                />
                <TextInput
                  label="Editorial"
                  name="editorial"
                  register={register}
                  errors={errors}
                  required
                />
                <TextInput
                  label="Año de publicación"
                  name="fecha_publicacion"
                  type="date"
                  register={register}
                  errors={errors}
                  required
                />
              </fieldset>
              <fieldset className="grid gap-2">
                <label
                  htmlFor="imagen"
                  className="block text-sm font-medium text-gray-900"
                >
                  Imagen
                </label>
                <input
                  className='text-gray-900 w-full file:py-2 file:px-4 file:border-0 file:text-white file:bg-colorcito file:cursor-pointer mb-3 hover:file:text-colorcito hover:file:bg-white
                 dark:file:bg-blue-700 dark:hover:file:text-blue-700 dark:hover:file:bg-white file-input file-input-bordered'
                  {...register("imagen", {
                    required: true,
                    validate: {
                      lessThan100000kb: (value) => value[0]?.size < 1000000, // 5MB in bytes
                    },
                  })}
                  type="file"
                  accept="image/*"
                />
                {errors.imagen && errors.imagen.type === "required" && (
                  <span className="mt-2 text-sm text-red-500">
                    Este campo es requerido
                  </span>
                )}
                {errors.imagen && errors.imagen.type === "lessThan300kb" && (
                  <span className="mt-2 text-sm text-red-500">
                    El tamaño máximo permitido es de 300kb
                  </span>
                )}
              </fieldset>
              <fieldset className="grid gap-2">
                <label
                  htmlFor="archivo"
                  className="block text-sm font-medium text-gray-900"
                >
                  Archivo
                </label>
                <input
                  className='text-gray-900 w-full file:py-2 file:px-4 file:border-0 file:text-white file:bg-colorcito file:cursor-pointer mb-3 hover:file:text-colorcito hover:file:bg-white
                 dark:file:bg-blue-700 dark:hover:file:text-blue-700 dark:hover:file:bg-white file-input file-input-bordered'
                  {...register("archivo", {
                    required: true,
                    validate: {
                      maxFileSize: (value) => value[0]?.size < 50 * 1024 * 1024, // 50MB in bytes
                    },
                  })}
                  type="file"
                  accept="application/pdf" // accept pdf file
                />
                {errors.file && (
                  <span className="mt-2 text-sm text-red-500">
                    {errors.file.type === "required"
                      ? "Este campo es requerido"
                      : errors.file.type === "maxFileSize"
                        ? "El tamaño máximo permitido es de 50Mb"
                        : "Solo se permiten archivos PDF"}
                  </span>
                )}
              </fieldset>
              <fieldset className="grid gap-2">
                <label
                  htmlFor="descripcion"
                  className="block text-sm font-medium text-gray-900"
                >
                  Descripción
                </label>
                <textarea
                  className="w-full mt-1 text-sm text-gray-900 input input-bordered input-ghost"
                  {...register("descripcion", {
                    required: "Descripción del evento es obligatoria",
                  })}
                  rows={5}
                ></textarea>
                {errors.descripcion && (
                  <span className="text-xs font-semibold text-red-600">
                    {errors.descripcion.message}
                  </span>
                )}
              </fieldset>
              <fieldset className="flex items-center gap-4">
                <button type="submit"
                  className="px-20 py-3 text-white rounded-lg bg-colorcito hover:text-colorcito border border-transparent
									hover:border-colorcito hover:bg-white hover:shadow-lg hover:shadow-gray-500 dark:bg-blue-700 dark:text-white 
									dark:hover:bg-white dark:hover:text-blue-700 dark:hover:border-blue-700">
                  Crear Biblioteca
                </button>
                <button
                  type="button"
                  className="px-12 py-3 text-red-700 bg-white rounded-lg  border border-transparent
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

export default ModalRegistroBiblioteca;
