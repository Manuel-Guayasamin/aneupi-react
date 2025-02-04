import React, { useState, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createContacto } from "../../../redux/slices/contactosSlice";
import { toast } from "react-toastify";
import {
  createConvenio,
  fetchConvenios,
} from "../../../redux/slices/conveniosSlice";

import { fetchModalidades } from "../../../redux/slices/modalidadesSlice";
import { fetchTipoConvenios } from "../../../redux/slices/tipoconveniosSlice";
import NotifyWhatsapp from "../../../components/ui/NotifyWhatsapp";
import ButtonEnviar from "../../../dashboard/components/Buttons/ButtonEnviar";

const ConvenioSection = () => {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.authentication.usuario);
  const modalidades = useSelector((state) => state.modalidades.modalidades);
  const tipoconvenios = useSelector(
    (state) => state.tipoconvenios.tipoConvenios
  );
  const [duracion, setDuracion] = useState(0);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const minFinDate = fechaInicio
    ? new Date(fechaInicio).setFullYear(new Date(fechaInicio).getFullYear() + 1)
    : new Date(today).setFullYear(new Date(today).getFullYear() + 1);
  const maxFinDate = fechaInicio
    ? new Date(fechaInicio).setFullYear(new Date(fechaInicio).getFullYear() + 5)
    : new Date(today).setFullYear(new Date(today).getFullYear() + 5);
  const min = new Date(minFinDate).toISOString().split("T")[0];
  const max = new Date(maxFinDate).toISOString().split("T")[0];

  const [showNotification, setShowNotification] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  useState(() => {
    setValue("nombres", usuario?.nombres || "");
    setValue("apellidos", usuario?.apellidos || "");
    setValue("email", usuario?.email || "");
    setValue("telefono", usuario?.telefono || "");
  }, [usuario, setValue]);

  const handleInput = (event) => {
    // Filtra el valor de entrada para permitir solo letras
    const inputValue = event.target.value;
    const filteredValue = inputValue.replace(/[^a-zA-Z\sáéíóúñ]/g, "");
    // Si el valor filtrado es diferente al valor de entrada, actualiza el valor del campo
    if (inputValue !== filteredValue) {
      event.target.value = filteredValue;
    }
  };

  const handleFechaInicioChange = (event) => {
    const nuevaFechaInicio = event.target.value;
    setFechaInicio(nuevaFechaInicio);
    fechaFin
      ? calcularDuracion(nuevaFechaInicio, fechaFin, setDuracion)
      : toast.warning("Seleccione la fecha de fin");
  };

  const handleFechaFinChange = (event) => {
    const nuevaFechaFin = event.target.value;
    setFechaFin(nuevaFechaFin);
    fechaInicio
      ? calcularDuracion(fechaInicio, nuevaFechaFin, setDuracion)
      : toast.warning("Seleccione la fecha de inicio");
  };

  // Función para calcular la duración entre las fechas
  const calcularDuracion = (inicio, fin, setDuracion) => {
    const fechaInicio = new Date(inicio);
    const fechaFin = new Date(fin);
    const diferenciaAnios = fechaFin.getFullYear() - fechaInicio.getFullYear();
    const diferenciaMeses = fechaFin.getMonth() - fechaInicio.getMonth();

    // Si la diferencia de meses es negativa, significa que el año de fechaInicio es mayor
    // que el año de fechaFin, por lo que restamos un año a la diferencia de años
    const duracionAnios =
      diferenciaMeses < 0 ? diferenciaAnios - 1 : diferenciaAnios;

    // Validamos que la duración cumpla con los requisitos mínimos y máximos
    if (duracionAnios < 1 || duracionAnios > 5) {
      setDuracion(0);
      toast.error("La duración del convenio debe ser de 1 a 5 años");
    } else {
      setDuracion(duracionAnios);
    }
  };

  const onSubmit = (Conveniodata) => {
    try {
      console.log(Conveniodata);
      // Conveniodata.id_usuario = usuario.id;
      Conveniodata.id_estado = 1;
      Conveniodata.duracion = duracion;
      dispatch(createConvenio(Conveniodata)).then(() => {
        dispatch(fetchConvenios());
      });
      toast.success("Convenio propuesto exitosamente");
      setShowNotification(true);
      reset();
    } catch (error) {
      console.error("Error al proponer el convenio:", error);
    }
  };

  useEffect(() => {
    dispatch(fetchTipoConvenios());
    dispatch(fetchModalidades());
  }, [dispatch]);

  return (
    <section className="p-4">
      <div className="max-w-screen-xl mx-auto">
        <header className="pb-4 md:!pb-14 text-center space-y-2">
          <h2 className="text-2xl font-bold text-indigo-800 md:text-4xl">
            ¿Propuesta de Convenio?
          </h2>
          <p className="max-w-md mx-auto text-sm text-gray-500 md:text-base">
            Contáctanos a través de nuestro formulario y con gusto responderemos
            tu solicitud.
          </p>
        </header>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-screen-sm gap-4 mx-auto"
        >
          <div className="grid max-w-screen-sm gap-4 mx-auto sm:grid-cols-2">
            <div className="grid">
              <label
                htmlFor="nombres"
                className="inline-block mb-2 text-sm text-indigo-800 sm:text-base"
              >
                Nombres
              </label>
              <input
                {...register("nombres", {
                  required: "Se necesita colocar sus Nombres",
                })}
                type="text"
                id="nombres"
                className="w-full text-sm input input-bordered"
              />
              {errors.nombres && (
                <p className="mt-1 text-white badge badge-error badge-sm">
                  {errors.nombres.message}
                </p>
              )}
            </div>

            <div className="grid">
              <label
                htmlFor="apellidos"
                className="inline-block mb-2 text-sm text-indigo-800 sm:text-base"
              >
                Apellidos
              </label>
              <input
                {...register("apellidos", {
                  required: "Se necesita sus Apellidos",
                })}
                type="text"
                id="apellidos"
                className="w-full text-sm input input-bordered"
              />
              {errors.apellidos && (
                <p className="mt-1 text-white badge badge-error badge-sm">
                  {errors.apellidos.message}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="telefono"
                className="inline-block mb-2 text-sm text-indigo-800 sm:text-base"
              >
                Teléfono
              </label>
              <input
                {...register("telefono", {
                  required: "Este campo es requerido",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "El número de teléfono debe contener solo dígitos",
                  },
                })}
                type="tel"
                id="telefono"
                className="w-full text-sm input input-bordered"
              />
              {errors.telefono && (
                <p className="mt-1 text-white badge badge-error badge-sm">
                  {errors.telefono.message}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="inline-block mb-2 text-sm text-indigo-800 sm:text-base"
              >
                Correo Electrónicos
              </label>
              <input
                {...register("email", {
                  required: "Este campo es requerido",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Dirección de correo electrónico inválida",
                  },
                })}
                type="email"
                id="email"
                className="w-full text-sm input input-bordered"
              />
              {errors.email && (
                <p className="mt-1 text-white badge badge-error badge-sm">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="id_tipoconvenio"
                className="inline-block mb-2 text-sm text-[#00335f] sm:text-base"
              >
                Tipo de convenio
              </label>
              <select
                {...register("id_tipoconvenio", {
                  required: "Seleccione un tipo de convenio",
                })}
                id="id_tipoconvenio"
                className="w-full text-sm input input-bordered"
              >
                {/* Agregar opciones para el menú desplegable */}
                <option value="">Seleccione una opción</option>
                {tipoconvenios.map((tipoconvenio) => (
                  <option key={tipoconvenio.id} value={tipoconvenio.id}>
                    {tipoconvenio.nombre}
                  </option>
                ))}
              </select>

              {errors.id_tipoconvenio && (
                <p className="mt-1 text-white badge badge-error badge-sm">
                  {errors.id_tipoconvenio.message}
                </p>
              )}
            </div>
            <div className="grid">
              <label
                htmlFor="fecha_inicio"
                className="inline-block mb-2 text-sm text-[#00335f] sm:text-base"
              >
                Fecha de inicio
              </label>
              <input
                {...register("fecha_inicio", {
                  required: "Seleccione fecha de inicio",
                })}
                type="date"
                id="fecha_inicio"
                className="w-full text-sm input input-bordered"
                min={today}
                onChange={handleFechaInicioChange}
              />
              {errors.fecha_inicio && (
                <p className="mt-1 text-white badge badge-error badge-sm">
                  {errors.fecha_inicio.message}
                </p>
              )}
            </div>
            <div className="grid">
              <label
                htmlFor="fecha_fin"
                className="inline-block mb-2 text-sm text-[#00335f] sm:text-base"
              >
                Fecha de fin
              </label>
              <input
                {...register("fecha_fin", {
                  required: "Seleccione fecha de fin",
                })}
                type="date"
                id="fecha_fin"
                className="w-full text-sm input input-bordered"
                min={min}
                max={max}
                onChange={handleFechaFinChange}
              />
              {errors.fecha_fin && (
                <p className="mt-1 text-white badge badge-error badge-sm">
                  {errors.fecha_fin.message}
                </p>
              )}
            </div>
            {/* <div className='grid'>
              <label
                htmlFor='duracion'
                className='inline-block mb-2 text-sm text-indigo-800 sm:text-base'
              >
                Duración (años)
              </label>
              <input
                {...register('duracion',


                  {
                    required: 'Seleccione la duracion del contrato',
                    validate: value => {
                      return (value >= 1 && value <= 5) || 'La duración debe ser menor a 5 años';
                    }

                  }

                )}

                type='text'
                id='duracion'
                className='w-full text-sm input input-bordered'
                value={duracion}

              />
              {errors.duracion && (
                <p className='mt-1 text-white badge badge-error badge-sm'>{errors.duracion.message}</p>
              )}
            </div> */}
            <div className="sm:col-span-2">
              <label
                htmlFor="nombreOrganizacion"
                className="block mb-2 text-sm text-[#00335f] sm:text-base"
              >
                Nombre de la Organización
              </label>
              <input
                {...register("nombreOrganizacion", {
                  required: "Ingrese el nombre de la organización",
                })}
                type="text"
                id="nombreOrganizacion"
                className="w-full text-sm input input-bordered"
                onInput={handleInput}
              />
              {errors.nombreOrganizacion && (
                <p className="mt-1 text-white badge badge-error badge-sm">
                  {errors.nombreOrganizacion.message}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="descripcion"
                className="block mb-2 text-sm text-[#00335f] sm:text-base"
              >
                Descripción
              </label>
              <textarea
                {...register("descripcion", {
                  required: "Ingrese la descripción",
                })}
                id="descripcion"
                className="w-full resize-none textarea textarea-bordered"
              />
              {errors.descripcion && (
                <p className="mt-1 text-white badge badge-error badge-sm">
                  {errors.descripcion.message}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="modalidad"
                className="inline-block mb-2 text-sm text-[#00335f] sm:text-base"
              >
                Modalidad
              </label>
              <select
                {...register("id_modalidad", {
                  required: "Seleccione una modalidad",
                })}
                id="id_modalidad"
                className="w-full text-sm input input-bordered"
              >
                {/* Agregar opciones para el menú desplegable */}
                <option value="">Seleccione una opción</option>
                {modalidades.map((modalidad) => (
                  <option key={modalidad.id} value={modalidad.id}>
                    {modalidad.nombre}
                  </option>
                ))}
              </select>
              {errors.id_modalidad && (
                <p className="mt-1 text-white badge badge-error badge-sm">
                  {errors.id_modalidad.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-center mt-8">
            {/* <button
                type='submit'
                className='w-40 text-white btn btn-primary'
              >
                Enviar
              </button> */}
            <ButtonEnviar
              text="Enviar su propuesta"
              className={"justify-self-center"}
            />
          </div>
        </form>
      </div>
      <NotifyWhatsapp
        showNotification={showNotification}
        setShowNotification={setShowNotification}
      />
    </section>
  );
};

export default ConvenioSection;
