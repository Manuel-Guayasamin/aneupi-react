import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { fetchModalidades } from "../../redux/slices/modalidadesSlice";
import { InputFile } from "./InputFile";
import { FiUpload } from "react-icons/fi";
import {
  userType,
  options,
  modalidad,
  precios,
  disabledprecios,
} from "../../data/constants";
import { HiChevronRight } from "react-icons/hi2";
import { toast } from "react-toastify";
import { PiIdentificationCardLight } from "react-icons/pi";
import { z } from "zod";
import { Link, useParams } from "react-router-dom";
import AccountsImage from "../../assets/images/pagos/cuentasBancarias.jpg";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  inscripcionSchema,
  ponenteSchema,
  fileSchema,
} from "../../data/zodValidations";
import {
  Input,
  Select,
  SelectItem,
  Modal as ModalNextUi,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Accordion,
  AccordionItem,
  Button,
} from "@nextui-org/react";

const serverURL = import.meta.env.VITE_API_URL;

function shortenString(str, maxLength) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + "...";
}

export const Modal = ({ isOpen, onOpenChange }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const modalidades = useSelector((state) => state.modalidades.modalidades);
  const [userOptions, setUserOptions] = useState({
    type: new Set(["Asistente"]),
    certificate: new Set(["1"]),
  });
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      userOptions.type.has("Asistente") ? inscripcionSchema : ponenteSchema
    ),
  });
  const [comprobante, setComprobante] = useState(null);
  const [curriculum, setCurriculum] = useState(null);
  const [certificado, setCertificado] = useState(null);
  const costo = watch("costo");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    dispatch(fetchModalidades());
  }, [dispatch]);

  const onSubmitAsistente = async (data) => {
    try {
      setIsLoading(true);

      if (!comprobante && !certificado && userOptions.certificate.has("2")) {
        const res = await fetch(`${serverURL}/api/inscripciones`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            id_evento: id,
            id_estado: "1",
            costo: parseFloat(data.costo),
            edad: parseInt(data.edad),
          }),
        });
        const response = await res.json();
        if (!res.ok) {
          console.log(response);
          return toast.error(response.message);
        }
        return toast.success(
          `${response.message}, contactanos para más información por whatsapp +593983341084`
        );
      }
      if (!comprobante && userOptions.certificate) {
        return toast.error("Por favor suba el comprobante de pago");
      }

      if (!certificado && validatedData.costo === 19.99) {
        return toast.error("Por favor suba el certificado de discapacidad");
      }
      const comprobanteValidado = validateFile(comprobante);
      if (!comprobanteValidado) return;
      // const certificadoValidado = validateFile(certificado);
      // if (!certificadoValidado) return;
      const formData = new FormData();
      formData.append("nombres", validatedData.nombres);
      formData.append("apellidos", validatedData.apellidos);
      formData.append("direccion", validatedData.direccion);
      formData.append("edad", validatedData.edad);
      formData.append("profesion", validatedData.profesion);
      formData.append("id_modalidad", validatedData.id_modalidad);
      formData.append("costo", validatedData.costo);
      formData.append("comprobante", comprobante);
      formData.append("certificado", certificado);
      formData.append("id_evento", validatedData.id_evento);
      formData.append("id_estado", validatedData.id_estado);
      formData.append("cedula", validatedData.cedula);

      try {
        const res = await fetch(`${serverURL}/api/inscripciones`, {
          method: "POST",
          body: formData,
        });
        const response = await res.json();
        if (!res.ok) return toast.error(response.message);
        return toast.success(response.message);
      } catch (error) {
        console.error("Error al enviar datos de inscripción:", error);
      }
    } catch (error) {
      console.log(error);
      console.error("Error al enviar datos de inscripción:", error.errors);
    } finally {
      setIsLoading(false);
    }
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

  console.log(errors);

  const onSubmitPonente = async (data) => {
    try {
      setIsLoading(true);
      console.log(data);
      // Validar que el curriculum esté subido
      if (!curriculum) return toast.error("Por favor suba su curriculum");
      if (!comprobante)
        return toast.error("Por favor suba su comprobante de pago");
      // Validar el archivo del curriculum
      const validatedCurriculum = validateFile(curriculum);
      if (!validatedCurriculum) return;
      const validatedComprobante = validateFile(comprobante);
      if (!validatedComprobante) return;
      // Crear objeto FormData y agregar los campos del formulario y el archivo validado
      const formData = new FormData();
      formData.append("nombres", data.nombres);
      formData.append("cedula", data.cedula);
      formData.append("email", data.email);
      formData.append("edad", data.edad);
      formData.append("direccion", data.direccion);
      formData.append("profesion", data.profesion);
      formData.append("telefono", data.telefono);
      formData.append("tematica", data.tematica);
      formData.append("curriculum", curriculum); // Usar el archivo validado
      formData.append("comprobante", comprobante);
      formData.append("id_evento", id);
      formData.append("precio", 39.99);

      // Enviar solicitud al servidor
      const res = await fetch(
        `${serverURL}/api/inscripciones/inscribir-ponente`,
        {
          method: "POST",
          body: formData,
        }
      );

      // Procesar la respuesta del servidor
      const response = await res.json();
      if (!res.ok) {
        console.log(response.details);
        return toast.error(response.message);
      }
      return toast.success(
        `${response.message}, contactanos para más información por whatsapp +593983341084`
      );
    } catch (error) {
      // Manejar errores de validación y otros errores
      console.error("Error al enviar datos de inscripción:", error.errors);
      setFormErrors(error.errors);
    } finally {
      setIsLoading(false);
    }
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
            <h4 className="font-normal text-xl">
              Postula llenando el formulario
            </h4>
          </ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4  overflow-auto max-h-[650px] items-center justify-center">
              <section
                className={
                  userOptions.certificate.has("1")
                    ? "md:col-span-3"
                    : "md:col-span-5"
                }
              >
                <div className="mb-2">
                  <Select
                    selectedKeys={userOptions.type}
                    radius="none"
                    label="Seleccione el tipo de usuario"
                    className="md:col-span-2"
                    color="primary"
                    onSelectionChange={(e) => {
                      setUserOptions((prevState) => ({
                        ...prevState,
                        type: e,
                      }));
                    }}
                  >
                    {userType.map(({ key, label }) => (
                      <SelectItem key={key}>{label}</SelectItem>
                    ))}
                  </Select>
                  {userType.map(({ key, label }) => (
                    <SelectItem key={key}>{label}</SelectItem>
                  ))}
                </div>
                {userOptions.type.has("Asistente") && (
                  <form
                    onSubmit={handleSubmit(onSubmitAsistente)}
                    className="flex flex-col gap-2 "
                  >
                    <Select
                      selectedKeys={userOptions.certificate}
                      radius="none"
                      label="¿Desea certificado?"
                      className="md:col-span-2"
                      color="primary"
                      onSelectionChange={(e) => {
                        setUserOptions((prevState) => ({
                          ...prevState,
                          certificate: e,
                        }));
                      }}
                    >
                      {options.map(({ key, label }) => (
                        <SelectItem key={key}>{label}</SelectItem>
                      ))}
                    </Select>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        isInvalid={!!errors.nombres ? true : false}
                        errorMessage={errors.nombres?.message}
                        radius="none"
                        name="nombres"
                        {...register("nombres")}
                        label="Nombres"
                      />
                      <Input
                        isInvalid={!!errors.apellidos ? true : false}
                        errorMessage={errors.apellidos?.message}
                        name="apellidos"
                        radius="none"
                        {...register("apellidos")}
                        label="Apellidos"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-2">
                      <Input
                        isInvalid={!!errors.profesion ? true : false}
                        errorMessage={errors.profesion?.message}
                        radius="none"
                        {...register("profesion")}
                        name="profesion"
                        label="Profesión"
                      />
                      <Input
                        isInvalid={!!errors.cedula ? true : false}
                        errorMessage={errors.cedula?.message}
                        radius="none"
                        {...register("cedula")}
                        maxLength={10}
                        name="cedula"
                        label="Cédula"
                      />
                    </div>

                    <div
                      className={`grid  " ${
                        !userOptions.certificate ? "" : "grid-cols-2 gap-2"
                      }`}
                    >
                      <div>
                        <Select
                          errorMessage={errors.id_modalidad?.message}
                          isInvalid={!!errors.id_modalidad ? true : false}
                          radius="none"
                          label="Modalidad"
                          className="md:col-span-2"
                          {...register("id_modalidad")}
                        >
                          {modalidades.map(({ id, nombre }) => (
                            <SelectItem key={id}>{nombre}</SelectItem>
                          ))}
                        </Select>
                      </div>
                      {userOptions.certificate && (
                        <div>
                          <Select
                            radius="none"
                            label="Precio"
                            isInvalid={!!errors.costo ? true : false}
                            errorMessage={errors.costo?.message}
                            className="md:col-span-2"
                            {...register("costo", {
                              required: "Costo del evento es obligatorio",
                            })}
                          >
                            {!!id
                              ? precios.map(({ key, label }) => (
                                  <SelectItem key={key}>{label}</SelectItem>
                                ))
                              : disabledprecios.map(({ key, label }) => (
                                  <SelectItem key={key}>{label}</SelectItem>
                                ))}
                          </Select>
                        </div>
                      )}
                      {/* <Input
   required
   register={register}
   errors={errors}
   name="costo"
   className={` w-full text-sm input input-bordered input-ghost text-gray-900`}
   placeholder="Costo"
   type="number"
 /> */}
                    </div>

                    <Input
                      isInvalid={!!errors.direccion ? true : false}
                      errorMessage={errors.direccion?.message}
                      radius="none"
                      {...register("direccion")}
                      name="direccion"
                      label="Dirección"
                    />
                    <Input
                      isInvalid={!!errors.edad ? true : false}
                      errorMessage={errors.edad?.message}
                      radius="none"
                      {...register("edad")}
                      name="edad"
                      label="Edad"
                      type="number"
                    />
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
                        className="text-white"
                        variant="solid"
                        color="primary"
                        type="submit"
                        radius="none"
                        isLoading={isLoading}
                        spinner={
                          <svg
                            className="animate-spin h-5 w-5 text-current"
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
                        Enviar <HiChevronRight />
                      </Button>
                    )}
                  </form>
                )}

                {userOptions.type.has("Ponente") && (
                  <form
                    onSubmit={handleSubmit(onSubmitPonente)}
                    className="md:grid grid-cols-1 md:grid-cols-2 gap-2 flex flex-col"
                  >
                    <Input
                      radius="none"
                      errorMessage={errors.nombres?.message}
                      isInvalid={!!errors.nombres ? true : false}
                      {...register("nombres")}
                      name="nombres"
                      label="Nombres y apellidos"
                    />
                    <Input
                      radius="none"
                      disabled
                      label="Costo de la ponencia"
                      value={" 39.99 dólares"}
                    />
                    <Input
                      radius="none"
                      errorMessage={errors.cedula?.message}
                      isInvalid={!!errors.cedula ? true : false}
                      {...register("cedula")}
                      name="cedula"
                      label="Cédula"
                    />

                    <Input
                      errorMessage={errors.email?.message}
                      isInvalid={!!errors.email ? true : false}
                      radius="none"
                      {...register("email")}
                      name="email"
                      label="Email"
                      type="email"
                    />
                    <Input
                      errorMessage={errors.edad?.message}
                      isInvalid={!!errors.edad ? true : false}
                      radius="none"
                      {...register("edad")}
                      name="edad"
                      errors={errors}
                      label="Edad"
                      type="number"
                    />
                    <Input
                      errorMessage={errors.direccion?.message}
                      isInvalid={!!errors.direccion ? true : false}
                      radius="none"
                      {...register("direccion")}
                      name="direccion"
                      label="Dirección"
                    />
                    <Input
                      errorMessage={errors.profesion?.message}
                      isInvalid={!!errors.profesion ? true : false}
                      radius="none"
                      {...register("profesion")}
                      name="profesion"
                      label="Título profesional"
                    />
                    <Input
                      errorMessage={errors.telefono?.message}
                      isInvalid={!!errors.telefono ? true : false}
                      radius="none"
                      name="telefono"
                      label="Número telefónico"
                      type="text"
                      maxLength={16}
                      {...register("telefono")}
                    />
                    <div className="md:col-span-2">
                      <Input
                        errorMessage={errors.tematica?.message}
                        isInvalid={!!errors.tematica ? true : false}
                        radius="none"
                        errors={errors}
                        {...register("tematica")}
                        name="tematica"
                        label="Temática de la ponencia"
                        type="text"
                      />
                    </div>
                    <InputFile
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setCurriculum(file);
                      }}
                      className="col-span-2"
                    >
                      <button
                        type="button"
                        className="text-sm text-white
                          bg-[#00335f] hover:bg-[#00335f]
                        transition-colors py-2 rounded-sm flex items-center gap-2 w-full justify-center"
                      >
                        Subir curriculum
                        <FiUpload />
                      </button>
                    </InputFile>

                    {curriculum && (
                      <span className="col-span-2 text-xs text-gray-600">
                        {shortenString(curriculum.name, 60)}
                      </span>
                    )}

                    <div className="col-span-2">
                      <h5 className="font-semibold">Aclaración:</h5>
                      <p className="text-gray-600">
                        En caso de que su ponencia no sea aceptada, quedará
                        usted automaticamente inscrito como asistente(a){" "}
                      </p>
                    </div>
                    {/* <span>
              {formErrors.curriculum && formErrors.curriculum.message}
            </span> */}
                    <Button
                      radius="none"
                      color="primary"
                      isLoading={isLoading}
                      spinner={
                        <svg
                          className="animate-spin h-5 w-5 text-current"
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
                      className="col-span-2"
                      type="submit"
                    >
                      Enviar <HiChevronRight />
                    </Button>
                  </form>
                )}
              </section>
              <section className="col-span-1 md:col-span-2 w-full ">
                {isOpen && (
                  <>
                    {userOptions.certificate.has("1") && (
                      <div className="bg-[#f4f4f5] rounded-md p-4 w-full flex flex-col gap-4">
                        {parseFloat(costo) === 19.99 && (
                          <div className="">
                            <div className=" text-base font-normal">
                              Certificado de discapacidad:
                            </div>
                            <InputFile
                              onChange={(e) => {
                                const file = e.target.files[0];
                                setCertificado(file);
                              }}
                            >
                              <button className="text-sm text-white hover:bg-[#00335f] bg-[#00335f] transition-colors py-2 rounded-sm flex items-center gap-2 w-full justify-center">
                                Subir certificado
                                <PiIdentificationCardLight size={25} />
                              </button>
                              {certificado && <span>{certificado.name}</span>}
                            </InputFile>
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
                            radius="none"
                            className="text-sm text-white hover:bg-[#00335f] bg-[#00335f] transition-colors py-2 rounded-sm flex items-center gap-2 w-full justify-center"
                          >
                            Subir comprobante
                            <FiUpload />
                          </button>

                          {comprobante && (
                            <span className="col-span-2 text-xs text-gray-600">
                              {shortenString(comprobante.name, 60)}
                            </span>
                          )}
                        </InputFile>
                        <Accordion>
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
                              radius="none"
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
