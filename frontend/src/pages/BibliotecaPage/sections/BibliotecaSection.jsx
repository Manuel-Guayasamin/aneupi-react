import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createBiblioteca,
  fetchBibliotecas,
} from "../../../redux/slices/bibliotecaSlice";
import { fetchTiposBibliotecas } from "../../../redux/slices/tipoBibliotecaSlice";
import ButtonEnviar from "../../../dashboard/components/Buttons/ButtonEnviar";

const BibliotecaSection = () => {
  const dispatch = useDispatch();
  const tipos = useSelector((state) => state.tipoBiblioteca.tiposBibliotecas);
  const usuario = useSelector((state) => state.authentication.usuario);

  useEffect(() => {
    dispatch(fetchTiposBibliotecas());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    data.id_usuario = usuario.id;
    dispatch(createBiblioteca(data))
      .then(() => {
        reset();
      })
      .then(() => fetchBibliotecas());
  };

  return (
    <section className="p-4">
      <div className="max-w-screen-xl mx-auto">
        <header className="pb-4 md:!pb-14 text-center space-y-2">
          <h2 className="text-2xl font-bold text-[#00335f] md:text-4xl">
            Añadir a la Biblioteca
          </h2>
          <p className="max-w-md mx-auto text-sm text-gray-500 md:text-base">
            Completa el formulario para añadir un nuevo elemento a la biblioteca
          </p>
        </header>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid max-w-screen-sm gap-4 mx-auto sm:grid-cols-1"
        >
          <div className="flex flex-col">
            <label
              htmlFor="id_tipo_biblioteca"
              className="inline-block mb-2 text-sm text-[#00335f] sm:text-base"
            >
              Tipo
            </label>
            <select
              id="id_tipo_biblioteca"
              {...register("id_tipo_biblioteca", {
                required: "Selecciona el tipo",
              })}
              className="w-full text-sm input input-bordered"
            >
              <option value="">Selecciona el tipo</option>

              {tipos.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.nombre}
                </option>
              ))}
            </select>
            {errors.id_tipo_biblioteca && (
              <p className="mt-1 text-white badge badge-error badge-sm">
                {errors.id_tipo_biblioteca.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="titulo"
              className="inline-block mb-2 text-sm text-[#00335f] sm:text-base"
            >
              Título
            </label>
            <input
              id="titulo"
              {...register("titulo", { required: "Ingresa el título" })}
              className="w-full text-sm input input-bordered"
            />
            {errors.titulo && (
              <p className="mt-1 text-white badge badge-error badge-sm">
                {errors.titulo.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="nombre_autor"
              className="inline-block mb-2 text-sm text-[#00335f] sm:text-base"
            >
              Autor
            </label>
            <input
              id="nombre_autor"
              {...register("nombre_autor", { required: "Ingresa el autor" })}
              className="w-full text-sm input input-bordered"
            />
            {errors.nombre_autor && (
              <p className="mt-1 text-white badge badge-error badge-sm">
                {errors.nombre_autor.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="descripcion"
              className="inline-block mb-2 text-sm text-[#00335f] sm:text-base"
            >
              Descripción
            </label>
            <textarea
              id="descripcion"
              {...register("descripcion", {
                required: "Ingresa la descripción",
              })}
              className="w-full text-sm input input-bordered"
            ></textarea>
            {errors.descripcion && (
              <p className="mt-1 text-white badge badge-error badge-sm">
                {errors.descripcion.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="fecha_publicacion"
              className="inline-block mb-2 text-sm text-[#00335f] sm:text-base"
            >
              Año de Publicación
            </label>
            <input
              id="fecha_publicacion"
              {...register("fecha_publicacion", {
                required: "Ingresa el año de publicación",
                validate: (value) => {
                  const selectedDate = new Date(value);
                  const currentYear = new Date().getFullYear();
                  return (
                    (selectedDate.getFullYear() >= 1900 &&
                      selectedDate.getFullYear() <= currentYear) ||
                    "Ingresa un año válido (entre 1900 y el año actual)"
                  );
                },
              })}
              type="date"
              className="w-full text-sm input input-bordered"
            />
            {errors.fecha_publicacion && (
              <p className="mt-1 text-white badge badge-error badge-sm">
                {errors.fecha_publicacion.message}
              </p>
            )}
          </div>

          <div className="flex flex-col mb-4">
            <label
              htmlFor="editorial"
              className="inline-block mb-2 text-sm text-[#00335f] sm:text-base"
            >
              Editorial
            </label>
            <input
              id="editorial"
              {...register("editorial", { required: "Ingresa la editorial" })}
              type="text"
              className="w-full text-sm input input-bordered"
            />
            {errors.editorial && (
              <p className="mt-1 text-white badge badge-error badge-sm">
                {errors.editorial.message}
              </p>
            )}
          </div>

          <div className="flex flex-col mb-4">
            <label
              htmlFor="imagen"
              className="inline-block mb-2 text-sm text-[#00335f] sm:text-base"
            >
              Imagen
            </label>
            <input
              id="imagen"
              type="file"
              {...register("imagen", { required: "Imagen es obligatoria" })}
              className="w-full p-1 mt-1 border border-[#00335f] rounded-md file-input file-input-bordered  text-white focus:outline-none focus:ring-[#00335f] focus:border-[#00335f]"
            />
            {errors.imagen && (
              <span className="mt-1 text-sm text-white badge badge-error badge-sm">
                {errors.imagen.message}
              </span>
            )}
          </div>

          <div className="flex flex-col mb-4">
            <label
              htmlFor="archivo"
              className="inline-block mb-2 text-sm text-[#00335f] sm:text-base"
            >
              Archivo
            </label>
            <input
              id="archivo text-[#00335f]"
              type="file"
              {...register("archivo", { required: "Archivo es obligatorio" })}
              className="w-full p-1 mt-1 border border-[#00335f] rounded-md file-input file-input-bordered  text-white focus:outline-none focus:ring-[#00335f] focus:border-[#00335f]"
            />
            {errors.archivo && (
              <span className="mt-1 text-sm text-white badge badge-error badge-sm">
                {errors.archivo.message}
              </span>
            )}
          </div>

          <fieldset className="flex justify-center">
            <ButtonEnviar text="Enviar" />
          </fieldset>
        </form>
      </div>
    </section>
  );
};

export default BibliotecaSection;
