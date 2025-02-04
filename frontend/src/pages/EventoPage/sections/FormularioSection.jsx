import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createEvent, fetchEvents } from "../../../redux/slices/eventSlice";
import ButtonEnviar from "../../../dashboard/components/Buttons/ButtonEnviar";
import Subtitle from "../../../components/ui/Subtitle";
import { useState } from "react";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Textarea,
  ScrollShadow,
  DatePicker,
} from "@nextui-org/react";
import { useToast } from "react-toastify";
export const FormularioSection = ({ customButton, children, ...rest }) => {
  const dispatch = useDispatch();
  const usuario = useSelector((store) => store.authentication.usuario);
  const modalidades = useSelector((store) => store.modalidades.modalidades);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const onSubmit = (formData) => {
    dispatch(createEvent(formData))
      .then(() => {
        fetchEvents();
        toast.success("Propuesta enviada con éxito");
      })
      .catch((error) => {
        toast.error("Error al enviar la propuesta");
      });
  };

  return (
    <>
      {children ? (
        <Button onPress={onOpen} {...rest}>
          {children}
        </Button>
      ) : (
        <header className="py-6 space-y-2 flex flex-col items-center">
          <Subtitle>¿Tienes alguna Propuesta?</Subtitle>
          <p className="max-w-md mx-auto text-sm text-gray-500 md:text-base">
            Utiliza nuestro formulario y propon algún evento que quieras
            realizar para comunícarte directamente con nosotros
          </p>
          <Button
            onPress={onOpen}
            className="bg-primary text-white"
            radius="none"
          >
            Abrir Formulario
          </Button>
        </header>
      )}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
          id="post_form"
          className=""
        >
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Llena los datos para tu propuesta
              </ModalHeader>
              <ModalBody>
                <section className="grid gap-4 px-2">
                  <ScrollShadow
                    size={1}
                    hideScrollBar
                    className="w-full h-[710px] md:h-[710px]"
                  >
                    <div className="grid gap-4 ">
                      <fieldset className="grid gap-2">
                        <label className="block text-sm font-medium text-gray-900">
                          Código del Evento
                        </label>
                        <input
                          labelPlacement="outside"
                          {...register("codigo", {
                            required: "Código del evento es obligatorio",
                          })}
                          placeholder="000-000"
                          className="w-full text-sm input input-bordered input-ghost text-gray-900"
                        />

                        {errors.codigo && (
                          <span className="text-white badge badge-error badge-sm">
                            {errors.codigo.message}
                          </span>
                        )}
                      </fieldset>
                      <fieldset className="grid gap-2">
                        <label className="block text-sm font-medium text-gray-900">
                          Nombre del Evento
                        </label>
                        <input
                          labelPlacement="outside"
                          {...register("nombre", {
                            required: "Nombre del evento es obligatorio",
                          })}
                          placeholder="Reunion, Conferencia, etc."
                          className="w-full text-sm input input-bordered input-ghost text-gray-900"
                        />

                        {errors.nombre && (
                          <span className="text-white badge badge-error badge-sm">
                            {errors.nombre.message}
                          </span>
                        )}
                      </fieldset>
                    </div>

                    <fieldset className="grid gap-1">
                      <label
                        htmlFor="imagen"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Imagen
                      </label>
                      <input
                        className="w-full file:py-2 file:px-4 file:border-0 file:text-white file:bg-colorcito file:cursor-pointer mb-3
                        hover:file:text-colorcito hover:file:bg-white file-input file-input-bordered"
                        {...register("imagen", {
                          required: "Imagen del evento es obligatoria",
                          validate: {
                            fileCheck: (value) => {
                              if (!value[0]) return true; // If no file selected, skip validation
                              const file = value[0];
                              const fileSize = file.size / 1024; // in KB
                              const allowedTypes = [
                                "image/jpeg",
                                "image/png",
                                "image/gif",
                                "image/webp",
                              ];
                              if (!allowedTypes.includes(file.type)) {
                                return "Solo se permiten imágenes (JPEG, PNG, GIF, WEBP)";
                              }
                              if (fileSize > 300) {
                                return "La imagen debe ser de tamaño máximo 300kb";
                              }
                              return true;
                            },
                          },
                        })}
                        type="file"
                      />
                      {errors.imagen && (
                        <span className="text-white badge badge-error badge-sm">
                          {errors.imagen.message}
                        </span>
                      )}
                    </fieldset>

                    <fieldset className="grid gap-2 md:grid-cols-2 md:gap-4">
                      <div>
                        <DatePicker
                          radius="none"
                          name="fecha_inicio"
                          onChange={(date) => {
                            setValue(
                              "fecha_inicio",
                              `${date.year}-${date.month}-${date.day}`
                            );
                          }}
                          labelPlacement="outside"
                          label="Fecha de inicio"
                        />

                        {errors.fecha_inicio && (
                          <span className="text-white badge badge-error badge-sm">
                            {errors.fecha_inicio.message}
                          </span>
                        )}
                      </div>
                      <div>
                        <DatePicker
                          radius="none"
                          name="fecha_fin"
                          onChange={(date) => {
                            setValue(
                              "fecha_fin",
                              `${date.year}-${date.month}-${date.day}`
                            );
                          }}
                          labelPlacement="outside"
                          label="Fecha de finalización"
                        />

                        {/* <input
                          className="w-full input input-bordered"
                          {...register("fecha_fin", {
                            required: "Fecha de fin del evento es obligatoria",
                          })}
                          type="date"
                        /> */}
                        {errors.fecha_fin && (
                          <span className="text-white badge badge-error badge-sm">
                            {errors.fecha_fin.message}
                          </span>
                        )}
                      </div>
                    </fieldset>
                    <fieldset className="grid gap-2">
                      <label htmlFor="descripcion">Descripción</label>
                      <textarea
                        rows={5}
                        radius="none"
                        {...register("descripcion", {
                          required: "Descripción del evento es obligatoria",
                        })}
                        placeholder="descripción"
                        className="w-full textarea textarea-bordered"
                      />

                      {errors.descripcion && (
                        <span className="text-white badge badge-error badge-sm">
                          {errors.descripcion.message}
                        </span>
                      )}
                    </fieldset>

                    <fieldset className="grid gap-2 md:grid-cols-2 md:gap-4">
                      {/* <div>
							<label htmlFor='costo'>Costo</label>
							<input
								className='w-full input input-bordered'
								{...register('costo', {
									required: 'Costo del evento es obligatorio',
									pattern: {
										value: /^\d+(\.\d{1,2})?$/,
										message: 'Ingrese un valor numérico válido',
									},
								})}
								type='text'
							/>
							{errors.costo && (
								<span className='text-white badge badge-error badge-sm'>{errors.costo.message}</span>
							)}
						  </div> */}
                      <div>
                        <label
                          htmlFor="costo"
                          className="block text-sm font-medium text-gray-900"
                        >
                          Costo
                        </label>
                        <select
                          className="w-full mt-1 text-sm text-gray-900 select select-bordered select-ghost"
                          {...register("costo", {
                            required: "Costo del evento es obligatorio",
                            pattern: {
                              value: /^\d+(\.\d{1,2})?$/,
                              message: "Ingrese un valor numérico válido",
                            },
                          })}
                        >
                          <option value="39.99">
                            $39.99 Profesionales o Docentes
                          </option>
                          <option value="29.99">
                            $29.99 Publico General y Estudiantes
                          </option>
                          <option value="19.99">
                            $19.99 Persona con Discapacidad
                          </option>
                        </select>
                        {errors.costo && (
                          <span className="text-white badge badge-error badge-sm">
                            {errors.costo.message}
                          </span>
                        )}
                      </div>
                      <div>
                        <label htmlFor="participantes">Participantes</label>
                        <input
                          className="w-full input input-bordered"
                          {...register("participantes", {
                            required: "Número de participantes es obligatorio",
                            pattern: {
                              value: /^\d+$/,
                              message: "Ingrese un número válido",
                            },
                          })}
                          type="text"
                        />
                        {errors.participantes && (
                          <span className="text-white badge badge-error badge-sm">
                            {errors.participantes.message}
                          </span>
                        )}
                      </div>
                    </fieldset>
                    <fieldset className="grid gap-2 md:grid-cols-2 md:gap-4">
                      <div>
                        <label htmlFor="direccion">Dirección</label>
                        <input
                          className="w-full input input-bordered"
                          {...register("direccion", {
                            required: "Dirección del evento es obligatoria",
                          })}
                          type="text"
                        />
                        {errors.direccion && (
                          <span className="text-white badge badge-error badge-sm">
                            {errors.direccion.message}
                          </span>
                        )}
                      </div>

                      <div>
                        <label htmlFor="id_modalidad">Modalidad</label>
                        <select
                          className="w-full select select-bordered"
                          {...register("id_modalidad", {
                            required: "Modalidad del evento es obligatoria",
                          })}
                        >
                          <option value="">Seleccione una modalidad</option>
                          {modalidades?.map((modalidad) => (
                            <option key={modalidad.id} value={modalidad.id}>
                              {modalidad.nombre}
                            </option>
                          ))}
                        </select>
                        {errors.id_modalidad && (
                          <span className="text-white badge badge-error badge-sm">
                            {errors.id_modalidad.message}
                          </span>
                        )}
                      </div>
                    </fieldset>
                    <fieldset className="flex justify-center mt-4">
                      {/*<button
							type='submit'
							className='w-full text-white btn btn-primary'
						  >
							Enviar Propuesta
						  </button>*/}
                      {/* <ButtonEnviar text="Enviar Formulario" /> */}
                    </fieldset>
                  </ScrollShadow>
                </section>
              </ModalBody>
              <div className="flex items-center gap-4 justify-end mr-8 mb-4">
                <Button
                  className="px-4 py-2 text-red-700 bg-white rounded-lg hover:text-white hover:bg-red-700 hover:shadow-lg hover:shadow-gray-500"
                  onPress={onClose}
                >
                  Cerrar
                </Button>
                <Button
                  className="px-4 py-2 text-sm text-white bg-colorcito rounded-lg hover:bg-colorcito hover:shadow-lg hover:shadow-gray-500"
                  type="submit"
                >
                  Enviar
                </Button>
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default FormularioSection;
