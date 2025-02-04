import React, { useState } from "react";
import Select, { components } from "react-select";//instalar "npm install react-select"
import BreadCrumb from "../../components/navigation/BreadCrumb";
import Layout from "../layout";
import DatePicker from "react-datepicker";//npm install react-datepicker y npm install date-fns
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { Input } from "../../components/ui/Input"; // Asegúrate de que la ruta sea correcta
import { FaCalendarAlt } from 'react-icons/fa'; // Importa el icono de calendario npm install react-icons


// Enlaces de breadcrumb para la navegación
const breadcrumbLinks = [
    { label: "Inicio", path: "/" },
    { label: "Biblioteca", path: "/biblioteca" },
    { label: "Sentencias", path: "/sentencias" },
    { label: "Búsqueda Avanzada", path: "/busqueda-avanzada" },
];

const actionOptions = [
    { value: "ji", label: "Resoluciones de la defensoria del pueblo" },
    { value: "jp", label: "JP - Acción de protección" },
    { value: "ep", label: "EP - Acción extraordinaria de protección" },
    { value: "an", label: "AN - Acción por incumplimiento" },
    { value: "is", label: "IS - Incumplimiento de sentencias y dictámenes" },
    { value: "ic", label: "IC - Interpretación de normas constitucionales" },
    { value: "jc", label: "JC - Medidas cautelares" },
    { value: "ti", label: "TI - Tratados internacionales" },
];

const selectHeightStyles = {
    control: (provided) => ({
        ...provided,
        minHeight: '50px', // Ajusta esta altura según sea necesario
    }),
};


const BusquedaAvanzadaPage = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [selectedActions, setSelectedActions] = useState([]);
    const [selectedJuez, setSelectedJuez] = useState(null);
    const [selectedDesicion, setSelectedDesicion] = useState(null);
    const [selectedMateria, setSelectedMateria] = useState(null);
    const [searchType, setSearchType] = useState("word");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // Maneja el cambio en el select para las acciones
    const handleSelectChange = (selectedOptions) => {
        setSelectedActions(selectedOptions || []);
    };

    const handleSelectJuezChange = (selectedOptions) => {
        setSelectedJuez(selectedOptions || []);
    };

    const handleSelectDesicionChange = (selectedOptions) => {
        setSelectedDesicion(selectedOptions || []);
    };

    const handleSelectMateriaChange = (selectedOptions) => {
        setSelectedMateria(selectedOptions || []);
    };

    const handleSearchTypeChange = (event) => {
        setSearchType(event.target.value);
    };

    const handleFormSubmit = (data) => {
        console.log("Form submitted", data);
    };

    const handleReset = () => {
        reset();
        setSelectedActions([]);
        setSelectedJuez(null);
        setSelectedDesicion(null);
        setSelectedMateria(null);
        setStartDate(null);
        setEndDate(null);
    };

    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };



    return (
        <Layout>
            <BreadCrumb links={breadcrumbLinks} title="Búsqueda Avanzada" />
            <div className="container mx-auto p-4" style={{ maxWidth: '1000px' }}>
                <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="font-normal text-xl">Búsqueda Avanzada</h1>
                    </div>
                    <div className="bg-red-100 text-red-600 p-2 rounded mb-4 font-normal text-xl">
                        <strong>Importante:</strong> No es necesario llenar todos los campos para buscar.
                    </div>
                    <form id="searchForm" onSubmit={handleSubmit(handleFormSubmit)}>

                        <div className="mb-8 block col-span-2">
                            <div className="mt-4 flex items-center">
                                <input
                                    type="radio"
                                    name="searchType"
                                    value="word"
                                    checked={searchType === "word"}
                                    onChange={handleSearchTypeChange}
                                    className="mr-2"
                                    style={{ transform: "scale(1.5)" }} // Ajustar el tamaño del radio button

                                />
                                <label className="mr-8 font-normal text-l">Por palabra</label>
                                <input
                                    type="radio"
                                    name="searchType"
                                    value="phrase"
                                    checked={searchType === "phrase"}
                                    onChange={handleSearchTypeChange}
                                    className="mr-2"
                                    style={{ transform: "scale(1.5)" }} // Ajustar el tamaño del radio button

                                />
                                <label className="mr-8 font-normal text-l">Por frase exacta</label>
                            </div>
                            <div className="grid grid-cols-2 gap-5">
                                <Input
                                    placeholder="Ingrese Palabra o frase a buscar"
                                    name="ingresePalabra"
                                    register={register}
                                    errors={errors}
                                    required
                                />

                                <span className="block text-gray-500 text-sm mt-5">Por ejemplo: Derecho a la vida</span>
                            </div>


                            <div className="flex items-center">
                                <div style={{ width: '70%' }}>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={handleDateChange}
                                        startDate={startDate}
                                        endDate={endDate}
                                        selectsRange
                                        isClearable={false}
                                        dateFormat="dd/MM/yyyy"
                                        className="mt-8 block border border-gray-300 rounded p-2 w-full"
                                        customInput={
                                            <div className="relative" style={{ width: '175%' }}>
                                                <input
                                                    placeholder="Fecha inicio - Fecha fin"
                                                    type="text"
                                                    value={
                                                        startDate && endDate
                                                            ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
                                                            : ""
                                                    }
                                                    className="mt-1 block w-full h-10 rounded p-3 pr-10"
                                                />
                                                {!startDate && !endDate && (
                                                    <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                                                )}
                                                {startDate && endDate && (
                                                    <span
                                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                                                        onClick={() => {
                                                            setStartDate(null);
                                                            setEndDate(null);
                                                        }}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-5 w-5"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M6 18L18 6M6 6l12 12"
                                                            />
                                                        </svg>
                                                    </span>
                                                )}
                                            </div>
                                        }
                                    />
                                </div>
                                <div className="mr-8 mt-14" style={{ marginLeft: '-10.7rem' }}>
                                    <span className="block text-gray-500 text-sm">Por ejemplo: 01/01/2023 - 31/12/2023</span>
                                </div>
                            </div>

                        </div>


                        <div className="grid grid-cols-2 gap-5">
                            <Input
                                placeholder="Número de Sentencia/Dictamen"
                                name="numeroSentencia"
                                register={register}
                                errors={errors}
                                required
                            />
                            <span className="block text-gray-500 text-sm mt-5">Por ejemplo: 421-18-EP/23</span>

                            <Input
                                placeholder="Número de Caso"
                                name="numeroCaso"
                                register={register}
                                errors={errors}
                            />
                            <span className="block text-gray-500 text-sm mt-5">Por ejemplo: 421-18-EP</span>

                            <div>
                                <Select
                                    isMulti
                                    options={actionOptions}
                                    value={selectedActions}
                                    onChange={handleSelectChange}
                                    placeholder="Seleccione las acciones/competencias"
                                    closeMenuOnSelect={false}
                                    hideSelectedOptions={false}
                                    className="mt-1"
                                    styles={selectHeightStyles}
                                />
                            </div>
                            <span className="block text-gray-500 text-sm mt-5">Por ejemplo: JP - Acción de Protección</span>

                            <Select
                                isMulti
                                options={actionOptions} // Ajusta esto para que use las opciones de jueces
                                value={selectedJuez}
                                onChange={handleSelectJuezChange}
                                placeholder="Seleccione el juez ponente"
                                closeMenuOnSelect={false}
                                hideSelectedOptions={false}
                                className="mt-1"
                                styles={selectHeightStyles}
                            />
                            <span className="block text-gray-500 text-sm mt-5">Por ejemplo:Karla Andrade</span>

                            <Select
                                isMulti
                                options={actionOptions} // Ajusta esto para que use las opciones de decisiones
                                value={selectedDesicion}
                                onChange={handleSelectDesicionChange}
                                placeholder="Seleccione la decisión"
                                closeMenuOnSelect={false}
                                hideSelectedOptions={false}
                                className="mt-1"
                                styles={selectHeightStyles}
                            />
                            <span className="block text-gray-500 text-sm mt-5">Por ejemplo: Acción de Protección</span>

                            <Select
                                isMulti
                                options={actionOptions} // Ajusta esto para que use las opciones de materia
                                value={selectedMateria}
                                onChange={handleSelectMateriaChange}
                                placeholder="Seleccione la materia"
                                closeMenuOnSelect={false}
                                hideSelectedOptions={false}
                                className="mt-1"
                                styles={selectHeightStyles}
                            />
                            <span className="block text-gray-500 text-sm mt-5">Por ejemplo: Laboral</span>



                        </div>
                        <div className="mt-6 flex justify-between">
                            <button
                                type="submit"
                                className="bg-colorcito hover:bg-white hover:text-colorcito hover:border-colorcito border-2 border-transparent text-white font-bold py-2 px-4 rounded"
                            >
                                Buscar
                            </button>
                            <button
                                type="button"
                                onClick={handleReset}
                                className="bg-red-500 hover:bg-white hover:text-red-500 hover:border-red-500 border-2 border-transparent text-gray-800 font-bold py-2 px-4 rounded"
                            >
                                Limpiar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default BusquedaAvanzadaPage;