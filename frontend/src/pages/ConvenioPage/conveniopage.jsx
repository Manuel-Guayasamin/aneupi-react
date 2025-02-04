import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../components/navigation/BreadCrumb";
import "../../App.css";
import Subtitle from "../../components/ui/Subtitle";
import Hojas9 from "../../img/convenios/pontificiauce1.jpg";
import Hojas17 from "../../img/convenios/uambato1.jpg";
import Hojas15 from "../../img/convenios/ubabahoyo1.jpg";
import Hojas5 from "../../img/convenios/uchimborazo1.jpg";
import Hojas18 from "../../img/convenios/uchimborazo2.jpg";
import Hojas6 from "../../img/convenios/ucordillera1.jpg";
import Hojas16 from "../../img/convenios/ucotopaxi1.png";
import Hojas from "../../img/convenios/ucuenca1.jpg";
import Hojas4 from "../../img/convenios/ucuenca2.jpg";
import Hojas14 from "../../img/convenios/uesmeraldas1.png";
import Hojas3 from "../../img/convenios/uespol1.jpg";
import Hojas2 from "../../img/convenios/uguayaquil1.jpg";
import Hojas10 from "../../img/convenios/uide1.png";
import Hojas8 from "../../img/convenios/umachala1.jpg";
import Hojas7 from "../../img/convenios/umanabi1.jpg";
import Hojas11 from "../../img/convenios/unemi1.png";
import Hojas1 from "../../img/convenios/uquevedo1.jpg";
import Hojas12 from "../../img/convenios/uquito1.jpg";
import Hojas13 from "../../img/convenios/usantaelena1.jpg";
import Hojas19 from "../../img/convenios/utpl1.jpg";

import Layout from "../layout";
import ConvenioSection from "./sections/ConvenioSection";
import MisionVisionSection from "./sections/MisionVisionSection";
import BarraImagenes from "../OfertaPage/components/BarraImagenes";
import {
  createConvenio,
  fetchConvenios,
} from "../../redux/slices/conveniosSlice";
import { useForm } from "react-hook-form";
import ReactPaginate from "react-paginate";
import { FaFilePdf, FaHandshake } from "react-icons/fa";
import NotifyWhatsapp from "../../components/ui/NotifyWhatsapp";
import ApplicationFormModal from "./sections/ApplicationForm";
import { fetchModalidades } from "../../redux/slices/modalidadesSlice";
import { fetchTipoConvenios } from "../../redux/slices/tipoconveniosSlice";
import { toast } from "react-toastify";
import { getAllPaises } from "../../redux/slices/paisesSlice";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ScrollShadow,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { Input } from "../../components/ui/Input";
const serverURL = import.meta.env.VITE_API_URL;

const breadcrumbLinks = [
  { label: "Inicio", path: "/" },
  { label: "Convenios de Universidades", path: "/convenios/universidades" },
];

const responsive = {
  desktop: {
    breakpoint: { max: 4096, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
};

{
  /*
const responsive = {
    mobile: {
      breakpoint: { max: 4096, min: 0 },
      items: 1,
    },
  };
*/
}

const images = [
  Hojas,
  Hojas1,
  Hojas2,
  Hojas3,
  Hojas4,
  Hojas5,
  Hojas6,
  Hojas7,
  Hojas8,
  Hojas9,
  Hojas10,
  Hojas11,
  Hojas12,
  Hojas13,
  Hojas14,
  Hojas15,
  Hojas16,
  Hojas17,
  Hojas18,
  Hojas19,
  // Asegúrate de agregar todas las imágenes importadas al array
];

const ConvenioPage = () => {
  const dispatch = useDispatch();
  const { convenios, loading } = useSelector((state) => state.convenios);
  const modalidades = useSelector((state) => state.modalidades.modalidades);
  const tipoconvenios = useSelector(
    (state) => state.tipoconvenios.tipoConvenios
  );
  const paises = useSelector((state) => state.paises.paises);

  const [showModal, setShowModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const [duracion, setDuracion] = useState(0);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    dispatch(fetchConvenios());
    dispatch(fetchModalidades());
    dispatch(fetchTipoConvenios());
    dispatch(getAllPaises());
  }, [dispatch]);


  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const conveniosAprobados = convenios.filter((convenio) => {
    return convenio.id_estado == 2 || convenio.id_estado == 4;
  });

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const displayedConvenios = conveniosAprobados.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const onSubmit = (Conveniodata) => {
    try {
      // Conveniodata.id_usuario = usuario.id;
      Conveniodata.id_estado = 1;
      Conveniodata.duracion = duracion;
      dispatch(createConvenio(Conveniodata)).then(() => {
        dispatch(fetchConvenios());
        setShowModal(false);
        setShowNotification(true);
        reset();
      });
      onOpenChange();
      toast.success("Convenio propuesto exitosamente");
      setShowNotification(true);
      reset();
    } catch (error) {
      console.error("Error al proponer el convenio:", error);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const minFinDate = fechaInicio
    ? new Date(fechaInicio).setFullYear(new Date(fechaInicio).getFullYear() + 1)
    : new Date(today).setFullYear(new Date(today).getFullYear() + 1);
  const maxFinDate = fechaInicio
    ? new Date(fechaInicio).setFullYear(new Date(fechaInicio).getFullYear() + 5)
    : new Date(today).setFullYear(new Date(today).getFullYear() + 5);

  const min = new Date(minFinDate).toISOString().split("T")[0];
  const max = new Date(maxFinDate).toISOString().split("T")[0];

  const handleFechaInicioChange = (event) => {
    const nuevaFechaInicio = event.target.value;
    setFechaInicio(nuevaFechaInicio);
    fechaFin
      ? calcularDuracion(nuevaFechaInicio, fechaFin, setDuracion)
      : toast.warning("Seleccione la fecha de fin");
  };

  const handleFechaFinChange = (event) => {
    const nuevaFechaFin = event.target.value;
    setFechaFin(nuevaFechaFin);
    fechaInicio
      ? calcularDuracion(fechaInicio, nuevaFechaFin, setDuracion)
      : toast.warning("Seleccione la fecha de inicio");
  };

  // Función para calcular la duración entre las fechas
  const calcularDuracion = (inicio, fin, setDuracion) => {
    const fechaInicio = new Date(inicio);
    const fechaFin = new Date(fin);
    const diferenciaAnios = fechaFin.getFullYear() - fechaInicio.getFullYear();
    const diferenciaMeses = fechaFin.getMonth() - fechaInicio.getMonth();

    // Si la diferencia de meses es negativa, significa que el año de fechaInicio es mayor
    // que el año de fechaFin, por lo que restamos un año a la diferencia de años
    const duracionAnios =
      diferenciaMeses < 0 ? diferenciaAnios - 1 : diferenciaAnios;

    // Validamos que la duración cumpla con los requisitos mínimos y máximos
    if (duracionAnios < 1 || duracionAnios > 5) {
      setDuracion(0);
      toast.error("La duración del convenio debe ser de 1 a 5 años");
    } else {
      setDuracion(duracionAnios);
    }
  };

  const handleInput = (event) => {
    // Filtra el valor de entrada para permitir solo letras
    const inputValue = event.target.value;
    const filteredValue = inputValue.replace(/[^a-zA-Z\sáéíóúñ]/g, "");
    // Si el valor filtrado es diferente al valor de entrada, actualiza el valor del campo
    if (inputValue !== filteredValue) {
      event.target.value = filteredValue;
    }
  };

  const handleCloseModal = () => {
    onOpenChange(false);
    //setShowModal(false);
    reset(); // Reinicia el estado del formulario
  };

  return (
    <Layout>
      <BreadCrumb links={breadcrumbLinks} title="Convenios de Universidades" />
      {/* <section className="p-4">
        <header className="max-w-screen-xl py-12 mx-auto">
          <Subtitle title="Convenios de Universidades" />
          <Carousel
            itemClass="shadow-xl grid place-items-center border hover:scale-105 transition bg-white"
            className="py-12"
            sliderClass="flex md:gap-4 "
            autoPlay
            responsive={responsive}
            infinite
            draggable
            pauseOnHover
            centerMode
            swipeable
          >
            {images.map((image, index) => (
              <Zoom key={index}>
                <img
                  className="block object-fill w-full h-full"
                  src={image}
                  alt={`Imagen ${index}`}
                />
              </Zoom>
            ))}
          </Carousel>
        </header>
      </section> */}

      <section className="max-w-screen-xl mx-auto" id="inscripcion">
        {/* <div className='p-2'>
				<div className='bg-indigo-100 collapse collapse-arrow'>
					<input type='checkbox' />
					<h4 className='font-bold collapse-title'>Aclaración sobre la participación:</h4>
					<div className='text-sm collapse-content'>
						<p>
							Todos los usuarios que participarán en el{' '}
							<span className='font-bold'>
								CONVENIO QUE DESEEN FIRMAR CON NOSOTROS"
							</span>
							. Tanto en la modalidad virtual como presencial deberán acatar a las reglas y la
							planificación de este evento.
						</p>
					</div>
				</div>
			</div> */}

        {/* <ValidationConvenio /> */}
        {/* {active && (
          <article className='max-w-screen-xl py-12 mx-auto md:py-24'>
            <ConvenioSection />
          </article>
        )} */}

        <Subtitle title="Listado de Convenios con Instituciones de Educación Superior" />

        <main className="mt-2 space-y-10 ">
          <div className="w-full overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead className="bg-colorcito text-white">
                <tr
                  scope="col"
                  className="text-left text-xs font-medium uppercase tracking-wider"
                >
                  <th
                    scope="col"
                    className="text-left text-xs font-medium uppercase tracking-wider"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Institución
                  </th>
                  <th
                    scope="col"
                    className="text-left text-xs font-medium uppercase tracking-wider"
                  >
                    País
                  </th>
                  <th
                    scope="col"
                    className="text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Tipo de Convenio
                  </th>
                  <th
                    scope="col"
                    className="text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Estado
                  </th>
                  {/* <th
                    scope="col"
                    className="text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Modalidad
                  </th> */}
                  <th
                    scope="col"
                    className="text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Fecha de Inicio
                  </th>
                  <th
                    scope="col"
                    className="text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Fecha de Fin
                  </th>
                  <th
                    scope="col"
                    className="text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Duración
                  </th>
                  <th
                    scope="col"
                    className="text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Ver
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {!loading &&
                  displayedConvenios?.length > 0 &&
                  displayedConvenios?.map((convenio, index) => (
                    <tr key={convenio.id} className="text-sm">
                      <th>{indexOfFirstItem + index + 1}</th>
                      <td className="truncate font-bold">
                        {convenio.nombreOrganizacion}
                      </td>
                      <td className="whitespace-nowrap text-sm text-gray-500 truncate">
                        {convenio.Pai?.nombre}
                      </td>
                      <td className="whitespace-nowrap text-sm text-gray-500 truncate">
                        {convenio.TipoConvenio?.nombre}
                      </td>
                      <td className="whitespace-nowrap text-sm text-gray-500 truncate">
                        {convenio.Estado?.nombre == "Aprobado"
                          ? "Vigente"
                          : convenio.Estado?.nombre}
                      </td>
                      {/* <td className="whitespace-nowrap text-sm text-gray-500 truncate">
                        {convenio.Modalidad?.nombre}
                      </td> */}
                      <td className="whitespace-nowrap text-sm text-gray-500 truncate">
                        {new Date(convenio.fecha_inicio).toLocaleDateString(
                          "es-EC"
                        )}
                      </td>
                      <td className="whitespace-nowrap text-sm text-gray-500 truncate">
                        {new Date(convenio.fecha_fin).toLocaleDateString(
                          "es-EC"
                        )}
                      </td>
                      <td className="whitespace-nowrap text-sm text-gray-500 truncate">
                        {convenio.duracion === 1
                          ? convenio.duracion + " año"
                          : convenio.duracion + " años"}
                      </td>
                      <td>
                        <a
                          href={convenio.convenio_parcial}
                          target="_blank"
                          download
                          className="mr-2 hover:text-green-500 p-1.5 hover:bg-black/0 rounded-md badge badge-success"
                        >
                          <div className="tooltip" data-tip="Convenio">
                            <FaFilePdf />
                          </div>
                        </a>
                      </td>
                      {/* <td>
													<div className='flex items-center gap-2'>
														<button
															className='m-0 text-white btn btn-success btn-xs'
															type='button'
															onClick={() => {
																setShowModal(true);
																setValue('id_oficio', convenio.id);
																setValue('is_trabajo', true);
															}}
														>
															<span>Aplicar</span>
															<FaArrowRightFromBracket />
														</button>
													</div>
												</td> */}
                    </tr>
                  ))}
              </tbody>
            </table>
            {/* <ApplicationFormModal
								showModal={showModal}
								setShowModal={setShowModal}
								handleSubmit={handleSubmit}
								onSubmit={onSubmit}
								register={register}
								errors={errors}
                tipoconvenios={tipoconvenios}
                modalidades={modalidades}
                setDuracion={setDuracion}
                paises={paises}
							/> */}
          </div>
          {/* <ReactPaginate
							previousLabel={'Anterior'}
							nextLabel={'Siguiente'}
							pageCount={Math.ceil(trabajos.length / itemsPerPage)}
							pageClassName={'page-count'}
							marginPagesDisplayed={2}
							pageRangeDisplayed={5}
							onPageChange={handlePageChange}
							containerClassName={'pagination'}
							activeClassName={'active'}
							previousClassName={'page-link previous'}
							nextClassName={'page-link next'}
							disabledClassName={'disabled'}
						/> */}
          <ReactPaginate
            breakLabel="..."
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={Math.ceil(convenios.length / itemsPerPage)}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            activeClassName={
              "grid place-items-center bg-primary text-white w-8 h-8"
            }
            previousClassName={"mr-2"}
            nextClassName={"ml-2"}
            disabledClassName={"disabled"}
            pageClassName=" w-8 h-8 grid place-items-center"
            renderOnZeroPageCount={null}
          />
          <section className="text-gray-600 body-font m">
            <div className="container px-2 mx-auto">
              <div className="flex items-center justify-center">
                <div className="p-6 max-w-lg text-center bg-white shadow-2xl rounded-lg border-card-yellow">
                  <h3 className="mb-4 mt-3 text-2xl font-semibold text-gray-900 sm:text-3xl">
                    ¿Propuesta de Convenio?
                  </h3>
                  <p className="mb-5 text-gray-700">
                    Contáctanos a través de nuestro formulario y con gusto
                    responderemos tu solicitud.
                  </p>
                  <div className="flex justify-center">
                    <button
                      onClick={() => {
                        // setShowModal(true);
                        onOpen();
                      }}
                      className="inline-flex items-center justify-center px-5 py-3 text-white bg-colorcito rounded-lg hover:bg-colorcito focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      <FaHandshake className="mr-2 -ml-1 w-5 h-5" />
                      Realizar Propuesta
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent
              as="form"
              onSubmit={handleSubmit(onSubmit)}
              encType="multipart/form-data"
              id="post_form"
            >
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Propuesta de Convenio
                  </ModalHeader>
                  <ModalBody>
                    <section className="grid gap-4 px-2">
                      <ScrollShadow
                        size={1}
                        hideScrollBar
                        className="w-full h-[620px] md:h-[620px]"
                      >
                        {/* Nombres y Apellidos */}
                        <div className="grid gap-4 md:grid-cols-2">
                          {/* Nombres */}
                          <fieldset>
                            <Input
                              errors={errors}
                              required
                              label="Nombres"
                              register={register}
                              name="nombres"
                              placeholder="Juan"
                              className={`w-full text-sm input input-bordered input-ghost text-gray-900`}
                            />
                          </fieldset>
                          {/* Apellidos */}
                          <fieldset>
                            <Input
                              errors={errors}
                              required
                              label="Apellidos"
                              register={register}
                              name="apellidos"
                              placeholder="Pérez"
                              className={`w-full text-sm input input-bordered input-ghost text-gray-900`}
                            />
                          </fieldset>
                        </div>

                        {/* Teléfono*/}
                        <div className="grid gap-4 md:grid-cols-2">
                          <fieldset>
                            <Input
                              errors={errors}
                              required
                              label="Teléfono"
                              register={register}
                              name="telefono"
                              placeholder="0987654321"
                              className={`w-full text-sm input input-bordered input-ghost text-gray-900`}
                            />
                          </fieldset>

                          {/* País */}
                          <fieldset>
                            <label
                              htmlFor="id_pais"
                              // className='inline-block mb-2 text-sm text-indigo-800 sm:text-base'
                              className="block text-sm font-medium text-gray-900"
                            >
                              País
                            </label>
                            <select
                              {...register("id_pais", {
                                required: "Seleccione un país",
                              })}
                              id="id_pais"
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
                            {errors.id_pais && (
                              <p className="mt-1 text-white badge badge-error badge-sm">
                                {errors.id_pais.message}
                              </p>
                            )}
                          </fieldset>


                        </div>
                        {/* Correo */}
                        <fieldset>
                          <Input
                            errors={errors}
                            required
                            label="Email"
                            register={register}
                            name="email"
                            placeholder="juanperez@gmail.com"
                            className={`w-full text-sm input input-bordered input-ghost text-gray-900`}
                          />
                        </fieldset>

                        {/* Tipo de Convenio */}
                        <fieldset>
                          <label
                            htmlFor="id_tipoconvenio"
                            // className='inline-block mb-2 text-sm text-indigo-800 sm:text-base'
                            className="block text-sm font-medium text-gray-900"
                          >
                            Tipo de convenio
                          </label>
                          <select
                            {...register("id_tipoconvenio", {
                              required: "Seleccione una opción",
                            })}
                            id="id_tipoconvenio"
                            className="w-full text-sm text-gray-900 input input-bordered input-ghost"
                          >
                            {/* Agregar opciones para el menú desplegable */}
                            <option value="">Seleccione una opción</option>
                            {tipoconvenios.map((tipoconvenio) => (
                              <option
                                key={tipoconvenio.id}
                                value={tipoconvenio.id}
                              >
                                {tipoconvenio.nombre}
                              </option>
                            ))}
                          </select>

                          {errors.id_tipoconvenio && (
                            <p className="mt-1 text-white badge badge-error badge-sm">
                              {errors.id_tipoconvenio.message}
                            </p>
                          )}
                        </fieldset>

                        {/* Fecha de inicio y fecha de fin */}
                        <div className="grid gap-4 md:grid-cols-2">
                          {/* Fecha de inicio */}
                          <fieldset>
                            <label
                              htmlFor="fecha_inicio"
                              // className='inline-block mb-2 text-sm text-indigo-800 sm:text-base'
                              className="block text-sm font-medium text-gray-900"
                            >
                              Fecha de inicio
                            </label>
                            <input
                              {...register("fecha_inicio", {
                                required: "Seleccione fecha de inicio",
                              })}
                              type="date"
                              id="fecha_inicio"
                              className="w-full text-sm text-gray-900 input input-bordered input-ghost"
                              min={today}
                              onChange={handleFechaInicioChange}
                            />
                            {errors.fecha_inicio && (
                              <p className="mt-1 text-white badge badge-error badge-sm">
                                {errors.fecha_inicio.message}
                              </p>
                            )}
                          </fieldset>
                          {/* Fecha de fin */}
                          <fieldset>
                            <label
                              htmlFor="fecha_fin"
                              // className='inline-block mb-2 text-sm text-indigo-800 sm:text-base'
                              className="block text-sm font-medium text-gray-900"
                            >
                              Fecha de fin
                            </label>
                            <input
                              {...register("fecha_fin", {
                                required: "Seleccione fecha de fin",
                              })}
                              type="date"
                              id="fecha_fin"
                              className="w-full text-sm text-gray-900 input input-bordered input-ghost"
                              min={min}
                              max={max}
                              onChange={handleFechaFinChange}
                            />
                            {errors.fecha_fin && (
                              <p className="mt-1 text-white badge badge-error badge-sm">
                                {errors.fecha_fin.message}
                              </p>
                            )}
                          </fieldset>
                        </div>

                        {/* Nombre de la organización */}
                        <fieldset>
                          <Input
                            errors={errors}
                            required
                            label="Nombre de la Organización"
                            register={register}
                            name="nombreOrganizacion"
                            onInput={handleInput}
                            placeholder="Universidad de Cuenca"
                            className={`w-full text-sm input input-bordered input-ghost text-gray-900`}
                          />
                        </fieldset>

                        {/* Descripción de las actividades de la organización */}
                        <fieldset>
                          <label
                            htmlFor="descripcion"
                            // className='block mb-2 text-sm text-indigo-800 sm:text-base'
                            className="block text-sm font-medium text-gray-900"
                          >
                            Descripción
                          </label>
                          <textarea
                            {...register("descripcion", {
                              required: "Ingrese la descripción",
                            })}
                            id="descripcion"
                            placeholder="La organización se dedica a..."
                            className="w-full text-sm text-gray-900 input input-bordered input-ghost"
                          />
                          {errors.descripcion && (
                            <p className="mt-1 text-white badge badge-error badge-sm">
                              {errors.descripcion.message}
                            </p>
                          )}
                        </fieldset>

                        {/* Documento de propuesta de convenio */}
                        <fieldset className="mb-6">
                          <label
                            htmlFor="propuesta"
                            className="block text-sm font-medium text-gray-900"
                          >
                            Propuesta de Convenio
                          </label>
                          <input
                            name="propuesta"
                            type="file"
                            {...register("propuesta", {
                              required: "El documento es requerido",
                            })}
                            className="w-full file:py-2 file:px-4 file:border-0 file:text-white file:bg-colorcito file:cursor-pointer mb-3
                            hover:file:text-colorcito hover:file:bg-white file-input file-input-bordered"
                          />
                          {errors.propuesta && (
                            <span className="mt-2 text-white badge badge-error badge-sm">
                              {errors.propuesta.message}
                            </span>
                          )}
                        </fieldset>
                      </ScrollShadow>

                      <div className="flex justify-end gap-4 mb-4">
                        <button
                          type="button"
                          className="px-4 py-2 text-red-700 bg-white rounded-lg hover:text-white hover:bg-red-700 hover:shadow-lg hover:shadow-gray-500"
                          onClick={handleCloseModal}
                        >
                          Cerrar
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 text-sm text-white bg-colorcito rounded-lg hover:bg-colorcito hover:shadow-lg hover:shadow-gray-500"

                        >
                          Enviar
                        </button>
                      </div>
                    </section>
                  </ModalBody>

                </>
              )}
            </ModalContent>
          </Modal>
          {/* <div>
              <h2 className='text-indigo-800 font-bold text-2xl'>¿No aparece una oferta que se adapte a tus habilidades?</h2>
              <p>
                Si consideras que eres una persona excepcional en el área en la que desempeñas tus funciones profesionales y quieres ser parte de fundación ANEUPI, no dudes en postular y nosotros nos pondremos en contacto contigo.
              </p>
              <ButtonEnviar
                text="¡Postular!"
                className={"ml-9 mt-5"}
                onClick={() => {
                  setShowModal(true);
                  setValue('id_oficio', null);
                  setValue('is_trabajo', true);
                }}
              />
            </div> */}
          <NotifyWhatsapp
            showNotification={showNotification}
            setShowNotification={setShowNotification}
          />
        </main>

        <article className="max-w-screen-xl py-12 mx-auto md:py-24">
          {/* <ConvenioSection /> */}
        </article>
      </section>

      <MisionVisionSection />

      <section className="p-4">
        <header className="max-w-screen-xl py-12 mx-auto">
          <Subtitle title="Nuestras Marcas Corporativas" />
          <BarraImagenes />
        </header>
      </section>
    </Layout>
  );
};

export default ConvenioPage;
