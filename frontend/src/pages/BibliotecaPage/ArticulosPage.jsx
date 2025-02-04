import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../components/navigation/BreadCrumb";
import Subtitle from "../../components/ui/Subtitle";
import { fetchBibliotecas } from "../../redux/slices/bibliotecaSlice";
import Layout from "../layout";
import ReactPaginate from "react-paginate";
//import Valores from "./DetallesCard";
import LibroImage from "../../assets/images/libros/articulos.jpg";
import Banner from "../../assets/images/libros/articulos_banner.jpg";

const breadcrumbLinks = [
  { label: "Inicio", path: "/" },
  { label: "Biblioteca", path: "/biblioteca" },
  { label: "Artículos", path: "/articulos" },
];

const ArticulosPage = () => {
  const serverURL = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();
  const bibliotecas = useSelector((state) => state.bibliotecas.bibliotecas);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [shouldSearch, setShouldSearch] = useState(false);
  
  
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBiblioteca, setSelectedBiblioteca] = useState(null);

  useEffect(() => {
    dispatch(fetchBibliotecas());
  }, [dispatch]);

  useEffect(() => {}, [bibliotecas]);

  const handlePageChange = (data) => {
    setCurrentPage(data.selected + 1);
  };

  const handleSearch = () => {
    setShouldSearch(true);
    setSearchQuery(searchTerm);
  };


  const handleOpenModal = (biblioteca) => {
    setSelectedBiblioteca(biblioteca);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedBiblioteca(null);
  };


  const filteredBibliotecas = bibliotecas.filter(
    (biblioteca) =>
      biblioteca.id_tipo_biblioteca === 2 && biblioteca.id_estado === 2
  );


  let searchedBibliotecas = filteredBibliotecas;
  if (shouldSearch) {
    searchedBibliotecas = filteredBibliotecas.filter((biblioteca) =>
      biblioteca.titulo.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }


  const paginatedBibliotecas = searchedBibliotecas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

    
  const bibliotecasFormatted = paginatedBibliotecas.map((biblioteca) => ({
    id: biblioteca.id,
    titulo: biblioteca.titulo,
    descripcion: biblioteca.descripcion,
    fecha_Publicacion: biblioteca.fecha_publicacion,
    nombre_autor: biblioteca.nombre_autor,
    editorial: biblioteca.editorial,
    imagen: biblioteca.imagen,
    archivo: biblioteca.archivo,
  }));

  return (
    <Layout>
      {/* Banner */}
      <div
        className="top_site_main"
        style={{
          color: "rgb(255, 255, 255)",
          backgroundImage: `url(${Banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          paddingTop: "117px",
          position: "relative",
        }}
      >
        <span
          className="overlay-top-header"
          style={{
            background: "rgba(0,0,0,0.5)",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
          }}
        ></span>
        <div className="page-title-wrapper" style={{ position: "relative", zIndex: 2 }}>
          <div className="max-w-screen-xl mx-auto py-12 px-4">
            <a className="text-4xl">| ARTICULOS</a>
          </div>
        </div>
      </div>
      <BreadCrumb links={breadcrumbLinks} title="Artículos" />
      <div>
        <article className="grid items-center max-w-screen-xl py-12 mx-auto space-y-4 md:grid-cols-2">
          <main>
            <Subtitle>Bienvenido a nuestra colección de Artículos</Subtitle>
            <p>
              Cada título ha sido cuidadosamente propuesto por miembros de
              nuestra comunidad, garantizando una selección diversa y
              enriquecedora. Descubre obras que han inspirado y cautivado a
              otros, y encuentra tu próxima lectura imprescindible. ¡Explora
              ahora y déjate guiar por las recomendaciones de nuestros usuarios!
            </p>
          </main>
          <img
            className="transition duration-300 hover:scale-105"
            src={LibroImage}
            alt="Libros Ilustracion"
          />
        </article>
      </div>
      {filteredBibliotecas.length > 0 && (
        <section className="p-4">
          <article className="max-w-screen-xl py-12 mx-auto space-y-4 md:pt-24">
            <Subtitle title="Explora nuestra sección de Artículos" />
            <div className="flex w-full max-w-md mt-6">
              <input
                type="text"
                placeholder="Buscar artículo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 mr-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                className="inline-flex items-center px-4 py-2 text-sm font-bold text-white transition duration-300 ease-in-out transform border-2 rounded bg-colorcito hover:bg-white hover:text-colorcito hover:border-colorcito hover:scale-105"
                onClick={handleSearch}
              >
                Buscar
              </button>
            </div>
            <table className="w-full mt-10 table-auto border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2 border border-gray-300">Fecha de Publicación</th>
                  <th className="px-4 py-2 border border-gray-300">Título</th>
                  <th className="px-4 py-2 border border-gray-300">Autor</th>
                </tr>
              </thead>
              <tbody>
                {bibliotecasFormatted.map((biblioteca) => (
                  <tr key={biblioteca.id}>
                    <td className="px-4 py-2 border border-gray-300">
                      {new Date(biblioteca.fecha_Publicacion).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "long",
                      year: "numeric"
                    })}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      <button
                        onClick={() => handleOpenModal(biblioteca)}
                        className="text-blue-500 hover:underline"
                      >
                        {biblioteca.titulo}
                      </button>
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {biblioteca.nombre_autor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <br />
            <ReactPaginate
              breakLabel="..."
              previousLabel={"<"}
              nextLabel={">"}
              pageCount={Math.ceil(searchedBibliotecas.length / itemsPerPage)}
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              activeClassName={"grid place-items-center bg-primary text-white w-8 h-8"}
              previousClassName={"mr-2"}
              nextClassName={"ml-2"}
              disabledClassName={"disabled"}
              pageClassName="w-8 h-8 grid place-items-center"
              renderOnZeroPageCount={null}
            />
          </article>
        </section>
      )}

      {modalOpen && selectedBiblioteca && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className="w-11/12 max-w-lg mx-auto overflow-hidden bg-white rounded-lg shadow-xl"
            style={{ maxHeight: "80vh", overflowY: "auto" }}
          >
            <img
              src={`${serverURL}/${selectedBiblioteca.imagen}`}
              alt={selectedBiblioteca.titulo}
              className="object-cover w-full h-64"
              onError={(e) => {
                e.target.src = "fallback-image.jpg";
              }}
            />
            <div className="p-4">
              <h2 className="text-2xl font-bold">{selectedBiblioteca.titulo}</h2>
              <p>{selectedBiblioteca.descripcion}</p>
              <p>
                <strong>Autor:</strong> {selectedBiblioteca.nombre_autor}
              </p>
              <p>
                <strong>Editorial:</strong> {selectedBiblioteca.editorial}
              </p>
              <p>
                <strong>Fecha de Publicación:</strong>{" "}
                {new Date(selectedBiblioteca.fecha_Publicacion).toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <a
                href={`${serverURL}/${selectedBiblioteca.archivo}`}
                target="_blank"
                className="inline-flex items-center px-4 py-2 mr-4 text-sm font-bold text-white transition duration-300 ease-in-out transform border-2 rounded bg-colorcito hover:bg-white hover:text-colorcito hover:border-colorcito hover:scale-105"
                download
              >
                Leer
              </a>
              <button
                onClick={handleCloseModal}
                className="inline-flex items-center px-4 py-2 mt-4 text-sm font-bold text-white transition duration-300 ease-in-out transform border-2 rounded bg-colorcito hover:bg-white hover:text-colorcito hover:border-colorcito hover:scale-105"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ArticulosPage;
