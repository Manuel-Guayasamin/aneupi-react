import { useEffect } from "react";
import BreadCrumb from "../../components/navigation/BreadCrumb";
import Layout from "../layout";
import AtencionForm from "./AtencionForm";
import { useDispatch, useSelector } from "react-redux";
import ValidationLogin from "../../components/validations/ValidationLogin";
import ValidationPractica from "../../components/validations/ValidationPractica";
import { fetchServicios } from "../../redux/slices/serviciosSlice";
import AttentionImage from "../../assets/attention/AtencionEnLinea.png";
import { FaAngleRight } from "react-icons/fa";
import Carousel from "react-multi-carousel";
import Subtitle from "../../components/ui/Subtitle";
import { ServiceCard } from "../../components/ui/ServiceCard";
import AgendaCita from "../../assets/servicios/Agendar cita .png";
import sadsa from "../../assets/servicios/AtencionEspecializada.png";
import ServicioCLiente from "../../assets/servicios/servicio cliente.png";
import { Link } from "react-router-dom";
import ButtonEnviar from "../../dashboard/components/Buttons/ButtonEnviar";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const breadcrumbLinks = [
  { label: "Inicio", path: "/" },
  { label: "Servicios" },
  { label: "Atención en Línea", path: "/atencion-en-linea" },
];

const AtencionPage = () => {
  const dispatch = useDispatch();
  const { active } = useSelector((state) => state.authentication);
  const servicios = useSelector((state) => state.servicios.servicios);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 900 },
      items: 4,
      slidesToSlide: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };
  useEffect(() => {
    dispatch(fetchServicios());
  }, [dispatch]);

  return (
    <Layout>
      <BreadCrumb links={breadcrumbLinks} title="Atención en Línea" />

      <section className="py-8">
        <div className="py-8 max-w-screen-xl p-2 mx-auto">
          <Subtitle title="Nuestros Servicios de atención en línea" />
        </div>

        {/* <header><h3 className='py-8'>Servicios</h3></header> */}
        <article className="max-w-screen-xl p-10 mx-auto rounded-xl bg-gray-50  md:p-12 border-3 border-[#00335f] space-y-10">
          <main className="grid gap-10 md:grid-cols-3">
            <ServiceCard
              link="/dashboardAtencion/atención%20psicológica"
              imageSrc={AgendaCita}
              title="Agenda tu cita"
              description="Selecciona la fecha y hora, ¡y listo! Te ayudaremos al instante."
            />
            <ServiceCard
              link="/dashboardAtencion/servicios%20de%20pediatría"
              imageSrc={sadsa}
              title="Consultas especializadas"
              description="Descubre nuestra amplia gama de servicios a tu disposición."
            />
            <ServiceCard
              link="/dashboardAtencion/asesoramiento%20del%20derecho"
              imageSrc={ServicioCLiente}
              title="Atención al cliente"
              description="Nuestro equipo de atención al cliente está aquí para ti.
              Contáctanos y obtén la asistencia que necesitas"
            />
            {/* <ServiceCard
              link="/"

              title="Eventos"
              description="Explora y participa en nuestra amplia gama de eventos especializados."
            /> */}
          </main>

          <div className="flex justify-center">
            <Link to="/dashboardAtencion/servicios de la fundación aneupi">
              <Button className="flex items-center px-4 py-2 text-sm font-bold text-white transition duration-300 ease-in-out transform border-2 rounded bg-colorcito hover:bg-white hover:text-blue-900 hover:border-blue-900 hover:scale-105">
                Solicitar servicio
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Button>
            </Link>
          </div>
        </article>
      </section>
    </Layout>
  );
};

export default AtencionPage;
