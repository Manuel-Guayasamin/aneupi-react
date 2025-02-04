import { useState, lazy, Suspense } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@nextui-org/react";
import { TbExternalLink } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { HiChevronDown } from "react-icons/hi";
import { TabsCongreso } from "./tabs";
import { DevelopmentAnimation } from "./DevelopmentAnimation";
import {
  inscribirUsuarioEvento,
  verificarInscripcionUsuarioEvento,
} from "../../redux/slices/eventoUsuariosSlice";
import Layout from "../layout";
import { useEffect } from "react";
import ValidationLogin from "../../components/validations/ValidationLogin";
import NotifyWhatsapp from "../../components/ui/NotifyWhatsapp";
import ButtonEnviar from "../../dashboard/components/Buttons/ButtonEnviar";
import { Proyecto } from "./tabs/Proyecto";
import { Link } from "react-router-dom";
import { Inscripciones } from "./tabs/inscripciones";
import { Benefactores } from "./tabs/Benefactores";
import { Ponentes } from "./tabs/Ponentes";
import { Becas } from "./tabs/Becas";
import { Lugares } from "./tabs/Lugares";
import { Asistentes } from "./tabs/Asistentes";
import { Sugerencias } from "./tabs/sugerencias";
import { Artistas } from "./tabs/Artistas";
import { Cronograma } from "./tabs/Cronograma";
// import { Publicar } from "./tabs/Publicar";
// import { Voluntarios } from "./tabs/Voluntarios";
const Publicar = lazy(() => import("./tabs/Publicar"));

const CongresoPage = () => {
  const dispatch = useDispatch();
  const inscripcionVerificada = useSelector(
    (state) => state.eventoUsuarios.inscripcionVerificada
  );
  const { usuario, active } = useSelector((state) => state.authentication);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    data.id_usuario = active && usuario.id;
    data.codigo = "2024";
    dispatch(inscribirUsuarioEvento(data)).then(() => {
      reset();
      setFormSend(true);
    });
    setUserType(false);
  };

  const [userType, setUserType] = useState(false);
  const [hasDiscapacidad, setHasDiscapacidad] = useState(false);
  const [formSend, setFormSend] = useState(false);
  const handleUserType = () => setUserType(!userType);
  const handleHasDiscapacidad = () => setHasDiscapacidad(!hasDiscapacidad);
  const development = false;
  useState(() => {
    setValue("nombres", usuario?.nombres || "");
    setValue("apellidos", usuario?.apellidos || "");
    setValue("email", usuario?.email || "");
  }, [usuario, setValue]);

  useEffect(() => {
    if (usuario) {
      dispatch(
        verificarInscripcionUsuarioEvento({
          idUsuario: usuario.id,
          codigoEvento: "2024",
        })
      );
    }
  }, [dispatch, usuario?.id, userType, formSend]);

  const tabsOptions = [
    {
      title: "Planificación del Congreso Internacional",
      content: <Proyecto />,
    },
    {
      title: "Cronograma",
      content: <Cronograma />,
    },
    {
      title: "Lugares",
      content: development ? <Lugares /> : <DevelopmentAnimation />,
    },
    {
      title: "Ponentes",

      content: development ? <Ponentes /> : <DevelopmentAnimation />,
    },
    {
      title: "Asistentes",

      content: <Asistentes />,
    },
    // {
    //   title: "Voluntarios",
    //   content: <Voluntarios />,
    // },
    {
      title: "Inscripciones",
      content: <Inscripciones />,
    },
    {
      title: "Benefactores",
      content: development ? <Benefactores /> : <DevelopmentAnimation />,
    },

    {
      title: "Becas",
      content: development ? <Becas /> : <DevelopmentAnimation />,
    },

    {
      title: "Artistas",
      content: <Artistas />,
    },
    {
      title: "Publicar",
      content: development ? <Publicar /> : <DevelopmentAnimation />,
    },
    {
      title: "Sugerencias",
      content: <Sugerencias />,
    },
  ];

  return (
    <Layout>
      <div
        className="w-[92%] mx-auto 
      "
      >
        <section className="space-y-5 mt-10">
          <header className=" flex flex-col md:flex-row items-center justify-between gap-10 md:gap-0 py-10">
            <div className="flex flex-col items-center justify-center mx-auto gap-2">
              <p className="text-[#004785] font-bold text-xl">Nov - 2025</p>
              <h2 className="text-2xl text-center  font-medium text-[#004785] md:text-4xl lg:text-7xl">
                III CONGRESO INTERNACIONAL
              </h2>
              <div className="flex flex-col items-center justify-center relative -top-5 gap-4">
                <h4 className="text-xl text-center  font-medium text-[#004785] md:text-2xl lg:text-4xl">
                  Educación inclusiva y discapacidad desde las praxis
                </h4>
                <h3 className="text-xl text-center  font-medium text-gray-400 md:text-2xl lg:text-3xl">
                  I Cumbre Internacional
                </h3>
              </div>
            </div>
            {/* <Button
              target="_blank"
              to="https://academia.fundacionaneupi.com/donaciones"
              as={Link}
              radius="none"
              color="warning"
              variant="light"
            >
              Pagos y donaciones <TbExternalLink />
            </Button> */}
          </header>
          <TabsCongreso tabsOptions={tabsOptions} />
        </section>
        <div className="w-full p-4 mx-auto">
          <div className="border-2  rounded-xl border-[#00335f] collapse collapse-arrow">
            <input type="checkbox" />
            <h4 className="font-bold collapse-title">
              Aclaración sobre la participación:
            </h4>
            <div className="text-sm collapse-content">
              <p>
                Todos los usuarios que participarán en el{" "}
                <span className="font-bold">
                  III CONGRESO SOBRE "EDUCACIÓN INCLUSIVA Y DISCAPACIDAD DESDE
                  LA PRAXIS"
                </span>
                . Tanto en la modalidad virtual como presencial deberán acatar a
                las reglas y la planificación de este evento.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CongresoPage;
