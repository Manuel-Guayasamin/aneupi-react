import React, { useEffect, useState } from "react";
import DshContainer from "../layout/dshContainer";
import ActionButton from "../components/Buttons/ActionButton";
import { MdLibraryAdd } from "react-icons/md";

import ModalRegistroBiblioteca from "../../admin_pages/Biblioteca/ModalRegistroBiblioteca";
import ModalActualizarBiblioteca from "../../admin_pages/Biblioteca/ModalActualizarBiblioteca";

import {
  deleteBiblioteca,
  fetchBibliotecas,
} from "../../redux/slices/bibliotecaSlice";
import useAdminResource from "../../hooks/useAdminResource";
import { useDispatch } from "react-redux";
import { FaFilePdf, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
const serverURL = import.meta.env.VITE_API_URL;

const DshBiblioteca = () => {
  const [showRegistroModal, setShowRegistroModal] = useState(false);

  const dispatch = useDispatch();

  // Estado de los filtros
  const [tipoBibliotecaFilter, setTipoBibliotecaFilter] = useState('');
  const [estadoFilter, setEstadoFilter] = useState('');

  //Estado de las bibliotecas filtradas
  const [filteredBibliotecas, setFilteredBibliotecas] = useState([]);

  //Manejador del cambio en el filtro de Tipo de biblioteca
  const handleTipoBibliotecaFilterChange = (event) => {
    setTipoBibliotecaFilter(event.target.value);
  }

  //Manejador del cambio en el filtro de estado
  const handleEstadoFilterChange = (event) => {
    setEstadoFilter(event.target.value);
  }

  //Función para restablecer los filtros
  const resetFilters = () => {
    setTipoBibliotecaFilter('');
    setEstadoFilter('');
  }



  const openRegistroModal = () => {
    setShowRegistroModal(true);
  };

  const closeRegistroModal = () => {
    setShowRegistroModal(false);
  };
  const {
    resources: biblioteca,
    loading,
    showConfirmation,
    openConfirmation,
    closeConfirmation,
    confirmDelete,
    showActualizarModal,
    resourceSelected: bibliotecaSelected,
    openActualizarModal,
    closeActualizarModal,
    resourceUpdated,
    setResourceUpdated,
  } = useAdminResource(fetchBibliotecas, deleteBiblioteca, "bibliotecas");

  const handleDeleteBibliotecas = () => {
    setResourceUpdated({
      ...resourceUpdated,
      isRegistered: {
        ...resourceUpdated.isUdated,
        value: true,
      },
    });
    confirmDelete();
  };
  /*
    useEffect(() => {
      dispatch(fetchBibliotecas());
    }, [dispatch]);*/

  // Filtro
  // const biblios = biblioteca.filter(biblio => biblio.id_tipo_biblioteca === 2);

  //Filtrar bibliotecas segun los criterios seleccionados
  useEffect(() => {
    const filtered = biblioteca.filter((item) => {
      // Filtrar por tipo de biblioteca
      if (tipoBibliotecaFilter && item.TipoBiblioteca?.nombre !== tipoBibliotecaFilter) {
        return false;
      }
      // Filtrar por estado
      if (estadoFilter && item.Estado?.nombre !== estadoFilter) {
        return false;
      }
      return true;
    });
    setFilteredBibliotecas(filtered);
  }, [biblioteca, tipoBibliotecaFilter, estadoFilter]);

  const biblioOreden = [...filteredBibliotecas].sort((a, b) => a.id - b.id);


  return (
    <DshContainer
      title="Bibliotecas"
      content={
        <ActionButton
          ActionIcon={MdLibraryAdd}
          label="Crear Nueva Biblioteca"
          onClick={openRegistroModal}
        />
      }
    >
      <ModalRegistroBiblioteca
        resourceUpdated={resourceUpdated}
        setResourceUpdated={setResourceUpdated}
        showModal={showRegistroModal}
        closeModal={closeRegistroModal}
      />

      <ModalActualizarBiblioteca
        resourceUpdated={resourceUpdated}
        setResourceUpdated={setResourceUpdated}
        showModal={showActualizarModal}
        closeModal={closeActualizarModal}
        bibliotecaSelected={bibliotecaSelected} // Corregir el nombre de la prop para pasar el trabajo seleccionado
      />


      <div className="overflow-x-auto">
        <div className="grid items-center grid-cols-1 gap-4 mb-4 md:grid-cols-5">
          <div>
            <label className="form-control">
              <span className="label-text dark:text-slate-100 ">Tipo de biblioteca</span>
              <select
                className="select select-bordered select-sm dark:text-slate-800"
                onChange={handleTipoBibliotecaFilterChange}
                value={tipoBibliotecaFilter}
              >
                <option value="">Todas</option>
                <option value="Libro">Libro</option>
                <option value="Artículo">Artículo</option>
                <option value="Revista">Revista</option>
              </select>

            </label>
          </div>

          <div>
            <label className="form-control">
              <span className="label-text dark:text-slate-100 ">Estado</span>
              <select
                className="select select-bordered select-sm dark:text-slate-800"
                onChange={handleEstadoFilterChange}
                value={estadoFilter}
              >
                <option value="">Todas</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Aprobado">Aprobado</option>
                <option value="Rechazado">Rechazado</option>
                <option value="Finalizado">Finalizado</option>
              </select>

            </label>
          </div>
          <div className="md:mt-3"> {/* Agrega una clase de margen superior solo en dispositivos medianos y grandes */}
            <button
              className="flex items-center gap-4 px-4 py-2 text-sm font-medium text-white rounded-md dark:bg-blue-700 dark:hover:bg-blue-800 bg-colorcito hover:bg-slate-700 focus:outline-none"
              onClick={resetFilters}
            >
              Restablecer filtros
            </button>
          </div>
        </div>

        <table className="w-full mb-8">
          <thead className="text-xs font-bold tracking-wider text-white uppercase ">
            <tr className="text-left bg-colorcito dark:bg-blue-700">
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3 ">Titulo</th>
              <th className="px-6 py-3">Imagen</th>
              <th className="px-6 py-3">Autor</th>
              <th className="px-6 py-3">Año publicación</th>
              <th className="px-6 py-3">Editorial</th>
              <th className="px-6 py-3">Descripción</th>
              <th className="px-6 py-3">Archivo</th>
              <th className="px-6 py-3">Tipo Biblioteca</th>
              <th className="px-6 py-3">Estado</th>
              <th className="px-6 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody className="dsh-tertiary divider-y divider-yellow-400">
            {!loading &&
              Array.isArray(biblioOreden) &&
              biblioOreden.map((biblioteca, index) => (
                <tr key={index + 1}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {biblioteca.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {biblioteca.titulo}
                  </td>
                  <td className="flex items-center justify-center mt-2 truncate">
                    <img
                      src={`${serverURL}/${biblioteca.imagen}`}
                      alt=""
                      className="w-10 h-10 "
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {biblioteca.nombre_autor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {" "}
                    {new Date(
                      new Date(biblioteca.fecha_publicacion).getTime() +
                      24 * 60 * 60 * 1000
                    ).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {biblioteca.editorial}
                  </td>
                  <td
                    style={{ maxWidth: "400px" }}
                    className="px-6 py-4 truncate whitespace-nowrap"
                  >
                    {" "}
                    {/* Se añañdió un maxWidth */}
                    {biblioteca.descripcion}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a
                      href={`${serverURL}/${biblioteca.archivo}`}
                      download
                      target="_blank"
                      className="mr-2 hover:text-green-500 p-1.5 hover:bg-black/0 rounded-md badge badge-success"
                    >
                      <FaFilePdf />
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`badge badge-sm ${biblioteca.TipoBiblioteca?.id === 1
                        ? "badge-warning"
                        : biblioteca.TipoBiblioteca?.id === 2
                          ? "badge-accent"
                          : biblioteca.TipoBiblioteca?.id === 3
                            ? "badge-error"
                            : "badge-success text-white"
                        }`}
                    >
                      {biblioteca.TipoBiblioteca?.nombre}
                    </span>
                    {/* {biblioteca.id_tipo_biblioteca} */}
                  </td>

                  <td>
                    <span
                      className={`badge badge-sm ${biblioteca.Estado?.id === 1
                        ? "badge-warning"
                        : biblioteca.Estado?.id === 2
                          ? "badge-accent"
                          : biblioteca.Estado?.id === 3
                            ? "badge-error"
                            : biblioteca.Estado?.id === 4
                              ? "badge-info"
                              : "badge-success text-white"
                        }`}
                    >
                      {biblioteca.Estado?.nombre}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm whitespace-nowrap">
                    <button
                      onClick={() => openActualizarModal(biblioteca)}
                      className="mr-2 hover:text-blue-500 p-1.5 hover:bg-black/0 rounded-md badge badge-info"
                    >
                      <div className="tooltip" data-tip="Actualizar">
                        <FaPencil />
                      </div>
                    </button>
                    <button
                      onClick={() => openConfirmation(biblioteca.id)}
                      className="mr-2 hover:text-red-500 p-1.5 hover:bg-black/0 rounded-md badge badge-error"
                    >
                      <div className="tooltip" data-tip="Eliminar">
                        <FaTrash />
                      </div>
                    </button>
                    {/* <button onClick={() => handleExcelClick(biblioteca.id)} className="hover:text-green-500 p-1.5 hover:bg-black/0 rounded-md badge badge-success">
                    <FaFileExcel />
                  </button> */}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {showConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="p-6 space-y-4 bg-white rounded-lg">
              <h2 className="text-lg font-bold md:text-2xl">
                Confirmar eliminación
              </h2>
              <div className="text-sm dark:text-black">
                <p className="">
                  ¿Estás seguro de que deseas eliminar esta práctica?
                </p>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  className="px-5 py-3 text-white rounded-lg bg-red-600 hover:text-red-600 border border-transparent
                  hover:border-red-600 hover:bg-white hover:shadow-lg hover:shadow-gray-500 dark:bg-red-700 dark:text-white 
                  dark:hover:bg-white dark:hover:text-red-700 dark:hover:border-red-700"
                  onClick={handleDeleteBibliotecas}
                >
                  Confirmar
                </button>
                <button
                  className="px-5 py-3 text-black bg-gray-300 rounded-lg hover:text-black border border-transparent
                hover:border-gray-500 hover:bg-white hover:shadow-lg hover:shadow-gray-500"
                  onClick={closeConfirmation}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DshContainer>
  );
};
export default DshBiblioteca;
