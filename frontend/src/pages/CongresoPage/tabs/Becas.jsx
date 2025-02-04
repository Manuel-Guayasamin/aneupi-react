import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { HiUpload } from "react-icons/hi";
import { useState } from "react";
import { InputFile } from "../../../components/ui/InputFile";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Definir el esquema de validación con zod
const schema = z.object({
  nombres: z
    .string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" })
    .max(50, { message: "El nombre no puede exceder los 50 caracteres" })
    .refine((val) => /^[a-zA-Z\s]*$/.test(val), {
      message: "El nombre solo puede contener letras y espacios",
    }),

  apellidos: z
    .string()
    .min(1, { message: "Los apellidos son obligatorios" })
    .max(50, { message: "Los apellidos no pueden exceder los 50 caracteres" })
    .refine((val) => /^[a-zA-Z\s]*$/.test(val), {
      message: "Los apellidos solo pueden contener letras y espacios",
    }),

  institucion: z
    .string()
    .min(1, { message: "La institución es obligatoria" })
    .max(100, {
      message:
        "El nombre de la institución no puede exceder los 100 caracteres",
    }),

  correo: z
    .string()
    .email({ message: "Por favor, introduce un correo electrónico válido" })
    .refine((val) => val.includes("."), {
      message:
        "El correo debe contener un dominio válido (ejemplo@dominio.com)",
    }),

  telefono: z
    .string()
    .min(7, { message: "El número de teléfono debe tener al menos 7 dígitos" })
    .max(15, {
      message: "El número de teléfono no puede exceder los 15 dígitos",
    })
    .refine((val) => /^\+?[\d\s-]+$/.test(val), {
      message:
        "El teléfono solo puede contener números, espacios, guiones y el símbolo +",
    }),

  direccion: z
    .string()
    .min(5, { message: "La dirección debe tener al menos 5 caracteres" })
    .max(200, { message: "La dirección no puede exceder los 200 caracteres" }),

  ciudad: z
    .string()
    .min(2, {
      message: "El nombre de la ciudad debe tener al menos 2 caracteres",
    })
    .max(50, {
      message: "El nombre de la ciudad no puede exceder los 50 caracteres",
    })
    .refine((val) => /^[a-zA-Z\s]*$/.test(val), {
      message: "El nombre de la ciudad solo puede contener letras y espacios",
    }),

  pais: z
    .string()
    .min(2, { message: "El nombre del país debe tener al menos 2 caracteres" })
    .max(50, {
      message: "El nombre del país no puede exceder los 50 caracteres",
    })
    .refine((val) => /^[a-zA-Z\s]*$/.test(val), {
      message: "El nombre del país solo puede contener letras y espacios",
    }),
});

export const Becas = () => {
  const [tipoBeca, setTipoBeca] = useState(new Set([]));
  const [discapacidad, setDiscapacidad] = useState(new Set([]));
  console.log(tipoBeca, discapacidad);
  const [files, setFiles] = useState({
    cv: null,
    comprobante: null,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    if (!files.cv) {
      setError("cv", { message: "Por favor, adjunta tu Curriculum Vitae" });
    }
    if (tipoBeca.size === 0) {
      setError("tipoBeca", { message: "Por favor, selecciona una opción" });
    }
    if (discapacidad.size === 0) {
      setError("discapacidad", { message: "Por favor, selecciona una opción" });
    }
    console.log(data);
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-4 px-6">
      <article>
        <h3
          className="
          text-2xl
          font-semibold
          text-[#00335f]
          border-b-2
          border-[#00335f]
          pb-2
        "
        >
          ¿Becas?
        </h3>
        <p className="text-justify mt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
          officia aspernatur rerum saepe, velit, error consectetur at ratione
          sit veniam earum non recusandae! Officia molestias maiores, delectus
          sequi vel expedita? Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Sapiente officia aspernatur rerum saepe, velit, error
          consectetur at ratione sit veniam earum non recusandae! Officia
          molestias maiores, delectus sequi vel expedita? Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Sapiente officia aspernatur rerum
          saepe, velit, error consectetur at ratione sit veniam earum non
          recusandae! Officia molestias maiores, delectus sequi vel expedita?
        </p>
      </article>
      <article className="space-y-4">
        <h3
          className="text-2xl
          font-semibold
          text-[#00335f]
          border-b-2
          border-[#00335f]
          pb-2"
        >
          Llena tus datos para aplicar a una Beca
        </h3>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Select
            selectedKeys={tipoBeca}
            onSelectionChange={setTipoBeca}
            radius="none"
            label="Deseo asistir de manera:"
            className="w-full md:col-span-2"
          >
            <SelectItem key="online">En línea</SelectItem>
            <SelectItem key="presencial">Presencial</SelectItem>
          </Select>
          <Select
            selectedKeys={discapacidad}
            onSelectionChange={setDiscapacidad}
            radius="none"
            label="Discapacidad"
            className="w-full md:col-span-2"
          >
            <SelectItem key="1">Si</SelectItem>
            <SelectItem key="2">No</SelectItem>
          </Select>
          <Input
            isInvalid={!!errors.nombres}
            errorMessage={errors.nombres && errors.nombres.message}
            {...register("nombres")}
            radius="none"
            label="Nombres"
          />

          <Input
            isInvalid={!!errors.apellidos}
            errorMessage={errors.apellidos && errors.apellidos.message}
            {...register("apellidos")}
            radius="none"
            label="Apellidos"
          />

          <Input
            isInvalid={!!errors.institucion}
            errorMessage={errors.institucion && errors.institucion.message}
            {...register("institucion")}
            radius="none"
            label="Institución"
          />

          <Input
            isInvalid={!!errors.correo}
            errorMessage={errors.correo && errors.correo.message}
            {...register("correo")}
            radius="none"
            label="Correo"
          />

          <Input
            isInvalid={!!errors.telefono}
            errorMessage={errors.telefono && errors.telefono.message}
            {...register("telefono")}
            radius="none"
            label="Teléfono"
          />

          <Input
            isInvalid={!!errors.direccion}
            errorMessage={errors.direccion && errors.direccion.message}
            {...register("direccion")}
            radius="none"
            label="Dirección"
          />

          <Input
            isInvalid={!!errors.ciudad}
            errorMessage={errors.ciudad && errors.ciudad.message}
            {...register("ciudad")}
            radius="none"
            label="Ciudad"
          />

          <Input
            isInvalid={!!errors.pais}
            errorMessage={errors.pais && errors.pais.message}
            {...register("pais")}
            {...register("pais")}
            radius="none"
            label="País"
          />
          <section className="md:col-span-2 flex flex-col">
            <div className="grid grid-cols-2 bg-warning-500 items-center justify-around py-2 divide-x-2 divide-[#ffc825]">
              <InputFile
                onChange={(e) => setFiles({ ...files, cv: e.target.files[0] })}
                label="Adjuntar CV"
              >
                <button
                  type="button"
                  radius="none"
                  variant="bordered"
                  className="w-full flex items-center justify-center gap-2 py-2 text-xs md:text-medium"
                >
                  Subir Curriculum <HiUpload />
                </button>
              </InputFile>
              <InputFile
                onChange={(e) =>
                  setFiles({ ...files, comprobante: e.target.files[0] })
                }
                label="Adjuntar CV"
              >
                <button
                  as="div"
                  radius="none"
                  className="w-full flex items-center justify-center gap-2 py-2  text-xs md:text-medium"
                  variant="bordered"
                >
                  Subir comprobante <HiUpload />
                </button>
              </InputFile>
            </div>
            <div className="grid grid-cols-2 text-sm text-gray-500">
              {files.cv && (
                <p className="text-sm px-2">
                  CV:{" "}
                  {files.cv.name.length > 15
                    ? files.cv.name.substring(0, 15) + "..."
                    : files.cv.name}{" "}
                </p>
              )}
              {files.comprobante && (
                <p className="text-sm px-2">
                  Comprobante:{" "}
                  {files.comprobante.name.length > 15
                    ? files.comprobante.name.substring(0, 15) + "..."
                    : files.comprobante.name}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2">
              {errors.cv && (
                <p className="text-[#f31260] text-xs">{errors.cv.message}</p>
              )}
              {errors.cv && (
                <p className="text-[#f31260] text-xs">{errors.cv.message}</p>
              )}
            </div>
          </section>
          <Button
            type="submit"
            radius="none"
            color="primary"
            className="md:col-span-2 bg-[#00335f] "
          >
            Aplicar
          </Button>
        </form>
      </article>
    </section>
  );
};
