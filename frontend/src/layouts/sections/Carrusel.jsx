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
import Cooperativa1 from "../../assets/images/coperativa/Cooperativa1v4.jpg";
import Cooperativa12 from "../../assets/images/coperativa/Cooperativa12.jpg";
import Cooperativa13 from "../../assets/images/coperativa/Cooperativa13.jpg";
import Cooperativa10 from "../../assets/images/coperativa/Cooperativa10.jpg";
import TV from "../../assets/images/coperativa/TV.jpg";

const Carrusel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
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
  };

  const items = [
    {
      image: Cooperativa10,
      text1: "Ser Accionista",
      // Consultas
      text2:
        "Consulta si eres accionista ingresando tu cédula o conviértete en uno llenando un formulario de datos personales.",
      link: "https://www.cooperativafinancieraaneupi.com/consultas",
    },
    {
      image: Cooperativa1,
      text1: "Afíliate a la Cooperativa",
      text2:
        "Facilitamos la intermediación financiera entre socios con capacidad de ahorro y crédito para mayor prosperidad.",
      link: "https://www.cooperativafinancieraaneupi.com/afiliate",
    },
    {
      image: Cooperativa12,
      // Creditos
      text1: "Créditos",
      text2:
        "Ofrecemos beneficios exclusivos, con tasas reducidas, atención prioritaria y asesoramiento financiero.",
      link: "https://www.cooperativafinancieraaneupi.com/cr%C3%A9ditos-1",
    },
    {
      image: Cooperativa13,
      //Inversiones
      text1: "Inversiones",
      text2:
        "Disfruta de reinversión automática y depósito directo de intereses. Beneficios competitivos sin ser cliente.",
      link: "https://www.cooperativafinancieraaneupi.com/inversiones-1",
    },
  ];

  return (
    <div className="py-10 mt-6 md:py-24 ">
      <article className=" mx-auto bg-colorCoop p-7 md:p-10 md:pt-16">
        <h3 className="text-5xl text-center font-bold text-white mb-4">
          AUSPICIANTES
        </h3>
        <div className="relative md:hidden  md:top-0 md:left-auto md:ml-auto flex justify-end ">
          <img src={TV} alt="" className="h-16 w-16 rounded-lg" />
        </div>
        <div className="relative">
          <img
            src={TV}
            alt=""
            className="h-20 w-20 rounded-lg absolute right-0 top-0 hidden md:block"
          />
        </div>
        <SubCarrusel
          font={"Spinnaker, sans-serif"}
          title="Proyecto de la Cooperativa Financiera - ANEUPI"
        />
        <div className="mt-14 max-w-screen-2xl mx-auto">
          <Slider {...settings}>
            {items.map((item, index) => (
              <div key={index} className="px-4 md:px-8">
                {" "}
                {/* Margen entre contenedores */}
                <div className="h-[600px] text-black rounded-xl bg-gray-100  hover:shadow-xl hover:shadow-gray-500">
                  <div className="rounded-t-xl flex justify-center items-center">
                    <img
                      src={item.image}
                      alt=""
                      className="object-cover h-72 w-full rounded-t-lg"
                    />
                  </div>
                  <div className="mt-6 flex flex-col justify-center items-center gap-4 p-4">
                    <h1
                      className="text-xl font-semibold"
                      style={{ fontFamily: "Spinnaker, sans-serif" }}
                    >
                      {item.text1}
                    </h1>
                    <p
                      className="text-lg text-justify"
                      style={{ fontFamily: "Spinnaker, sans-serif" }}
                    >
                      {item.text2}
                    </p>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-8 px-4 py-2
                                        bg-colorCoop text-white rounded hover:bg-yellow-500 transition-colors duration-300"
                      style={{ fontFamily: "Spinnaker, sans-serif" }}
                    >
                      Más Información
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </Slider>

          <div className="flex justify-end mt-4 pt-6 space-x-4">
            <a
              href="https://www.facebook.com/Aneupi.Ec"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="text-2xl text-white hover:text-blue-500" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter className="text-2xl text-white hover:text-blue-400" />
            </a>
            <a
              href="https://instagram.com"
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
      </article>
    </div>
  );
};

export default Carrusel;
