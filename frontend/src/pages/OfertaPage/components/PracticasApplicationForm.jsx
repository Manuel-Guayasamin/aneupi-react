import { useEffect, useState, useController } from "react";
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
import { useForm } from "react-hook-form"
import { createSolicitudPractica } from "../../../redux/slices/solicitarPracticasSlice";
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
value,
isToday,
placeholder,
variant = "faded", // similar to the variant in the Input component
}) => (
<div className="mb-4">
   <label
   className={`block text-sm font-bold text-gray-900 ${
   variant === "faded" ? "text-gray-500" : "text-gray-900"
   }`}
   htmlFor={name}
   >
   {label}
   </label>
   <input
   id={name}
   defaultValue={value}
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
const PracticasApplicationForm = ({
showModal,
setShowModal,
setIsSubmitButtonDisabled,
isSubmitButtonDisabled,
practica_id,
is_trabajo,
empresa,
fechaInicio,
fechaFin,
total_horas,
carrera,
tipo_practica,
}) => 
  {
const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
const paises = useSelector((state) => state.paises.paises);
const modalidades = useSelector((state) => state.modalidades.modalidades);
const [curriculum, setCurriculum] = useState(null);
const [fileError, setFileError] = useState(null);
const today = new Date().toISOString().split("T")[0];

const fecha_inicio = fechaInicio ? new Date(fechaInicio).toISOString().split('T')[0] : "";

const fecha_fin = fechaFin ? new Date(fechaFin).toISOString().split('T')[0] : "";
const {
register,
handleSubmit,
formState: { errors },
reset,
setValue,
} = useForm(); // Initialize useForm
const dispatch = useDispatch();
const onSubmit = (data) => {
if (!curriculum) {
setFileError("El documento es requerido");
setIsSubmitButtonDisabled(false);
return;
}
const fechaInicioFormatted = data.fecha_inicio
? new Date(data.fecha_inicio).toLocaleDateString("es-ES", {
year: "numeric",
month: "numeric",
day: "numeric",
})
: "";
data["fecha_inicio"]=fechaInicioFormatted;
const  fechaFinFormatted= data.fecha_fin
? new Date(data.fecha_fin).toLocaleDateString("es-ES", {
year: "numeric",
month: "numeric",
day: "numeric",
})
: "";
data["fecha_fin"]=fechaFinFormatted;
console.log(data);
dispatch(createSolicitudPractica({ ...data, curriculum })).then((result) => {
if (!result.error) {
   reset();
   setCurriculum(null); 
   setFileError(null); 
   onClose(); 
   setIsSubmitButtonDisabled(false); 
   setShowNotification(true);
}else {
   setIsSubmitButtonDisabled(false); 
}
// setShowModal(false);
// reset();
});
};
return(
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
   scrollBehavior="inside"
   onOpenChange={onOpen}
   // className="fixed inset-0 z-50 grid p-2 overflow-auto bg-gray-900 bg-opacity-50 md:p-4 place-items-center"
   >
   <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader>
         <h3 className="text-2xl font-bold text-left">¡Aplica ya!</h3>
      </ModalHeader>
      <ModalBody>
         <div className="grid w-full gap-4">
            <div className="grid gap-4 md:grid-cols-2">
               <fieldset>
               <Autocomplete
                  label="País"
                  variant="faded"
                  defaultItems={paises} 
                  onSelectionChange={(value) => setValue("pais_id", Number(value))}
                  placeholder="Selecciona un país"
                  labelPlacement="outside"
                  isInvalid={!!errors.pais_id }
                  errorMessage={errors.pais_id?.message} 
                >
                  {(item) => (
                    <AutocompleteItem key={item.id} value={item.id.toString()}>
                      {item.nombre}  
                    </AutocompleteItem>
                  )}
                </Autocomplete>
               </fieldset>
               {/* Ciudad/Cantón/Pueblo */}
               <fieldset>
                  <Input
                  label="Ciudad/Cantón/Pueblo"
                  labelPlacement="outside"
                  variant="faded"
                  name="lugar"
                  type="text"
                  {...register("lugar", {
                  required: "Por favor, ingrese una ciudad",
                  })}
                  placeholder="Cuenca / Gatito plis / Susudel"
                  isInvalid={!!errors.lugar}
                  errorMessage={errors.lugar?.message}
                  />
               </fieldset>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
               <fieldset>  
                  <Input
                  label="Contacto"
                  labelPlacement="outside"
                  variant="faded"
                  name="telefono"
                  type="text"
                  {...register("telefono", {
                  required: "Este campo es requerido",
                  })}
                  placeholder="Ingrese su numero de contacto"
                  isInvalid={!!errors.telefono}
                  errorMessage={errors.telefono?.message}
                  />
               </fieldset>
               <fieldset>
                  <Select
                  errorMessage={errors.is_discapacidad?.message}
                  isInvalid={!!errors.is_discapacidad ? true : false}
                  label="¿Tiene discapacidad?"
                  labelPlacement="outside"
                  placeholder="Seleccione..."
                  variant="faded"
                  {...register("is_discapacidad", {
                  required: "Este campo es requerido",
                  })}
                  >
                  <SelectItem key="false">No</SelectItem>
                  <SelectItem key="true">Si</SelectItem>
                  </Select>
               </fieldset>
            </div>
            {/* Email */}
            <fieldset className="flex-1">
               <Input
               label="Correo Electrónico"
               labelPlacement="outside"
               variant="faded"
               name="email"
               type="email"
               {...register("email", {
               required: "Este campo es requerido",
               pattern: {
               value: /^\S+@\S+\.\S+$/,
               message: "Ingrese una dirección de correo electrónico válida",
               },
               })}
               placeholder="juanperez@gmail.com"
               isInvalid={!!errors.email}
               errorMessage={errors.email?.message}
               />
            </fieldset>
            <fieldset className="flex-1">
               <Input
               label="Universidad o Institución"
               labelPlacement="outside"
               variant="faded"
               name="universidad"
               type="text"
               {...register("universidad", {
               required: "Este campo es requerido",
               })}
               placeholder="Universidad de Cuenca, etc.."
               isInvalid={!!errors.universidad}
               errorMessage={errors.universidad?.message}
               />
            </fieldset>
            <div className="grid gap-4 md:grid-cols-2">
               <fieldset>
                  <Input
                  label="Carrera que estudia"
                  labelPlacement="outside"
                  variant="faded"
                  name="carrera"
                  type="text"
                  defaultValue={carrera}
                  {...register("carrera", {
                  required: "Este campo es requerido",
                  })}
                  placeholder="Que carrera estudia..."
                  isInvalid={!!errors.carrera}
                  errorMessage={errors.carrera?.message}
                  />
               </fieldset>
               <fieldset>
                  <Input
                    label="Total de Horas"
                    labelPlacement="outside"
                    variant="faded"
                    name="total_horas"
                    type="number"
                    defaultValue={total_horas}
                    {...register("total_horas", {
                    required: "Este campo es requerido",
                    })}
                    placeholder="Ingrese el total de horas"
                    isInvalid={!!errors.total_horas}
                    errorMessage={errors.total_horas?.message}
                  />
               </fieldset>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
               <fieldset className="grid gap-2">
                  <Select
                  errorMessage={errors.tipo_practica?.message}
                  isInvalid={!!errors.tipo_practica ? true : false}
                  label="Tipo de Practica"
                  labelPlacement="outside"
                  placeholder="Seleccione..."
                  variant="faded"
                  value={tipo_practica}
                  {...register("tipo_practica", {
                  required: "Este campo es requerido",
                  })}
                  >
                  <SelectItem key="Pasantias">Pasantias</SelectItem>
                  <SelectItem key="Comunitarias">Comunitarias</SelectItem>
                  <SelectItem key="Master">Master</SelectItem>
                  </Select>
               </fieldset>
               <fieldset className="grid gap-2">
               <Select
                    errorMessage={errors.id_modalidad?.message}
                    isInvalid={!!errors.id_modalidad ? true : false}
                    label="Modalidad"
                    labelPlacement="outside"
                    placeholder="Seleccione una modalidad"
                    variant="faded"
                    name="id_modalidad"
                    items={modalidades}
                    {...register("id_modalidad", {
                      required: "Por favor seleccione una modalidad",
                    })}
                  >
                    {({ id, nombre }) => (
                      <SelectItem key={id}>{nombre}</SelectItem>
                    )}
                  </Select>

                  {errors.id_modalidad && (
                    <span
                      className="mt-2 text-white badge badge-error badge-sm"
                      style={{
                        lineHeight: "1.5",
                        height: "auto",
                        padding: "4px 8px",
                      }}
                    >
                      {errors.id_modalidad.message}
                    </span>
                  )}
               </fieldset>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
               <fieldset className="grid">
                  <TextInput
                     type="date"
                     value={fecha_inicio}
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
                     value={fecha_fin}
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
            <input
            type="hidden"
            name="id_estado"
            value="1"
            {...register("id_estado")}
            />
            <input
            type="hidden"
            name="practica_id"
            value={practica_id}
            {...register("practica_id")}
            />
            <input
            type="hidden"
            name="empresa"
            value={empresa}
            {...register("empresa")}
            />
            <input
            type="hidden"
            name="is_trabajo"
            value={is_trabajo}
            {...register("is_trabajo")}
            />
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
)
;}
export default PracticasApplicationForm;