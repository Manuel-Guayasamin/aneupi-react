import {
  FaFacebook,
  FaXTwitter,
  FaInstagram,
  FaWhatsapp,
  FaBook,
  FaCertificate,
  FaBookOpen,
} from "react-icons/fa6";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../App.css";
import DotsBackground from "../../assets/background/dots.png";
import HeroImages from "../../assets/congreso/reunion.jpg";
import Ponente1 from "../../assets/SimposioImages/ponente1.jpg";
import Ponente2 from "../../assets/SimposioImages/ponente2.jpg";
import Simposio from "../../assets/SimposioImages/simpobalsas.jpg";
import { Link } from "react-router-dom";

import { useState } from "react";
import Carrusel from "../../layouts/sections/Carrusel";
import Carrusel2 from "../../layouts/sections/CarruselAcaLec";
import SocialSection from "../../layouts/sections/SocialSection";
import Layout from "../layout";
import "swiper/css/bundle";
import CongresoOne from "../../assets/images/congreso/congreso_0001.jpg";
import CongresoTwo from "../../assets/images/congreso/congreso_0002.jpg";
import PromocionalThree from "../../assets/videos/promocional_0003.mp4";
import PromocionalFourth from "../../assets/videos/promocional_0004.mp4";
import VideoOne from "../../assets/videos/video_0001.mp4";
import { ServiceCard } from "../../components/ui/ServiceCard";
import Subtitle from "../../components/ui/Subtitle";
import ServiceEmpleo from "../../assets/eventos/Empleo.png";
import ServiceEvento from "../../assets/eventos/Evento.png";
import ServiceDonaciones from "../../assets/eventos/Donaciones.png";
import ServicePracticas from "../../assets/eventos/Practicas.png";
import IrvingImage from "../../assets/estudiantes/irving.png";
import KevinImage from "../../assets/estudiantes/kevin.png";
import UG from "../../assets/estudiantes/logoUniversidades/ug.png";
import UTM from "../../assets/estudiantes/logoUniversidades/utm.png";
import COOPERATIVA from "../../assets/brand/Cooperativa.png";
import { GoArrowUpRight } from "react-icons/go";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Image,
  Button,
} from "@nextui-org/react";
import cursoIngles from "../../assets/cursoinglesaneupi.jpg";
import cursoKichwa from "../../assets/kichwa.webp";
import cursoFrances from "../../assets/frances.webp";

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

const HomePage = () => {
  const [mainVideo, setMainVideo] = useState(VideoOne);
  const [isOpen, setIsOpen] = useState(true);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <Layout>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpen}
        onClose={onClose}
        size="3xl"
      >
        <ModalContent className="border-3 border-[#00335f]">
          <ModalHeader className="flex flex-col items-center">
            <Image className="animate-pulse" width={150} src={COOPERATIVA} />
          </ModalHeader>
          <ModalBody className="space-y-5">
            <h3 className="text-2xl text-[#00335f] text-center font-semibold">
              ¿Deseas estudiar el Inglés y otros idiomas a nivel Internacional
              en la Academia ANEUPI?
            </h3>
            <p className="text-center">
              No te preocupes, que la ANEUPI está otorgando Becas para que
              puedas cumplir con tus objetivos y tener éxitos a nivel
              Internacional.{" "}
            </p>
            <p className="font-semibold text-center">
              Visita nuestro Sitio Web para que puedas postular.
            </p>
          </ModalBody>
          <ModalFooter className="flex items-center justify-center">
            <Button
              as={Link}
              color="warning"
              target="_blank"
              to="https://www.cooperativafinancieraaneupi.com"
              endContent={<GoArrowUpRight />}
              size="lg"
            >
              Postúlate ahora
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <section className=" flex  justify-center items-center">
        <Swiper
          spaceBetween={0}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          loop
          className=""
          modules={[Autoplay, Pagination, Navigation]}
        >
          <SwiperSlide>
            <article className="flex flex-col md:flex-row items-center justify-between w-full py-16 md:py-10 gap-10 md:gap-0 md:px-32">
              {/* <img
                    style={{ objectPosition: "62%" }}
                    className="min-h-[33rem] md:h-screen object-cover"
                    src={UTMImage}
                    alt=""
                  /> */}

              <section className="flex flex-col justify-center items-center  border-3 border-warning rounded-xl divide-y-2 divide-warning space-y-4 bg-[#00335f] py-4">
                <picture className=" rounded-full overflow-hidden h-80 w-80 p-2">
                  <Image
                    removeWrapper
                    className="object-cover object-top"
                    src={IrvingImage}
                  />
                </picture>
                <div className="flex flex-col items-center justify-center text-center">
                  <h4 className="text-2xl text-white font-bold mt-4">
                    Irving Pincay Reyes
                  </h4>
                  <p className="text-white  font-medium">
                    Carrera de Sistemas de Información de la
                  </p>
                  <p className="text-white  font-medium">
                    Universidad Técnica de Manabí
                  </p>
                  <Image
                    width={80}
                    height={80}
                    src={UTM}
                    className="hidden md:block mt-2"
                  />
                </div>
              </section>

              <section className="order-first md:order-none w-full flex flex-col justify-center items-center ">
                <h3 className="w-3/4 mb-5  text-center text-3xl font-extrabold  uppercase md:text-5xl text-[#00335f]">
                  ANEUPI entrega un reconocimiento
                </h3>
                <div className="flex flex-col items-center justify-center w-3/4 text-center">
                  <span className="font-medium md:text-lg text-[#00335f]  ">
                    A destacados estudiantes por sus méritos en sus
                  </span>
                  <span className="font-medium  md:text-lg text-[#00335f]">
                    {" "}
                    prácticas preprofesionales
                  </span>
                </div>
                <Button
                  as="a"
                  href="https://api.whatsapp.com/send?phone=593983341084"
                  target="_blank"
                  variant="bordered"
                  color="success"
                  size="lg"
                  className="mt-10 md:mt-5"
                >
                  Contáctanos
                  <FaWhatsapp className="text-3xl" />
                </Button>
              </section>

              <section className="flex flex-col justify-center items-center  border-3 border-warning rounded-xl divide-y-2 divide-warning space-y-4 bg-[#00335f] py-4">
                <picture className=" rounded-full overflow-hidden h-80 w-80">
                  <Image className="w-80 " src={KevinImage} />
                </picture>

                <div className="flex flex-col justify-center items-center text-center">
                  <h4 className="text-2xl text-white font-bold mt-4">
                    Kevin Taffur Limones
                  </h4>
                  <p className="text-white  font-medium">
                    Carrera de Ingeniería de software de la
                  </p>
                  <p className="text-white  font-medium">
                    Universidad de Guayaquil
                  </p>
                  <Image width={100} height={100} src={UG} className="mt-2" />
                </div>
              </section>
            </article>
          </SwiperSlide>
          <SwiperSlide className="relative flex items-center justify-center w-full h-full bg-[#00335f] rounded-b-2xl">
            <main className="flex flex-col items-center justify-between  h-full w-full  text-center px-10">
              <p className="text-xl font-semibold uppercase text-cyan-300 md:text-2xl text-center ">
                ¡Súmate a estos Proyectos!
              </p>
              <h2 className="w-3/4 mb-5 text-4xl font-black text-white uppercase md:text-6xl text-center">
                Cooperativa Financiera y Academia ANEUPI
              </h2>
              <div className="flex flex-col justify-between w-full gap-10 md:flex-row mx-auto">
                <video
                  src={PromocionalFourth}
                  className="object-cover w-full h-60 md:h-[24rem] rounded-xl shadow-lg shadow-white/25"
                  controls
                  autoPlay
                  muted
                ></video>
              </div>

              <div className="flex md:hidden flex-col justify-between w-full   gap-10  md:gap-16 my-6 md:flex-row mx-auto">
                <Image
                  className="h-96 md:h-[35rem]"
                  removeWrapper
                  src={cursoIngles}
                ></Image>
              </div>

              <a
                href="https://api.whatsapp.com/send?phone=593983341084"
                target="_blank"
                className=" text-white bg-green-500 border-transparent btn btn-neutral md:btn-lg rounded-xl my-6"
              >
                Contáctanos
                <FaWhatsapp className="text-3xl" />
              </a>
            </main>
          </SwiperSlide>
        </Swiper>
      </section>
      <div className="w-full border border-[#00335f]"></div>
      <section>
        <article className="max-w-screen-xl  mx-auto md:py-8 px-4">
          <Subtitle title="Nuestros Servicios" />
          <main className="grid gap-10 pt-10 md:grid-cols-4">
            <ServiceCard
              link="/eventos"
              imageSrc={ServiceEvento}
              title="Eventos"
              description="Explora y participa en nuestra amplia gama de eventos especializados."
            />
            <ServiceCard
              link="/ofertas-laborales"
              imageSrc={ServiceEmpleo}
              title="Empleos"
              description="Descubre oportunidades laborales relevantes y desafiantes en tu campo de interés."
            />
            <ServiceCard
              link="/ofertas-practicas"
              imageSrc={ServicePracticas}
              title="Prácticas"
              description="Accede a oportunidades de prácticas que complementarán tu formación académica y profesional."
            />
            <ServiceCard
              link="/donaciones"
              imageSrc={ServiceDonaciones}
              title="Donaciones"
              description="Contribuye al crecimiento continuo de nuestra comunidad mediante donaciones solidarias."
            />
          </main>
        </article>
      </section>

      {/* Promovemos Soluciones Integrales para la Comunidad Universitaria */}
      <section className="p-4">
        <article className="max-w-screen-xl p-10 mx-auto rounded-xl bg-[#00335f] md:p-24">
          <main className="grid gap-10 md:grid-cols-2">
            <picture className="relative flex items-center justify-end w-full h-96">
              <img
                src={CongresoTwo}
                alt=""
                className="relative z-[7] object-cover w-40 mt-auto rounded-md sm:w-72 h-60 sm:h-80"
              />
              <img
                src={CongresoOne}
                alt=""
                className="absolute top-0 left-0 z-[5] object-cover w-40 rounded-md sm:w-72 h-60 sm:h-80"
              />
              <img
                src={DotsBackground}
                alt=""
                className="absolute z-0 object-cover w-full h-full rounded-md "
              />
            </picture>
            <div className="flex flex-col justify-center h-full prose-sm prose text-white sm:prose-base prose-h3:text-2xl sm:prose-h3:text-4xl">
              <h3 className="text-white">
                Promovemos Soluciones Integrales para la Comunidad Universitaria
              </h3>
              <p>
                Nos comprometemos a ofrecer estrategias inclusivas y
                colaborativas para garantizar una participación activa y
                equitativa de todos los miembros de la comunidad universitaria.
                Trabajamos hacia una nueva normalidad que reconozca y valore la
                diversidad, proporcionando soluciones adaptadas a las
                necesidades de cada individuo.
              </p>
              <a
                href="https://chat.whatsapp.com/BuQIHzyLKJP43PoHpgdZ5L"
                target="_blank"
                className="mt-2 text-white no-underline bg-green-500 border-transparent rounded-lg btn btn-neutral w-max"
              >
                Contáctanos
                <FaWhatsapp className="text-2xl" />
              </a>
            </div>
          </main>
        </article>
      </section>
      {/* Section del carrusel */}

      <Carrusel />

      {/* Sectión de Tv Aneupi */}
      <section className="p-6 py-10 mt-6 bg-gradient-to-tr from-colorcito to-blue-900">
        <article className="max-w-screen-xl p-6 py-12 mx-auto bg-transparent rounded-xl">
          <div className="flex flex-col lg:flex-row">
            <div className="relative w-full mb-8 lg:w-8/12 lg:mb-0">
              <div className="relative h-56 overflow-hidden bg-gray-800 border-4 border-black rounded-md lg:h-96">
                <video
                  src={mainVideo}
                  className="object-cover w-full h-full"
                  controls
                  muted
                ></video>
                <div className="absolute px-2 py-1 text-xs text-white transform -translate-x-1/2 bg-red-500 rounded bottom-2 left-1/2">
                  En Vivo
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center w-full lg:w-4/12 lg:ml-6">
              <h2 className="mb-6 text-4xl font-bold text-center text-white">
                TV ANEUPI
              </h2>
              <hr className="mb-6 border-white" />
              <div className="text-center">
                <p className="text-white">Más información en:</p>
                <a
                  href="https://academia.fundacionaneupi.com/tv-aneupi"
                  target="_blank"
                  className="w-full py-2 mt-4 text-white no-underline bg-yellow-500 border-transparent rounded-lg btn btn-neutral"
                >
                  Sitio TV ANEUPI
                </a>
                <div className="flex justify-around mt-8">
                  <a
                    href="https://www.facebook.com/tvaneupi"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebook className="text-2xl text-white hover:text-blue-500" />
                  </a>
                  <a
                    href="https://x.com/fundacionaneupi"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaXTwitter className="text-2xl text-white hover:text-blue-400" />
                  </a>
                  <a
                    href="https://www.instagram.com/aneupitv/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram className="text-2xl text-white hover:text-pink-500" />
                  </a>
                  <a
                    href="https://api.whatsapp.com/send/?phone=%2B593983341084&text&type=phone_number&app_absent=0"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaWhatsapp className="text-2xl text-white hover:text-green-500" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>

      {/* Section del carrusel */}

      <Carrusel2 />

      <SocialSection />
    </Layout>
  );
};

export default HomePage;
