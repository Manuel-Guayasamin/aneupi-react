import { Link } from "react-router-dom";
import { FaLaptop } from "react-icons/fa6";

export const EventCard = ({
  modalidad,
  descripcion,
  onClick,
  fecha_inicio,
  fecha_fin,
  hora,
}) => {
  const isValidDateString = (dateString) => {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
  };

  if (!isValidDateString(fecha_inicio) || !isValidDateString(fecha_fin)) {
    return <div>Fecha inválida</div>;
  }

  // Ajusta las fechas manualmente para evitar problemas de zona horaria
  const adjustDate = (dateString) => {
    const date = new Date(dateString);
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() + userTimezoneOffset);
  };

  const fechaInicial = adjustDate(fecha_inicio);
  const fechaFinal = adjustDate(fecha_fin);

  const dayNumber = fechaInicial.getDate();
  const day = fechaInicial.toLocaleString("es-ES", { weekday: "long" });
  const month = fechaInicial.toLocaleString("es-ES", { month: "long" });
  const montShort = fechaInicial.toLocaleString("es-ES", { month: "short" });
  const year = fechaInicial.getFullYear();

  const dayNumberFinal = fechaFinal.getDate();
  const dayFinal = fechaFinal.toLocaleString("es-ES", { weekday: "long" });
  const monthFinal = fechaFinal.toLocaleString("es-ES", { month: "long" });

  return (
    <div className="bg-white rounded-md shadow-xl flex p-4 flex-col gap-6 mx-auto w-[80%]">
      <div className="flex gap-4 items-center relative">
        <div className="flex flex-col items-center justify-center border border-[#c0c0c0] rounded-xl w-24 h-24">
          <span className="text-2xl font-semibold text-black">{dayNumber}</span>
          <span className="text-[#a6a6a6] font-medium">
            {montShort.toUpperCase()}
          </span>
        </div>
        <div className="flex flex-col justify-center">
          <span className="font-semibold text-black">
            {day.charAt(0).toUpperCase() + day.slice(1)}{" "}
          </span>
          <span className="font-semibold text-black">
            {dayNumber === dayNumberFinal && month === monthFinal ? (
              <span className="font-semibold text-black">
                {dayNumber} de {month} {year}
              </span>
            ) : (
              <span className="font-semibold text-black">
                {dayNumber} de {month} {year} hasta el {dayFinal}{" "}
                {dayNumberFinal} de {monthFinal}{" "}
              </span>
            )}
          </span>
        </div>
        <div className="flex items-center gap-2 absolute right-0 top-0">
          <div className="bg-green-500 w-2 h-2 rounded-full"></div>
          <span>{modalidad}</span>
        </div>
      </div>
      <div className="w-full border-t bg-gray-400"></div>
      <div className="flex gap-2 items-center">
        <span>{descripcion}</span>
      </div>
      <button
        onClick={onClick}
        className="bg-black border-2 border-black py-3 w-full rounded-md text-white hover:bg-transparent hover:text-black transition-all duration-300 ease-in-out"
      >
        Inscríbete en el evento
      </button>
      <p className="text-lg">
        Para más Información{" "}
        <Link
          className="text-blue-500 hover:underline"
          target="_blank"
          to="https://whatsapp.com/channel/0029Vaf4il905MUazhwZ5M17"
        >
          contáctanos
        </Link>
      </p>
    </div>
  );
};
