import { useState } from "react";
import Layout from "../layout";
import BreadCrumb from "../../components/navigation/BreadCrumb";

// Importamos imágenes necesarias
import AneupiCoop from "../../pages/OfertaPage/img/AneupiCoop.png";
import GatitoPlis from "../../pages/OfertaPage/img/GatitoPlis.png";
import Leceni from "../../pages/OfertaPage/img/Leceni.png";
import AneupiTV from "../../pages/OfertaPage/img/AneupiTV.png";
import FundacionAneupi from "../../pages/AboutPage/img/FundacionAnupi.jpg";
import AcademiaAneupi from "../../pages/AboutPage/img/AcademiaAneupi3.jpg";
import { Button } from "@nextui-org/react";
// Enlace de navegación
const breadcrumbLinks = [
  { label: "Inicio", path: "/" },
  { label: "Nosotros", path: "/acerca-de-nosotros" },
  { label: "Estructura de la Fundación", path: "/estructura" },
];

// Componente para cada sección de empleado
const EmpleadoSection = ({
  nombreEmpleado,
  informacion,
  integraciones,
  deberes,
  selectedTab,
}) => {
  switch (selectedTab) {
    case "Información":
      return (
        <div className="flex flex-col md:flex-row items-start ">
          <a href={informacion.url} target="_blank">
            <img
              src={informacion.imagenUrl}
              alt={nombreEmpleado}
              className="w-64 h-64 rounded-lg shadow-lg mb-4 md:mb-0 md:mr-4"
            />
          </a>

          <div className="flex flex-col">
            <div className="mb-4">
              <p
                className="text-xl font-bold mb-2 text-[#00335f] text-center"
                style={{ wordWrap: "break-word" }}
              >
                {nombreEmpleado}
              </p>
              <div className="text-lg text-justify max-w-md mx-auto">
                {informacion.descripcion.map((linea, index) => (
                  <p key={index} className="mb-2">
                    {linea}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    case "Integración":
      return (
        <div className="text-center max-w-md mx-auto">
          <ul className="max-w-xs text-justify">
            {integraciones.map((integracion, index) => (
              <li key={index}>{integracion}</li>
            ))}
          </ul>
        </div>
      );
    case "Atribuciones y deberes":
      return (
        <div className="text-center max-w-md mx-auto">
          <ul className="max-w-xs text-justify">
            {deberes.map((deber, index) => (
              <li
                key={index}
                className="overflow-hidden overflow-ellipsis break-words"
              >
                {deber}
              </li>
            ))}
          </ul>
        </div>
      );
    default:
      return null;
  }
};

// Lista de empleados con sus datos
const empleados = [
  {
    Cargo: "Presidente de la Fundación ANEUPI",
    nombreEmpleado: "Henry Ricardo Erraez",
    informacion: {
      url: "https://aneupi.com/",
      imagenUrl: FundacionAneupi,
      descripcion: [
        "Correo: fundacionaneupi2020@gmail.com",
        "Celular: +593 983341084",
        "Dirección: Cuenca - Ecuador",
      ],
    },
    integraciones: ["1. Estatuto de la fundación"],
    deberes: ['1. ""', '2. ""', '3. ""'],
  },
  {
    Cargo: "Director de la Academia ANEUPI",
    nombreEmpleado: "Patricio Rodrigo Moscoso",
    informacion: {
      url: "https://academia.fundacionaneupi.com/",
      imagenUrl: AcademiaAneupi,
      descripcion: [
        "Correo: academiaaneupi2020@gmail.com",
        "Celular: +593 983341084",
        "Dirección: Quito - Ecuador",
      ],
    },
    integraciones: [
      "1. Leyes actuales que se aplican para la elección de un Director nuevo",
      '2. ""',
      '3. ""',
    ],
    deberes: ['1. ""', '2. ""', '3. ""'],
  },
  {
    Cargo: "Gerente de Gatito Plis",
    nombreEmpleado: "Henry Ricardo Erraez",
    informacion: {
      url: "https://www.cooperativafinancieraaneupi.com/",
      imagenUrl: GatitoPlis,
      descripcion: [
        "Correo: fundacionaneupi2020@gmail.com",
        "Celular: +593 983341084",
        "Dirección: Cuenca - Ecuador",
      ],
    },
    integraciones: [
      "1. Leyes actuales que se aplican para la elección de un Director nuevo",
      '2. ""',
      '3. ""',
    ],
    deberes: ['1. ""', '2. ""', '3. ""'],
  },
  {
    Cargo: "Gerente de la Constructora e inmobiliaria LECENI",
    nombreEmpleado: "Joel Wilfrido Erraez",
    informacion: {
      url: "https://www.constructoraleceni.com/",
      imagenUrl: Leceni,
      descripcion: [
        "Correo: constructoraleceni@gmail.com",
        "Celular: +593 9945472325",
        "Dirección: Quito - Ecuador",
      ],
    },
    integraciones: [
      "Gestión de equipos multidisciplinarios",
      "Control de calidad",
      "Evaluación de riesgos",
    ],
    deberes: ['1. ""', '2. ""', '3. ""'],
  },
  {
    Cargo: "Gerente de la ANEUPI TV ",
    nombreEmpleado: "Juan Diego Ochoa",
    informacion: {
      url: "https://academia.fundacionaneupi.com",
      imagenUrl: AneupiTV,
      descripcion: [
        "Correo: fundacionaneupi2020@gmail.com",
        "Celular: +593 983341084",
        "Dirección: Cuenca - Ecuador",
      ],
    },
    integraciones: [
      "Gestión de equipos multidisciplinarios",
      "Control de calidad",
      "Evaluación de riesgos",
    ],
    deberes: ['1. ""', '2. ""', '3. ""'],
  },
  {
    Cargo: "Gerente del proyecto de la Cooperativa Financiera ANEUPI",
    nombreEmpleado: "Daniel Sebastián Espinoza",
    informacion: {
      url: "https://www.cooperativafinancieraaneupi.com/",
      imagenUrl: AneupiCoop,
      descripcion: [
        "Correo: cooperativafinanciera.aneupi@gmail.com",
        "Celular:  +593 983341084",
        "Dirección: Cuenca - Ecuador",
      ],
    },
    integraciones: [
      "Gestión de equipos multidisciplinarios",
      "Control de calidad",
      "Evaluación de riesgos",
    ],
    deberes: ['1. ""', '2. ""', '3. ""'],
  },
];

// Página principal
const EstructuraPage = () => {
  // Estado para almacenar qué botón está seleccionado para cada empleado
  const [selectedTab, setSelectedTab] = useState({});

  // Función para manejar el clic en un botón de empleado
  const handleTabClick = (nombreEmpleado, button) => {
    setSelectedTab((prevState) => ({
      ...prevState,
      [nombreEmpleado]: button,
    }));
  };

  // Función para renderizar el contenido de cada empleado
  const renderContent = (empleado) => {
    const {
      Cargo,
      informacion,
      integraciones,
      deberes,
      nombreEmpleado,
    } = empleado;
    const tab = selectedTab[nombreEmpleado] || "Información"; // Sección seleccionada por defecto
    return (
      <div className="flex flex-col items-center mb-12">
        <div className="w-m mb-4 mx-auto">
          <h1
            className="text-[#00335f] text-4xl font-bold text-justify my-1 pb-4"
            style={{ wordWrap: "break-word" }}
          >
            {Cargo}
          </h1>
        </div>

        <div className="flex w-11/12 justify-center mb-4">
          {["Información", "Integración", "Atribuciones y deberes"].map(
            (button) => (
              <Button
                key={button}
                className={`mx-2 px-4 py-2 rounded-md text-white ${
                  tab === button ? "bg-[#00335f]" : "bg-gray-500"
                } hover:bg-[#004785] focus:outline-none`}
                style={{
                  minWidth: "100px",
                  height: "40px",
                  whiteSpace: "nowrap",
                }}
                onClick={() => handleTabClick(nombreEmpleado, button)}
              >
                {button}
              </Button>
            )
          )}
        </div>

        {/* Línea debajo de los botones */}
        <div className="w-11/12 mx-auto mb-4">
          <div className="h-2 bg-[#00335f]" style={{ width: "90%" }}></div>
        </div>

        {/* Muestra la sección seleccionada para el empleado */}
        <EmpleadoSection
          nombreEmpleado={nombreEmpleado}
          informacion={informacion}
          integraciones={integraciones}
          deberes={deberes}
          selectedTab={tab}
        />
      </div>
    );
  };

  return (
    <Layout>
      {/* Renderizar la barra de navegación */}
      <BreadCrumb links={breadcrumbLinks} title="Estructura de la Fundación" />
      <section className="p-4 flex flex-col items-center">
        {/* Renderizar contenido de empleados */}
        {empleados.map((empleado) => (
          <article key={empleado.nombreEmpleado} className="mb-12">
            {renderContent(empleado)}
          </article>
        ))}
      </section>
    </Layout>
  );
};

export default EstructuraPage;
