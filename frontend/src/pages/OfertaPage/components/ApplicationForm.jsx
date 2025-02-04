import { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  Button,
  Input,
  Select,
  SelectItem,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { InputFile } from "../../../components/ui/InputPdf";
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { createPostulante } from "../../../redux/slices/postulantesSlice";

function shortenString(str, maxLength) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + "...";
}

const ApplicationFormModal = ({
  showModal,
  setShowModal,
  setIsSubmitButtonDisabled,
  isSubmitButtonDisabled,
  empresa,
  id_oficio,
}) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const paises = useSelector((state) => state.paises.paises);
  const modalidades = useSelector((state) => state.modalidades.modalidades);

  const [curriculum, setCurriculum] = useState(null);
  const [fileError, setFileError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    console.log(data);
    if (!curriculum) {
      setFileError("El documento es requerido");
      setIsSubmitButtonDisabled(false);
      return;
    }
    setIsSubmitButtonDisabled(true);
    dispatch(createPostulante({ ...data, curriculum })).then((result) => {
      console.log(result);
      if (!result.error) {
        reset();
        setCurriculum(null);
        setFileError(null);
        onClose();
        setIsSubmitButtonDisabled(false);
      } else {
        setIsSubmitButtonDisabled(false);
      }
      // setShowModal(false);
      // reset();
    });
  };

  return (
    <>
      <Button
        color="primary"
        onClick={onOpen}
        disabled={isSubmitButtonDisabled}
      >
        Aplicar
      </Button>

      <Modal
        onClose={onClose}
        isOpen={isOpen}
        size="xl"
        scrollBehavior="normal"
        onOpenChange={onOpen}
        // className="fixed inset-0 z-50 grid p-2 overflow-auto bg-gray-900 bg-opacity-50 md:p-4 place-items-center"
      >
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>
            <h3 className="text-2xl font-bold text-left">¡Aplica ya!</h3>
          </ModalHeader>
          <ModalBody>
            <div className="grid w-full gap-4">
              {/* Profesión */}
              <fieldset>
                <Input
                  label="Profesión"
                  labelPlacement="outside"
                  name="profesion"
                  variant="faded"
                  type="text"
                  isInvalid={!!errors.profesion}
                  errorMessage={errors.profesion?.message}
                  {...register("profesion", {
                    required: "Por favor, ingrese una profesión",
                  })}
                  placeholder="Programador, Contador, etc.."
                />
              </fieldset>
              {/* Interés */}
              <fieldset>
                <Input
                  label={"¿En qué área le gustaría trabajar?"}
                  labelPlacement="outside"
                  name="interes"
                  type="text"
                  {...register("interes", {
                    required: "Por favor, ingrese un área de interés",
                  })}
                  placeholder="Me gustaría trabajar de agente vendedor"
                  variant="faded"
                  isInvalid={!!errors.interes}
                  errorMessage={errors.interes?.interes}
                />
              </fieldset>

              {/* Email */}
              <fieldset>
                <Input
                  name="email"
                  variant="faded"
                  label="Correo Electrónico"
                  labelPlacement="outside"
                  {...register("email", {
                    required: "Este campo es requerido",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message:
                        "Ingrese una dirección de correo electrónico válida",
                    },
                  })}
                  type="email"
                  placeholder="ejemplo@ejemplo.com"
                  id="email"
                  isInvalid={!!errors.email}
                  errorMessage={errors.email?.message}
                />
              </fieldset>

              {/* País */}
              <div className="grid gap-4 md:grid-cols-2">
                <fieldset>
                  <Select
                    label="País"
                    variant="faded"
                    items={paises}
                    {...register("pais", {
                      required: "Por favor seleccione un país",

                      setValueAs: (item) => {
                        console.log(item);
                        return item;
                      },
                    })}
                    placeholder="Selecciona un país"
                    labelPlacement="outside"
                    isInvalid={!!errors.pais}
                    errorMessage={errors.pais?.message}
                  >
                    {(item) => (
                      <AutocompleteItem key={item.id} disabled>
                        {item.nombre}
                      </AutocompleteItem>
                    )}
                  </Select>
                  {/* <select
                      name="pais"
                      {...register("pais", {
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
                    </select> */}
                </fieldset>
                {/* Ciudad/Cantón/Pueblo */}
                <fieldset>
                  <Input
                    label="Ciudad/Cantón/Pueblo"
                    labelPlacement="outside"
                    variant="faded"
                    name="ciudad"
                    type="text"
                    {...register("ciudad", {
                      required: "Por favor, ingrese una ciudad",
                    })}
                    placeholder="Cuenca / Gatito plis / Susudel"
                    isInvalid={!!errors.ciudad}
                    errorMessage={errors.ciudad?.message}
                  />
                </fieldset>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {/* Modalidad */}
                <fieldset>
                  <Select
                    errorMessage={errors.modalidad?.message}
                    isInvalid={!!errors.modalidad ? true : false}
                    label="Modalidad"
                    labelPlacement="outside"
                    placeholder="Seleccione una modalidad"
                    variant="faded"
                    name="modalidad"
                    items={modalidades}
                    {...register("modalidad", {
                      required: "Por favor seleccione una modalidad",
                    })}
                  >
                    {({ id, nombre }) => (
                      <SelectItem key={id}>{nombre}</SelectItem>
                    )}
                  </Select>

                  {errors.modalidad && (
                    <span
                      className="mt-2 text-white badge badge-error badge-sm"
                      style={{
                        lineHeight: "1.5",
                        height: "auto",
                        padding: "4px 8px",
                      }}
                    >
                      {errors.modalidad.message}
                    </span>
                  )}
                </fieldset>
                {/* Jornada */}
                <fieldset>
                  <Select
                    errorMessage={errors.jornada?.message}
                    isInvalid={!!errors.jornada ? true : false}
                    label="Jornada"
                    labelPlacement="outside"
                    placeholder="Seleccione una jornada"
                    variant="faded"
                    {...register("jornada", {
                      required: "Por favor seleccione una jornada",
                    })}
                  >
                    <SelectItem key="completo">Tiempo Completo</SelectItem>
                    <SelectItem key="medio">Medio Tiempo</SelectItem>
                  </Select>
                </fieldset>
              </div>

              {/* ¿Eres Persona con Discapacidad? */}
              <fieldset>
                <Select
                  errorMessage={errors.discapacidad?.message}
                  isInvalid={!!errors.discapacidad ? true : false}
                  label="¿Tiene alguna discapacidad?"
                  labelPlacement="outside"
                  placeholder="Seleccione una opcion"
                  variant="faded"
                  {...register("is_discapacidad", {
                    required: "Por favor seleccione una opción",
                  })}
                >
                  <SelectItem key="true">Si</SelectItem>
                  <SelectItem key="false">No</SelectItem>
                </Select>
              </fieldset>
              <input
                type="hidden"
                name="is_trabajo"
                value="true"
                {...register("is_trabajo")}
              />
              <input
                type="hidden"
                name="id_oficio"
                value={id_oficio}
                {...register("id_oficio")}
              />
              <input
                type="hidden"
                name="empresa"
                value={empresa}
                {...register("empresa")}
              />
              {/* Curriculum Vitae */}
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
                  accept={"application/pdf"}
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

                {/* <input
                  name="curriculum"
                  type="file"
                  accept="application/pdf"
                  {...register("curriculum", {
                    required: "El documento es requerido",
                  })}
                  className="w-full file:py-2 file:px-4 file:border-0 file:text-white file:bg-colorcito file:cursor-pointer mb-3
                  hover:file:text-colorcito hover:file:bg-white file-input file-input-bordered"
                /> */}
                {/* {errors.curriculum && (
                  <span className="mt-2 text-white badge badge-error badge-sm">
                    {errors.curriculum.message}
                  </span>
                )} */}
              </fieldset>
              {/* Enviar */}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" color="danger" onClick={onClose}>
              Cerrar
            </Button>
            <Button
              type="submit"
              color="primary"
              disabled={isSubmitButtonDisabled}
            >
              Enviar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ApplicationFormModal;
