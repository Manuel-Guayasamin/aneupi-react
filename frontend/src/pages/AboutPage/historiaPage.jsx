import Layout from "../layout";
import HenryImage from "../../assets/Henry.jpg";
import { Image, Link } from "@nextui-org/react";
import { ProjectCard } from "./ProjectCard";

export const HistoriaPage = () => {
  const projects = [
    {
      title: "ACADEMIA INTERNACIONAL ANEUPI",
      description:
        " La académia está trabajando para constituir una Universidad Nacional con proyección Internacional y actualmente en la misma viene ofertando cursos académicos, diplomados, seminarios con profesionales expertos",
      href: "https://academia.fundacionaneupi.com/",
    },
    {
      title: "INSTITUCIÓN FINANCIERA ANEUPI",
      description:
        "Actualmente es una Caja de Ahorro y Crédito que viene funcionando con una visión a corto plazo construir una Cooperativa Financiera de Ahorro y Crédito y está agrupado de profesionales y estudiantes con discapacidad, con el fin de cumplir la visión de la fundación de generar empleo y conocimiento.",
      href: "https://www.cooperativafinancieraaneupi.com/afiliate",
    },
    {
      title: "CONSTRUCTORA E INMOVILIARIA LECENI",
      description:
        "Esta constructora nació como un proyecto de estudiantes universitarios con discapacidad dentro de las Universidades, pero, actualmente está constituida legalmente como una compañía limitada y los actuales accionistas son Personas con Discapacidad",
      href: "https://www.constructoraleceni.com/",
    },
    {
      title: "GATITO PLIS",
      description:
        "Es un proyecto de una Red Social que nace con la propuesta de los estudiantes con discapacidad de la Universidad de Cuenca, con la visión de demostrar que las personas con discapacidad también pueden generar tecnología y empleo, actualmente está en desarrollo, que pronto se lanzará y se hará conocer al mundo.",
      href: "https://academia.fundacionaneupi.com/",
    },
    {
      title: "TV ANEUPI",
      description:
        "Es proyecto de un medio digital para promocionar y difundir todos los proyectos que la fundación viene desarrollando a nivel Internacional con el fin de poder transmitir y generar una inclusión real de los estudiantes universitarios con discapacidad, dentro y fuera de las universidades, además, ya cuenta con otros programas a nivel Nacional e Internacional",
      href: "https://academia.fundacionaneupi.com/tv-aneupi",
    },
  ];

  return (
    <Layout>
      <main className="flex flex-col gap-10 p-10">
        <article className="grid md:grid-cols-2 gap-10 md:gap-0">
          <section className=" flex  flex-col gap-5">
            <h3 className="text-[#00335f] font-bold text-4xl">
              HISTORIA DE ANEUPI
            </h3>
            <p className="text-default-600 text-justify">
              ANEUPI surgió como un grupo de estudiantes universitarios con
              discapacidad en la Universidad Técnica de Manabí. Con el tiempo,
              se constituyó una Asociación Nacional de Estudiantes
              Universitarios por la Inclusión (ANEUPI), con el objetivo de
              proteger los derechos de los estudiantes universitarios con
              discapacidad a nivel nacional y promover una educación inclusiva
              de calidad. Posteriormente, se transformó en una Fundación con la
              denominación: Agrupación Nacional de Estudiantes Universitarios -
              Profesionales por la Inclusión (ANEUPI) con proyección
              internacional. La fundación viene trabajando con las Universidades
              y firmando convenios y desarrollando proyectos de investigación
              sobre educación inclusiva en colaboración con instituciones de
              Educación Superior, tanto nacionales como internacionales, con el
              fin de mejorar la dignidad de las Personas con Discapacidad. La
              fundación no lucha por la Inclusión e Inserción laboral, sino por
              cambiar de visión para que las Personas con Discapacidad puedan
              generar empleo y riqueza y que todo sea por méritos, por estas
              razones la fundación viene desarrollando proyectos y encuentros
              académicos, seminarios, congresos a nivel Nacional e Internacional
              para lograr una real inclusión
            </p>
            <p className="text-default-600 text-justify">
              Actualmente, la Fundación ANEUPI ya cuenta con convenios marcos
              con Universidades Nacionales e Internacionales y además está
              desarrollando varios proyectos para reivindicar la visión y los
              derechos de las personas con discapacidad.{" "}
              <Link target="_blank" href="/convenios">
                Para más información
              </Link>
            </p>
          </section>
          <picture className="flex flex-col items-center justify-center ">
            <Image className="w-[90%] mx-auto" src={HenryImage} alt="" />
            <div className="flex flex-col items-center">
              <p className="font-semibold text-[#00335f] ">
                Henry Ricardo Erraez
              </p>
              <p className="text-sm">Presidente de la fundación ANEUPI</p>
            </div>
          </picture>
        </article>
        <article className="md:col-span-2 grid md:grid-cols-5 gap-4">
          <h3 className="md:col-span-5 text-center font-bold text-4xl text-[#00335f] my-5">
            PROYECTOS
          </h3>
          {projects.map((project) => (
            <ProjectCard
              description={project.description}
              href={project.href}
              title={project.title}
            />
          ))}
        </article>
      </main>
    </Layout>
  );
};
