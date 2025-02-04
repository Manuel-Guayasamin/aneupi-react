import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";

import BrandImage from "../assets/brand/brand.png";
import WhiteBrand from "../assets/brand/brand_white.png";
import Brandaneupi from "../assets/brand/academia_aneupi.png";
import BrandLeceni from "../assets/brand/Leceni.png";
import Brandpracticas from "../assets/brand/practicas_profesionales.png";
import Brandcongreso from "../assets/brand/congreso_internacionales.png";
import BrandDiscapacidad from "../assets/brand/BrandDiscapacidad.png";
import BrandCooperativa from "../assets/brand/BrandCooperativa.png";
import { navlinks, sociallinks } from "../data/constants";
import { NavItem } from "../components/navigation/NavItem";
import { HiMenuAlt3 } from "react-icons/hi";

import "../App";

function Header() {
  const dispatch = useDispatch();
  const { active } = useSelector((state) => state.authentication);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMenuFixed, setIsMenuFixed] = useState(false);
  const [margin, setMargin] = useState(0);

  const handleDrawerToggle = () => setIsDrawerOpen(!isDrawerOpen);

  const handleLogoutSesssion = () => {
    dispatch(logout());
  };
  //Contralador para que el menu de navegacion baje con el scroll de la pagina
  useEffect(() => {
    const header = document.querySelector("header");
    const handleScroll = () => {
      const height =
        header.offsetHeight + document.getElementById("topbar").offsetHeight;
      const scrollTop = window.scrollY;
      setIsMenuFixed(scrollTop > height);
      setMargin(document.querySelector("nav").offsetHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="px-4 py-1 colorcito" id="topbar">
        <div className="hidden w-full max-w-screen-xl mx-auto md:flex">
          <ul className="flex items-center gap-2 ml-auto">
            <li>
              <span className="text-xs italic font-medium text-white select-none opacity-80">
                Síguenos en nuestras redes sociales:
              </span>
            </li>
            {sociallinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.url}
                  target="_blank"
                  className="flex items-center w-5 text-white opacity-60 transition hover:scale-105 hover:-translate-y-0.5 hover:opacity-100 hover:text-yellow-300"
                >
                  <link.icon className="text-4xl" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <header
        className="flex flex-wrap items-center justify-center w-full max-w-screen-xl gap-4 p-2 mx-auto transition-mb md:justify-between md:flex-nowrap"
        style={{ marginBottom: isMenuFixed ? margin + "px" : 0 }}
      >
        <div className="flex flex-row items-center justify-between w-full gap-2 2xl:px-0 md:gap-0">
          <div className="flex flex-col gap-2">
            <Link
              to="https://www.constructoraleceni.com/"
              target="_blank"
              style={{ display: "inline-block", width: "100%", height: "100%" }}
            >
              <img
                src={BrandLeceni}
                alt="Descripción de la imagen"
                className="w-52"
              />
            </Link>
            <Link
              target="_blank"
              to="https://www.cooperativafinancieraaneupi.com/afiliate"
              style={{ display: "inline-block", width: "100%", height: "100%" }}
            >
              <img
                src={BrandCooperativa}
                alt="congreso internacional imagen"
                className="w-52"
              />
            </Link>
          </div>
          <div className="flex flex-col items-center">
            <Link className="hidden md:flex" to="/">
              <img
                src={BrandImage}
                alt="Fundación ANEUPI Logo"
                className="inline-block object-contain w-64 mx-auto md:w-80"
              />
            </Link>
            <Link className="relative mt-4" to="/congreso-internacional">
              <img
                src={Brandcongreso}
                alt="Fundación ANEUPI Logo"
                className="w-48"
              />
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <a
              href="https://academia.fundacionaneupi.com/"
              target="_blank"
              style={{ display: "inline-block", width: "100%", height: "100%" }}
            >
              <img src={Brandaneupi} alt="Academia imagen" className="w-52" />
            </a>
            <Link
              to="/ofertas-practicas"
              style={{ display: "inline-block", width: "100%", height: "100%" }}
            >
              <img
                src={Brandpracticas}
                alt="Practica imagen"
                className="w-52"
              />
            </Link>
          </div>
        </div>
      </header>

      <nav
        className={`w-full flex bg-colorcito p-4 ${
          isMenuFixed ? "fixed top-0 z-50 shadow-md" : ""
        }`}
      >
        <img src={WhiteBrand} alt="Logo Aneupi" className="h-10 md:hidden" />
        <button
          onClick={handleDrawerToggle}
          className={`text-2xl md:hidden text-white h-8 flex items-center ml-auto cursor-pointer rounded p-1`}
        >
          <HiMenuAlt3 />
        </button>
        <div className="justify-between hidden w-full max-w-screen-xl mx-auto md:flex">
          <ul className="flex items-center justify-between w-full">
            {navlinks.map((link, index) => (
              <li
                key={index}
                className={`mx-2 mb-2 md:mb-0 ${
                  link.submenu ? "group relative z-20" : ""
                }`}
              >
                <NavItem
                  href={link.href}
                  label={link.label}
                  isDropdown={!!link.submenu}
                />
                {link.submenu && (
                  <ul className="absolute left-0 z-30 hidden w-full text-white bg-colorcito top-full group-hover:block">
                    {link.submenu.map((sublink, indx) => (
                      <li
                        key={indx}
                        className="border-t border-white last:border-b"
                      >
                        <NavItem
                          href={sublink.href}
                          label={sublink.label}
                          className={`px-4 py-2 ${
                            sublink.selected
                              ? "bg-yellow-500 text-blue-500"
                              : "hover:text-yellow-500"
                          }`}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center justify-center w-full gap-4 mt-4 md:w-auto md:mt-0">
            {active ? (
              <button
                onClick={handleLogoutSesssion}
                className="min-w-35 block px-3 py-1 leading-loose text-sm text-center font-bold text-nowrap bg-red-500 hover:bg-red-600 rounded-sm !text-white"
                type="button"
              >
                Cerrar Sesión
              </button>
            ) : (
              <div className="flex space-x-4">
                <>
                  <Link
                    to="/registrarse"
                    className="block px-2 py-1 text-sm font-bold leading-loose text-center rounded-sm min-w-32 bg-gray-50 hover:bg-gray-100"
                  >
                    Registrarse
                  </Link>

                  {/* <Link
                    to="/iniciar-sesion"
                    className="block px-2 py-1 text-sm font-bold leading-loose text-center text-white bg-green-400 rounded-sm min-w-32 hover:bg-green-600"
                  >
                    Iniciar Sesión
                  </Link> */}

                  <a
                    href="/iniciar-sesion"
                    className="block px-2 py-1 text-sm font-bold leading-loose text-center text-white bg-green-400 rounded-sm min-w-32 hover:bg-green-600"
                  >
                    Iniciar sesion
                  </a>
                </>
              </div>
            )}
          </div>
        </div>
      </nav>

      {isDrawerOpen && (
        <div className="relative z-50">
          <div
            className="fixed inset-0 bg-gray-800 bg-opacity-75 backdrop-blur-sm"
            onClick={handleDrawerToggle}
          ></div>
          <nav className="fixed top-0 bottom-0 right-0 flex flex-col w-2/3 max-w-sm px-6 py-6 bg-colorcito">
            <div className="flex items-center mb-4">
              <img src={WhiteBrand} alt="Logo Aneupi" className="h-10" />
              <button className="ml-auto" onClick={handleDrawerToggle}>
                <svg
                  className="w-6 h-6 text-gray-400 cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto">
              <ul>
                {navlinks.map((link, index) => (
                  <li key={index} className="mb-1">
                    <NavLink
                      to={link.href}
                      className="flex items-center w-full p-4 text-sm font-semibold text-gray-300 rounded-sm current:bg-yellow-500 current:text-colorcito current:font-bold"
                    >
                      {link.label}
                      {link.submenu && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="inline-block w-4 h-4 ml-auto"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          ></path>
                        </svg>
                      )}
                    </NavLink>
                    {link.submenu && (
                      <ul className="ml-5">
                        {link.submenu.map((sublink, indx) => (
                          <li key={indx} className="mb-1">
                            <NavLink
                              to={sublink.href}
                              className="block p-4 text-sm font-semibold text-gray-300 rounded-sm current:bg-yellow-500 current:text-colorcito current:font-bold"
                            >
                              {sublink.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-auto">
              <div className="pt-6">
                {active ? (
                  <button
                    onClick={handleLogoutSesssion}
                    className="btn btn-error  !text-white"
                    type="button"
                  >
                    Cerrar Sesión
                  </button>
                ) : (
                  <>
                    <Link
                      to="/registrarse"
                      className="block px-4 py-3 mb-3 text-sm font-bold leading-loose text-center rounded-sm bg-gray-50 hover:bg-gray-100"
                    >
                      Registrarse
                    </Link>
                    <Link
                      to="/iniciar-sesion"
                      className="block px-4 py-3 mb-2 text-sm font-bold leading-loose text-center bg-green-400 rounded-sm text-colorcito hover:bg-green-600"
                    >
                      Iniciar Sesión
                    </Link>
                  </>
                )}
              </div>
              <p className="mt-4 text-xs text-center text-gray-400">
                <span>&copy; 2024 Fundación ANEUPI</span>
              </p>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

export default Header;
