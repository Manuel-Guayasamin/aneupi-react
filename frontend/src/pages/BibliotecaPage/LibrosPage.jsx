import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../components/navigation/BreadCrumb";
import Subtitle from "../../components/ui/Subtitle";
import { fetchBibliotecas } from "../../redux/slices/bibliotecaSlice";
import Layout from "../layout";
import ReactPaginate from "react-paginate";
import Valores from "./DetallesCard";
import Carousel from "react-multi-carousel";
import MyBook from "../../components/ui/MyBook";
import LibroImage from "../../assets/images/libros/Libros.jpg";

const responsive = {
  desktop: {
    breakpoint: { max: 4096, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 2,
  },
};

const breadcrumbLinks = [
  { label: "Inicio", path: "/" },
  { label: "Biblioteca", path: "/biblioteca" },
  { label: "Libros", path: "/libros" },
];

const RevistasPage = () => {
  const serverURL = import.meta.env.VITE_API_URL;

  const dispatch = useDispatch();
  const bibliotecas = useSelector((state) => state.bibliotecas.bibliotecas);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [shouldSearch, setShouldSearch] = useState(false);

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

  //filtro bibliotecas de tipo revista(3), con estado activo (2)
  const filteredBibliotecas = bibliotecas.filter(
    (biblioteca) =>
      biblioteca.id_tipo_biblioteca === 1 && biblioteca.id_estado === 2
  );

  //Filtro de busqueda por nombre
  let searchedBibliotecas = filteredBibliotecas;
  if (shouldSearch) {
    searchedBibliotecas = filteredBibliotecas.filter((biblioteca) =>
      biblioteca.titulo.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  //Paginacion
  const paginatedBibliotecas = searchedBibliotecas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // filtro revistas
  const libros = bibliotecas.filter(
    (biblioteca) =>
      biblioteca.id_tipo_biblioteca === 1 && biblioteca.id_estado === 2
  );

  const latestLibros = libros
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 5);

  //formato del filtro
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
      <BreadCrumb links={breadcrumbLinks} title="Libros" />

      <div>
        <article className="grid items-center max-w-screen-xl py-12 mx-auto space-y-4 md:grid-cols-2">
          <main>
            <Subtitle>Bienvenido a nuestra colección de Libros</Subtitle>
            <p>
              Cada título ha sido cuidadosamente propuesto por miembros de
              nuestra comunidad, garantizando una selección diversa y
              enriquecedora. Descubre obras que han inspirado y cautivado a
              otros, y encuentra tu próxima lectura imprescindible. ¡Explora
              ahora y déjate guiar por las recomendaciones de nuestros usuarios!
            </p>
          </main>
          <img
            className="transition duration-300 hover:scale-105 "
            src={LibroImage}
            alt="Libros Ilustracion"
          />
        </article>
      </div>
      {filteredBibliotecas.length > 0 && (
        <section className="p-4">
          <div className="max-w-screen-xl p-2 mx-auto">
            <div className="bg-indigo-100 collapse collapse-arrow">
              <input type="checkbox" />
              <h4 className="font-bold collapse-title">
                Información de la sección:
              </h4>
              <div className="text-sm collapse-content">
                <p>
                  ¿Tienes un libro que te gustaría compartir en nuestra página?
                  ¡Nos encantaría conocerlo! Puedes proponer un libro para
                  agregarlo a nuestra colección. Simplemente llena el formulario
                  ubicado en la pestaña biblioteca con los detalles del libro y
                  una breve descripción del libro. ¡Esperamos tus
                  recomendaciones!
                </p>
              </div>
            </div>
            <br></br>
            <Subtitle title="Nuestros libros destacados" />
          </div>
          <main>
            <div>
              <MyBook pages={libros} />
            </div>
          </main>
          <article className="max-w-screen-xl py-8 mx-auto space-y-4">
            <div className="py-8 space-y-8">
              <header className="max-w-screen-xl mx-auto">
                <Subtitle title="Ultimos libros añadidos" />
              </header>
              <main>
                <Carousel
                  autoPlay
                  responsive={responsive}
                  infinite
                  itemClass="md:mx-4 border rounded-xl hover:scale-105 transition"
                  containerClass=""
                  draggable={false}
                  swipeable={false}
                >
                  {latestLibros.map((libro, index) => (
                    <div
                      key={index}
                      className="relative w-full h-96 md:h-[30rem]"
                    >
                      <a href={`${serverURL}/${libro.archivo}`} target="_blank">
                        <img
                          className="object-cover w-full h-full"
                          src={`${serverURL}/${libro.imagen}`}
                          alt={libro.titulo}
                        />
                      </a>
                    </div>
                  ))}
                </Carousel>
              </main>
            </div>
            <Subtitle title="Explora nuestra sección de Libros" />
            <div className="flex w-full max-w-md mt-6">
              <input
                type="text"
                placeholder="Buscar libros..."
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
            <main className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 !mt-10">
              {bibliotecasFormatted.map((biblioteca) => (
                <Valores
                  key={biblioteca.id}
                  title={biblioteca.titulo}
                  description={biblioteca.descripcion}
                  fecha_Publicacion={biblioteca.fecha_Publicacion}
                  author={biblioteca.nombre_autor}
                  editorial={biblioteca.editorial}
                  imagen={biblioteca.imagen}
                  archivo={biblioteca.archivo}
                />
              ))}
            </main>
            <br></br>
            <ReactPaginate
              breakLabel="..."
              previousLabel={"<"}
              nextLabel={">"}
              pageCount={Math.ceil(searchedBibliotecas.length / itemsPerPage)}
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              activeClassName={
                "grid place-items-center bg-primary text-white w-8 h-8"
              }
              previousClassName={"mr-2"}
              nextClassName={"ml-2"}
              disabledClassName={"disabled"}
              pageClassName="w-8 h-8 grid place-items-center"
              renderOnZeroPageCount={null}
            />
          </article>
        </section>
      )}
    </Layout>
  );
};

export default RevistasPage;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import BreadCrumb from "../../components/navigation/BreadCrumb";
// import Subtitle from "../../components/ui/Subtitle";
// import { fetchBibliotecas } from "../../redux/slices/bibliotecaSlice";
// import Layout from "../layout";
// import ReactPaginate from "react-paginate";
// import Valores from "./DetallesCard";
// import MyBook from "../../components/ui/MyBook";
// import LibroImage from "../../assets/images/libros/Libros.jpg";

// const breadcrumbLinks = [
//   { label: "Inicio", path: "/" },
//   { label: "Biblioteca", path: "/biblioteca" },
//   { label: "Libros", path: "/libros" },
// ];

// const LibrosPage = () => {
//   const serverURL = import.meta.env.VITE_API_URL;
//   const dispatch = useDispatch();
//   const bibliotecas = useSelector((state) => state.bibliotecas.bibliotecas);

//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(3);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [shouldSearch, setShouldSearch] = useState(false);

//   useEffect(() => {
//     dispatch(fetchBibliotecas());
//   }, [dispatch]);

//   useEffect(() => {}, [bibliotecas]);

//   console.log(bibliotecas);

//   const handlePageChange = (data) => {
//     setCurrentPage(data.selected + 1);
//   };
//   const handleSearch = () => {
//     setShouldSearch(true);
//     setSearchQuery(searchTerm);
//   };

//   //filtro bibliotecas de tipo libro(1), con estado activo (2)

//   const filteredBibliotecas = bibliotecas.filter(
//     (biblioteca) =>
//       biblioteca.id_tipo_biblioteca === 1 && biblioteca.id_estado === 2
//   );

//   //Filtro de busqueda por nombre
//   let searchedBibliotecas = filteredBibliotecas;
//   if (shouldSearch) {
//     searchedBibliotecas = filteredBibliotecas.filter((biblioteca) =>
//       biblioteca.titulo.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   }

//   const libros = bibliotecas.filter(
//     (biblioteca) =>
//       biblioteca.id_tipo_biblioteca === 1 && biblioteca.id_estado === 2
//   );
//   //formato del filtro
//   const bibliotecasFormatted = filteredBibliotecas.map((biblioteca) => ({
//     id: biblioteca.id,
//     titulo: biblioteca.titulo,
//     descripcion: biblioteca.descripcion,
//     fecha_Publicacion: biblioteca.fecha_publicacion,
//     nombre_autor: biblioteca.nombre_autor,
//     editorial: biblioteca.editorial,
//     imagen: biblioteca.imagen,
//     archivo: biblioteca.archivo,
//   }));

//   return (
//     <Layout>
//       <BreadCrumb links={breadcrumbLinks} title="Libros" />

//       <div>
//         <article className="grid items-center max-w-screen-xl py-12 mx-auto space-y-4 md:grid-cols-2">
//           <main className="prose-sm text-center md:prose md:max-w-xl md:prose-h2:text-4xl prose-h2:text-indigo-800 prose-h2:text-2xl prose-h2:font-bold md:text-left">
//             <h2>Bienvenido a nuestra colección de libros</h2>
//             <p>
//               Cada título ha sido cuidadosamente propuesto por miembros de
//               nuestra comunidad, garantizando una selección diversa y
//               enriquecedora. Descubre obras que han inspirado y cautivado a
//               otros, y encuentra tu próxima lectura imprescindible. ¡Explora
//               ahora y déjate guiar por las recomendaciones de nuestros usuarios!
//             </p>
//           </main>
//           <img
//             className="transition duration-300 hover:scale-105"
//             src={LibroImage}
//             alt="Libros Ilustracion"
//           />
//         </article>
//       </div>

//       {/* {filteredBibliotecas.length > 0 && (
//         <section className="p-4">
//           <div className="max-w-screen-xl p-2 mx-auto">
//             <div className="bg-indigo-100 collapse collapse-arrow">
//               <input type="checkbox" />
//               <h4 className="font-bold collapse-title">
//                 Información de la sección:
//               </h4>
//               <div className="text-sm collapse-content">
//                 <p>
//                   ¿Tienes un libro que te gustaría compartir en nuestra página?
//                   ¡Nos encantaría conocerlo! Puedes proponer un libro para
//                   agregarlo a nuestra colección. Simplemente llena el formulario
//                   ubicado en la pestaña biblioteca con los detalles del libro y
//                   una breve descripción del libro. ¡Esperamos tus
//                   recomendaciones!
//                 </p>
//               </div>
//             </div>
//             <br></br>
//             <Subtitle title="Nuestros libros destacados" />
//           </div>
//           <main>
//             <div>
//               <MyBook pages={filteredBibliotecas} />
//             </div>
//           </main>
//           <article className="max-w-screen-xl mx-auto space-y-4">
//             <Subtitle title="Explora nuestra sección de Libros" />
//             <div className="flex w-full max-w-md mt-6">
//               <input
//                 type="text"
//                 placeholder="Buscar libro..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full px-4 py-2 mr-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
//               />
//               <button
//                 className="inline-flex items-center px-4 py-2 text-sm font-bold text-white transition duration-300 ease-in-out transform border-2 rounded bg-colorcito hover:bg-white hover:text-colorcito hover:border-colorcito hover:scale-105"
//                 onClick={handleSearch}
//               >
//                 Buscar
//               </button>
//             </div>

//             <main className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 !mt-10">
//               {bibliotecasFormatted.map((biblioteca) => (
//                 <Valores
//                   key={biblioteca.id}
//                   title={biblioteca.titulo}
//                   description={biblioteca.descripcion}
//                   fecha_Publicacion={biblioteca.fecha_Publicacion}
//                   author={biblioteca.nombre_autor}
//                   editorial={biblioteca.editorial}
//                   imagen={biblioteca.imagen}
//                   archivo={biblioteca.archivo}
//                 />
//               ))}
//             </main>
//             <br></br>
//             <ReactPaginate
//               breakLabel="..."
//               previousLabel={"<"}
//               nextLabel={">"}
//               pageCount={Math.ceil(searchedBibliotecas.length / itemsPerPage)}
//               onPageChange={handlePageChange}
//               containerClassName={"pagination"}
//               activeClassName={
//                 "grid place-items-center bg-primary text-white w-8 h-8"
//               }
//               previousClassName={"mr-2"}
//               nextClassName={"ml-2"}
//               disabledClassName={"disabled"}
//               pageClassName="w-8 h-8 grid place-items-center"
//               renderOnZeroPageCount={null}
//             />
//           </article>
//         </section>
//       )} */}

//       {filteredBibliotecas.length > 0 && (
//         <section className="p-4">
//           <div className="max-w-screen-xl p-2 mx-auto">
//             <div className="bg-indigo-100 collapse collapse-arrow">
//               <input type="checkbox" />
//               <h4 className="font-bold collapse-title">
//                 Información de la sección:
//               </h4>
//               <div className="text-sm collapse-content">
//                 <p>
//                   ¿Tienes un libro que te gustaría compartir en nuestra página?
//                   ¡Nos encantaría conocerlo! Puedes proponer un libro para
//                   agregarlo a nuestra colección. Simplemente llena el formulario
//                   ubicado en la pestaña biblioteca con los detalles del libro y
//                   una breve descripción del libro. ¡Esperamos tus
//                   recomendaciones!
//                 </p>
//               </div>
//             </div>
//             <br></br>
//             <Subtitle title="Nuestros libros destacados" />
//           </div>
//           <main>
//             <div>
//               <MyBook pages={libros} />
//             </div>
//           </main>
//           <article className="max-w-screen-xl py-12 mx-auto space-y-4 md:pt-24">
//             <Subtitle title="Explora nuestra sección de Libros" />
//             <div className="flex w-full max-w-md mt-6">
//               <input
//                 type="text"
//                 placeholder="Buscar libro..."
//                 className="w-full px-4 py-2 mr-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <button
//                 className="inline-flex items-center px-4 py-2 text-sm font-bold text-white transition duration-300 ease-in-out transform border-2 rounded bg-colorcito hover:bg-white hover:text-colorcito hover:border-colorcito hover:scale-105"
//                 onClick={handleSearch}
//               >
//                 Buscar
//               </button>
//             </div>
//             <main className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 !mt-10">
//               {bibliotecasFormatted.map((biblioteca) => (
//                 <Valores
//                   key={biblioteca.id}
//                   title={biblioteca.titulo}
//                   description={biblioteca.descripcion}
//                   fecha_Publicacion={biblioteca.fecha_Publicacion}
//                   author={biblioteca.nombre_autor}
//                   editorial={biblioteca.editorial}
//                   imagen={biblioteca.imagen}
//                   archivo={biblioteca.archivo}
//                 />
//               ))}
//             </main>
//             <br></br>
//             <ReactPaginate
//               breakLabel="..."
//               previousLabel={"<"}
//               nextLabel={">"}
//               pageCount={Math.ceil(searchedBibliotecas.length / itemsPerPage)}
//               onPageChange={handlePageChange}
//               containerClassName={"pagination"}
//               activeClassName={
//                 "grid place-items-center bg-primary text-white w-8 h-8"
//               }
//               previousClassName={"mr-2"}
//               nextClassName={"ml-2"}
//               disabledClassName={"disabled"}
//               pageClassName="w-8 h-8 grid place-items-center"
//               renderOnZeroPageCount={null}
//             />
//           </article>
//         </section>
//       )}
//     </Layout>
//   );
// };

// export default LibrosPage;
