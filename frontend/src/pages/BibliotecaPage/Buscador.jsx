import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchBiblioteca } from '../../redux/slices/bibliotecaSlice';
import debounce from 'lodash/debounce';

const Buscador = ({ tipoBiblioteca }) => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const { searchResults, loading, error } = useSelector((state) => state.bibliotecas);

  // Función debounced para manejar la búsqueda
  const debouncedSearch = debounce((query) => {
    if (query.length > 0) {
      dispatch(searchBiblioteca({ query, tipoBiblioteca }));
    }
  }, 300);

  useEffect(() => {
    debouncedSearch(query);

    // Cancelar el debounce al desmontar el componente
    return () => {
      debouncedSearch.cancel();
    };
  }, [query, tipoBiblioteca, dispatch]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleOpenFile = (archivo) => {
    window.open(archivo, '_blank');
  };

  const handleClearSearch = () => {
    setQuery(''); // Limpiar el campo de búsqueda
    dispatch(searchBiblioteca({ query: '', tipoBiblioteca })); // Realizar una búsqueda vacía para limpiar los resultados
  };
  return (
    <div>
      <input
        className="border border-gray-300 rounded-md py-2 px-4 mb-4 focus:outline-none focus:border-blue-500"
        type="text"
        placeholder="Buscar..."
        value={query}
        onChange={handleChange}
      />
      {
      //<button onClick={handleClearSearch}>Limpiar búsqueda</button>
      }
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {searchResults.map((item) => (
          <div key={item.id} className="border border-gray-300 rounded-md p-4">
            <h3 className="text-lg font-semibold mb-2">{item.titulo}</h3>
            <p className="mb-2">Autor: {item.nombre_autor}</p>
            <p className="mb-2">Editorial: {item.editorial}</p>
            <p className="mb-2">Descripción: {item.descripcion}</p>
            <p className="mb-2">Fecha de Publicación: {item.fecha_publicacion}</p>
            {item.imagen && <img className="mb-2" src={item.imagen} alt={item.titulo} />}
            <button onClick={() => handleOpenFile(item.archivo)} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Abrir Archivo</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Buscador;
