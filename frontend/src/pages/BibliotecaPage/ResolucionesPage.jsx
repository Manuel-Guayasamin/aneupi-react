import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../components/navigation/BreadCrumb";
import Layout from "../layout";
import { fetchResolucionesAprobadas } from "../../redux/slices/expedienteSlice";
import { FaFilePdf } from "react-icons/fa";
import Subtitle from "../../components/ui/Subtitle";

const serverURL = import.meta.env.VITE_API_URL;

const breadcrumbLinks = [
    { label: "Expedientes", path: "/" },
    { label: "Resoluciones aprobadas", path: "/resoluciones" },
];

const ResolucionesPage = () => {
    const dispatch = useDispatch();
    const { expedientes, loading } = useSelector((state) => state.expedientes);

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredExpedientes, setFilteredExpedientes] = useState([]);

    useEffect(() => {
        dispatch(fetchResolucionesAprobadas());
    }, [dispatch]);

    useEffect(() => {
        if (!loading) {
            setFilteredExpedientes(
                expedientes.filter((expediente) =>
                    (`${expediente.nombres} ${expediente.apellidos}`).toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [searchTerm, expedientes, loading]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleClearSearch = () => {
        setSearchTerm("");
        setFilteredExpedientes(expedientes);
    };
    return (
        <Layout>
            <BreadCrumb links={breadcrumbLinks} title="Resoluciones Aprobadas" />
            <section className="max-w-screen-xl mx-auto" id="resoluciones">
                <div className="mt-8 mb-8">
                    <Subtitle title="Listado de las Resoluciones Aprobadas" />
                    <ul className="list-disc list-inside text-gray-700 mt-4">
                        <li>A continuación, se presenta un listado de todas las resoluciones que han sido aprobadas.</li>
                        <li>Puede hacer clic en el icono del archivo para descargar y revisar cada resolución en formato PDF.</li>
                    </ul>
                </div>

                <div className="flex items-center mb-2 space-x-2 pt-2 pb-5 mt-2">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Buscar por nombre o apellido"
                        className="p-2 border border-colorcito rounded-md flex-grow"
                    />
                    <button
                        onClick={handleClearSearch}
                        className="bg-colorcito text-white p-2 rounded-md ml-2"
                    >
                        Limpiar
                    </button>
                </div>


                <main className="mt-2 space-y-10">
                    <div className="w-full overflow-x-auto">
                        <table className="table mb-6">
                            <thead className="bg-colorcito text-white">
                                <tr
                                    scope="col"
                                    className="text-left text-xs font-medium uppercase tracking-wider"
                                >
                                    {/*<th scope="col" className="px-6 py-3">ID</th>*/}
                                    <th scope="col" className="px-6 py-3">Subido por</th>
                                    <th scope="col" className="px-6 py-3">País</th>
                                    <th scope="col" className="px-6 py-3">Institución</th>
                                    <th scope="col" className="px-6 py-3">Fecha de subida</th>
                                    <th scope="col" className="px-6 py-3">Fecha de aprobación</th>
                                    <th scope="col" className="px-6 py-3">Archivo</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {loading ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-4 text-center">Cargando...</td>
                                    </tr>
                                ) : (
                                    filteredExpedientes.map((expediente) => (
                                        <tr key={expediente.id}>
                                            {/*<td className="px-6 py-4 whitespace-nowrap">{expediente.id}</td>*/}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {`${expediente.nombres} ${expediente.apellidos}`}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">{expediente.pais}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{expediente.institucion}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {formatDate(expediente.createdAt)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {formatDate(expediente.updatedAt)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <a
                                                    href={`${serverURL}/${expediente.archivo_url}`}
                                                    download
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="mr-2 hover:text-green-500 p-1.5 hover:bg-black/0 rounded-md badge badge-success"
                                                >
                                                    <FaFilePdf />
                                                </a>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                        <div className=" mt-4 pt-20">
                            {/* Aquí puedes agregar el contenido del pie de página o cualquier otro contenido */}
                            <p className="text-center text-gray-100"></p>
                        </div>
                    </div>
                </main>
            </section>
        </Layout>
    );
};

export default ResolucionesPage;
