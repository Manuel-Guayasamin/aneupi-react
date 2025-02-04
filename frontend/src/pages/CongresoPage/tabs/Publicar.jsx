import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Select, SelectItem, Textarea, Button } from "@nextui-org/react";
import { InputFile } from "../../../components/ui/InputFile";
import { HiUpload } from "react-icons/hi";

export const Publicar = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [tipoPublicacion, setTipoPublicacion] = useState(new Set(["articulo"]));

  const onSubmit = (data) => {
    console.log(data);
  };
  console.log(tipoPublicacion);
  const handleTipoChange = (e) => {
    setTipoPublicacion(e.target.value);
  };

  return (
    <section className="grid md:grid-cols-2">
      <article></article>
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <Select
          classNames={{
            value: "ml-1",
          }}
          selectedKeys={tipoPublicacion}
          label="Tipo de publicación"
          onSelectionChange={setTipoPublicacion}
          // {...register("tipoPublicacion", {
          //   required: "Este campo es obligatorio",
          // })}
        >
          <SelectItem key="articulo">Artículo</SelectItem>
          <SelectItem key="video">Video</SelectItem>
          <SelectItem key="imagen">Imagen</SelectItem>
          <SelectItem key="libro">Libro</SelectItem>
        </Select>
        {errors.tipoPublicacion && <p>{errors.tipoPublicacion.message}</p>}

        <Input
          {...register("nombrePublicacion", {
            required: "Este campo es obligatorio",
          })}
          classNames={{
            input: "ml-1",
          }}
          label="Nombre"
          required
        />
        {errors.nombrePublicacion && <p>{errors.nombrePublicacion.message}</p>}

        {tipoPublicacion.has("articulo") && (
          <>
            <Input
              {...register("autor", { required: "Este campo es obligatorio" })}
              classNames={{
                input: "ml-1",
              }}
              label="Autor"
              required
            />
            {errors.autor && <p>{errors.autor.message}</p>}
            <Textarea
              {...register("resumen", {
                required: "Este campo es obligatorio",
              })}
              classNames={{
                textarea: "ml-1",
              }}
              label="Resumen"
              required
            />
            {errors.resumen && <p>{errors.resumen.message}</p>}
          </>
        )}

        {tipoPublicacion.has("video") && (
          <>
            <Input
              {...register("duracion", {
                required: "Este campo es obligatorio",
              })}
              classNames={{
                input: "ml-1",
              }}
              label="Duración (minutos)"
              required
            />
            {errors.duracion && <p>{errors.duracion.message}</p>}
            <Input
              {...register("urlVideo", {
                required: "Este campo es obligatorio",
              })}
              classNames={{
                input: "ml-1",
              }}
              label="URL del video"
              required
            />
            {errors.urlVideo && <p>{errors.urlVideo.message}</p>}
          </>
        )}

        {tipoPublicacion.has("imagen") && (
          <>
            <Input
              {...register("descripcion", {
                required: "Este campo es obligatorio",
              })}
              classNames={{
                input: "ml-1",
              }}
              label="Descripción"
              required
            />
            {errors.descripcion && <p>{errors.descripcion.message}</p>}
            <Input
              type="file"
              {...register("archivoImagen", {
                required: "Este campo es obligatorio",
              })}
              classNames={{
                input: "ml-1",
              }}
              label="Subir imagen"
              required
            />
            {errors.archivoImagen && <p>{errors.archivoImagen.message}</p>}
          </>
        )}

        {tipoPublicacion.has("libro") && (
          <>
            <Input
              {...register("autor", { required: "Este campo es obligatorio" })}
              classNames={{
                input: "ml-1",
              }}
              label="Autor"
              required
            />
            {errors.autor && <p>{errors.autor.message}</p>}
            <Input
              {...register("anio", { required: "Este campo es obligatorio" })}
              classNames={{
                input: "ml-1",
              }}
              label="Año de publicación"
              required
            />
            {errors.anio && <p>{errors.anio.message}</p>}
            <Input
              {...register("isbn", { required: "Este campo es obligatorio" })}
              classNames={{
                input: "ml-1",
              }}
              label="ISBN"
              required
            />
            {errors.isbn && <p>{errors.isbn.message}</p>}

            <section className="md:col-span-2 flex flex-col">
              <div className="grid grid-cols-2 bg-warning-500 items-center justify-around py-2 divide-x-2 divide-[#ffc825]">
                <InputFile label="Adjuntar CV">
                  <button
                    type="button"
                    radius="none"
                    variant="bordered"
                    className="w-full flex items-center justify-center gap-2 py-2 text-xs md:text-medium"
                  >
                    Subir Archivo <HiUpload />
                  </button>
                </InputFile>
                <InputFile label="Adjuntar CV">
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
              <div className="grid grid-cols-2 text-sm text-gray-500"></div>
              <div className="grid grid-cols-2">
                {errors.cv && (
                  <p className="text-[#f31260] text-xs">{errors.cv.message}</p>
                )}
                {errors.cv && (
                  <p className="text-[#f31260] text-xs">{errors.cv.message}</p>
                )}
              </div>
            </section>
          </>
        )}

        <Button className="w-full" color="primary" type="submit">
          Publicar
        </Button>
      </form>
    </section>
  );
};
