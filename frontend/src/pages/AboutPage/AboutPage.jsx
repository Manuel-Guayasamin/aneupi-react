import { FaArrowRight } from "react-icons/fa6";
import BreadCrumb from "../../components/navigation/BreadCrumb";
import FormSection from "../../layouts/sections/FormSection";
import Layout from "../layout";
import MissionImage from "../../assets/illustrations/about/mission.png";
import VisionImage from "../../assets/illustrations/about/vision.png";
import {
  FaBalanceScale,
  FaBandcamp,
  FaGlobeAmericas,
  FaHandHoldingHeart,
  FaHandsHelping,
  FaHandshake,
  FaHeart,
  FaPeopleCarry,
} from "react-icons/fa";
import SocialSection from "../../layouts/sections/SocialSection";
import ValorCard from "./MissionPage/components/ValorCard";
import MapaSection from "../../layouts/sections/MapaSection";
import Subtitle from "../../components/ui/Subtitle";
const valores = [
  {
    icon: <FaHandshake />,
    title: "Solidaridad",
    description:
      "Estímulo para acciones locales y autonomía de gestión en centros.",
  },
  {
    icon: <FaBalanceScale />,
    title: "Transparencia",
    description: "Cultura de ética y apertura informativa a interesados.",
  },
  {
    icon: <FaBandcamp />,
    title: "Justicia en las Relaciones",
    description:
      "Evitar discriminación, promover cooperación responsable y compartida.",
  },
  {
    icon: <FaPeopleCarry />,
    title: "Independencia",
    description: "Cultura de ética y apertura informativa a interesados.",
  },
  {
    icon: <FaHandHoldingHeart />,
    title: "Compromiso Individual",
    description: "Responsabilidad personal y aceptación de riesgos inherentes.",
  },
  {
    icon: <FaGlobeAmericas />,
    title: "Profesionalización",
    description: "Compromiso con la calidad y eficacia en nuestro trabajo.",
  },
  {
    icon: <FaHeart />,
    title: "Humanidad",
    description: "Derecho de asistencia a todos en tiempos de necesidad.",
  },
  {
    icon: <FaHandsHelping />,
    title: "Proximidad",
    description: "Asistencia directa sin intermediarios.",
  },
  {
    icon: <FaHandshake />,
    title: "Sin Ánimo de Lucro",
    description:
      "Fondos destinados a objetivos sociales, administración y recursos.",
  },
  {
    icon: <FaBalanceScale />,
    title: "Imparcialidad",
    description: "Edición de texto e inclusión de información destacada.",
  },
];

const breadcrumbLinks = [
  { label: "Inicio", path: "/" },
  { label: "Nosotros", path: "/acerca-de-nosotros" },
];

const AboutPage = () => {
  return (
    <Layout>
      <BreadCrumb links={breadcrumbLinks} title="Acerca de Nosotros" />
      {/*
			<section className='p-4'>
				<article className='grid items-center max-w-screen-xl gap-20 py-12 mx-auto md:grid-cols-2 md:pt-24'>
					<img
						controls
						className='w-full h-full'
						src={MissionImage}
						alt='Mission Illustration'
					/>
					<main className='prose-sm text-center md:prose md:max-w-xl md:prose-h2:text-4xl prose-h2:text-indigo-800 prose-h2:text-2xl prose-h2:font-bold md:text-left'>
						<h3>Nuestra Misión</h3>
						<h2>Todos únidos, nos superaremos y venceremos</h2>
						<p>
							Promover, proteger y defender los derechos que históricamente han sido vulnerados para
							mejorar la dignidad de los ciudadanos que poseen una discapacidad mediante políticas,
							proyectos, acciones orientadas en el respeto de los derechos humanos, así como tratados y
							convenios internacionales de DD.HH para poder llegar a ser en un futuro una organización que
							pueda cumplir con todos los proyectos y necesidades adecuadas que genere tanto oportunidades
							como beneficios para todos(as) los miembros de la fundación para poder mejorar la calidad de
							vida y el trato de las instituciones hacia dicho grupo vulnerable.
						</p>
					</main>
				</article>
			</section>
			<section className='p-4'>
				<article className='grid items-center max-w-screen-xl gap-20 py-12 mx-auto md:grid-cols-2 md:py-24'>
					<main className='prose-sm text-center md:prose md:max-w-xl md:prose-h2:text-4xl prose-h2:text-indigo-800 prose-h2:text-2xl prose-h2:font-bold md:text-left'>
						<h3>Nuestra Visión</h3>
						<h2>Generár grandes líderes del mañana, con paciencia e integridad</h2>
						<p>
							Ser una organización reconocida a nivel Nacional e Internacional por la lucha y defensa de
							los derechos humanos que están consagrados en la constitución así como sus leyes, tratados y
							convenios internacionales de los DD.HH de los ciudadanos que poseen una discapacidad sin que
							se origine ningún tipo de discriminación y así genere una convivencia entre todo para un
							buen desarrollo de la sociedad con una cultura de tolerancia, paz y libre de violencia entre
							los miembros y personas que se necesitan apoyo de la fundación ANEUPI.
						</p>
					</main>
					<img
						controls
						className='w-full h-full'
						src={VisionImage}
						alt='Vision illustration'
					/>
				</article>
	</section>
	<SocialSection />*/}
      <section className="w-[92%] mx-auto">
        <article className="">
          <header className="pb-4 md:!pb-14 text-center md:!text-left">
            <Subtitle>Nuestros Valores</Subtitle>
          </header>
          <main className="grid max-w-6xl gap-4 mx-auto md:grid-cols-2 md:gap-10">
            {valores.map((valor) => (
              <ValorCard {...valor} />
            ))}
          </main>
        </article>
      </section>
      {/*<FormSection />
			<MapaSection />*/}
    </Layout>
  );
};
export default AboutPage;
