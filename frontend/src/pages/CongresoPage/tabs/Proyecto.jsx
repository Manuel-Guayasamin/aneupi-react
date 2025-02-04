import {
  Image,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Avatar,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import DisabilityImage from "../../../assets/illustrations/undraw_disability.png";
import { days } from "../../../data/constants";
import { formatDate } from "../../../../lib/functions";
import { FiCalendar } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { HiClock } from "react-icons/hi";
import { BsCalendarFill } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { FiChrome } from "react-icons/fi";
import { lazy, Suspense } from "react";
import FormularioSection from "../../EventoPage/sections/FormularioSection";

export const Proyecto = () => {
  const actividades = [
    {
      key: "1",
      title: "Inauguración del III Congreso Internacional",
      date: "2025/10/01",
      description: "En la UPS de Guayaquil-Ecuador",
    },
    {
      key: "2",
      title:
        "En el ámbito de la tecnología accesible a favor de la discapacidad desde la praxis. ",
      date: "2025/10/02",
      description: "",
    },
    {
      key: "3",
      title:
        "En el ámbito de los derechos de las personas con discapacidad para lograr una real inclusión en la educación superior desde la praxis. ",
      date: "2025/10/03",
      description: "",
    },
    {
      key: "4",
      title:
        "En el ámbito de la psicología (educativa, social, clínica, etc.) desde la praxis. ",
      date: "2025/10/04",
      description: "",
    },
    {
      key: "5",
      title:
        "Otro ¿cuál es su propuesta para materializar la educación inclusiva de manera real superior a favor de la discapacidad desde la praxis?",
      date: "2025/10/05",
      description: "",
    },
    {
      key: "6",
      title: "Festival Intercultural para retorno.",
      date: "2025/10/06",
      description: "",
    },
  ];

  const temasClave = [
    "Inclusión en la educación superior",
    "Derechos de los estudiantes con discapacidad",
    "Retos y avances en la educación inclusiva",
    "Prácticas sociales, culturales y educativas relacionadas con la inclusión",
  ];
  const Comite = [
    {
      nombre: "Dra. Andrea Cedeño Ph.D",
      rol: "Coordinadora de Investigación y Desarrollo",
    },
    {
      nombre: "Dra. María José Cedeño Pincay Ph.D",
      rol: "Directora de Relaciones Internacionales",
    },
    {
      nombre: "Henry Ricardo Erráez",
      rol: "Presidente de la Fundación ANEUPI",
    },
    {
      nombre: "Ing. Luis Espinoza Ph.D",
      rol: "Docente Universitario",
    },
    {
      nombre: "Ing. Carlos Cedeño Pérez Ph.D",
      rol: "Director de Proyectos Especiales",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-5">
      <section className="space-y-5">
        <h3 className="text-xl font-semibold text-[#00335f]">
          Planificación III Congreso Internacional
        </h3>
        <p className="text-gray-500">
          ¿Cuál es su ponencia para materializar la educación superior inclusiva
          de manera real a favor de la discapacidad desde la praxis?
        </p>
        <Image
          controls
          className="object-contain w-full h-full"
          src={DisabilityImage}
          alt="Mission Illustration"
        />
        <div className="  flex items-center justify-center">
          <Button
            as="a"
            target="_blank"
            href="https://whatsapp.com/channel/0029Vaf4il905MUazhwZ5M17"
            type="submit"
            variant="solid"
            className=" text-white"
            color="success"
          >
            Contactanos <FaWhatsapp />
          </Button>
        </div>
      </section>

      <section className="space-y-5">
        <Card
          radius="lg"
          className="pr-4  border-2 border-[#00335f]"
          shadow="none"
        >
          <CardHeader className="text-center w-full text-2xl font-bold flex items-center justify-center text-[#00335f]">
            PLANIFICACIÓN DEL III CONGRESO
          </CardHeader>
          <CardBody className="grid grid-cols-10">
            <section className="col-span-2 grid text-lg grid-rows-6 items-center gap-2 justify-center text-default-800">
              {days.map((day, index) => (
                <div className="border-2 border-[#005cab] p-4 rounded-xl">
                  <span className="text-center" key={index}>
                    {day.short}
                  </span>
                </div>
              ))}
            </section>
            <section className="col-span-8 grid grid-rows-6 gap-3">
              {actividades.map((actividad, index) => (
                <article
                  key={index}
                  className="px-4 py-2 border-2 border-[#005cab] bg-gray-100 rounded-xl grid grid-cols-10 gap-4 items-center hover:bg-gray-50 transition-colors"
                >
                  <div className="col-span-1  flex justify-center items-center">
                    <FiCalendar className="text-[#00335f]" size={30} />
                  </div>
                  <div className="col-span-9 flex flex-col">
                    <h3 className="text-sm">{actividad.title}</h3>
                  </div>
                </article>
              ))}
            </section>
          </CardBody>
          <CardFooter>
            <FormularioSection
              fullWidth
              className="col-span-2 text-medium"
              color="primary"
            >
              Susceptible a cambios
            </FormularioSection>
          </CardFooter>
        </Card>
      </section>

      <Card
        shadow="none"
        className="divide-y-2 divide-[#00335f] border-2 border-[#00335f]"
      >
        <CardHeader className=" font-semibold text-[#00335f]">
          Para más información
        </CardHeader>
        <CardBody className="space-y-2 text-sm">
          <p className="flex gap-2 items-center text-gray-500">
            <FaWhatsapp size={18} className="text-[#00335f]" />
            +593983341084
          </p>
          <p className="flex gap-2 items-center text-gray-500">
            <BiLogoGmail size={18} className="text-[#00335f]" />
            fundacionaneupi2020@gmail.com
          </p>
          <p className="flex gap-2 items-center text-gray-500">
            <FiChrome size={18} className="text-[#00335f]" />{" "}
            www.fundacionaneupi.com.ec
          </p>
          <p className="flex gap-2 items-center text-gray-500">
            <IoLocationOutline size={18} className="text-[#00335f]" />
            Matriz central: Susudel-Ecuador
          </p>
        </CardBody>
        <CardFooter className="flex flex-col gap-2">
          <h3 className="font-medium text-[#00335f]">Aclaración</h3>
          <p>
            Su temática debe estar totalmente orientada a la educacion inclusiva
            superior, a la discapacidad y a la praxis para que la comisión
            académica pueda aprobar su ponencia
          </p>
        </CardFooter>
      </Card>
      <div className="grid grid-cols-1  md:grid-cols-2 gap-5 w-full justify-center">
        <Card shadow="none" className="border-2 border-[#00335f]">
          <CardHeader className="flex items-center justify-center">
            <h3 className="text-center text-sm text-[#00335f]">Inicio</h3>
          </CardHeader>
          <CardBody className=" px-6">
            <p className="text-sm font-medium">
              Desde Lunes 17 de noviembre - 2025
            </p>
          </CardBody>
          <CardBody className="border-t-2 border-[#00335f] px-6 space-y-3">
            <div className="grid grid-cols-10 text-sm">
              <HiClock size={18} className="text-gray-400 col-span-1" />
              <p className=" text-gray-500 col-span-3">Matutino:</p>
              <div className="col-span-6 items-center gap-2 flex">
                <span className="text-black ml-3">8:00 AM</span>
              </div>
            </div>
            <div className="grid grid-cols-10 text-sm">
              <HiClock size={18} className="text-gray-400 col-span-1" />
              <p className=" text-gray-500 col-span-3">Vespertino:</p>
              <div className="col-span-6 items-center gap-2 flex">
                <span className="text-black ml-3">12:00 AM</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <BsCalendarFill
                size={15}
                className="text-gray-400 ml-[0.12rem]"
              />
              <p className="text-sm text-gray-500">
                Fecha: <span className="text-black ml-2">Noviembre 17</span>
              </p>{" "}
            </div>
          </CardBody>
        </Card>

        <Card shadow="none" className="border-2 border-[#00335f]">
          <CardHeader className="flex items-center justify-center">
            <h3 className="text-center  text-sm text-[#00335f]">Fin</h3>
          </CardHeader>
          <CardBody className=" px-6">
            <p className="text-sm font-medium">
              Hasta el sabado 22 de noviembre - 2025
            </p>
          </CardBody>
          <CardBody className="border-t-2 border-[#00335f] px-6 space-y-3">
            <div className="grid grid-cols-10 text-sm">
              <HiClock size={18} className="text-gray-400 col-span-1" />
              <p className=" text-gray-500 col-span-3">Matutino:</p>
              <div className="col-span-6 items-center gap-2 flex">
                <p className=" text-gray-500">
                  <span className="text-black">14:00 PM</span>
                </p>
              </div>
            </div>
            <div className="grid grid-cols-10 text-sm">
              <HiClock size={18} className="text-gray-400 col-span-1" />
              <p className=" text-gray-500 col-span-3">Vespertino:</p>
              <div className="col-span-6 items-center gap-2 flex">
                <p className=" text-gray-500">
                  <span className="text-black">18:00 PM</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <BsCalendarFill
                size={15}
                className="text-gray-400 ml-[0.12rem]"
              />
              <p className="text-sm text-gray-500">
                Fecha: <span className="text-black ml-2">Noviembre 22</span>
              </p>{" "}
            </div>
          </CardBody>
        </Card>
      </div>
      <section>
        <Card shadow="none" className=" border-2 border-[#00335f]">
          <CardHeader className="text-center text-[#00335f] font-semibold">
            Descripción
          </CardHeader>
          <CardBody>
            <p className="text-gray-500">
              El III Congreso Internacional "Educación Inclusiva y Discapacidad
              desde la Praxis" se celebrará en Ecuador del 22 al 26 de noviembre
              de 2025. Este evento reunirá a expertos internacionales para
              intercambiar conocimientos sobre discapacidad, inclusión y
              diversidad. Los objetivos incluyen identificar retos, fortalecer
              el liderazgo, compartir prácticas inclusivas y discutir políticas
              relacionadas con la discapacidad. Durante una semana, se
              realizarán jornadas de ocho horas con exposiciones, debates,
              intercambios culturales y actividades de ocio, enfocándose en la
              interculturalidad y el reconocimiento de la diversidad humana.
            </p>
          </CardBody>
        </Card>
      </section>

      <section>
        <Card shadow="none" className=" border-2 border-[#00335f]">
          <CardHeader className="text-center text-[#00335f] font-semibold">
            Objetivo
          </CardHeader>
          <CardBody>
            <p className="text-gray-500">
              El III Congreso Internacional busca promover la inclusión social
              de estudiantes universitarios y personas con discapacidad,
              enfocándose en la educación superior inclusiva y una vida digna.
              Se pretende eliminar la discriminación mediante el diálogo entre
              líderes mundiales sobre retos y avances en sus países. Los
              objetivos incluyen implementar una educación superior
              verdaderamente inclusiva, identificar necesidades pedagógicas y de
              flexibilidad curricular, documentar experiencias exitosas, mapear
              necesidades en diseños inclusivos y tecnología, y debatir sobre la
              naturaleza de la discapacidad y el uso del término. También se
              busca discutir si las personas con discapacidad deben ser
              consideradas vulnerables y cómo abordar el término "discapacidad"
              de manera positiva para prevenir la violencia contra este grupo.
            </p>
          </CardBody>
        </Card>
      </section>
      <section className="md:col-span-2 flex flex-col gap-5 my-8">
        <h3 className="text-center text-3xl font-semibold text-[#00335f]">
          Temas clave:
        </h3>
        <div className="flex items-center justify-around flex-wrap gap-3">
          {temasClave.map((tema, index) => (
            <Button
              disabled
              color={index % 2 === 0 ? "primary" : "warning"}
              variant="flat"
              key={index}
            >
              {tema}
            </Button>
          ))}
        </div>
      </section>
      <section className="md:col-span-2 bg-[#00335f] rounded-2xl flex flex-col items-center justify-center gap-10 py-10">
        <h3 className="text-white text-2xl md:text-4xl  text-center font-semibold">
          {" "}
          Comité organizador del III Congreso Educación inclusiva y discapacidad
        </h3>
        <Button color="warning">Contáctalos</Button>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 w-full">
          {Comite.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-5 p-2">
              <Avatar
                isBordered
                color="primary"
                className="w-24 h-24 md:w-44 md:h-44"
              />
              <div>
                <p className="text-lg text-center text-white font-semibold">
                  {item.nombre}
                </p>
                <p className="text-gray-300/80 text-sm text-center">
                  {item.rol}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
