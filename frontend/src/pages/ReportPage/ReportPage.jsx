import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Image } from "@nextui-org/react";
import Layout from "../layout";
import Subtitle from "../../components/ui/Subtitle";
import { FaBriefcase } from "react-icons/fa";
import { createReporte } from "../../redux/slices/reporteSlice";
import DenunciaForm from "../../layouts/sections/DenunciaForm"; // Import the modal component

//const serverURL = import.meta.env.VITE_API_URL;
export const StudentSelection = [
  {
    label: "Si",
    value: "Si",
    description: "The second most popular pet in the world",
  },
  {
    label: "No",
    value: "No",
    description: "The most popular pet in the world",
  },
];

export default function ReportPage() {

  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const onSubmit = (data) => {

    dispatch(createReporte(data)).then((result) => {

      if (!result.error) {

      }
      setShowModal(false);
      reset();
    });
  };


  const dispatch = useDispatch();

  useEffect(() => {

  }, [dispatch]);
  return (
    <Layout>
      <main className="flex flex-col items-center gap-10 py-8">
        <section className="grid md:grid-cols-2 border-2 border-[#eab308] rounded-xl  md:w-[80%]">
          <article className="flex flex-col items-center justify-center gap-4 px-5 py-5 md:px-10">
            <Subtitle title="¿Cuándo debes DENUNCIAR?"></Subtitle>
            <p className="text-justify">
              Debes reportar un mal comportamiento cuando presencies o
              experimentes acciones de los docentes o de otras personas, que
              violen las normas establecidas de convivencia o ética, ya sea en
              el ámbito universitario, laboral o social, dentro y fuera de las
              universidades. Esto incluye situaciones como el acoso,
              discriminación, violencia, abuso de autoridad, o cualquier otra
              conducta que afecte negativamente a las personas con o sin
              discapacidad o al entorno. Reportar estos incidentes es
              fundamental para mantener un ambiente seguro y respetuoso,
              garantizar que se tomen medidas correctivas y prevenir que tales
              comportamientos se repitan en el futuro.
              <br />
              <br />
              Lograremos una real inclusión dentro de las universidades con tu
              apoyo a favor de la discapacidad!
            </p>
          </article>
          <picture className="flex items-center justify-center mx-auto w-96 h-96 z-[5]">
            <Image
              width={600}
              height={600}
              src="https://firebasestorage.googleapis.com/v0/b/aneupi-a05ed.appspot.com/o/appImages%2FreportImage.jpg?alt=media&token=a9c6b6d7-2018-44b2-8d5e-7f3e76b7ed39"
            />
          </picture>
        </section>

        <section className="text-gray-600 body-font">
          <div className="container px-2 mx-auto">
            <div className="flex items-center justify-center">
              <div className="max-w-lg p-6 text-center bg-white rounded-lg shadow-2xl border-card-yellow">
                <h3 className="mt-3 mb-4 text-2xl font-semibold text-gray-900 sm:text-3xl">
                  ¿Desea Reportar?
                </h3>
                <p className="mb-5 text-gray-700">
                  ¡Nos preocupamos por su Bienestar!
                </p>
                <div className="flex justify-center">
                  <button
                    onClick={() => setShowModal(true)}
                    className="inline-flex items-center justify-center px-5 py-3 text-white rounded-lg bg-colorcito hover:bg-colorcito focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <FaBriefcase className="w-5 h-5 mr-2 -ml-1" />
                    Denunciar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <DenunciaForm
          showModal={showModal}
          setShowModal={setShowModal}
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          reset={reset}
        />

      </main>
    </Layout>
  );
}
