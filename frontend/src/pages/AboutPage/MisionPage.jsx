import Layout from "../layout";
import BreadCrumb from "../../components/navigation/BreadCrumb";
//importo las imagenes
import Subtitle from "../../components/ui/Subtitle";
import { Card, CardBody, Image } from "@nextui-org/react";
import AneupiIcon from "../../assets/brand/brand.png";
import Lottie from "lottie-react";
import animationData from "../../assets/animations/personaDiscapacitada.json";
import { products } from "../../data/constants";
import animationData2 from "../../assets/animations/personaDiscapacitada2.json";
const breadcrumbLinks = [
  { label: "Inicio", path: "/" },
  { label: "Nosotros", path: "/acerca-de-nosotros" },
  { label: "Misión y Visión", path: "/mision" },
];

function MisionPage() {
  return (
    <Layout>
      <BreadCrumb links={breadcrumbLinks} title="Misión y Visión" />
      <main className="space-y-16 my-10">
        <section>
          <article className="grid md:grid-cols-2  w-[90%] mx-auto ">
            <picture className="flex items-center justify-center ">
              <Lottie
                animationData={animationData}
                className="w-4/6 drop-shadow-xl"
                loop
              />
            </picture>
            <div className="flex flex-col justify-center border-3 border-[#00335f] rounded-2xl px-5">
              <h3 className="text-[#00335f]">Nuestra Misión</h3>
              <Subtitle>Todos unidos, nos superaremos y venceremos</Subtitle>
              <p className="text-justify">
                Promover, proteger y defender los derechos que históricamente
                han sido vulnerados para mejorar la dignidad de los ciudadanos
                que poseen una discapacidad mediante políticas, proyectos,
                acciones orientadas en el respeto de los derechos humanos, así
                como tratados y convenios internacionales de DD.HH para poder
                llegar a ser en un futuro una organización que pueda cumplir con
                todos los proyectos y necesidades adecuadas que genere tanto
                oportunidades como beneficios para todos(as) los miembros de la
                fundación para poder mejorar la calidad de vida y el trato de
                las instituciones hacia dicho grupo vulnerable.
              </p>
            </div>
          </article>
        </section>

        <section>
          <article className="grid md:grid-cols-2  w-[90%] mx-auto ">
            <div className="flex flex-col justify-center border-3 border-[#00335f] rounded-2xl p-5">
              <h3 className="text-[#00335f]">Nuestra Visión</h3>
              <Subtitle>
                Generar grandes líderes del mañana, con paciencia e integridad
              </Subtitle>
              <p className="text-justify">
                Ser una organización reconocida a nivel Nacional e Internacional
                por la lucha y defensa de los derechos humanos que están
                consagrados en la constitución así como sus leyes, tratados y
                convenios internacionales de los DD.HH de los ciudadanos que
                poseen una discapacidad sin que se origine ningún tipo de
                discriminación y así genere una convivencia entre todo para un
                buen desarrollo de la sociedad con una cultura de tolerancia,
                paz y libre de violencia entre los miembros y personas que se
                necesitan apoyo de la fundación ANEUPI.
              </p>
            </div>
            <picture className="flex items-center justify-center ">
              <Lottie
                animationData={animationData2}
                className="w-4/6  drop-shadow-xl"
                loop
              />
            </picture>
          </article>
        </section>
        <section className="flex justify-between mx-auto  w-[90%] ">
          <Card className="border-2 border-[#00335f] p-4">
            <CardBody className=" flex items-center justify-center overflow-hidden">
              <a
                href="https://aneupi.com/congreso-internacional"
                target="_blank"
              >
                <Image
                  radius="none"
                  isZoomed
                  isBlurred
                  removeWrapper
                  width={100}
                  src={AneupiIcon}
                />
              </a>
            </CardBody>
          </Card>
          {products.map((product, index) => (
            <Card className="border-3 border-[#00335f] p-4">
              <CardBody className=" flex items-center justify-center overflow-hidden">
                <a href={product.href} target="_blank">
                  <Image
                    radius="none"
                    isZoomed
                    isBlurred
                    removeWrapper
                    width={100}
                    src={product.image}
                  />
                </a>
              </CardBody>
            </Card>
          ))}
        </section>
      </main>
    </Layout>
  );
}

export default MisionPage;
