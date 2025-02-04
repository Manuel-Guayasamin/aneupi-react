import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { fetchModalidades } from "../../redux/slices/modalidadesSlice";
import { createExpediente } from "../../redux/slices/expedienteSlice";
import { Input } from "./Input";
import { InputFile } from "./InputFile";
import { FiPaperclip } from "react-icons/fi";

import { toast } from "react-toastify";
import { PiIdentificationCardLight } from "react-icons/pi";
import { z } from "zod";
import { Link, useParams } from "react-router-dom";
import {
  Modal as ModalNextUi,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Accordion,
  AccordionItem,
  Button,
} from "@nextui-org/react";
import AccountsImage from "../../assets/images/pagos/cuentasBancarias.jpg";
const serverURL = import.meta.env.VITE_API_URL;

function shortenString(str, maxLength) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + "...";
}

const fileSchema = z.object({
  name: z.string(),
  size: z.number().max(5000000), // Tamaño máximo de 5MB
  type: z
    .string()
    .refine(
      (type) => ["image/jpeg", "image/png", "application/pdf"].includes(type),
      {
        message: "El tipo de archivo debe ser JPEG, PNG o PDF",
      }
    ),
});

export const Modal = ({ isOpen, onOpenChange }) => {
  const { id } = useParams();

  const storeID = import.meta.env.VITE_STORE_ID;
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    //setShowModal,
    formState: { errors },
  } = useForm({});
  const [userOptions, setUserOptions] = useState({
    type: "",
    certificate: true,
  });
  const [setShowModal] = useState();
  const [formErrors, setFormErrors] = useState({});
  const [comprobante, setComprobante] = useState(null);
  const [archivo, setarchivo] = useState(null);
  const [curriculum, setCurriculum] = useState(null);
  const [certificado, setCertificado] = useState(null);
  const costo = watch("costo");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    const comprobanteFile =
      userOptions.certificate && validateFile(comprobante) ? comprobante : null;
    const certificadoFile =
      userOptions.certificate && costo === "5.99" && validateFile(certificado)
        ? certificado
        : null;

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key === "archivo_url") {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    });
    if (certificadoFile) {
      formData.append("certificado_url", certificadoFile);
    } else {
      formData.append("certificado_url", null);
    }

    if (comprobanteFile) {
      formData.append("comprobante_url", comprobanteFile);
    } else {
      formData.append("comprobante_url", null);
    }

    dispatch(createExpediente(formData)).then((result) => {
      if (!result.error) {
        //toast.success("Expediente creado con éxito!");
        reset(); //
        setCertificado(false);
        setComprobante(false);
        onOpenChange(false);
      } else {
        toast.error("Error al crear el expediente");
      }
    });
  };
  const handleFormSubmit = (data) => {
    onSubmit({
      ...data,
    });
    reset();
  };

  const validateFile = (file) => {
    try {
      const validatedFile = fileSchema.parse(file);
      return validatedFile;
    } catch (error) {
      toast.error(error.errors);
      console.error("Error al validar archivo:", error.errors);
      return false;
    }
  };

  const handleUserType = (e) => {
    setUserOptions((prevState) => ({
      ...prevState,
      type: e.target.value,
    }));
    setValue("type", e.target.value);
  };

  const handleCertificate = (e) => {
    const value = e.target.value === "true";
    setUserOptions((prevState) => ({
      ...prevState,
      certificate: value,
    }));
    setValue("certificate", value);
  };

  return (
    <div className="relative flex flex-col ">
      <ModalNextUi
        size={userOptions.certificate || comprobante ? "4xl" : ""}
        onOpenChange={onOpenChange}
        isOpen={isOpen}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h4 className="font-normal text-xl">Llene sus datos</h4>
          </ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4  overflow-auto max-h-[650px] items-center justify-center">
              <section
                className={
                  userOptions.certificate || comprobante
                    ? "md:col-span-3"
                    : "md:col-span-5"
                }
              >
                <div>
                  <select
                    className="w-full text-sm text-gray-900 input input-bordered input-ghost"
                    {...register("type", {
                      required: "Tipo de usuario es obligatorio",
                    })}
                    onChange={handleUserType}
                  >
                    <option value="">
                      Selecione tipo de documento a subir
                    </option>
                    <option value="Sentencia">Sentencia</option>
                    <option value="Resolucion">Resolucion</option>
                  </select>
                </div>

                <form
                  onSubmit={handleSubmit(handleFormSubmit)}
                  className="flex flex-col gap-4 "
                >
                  <select
                    className="w-full mt-1 text-sm text-gray-900 input input-bordered input-ghost"
                    {...register("certificate", {
                      required: "Deseo de certificado es obligatorio",
                    })}
                    onChange={handleCertificate}
                  >
                    <option value="">
                      ¿Desea un certificado que avale la subida de la sentencia
                      o resolución?
                    </option>
                    <option value="true">Si</option>
                    <option value="false">No</option>
                  </select>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      errors={errors}
                      required
                      name="nombres"
                      register={register}
                      className={`w-full text-sm input input-bordered input-ghost text-gray-900`}
                      placeholder="Nombres"
                    />
                    <Input
                      name="apellidos"
                      required
                      errors={errors}
                      register={register}
                      className={`w-full text-sm input input-bordered input-ghost text-gray-900`}
                      placeholder="Apellidos"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      register={register}
                      errors={errors}
                      required
                      name="profesion"
                      className={`w-full text-sm input input-bordered input-ghost text-gray-900`}
                      placeholder="Profesión"
                    />
                    <Input
                      register={register}
                      errors={errors}
                      required
                      maxLength={10}
                      name="cedula"
                      className={`w-full text-sm input input-bordered input-ghost text-gray-900`}
                      placeholder="Cédula"
                    ></Input>
                  </div>

                  <div className="grid ">
                    {userOptions.certificate && (
                      <div>
                        <label className="block text-sm font-medium text-gray-900">
                          Precio
                        </label>
                        <select
                          {...register("costo", {
                            required: "Costo del evento es obligatorio",
                          })}
                          className="w-full text-sm text-gray-900 input input-bordered input-ghost"
                        >
                          <option value={15.99}>
                            15.99 $ - Docente o profesional
                          </option>
                          <option value={10.99}>
                            10.99 $ - Público general
                          </option>
                          <option value={5.99}>5.99 $ - Discapacidad</option>
                        </select>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      errors={errors}
                      required
                      register={register}
                      name="direccion"
                      className={`w-full text-sm input input-bordered input-ghost text-gray-900`}
                      placeholder="Dirección"
                    />
                    <Input
                      register={register}
                      name="edad"
                      required
                      errors={errors}
                      className={`w-full text-sm input input-bordered input-ghost text-gray-900`}
                      placeholder="Edad"
                      type="number"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      errors={errors}
                      required
                      register={register}
                      name="pais"
                      className={`w-full text-sm input input-bordered input-ghost text-gray-900`}
                      placeholder="País"
                    />
                    <Input
                      register={register}
                      name="institucion"
                      required
                      errors={errors}
                      className={`w-full text-sm input input-bordered input-ghost text-gray-900`}
                      placeholder="Institución"
                    />
                  </div>

                  <fieldset className=" grid grid-cols-1 grid gap-4">
                    <input
                      name="archivo_url"
                      className="text-blue-800 file-input file-input-bordered file-input-primary"
                      {...register("archivo_url", {
                        required: true,
                        validate: {
                          maxFileSize: (value) =>
                            value[0]?.size < 50 * 1024 * 1024, // 50MB in bytes
                        },
                      })}
                      type="file"
                      accept="application/pdf"
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

                  {costo === "beca" ? (
                    <Link
                      target="_blank"
                      className={`flex-1 btn btn-primary `}
                      to="https://wa.me/593983341084"
                    >
                      Contactanos
                    </Link>
                  ) : (
                    <Button
                      className="text-white text-sm" // Ajusta el tamaño del texto
                      variant="solid"
                      color="primary"
                      type="submit"
                      radius="none"
                      isLoading={isLoading}
                      spinner={
                        <svg
                          className="animate-spin h-4 w-4 text-current" // Ajusta el tamaño del spinner
                          fill="none"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            fill="currentColor"
                          />
                        </svg>
                      }
                    >
                      Enviar
                    </Button>
                  )}
                </form>
              </section>
              <section className="col-span-1 md:col-span-2 w-full ">
                {isOpen && (
                  <>
                    {userOptions.certificate && (
                      <div className="bg-default-200 rounded-md p-4 w-full flex flex-col gap-4">
                        {parseFloat(costo) === 5.99 && (
                          <div className="collapse collapse-arrow bg-base-200">
                            <input type="radio" defaultChecked />
                            <div className="collapse-title text-base font-normal">
                              Certificado de discapacidad:
                            </div>

                            <div className="collapse-content">
                              <InputFile
                                onChange={(e) => {
                                  const file = e.target.files[0];
                                  if (file && file.type === "application/pdf") {
                                    setCertificado(file);
                                  } else {
                                    alert(
                                      "Por favor, selecciona un archivo PDF."
                                    );
                                  }
                                }}
                                accept="application/pdf"
                              >
                                <button className="text-sm text-white hover:bg-blue-500 transition-colors bg-blue-400 py-2 rounded-sm flex items-center gap-2 w-full justify-center">
                                  Subir certificado
                                  <PiIdentificationCardLight size={25} />
                                </button>
                                {certificado && <span>{certificado.name}</span>}
                              </InputFile>
                            </div>
                          </div>
                        )}

                        <h3 className="text-lg ">Métodos de pago:</h3>
                        <InputFile
                          onChange={(e) => {
                            const file = e.target.files[0];
                            setComprobante(file);
                          }}
                        >
                          <button
                            color="primary"
                            className="text-sm text-white hover:bg-[#00335f] bg-[#00335f] transition-colors py-2 rounded-sm flex items-center gap-2 w-full justify-center"
                          >
                            Subir comprobante
                            <FiPaperclip />
                          </button>

                          {comprobante && (
                            <span className="col-span-2 text-xs text-gray-600">
                              {shortenString(comprobante.name, 60)}
                            </span>
                          )}
                        </InputFile>
                        <Accordion>
                          {/* 
                            <AccordionItem
                              key="1"
                              aria-label="Accordion 1"
                              title="Deposito o transferencia"
                            >
                              <p className="text-base text-gray-600 mt-1">
                                Números de cuenta{" "}
                                <Link
                                  to={AccountsImage}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-500 underline"
                                >
                                  aquí
                                </Link>
                              </p>
                            </AccordionItem>
                            */}
                          <AccordionItem
                            key="2"
                            aria-label="Accordion 2"
                            title="Pago en linea con Payphone"
                          >
                            <Button
                              as={Link}
                              to="https://academia.fundacionaneupi.com/donaciones"
                              target="_blank"
                              className="w-full"
                              variant="ghost"
                              color="warning"
                            >
                              Payphone
                              <img
                                width={30}
                                src="https://docs.payphone.app/wp-content/uploads/sites/2/2022/03/MicrosoftTeams-image-9.png"
                              />
                            </Button>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    )}
                  </>
                )}
              </section>
            </div>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </ModalNextUi>
    </div>
  );
};
