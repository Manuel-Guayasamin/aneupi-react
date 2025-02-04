import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../components/navigation/BreadCrumb";
import Subtitle from "../../components/ui/Subtitle";
import { fetchEstados } from "../../redux/slices/estadosSlice";
import { fetchActiveEvents } from "../../redux/slices/eventSlice";
import { fetchModalidades } from "../../redux/slices/modalidadesSlice";
import Layout from "../layout";
import FormularioSection from "./sections/FormularioSection";
import { Link } from "react-router-dom";
import { Button, Image } from "@nextui-org/react";

const breadcrumbLinks = [
  { label: "Inicio", path: "/" },
  { label: "Eventos", path: "/eventos" },
];

const Eventos = () => {
  const dispatch = useDispatch();
  const active = useSelector((state) => state.authentication.active);
  const eventos = useSelector((state) => state.eventos.eventos);

  useEffect(() => {
    dispatch(fetchActiveEvents());
    dispatch(fetchModalidades());
    dispatch(fetchEstados());
  }, [dispatch]);

  return (
    <Layout>
      <BreadCrumb links={breadcrumbLinks} title="Eventos" />
      <article className="max-w-screen-xl mx-auto space-y-4 px-4">
        <Subtitle title="Consulta Nuestros Eventos" />
        {eventos?.length > 0 ? (
          <>
            <main className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 !mt-10">
              {eventos?.map((evento) => (
                <div className="card  bg-base-100 shadow-xl" key={evento.id}>
                  <picture className="h-96">
                    <Image
                      src={evento.imagen}
                      isBlurred
                      isZoomed
                      radius="none"
                      alt={evento.nombre}
                      className="object-fit w-full h-96"
                    />
                  </picture>
                  <div className="flex flex-col p-4 gap-4">
                    <h2 className="text-[#00335f] text-xl font-semibold">
                      {evento.nombre}
                    </h2>
                    <p className="text-sm truncate">{evento.descripcion}</p>
                    <div className="card-actions justify-end mt-2">
                      <Button
                        as={Link}
                        radius="none"
                        to={`/eventos/${evento.id}`}
                        className="btn bg-[#00335f] hover:bg-[#004785] text-white"
                      >
                        Ver más
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </main>
          </>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border rounded-md overflow-hidden flex flex-col gap-4">
              <div className="skeleton w-full h-96"></div>
              <div className="space-y-4">
                <div className="skeleton h-6 rounded-full w-52 ml-5"></div>
                <div className="skeleton h-4 rounded-full w-72 ml-5"></div>
                <div className="flex justify-end">
                  <div className="skeleton h-12 rounded-lg w-32 relative mr-5 mb-3"></div>
                </div>
              </div>
            </div>
            <div className="border hidden md:flex rounded-md overflow-hidden  flex-col gap-4">
              <div className="skeleton w-full h-96"></div>
              <div className="space-y-4">
                <div className="skeleton h-6 rounded-full w-52 ml-5"></div>
                <div className="skeleton h-4 rounded-full w-72 ml-5"></div>
                <div className="flex justify-end">
                  <div className="skeleton h-12 rounded-lg w-32 relative mr-5 mb-3"></div>
                </div>
              </div>
            </div>
            <div className="border hidden md:flex rounded-md overflow-hidden  flex-col gap-4">
              <div className="skeleton w-full h-96"></div>
              <div className="space-y-4">
                <div className="skeleton h-6 rounded-full w-52 ml-5"></div>
                <div className="skeleton h-4 rounded-full w-72 ml-5"></div>
                <div className="flex justify-end">
                  <div className="skeleton h-12 rounded-lg w-32 relative mr-5 mb-3"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <section className="p-4" id="inscripcion">
          <article className="max-w-screen-xl py-4 mx-auto md:py-12">
            <FormularioSection />
          </article>
        </section>
      </article>
    </Layout>
  );
};

export default Eventos;
