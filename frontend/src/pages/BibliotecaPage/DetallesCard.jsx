import React, { useState } from "react";

const Valores = ({
  title,
  description,
  fecha_Publicacion,
  author,
  editorial,
  imagen,
  archivo,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const serverURL = import.meta.env.VITE_API_URL;

  const openModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="p-4 mb-6 border border-gray-300 rounded-lg shadow-md ">
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-indigo-800">{title}</h2>
        <div className="overflow-hidden aspect-w-10 aspect-h-9">
          <img
            src={`${serverURL}/${imagen}`}
            alt={title}
            className="object-cover w-full h-80"
            onError={(e) => {
              e.target.src = "URL_DE_IMAGEN_POR_DEFECTO";
            }}
          />
        </div>
        <div className="text-sm text-gray-700">
          <p>
            <strong>Autor:</strong> {author}
          </p>
          <p>
            <strong>Editorial:</strong> {editorial}
          </p>
        </div>
        <div className="flex justify-center">
          <button
            onClick={openModal}
            className="flex items-center px-4 py-2 text-sm font-bold text-white transition duration-300 ease-in-out transform border-2 rounded bg-colorcito hover:bg-white hover:text-blue-900 hover:border-blue-900 hover:scale-105"
          >
            Ver más
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className="w-11/12 max-w-lg mx-auto overflow-hidden bg-white rounded-lg shadow-xl"
            style={{ maxHeight: "80vh", overflowY: "auto" }}
          >
            <img
              src={`${serverURL}/${imagen}`}
              alt={title}
              className="object-cover w-full h-64"
              onError={(e) => {
                e.target.src = "URL_DE_IMAGEN_POR_DEFECTO";
              }}
            />
            <div className="p-6">
              <h2 className="mb-4 text-2xl font-bold text-indigo-800">
                {title}
              </h2>
              <p className="mb-2 text-sm text-gray-700">
                <strong>Autor:</strong> {author}
              </p>
              <p className="mb-2 text-sm text-gray-700">
                <strong>Descripción:</strong> {description}
              </p>
              <p className="mb-2 text-sm text-gray-700">
                <strong>Año de Publicación:</strong>{" "}
                {new Date(fecha_Publicacion).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
              <p className="mb-4 text-sm text-gray-700">
                <strong>Editorial:</strong> {editorial}
              </p>
              <a
                href={`${serverURL}/${archivo}`}
                target="_blank"
                className="inline-flex items-center px-4 py-2 mr-4 text-sm font-bold text-white transition duration-300 ease-in-out transform border-2 rounded bg-colorcito hover:bg-white hover:text-colorcito hover:border-colorcito hover:scale-105"
                download
              >
                Leer
              </a>

              <button
                onClick={handleCloseModal}
                className="inline-flex px-4 py-2 mb-4 mr-4 text-sm font-bold text-white transition duration-300 ease-in-out transform bg-gray-500 border-2 rounded hover:bg-bg-gray-600 hover:bg-bg-white hover:text-colorcito hover:border-colorcito hover:scale-105 "
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Valores;
