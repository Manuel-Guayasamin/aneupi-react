import BrandImage from "../assets/brand/brand.png";
import logo from "../assets/email/logo.png";
import foot from "../assets/email/logotipos-linea.png";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaPhone,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="p-4 bg-colorcito">
      <div className="max-w-screen-xl py-4 mx-auto md:py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <p className="text-lg font-medium text-white">Dirección</p>
            <p className="text-lg font-medium text-white hidden ">
              Imagen para correos no tocar
            </p>
            <img src={logo} alt="Logo" style={{ width: 0 }} />
            <img src={foot} alt="foot" style={{ width: 0 }} />
            <a
              href="https://goo.gl/maps/jRMqXcKAT7kfn8ag6"
              target="_blank"
              rel="noreferrer"
              className="block max-w-md mt-6 text-sm leading-relaxed text-center text-white transition md:text-base sm:max-w-xs sm:text-left hover:text-white/75"
            >
              Av.Enrique Arizaga e Isauro Rodriguez - Junto a la constructora -
              LECENI. Cuenca - Ecuador
            </a>
            <ul className="flex justify-center gap-6 mt-8 text-white sm:justify-start md:gap-8">
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.facebook.com/aneupi.fundacion/"
                  className="transition hover:text-yellow-300"
                >
                  <FaFacebook className="text-2xl" />
                </a>
              </li>

              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.instagram.com/fundacion_aneupi/"
                  className="transition hover:text-yellow-300"
                >
                  <FaInstagram className="text-2xl" />
                </a>
              </li>

              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://twitter.com/FundacionANEUPI/"
                  className="transition hover:text-yellow-300"
                >
                  <FaXTwitter className="text-2xl" />
                </a>
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-1 gap-4 md:gap-0 sm:grid-cols-2 md:grid-cols-3 lg:col-span-2">
            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-white">Acceso Rápido</p>

              <ul className="mt-8 space-y-4 text-sm">
                <li>
                  <a
                    className="text-gray-300 transition hover:text-gray-300/75"
                    href="/"
                  >
                    Inicio
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-300 transition hover:text-gray-300/75"
                    href="/acerca-de-nosotros"
                  >
                    Nosotros
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-300 transition hover:text-gray-300/75"
                    href="/mision"
                  >
                    Misión y Visión
                  </a>
                </li>
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-white">Horarios</p>

              <ul className="mt-8 space-y-4 text-sm">
                <li className="text-gray-300 transition hover:text-gray-300/75">
                  Lunes - Sábado <br /> 7:00 am – 19:00 pm
                </li>
              </ul>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-white">Contactos</p>
              <ul className="mt-8 space-y-4 text-sm">
                <li>
                  <a
                    className="flex items-center justify-center gap-1.5 ltr:sm:justify-start"
                    href="mailto:fundaciónaneupi2020@gmail.com"
                  >
                    <FaEnvelope className="text-2xl text-white" />
                    <span className="text-gray-300 transition md:flex-1 hover:text-gray-300/75">
                      fundacionaneupi2020@gmail.com
                    </span>
                  </a>
                </li>

                <li>
                  <a
                    target="_blank"
                    className="flex items-center justify-center gap-1.5 ltr:sm:justify-start"
                    href="https://whatsapp.com/channel/0029Vaf4il905MUazhwZ5M17"
                  >
                    <FaWhatsapp className="text-2xl text-success" />
                    <span className="text-gray-300 transition md:flex-1 hover:text-gray-300/75">
                      +593983341084
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="flex items-center justify-center gap-1.5 ltr:sm:justify-start"
                    href="tel:+074095869"
                  >
                    <FaPhone className="text-2xl text-white" />
                    <span className="text-gray-300 transition md:flex-1 hover:text-gray-300/75">
                      (07) 4095869 Cuenca
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-6 mt-12 border-t border-gray-100">
          <div className="text-center sm:flex sm:justify-between sm:text-left">
            <p className="space-x-2 text-sm text-white">
              <span className="block sm:inline">
                Todos los Derechos Reservados.
              </span>
              <a
                className="inline-block text-white underline transition hover:text-white/75"
                href="/acerca-de-nosotros/politicas-de-privacidad"
              >
                Políticas de Privacidad
              </a>
            </p>

            <p className="mt-4 text-sm text-white sm:order-first sm:mt-0">
              &copy; 2024 Fundación ANEUPI
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
