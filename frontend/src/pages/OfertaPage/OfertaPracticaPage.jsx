import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../components/navigation/BreadCrumb";
import NotifyWhatsapp from "../../components/ui/NotifyWhatsapp";
import Subtitle from "../../components/ui/Subtitle";
import { createPostulante } from "../../redux/slices/postulantesSlice";
import { fetchPracticas } from "../../redux/slices/practicaSlice";
import Layout from "../layout";
import ReactPaginate from "react-paginate";
import ApplicationFormModale from "./components/ApplicationForma";
import { fetchModalidades } from "../../redux/slices/modalidadesSlice";
import BarraImagenes from "./components/BarraImagenes";
import { getAllPaises } from "../../redux/slices/paisesSlice";
import ActionButton from "../../dashboard/components/Buttons/ActionButton";
import { FaBriefcase } from "react-icons/fa";
import ModalRegistroExterno from "../../admin_pages/PostulanteExterno/ModalRegistroExterno";
import SolicitarPracticasForm from "./components/SolicitarPracticasForm";
import { createSolicitudPractica } from "../../redux/slices/solicitarPracticasSlice";
import PracticasApplicationForm  from "./components/PracticasApplicationForm";

const breadcrumbLinks = [
  { label: "Inicio", path: "/" },
  { label: "Practicas", path: "/ofertas-practicas" },
];

const OfertaPracticaPage = () => {
  const dispatch = useDispatch();
  const { practicas, loading } = useSelector((state) => state.practicas);
  const paises = useSelector((state) => state.paises.paises);
  const modalidades = useSelector((state) => state.modalidades.modalidades);

  useEffect(() => {
    dispatch(fetchPracticas());
    dispatch(fetchModalidades());
    dispatch(getAllPaises());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    values,
  } = useForm(); // Initialize useForm

  const onSubmit = (data) => {
    dispatch(createPostulante(data)).then(() => {
      setShowModal(false);
      setShowNotification(true);
      reset();
    });
  };

  const [showRegistroModal, setShowRegistroModal] = useState(false);
  const [tipoPracticaSeleccionada, setTipoPracticaSeleccionada] = useState("");
  const [modalidadSeleccionada, setModalidadSeleccionada] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleResetPage = () => {
    window.location.reload();
  };
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Filtra las prácticas según los criterios de búsqueda
  const filteredPracticas = practicas.filter(
    (practica) =>
      (tipoPracticaSeleccionada === "" ||
        practica.tipo_practica === tipoPracticaSeleccionada) &&
      (modalidadSeleccionada === "" ||
        practica.Modalidad.nombre === modalidadSeleccionada)
  );

  // Calcula el número total de páginas
  const pageCount = Math.ceil(filteredPracticas.length / itemsPerPage);

  // Obtiene las prácticas para la página actual
  const displayedPracticas = filteredPracticas.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const openRegistroModal = () => {
    setShowRegistroModal(true);
  };

  const closeRegistroModal = () => {
    setShowRegistroModal(false);
  };
  const handleTipoPracticaChange = (event) => {
    setTipoPracticaSeleccionada(event.target.value);
  };

  const handleModalidadChange = (event) => {
    setModalidadSeleccionada(event.target.value);
  };

  const [showSolicitudModal, setShowSolicitudModal] = useState(false);

  const openSolicitudModal = () => {
    setShowSolicitudModal(true);
  };

  const closeSolicitudModal = () => {
    setShowSolicitudModal(false);
  };

  const solicitudSubmit = (data) => {
    console.log(data);
    data.id_modalidad = data.modalidad;
    data.tipo_practica = data.practica;
    dispatch(createSolicitudPractica(data)).then((result) => {
      if (!result.error) {
        setShowNotification(true);
      }
      setShowSolicitudModal(false);
      reset();
    });
  };

  return (
    <Layout>
      <SolicitarPracticasForm
        showModal={showSolicitudModal}
        setShowModal={setShowSolicitudModal}
        handleSubmit={handleSubmit}
        onSubmit={solicitudSubmit}
        register={register}
        paises={paises}
        modalidades={modalidades}
        errors={errors}
        reset={reset}
      />
      <BreadCrumb links={breadcrumbLinks} title="Ofertas Practicas" />
      <section className="p-4">
        <article className="max-w-screen-xl py-2 mx-auto md:py-4 min-h-[calc(100vh-2rem)]">
          <Subtitle title="Listado de Ofertas de Practicas" />
          <BarraImagenes />

          <main className="mt-10 space-y-10 ">
            {/* Header */}
            <header className="flex flex-wrap items-center justify-center gap-2 md:gap-4 md:justify-start">
              {/* Tipo de Práctica */}
              <label
                className="w-full max-w-xs form-control"
                htmlFor="tipo_practica"
              >
                <div className="label ps-0">
                  <span className="label-text ms-0">Tipo de Práctica</span>
                </div>
                <select
                  {...register("tipo_practica")}
                  className="font-normal select select-bordered"
                  value={tipoPracticaSeleccionada}
                  onChange={handleTipoPracticaChange}
                >
                  <option value="">Todos</option>
                  <option value="Pasantias">Pasantias</option>
                  <option value="Comunitarias">Comunitarias</option>
                  <option value="Pre-Profesionales">Pre-Profesionales</option>
                  <option value="Master">Master</option>
                </select>
              </label>
              {/* Modalidad */}
              <label
                className="w-full max-w-xs form-control"
                htmlFor="id_modalidad"
              >
                <div className="label ps-0">
                  <span className="label-text ms-0">Modalidad</span>
                </div>
                <select
                  {...register("id_modalidad")}
                  className="font-normal select select-bordered"
                  value={modalidadSeleccionada}
                  onChange={handleModalidadChange}
                >
                  <option value="">Todos</option>
                  {modalidades.map((modalidad) => (
                    <>
                      <option key={modalidad.id} value={modalidad.nombre}>
                        {modalidad.nombre}
                      </option>
                    </>
                  ))}
                </select>
              </label>
              <label className="form-control" htmlFor="">
                <div className="hidden label ps-0 md:flex">
                  <span className="text-white label-text ms-0">Limpiar</span>
                </div>
                {/* Botón para Resetear */}
                {/*<button
                    type="button"
                    className="block text-black btn btn-warning"
                    onClick={handleResetPage}
                  >
                    Resetear
                  </button>*/}
              </label>
            </header>

            {/* Tabla de Practicas */}
            <div className="w-full overflow-x-auto">
              <table className="table">
                {/* Cabecera de la tabla */}
                <thead className="text-white bg-colorcito">
                  <tr>
                    <th
                      scope="col"
                      className="text-xs font-medium tracking-wider text-left uppercase"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="text-xs font-medium tracking-wider text-left uppercase"
                    >
                      Empresa
                    </th>
                    <th
                      scope="col"
                      className="text-xs font-medium tracking-wider text-left uppercase"
                    >
                      Carrera
                    </th>
                    <th
                      scope="col"
                      className="text-xs font-medium tracking-wider text-left uppercase"
                    >
                      Tipo de Practica
                    </th>
                    <th
                      scope="col"
                      className="text-xs font-medium tracking-wider text-left uppercase"
                    >
                      Total de Horas
                    </th>
                    <th
                      scope="col"
                      className="text-xs font-medium tracking-wider text-left uppercase"
                    >
                      Horarios
                    </th>
                    <th
                      scope="col"
                      className="text-xs font-medium tracking-wider text-left uppercase"
                    >
                      Fecha de Inicio
                    </th>
                    <th
                      scope="col"
                      className="text-xs font-medium tracking-wider text-left uppercase"
                    >
                      Modalidad
                    </th>
                    <th
                      scope="col"
                      className="text-xs font-medium tracking-wider text-left uppercase"
                    >
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* Mapeo de las practicas */}
                  {!loading &&
                    displayedPracticas?.length > 0 &&
                    displayedPracticas?.map((practica, index) => (
                      <tr key={practica.id} className="text-sm">
                        <th>{indexOfFirstItem + index + 1}</th>
                        {/* Otras columnas */}
                        <td className="truncate">
                          {practica.empresa === "Fundacion ANEUPI" ? (
                            <span className="text-sm text-white bg-colorcito badge px-4 py-3">
                              {practica.empresa}
                            </span>
                          )
                            : practica.empresa === "Academia ANEUPI" ? (
                              <span className="text-sm text-white bg-academia badge px-4 py-3">
                                {practica.empresa}
                              </span>)
                              : practica.empresa === "Institución Financiera ANEUPI" ? (
                                <span className="text-sm text-white bg-colorCoop badge px-4 py-3">
                                  {practica.empresa}
                                </span>)
                                : (
                                  <span className="text-sm text-white bg-colorcitoleceni1 badge px-4 py-3">
                                    {practica.empresa}
                                  </span>
                                )}
                        </td>
                        <td className="text-sm text-gray-500 truncate whitespace-nowrap">
                          {practica.carrera}
                        </td>
                        <td className="text-sm text-gray-500 truncate whitespace-nowrap">
                          {practica.tipo_practica}
                        </td>
                        <td className="text-sm text-gray-500 truncate whitespace-nowrap">
                          {practica.total_horas}
                        </td>
                        <td className="text-sm text-gray-500 truncate whitespace-nowrap">
                          {practica.horario}
                        </td>
                        <td className="text-sm text-gray-500 truncate whitespace-nowrap">
                          {new Date(practica.fecha_inicio).toLocaleDateString("es-ES")}
                        </td>
                        <td className="truncate" value={practica.Modalidad.id}>
                          {practica.Modalidad.nombre}
                        </td>
                        <td>   
                          <div className="flex items-center gap-2">
                          <PracticasApplicationForm
                           showModal={showModal}
                           setShowModal={setShowModal}
                           handleSubmit={handleSubmit}
                           onSubmit={onSubmit}
                           register={register}
                           errors={errors}
                           paises={paises}
                           modalidades={modalidades}
                           reset={reset}
                           practica_id={practica.id}
                           is_trabajo={false}
                           fechaInicio ={practica.fecha_inicio}
                           fechaFin = {practica.fecha_fin}
                           carrera={practica.carrera}
                           empresa={practica.empresa}
                           modalidad={practica.modalidad}
                           total_horas={practica.total_horas}
                           tipo_practica={practica.tipo_practica}
                           setIsSubmitButtonDisabled={setIsSubmitButtonDisabled}
                           isSubmitButtonDisabled={isSubmitButtonDisabled}
                          />
                          {/*
                            <button
                              onClick={() => {
                                console.log(practica);
                                openSolicitudModal(true);
                                setValue("practica_id", practica.id);
                                setValue("is_trabajo", false);
                                setValue("carrera", practica.carrera);
                                setValue("modalidad", practica.Modalidad.id);
                                setValue("total_horas", practica.total_horas);
                                setValue("practica", practica.tipo_practica);

                                const fechaInicio = practica.fecha_inicio ? new Date(practica.fecha_inicio).toISOString().split('T')[0] : "";
                                setValue("fecha_inicio", fechaInicio);

                                const fechaFin = practica.fecha_fin ? new Date(practica.fecha_fin).toISOString().split('T')[0] : "";
                                setValue("fecha_fin", fechaFin);

                                setValue("empresa", practica.empresa);
                              }}
                              className="m-0 text-white btn btn-success btn-xs"
                            >
                              Postúlate
                              <FaArrowRightFromBracket />
                            </button>
                            */}
                          </div>
                        </td>

                      </tr>
                    ))}
                </tbody>
              </table>
              {/* Formulario de Aplicación */}
              {showModal && (
                <ApplicationFormModale
                  showModal={showModal}
                  setShowModal={setShowModal}
                  handleSubmit={handleSubmit}
                  onSubmit={onSubmit}
                  register={register}
                  errors={errors}
                />
              )}
            </div>
            {/* Paginación */}
            <ReactPaginate
              breakLabel="..."
              previousLabel={"<"}
              nextLabel={">"}
              pageCount={pageCount}
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

            <section className="text-gray-600 body-font">
              <div className="container px-2 mx-auto">
                <div className="flex items-center justify-center">
                  <div className="max-w-lg p-6 text-center bg-white rounded-lg shadow-2xl border-card-yellow">
                    <h3 className="mt-3 mb-4 text-2xl font-semibold text-gray-900 sm:text-3xl">
                      ¿Deseas hacer tus prácticas aquí?
                    </h3>
                    <p className="mb-5 text-gray-700">
                      ¡Adquiere conocimiento y experiencia valiosa en tu área!
                    </p>
                    <div className="flex justify-center">
                    <PracticasApplicationForm
                           showModal={showModal}
                           setShowModal={setShowModal}
                           handleSubmit={handleSubmit}
                           onSubmit={onSubmit}
                           register={register}
                           errors={errors}
                           paises={paises}
                           modalidades={modalidades}
                           reset={reset}
                           practica_id={null}
                           is_trabajo={false}
                           empresa={"Fundacion ANEUPI"}
                           setIsSubmitButtonDisabled={setIsSubmitButtonDisabled}
                           isSubmitButtonDisabled={isSubmitButtonDisabled}
                          />
                          {/* 
                      <button
                        onClick={() => {
                          openSolicitudModal(true);
                          setValue("is_trabajo", false);
                          setValue("practica_id", null);
                          setValue("empresa", "Fundacion ANEUPI");
                        }}
                        className="inline-flex items-center justify-center px-5 py-3 text-white rounded-lg bg-colorcito hover:bg-colorcito focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        <FaBriefcase className="w-5 h-5 mr-2 -ml-1" />
                        Postúlate
                      </button>
                      */}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Notificación de WhatsApp */}
            <NotifyWhatsapp
              showNotification={showNotification}
              setShowNotification={setShowNotification}
            />
          </main>
        </article>
      </section>
    </Layout>
  );
};

export default OfertaPracticaPage;