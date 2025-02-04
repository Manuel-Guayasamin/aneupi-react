import {
  FaFacebook,
  FaXTwitter,
  FaInstagram,
  FaWhatsapp,
  FaBook,
  FaCertificate,
  FaBookOpen,
} from "react-icons/fa6";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SubCarrusel from "../../components/ui/SubtitleCarrusel";
import TV from "../../assets/images/coperativa/TV.jpg";
import Academia2 from "../../assets/images/academia/academia2.jpg";
import Academia5 from "../../assets/images/academia/academia5.webp";
import Academia6 from "../../assets/images/academia/academia6.png";
import lec1 from "../../assets/images/constructora/leceni1.png";
import lec3 from "../../assets/images/constructora/leceni3.png";
import lec4 from "../../assets/images/constructora/leceni4.png";
import { useEffect, useState } from "react";

const Carrusel = () => {
  const [visibleAcademiaCount, setVisibleAcademiaCount] = useState(0);
  const [visibleConstructoraCount, setVisibleConstructoraCount] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 10000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    afterChange: (currentSlide) => {
      const visibleAcademia = items
        .slice(currentSlide, currentSlide + settings.slidesToShow)
        .filter((item) => item.id === 1).length;

      setVisibleAcademiaCount(visibleAcademia);
      const visibleConstructora = items
        .slice(currentSlide, currentSlide + settings.slidesToShow)
        .filter((item) => item.id === 4 || 2).length;

      setVisibleConstructoraCount(visibleConstructora);
    },
  };

  const items = [
    //Academia
    {
      id: 1,
      image: Academia5,
      text1: "CATEDRA DE IDIOMAS",
      text2:
        "Descubre nuestros diversos cursos de idiomas para encaminar tu vida profesional.",
      link: "https://academia.fundacionaneupi.com/",
    },
    {
      id: 3,
      // image: Academia3,
      image: Academia6,
      text1: "CARRERAS",
      text2:
        "Descubre nuestra oferta académica en modalidades presencial y virtual.",
      link: "https://academia.fundacionaneupi.com/services-9",
    },
    {
      id: 1,
      image: Academia2,
      text1: "SOCIALIZACIÓN DE ARTICULOS CIENTÍFICOS",
      text2:
        "Participa en nuestras estrategias para la difusión efectiva y accesible de investigaciones científicas.",
      link: "https://academia.fundacionaneupi.com/",
    },

    //Constructora
    {
      id: 4,
      image: lec1,
      text1: "COMPRA TU PRIMERA VIVIENDA",
      text2: "¡No te pierdas la oportunidad de adquirir tu primera VIVIENDA!",
      link: "https://www.constructoraleceni.com/simulador-credito",
    },
    {
      image: lec4,
      text1: "ASESORAMIENTO",
      text2:
        "Enterate de estos consejos ¡UTILES! antes de adquirir tu propiedad soñada.",
      link: "https://www.constructoraleceni.com/blog",
    },
    {
      id: 2,
      image: lec3,
      link: "https://www.constructoraleceni.com/proyectos",
    },
  ];

  useEffect(() => {
    // Inicializar los contadores cuando el componente se monta
    settings.afterChange(0);
  }, []);

  return (
    <div className="py-10 mt-6 md:py-24 ">
      {/* <article className="mx-auto bg-colorcitoleceni1 p-7 md:p-10 md:pt-16"> */}
      <article
        className={`mx-auto p-7 md:p-10 md:pt-16 
                    ${
                      visibleAcademiaCount >= 1
                        ? "bg-colorcarruselAcademia"
                        : visibleConstructoraCount >= 1
                        ? "bg-colorcitoleceni1"
                        : "bg-colorcarruselAcademia"
                    }`}
      >
        <div className="relative flex justify-end md:hidden md:top-0 md:left-auto md:ml-auto">
          <img src={TV} alt="" className="w-16 h-16 rounded-lg" />
        </div>
        <div className="relative">
          <img
            src={TV}
            alt=""
            className="absolute top-0 right-0 hidden w-20 h-20 rounded-lg md:block"
          />
        </div>
        <h3 className="text-5xl text-center font-bold text-white mb-4">
          AUSPICIANTES
        </h3>
        <SubCarrusel
          font={
            visibleAcademiaCount >= 1
              ? "Barlow, sans-serif"
              : visibleConstructoraCount >= 1
              ? "Montserrat, sans-serif"
              : "Barlow, sans-serif"
          }
          title={
            visibleAcademiaCount >= 1
              ? "Academia Internacional ANEUPI"
              : visibleConstructoraCount >= 1
              ? "Constructora e Inmobiliaria LECENI"
              : "Academia Internacional ANEUPI"
          }
        />
        <div className="mx-auto mt-14 max-w-screen-2xl">
          <Slider {...settings}>
            {/*Forma del carrusel */}

            {items.map((item, index) => (
              <div key={index} className="px-4 md:px-8">
                {item.id === 1 ? (
                  <div className="h-[600px] text-black rounded-xl bg-gray-200  hover:shadow-xl hover:shadow-gray-500">
                    <div className="flex items-center justify-center rounded-t-xl">
                      <img
                        src={item.image}
                        alt=""
                        className="object-cover w-full rounded-t-lg h-72"
                      />
                    </div>
                    <div className="flex flex-col items-center justify-center gap-4 p-4 mt-6 ">
                      <h1
                        className="text-2xl font-bold text-center md:text-2xl"
                        style={{
                          fontFamily: "Barlow, sans-serif",
                        }}
                      >
                        {item.text1}
                      </h1>
                      <p
                        className="text-base text-justify align-top md:text-2xl"
                        style={{
                          fontFamily: "Barlow, sans-serif",
                        }}
                      >
                        {item.text2}
                      </p>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-4 py-2 mt-8 text-white transition-colors duration-300 rounded bg-colorcitoleceni2 hover:bg-colorcitoleceni1"
                        style={{
                          fontFamily: "Barlow, sans-serif",
                          position: "absolute",
                          bottom: "20px",
                        }}
                      >
                        Más Información
                      </a>
                    </div>
                  </div>
                ) : item.id === 2 ? (
                  <div className="h-[600px] text-black rounded-xl bg-gray-100">
                    <div className="flex flex-col items-center justify-center h-full hover:shadow-xl hover:shadow-gray-500">
                      <img
                        src={item.image}
                        alt=""
                        className="object-cover w-full h-full rounded-lg"
                      />
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-4 py-2 mt-8 text-white transition-colors duration-300 rounded bg-colorcitoleceni1 hover:bg-colorcitoleceni2"
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          position: "absolute",
                          bottom: "20px",
                        }}
                      >
                        Más Información
                      </a>
                    </div>
                  </div>
                ) : item.id === 3 ? (
                  <div className="h-[600px] text-black rounded-xl bg-gray-100">
                    <div className="relative flex flex-col items-center justify-center h-full">
                      <img
                        src={item.image}
                        alt=""
                        className="object-cover w-full h-full rounded-xl"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-black bg-opacity-0 rounded-xl hover:shadow-xl hover:shadow-gray-500">
                        <h1
                          className="p-6 mt-2 text-5xl font-bold text-center text-black"
                          style={{
                            fontFamily: "Barlow, sans-serif",
                            position: "absolute",
                            top: "60px",
                          }}
                        >
                          {item.text1}
                        </h1>
                        <p
                          className="p-6 mt-2 text-2xl font-bold text-justify text-white"
                          style={{
                            fontFamily: "Barlow, sans-serif",
                            position: "absolute",
                            top: "350px",
                          }}
                        >
                          {item.text2}
                        </p>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-4 py-2 mt-8 text-white transition-colors duration-300 rounded bg-colorcitoleceni2 hover:bg-colorcitoleceni1"
                          style={{
                            fontFamily: "Barlow, sans-serif",
                            position: "absolute",
                            bottom: "20px",
                          }}
                        >
                          Más Información
                        </a>
                      </div>
                    </div>
                  </div>
                ) : item.id === 4 ? (
                  <div className="h-[600px] text-black rounded-xl bg-gray-100">
                    <div className="relative flex flex-col items-center justify-center h-full">
                      <img
                        src={item.image}
                        alt=""
                        className="object-cover w-full h-full rounded-xl"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-black bg-opacity-30 rounded-xl hover:shadow-xl hover:shadow-gray-500">
                        <h1
                          className="p-6 mt-2 text-3xl font-bold text-center text-white"
                          style={{
                            fontFamily: "Montserrat, sans-serif",
                            position: "absolute",
                            top: "20px",
                          }}
                        >
                          {item.text1}
                        </h1>
                        <p
                          className="p-6 mt-2 text-2xl font-medium text-justify text-white"
                          style={{
                            fontFamily: "Montserrat, sans-serif",
                            position: "absolute",
                            top: "325px",
                          }}
                        >
                          {item.text2}
                        </p>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-4 py-2 mt-8 text-white transition-colors duration-300 rounded bg-colorcitoleceni1 hover:bg-colorcitoleceni2"
                          style={{
                            fontFamily: "Montserrat, sans-serif",
                            position: "absolute",
                            bottom: "20px",
                          }}
                        >
                          Más Información
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-[600px] text-black rounded-xl bg-gray-200  hover:shadow-xl hover:shadow-gray-500">
                    <div className="flex items-center justify-center rounded-t-xl">
                      <img
                        src={item.image}
                        alt=""
                        className="object-cover w-full rounded-t-lg h-72"
                      />
                    </div>
                    <div className="flex flex-col items-center justify-center gap-4 p-4 mt-6 ">
                      <h1
                        className="text-2xl font-bold text-colorcitoleceni1"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        {item.text1}
                      </h1>
                      <p
                        className="text-xl font-medium text-justify text-colorcitoleceni1"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        {item.text2}
                      </p>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-4 py-2 mt-8 text-white transition-colors duration-300 rounded bg-colorcitoleceni1 hover:bg-colorcitoleceni2"
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          position: "absolute",
                          bottom: "20px",
                        }}
                      >
                        Más Información
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </Slider>

          <div className="flex justify-end pt-6 mt-4 space-x-4">
            <a
              href={
                visibleAcademiaCount >= 2
                  ? "https://www.facebook.com/aneupi.fundacion/"
                  : visibleConstructoraCount >= 2
                  ? "https://www.facebook.com/Leceni2021"
                  : "https://www.facebook.com/aneupi.fundacion/"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="text-2xl text-white hover:text-blue-500" />
            </a>
            <a
              href={
                visibleAcademiaCount >= 2
                  ? "https://x.com/fundacionaneupi"
                  : visibleConstructoraCount >= 2
                  ? "https://x.com/Leceni2022"
                  : "https://x.com/fundacionaneupi"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter className="text-2xl text-white hover:text-blue-400" />
            </a>
            <a
              href={
                visibleAcademiaCount >= 2
                  ? "https://www.instagram.com/fundacion_aneupi/"
                  : visibleConstructoraCount >= 2
                  ? "https://www.instagram.com/leceni2021/?hl=es"
                  : "https://www.instagram.com/fundacion_aneupi/"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-2xl text-white hover:text-pink-500" />
            </a>
            <a
              href={
                visibleAcademiaCount >= 2
                  ? "https://api.whatsapp.com/send/?phone=%2B593983341084&text&type=phone_number&app_absent=0"
                  : visibleConstructoraCount >= 2
                  ? "https://api.whatsapp.com/send/?phone=%2B593983341084&text&type=phone_number&app_absent=0"
                  : "https://api.whatsapp.com/send/?phone=%2B593983341084&text&type=phone_number&app_absent=0"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp className="text-2xl text-white hover:text-green-500" />
            </a>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Carrusel;
