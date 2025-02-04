import React from "react";
import Layout from "../../layout";
import MissionImage from "../../../assets/illustrations/about/MisionConvenio.png";
import VisionImage from "../../../assets/illustrations/about/VisionConvenio.png";

const MisionVisionSection = () => {
  return (
    <div className="flex flex-col items-center">
      {/* <section className='p-2'> */}
      <section className="max-w-screen-xl p-10 mx-2 rounded-xl bg-gradient-to-tr bg-colorcito">
        <article className="grid items-center max-w-screen-xl gap-20 py-12 mx-auto md:grid-cols-2 md:py-5">
          <img
            controls
            // className='w-full h-full'
            className="transition duration-300 transform scale-75 hover:scale-105"
            src={MissionImage}
            alt="Mission Illustration"
          />
          <main className="prose-sm text-center md:prose md:max-w-xl md:prose-h2:text-4xl prose-h2:text-white prose-h2:text-2xl prose-h2:font-bold md:text-left">
            <h3 className="!text-white">Misión</h3>
            <h2>Alianzas y oportunidades</h2>
            {/* <p>
                            Nos dedicamos a establecer alianzas estratégicas con universidades y colaboradores,
                            con el objetivo de ampliar las oportunidades educativas para todos. Nuestro enfoque se centra en la organización de eventos académicos,
                            la facilitación de empleos y prácticas preprofesionales que complementan la formación académica, y la promoción de donaciones para apoyar estos esfuerzos.
                            Nuestra misión es garantizar que cada individuo tenga acceso a las oportunidades educativas que merece, independientemente de sus circunstancias personales.
						</p> */}
            <p className="text-white">
              Nos dedicamos a establecer alianzas estratégicas con las
              Instituciones de Educación Superior y otras instituciones, con el
              objetivo de realizar varios proyectos principalmente la
              investigación para ampliar los conocimientos académicos y
              científicos a favor de la Educación Inclusiva a favor de la
              discapacidad.
            </p>
          </main>
        </article>
      </section>

      {/* <section className='p-2'> */}
      <section className="max-w-screen-xl p-10 mx-2 mt-14 rounded-xl bg-gradient-to-tr bg-colorcito">
        <article className="grid items-center max-w-screen-xl gap-20 py-12 mx-auto md:grid-cols-2 md:py-5">
          <main className="prose-sm text-center md:prose md:max-w-xl md:prose-h2:text-4xl prose-h2:text-white prose-h2:text-2xl prose-h2:font-bold md:text-left">
            <h3 className="!text-white">Visión</h3>
            <h2>Reconocimiento y transformación hacia el Futuro</h2>
            {/* <p>
                            Aspiramos a ser reconocidos a nivel nacional e internacional como el puente entre las universidades, los colaboradores y aquellos que buscan superar barreras
                            en su camino hacia la educación. A través de nuestras alianzas, esperamos transformar el panorama educativo, fomentando una cultura de inclusión y equidad. En un futuro,
                            nos vemos como un catalizador de cambio, donde nuestras alianzas estratégicas han permitido a innumerables individuos alcanzar sus metas académicas y personales.
						</p> */}
            <p className="text-white">
              Trabajamos permanentemente en la materialización de los convenios
              con las Instituciones de Educación Superior para lograr todos los
              objetivos académicos y científicos a un corto plazo y así ser
              referentes a nivel nacional e internacional sobre la Educación
              Inclusiva dentro y fuera de las universidades a favor de la
              discapacidad.
            </p>
          </main>
          <img
            controls
            // className='w-full h-full'
            className="transition duration-300 transform scale-75 hover:scale-105"
            src={VisionImage}
            alt="Vision illustration"
          />
        </article>
      </section>
    </div>
  );
};
export default MisionVisionSection;
