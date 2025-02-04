import { FaInstagram, FaFacebook, FaXTwitter, FaTiktok } from "react-icons/fa6";
import AneupiCoop from "../pages/OfertaPage/img/AneupiCoop.png";
import AneupiWhite from "../assets/brand/brand_white.png";
import AcademiaAneupi from "../assets/brand/academia_aneupi.png";
import TvAneupi from "../assets/brand/tvaneupi.png";
import GatitoPlis from "../assets/brand/gatitoplis.png";

import LeceniIcon from "../assets/brand/brand_leceni.webp";
export const products = [
  {
    id: 1,
    title: "Fundación ANEUPI",
    image: AneupiCoop,
    roles: ["Director", "Supervisor"],
    href: "https://www.cooperativafinancieraaneupi.com/",
  },
  {
    id: 2,
    title: "Gatito Plis",
    image: GatitoPlis,
    roles: ["Presidente", "Gerente", "Director"],
    href: "https://www.cooperativafinancieraaneupi.com/",
  },
  {
    id: 3,
    title: "Academia ANEUPI",
    image: AcademiaAneupi,
    roles: ["Gerente", "Supervisor", "Director"],
    href: "https://academia.fundacionaneupi.com/",
  },
  {
    id: 4,
    title: "Leceni",
    image: LeceniIcon,
    roles: ["Presidente", "Gerente", "Director"],
    href: "https://www.constructoraleceni.com/",
  },
  {
    id: 5,
    title: "TV ANEUPI",
    image: TvAneupi,
    roles: ["Presidente", "Gerente"],
    href: "https://academia.fundacionaneupi.com",
  },
];

export const navlinks = [
  {
    href: "/",
    label: "Inicio",
  },
  {
    href: "/acerca-de-nosotros",
    label: "Nosotros",
    submenu: [
      {
        href: "/mision",
        label: "Misión y visión",
      },
      {
        href: "/organigrama",
        label: "Organigrama",
      },
      {
        href: "/estructura",
        label: "Estructura",
      },
      {
        href: "/historia",
        label: "Historia",
      },
    ],
  },
  {
    href: "/eventos",
    label: "Eventos",
  },
  {
    href: "/convenios",
    label: "Convenios",
  },
  {
    href: "",
    label: "Servicios",
    submenu: [
      {
        href: "/atencion-en-linea",
        label: "Atención en Línea",
      },
      {
        href: "/contactanos",
        label: "Contáctanos",
      },
    ],
  },
  {
    href: "/reportes",
    label: "Denunciar",
  },
  {
    href: "/ofertas-laborales",
    label: "Empleos",
  },
  {
    href: "/biblioteca",
    label: "Biblioteca",
    submenu: [
      {
        href: "/articulos",
        label: "Artículos",
      },
      {
        href: "/revistas",
        label: "Revistas",
      },
      {
        href: "/libros",
        label: "Libros",
      },
      {
        href: "/expedientes",
        label: "Expedientes",
      },
    ],
  },
];

export const sociallinks = [
  {
    label: "Instagram",
    icon: FaInstagram,
    url: "https://www.instagram.com/fundacion_aneupi",
  },
  {
    label: "Facebook",
    icon: FaFacebook,
    url: "https://www.facebook.com/aneupi.fundacion",
  },
  {
    label: "Twitter",
    icon: FaXTwitter,
    url: "https://twitter.com/FundacionANEUPI",
  },
  {
    label: "Tiktok",
    icon: FaTiktok,
    url: "https://www.tiktok.com/@fundacionaneupi",
  },
];

export const universidades = [
  { id: 1, siglas: "EPN", nombre: "Escuela Politécnica Nacional" },
  {
    id: 2,
    siglas: "ESPOCH",
    nombre: "Escuela Superior Politécnica de Chimborazo",
  },
  {
    id: 3,
    siglas: "ESPAM",
    nombre: "Escuela Superior Politécnica Agropecuaria de Manabí",
  },
  { id: 4, siglas: "UCE", nombre: "Universidad Central del Ecuador" },
  { id: 5, siglas: "UG", nombre: "Universidad de Guayaquil" },
  { id: 6, siglas: "UCUENCA", nombre: "Universidad de Cuenca" },
  { id: 7, siglas: "UNL", nombre: "Universidad Nacional de Loja" },
  { id: 8, siglas: "UTM", nombre: "Universidad Técnica de Manabí" },
  { id: 9, siglas: "UTA", nombre: "Universidad Técnica de Ambato" },
  { id: 10, siglas: "UTMACH", nombre: "Universidad Técnica de Machala" },
  {
    id: 11,
    siglas: "UTELVT",
    nombre: "Universidad Técnica Luis Vargas Torres de Esmeraldas",
  },
  { id: 12, siglas: "UTB", nombre: "Universidad Técnica de Babahoyo" },
  { id: 13, siglas: "UTEQ", nombre: "Universidad Técnica Estatal de Quevedo" },
  { id: 14, siglas: "UTN", nombre: "Universidad Técnica del Norte" },
  {
    id: 15,
    siglas: "ULEAM",
    nombre: "Universidad Laica Eloy Alfaro de Manabí",
  },
  { id: 16, siglas: "UEB", nombre: "Universidad Estatal de Bolívar" },
  { id: 17, siglas: "UAGRO", nombre: "Universidad Agraria del Ecuador" },
  { id: 18, siglas: "UNACH", nombre: "Universidad Nacional de Chimborazo" },
  { id: 19, siglas: "UTC", nombre: "Universidad Técnica de Cotopaxi" },
  {
    id: 20,
    siglas: "ESPOL",
    nombre: "Escuela Superior Politécnica del Litoral",
  },
  { id: 21, siglas: "UASB", nombre: "Universidad Andina Simón Bolívar" },
  {
    id: 22,
    siglas: "UPSE",
    nombre: "Universidad Estatal Península de Santa Elena",
  },
  { id: 23, siglas: "UNEMI", nombre: "Universidad Estatal de Milagro" },
  { id: 24, siglas: "UNESUM", nombre: "Universidad Estatal del Sur de Manabí" },
  {
    id: 25,
    siglas: "FLACSO",
    nombre: "Facultad Latinoamericana de Ciencias Sociales",
  },
  {
    id: 26,
    siglas: "PUCE",
    nombre: "Pontificia Universidad Católica del Ecuador",
  },
  {
    id: 27,
    siglas: "UCSG",
    nombre: "Universidad Católica de Santiago de Guayaquil",
  },
  { id: 28, siglas: "UCACUE", nombre: "Universidad Católica de Cuenca" },
  {
    id: 29,
    siglas: "ULVR",
    nombre: "Universidad Laica Vicente Rocafuerte de Guayaquil",
  },
  { id: 30, siglas: "UTPL", nombre: "Universidad Técnica Particular de Loja" },
  { id: 31, siglas: "UTE", nombre: "Universidad Tecnológica Equinoccial" },
  { id: 32, siglas: "UAZUAY", nombre: "Universidad del Azuay" },
  { id: 33, siglas: "UPS", nombre: "Universidad Politécnica Salesiana" },
  {
    id: 34,
    siglas: "UISEK",
    nombre: "Universidad Particular Internacional SEK",
  },
  {
    id: 35,
    siglas: "UEES",
    nombre: "Universidad Particular de Especialidades Espíritu Santo",
  },
  { id: 36, siglas: "USFQ", nombre: "Universidad San Francisco de Quito" },
  { id: 37, siglas: "UDLA", nombre: "Universidad de las Américas" },
  { id: 38, siglas: "UIDE", nombre: "Universidad Internacional del Ecuador" },
  {
    id: 39,
    siglas: "UNIANDES",
    nombre: "Universidad Regional Autónoma de los Andes (UNIANDES)",
  },
  {
    id: 40,
    siglas: "UPACIFICO",
    nombre: "Universidad del Pacífico - Escuela de Negocios",
  },
  { id: 41, siglas: "UTI", nombre: "Universidad Tecnológica Indoamérica" },
  { id: 42, siglas: "UCG", nombre: "Universidad Casa Grande" },
  {
    id: 43,
    siglas: "UTEG",
    nombre: "Universidad Tecnológica Empresarial de Guayaquil",
  },
  { id: 44, siglas: "UISRAEL", nombre: "Universidad Tecnológica Israel" },
  {
    id: 45,
    siglas: "UESPECIALIDADEST",
    nombre: "Universidad de Especialidades Turísticas",
  },
  { id: 46, siglas: "UMET", nombre: "Universidad Metropolitana" },
  { id: 47, siglas: "IAEN", nombre: "Instituto de Altos Estudios Nacionales" },
  { id: 48, siglas: "UEA", nombre: "Universidad Estatal Amazónica" },
  { id: 49, siglas: "UOTAVALO", nombre: "Universidad de Otavalo" },
  {
    id: 50,
    siglas: "USGP",
    nombre: "Universidad Particular San Gregorio de Portoviejo",
  },
  { id: 51, siglas: "UHEMISFERIO", nombre: "Universidad de los Hemisferios" },
  { id: 52, siglas: "UIBE", nombre: "Universidad Iberoamericana del Ecuador" },
  {
    id: 53,
    siglas: "UPEC",
    nombre: "Universidad Politécnica Estatal de Carchi",
  },
  { id: 54, siglas: "UECOTEC", nombre: "Universidad Tecnológica Ecotec" },
  {
    id: 55,
    siglas: "ESPE",
    nombre: "Universidad de las Fuerzas Armadas (ESPE)",
  },
  { id: 56, siglas: "UIKIAM", nombre: "Universidad Regional Amazónica Ikiam" },
  {
    id: 57,
    siglas: "UYACHAY",
    nombre: "Universidad de Investigación de Tecnología Experimental Yachay",
  },
  { id: 58, siglas: "UARTES", nombre: "Universidad de las Artes" },
  { id: 59, siglas: "UNAE", nombre: "Universidad Nacional de Educación UNAE" },
];

export const tabsOptions = [
  {
    title: "Proyecto del congreso",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    title: "Ponentes",
    content: "Ponentes",
  },
  {
    title: "Asistentes",
    content: "Asistentes",
  },
  {
    title: "Patrocinadores",
    content: "Patrocinadores",
  },
  {
    title: "Organizadores",
    content: "Organizadores",
  },
  {
    title: "Sesiones",
    content: "Sesiones",
  },
  {
    title: "Becas",
    content: "Actividades",
  },
  {
    title: "Fechas",
    content: "Actividades",
  },
  {
    title: "Lugares",
    content: "Lugares",
  },
  {
    title: "Coro de personas con discapacidad",
    content: "coro de personas con discapacidad",
  },
];

export const options = [
  {
    key: "1",
    label: "Si",
  },
  {
    key: "2",
    label: "No",
  },
];
export const userType = [
  {
    key: "Ponente",
    label: "Ponente",
  },
  {
    key: "Asistente",
    label: "Asistente",
  },
];

export const modalidad = [
  {
    key: "2",
    label: "Presencial",
  },
  {
    key: "1",
    label: "Virtual",
  },
  {
    key: "3",
    label: "Híbrido",
  },
];

export const precios = [
  {
    key: "19.99",
    label: "19.99 - Discapacidad",
  },
  {
    key: "29.99",
    label: "29.99 - Público general",
  },
  {
    key: "39.99",
    label: "39.99 - Docente o profesional",
  },
  {
    key: "beca",
    label: "Aplicar a beca",
  },
];
export const disabledprecios = [
  {
    key: "00.00",
    label: "00.00 - Discapacidad",
  },
  {
    key: "00.00",
    label: "00.00 - Público general",
  },
  {
    key: "00.00",
    label: "00.00 - Docente o profesional",
  },
  {
    key: "beca",
    label: "Aplicar a beca",
  },
];
export const days = [
  {
    key: "1",
    label: "Lunes",
    short: "LU",
  },
  {
    key: "2",
    label: "Martes",
    short: "MAR",
  },
  {
    key: "3",
    label: "Miércoles",
    short: "MIÉ",
  },
  {
    key: "4",
    label: "Jueves",
    short: "JUE",
  },
  {
    key: "5",
    label: "Viernes",
    short: "VIE",
  },
  {
    key: "6",
    label: "Sábado",
    short: "SAB",
  },
];
