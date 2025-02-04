import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createContacto } from "../../redux/slices/contactosSlice";
import { toast } from "react-toastify";
import ButtonEnviar from "../../dashboard/components/Buttons/ButtonEnviar";
import NotifyWhatsapp from "../../components/ui/NotifyWhatsapp";
import { getAllPaises } from "../../redux/slices/paisesSlice";

const FormSection = () => {
  const dispatch = useDispatch();
  const [showNotification, setShowNotification] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { submitting } = useSelector((state) => state.contactos);

  const onSubmit = (data) => {
    dispatch(createContacto(data)).then(() => reset());
    setShowNotification(true);
    reset();
  };

  const paises = useSelector((state) => state.paises.paises);

  useEffect(() => { dispatch(getAllPaises()); }, [dispatch]);

  return (
    <section className="p-4">
      <div className="max-w-screen-xl py-12 mx-auto md:py-24">
        <header className="pb-4 md:!pb-14 text-center space-y-2">
          <h2 className="text-2xl font-bold text-[#00335f] md:text-4xl">
            ¿Listo para Empezar?
          </h2>
          <p className="max-w-md mx-auto text-sm text-gray-500 md:text-base">
            Contáctanos a través de nuestro formulario y con gusto responderemos
            tu solicitud.
          </p>
        </header>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid max-w-screen-sm gap-4 mx-auto sm:grid-cols-2"
        >
          <div className="grid">
            <label
              htmlFor="nombres"
              className="inline-block mb-2 text-sm text-[#00335f] sm:text-base"
            >
              Nombres
            </label>
            <input
              {...register("nombres", { required: "Este campo es requerido" })}
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
              className="inline-block mb-2 text-sm text-[#00335f] sm:text-base"
            >
              Apellidos
            </label>
            <input
              {...register("apellidos", {
                required: "Este campo es requerido",
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
              className="inline-block mb-2 text-sm text-[#00335f] sm:text-base"
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
              className="inline-block mb-2 text-sm text-[#00335f] sm:text-base"
            >
              Correo Electrónico
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
              htmlFor="asunto"
              className="block mb-2 text-sm text-[#00335f] sm:text-base"
            >
              Asunto
            </label>
            <input
              {...register("asunto", { required: "Este campo es requerido" })}
              type="text"
              id="asunto"
              className="w-full text-sm input input-bordered"
            />
            {errors.asunto && (
              <p className="mt-1 text-white badge badge-error badge-sm">
                {errors.asunto.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="ciudad"
              className="block mb-2 text-sm text-[#00335f] sm:text-base"
            >
              Ciudad
            </label>
            <input
              {...register("ciudad", { required: "Este campo es requerido" })}
              type="text"
              id="ciudad"
              className="w-full text-sm input input-bordered"
            />
            {errors.ciudad && (
              <p className="mt-1 text-white badge badge-error badge-sm">
                {errors.ciudad.message}
              </p>
            )}
          </div>

          {/*Pais y Discapacidad */}

          <div className="grid">
            <label
              htmlFor="pais_id"
              className="inline-block mb-2 text-sm text-[#00335f] sm:text-base"
            >
              País
            </label>
            <select
              {...register("pais_id", {
                required: "Seleccione un país",
              })}
              id="pais_id"
              className="w-full text-sm input input-bordered"
            >
              {/* Agregar opciones para el menú desplegable */}
              <option value="">Seleccione un país</option>
              {paises.map((pais) => (
                <option key={pais.id} value={pais.id}>
                  {pais.nombre}
                </option>
              ))}
            </select>
            {errors.pais_id && (
              <p className="mt-1 text-white badge badge-error badge-sm">
                {errors.pais_id.message}
              </p>
            )}
          </div>

          {/* ---------------------------- */}

          <div className="grid">
            <label
              htmlFor="discapacidad"
              className="inline-block mb-2 text-sm text-[#00335f] sm:text-base"
            >
              Discapacidad
            </label>
            <select
              {...register("discapacidad", {
                required: "Este campo es requerido",
              })}
              id="discapacidad"
              className="w-full text-sm input input-bordered"
            >
              <option value="">Seleccione una opción</option>
              <option value="true">Sí</option>
              <option value="false">No</option>
            </select>
            {errors.discapacidad && (
              <p className="mt-1 text-white badge badge-error badge-sm">
                {errors.discapacidad.message}
              </p>
            )}
          </div>

          {/* Final de Pais y Discapacidad */}

          <div className="sm:col-span-2">
            <label
              htmlFor="mensaje"
              className="block mb-2 text-sm text-[#00335f] sm:text-base"
            >
              Mensaje
            </label>
            <textarea
              {...register("mensaje", { required: "Este campo es requerido" })}
              id="mensaje"
              className="w-full resize-none textarea textarea-bordered"
            />
            {errors.mensaje && (
              <p className="mt-1 text-white badge badge-error badge-sm">
                {errors.mensaje.message}
              </p>
            )}
          </div>

          {/* Boton*/}
          <div className="flex items-center justify-center sm:col-span-2">
            {/*<button
							type='submit'
							className='text-white btn btn-primary'
						>
							Enviar Formulario
					</button>*/}
            <ButtonEnviar
              text={submitting ? "Enviando..." : "Enviar"}
              disabled={submitting}
            />
          </div>

          {/* Notificación de WhatsApp */}
          <NotifyWhatsapp
            showNotification={showNotification}
            setShowNotification={setShowNotification}
          />
        </form>
      </div>
    </section>
  );
};

export default FormSection;
