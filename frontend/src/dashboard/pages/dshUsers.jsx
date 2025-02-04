import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useAdminResource from '../../hooks/useAdminResource';
import { getUsuarios, deleteUsuario, searchUsuariosByCedula } from '../../redux/slices/usuariosSlice';
import DshContainer from '../layout/dshContainer';
import ModalActualizar from '../../admin_pages/Usuarios/ModalActualizar';
import ModalRegistro from '../../admin_pages/Usuarios/ModalRegistro';
import { FaDeleteLeft, FaPencil, FaTrash } from 'react-icons/fa6';
import { BiIdCard } from "react-icons/bi";
import { FaSearch } from 'react-icons/fa';
import { BsPersonFillAdd } from "react-icons/bs";
import ActionButton from "../components/Buttons/ActionButton";

const DshUsers = () => {
  const dispatch = useDispatch();
  const { usuario } = useSelector((state) => state.authentication);
  const [identificacion, setIdentificacion] = useState('');
  const [searching, setSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchResults, setSearchResults] = useState(null);

  const {
    resources: usuarios,
    loading,
    pagination,
    setPagination,
    showConfirmation,
    openConfirmation,
    closeConfirmation,
    confirmDelete,
    showRegistroModal,
    showActualizarModal,
    resourceSelected: usuarioSelected,
    openRegistroModal,
    openActualizarModal,
    closeRegistroModal,
    closeActualizarModal,
    resourceUpdated,
    setResourceUpdated,
  } = useAdminResource(getUsuarios, deleteUsuario, 'usuarios');

  const handleCedulaChange = (event) => {
    setIdentificacion(event.target.value);
  };

  const handleSearch = async () => {
    if (!identificacion) {
      return toast.error('Ingrese una cédula para buscar');
    }
    try {
      const response = await dispatch(searchUsuariosByCedula(identificacion));
      console.log("Resultados de la búsqueda:", response.payload);
      setSearchResults(response.payload);
      setSearching(true);
    } catch (error) {
      toast.error('Error al buscar usuarios por cédula');
    }
  };

  const handleClearSearch = () => {
    dispatch(getUsuarios({ page: currentPage, pageSize: pageSize }));
    setSearching(false);
    setSearchResults(null);
    setIdentificacion('');
  };

  useEffect(() => {
    setPagination({ ...pagination, currentPage, pageSize });
  }, [currentPage, pageSize, setPagination]);

  const handleDeleteUser = () => {
    setResourceUpdated({
      ...resourceUpdated,
      isRegistered: {
        ...resourceUpdated.isUdated,
        value: true,
      },
    });
    confirmDelete();
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value));
  };

  return (
    <DshContainer title="Usuarios" content={<ActionButton ActionIcon={BsPersonFillAdd} label="Crear Nuevo Usuario" onClick={openRegistroModal} />} >
      <ModalRegistro
        resourceUpdated={resourceUpdated}
        setResourceUpdated={setResourceUpdated}
        showModal={showRegistroModal}
        closeModal={closeRegistroModal}
      />
      <ModalActualizar
        resourceUpdated={resourceUpdated}
        setResourceUpdated={setResourceUpdated}
        showModal={showActualizarModal}
        closeModal={closeActualizarModal}
        usuarioSelected={usuarioSelected}
      />
      <div className="flex items-center whitespace-nowrap mx-auto mb-8">
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <BiIdCard className="text-2xl text-gray-400 dark:text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Buscar por cédula..."
            className="border ps-11 px-4 py-2 rounded-md w-full dsh-tertiary focus:outline-none focus:shadow-md"
            value={identificacion}
            onChange={handleCedulaChange}
          />
        </div>
        <button
          className={`px-3 md:px-4 py-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:outline-none ${!identificacion && 'opacity-50 cursor-not-allowed'}`}
          onClick={handleSearch}
          disabled={!identificacion}
        >
          <FaSearch className="w-full h-full text-3xl md:hidden" />
          <span className='hidden md:block'>Buscar</span>
        </button>
        <button
          className="px-3 md:px-4 py-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:outline-none"
          onClick={handleClearSearch}
        >
          <FaDeleteLeft className="w-full h-full text-3xl md:hidden" />
          <span className='hidden md:block'>Limpiar búsqueda </span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full mb-8">
          <thead className="text-xs font-bold text-white uppercase tracking-wider">
            <tr className='colorcito  text-left  dark:bg-blue-700'>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Identificación</th>
              <th className="px-6 py-3">Nombre de Usuario</th>
              <th className="px-6 py-3">Nombres</th>
              <th className="px-6 py-3">Apellidos</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Teléfono</th>
              <th className="px-6 py-3">Rol</th>
              <th className="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody className="dsh-tertiary divider-y divider-yellow-400">
            {!loading && (searching ?
              (Array.isArray(searchResults) && searchResults.map((user, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.identificacion}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.nombreUsuario}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.nombres}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.apellidos}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.telefono}</td>
                  <td className="px-6 py-4 whitespace-nowrap flex items-center justify-center">
                    <span className={`text-xs badge font-bold ${user.Rol.nombre === 'Administrador'
                      ? 'badge-neutral bg-purple-900'
                      : user.Rol.nombre === 'Usuario'
                        ? 'badge-primary text-white'
                        : 'badge-accent'
                      }`}
                    >
                      {user.Rol.nombre || ''}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap">
                    <button onClick={() => openActualizarModal(user)} className="mr-2 hover:text-blue-500 p-1.5 hover:bg-black/0 rounded-md badge badge-info">
                      <FaPencil />
                    </button>
                    <button onClick={() => openConfirmation(user.id)} className="hover:text-red-500 p-1.5 hover:bg-black/0 rounded-md badge badge-error">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))) :
              (Array.isArray(usuarios.usuarios) && usuarios.usuarios
                .slice() // Creamos una copia del arreglo para no modificar el original
                .sort((a, b) => a.id - b.id) // Ordenamos los usuarios por ID de manera ascendente
                .map((user, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.identificacion}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.nombreUsuario}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.nombres}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.apellidos}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.telefono}</td>
                    <td className="px-6 py-4 whitespace-nowrap flex items-center justify-center">
                      <span className={`text-xs badge font-bold ${user.Rol.nombre === 'Administrador'
                        ? 'badge-neutral bg-purple-900'
                        : user.Rol.nombre === 'Usuario'
                          ? 'badge-primary text-white'
                          : 'badge-accent'
                        }`}
                      >
                        {user.Rol.nombre || ''}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                      <button onClick={() => openActualizarModal(user)} className="mr-2 hover:text-blue-500 p-1.5 hover:bg-black/0 rounded-md badge badge-info">
                        <div className="tooltip" data-tip="Actualizar">
                          <FaPencil />
                        </div>
                      </button>
                      <button onClick={() => openConfirmation(user.id)} className="hover:text-red-500 p-1.5 hover:bg-black/0 rounded-md badge badge-error">
                        <div className="tooltip" data-tip="Eliminar">
                          <FaTrash />
                        </div>
                      </button>
                    </td>
                  </tr>
                ))))
            }
          </tbody>
        </table>
      </div>
      {!searching && <div className="flex flex-col items-center mt-6 mb-12">
        <span className="text-sm text-gray-700 dark:text-gray-400">
          Mostrando <span className="font-semibold text-gray-900 dark:text-white">{((currentPage - 1) * pageSize) + 1}</span> a <span className="font-semibold text-gray-900 dark:text-white">{Math.min(currentPage * pageSize, usuarios.totalItems)}</span> de <span className="font-semibold text-gray-900 dark:text-white">{usuarios.totalItems}</span> Elementos
        </span>
        <div className="inline-flex mt-2 xs:mt-0">
          <button
            className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
            Anterior
          </button>
          <div className="relative">
            <select
              className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-gray-700 hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              value={pageSize}
              onChange={handlePageSizeChange}
            >
              <option>10</option>
              <option>15</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>
          <button
            className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={usuarios.totalPages === currentPage}
          >
            Siguiente
            <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </button>
        </div>
      </div>}
      {showConfirmation && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50'>
          <div className='p-6 space-y-4 bg-white rounded-lg'>
            <h2 className='text-lg font-bold md:text-2xl'>Confirmar eliminación</h2>
            <div className="text-sm dark:text-black">
              <p className=''>¿Estás seguro de que deseas eliminar este usuario?</p>
            </div>
            <div className='flex justify-end gap-2 mt-4'>
              <button
                className="px-5 py-3 text-white rounded-lg bg-red-600 hover:text-red-600 border border-transparent
                hover:border-red-600 hover:bg-white hover:shadow-lg hover:shadow-gray-500 dark:bg-red-700 dark:text-white 
                dark:hover:bg-white dark:hover:text-red-700 dark:hover:border-red-700"
                onClick={handleDeleteUser}
              >
                Confirmar
              </button>
              <button
                className="px-5 py-3 text-black bg-gray-300 rounded-lg hover:text-black border border-transparent
                hover:border-gray-500 hover:bg-white hover:shadow-lg hover:shadow-gray-500"
                onClick={closeConfirmation}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </DshContainer>
  );
};

export default DshUsers;

