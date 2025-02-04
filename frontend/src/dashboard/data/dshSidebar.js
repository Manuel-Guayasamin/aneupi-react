import { AiOutlineApartment } from "react-icons/ai";
import { FaBoxOpen, FaUniversity } from "react-icons/fa";
import {
  FaFlaskVial,
  FaUsers,
  FaFlask,
  FaHandshake,
  FaUserGraduate,
  FaUserTie,
  FaBook, 
} from "react-icons/fa6";
import {
  GiGraduateCap 
} from "react-icons/gi";
import { RiCustomerService2Line, RiPsychotherapyFill, RiReservedFill } from "react-icons/ri";
import { SiEventstore } from "react-icons/si";
import { BiSolidDashboard, BiMap } from "react-icons/bi";
import { MdContactMail, MdLibraryBooks,MdWork,MdReportProblem   } from "react-icons/md";
import { LiaCitySolid } from "react-icons/lia";

export const sidebarItems = [
  {
    title: "Dashboard",
    icon: BiSolidDashboard,
    to: "/dashboard/inicio",
  },
  {
    title: "Usuarios",
    icon: FaUsers,
    to: "/dashboard/usuarios",
  },
  {
    title: "Eventos",
    icon: SiEventstore,
    to: "/dashboard/eventos",
  },
  {
    title: "Trabajos",
    icon: AiOutlineApartment,
    to: "/dashboard/trabajos",
  },
  {
    title: "Convenios",
    icon: FaHandshake,
    to: "/dashboard/convenios",
  },
  {
    title: "Practicas",
    icon: FaUniversity,
    to: "/dashboard/practicas",
  },
  {
    title: "Postulaciones",
    icon: FaFlaskVial,
    submenu: [
      {
        title: "Prácticas",
        icon: FaUserGraduate,
        to: "/dashboard/postulaciones-practicas",
      },
      {
        title: "Prácticas Libres",
        icon: GiGraduateCap ,
        to: "/dashboard/postulaciones-practicas-libres",
      },
      {
        title: "Trabajos",
        icon: FaUserTie,
        to: "/dashboard/postulaciones-trabajos",
      },
      {
        title: "Trabajos Libres",
        icon: MdWork,
        to: "/dashboard/postulaciones-trabajos-libres",
      },
      // {
      //   title: "Solicitudes",
      //   icon: FaBoxOpen,
      //   to: "/dashboard/postulaciones-solicitudes",
      // },
    ],
  },
  {
    title: "Servicios",
    icon: RiCustomerService2Line,
    to: "/dashboard/servicios",
  },
  {
    title: "Citas",
    icon: RiReservedFill,
    to: "/dashboard/citas",
  },
  {
    title: "Profesionales",
    icon: RiPsychotherapyFill,
    to: "/dashboard/profesionales",
  },
  {
    title: "Países",
    icon: BiMap,
    to: "/dashboard/paises",
  },
  // {
  //   title: "Ciudades",
  //   icon: LiaCitySolid,
  //   to: "/dashboard/ciudades",
  // },
  {
    title: "Contactos",
    icon: MdContactMail,
    to: "/dashboard/contactos",
  },
  {
    title: "Bibliotecas",
    icon: FaBook,
    to: "/dashboard/biblioteca",
  },
  {
    title: "Expedientes",
    icon: MdLibraryBooks,
    to: "/dashboard/expediente",
  },
  {
    title: "Denuncias",
    icon: MdReportProblem ,
    to: "/dashboard/reportes",
  }
];
