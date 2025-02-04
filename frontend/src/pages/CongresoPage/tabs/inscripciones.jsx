import { Input, SelectItem, Select, Button } from "@nextui-org/react";
import { InputFile } from "../../../components/ui/InputFile";
import { HiUpload } from "react-icons/hi";
import { useState } from "react";
import { options, userType, modalidad, precios } from "../../../data/constants";
import PayPhonePayment from "../../../components/payments/PayPhonePayment";
import { FaWhatsapp } from "react-icons/fa6";
import { IoCheckmark } from "react-icons/io5";
import { Modal } from "../../../components/ui/Modal";
export const Inscripciones = () => {
  const [open, setOpen] = useState(false);

  return (
    <article className="grid grid-cols-1 md:grid-cols-2 p-4 gap-10">
      <section className="space-y-10 w-full ">
        <div>
          <h2 className="text-2xl font-bold text-[#00335f] md:text-4xl  ">
            ¿Te gustaría participar en un evento único y transformador?
          </h2>
          <p className=" mx-auto text-sm !leading-7 text-gray-500 lg:ml-0 text-justify">
            Te invitamos a formar parte del{" "}
            <span className="font-semibold">
              III Congreso Internacional de la Educación Inclusiva, Discapacidad
              desde la Praxis y la I Cumbre Internacional que estará avalado
            </span>{" "}
            por varias Universidades Nacionales e Internacionales y las
            empresas, que se realizará el Noviembre del 2025. En este Congreso
            podrás aprender sobre los derechos de las personas con discapacidad,
            compartir experiencias con expertos y activistas, y conocer las
            mejores prácticas para promover una sociedad más inclusiva y
            diversa. No pierdas esta oportunidad de ampliar tus conocimientos,
            tu red de contactos y tu compromiso social. Inscríbete ya en nuestra
            página web y reserva tu cupo.{" "}
          </p>
        </div>
        <div className="flex flex-col gap-2  relative">
          <Button
            onPress={() => setOpen(true)}
            className="bg-[#00335f] text-white col-span-2 w-full"
          >
            Inscribete ya!
          </Button>
          <div
            target="_blank"
            className="border-2 border-[#00335f] rounded-xl p-4 space-y-2 w-52"
          >
            <a
              href="https://whatsapp.com/channel/0029Vaf4il905MUazhwZ5M17"
              target="_blank"
              className="flex items-center gap-2 hover:underline"
            >
              {" "}
              <FaWhatsapp /> <p className="grow ">Consulta</p> <IoCheckmark />
            </a>
            <p className="flex items-center gap-2">
              {" "}
              <FaWhatsapp /> <p className="grow">+593 983341084</p>{" "}
              <IoCheckmark />
            </p>
          </div>
        </div>
        <Modal isOpen={open} onOpenChange={() => setOpen(!open)} />
      </section>
      <section>
        <article className="grid max-w-screen-lg gap-5 md:gap-10 mx-auto">
          <div className="space-y-2 ">
            <h3 className="text-2xl font-bold text-[#00335f] md:text-4xl">
              Costos de Inscripción
            </h3>
            <p>
              Realiza tú pago según tu ocupación actual y no olvides guardar tu
              comprobante.
            </p>
          </div>
          <div className="grid gap-5 md:gap-10 ">
            <div className="flex items-center justify-center text-white shadow colorcito card rounded-xl p-8">
              <h3 className="text-xl font-bold my-2">Precios accesibles</h3>
              <ul className="md:text-lg ">
                <li className="flex gap-2 items-center">
                  1. Profesionales o Docentes <IoCheckmark />
                </li>
                <li className="flex gap-2 items-center">
                  2. Público General y Estudiantes <IoCheckmark />
                </li>
                <li className="flex gap-2 items-center">
                  3. Personas con Discapacidad <IoCheckmark />
                </li>
              </ul>
            </div>
          </div>

          <PayPhonePayment />
        </article>
      </section>
    </article>
  );
};
