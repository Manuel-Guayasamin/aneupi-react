import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import { FaWhatsapp } from "react-icons/fa";

export const Cronograma = () => {
  return (
    <section className="md:p-10 space-y-4">
      <div className="container mx-auto p-4 space-y-4">
        <div className=" ml-8">
          <Button
            as="a"
            target="_blank"
            href="https://whatsapp.com/channel/0029Vaf4il905MUazhwZ5M17"
            type="submit"
            variant="solid"
            className=" text-white"
            color="success"
          >
            Contactanos <FaWhatsapp />
          </Button>
        </div>
        <h1 className="text-3xl font-bold text-center mb-6">
          III Congreso Internacional "Educación Inclusiva y Discapacidad desde
          la Praxis"
        </h1>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 border-3 border-[#00335f]">
            <thead className="bg-[#00335f]">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  Día
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  Temática
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  Hora
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  Tema
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-200">
                <td
                  className="px-6 py-4 whitespace-nowrap font-semibold"
                  rowspan="14"
                >
                  Lunes 17 de Noviembre de 2025
                </td>
                <td
                  className="px-6 py-4  border-r-2 border-[#00335f]"
                  rowspan="14"
                >
                  Inauguración del III Congreso Internacional
                </td>
                <td className="px-6 py-4 whitespace-nowrap">09:00 - 09:30</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-gray-200">
                <td className="px-6 py-4 whitespace-nowrap">09:30 - 10:00</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>

              <tr className="bg-gray-200">
                <td className="px-6 py-4 whitespace-nowrap">10:30 - 11:00</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso</td>
              </tr>
              <tr className="bg-gray-200">
                <td className="px-6 py-4 whitespace-nowrap">11:00 - 11:30</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-gray-200">
                <td className="px-6 py-4 whitespace-nowrap">11:30 - 12:00</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-gray-200">
                <td className="px-6 py-4 whitespace-nowrap">12:00 - 12:30</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-gray-200">
                <td className="px-6 py-4 whitespace-nowrap">12:30 - 13:00</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-gray-200 relative">
                <td
                  colSpan="2"
                  className="px-6 py-4 text-center border-y-2 border-[#00335f]"
                >
                  Jornada Vespertina
                </td>
              </tr>
              <tr className="bg-gray-200">
                <td className="px-6 py-4 whitespace-nowrap">15:00 - 15:20</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-gray-200">
                <td className="px-6 py-4 whitespace-nowrap">15:30 - 16:00</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-gray-200">
                <td className="px-6 py-4 whitespace-nowrap">16:00 -16:30</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-gray-200">
                <td className="px-6 py-4 whitespace-nowrap">16:00 - 16:30</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-gray-200">
                <td className="px-6 py-4 whitespace-nowrap">16:30 - 16:45</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-gray-200">
                <td className="px-6 py-4 whitespace-nowrap">16:45 - 17:30</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>

              <tr className="bg-white border-t-3 border-[#00335f] ">
                <td
                  className="px-6 py-4 whitespace-nowrap font-semibold"
                  rowspan="14"
                >
                  Martes 18 de noviembre de 2025
                </td>
                <td
                  className="px-6 py-4 border-r-2 border-[#00335f] "
                  rowspan="14"
                >
                  Temáticas relacionadas a la Psicología
                </td>
                <td className="px-6 py-4 whitespace-nowrap">09:00 - 09:30</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap">09:30 - 10:00</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>

              <tr className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap">10:30 - 11:00</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso</td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap">11:00 - 11:30</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap">11:30 - 12:00</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap">12:00 - 12:30</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap">12:30 - 13:00</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-white relative">
                <td
                  colSpan="2"
                  className="px-6 py-4 text-center border-y-2 border-[#00335f]"
                >
                  Jornada Vespertina
                </td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap">15:00 - 15:20</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap">15:30 - 16:00</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap">16:00 -16:30</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap">16:00 - 16:30</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap">16:30 - 16:45</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap">16:45 - 17:30</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>

              <tr className="bg-gray-200 border-t-3 border-[#00335f] ">
                <td
                  className="px-6 py-4 whitespace-nowrap font-semibold"
                  rowspan="14"
                >
                  Miércoles 19 de noviembre de 2025
                </td>
                <td
                  className="px-6 py-4  border-r-2 border-[#00335f]"
                  rowspan="14"
                >
                  Temáticas relacionadas al software
                </td>
                <td className="px-6 py-4 whitespace-nowrap">09:00 - 09:30</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-gray-200">
                <td className="px-6 py-4 whitespace-nowrap">09:30 - 10:00</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>

              <tr className="bg-gray-200">
                <td className="px-6 py-4 whitespace-nowrap">10:30 - 11:00</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso</td>
              </tr>
              <tr className="bg-gray-200">
                <td className="px-6 py-4 whitespace-nowrap">11:00 - 11:30</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-gray-200">
                <td className="px-6 py-4 whitespace-nowrap">11:30 - 12:00</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-gray-200">
                <td className="px-6 py-4 whitespace-nowrap">12:00 - 12:30</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-gray-200">
                <td className="px-6 py-4 whitespace-nowrap">12:30 - 13:00</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-gray-200 relative">
                <td
                  colSpan="2"
                  className="px-6 py-4 text-center border-y-2 border-[#00335f]"
                >
                  Jornada Vespertina
                </td>
              </tr>
              <tr className="bg-gray-200">
                <td className="px-6 py-4 whitespace-nowrap">15:00 - 15:20</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-gray-200">
                <td className="px-6 py-4 whitespace-nowrap">15:30 - 16:00</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-gray-200">
                <td className="px-6 py-4 whitespace-nowrap">16:00 -16:30</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-gray-200">
                <td className="px-6 py-4 whitespace-nowrap">16:00 - 16:30</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-gray-200">
                <td className="px-6 py-4 whitespace-nowrap">16:30 - 16:45</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-gray-200">
                <td className="px-6 py-4 whitespace-nowrap">16:45 - 17:30</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-white border-t-3 border-[#00335f] ">
                <td
                  className="px-6 py-4 whitespace-nowrap font-semibold"
                  rowspan="14"
                >
                  Jueves 20 de noviembre de 2025
                </td>
                <td
                  className="px-6 py-4  border-r-2 border-[#00335f]"
                  rowspan="14"
                >
                  Temáticas relacionadas a la Psicología
                </td>
                <td className="px-6 py-4 whitespace-nowrap">09:00 - 09:30</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap">09:30 - 10:00</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>

              <tr className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap">10:30 - 11:00</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso</td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap">11:00 - 11:30</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap">11:30 - 12:00</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap">12:00 - 12:30</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap">12:30 - 13:00</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-white relative">
                <td
                  colSpan="2"
                  className="px-6 py-4 text-center border-y-2 border-[#00335f]"
                >
                  Jornada Vespertina
                </td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap">15:00 - 15:20</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap">15:30 - 16:00</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap">16:00 -16:30</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap">16:00 - 16:30</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap">16:30 - 16:45</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap">16:45 - 17:30</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-gray-200  border-t-3 border-[#00335f] ">
                <td
                  className="px-6 py-4 whitespace-nowrap font-semibold"
                  rowspan="14"
                >
                  Viernes 21 de noviembre de 2025
                </td>
                <td
                  className="px-6 py-4 border-r-2 border-[#00335f]"
                  rowspan="14"
                >
                  Otro ¿Cuál es su propuesta para materializar la educación
                  inclusiva de manera real superior a favor de la discapacidad
                  desde la praxis?
                </td>
                <td className="px-6 py-4 whitespace-nowrap">09:00 - 09:30</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-gray-200">
                <td className="px-6 py-4 whitespace-nowrap">09:30 - 10:00</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>

              <tr className="bg-gray-200">
                <td className="px-6 py-4 whitespace-nowrap">10:30 - 11:00</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso</td>
              </tr>
              <tr className="bg-gray-200">
                <td className="px-6 py-4 whitespace-nowrap">11:00 - 11:30</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-gray-200">
                <td className="px-6 py-4 whitespace-nowrap">11:30 - 12:00</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-gray-200">
                <td className="px-6 py-4 whitespace-nowrap">12:00 - 12:30</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-gray-200">
                <td className="px-6 py-4 whitespace-nowrap">12:30 - 13:00</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-gray-200 relative">
                <td
                  colSpan="2"
                  className="px-6 py-4 text-center border-y-2 border-[#00335f]"
                >
                  Jornada Vespertina
                </td>
              </tr>
              <tr className="bg-gray-200">
                <td className="px-6 py-4 whitespace-nowrap">15:00 - 15:20</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-gray-200">
                <td className="px-6 py-4 whitespace-nowrap">15:30 - 16:00</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-gray-200">
                <td className="px-6 py-4 whitespace-nowrap">16:00 -16:30</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-gray-200">
                <td className="px-6 py-4 whitespace-nowrap">16:00 - 16:30</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-gray-200">
                <td className="px-6 py-4 whitespace-nowrap">16:30 - 16:45</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-gray-200">
                <td className="px-6 py-4 whitespace-nowrap">16:45 - 17:30</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>

              <tr className="bg-white border-t-3 border-[#00335f] ">
                <td
                  className="px-6 py-4 whitespace-nowrap font-semibold"
                  rowspan="14"
                >
                  Sábado 22 de noviembre de 2025
                </td>
                <td
                  className="px-6 py-4 border-r-2 border-[#00335f]"
                  rowspan="14"
                >
                  Festival Intercultural para Retorno
                </td>
                <td className="px-6 py-4 whitespace-nowrap">09:00 - 09:30</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap">09:30 - 10:00</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>

              <tr className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap">10:30 - 11:00</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso</td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap">11:00 - 11:30</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap">11:30 - 12:00</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap">12:00 - 12:30</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap">12:30 - 13:00</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-white relative">
                <td
                  colSpan="2"
                  className="px-6 py-4 text-center border-y-2 border-[#00335f]"
                >
                  Jornada Vespertina
                </td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap">15:00 - 15:20</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap">15:30 - 16:00</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap">16:00 -16:30</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap">16:00 - 16:30</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap">16:30 - 16:45</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap">16:45 - 17:30</td>
                <td className="px-6 py-4 whitespace-nowrap">En proceso </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
