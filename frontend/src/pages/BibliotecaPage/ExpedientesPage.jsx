import { useState,useEffect } from "react";
import Layout from "../layout";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../components/ui/ModalContent";
import { useDisclosure } from "@nextui-org/react";

import BreadCrumb from "../../components/navigation/BreadCrumb";
import FundacionAneupi from '../../pages/BibliotecaPage/img/FundacionAnupi2.jpg';
import {
  searchResolucionByWord,
  searchExpedienteByWord,
  sentenciaByPhrase,
  resolucionByPhrase
} from "../../redux/slices/expedienteSlice";
import { FaFilePdf } from "react-icons/fa";

const serverURL = import.meta.env.VITE_API_URL;

// Configuración de los enlaces de Breadcrumb
const breadcrumbLinks = [
  { label: "Inicio", path: "/" },
  { label: "Biblioteca", path: "/biblioteca" },
  { label: "Expedientes", path: "/expedientes" },
];

const ExpedientesPage = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("word");
  const [searchCategory, setSearchCategory] = useState("textoSentencia");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  const { isOpen, onOpenChange } = useDisclosure();

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      let results = [];
      let errorMessage = '';
      if (searchTerm.trim() !== "") {
        let action;
        if (searchType === "word") {
        if (searchCategory === "textoSentencia") {
          action = await dispatch(searchExpedienteByWord(searchTerm));
        } else if (searchCategory === "textoCaso") {
          action = await dispatch(searchResolucionByWord(searchTerm));
        }
      } else if(searchType === "phrase" ){
        if (searchCategory === "textoSentencia") {
          action = await dispatch(searchExpedienteByWord(searchTerm));
        } else if (searchCategory === "textoCaso") {
          action = await dispatch(searchResolucionByWord(searchTerm));
        }
      }
      //(searchExpedienteByWord.fulfilled.match(action) || searchResolucionByWord.fulfilled.match(action)||sentenciaByPhrase.fulfilled.match(action)||resolucionByPhrase.fulfilled.match(action)
        if (searchExpedienteByWord.fulfilled.match(action) || searchResolucionByWord.fulfilled.match(action)) {
          results = action.payload; 
          console.log(results);

          setSearchResults(results);
          //(searchExpedienteByWord.rejected.match(action) || searchResolucionByWord.rejected.match(action)||sentenciaByPhrase.rejected.match(action)||resolucionByPhrase.rejected.match(action))
        } else if (searchExpedienteByWord.rejected.match(action) || searchResolucionByWord.rejected.match(action)) {
          errorMessage = action.payload || "Error desconocido";
          console.error("Error fetching results:", errorMessage);

          setSearchResults([]); 
        }
      }
    } catch (error) {
      console.error("Error fetching results:", error);
   
      setSearchResults([]); 
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
  }, [dispatch]);

  const simulateSearch = () => {
    setIsLoading(true);
    setTimeout(() => {
      const results = [
        { id: 1, title: "Sentencia 1" },
        { id: 2, title: "Sentencia 2" },
        { id: 3, title: "Sentencia 3" },
      ];
      setSearchResults(results);
      setIsLoading(false);
    }, 1000);
  };

  const handleSelectChange = (e) => {
    setSearchCategory(e.target.value);

    if (e.target.value === "textoSentencia" || e.target.value === "textoResolucion") {
      setShowButtons(true);
    } else {
      setShowButtons(false);
    }
  };

  const openModal = () => {
    onOpenChange(true);
  };

  return (
    <Layout>
      <BreadCrumb links={breadcrumbLinks} title="Expedientes" />
      <div className="container mx-auto p-4 text-center mb-80 mt-10">
        <img src={FundacionAneupi} alt="Logo" className="mx-auto mb-6" style={{ marginTop: '-30px' }} />
        <h1 className="text-2xl mb-4" style={{ fontFamily: 'Open Sans', color: '#00335f' }}>Buscador de Sentencias y Resoluciones.</h1>

        <div className="mb-6 flex justify-center items-center">
          <div className="mr-8 flex items-center">
            <input
              type="radio"
              id="word"
              name="searchType"
              value="word"
              checked={searchType === "word"}
              onChange={() => setSearchType("word")}
              className="mr-2"
              style={{ transform: "scale(1.5)" }}
            />
            <label htmlFor="word" className="text-lg font-normal">Por palabra</label>
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              id="phrase"
              name="searchType"
              value="phrase"
              checked={searchType === "phrase"}
              onChange={() => setSearchType("phrase")}
              className="mr-2"
              style={{ transform: "scale(1.5)" }}
            />
            <label htmlFor="phrase" className="text-lg font-normal">Por frase exacta</label>
          </div>
        </div>

        <h2 className="mb-0 text-left w-full" style={{ marginLeft: '20%', maxWidth: '300px', fontFamily: 'Open Sans', color: '#00335f' }}>Buscar Por:</h2>
        <div className="mb-6 flex justify-center items-center w-full">
          <select
            value={searchCategory}
            onChange={handleSelectChange}
            className="border border-gray-300 rounded-l px-4 py-3 text-lg mr-4"
            style={{ width: "300px" }}
          >
            <option value="textoSentencia">Sentencia</option>
            <option value="textoCaso">Caso</option>
          </select>

          <form onSubmit={handleSearch} className="relative flex items-center w-full max-w-xl">
            <input
              type="text"
              placeholder="Digite el texto a buscar dentro de la sentencia..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 px-4 py-3 text-lg w-full pr-12"
              style={{ maxWidth: "700px" }}
            />
            <button
              type="submit"
              className="absolute right-0 top-0 bottom-0 text-gray-500 hover:text-gray-700 flex items-center justify-center"
              style={{ width: "40px", height: "100%", marginRight: "4px" }}
            >
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </form>
        </div>

        {isLoading ? (
          <p>Cargando...</p>
        ) : (
          <div>
            {searchResults.length === 0 && searchTerm !== "" && (
              <p></p>
            )}
            {searchResults.length > 0 && (
              <div>
                <p></p>
                <ul>
                  {searchResults.map((result) => (
                    <li key={result.id}>{result.title}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
    <table className="w-full mb-8 table-auto">
      <thead className="text-xs font-bold tracking-wider text-white uppercase bg-colorcito dark:bg-blue-700">
        <tr className="text-left">
          <th className="px-6 py-3 text-left">#</th>
          <th className="px-6 py-3 text-left">Nombres</th>
          <th className="px-6 py-3 text-left">Apellidos</th>
          <th className="px-6 py-3 text-left">Profesión</th>
          <th className="px-6 py-3 text-left">Dirección</th>
          <th className="px-6 py-3 text-left">País</th>
          <th className="px-6 py-3 text-left">Institución</th>
          <th className="px-6 py-3 text-left">Archivo</th>
        </tr>
      </thead>
      <tbody className="bg-gray-100 dark:bg-gray-800">
        {searchResults.length > 0 ? (
          searchResults.map((expediente, index) => (
            <tr key={expediente.id}>
              <td className="px-6 py-4 text-left whitespace-nowrap">{index + 1}</td>
              <td className="px-6 py-4 text-left whitespace-wrap break-words">{expediente.nombres}</td>
              <td className="px-6 py-4 text-left whitespace-wrap break-words">{expediente.apellidos}</td>
              <td className="px-6 py-4 text-left whitespace-wrap break-words">{expediente.profesion}</td>
              <td className="px-6 py-4 text-left whitespace-wrap break-words">{expediente.direccion || 'No disponible'}</td>
              <td className="px-6 py-4 text-left whitespace-wrap break-words">{expediente.pais || 'No disponible'}</td>
              <td className="px-6 py-4 text-left whitespace-wrap break-words">{expediente.institucion || 'No disponible'}</td>
              <td className="px-6 py-4 text-left whitespace-wrap break-words">
                {expediente.archivo_url ? (
                  <a
                    href={`${serverURL}/${expediente.archivo_url}`}
                    download
                    target="_blank"
                    className="mr-2 hover:text-green-500 p-1.5 hover:bg-black/0 rounded-md badge badge-success"
                  >
                    <div className="tooltip" data-tip="Archivo">
                      <FaFilePdf />
                    </div>
                  </a>
                ) : (
                  <span className="text-red-500">No existe archivo</span>
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8" className="text-center px-6 py-4 text-left">
              No se encontraron resultados.
            </td>
          </tr>
        )}
      </tbody>
    </table>


        {showButtons && (
          <div className="mt-4 flex justify-center">
            <button className="mr-4 px-6 py-3 bg-colorcito text-white rounded hover:bg-blue-600 text-lg">
              <a href="/sentencias">Sentencias</a>
            </button>
            <button className="mr-4 px-6 py-3 bg-colorcito text-white rounded hover:bg-blue-600 text-lg">
              <a href="/resoluciones">Resoluciones</a>
            </button>
            <button
              onClick={openModal}
              className="mr-4 px-12 py-3 bg-colorcito text-white rounded hover:bg-blue-600 text-lg"
            >
              Subir
            </button>
          </div>
        )}

        <div className="mt-6">
          <a href="/busqueda-avanzada" className="text-blue-600 hover:underline">Búsqueda Avanzada</a>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}>
      </Modal>
    </Layout>
  );
};

export default ExpedientesPage;
