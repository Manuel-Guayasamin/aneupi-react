import React from "react";
import { useSelector } from "react-redux";
import { FaBookOpen, FaNewspaper, FaTrello } from "react-icons/fa";
import { Button } from "@nextui-org/button";
import { Link } from "react-router-dom";
// se crea el componente de validación de la biblioteca
const ValidationBiblioteca = () => {
  const active = useSelector((state) => state.authentication.active);

  return (
    !active && (
      <section className="p-4">
        <article className="max-w-screen-xl py-12 mx-auto">
          <header className="py-10 space-y-2 text-center bg-indigo-100 rounded-xl ">
            <h2 className="text-2xl font-bold text-[#00335f] md:text-4xl">
              ¡Únete a nuestra Biblioteca!
            </h2>
            <p>
              ¿Te gustaría contribuir a nuestra biblioteca digital? ¡Es muy
              fácil!
            </p>
            <div className="flex items-center justify-center py-10 text-lg">
              <ul>
                <li className="flex items-center gap-3">
                  <FaBookOpen />
                  Sube tus libros favoritos para que otros puedan disfrutarlos.
                </li>
                <li className="flex items-center gap-3">
                  <FaNewspaper />
                  Comparte tus revistas preferidas y mantén a nuestros lectores
                  actualizados.
                </li>
                <li className="flex items-center gap-3">
                  <FaTrello />
                  Publica tus artículos sobre una variedad de temas y comparte
                  tu conocimiento.
                </li>
              </ul>
            </div>

            <p className="max-w-md mx-auto text-sm text-gray-800 md:text-base">
              Usted debe tener una cuenta para poder participar.
            </p>
            <Button
              as={Link}
              to="/iniciar-sesion"
              className="bg-[#00335f] text-white"
            >
              Iniciar Sesión
            </Button>
          </header>
        </article>
      </section>
    )
  );
};

export default ValidationBiblioteca;
