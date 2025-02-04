import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createServicioLinea,
  fetchServicioLineas,
} from "../../redux/slices/serviciolineasSlice";
import { fetchServicios } from "../../redux/slices/serviciosSlice";
import NotifyWhatsapp from "../../components/ui/NotifyWhatsapp";

import ButtonEnviar from "../../dashboard/components/Buttons/ButtonEnviar";

function AtencionForm() {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.authentication.usuario);
  const servicios = useSelector((state) => state.servicios.servicios);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    dispatch(fetchServicios());
  }, [dispatch]);

  const onSubmit = (servicioLineaData) => {
    servicioLineaData.id_usuario = usuario.id;
    dispatch(createServicioLinea(servicioLineaData)).then(() => {
      setShowNotification(true);
      reset();
    });
  };

  useState(() => {
    setValue("nombres", usuario?.nombres || "");
    setValue("apellidos", usuario?.apellidos || "");
    setValue("email", usuario?.email || "");
    setValue("telefono", usuario?.telefono || "");
  }, [usuario, setValue]);

  const [showNotification, setShowNotification] = useState(false);
  const [professionalSelected, setProfessionalSelected] = useState(null);

  const handleServicioChange = (event) => {
    // Extract the selected value from the event
    const selectedServiceId = event.target.value;
    const professionalSelected = servicios.find(
      (servicio) => servicio.id === selectedServiceId
    ).Usuario;

    // Remove the '+' symbol from the telefono number and keep only the numerical digits
    const formattedTelefono = professionalSelected?.telefono.replace(/\D/g, "");

    console.log(formattedTelefono);

    // Update the professionalSelected state with the formatted telefono number
    setProfessionalSelected({
      ...professionalSelected,
      telefono: formattedTelefono,
    });
  };

  useEffect(() => {
    if (servicios.length > 0) {
      // Remove the '+' symbol from the telefono number and keep only the numerical digits
      const professionalSelected = servicios[0].Usuario;
      const formattedTelefono = professionalSelected.telefono.replace(
        /\D/g,
        ""
      );

      console.log(formattedTelefono);

      // Update the professionalSelected state with the formatted telefono number
      setProfessionalSelected({
        ...professionalSelected,
        telefono: formattedTelefono,
      });
    }
  }, []);

  return (
    <section className="p-4">
      <div className="max-w-screen-xl py-12 mx-auto md:py-24">
        <header className="pb-4 md:!pb-14 text-center space-y-2">
          <h2 className="text-2xl font-bold text-indigo-900 md:text-4xl">
            ¿Atención en Linea?
          </h2>
          <p className="max-w-md mx-auto text-sm text-gray-500 md:text-base">
            Contáctanos a través de nuestro formulario y con gusto responderemos
            tu solicitud.
          </p>
        </header>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid max-w-screen-sm gap-4 mx-auto"
        >
          <fieldset className="grid gap-4 md:grid-cols-2">
            <div className="grid">
              <label
                htmlFor="nombres"
                className="block text-sm font-bold text-indigo-900"
              >
                Nombres:
              </label>
              <input
                {...register("nombres", {
                  required: "Este campo es requerido",
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
                className="block text-sm font-bold text-indigo-900"
              >
                Apellidos:
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
          </fieldset>

          <fieldset className="grid gap-4 md:grid-cols-2">
            <div className="">
              <label
                htmlFor="telefono"
                className="block text-sm font-bold text-indigo-900"
              >
                Teléfono/Whatsapp:
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

            <div className="">
              <label
                htmlFor="email"
                className="block text-sm font-bold text-indigo-900"
              >
                Correo Electrónico:
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
          </fieldset>

          <div className="items-center justify-center text-base rounded-md">
            <label
              htmlFor="id_servicio"
              className="block text-sm font-bold text-indigo-900"
            >
              Servicio de:
            </label>
            <select
              id="id_servicio"
              name="id_servicio"
              {...register("id_servicio", {
                required: "Seleccione un servicio",
              })}
              className="w-full select select-bordered"
              onChange={handleServicioChange}
            >
              <option value="">Seleccione un servicio</option>
              {servicios?.map((servicio) => (
                <option
                  className="text-black"
                  value={servicio.id}
                  key={servicio.id}
                >
                  {servicio.nombre}
                </option>
              ))}
            </select>
            {errors.id_servicio && (
              <span className="text-white badge badge-error badge-sm">
                {errors.id_servicio.message}
              </span>
            )}
          </div>

          <div className="">
            <label
              htmlFor="motivo"
              className="block text-sm font-bold text-indigo-900"
            >
              Motivo
            </label>
            <textarea
              {...register("motivo", {
                required: "Ingrese el motivo del servicio",
              })}
              id="motivo"
              className="w-full resize-none textarea textarea-bordered"
            />
            {errors.motivo && (
              <p className="mt-1 text-white badge badge-error badge-sm">
                {errors.motivo.message}
              </p>
            )}
          </div>

          {/* Boton*/}
          <div className="flex justify-center mt-4">
            {/*<button
							type='submit'
							className='text-white btn btn-primary'
						>
							Enviar Formulario
					</button>*/}
            <ButtonEnviar text="Enviar Formulario" />
          </div>
        </form>
      </div>
      <NotifyWhatsapp
        showNotification={showNotification}
        setShowNotification={setShowNotification}
        path={`https://api.whatsapp.com/send?phone=${professionalSelected?.telefono}`}
      />

      {/*<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{servicios.map((servicio) => (
					<div key={servicio.id} className="max-w-sm p-4 overflow-hidden bg-white rounded shadow-lg">
						<div className="px-6 py-4">
							<div className="mb-2 text-xl font-bold">{servicio.nombre}</div>
							<p className="text-base text-gray-700">
								{servicio.descripcion}
							</p>
						</div>
						<div className="px-6 pt-4 pb-2">
							<span className="block text-sm text-gray-600">Profesional:</span>
							<span className="block font-semibold">{servicio.Usuario.nombres} {servicio.Usuario.apellidos}</span>
						</div>
					</div>
				))}
			</div>*/}
    </section>
  );
}
export default AtencionForm;

{
  /*
		<div className="container">
			<h2>Formulario de Atención en Línea</h2>
			<form 
			onSubmit={handleSubmit(onSubmit)}
			className='grid max-w-2xl gap-4 mx-auto'
			>
			    
				<div className='grid'>
				 <label 
				  htmlFor="id_usuario"
				  className='text-sm'
					>Usuario:
			    
				 </label>
				 <input
					type="text"
					id="id_usuario"
					label="Usuario"
					name="id_usuario"
					{...register('id_usuario', { required: 'Sus nombres completos' })}
					className='bg-transparent input-bordered !ring-white !border-2 border-white rounded-md input mt-1 w-full'
				 />
				 {errors.id_usuario && (
										<span className='text-white badge badge-error badge-sm'>
											{errors.id_usuario.message}
										</span>
									)}
				</div>
			    

				<div >

				 <label 
				  htmlFor="id_profesional"
				  className='text-sm'
				  >Profesional
				 </label>
				 <input
					type="text"
					id="id_profesional"
					label="Profesional"
					name="id_profesional"
					{...register('id_profesional', { required: 'Sus nombres completos' })}
					className='bg-transparent input-bordered !ring-white !border-2 border-white rounded-md input mt-1 w-full' 
				 />
				  {errors.id_profesional && (
										<span className='text-white badge badge-error badge-sm'>
											{errors.id_profesional.message}
										</span>
									)}
				</div>
			    

				<div>
				 <label 
				   htmlFor="id_estado"
				   className='text-sm'
				   >Estado
				 </label>
				 <input
					type="text"
					id="id_estado"
					label="Estado"
					name="id_estado"
					{...register('id_estado', { required: 'Sus nombres completos' })}
					className='bg-transparent input-bordered !ring-white !border-2 border-white rounded-md input mt-1 w-full' 
				 />
				  {errors.id_estado && (
										<span className='text-white badge badge-error badge-sm'>
											{errors.id_estado.message}
										</span>
									)}
				</div>

			    
			 
				<div>
				  <label 
					htmlFor="servicio"
					className='text-sm'
					>Servicio
				  </label>
				  <input
					type="text"
					id="servicio"
					label="Servicio"
					name="servicio"
					{...register('servicio', { required: 'Sus nombres completos' })}
					className='bg-transparent input-bordered !ring-white !border-2 border-white rounded-md input mt-1 w-full' 
				  />
				  {errors.servicio && (
										<span className='text-white badge badge-error badge-sm'>
											{errors.servicio.message}
										</span>
									)}
				</div>

				<div>
				  <label 
					htmlFor="fecha_registro"
					className='text-sm'
					>Fecha de registro
				  </label>
				  <input
					type="date"
					id="fecha_registro"
					label="Fecha de registro"
					name="fecha_registro"
					{...register('fecha_registro', { required: 'Sus nombres completos' })}
					className='bg-transparent input-bordered !ring-white !border-2 border-white rounded-md input mt-1 w-full' 
				  />
				  {errors.fecha_registro && (
										<span className='text-white badge badge-error badge-sm'>
											{errors.fecha_registro.message}
										</span>
									)}
				</div>

				{/* Boton*/
}
{
  /*
				<div className='flex flex-1 gap-2 p-6 mx-auto md:p-8 md:gap-4'>
						<button
							type='submit'
							className='w-3/6 text-center text-white truncate btn btn-success'
						>
							Enviar Formulario
						</button>

						<a
							className='w-3/6 mx-auto text-sm text-center text-white truncate btn btn-error'
							href='/convenios/practicas-pasantias'
							rel='noreferrer'
						>
							Regresar
						</a>
				</div>

			    
			</form>
		</div>
	  */
}
