import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../components/navigation/BreadCrumb";
import NotifyWhatsapp from "../../components/ui/NotifyWhatsapp";
import Subtitle from "../../components/ui/Subtitle";
import { createPostulante } from "../../redux/slices/postulantesSlice";
import { fetchTrabajos } from "../../redux/slices/trabajosSlice";
import Layout from "../layout";
import ApplicationFormModal from "./components/ApplicationForm";
import ReactPaginate from "react-paginate";
import BarraImagenes from "./components/BarraImagenes";
import { getAllPaises } from "../../redux/slices/paisesSlice";
import { fetchModalidades } from "../../redux/slices/modalidadesSlice";
import ButtonEnviar from "../../dashboard/components/Buttons/ButtonEnviar";
import { FaBriefcase } from "react-icons/fa";
import { useDisclosure } from "@nextui-org/react";

const breadcrumbLinks = [
  { label: "Inicio", path: "/" },
  { label: "Trabajos", path: "/ofertas-laborales" },
];

const OfertaPage = () => {
  const dispatch = useDispatch();
  const { trabajos, loading } = useSelector((state) => state.trabajos);
  const paises = useSelector((state) => state.paises.paises);
  const modalidades = useSelector((state) => state.modalidades.modalidades);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);

  useEffect(() => {
    dispatch(fetchTrabajos());
    dispatch(getAllPaises());
    dispatch(fetchModalidades());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm(); // Initialize useForm

  const onSubmit = (data) => {
    dispatch(createPostulante(data)).then((result) => {
      if (!result.error) {
        setShowNotification(true);
      }
      setShowModal(false);
      reset();
    });
  };

  useEffect(() => {
    if (!isOpen) {
      reset(); // Esta función reinicia el formulario y los errores
    }
  }, [isOpen, reset]);

  const [showModal, setShowModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const displayedTrabajos = trabajos.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Layout>
      <BreadCrumb links={breadcrumbLinks} title="Ofertas Laborales" />
      <section className="p-4">
        <article className="max-w-screen-xl py-12 mx-auto md:py-24 min-h-[calc(100vh-2rem)]">
          <Subtitle title="Nuestras Marcas Corporativas" />
          <BarraImagenes />
          <Subtitle title="Listado de Ofertas Laborales" />
          <main className="mt-2 space-y-10 ">
            <div className="w-full overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead className="text-white bg-colorcito">
                  <tr
                    scope="col"
                    className="text-xs font-medium tracking-wider text-left uppercase"
                  >
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
                      Departamento
                    </th>
                    <th
                      scope="col"
                      className="text-xs font-medium tracking-wider text-left uppercase"
                    >
                      Cargo
                    </th>
                    <th
                      scope="col"
                      className="text-xs font-medium tracking-wider text-left uppercase"
                    >
                      Horario
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
                  {!loading &&
                    displayedTrabajos?.length > 0 &&
                    displayedTrabajos?.map((trabajo, index) => (
                      <tr key={trabajo.id} className="text-sm">
                        <th>{indexOfFirstItem + index + 1}</th>
                        <td className="truncate">
                          {trabajo.empresa === "Fundacion ANEUPI" ? (
                            <span className="text-sm text-white bg-colorcito badge px-4 py-3">
                              {trabajo.empresa}
                            </span>
                          ) : trabajo.empresa === "Academia ANEUPI" ? (
                            <span className="text-sm text-white bg-academia badge px-4 py-3">
                              {trabajo.empresa}
                            </span>
                          ) : trabajo.empresa ===
                            "Institución Financiera ANEUPI" ? (
                            <span className="text-sm text-white bg-colorCoop badge px-4 py-3">
                              {trabajo.empresa}
                            </span>
                          ) : (
                            <span className="text-sm text-white bg-colorcitoleceni1 badge px-4 py-3">
                              {trabajo.empresa}
                            </span>
                          )}
                        </td>
                        <td className="text-sm text-gray-500 truncate whitespace-nowrap">
                          {trabajo.departamento}
                        </td>
                        <td className="text-sm text-gray-500 truncate whitespace-nowrap">
                          {trabajo.cargo}
                        </td>
                        <td className="text-sm text-gray-500 truncate whitespace-nowrap">
                          {trabajo.horario}
                        </td>
                        <td>
                          <div className="flex items-center gap-2">
                          <ApplicationFormModal
                          showModal={showModal}
                          setShowModal={setShowModal}
                          handleSubmit={handleSubmit}
                          onSubmit={onSubmit}
                          register={register}
                          errors={errors}
                          paises={paises}
                          empresa={trabajo.empresa}
                          id_oficio={trabajo.id}
                          modalidades={modalidades}
                          reset={reset}
                          setIsSubmitButtonDisabled={setIsSubmitButtonDisabled}
                          isSubmitButtonDisabled={isSubmitButtonDisabled}
                      />
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
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
              pageCount={Math.ceil(trabajos.length / itemsPerPage)}
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
            <h3 className="text-4xl text-[#00335f] font-bold text-center mt-5">
              Si no encuentras una oferta que se adapte a tus habilidades,
              puedes postularte de igual manera aquí:
            </h3>
            <section className="text-gray-600 body-font m">
              <div className="container px-2 mx-auto">
                <div className="flex items-center justify-center">
                  <div className="max-w-lg p-6 text-center bg-white rounded-lg shadow-2xl border-card-yellow">
                    <h3 className="mt-3 mb-4 text-2xl font-semibold text-gray-900 sm:text-3xl">
                      Ofertas Laborales
                    </h3>
                    <p className="mb-5 text-gray-700">
                      ¿Eres una persona excepcional en el área en la que
                      desempeñas tus funciones profesionales? No dudes en enviar
                      tu CV.
                    </p>
                    <div className="flex justify-center">
                      <ApplicationFormModal
                        showModal={showModal}
                        setShowModal={setShowModal}
                        handleSubmit={handleSubmit}
                        onSubmit={onSubmit}
                        register={register}
                        errors={errors}
                        paises={paises}
                        modalidades={modalidades}
                        reset={reset}
                        empresa="Fundacion Aneupi"
                        id_oficio="null"
                        setIsSubmitButtonDisabled={setIsSubmitButtonDisabled}
                        isSubmitButtonDisabled={isSubmitButtonDisabled}
                      />
                      {/* <button
                        onClick={() => {
                          setShowModal(true);
                          setIsSubmitButtonDisabled(false);
                          setValue("id_oficio", null);
                          setValue("is_trabajo", true);
                          setValue("empresa", "Fundacion ANEUPI");
                        }}
                        className="inline-flex items-center justify-center px-5 py-3 text-white rounded-lg bg-colorcito hover:bg-colorcito focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        <FaBriefcase className="w-5 h-5 mr-2 -ml-1" />
                        Postúlate
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* <div>
              <h2 className='text-2xl font-bold text-indigo-800'>¿No aparece una oferta que se adapte a tus habilidades?</h2>
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
          </main>
        </article>
        <NotifyWhatsapp
          showNotification={showNotification}
          setShowNotification={setShowNotification}
        />
      </section>
    </Layout>
  );
};

export default OfertaPage;
