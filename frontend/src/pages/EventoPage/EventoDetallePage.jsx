import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../../components/ui/Loading";
import { fetchEventById } from "../../redux/slices/eventSlice";
import Layout from "../layout";
import { Modal } from "../../components/ui/Modal";
import { EventCard } from "../../components/cards/EventCard";
import { useDisclosure } from "@nextui-org/react";
const serverURL = import.meta.env.VITE_API_URL;

const EventoDetallePage = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const params = useParams();
  const dispatch = useDispatch();
  const eventFound = useSelector((state) => state.eventos.eventFound);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchEventById(params.id));
    }
  }, [dispatch, params.id]);

  const breadcrumbLinks = [
    { label: "Inicio", path: "/" },
    { label: "Eventos", path: "/eventos" },
    { label: eventFound?.nombre, path: `/eventos/${eventFound?.id}` },
  ];

  if (!eventFound) {
    return <Loading />;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(date.getTime() + userTimezoneOffset);
    const year = adjustedDate.getFullYear();
    const month = String(adjustedDate.getMonth() + 1).padStart(2, "0");
    const day = String(adjustedDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  return (
    <Layout>
      <main className="grid">
        <picture className="w-full lg:h-[600px] overflow-hidden flex items-center justify-center">
          <img
            src={eventFound.imagen}
            alt={eventFound.nombre}
            className="block object-cover w-full"
          />
        </picture>

        <div className="grid lg:grid-cols-2">
          <div className="order-last lg:order-first">
            {/* <div className="flex items-start justify-start">
              <BreadCrumb links={breadcrumbLinks} title={eventFound.nombre} />
            </div> */}
            <div className="flex flex-col gap-5 px-10 py-5">
              <div className="flex items-center gap-4">
                <span className="text-xl font-semibold text-black">
                  {eventFound.nombre}
                </span>
              </div>

              <div className="text-[#878787] mt-4 space-y-6">
                <span className="text-lg font-semibold text-gray-700">
                  Descripción
                </span>

                <p className="text-justify">
                  ¿Te gustaría participar en un evento internacional? Te
                  invitamos a formar parte del Simposio del I Encuentro
                  Internacional sobre la discapacidad que estará avalado por
                  varias Universidades Nacionales e Internacionales y las
                  empresas, que se realizará el 26 y 27 de Julio del 2024 en el
                  Cantón Balsas provincia de El Oro-Ecuador.
                </p>

                <p className="text-justify">
                  En este Encuentro Internacional podrás aprender sobre los
                  derechos de las personas con discapacidad, compartir
                  experiencias con expertos y activistas, y conocer las mejores
                  prácticas para promover una sociedad más inclusiva y diversa.
                  No pierdas esta oportunidad de ampliar tus conocimientos, tu
                  red de contactos y tu compromiso social. Inscríbete ya en
                  nuestra página web y reserva tu cupo. ¡Te esperamos!
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center w-full my-4">
            <EventCard
              onClick={onOpenChange}
              fecha_fin={formatDate(eventFound.fecha_fin)}
              fecha_inicio={formatDate(eventFound.fecha_inicio)}
              descripcion={eventFound.descripcion}
              modalidad={eventFound.Modalidad?.nombre}
              hora={eventFound.hora}
            />
          </div>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} />
        </div>
      </main>
    </Layout>
  );
};

export default EventoDetallePage;
