import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

function shortenString(str, maxLength) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + "...";
}

const TextInput = ({
  label,
  name,
  type = "text",
  register,
  errors,
  required,
  isToday,
  placeholder,
  variant = "faded", // similar to the variant in the Input component
}) => (
  <div className="mb-4">
    <label
      className={`block text-sm bold font-medium ${
        variant === "faded" ? "text-gray-500" : "text-gray-900"
      }`}
      htmlFor={name}
    >
      {label}
    </label>
    <input
      id={name}
      type={type}
      className={`w-full text-sm ${
        variant === "faded"
          ? "input input-bordered input-ghost text-gray-500 rounded-lg"
          : "input input-bordered text-gray-900 rounded-lg"
      }`}
      placeholder={placeholder || label}
      min={isToday && isToday}
      {...register(name, {
        required: required ? "Este campo es obligatorio" : false,
      })}
    />
    {errors[name] && (
      <span className="text-red-500 text-sm">
        {errors[name].message}
      </span>
    )}
  </div>
);


const SolicitarPracticasForm = ({
  showModal,
  setShowModal,
  handleSubmit,
  onSubmit,
  register,
  paises,
  errors,
  reset,
  initialValues,
  values
}) => {
  const { setValue, reset: resetForm } = useForm();
  const [curriculum, setCurriculum] = useState(null);
  const [fileError, setFileError] = useState(null);
  const today = new Date().toISOString().split("T")[0];
  const modalidades = useSelector((state) => state.modalidades.modalidades);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);

  useEffect(() => {
    if (showModal) {
      setIsSubmitButtonDisabled(true);
      if (initialValues) {
        const fechaInicioFormatted = initialValues.fecha_inicio
          ? new Date(initialValues.fecha_inicio).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })
          : "";

        const fechaFinFormatted = initialValues.fecha_fin
          ? new Date(initialValues.fecha_fin).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })
          : "";

        setValue("fecha_inicio", fechaInicioFormatted);
        setValue("fecha_fin", fechaFinFormatted);
      }
      setIsSubmitButtonDisabled(false);
    } else {
      resetForm();
    }
  }, [showModal, resetForm, setValue, initialValues]);

  const handleCloseModal = () => {
    setShowModal(false);
    setIsSubmitButtonDisabled(false);
    reset();
  };

  const handleFormSubmit = (data) => {
    setIsSubmitButtonDisabled(true);
    onSubmit(data);
  };

  return (
    showModal && (
      <div className="fixed inset-0 z-50 grid p-2 overflow-auto bg-gray-900 bg-opacity-50 md:p-4 place-items-center">
        <div className="modal-box rounded-xl">
          <div className="flex justify-end gap-4">
            <button
              type="button"
              color="danger" variant="light"
              onClick={handleCloseModal}
            >
              ✖
            </button>
          </div>
          <h3 className="mb-4 text-3xl font-bold text-left">¡Aplica ya!</h3>
          <div>
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="grid w-full gap-2"
            >
              {/* País */}
              <div className="grid gap-4 md:grid-cols-2">
                <fieldset>
                  <label
                    htmlFor="pais_id"
                    className="block text-sm font-medium text-gray-900"
                  >
                    País
                  </label>
                  <select
                    name="pais_id"
                    {...register("pais_id", {
                      required: "Por favor, seleccione un país",
                    })}
                    className="w-full text-sm input input-bordered input-ghost text-gray-900"
                  >
                    <option value="">Seleccione un país</option>
                    {paises.map((pais) => (
                      <option key={pais.id} value={pais.id}>
                        {pais.nombre}
                      </option>
                    ))}
                  </select>
                  {errors.pais_id && (
                    <span className="mt-2 text-white badge badge-error badge-sm">
                      {errors.pais_id.message}
                    </span>
                  )}
                </fieldset>
                {/* Ciudad */}
                <fieldset>
                  <label htmlFor="lugar"
                    className="block text-sm font-medium text-gray-900">Ciudad/Cantón/Pueblo</label>
                  <input
                    name="lugar"
                    type="text"
                    {...register("lugar", {
                      required: "Este campo es requerido",
                    })}
                    placeholder="Guayaquil"
                    className="w-full text-sm input input-bordered"
                  />
                  {errors.lugar && (
                    <span className="mt-2 text-white badge badge-error badge-sm">
                      {errors.lugar.message}
                    </span>
                  )}
                </fieldset>
              </div>
              {/* WhatsApp */}
              <div className="grid gap-4 md:grid-cols-2">
                <fieldset>
                  <label htmlFor="telefono"
                    className="block text-sm font-medium text-gray-900">Contacto</label>
                  <input
                    name="telefono"
                    type="text"
                    {...register("telefono", {
                      required: "Este campo es requerido",
                    })}
                    placeholder="Ingrese su numero de contacto"
                    className="w-full text-sm input input-bordered"
                  />
                  {errors.telefono && (
                    <span className="mt-2 text-white badge badge-error badge-sm">
                      {errors.telefono.message}
                    </span>
                  )}
                </fieldset>
                {/* ¿Eres Persona con Discapacidad? */}
                <fieldset>
                  <label htmlFor="is_discapacidad"
                    className="block text-sm font-medium text-gray-900">¿Tiene discapacidad?</label>
                  <select
                    name="is_discapacidad"
                    {...register("is_discapacidad", {
                      required: "Este campo es requerido",
                    })}
                    className="w-full text-sm input input-bordered input-ghost text-gray-900"
                  >
                    <option value="false">No</option>
                    <option value="true">Si</option>
                  </select>
                  {errors.is_discapacidad && (
                    <span className="mt-2 text-white badge badge-error badge-sm">
                      {errors.is_discapacidad.message}
                    </span>
                  )}
                </fieldset>
              </div>

              {/* Email */}
              <fieldset className="flex-1">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900"
                >
                  Correo Electrónico:
                </label>
                <input
                  {...register("email", {
                    required: "Este campo es requerido",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Ingrese una dirección de correo electrónico válida",
                    },
                  })}
                  type="email"
                  placeholder="juanperez@gmail.com"
                  id="email"
                  className="w-full text-sm input input-bordered"
                />
                {errors.email && (
                  <p className="mt-1 text-white badge badge-error badge-sm">
                    {errors.email.message}
                  </p>
                )}
              </fieldset>

              {/*
                MARK: Universidad
              */}
              <fieldset>
                <label htmlFor="universidad"
                  className="block text-sm font-medium text-gray-900">Universidad o Institución</label>
                <input
                  name="universidad"
                  type="text"
                  {...register("universidad", {
                    required: "Este campo es requerido",
                  })}
                  placeholder="Universidad de Cuenca, etc.."
                  className="w-full text-sm input input-bordered"
                />
                {errors.universidad && (
                  <span className="mt-2 text-white badge badge-error badge-sm">
                    {errors.universidad.message}
                  </span>
                )}
              </fieldset>

              <div className="grid gap-4 md:grid-cols-2">
                {/*
                MARK: Carrera
              */}
                <fieldset>
                  <label htmlFor="carrera"
                    className="block text-sm font-medium text-gray-900">Carrera que estudia</label>
                  <input
                    name="carrera"
                    type="text"
                    {...register("carrera", {
                      required: "Este campo es requerido",
                    })}
                    placeholder="Psicologia, Software, etc.."
                    className="w-full text-sm input input-bordered"
                  />
                  {errors.carrera && (
                    <span className="mt-2 text-white badge badge-error badge-sm">
                      {errors.carrera.message}
                    </span>
                  )}
                </fieldset>
                {/*
                MARK: Total de Horas
              */}
                <fieldset>
                  <TextInput
                    type="number"
                    label="Total de Horas"
                    name="total_horas"
                    register={register}
                    errors={errors}
                    isToday={today}
                    required
                  />
                </fieldset>
              </div>

              {/*
                MARK: Tipo de Práctica
              */}
              <div className="grid gap-4 md:grid-cols-2">
                <fieldset className="grid gap-2">
                  <div className="items-center justify-center text-base rounded-md">
                    <label htmlFor="tipo_practica"
                      className="block text-sm font-medium text-gray-900">Tipo de Practica</label>
                    <select
                      id="practica"
                      {...register("practica", {
                        required: "Seleccione un tipo de practica",
                      })}
                      className="w-full text-sm input input-bordered input-ghost text-gray-900"
                    >
                      <option value="Pre-Profesionales">
                        Pre-Profesionales
                      </option>
                      <option value="Pasantias">Pasantias</option>
                      <option value="Comunitarias">Comunitarias</option>
                      <option value="Master">Master</option>
                    </select>
                    {errors.practica && (
                      <span className="text-white badge badge-error badge-sm">
                        {errors.practica.message}
                      </span>
                    )}
                  </div>
                </fieldset>
                {/* Modalidad */}
                <fieldset>
                  <label
                    htmlFor="modalidad"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Modalidad
                  </label>
                  <select
                    name="modalidad"
                    {...register("modalidad", {
                      required: "Por favor, seleccione un modalidad",
                    })}
                    className="w-full text-sm input input-bordered input-ghost text-gray-900"
                  >
                    <option value="">Seleccione una modalidad</option>
                    {modalidades.map((modalidad) => (
                      <option key={modalidad.id} value={modalidad.id}>
                        {modalidad.nombre}
                      </option>
                    ))}
                  </select>
                  {errors.modalidad && (
                    <span className="mt-2 text-white badge badge-error badge-sm" style={{ lineHeight: '1.5', height: 'auto', padding: '4px 8px' }}>
                      {errors.modalidad.message}
                    </span>
                  )}
                </fieldset>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <fieldset className="grid">
                  <TextInput
                    type="date"
                    label="Fecha de Inicio"
                    name="fecha_inicio"
                    register={register}
                    errors={errors}
                    isToday={today}
                    required
                  />
                </fieldset>
                <fieldset className="grid">
                  <TextInput
                    type="date"
                    label="Fecha de Fin"
                    name="fecha_fin"
                    register={register}
                    errors={errors}
                    isToday={today}
                    required
                  />
                </fieldset>
              </div>
              {/* Curriculum Vitae */}
              <fieldset>
                <label htmlFor="curriculum"
                  className="block text-sm font-medium text-gray-900">Curriculum Vitae</label>
                <input
                  name="curriculum"
                  type="file"
                  accept="application/pdf"
                  {...register("curriculum", {
                    required: "Este campo es requerido",
                  })}
                  className="w-full file:py-2 file:px-4 file:border-0 file:text-white file:bg-colorcito file:cursor-pointer mb-3
                  hover:file:text-colorcito hover:file:bg-white file-input file-input-bordered"
                />
                {errors.curriculum && (
                  <span className="mt-2 text-white badge badge-error badge-sm">
                    {errors.curriculum.message}
                  </span>
                )}
                </fieldset>
              {/*
              <fieldset>
                <div className="flex items-center gap-3">
                  <label
                    htmlFor="curriculum"
                    className="block text-sm font-bold text-gray-900"
                  >
                    Curriculum Vitae
                  </label>
                  {!!curriculum && (
                    <span className="col-span-2 text-xs text-gray-600">
                      {shortenString(curriculum.name, 60)}
                    </span>
                  )}
                </div>
                <InputFile
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setCurriculum(file);
                  }}
                >
                  <button
                    color="primary"
                    radius="none"
                    type="button"
                    className="text-sm text-white hover:bg-[#00335f] bg-[#00335f] transition-colors py-2 rounded-lg flex items-center gap-2 w-full justify-center"
                  >
                    Subir archivo
                    <FiUpload />
                  </button>
                  {!!fileError && (
                    <span className="mt-2 text-danger text-xs">
                      {fileError}
                    </span>
                  )}
                </InputFile>
              </fieldset>
              */}
              {/* Campos ocultos */}
              <input
                type="hidden"
                name="id_estado"
                value="1"
                {...register("id_estado")}
              />
              
              {/* Enviar */}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  // color="danger" variant="light"
                  className="px-4 py-2 text-red-700 bg-white rounded-lg hover:text-white hover:bg-red-700 hover:shadow-lg hover:shadow-gray-500"
                  onClick={handleCloseModal}
                >
                  Cerrar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm text-white bg-colorcito rounded-lg hover:bg-colorcito hover:shadow-lg hover:shadow-gray-500"
                  disabled={isSubmitButtonDisabled}
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default SolicitarPracticasForm;
