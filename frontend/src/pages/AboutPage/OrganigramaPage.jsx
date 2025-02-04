import { useState } from "react";
import Layout from "../layout";
import BreadCrumb from "../../components/navigation/BreadCrumb";
import { Card, CardBody, CardFooter, Button, Image } from "@nextui-org/react";
import AneupiIcon from "../../assets/brand/brand.png";
import { products } from "../../data/constants";
import { FaWhatsapp } from "react-icons/fa";
const breadcrumbLinks = [
  { label: "Inicio", path: "/" },
  { label: "Nosotros", path: "/acerca-de-nosotros" },
  { label: "Organigrama", path: "/organigrama" },
];

function OrganigramaPage() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const cooperativa = ["Presidente", "Gerente", "Directores"];
  const gatitoplis = ["Presidente", "Gerente", "Directores"];
  const academia = ["Gerente", "Supervisor", "Directores"];
  const leceni = ["Presidente", "Gerente", "Directores"];
  const tvaneupi = ["Presidente", "Gerente"];

  const areas = [
    "Departamento Financiero",
    "Departamento de comunicación",
    "Departamento de software",
    "Departamento de contabilidad",
    "Departamento de ventas",
  ];

  const personal = [
    "Contador",

    "Comunicador",
    "Desarrollador",
    "Contador",
    "Administrador de Empresas",
  ];

  return (
    <Layout>
      <BreadCrumb links={breadcrumbLinks} title="Organigrama" />
      <div className="space-y-24 max-w-[90%] mx-auto mb-10">
        <div>
          <div className="flex items-center justify-center my-3 p-2">
            <Card className="border-3 border-[#00335f] flex items-center justify-center">
              <CardBody>
                <a href="https://aneupi.com/congreso-internacional">
                  <Image
                    src={AneupiIcon}
                    alt="Fundación ANEUPI"
                    width={250}
                    height={250}
                  />
                </a>
              </CardBody>
            </Card>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center relative">
            <span className="hidden md:block absolute left-0 border-2 border-[#00335f] h-10 md:w-44 md:h-0" />
            <span className="hidden md:block absolute left-0 border-2 border-[#00335f] h-screen top-8" />

            <Card className="border-2 border-warning">
              <CardBody className="text-center">Presidente</CardBody>
            </Card>
            <span className="border-2 border-[#00335f] h-10 md:w-16 md:h-0" />
            <div className="flex flex-col">
              <Card className="bg-[#00335f] ">
                <CardBody className="text-white font-bold text-4xl flex flex-col items-center justify-center">
                  Organigrama de la Fundación ANEUPI
                </CardBody>
              </Card>
            </div>
            <span className="border-2 border-[#00335f] h-10 md:w-16 md:h-0" />
            <Card className="border-2 border-warning">
              <CardBody className="text-center">Representante Legal</CardBody>
            </Card>
          </div>

          <section className="">
            <div className="flex flex-col items-center justify-center">
              <span className={` border-2 border-[#00335f] h-6  `} />
            </div>
            <div clas>
              <div className="border-t-3 border-[#00335f] max-w-[90%] mx-auto"></div>
              <div className="flex max-w-[90%] mx-auto justify-between">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center "
                  >
                    <span className={` border-2 border-[#00335f] h-6  `} />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col md:flex-row w-[98%] mx-auto">
              {products.map((product) => (
                <>
                  <Card
                    className="border-2 border-[#00335f] basis-1/5"
                    key={product.id}
                  >
                    <CardBody className="flex items-center justify-center">
                      <a href={product.href} target="_blank">
                        <Image
                          isZoomed
                          radius="none"
                          width={100}
                          src={product.image}
                          alt=""
                        />
                      </a>
                    </CardBody>
                    <CardFooter className="flex md:hidden flex-col gap-2">
                      {product.roles.map((role, index) => (
                        <p
                          key={index}
                          className="text-center py-3 w-full border-2 border-warning rounded-xl"
                        >
                          {role}
                        </p>
                      ))}
                    </CardFooter>
                  </Card>
                  <div
                    className={`
              ${product.id === products.length ? "hidden" : "block"}
                md:w-16 flex items-center `}
                  >
                    <span className="border border-[#00335f] h-10 md:w-16 md:h-0" />
                  </div>
                </>
              ))}
            </div>
            <div className="hidden md:grid md:grid-cols-5 gap-8 md:gap-16 w-[98%] mx-auto">
              <div className=" ">
                {cooperativa.map((item, index) => (
                  <div className="relative">
                    <div className="flex flex-col items-center justify-center">
                      <span
                        className={`${
                          index === cooperativa.length ? "hidden" : "block"
                        } border-2 border-[#00335f] h-6  `}
                      />
                      <span
                        className={`${
                          index === cooperativa.length ? "hidden" : "block"
                        } bg-[#00335f] w-2 h-2 triangle`}
                      />
                    </div>
                    <Card className="border-2 border-warning" key={index}>
                      <CardBody className="text-center">{item}</CardBody>
                    </Card>
                  </div>
                ))}
              </div>
              <div>
                {gatitoplis.map((item, index) => (
                  <div>
                    <div className="flex flex-col items-center justify-center">
                      <span
                        className={`${
                          index === gatitoplis.length ? "hidden" : "block"
                        } border-2 border-[#00335f] h-6  `}
                      />
                      <span
                        className={`${
                          index === gatitoplis.length ? "hidden" : "block"
                        } bg-[#00335f] w-2 h-2 triangle`}
                      />
                    </div>
                    <Card className="border-2 border-warning" key={index}>
                      <CardBody className="text-center">{item}</CardBody>
                    </Card>
                  </div>
                ))}
              </div>
              <div>
                {academia.map((item, index) => (
                  <div>
                    <div className="flex flex-col items-center justify-center">
                      <span
                        className={`${
                          index === academia.length ? "hidden" : "block"
                        } border-2 border-[#00335f] h-6  `}
                      />
                      <span
                        className={`${
                          index === academia.length ? "hidden" : "block"
                        } bg-[#00335f] w-2 h-2 triangle`}
                      />
                    </div>
                    <Card className="border-2 border-warning" key={index}>
                      <CardBody className="text-center">{item}</CardBody>
                    </Card>
                  </div>
                ))}
              </div>
              <div>
                {leceni.map((item, index) => (
                  <div>
                    <div className="flex flex-col items-center justify-center">
                      <span
                        className={`${
                          index === leceni.length ? "hidden" : "block"
                        } border-2 border-[#00335f] h-6  `}
                      />
                      <span
                        className={`${
                          index === leceni.length ? "hidden" : "block"
                        } bg-[#00335f] w-2 h-2 triangle`}
                      />
                    </div>
                    <Card className="border-2 border-warning" key={index}>
                      <CardBody className="text-center">{item}</CardBody>
                    </Card>
                  </div>
                ))}
              </div>
              <div>
                {tvaneupi.map((item, index) => (
                  <div>
                    <div className="flex flex-col items-center justify-center">
                      <span
                        className={`${
                          index === tvaneupi.length ? "hidden" : "block"
                        } border-2 border-[#00335f] h-6  `}
                      />
                      <span
                        className={`${
                          index === tvaneupi.length ? "hidden" : "block"
                        } bg-[#00335f] w-2 h-2 triangle`}
                      />
                    </div>
                    <Card className="border-2 border-warning" key={index}>
                      <CardBody className="text-center">{item}</CardBody>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
        <div>
          <div className="flex items-center justify-center relative">
            <span className="hidden md:block absolute left-0 border-2 border-[#00335f] h-10 md:w-1/2 md:h-0" />

            <div>
              <Card className="text-center text-3xl  font-bold text-white bg-[#00335f] p-2">
                <CardBody>Áreas</CardBody>
              </Card>
              <div className="flex flex-col items-center justify-center">
                <span className={` border-2 border-[#00335f] h-6  `} />
                <span className={` bg-[#00335f] w-2 h-2 triangle`} />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center w-[98%] mx-auto">
            {areas.map((area, index) => (
              <>
                <Card
                  className="border-2 border-[#00335f] basis-1/5  "
                  key={index}
                >
                  <CardBody className="text-center font-semibold">
                    {area}
                  </CardBody>
                </Card>
                <span
                  className={`
              ${index === areas.length - 1 ? "hidden" : "block"}
                border-2 border-[#00335f] h-10 md:w-28 md:h-0`}
                />
              </>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-center relative">
            <span className="hidden md:block absolute left-0 border-2 border-[#00335f] h-10 md:w-1/2 md:h-0" />
            <span className="hidden md:block absolute left-0 border-2 border-[#00335f] h-screen bottom-14" />

            <div>
              <Card className="text-center text-3xl  font-bold text-white bg-[#00335f] p-2">
                <CardBody>Personal</CardBody>
              </Card>
              <div className="flex flex-col items-center justify-center">
                <span className={` border-2 border-[#00335f] h-6  `} />
                <span className={` bg-[#00335f] w-2 h-2 triangle`} />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center w-[98%] mx-auto">
            {personal.map((person, index) => (
              <>
                <Card
                  className="border-2 border-warning basis-1/5 h-20 "
                  key={index}
                >
                  <CardBody className="text-center font-semibold flex items-center justify-center">
                    {person}
                  </CardBody>
                </Card>
                <span
                  className={`
              ${index === personal.length - 1 ? "hidden" : "block"}
              border-2 border-[#00335f] h-10 md:w-28 md:h-0`}
                />
              </>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center mt-10">
            <p className="font-semibold text-xl text-center">
              El Organigrama está suceptible a cambios.
            </p>
            <p className="text-center">Para más información:</p>
            <Button
              as="a"
              href="https://api.whatsapp.com/send?phone=593983341084"
              target="_blank"
              variant="bordered"
              color="success"
              size="lg"
              className="mt-10 md:mt-5"
            >
              Contáctanos
              <FaWhatsapp className="text-3xl" />
            </Button>
          </div>
        </div>
      </div>

      {/* <section className="p-4">
        <div className="flex justify-center mb-12">
          <img
            src={OrganigramaImage}
            alt="Organigrama de la fundación ANEUPI"
            className="max-w-3xl h-auto rounded-lg shadow-lg cursor-pointer"
            onClick={openModal}
          />
        </div>
        <div className="max-w-4xl mx-auto px-4 mb-16">
          <p className="text-lg leading-relaxed text-justify">
            El organigrama de la fundación ANEUPI muestra la estructura
            jerárquica de nuestra organización, destacando los diferentes
            departamentos y roles que conforman nuestro equipo. Cada sección del
            organigrama representa una parte integral de nuestra misión y
            visión, trabajando juntos para lograr nuestros objetivos y servir
            mejor a nuestra comunidad.
          </p>
        </div>
      </section> */}
    </Layout>
  );
}

export default OrganigramaPage;
