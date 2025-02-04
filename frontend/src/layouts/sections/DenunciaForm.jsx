import React, { useEffect, useState } from "react";
import { universidades } from "../../data/constants";

export const StudentSelection = [
    { label: "Si", value: "Si" },
    { label: "No", value: "No" },
];

const DenunciaForm = ({
    showModal,
    setShowModal,
    onSubmit,
    handleSubmit,
    reset,
    register,
    errors
}) => {

    const [isStudent, setIsStudent] = useState("Si");
    const [isFromEcuador, setIsFromEcuador] = useState("Si");
    const [universidad, setUniversidad] = useState("");

    useEffect(() => {
        if (!showModal) {
            reset();
        }
    }, [showModal, reset]);

    const handleFormSubmit = (data) => {
        console.log(isStudent === "No");
        if (isStudent === "No") {
            onSubmit({
                ...data,
                isStudent,
                isFromEcuador,
                universidad: "",
            });
            return
        }
        onSubmit({
            ...data,
            isStudent,
            isFromEcuador,
            universidad,
        });
        setUniversidad("");
        reset();
    };

    const handleCloseModal = () => {
        setUniversidad("");
        setShowModal(false);
        reset();
    };

    const handleUniversityChange = (e) => {
        setUniversidad(e.target.value);
    };

    return (
        showModal && (
            <div className="fixed inset-0 z-50 grid p-2 overflow-auto bg-gray-900 bg-opacity-50 md:p-4 place-items-center">
                <div className="modal-box rounded-xl">
                    <div className="flex justify-end gap-4">
                        <button type="button" onClick={handleCloseModal}>
                            ✖
                        </button>
                    </div>


                    <h3 className="mb-4 text-2xl font-bold text-left">Llene sus datos</h3>
                    <div>
                        <form onSubmit={handleSubmit(handleFormSubmit)}
                            className="grid w-full gap-4 px-2">
                            {/* Nombre y apellido */}
                            <fieldset>
                                <label
                                    htmlFor="nombres y apellidos"
                                    className="block text-sm font-medium text-gray-900"
                                >
                                    Nombres y apellidos
                                </label>
                                <input
                                    name="nombres"
                                    type="text"
                                    placeholder="Juan Perez"
                                    className="w-full text-sm input input-bordered input-ghost text-gray-900"
                                    {...register("nombres", { required: "Por favor, ingrese su nombre completo" })}

                                />
                                <span className="text-sm text-red-500">{errors.nombres?.message}</span>
                            </fieldset>


                            {/* Estudiante y Estudia en Ecuador */}
                            <div className="grid gap-2 sm:grid-cols-2">
                                <fieldset className="flex-1">
                                    <label htmlFor="estudiante" className="block text-sm font-medium text-gray-900">
                                        ¿Es estudiante?
                                    </label>
                                    <select
                                        id="estudiante"
                                        className="w-full text-sm input input-bordered input-ghost text-gray-900"
                                        value={isStudent}
                                        onChange={(e) => setIsStudent(e.target.value)}
                                    >
                                        {StudentSelection.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <span className="text-sm text-red-500">{errors.isStudent?.message}</span>
                                </fieldset>

                                {isStudent === "Si" && (
                                    <fieldset className="flex-1">
                                        <label className="block text-sm font-medium text-gray-900">¿Estudia en Ecuador?</label>
                                        <select
                                            value={isFromEcuador}
                                            onChange={(e) => setIsFromEcuador(e.target.value)}
                                            aria-label="Seleccionar si estudia en Ecuador"
                                            className="w-full text-sm input input-bordered input-ghost text-gray-900"
                                        >
                                            {StudentSelection.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                        <span className="text-sm text-red-500">{errors.isFromEcuador?.message}</span>
                                    </fieldset>
                                )}
                            </div>

                            {/* Universidad */}
                            {isStudent === "Si" && (
                                <fieldset>
                                    <label className="block text-sm font-medium text-gray-900">
                                        {isFromEcuador === "Si" ? "Seleccione su universidad" : "Escriba el nombre de su universidad"}
                                    </label>
                                    {isFromEcuador === "Si" ? (
                                        <select
                                            value={universidad}
                                            onChange={(e) => setUniversidad(e.target.value)}
                                            aria-label="Seleccionar universidad"
                                            className="w-full text-sm input input-bordered input-ghost text-gray-900"
                                        >
                                            {/* Opción predeterminada */}
                                            <option value="" disabled>
                                                Seleccione su universidad
                                            </option>

                                            {/* Opciones de universidades */}
                                            {universidades.map((u) => (
                                                <option key={u.nombre} value={u.nombre}>
                                                    {u.nombre}, ({u.siglas})
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type="text"
                                            value={universidad}
                                            onChange={(e) => setUniversidad(e.target.value)}
                                            aria-label="Nombre de la universidad"
                                            placeholder="Escriba el nombre de su universidad"
                                            className="w-full text-sm input input-bordered input-ghost text-gray-900"
                                        />
                                    )}
                                    <span className="text-sm text-red-500">{errors.universidad?.message}</span>
                                </fieldset>
                            )}




                            {/* Correo */}
                            <fieldset>
                                <label className="block text-sm font-medium text-gray-900">Correo electrónico</label>
                                <input
                                    {...register("email", { required: "Por favor, ingrese su correo electrónico" })}
                                    placeholder="juanitoperez@gmail.com"
                                    className="w-full text-sm input input-bordered input-ghost text-gray-900"
                                />
                                <span className="text-sm text-red-500">{errors.email?.message}</span>
                            </fieldset>

                            {/* Teléfono */}
                            <fieldset>
                                <label className="block text-sm font-medium text-gray-900">Teléfono</label>
                                <input
                                    {...register("telefono", {
                                        required: "Por favor, ingrese su número de teléfono",
                                        minLength: {
                                            value: 10,
                                            message: "El número debe tener al menos 10 caracteres",
                                        },
                                        maxLength: {
                                            value: 10,
                                            message: "El número no debe exceder los 10 caracteres",
                                        },
                                    })}
                                    placeholder="0987456321"
                                    className="w-full text-sm input input-bordered input-ghost text-gray-900"
                                />
                                <span className="text-sm text-red-500">{errors.telefono?.message}</span>
                            </fieldset>

                            {/* Asunto */}
                            <fieldset>
                                <label className="block text-sm font-medium text-gray-900">Asunto</label>
                                <input
                                    {...register("asunto", {
                                        required: "Por favor, ingrese el asunto",
                                        minLength: {
                                            value: 5,
                                            message: "El asunto debe tener al menos 5 caracteres",
                                        },
                                    })}
                                    placeholder="Denuncia sobre acoso"
                                    className="w-full text-sm input input-bordered input-ghost text-gray-900"
                                />
                                <span className="text-sm text-red-500">{errors.asunto?.message}</span>
                            </fieldset>

                            {/* Mensaje */}
                            <fieldset>
                                <label className="block text-sm font-medium text-gray-900">Mensaje</label>
                                <textarea
                                    {...register("mensaje", {
                                        required: "Por favor, ingrese su mensaje",
                                        minLength: {
                                            value: 10,
                                            message: "El mensaje debe tener al menos 10 caracteres",
                                        },
                                    })}
                                    placeholder="Quiero denunciar que..."
                                    className="w-full textarea textarea-bordered"
                                />
                                <span className="text-sm text-red-500">{errors.mensaje?.message}</span>
                            </fieldset>

                            {/* Enviar */}
                            <div className="flex justify-end gap-4">
                                <button
                                    className="px-4 py-2 text-red-700 bg-white rounded-lg hover:text-white hover:bg-red-700 hover:shadow-lg hover:shadow-gray-500"
                                    onClick={handleCloseModal}
                                >
                                    Cerrar
                                </button>
                                <button
                                    className="px-4 py-2 text-sm text-white bg-colorcito rounded-lg hover:bg-colorcito hover:shadow-lg hover:shadow-gray-500"
                                >
                                    Enviar
                                </button>
                            </div>
                        </form>

                    </div>

                </div>
            </div>
        )
    );
};

export default DenunciaForm;
