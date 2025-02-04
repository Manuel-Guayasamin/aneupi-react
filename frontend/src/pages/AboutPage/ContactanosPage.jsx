import { useState, useEffect } from "react";
import Layout from "../layout";
import BreadCrumb from "../../components/navigation/BreadCrumb";
import FormularioSectionModal from "../../layouts/sections/FormularioSectionModal"; // Importa el componente modal FormularioSection
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SocialSection from "../../layouts/sections/SocialSection"; // Importa el componente SocialSection
import ValorCard from "./MissionPage/components/ValorCard";
import MapaSection from "../../layouts/sections/MapaSection"; // Importa el componente MapaSection
import BarraImagenes from "../OfertaPage/components/BarraImagenes";
import Subtitle from "../../components/ui/Subtitle";
import { FaBriefcase } from "react-icons/fa";
import { IoMdHelp } from "react-icons/io";
import { TbMailFilled } from "react-icons/tb";
import { BiPhoneCall } from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { getAllPaises } from "../../redux/slices/paisesSlice";
import { useDispatch, useSelector } from "react-redux";
import NotifyWhatsapp from "../../components/ui/NotifyWhatsapp";
import { createContacto } from "../../redux/slices/contactosSlice";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Card,
  CardFooter,
  CardBody,
  CardHeader,
  Autocomplete,
  AutocompleteItem,
  Textarea,
  Avatar,
  useDisclosure,
  ScrollShadow,
} from "@nextui-org/react";
import { ContactoSchema } from "../../data/zodValidations";
import { useForm } from "react-hook-form";
// Componente funcional de la página de Contactanos
function ContactanosPage() {
  const breadcrumbLinks = [
    { label: "Inicio", path: "/" },
    { label: "Servicios" },
    { label: "Contáctanos", path: "/contactanos" },
  ];
  const [isFollowed, setIsFollowed] = useState(false);
  const [paisId, setPaisId] = useState("");
  const [data, setData] = useState([
    ["+593 983341084", "Presidencia", "Henry Ricardo Erraez"],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
  ]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const paises = useSelector((state) => state.paises.paises);

  const [showNotification, setShowNotification] = useState(false);

  // Inicializar react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(getAllPaises());
  }, [dispatch]);

  useEffect(() => {
    if (!isOpen) {
      reset(); // Esta función reinicia el formulario y los errores
    }
  }, [isOpen, reset]);

  // Función para manejar el envío del formulario
  const onSubmit = (data) => {
    const { success, error } = ContactoSchema.safeParse({
      ...data,
      pais_id: paisId,
    });
    if (!success) {
      console.log(error);
      return;
    }
    dispatch(createContacto(data)).then(() => reset());
    //setShowModal(false); // Cerrar el modal después del envío
    //setShowNotification(true);
    // reset();
  };

  // Función para manejar los cambios en los datos de la tabla
  const handleDataChange = (value, rowIndex, colIndex) => {
    const newData = [...data];
    newData[rowIndex][colIndex] = value;
    setData(newData);
  };

  const personas = [
    {
      id: 1,
      nombre: "Juan Pérez",
      profesion: "ING",
      opinion: "Un gusto haber realizado los poryectos con ustedes",
      fecha: "2024-09-15",
      nombreUsuario: "jperez01",
      img: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      pais: "Ecuador",
    },
    {
      id: 2,
      nombre: "María Gómez",
      profesion: "PH.D",
      opinion:
        "Desde Perú, es un gusto estar trabajando en estos proyectos con ustedes.",
      fecha: "2024-09-14",
      nombreUsuario: "mgomez02",
      img: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
      pais: "Perú",
    },
    {
      id: 3,
      nombre: "Carlos Ramírez",
      profesion: "MED",
      opinion:
        "Los proyectos fueron retadores, pero el apoyo del equipo fue excepcional.",
      fecha: "2024-09-13",
      nombreUsuario: "cramirez03",
      img: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      pais: "Colombia",
    },
    {
      id: 4,
      nombre: "Ana López",
      profesion: "BIO",
      opinion:
        "Excelente coordinación y trabajo en equipo. Me encantó formar parte del proyecto.",
      fecha: "2024-09-12",
      nombreUsuario: "alopez04",
      img: "https://i.pravatar.cc/150?u=a04258114e29026302d",
      pais: "Chile",
    },
  ];

  const personas2 = [
    {
      id: 5,
      nombre: "Luis Martínez",
      profesion: "ARQ",
      opinion:
        "Fue un placer trabajar en proyectos tan bien organizados y desafiantes.",
      fecha: "2024-09-11",
      nombreUsuario: "lmartinez05",
      img: "https://i.pravatar.cc/150?u=a04258114e29026702d",
      pais: "Argentina",
    },
    {
      id: 6,
      nombre: "Sofía Torres",
      profesion: "ING",
      opinion:
        "La coordinación y el enfoque en los detalles hicieron que todo fluyera perfectamente.",
      fecha: "2024-09-10",
      nombreUsuario: "storres06",
      img: "https://i.pravatar.cc/150?u=a04258114e29026708c",
      pais: "Brasil",
    },
    {
      id: 7,
      nombre: "Ricardo Sánchez",
      profesion: "ABG",
      opinion:
        "Me sentí muy apoyado por todo el equipo durante el desarrollo del proyecto.",
      fecha: "2024-09-09",
      nombreUsuario: "rsanchez07",
      img: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      pais: "Uruguay",
    },
    {
      id: 8,
      nombre: "Gabriela Fernández",
      profesion: "PH.D",
      opinion:
        "Los proyectos fueron muy interesantes y la colaboración fue excelente.",
      fecha: "2024-09-08",
      nombreUsuario: "gfernandez08",
      img: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
      pais: "Paraguay",
    },
  ];

  return (
    <Layout>
      {/* Breadcrumb */}
      <BreadCrumb links={breadcrumbLinks} title="Contáctanos" />
      <main className=" w-[90%] mx-auto py-5">
        <h3 className="text-4xl font-bold text-[#00335f] col-span-2 text-center">
          Contactános para realizar nuevos proyectos
        </h3>
        <section className="space-y-5 mb-10">
          <h3 className="text-2xl font-semibold text-[#00335f]">Opiniones</h3>
          <Swiper
            spaceBetween={0}
            // autoplay={{
            //   delay: 3500,
            //   disableOnInteraction: false,
            // }}
            loop
            className="cursor-grab"
            modules={[Pagination, Navigation]}
          >
            <SwiperSlide>
              <div className="grid grid-cols-1 md:grid-cols-4  gap-5 px-2">
                {personas.map((persona, index) => (
                  <Card
                    key={index}
                    shadow="none"
                    className="border-2  border-[#00335f]"
                  >
                    <CardHeader className="justify-between">
                      <div className="flex gap-2">
                        <Avatar
                          classNames={{
                            base: "border-2 border-[#00335f]",
                          }}
                          radius="full"
                          size="md"
                          src={persona.img}
                        />
                        <div className="flex flex-col gap-1 items-start justify-center">
                          <h4 className="text-small font-semibold leading-none text-default-600">
                            {persona.profesion} {persona.nombre}
                          </h4>
                          <h5 className="text-small tracking-tight text-default-400">
                            @{persona.nombreUsuario}
                          </h5>
                        </div>
                      </div>
                      <p className="text-sm">{persona.pais}</p>
                      {/* <Button
                        className={
                          isFollowed
                            ? "bg-transparent text-foreground border-default-200"
                            : ""
                        }
                        color="primary"
                        radius="full"
                        size="sm"
                        variant={isFollowed ? "bordered" : "solid"}
                        onPress={() => setIsFollowed(!isFollowed)}
                      >
                        {isFollowed ? "Unfollow" : "Follow"}
                      </Button> */}
                    </CardHeader>
                    <CardFooter className="px-3  text-small text-default-600">
                      <p>{persona.opinion}</p>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="grid grid-cols-1 md:grid-cols-4  gap-5 px-2">
                {personas2.map((persona, index) => (
                  <Card
                    key={index}
                    shadow="none"
                    className="border-2  border-[#00335f]"
                  >
                    <CardHeader className="justify-between">
                      <div className="flex gap-2">
                        <Avatar
                          isBordered
                          radius="full"
                          size="md"
                          src={persona.img}
                        />
                        <div className="flex flex-col gap-1 items-start justify-center">
                          <h4 className="text-small font-semibold leading-none text-default-600">
                            {persona.profesion} {persona.nombre}
                          </h4>
                          <h5 className="text-small tracking-tight text-default-400">
                            @{persona.nombreUsuario}
                          </h5>
                        </div>
                      </div>
                      <p className="text-sm">{persona.pais}</p>
                      {/* <Button
                        className={
                          isFollowed
                            ? "bg-transparent text-foreground border-default-200"
                            : ""
                        }
                        color="primary"
                        radius="full"
                        size="sm"
                        variant={isFollowed ? "bordered" : "solid"}
                        onPress={() => setIsFollowed(!isFollowed)}
                      >
                        {isFollowed ? "Unfollow" : "Follow"}
                      </Button> */}
                    </CardHeader>
                    <CardFooter className="px-3  text-small text-default-600">
                      <p>{persona.opinion}</p>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </SwiperSlide>
          </Swiper>
        </section>
        <section className="grid md:grid-cols-2 gap-10 my-20">
          <article className="space-y-4 ">
            <p className="text-sm text-default-500 text-justify">
              ¡Únete a nosotros para desarrollar proyectos con una misión
              inspiradora para transformar vidas de las Personas con
              Discapacidad! Estamos comprometidos para desarrollar un proyectos
              innovadores a nivel Nacional e Internacional que promueva la
              inclusión real y la accesibilidad para Personas con Discapacidad.
              Este es tu momento para marcar una diferencia significativa:
              aporta tus ideas, habilidades y entusiasmo para crear soluciones
              que impacten positivamente en la vida de quienes enfrentan
              desafíos diarios. Tu participación en este proyecto no solo
              contribuirá a una sociedad justa y equitativa, sino que también te
              permitirá ser parte de un cambio real y duradero. ¡Postúlate hoy
              TU PROYECTO y sé el motor de una transformación que hará historia!
            </p>
            <p className="text-sm text-default-700 font-medium">
              Llámanos al número de teléfono:
            </p>
            <span className="flex items-center gap-3">
              <BiPhoneCall size={20} />
              <p className=" font-semibold"> +593 983341084.</p>
            </span>
            <h3 className="text-xl font-semibold text-[#00335f]">
              Escribenos en
            </h3>
            <span className="flex items-center gap-3">
              <TbMailFilled className="text-[#00335f]" size={20} />
              <a
                href="mailto:fundacionaneupi2020@gmail.com"
                target="_blank"
                className="font-semibold"
              >
                fundacionaneupi2020@gmail.com
              </a>
            </span>
            <span className="flex items-center gap-3">
              <FaFacebook className="text-[#00335f]" size={20} />
              <a
                href="https://www.facebook.com/aneupi.fundacion"
                className="font-semibold"
                target="_blank"
              >
                Facebook
              </a>
            </span>
            <span className="flex items-center gap-3">
              <FaInstagram className="text-[#00335f]" size={20} />
              <a
                href="https://www.instagram.com/fundacion_aneupi/"
                target="_blank"
                className="font-semibold"
              >
                Instagram
              </a>
            </span>
            <span className="flex items-center gap-3">
              <FaXTwitter className="text-[#00335f]" size={20} />
              <a
                href="https://www.facebook.com/aneupi.fundacion"
                target="_blank"
                className="font-semibold"
              >
                X
              </a>
            </span>
          </article>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4  order-first md:order-last"
          >
            <h3 className="font-semibold text-xl text-[#00335f] ">
              Envíanos un mensaje
            </h3>

            <fieldset className="grid md:grid-cols-2 gap-3">
              <Input
                {...register("nombres")}
                placeholder="Henry Ricardo"
                label="Nombres"
                variant="faded"
              />
              <Input
                {...register("apellidos")}
                placeholder=" Erraez"
                label="Apellidos"
                variant="faded"
              />
            </fieldset>
            <fieldset>
              <Input
                {...register("email")}
                placeholder="ejemplo@ejemplo.com"
                label="Email"
                type="email"
                variant="faded"
              />
            </fieldset>
            <fieldset>
              <Input
                {...register("telefono")}
                placeholder="0983341084"
                label="Teléfono"
                type="text"
                variant="faded"
              />
            </fieldset>
            <fieldset className="grid md:grid-cols-2 gap-3">
              <Autocomplete
                selectedKey={paisId}
                onSelectionChange={setPaisId}
                placeholder="Seleccione un país"
                variant="faded"
                label="País"
              >
                {paises.map((pais, index) => (
                  <AutocompleteItem key={pais.id}>
                    {pais.nombre}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
              <Input
                {...register("canton")}
                placeholder="Cuenca / Gatito Plis / Susudel"
                label="Cantón - Ciudad"
                type="text"
                variant="faded"
              />
            </fieldset>
            <fieldset>
              <Textarea
                {...register("mensaje")}
                placeholder="Puedes escribir un mensaje sobre tu proyecto a proponer"
                label="Mensaje"
                type="text"
                variant="faded"
              />
            </fieldset>
            <Button type="submit" fullWidth color="warning">
              Propón tu Proyecto
            </Button>
          </form>
        </section>

        <section>
          <Subtitle title="Nuestros Proyectos" />
          <BarraImagenes />
        </section>
      </main>

      <NotifyWhatsapp
        showNotification={showNotification}
        setShowNotification={setShowNotification}
      />

      {/* Agrega el formulario modal */}
      <FormularioSectionModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        paises={paises}
        errors={errors}
        reset={reset}
      />

      <SocialSection className={"p-7"} />
    </Layout>
  );
}

export default ContactanosPage;
