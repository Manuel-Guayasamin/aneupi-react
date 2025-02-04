import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../components/navigation/BreadCrumb";
import Subtitle from "../../components/ui/Subtitle";
import { fetchBibliotecas } from "../../redux/slices/bibliotecaSlice";
import Layout from "../layout";
import LibroImage from "../../assets/images/libros/revista.jpg";
import Banner from "../../assets/images/libros/revista_banner.jpg";
import ReactPaginate from "react-paginate";

const breadcrumbLinks = [
  { label: "Inicio", path: "/" },
  { label: "Biblioteca", path: "/biblioteca" },
  { label: "Revistas", path: "/revistas" },
];

const RevistasPage = () => {
  const serverURL = import.meta.env.VITE_API_URL;

  const dispatch = useDispatch();
  const bibliotecas = useSelector((state) => state.bibliotecas.bibliotecas);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [shouldSearch, setShouldSearch] = useState(false);

  useEffect(() => {
    dispatch(fetchBibliotecas());
  }, [dispatch]);

  const handlePageChange = (data) => {
    setCurrentPage(data.selected + 1);
  };

  const handleSearch = () => {
    setShouldSearch(true);
    setSearchQuery(searchTerm);
  };

  const filteredBibliotecas = bibliotecas.filter(
    (biblioteca) =>
      biblioteca.id_tipo_biblioteca === 3 && biblioteca.id_estado === 2
  );

  let searchedBibliotecas = filteredBibliotecas;
  if (shouldSearch) {
    searchedBibliotecas = filteredBibliotecas.filter((biblioteca) =>
      biblioteca.titulo.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const sortedBibliotecas = searchedBibliotecas
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  const revistas = sortedBibliotecas.slice(1); 
  const paginatedRevistas = revistas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const latestRevistas = filteredBibliotecas
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 1); 

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
          <a className="text-4xl">| REVISTAS</a>
          </div>
        </div>
      </div>

      <BreadCrumb links={breadcrumbLinks} title="Revistas" />
      <div className="max-w-screen-xl mx-auto py-12 px-4">
        <article className="grid gap-8 md:grid-cols-2 items-center">
          <div>
            <Subtitle>Bienvenido a nuestra colección de Revistas</Subtitle>
            <p>
              Cada título ha sido cuidadosamente propuesto por miembros de nuestra
              comunidad, garantizando una selección diversa y enriquecedora.
              Descubre obras que han inspirado y cautivado a otros, y encuentra tu
              próxima lectura imprescindible. ¡Explora ahora y déjate guiar por
              las recomendaciones de nuestros usuarios!
            </p>
          </div>
          <img
            className="transition duration-300 hover:scale-105 mx-auto"
            src={LibroImage}
            alt="Revistas Ilustracion"
          />
        </article>
        <article className="max-w-screen-xl mx-auto py-8">
          {latestRevistas.map((revista) => (
            <div key={revista.id} className="flex flex-col items-start mb-8">
              {/* Contenedor de la imagen */}
              <div className="relative mb-4 w-full max-w-[741px] h-[600px]">
                <a
                  className="block overflow-hidden w-full h-full"
                  href={`${serverURL}/${revista.archivo}`}
                  target="_blank"
                >
                  <img
                    src={`${serverURL}/${revista.imagen}`}
                    alt={revista.titulo}
                    className="w-full h-full object-cover"
                  />
                </a>
              </div>

              {/* Contenedor del texto */}
              <div className="px-4 w-full max-w-[741px]">
                <header className="mb-4">
                  <div className="text-lg font-bold">
                    {new Date(revista.fecha_publicacion).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "long",
                    })}
                  </div>
                  <div className="text-xl font-bold">
                    <a
                      href={`${serverURL}/${revista.archivo}`}
                      target="_blank"
                      className="hover:underline"
                    >
                      {revista.titulo}
                    </a>
                  </div>
                </header>
                <div className="mb-4">
                  <p>{revista.descripcion}</p>
                </div>
                <div>
                  <button
                    onClick={() => window.open(`${serverURL}/${revista.archivo}`, '_blank')}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-md bg-colorcito hover:bg-slate-700 focus:outline-none"
                  >
                    Leer más
                  </button>
                </div>
              </div>
            </div>
          ))}
        </article>
        <Subtitle>Más en revistas</Subtitle>
        {revistas.length > 0 && (
          <section className="py-4 px-4">
            <article className="max-w-screen-xl mx-auto px-4 py-8">
              <ul className="list-disc list-inside space-y-4">
                {paginatedRevistas.map((revista) => (
                  <li
                    key={revista.id}
                    className="flex items-center space-x-4 py-4 border-b border-gray-300 border-opacity-70 last:border-b-0"
                  >
                    <div className="flex-shrink-0">
                      <a href={`${serverURL}/${revista.archivo}`} target="_blank">
                        <img
                          className="object-cover w-32 h-32 rounded"
                          src={`${serverURL}/${revista.imagen}`}
                          alt={revista.titulo}
                        />
                      </a>
                    </div>
                    <div>
                      <h2 className="text-lg font-bold">
                        <a
                          href={`${serverURL}/${revista.archivo}`}
                          target="_blank"
                          className="no-underline hover:underline"
                        >
                          {revista.titulo}
                        </a>
                      </h2>
                      <p className="text-sm">{revista.descripcion}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex justify-center">
              <ReactPaginate
                breakLabel="..."
                previousLabel={"<"}
                nextLabel={">"}
                pageCount={Math.ceil(revistas.length / itemsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName={"pagination"}
                activeClassName={"grid place-items-center bg-primary text-white w-8 h-8"}
                previousClassName={"mr-2"}
                previousLinkClassName={"w-8 h-8 grid place-items-center border border-gray-300 rounded-md"}
                nextClassName={"ml-2"}
                nextLinkClassName={"w-8 h-8 grid place-items-center border border-gray-300 rounded-md"}
                breakClassName={"inline-block"}
                breakLinkClassName={"w-8 h-8 grid place-items-center border border-gray-300 rounded-md"}
                pageClassName="w-8 h-8 grid place-items-center"
                renderOnZeroPageCount={null}
              />
              </div>
            </article>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default RevistasPage;
