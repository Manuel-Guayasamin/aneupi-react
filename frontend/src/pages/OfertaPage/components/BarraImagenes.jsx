import React from "react";
import AneupiCoop from "../img/AneupiCoop.png";
import GatitoPlis from "../img/GatitoPlis.png";
import Leceni from "../img/Leceni.png";
import AneupiTV from "../img/AneupiTV.png";
import AcademiaAneupi from "../../AboutPage/img/AcademiaAneupi3.jpg";

function BarraImagenes() {
  return (
    <div className="flex justify-between ">
      <a
        href="https://www.cooperativafinancieraaneupi.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={AneupiCoop}
          alt="Imagen 1"
          className="transition-transform duration-300 ease-in-out transform hover:scale-150 w-16 h-auto p-3 mx-2 mb-2 sm:w-24 md:w-32 lg:w-40 xl:w-48"
        />
      </a>
      <a
        href="https://academia.fundacionaneupi.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={GatitoPlis}
          alt="Imagen 2"
          className="transition-transform duration-300 ease-in-out transform hover:scale-150 w-16 h-auto p-3 mx-2 mb-2 sm:w-24 md:w-32 lg:w-40 xl:w-48"
        />
      </a>
      <a
        href="https://www.constructoraleceni.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={Leceni}
          alt="Imagen 3"
          className="transition-transform duration-300 ease-in-out transform hover:scale-150 w-16 h-auto mx-2 mb-2 sm:w-24 md:w-32 lg:w-40 xl:w-48"
        />
      </a>
      <a
        href="https://academia.fundacionaneupi.com/tv-aneupi"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={AneupiTV}
          alt="Imagen 4"
          className="transition-transform duration-300 ease-in-out transform hover:scale-150 w-16 h-auto mx-2 mb-2 sm:w-24 md:w-32 lg:w-40 xl:w-48"
        />
      </a>
      <a
        href="https://academia.fundacionaneupi.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={AcademiaAneupi}
          alt="Imagen 5"
          className="transition-transform duration-300 ease-in-out transform hover:scale-150 w-16 h-auto mx-2 mb-2 sm:w-24 md:w-32 lg:w-40 xl:w-48"
        />
      </a>
    </div>
  );
}

export default BarraImagenes;
