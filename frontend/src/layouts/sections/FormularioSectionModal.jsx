//import React from "react";
import React, { useEffect } from "react";


const FormularioSectionModal = ({
    showModal,
    setShowModal,
    handleSubmit,
    onSubmit,
    register,
    errors,
    reset,
    paises = [] // Valor predeterminado como un array vacío
}) => {

    useEffect(() => {
        if (!showModal) {
            reset(); // 
        }
    }, [showModal, reset]);

    return (
        showModal && (
            <div className="fixed inset-0 z-50 grid p-2 overflow-auto bg-gray-900 bg-opacity-50 md:p-4 place-items-center">
                <div className="modal-box rounded-xl">
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            color="danger" variant="light"
                            onClick={() => setShowModal(false)}
                        >
                            ✖
                        </button>
                    </div>
                    <h3 className="mb-4 text-2xl font-bold text-left">¡Contáctanos!</h3>
                    <div>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="grid w-full gap-2"
                        >
                            <div className="grid gap-2 sm:grid-cols-2">
                                {/* Nombre */}
                                <fieldset className="flex-1">
                                    <label
                                        htmlFor="nombres"
                                        className="block text-sm font-medium text-gray-900"
                                    >
                                        Nombre:
                                    </label>
                                    <input
                                        name="nombres"
                                        type="text"
                                        {...register("nombres", {
                                            required: "Por favor, ingrese su nombre",
                                        })}
                                        placeholder="Juan"
                                        className="w-full text-sm text-gray-900 input input-bordered input-ghost"
                                    />
                                    {errors.nombres && (
                                        <span className="mt-2 text-white badge badge-error badge-sm">
                                            {errors.nombres.message}
                                        </span>
                                    )}
                                </fieldset>

                                {/* Apellido */}
                                <fieldset className="flex-1">
                                    <label
                                        htmlFor="apellidos"
                                        className="block text-sm font-medium text-gray-900"
                                    >
                                        Apellidos:
                                    </label>
                                    <input
                                        {...register("apellidos", {
                                            required: "Este campo es requerido",
                                        })}
                                        type="text"
                                        placeholder="Perez"
                                        id="apellidos"
                                        className="w-full text-sm input input-bordered"
                                    />
                                    {errors.apellidos && (
                                        <p className="mt-1 text-white badge badge-error badge-sm">
                                            {errors.apellidos.message}
                                        </p>
                                    )}
                                </fieldset>

                                {/* Telefono */}
                                <fieldset className="flex-1">
                                    <label
                                        htmlFor="telefono"
                                        className="block text-sm font-medium text-gray-900"
                                    >
                                        Teléfono:
                                    </label>
                                    <input
                                        {...register("telefono", {
                                            required: "Este campo es requerido",
                                            pattern: {
                                                value: /^[0-9]+$/,
                                                message: "El número de teléfono debe contener solo dígitos",
                                            },
                                        })}
                                        type="tel"
                                        placeholder="0000000000"
                                        id="telefono"
                                        className="w-full text-sm input input-bordered"
                                    />
                                    {errors.telefono && (
                                        <p className="mt-1 text-white badge badge-error badge-sm">
                                            {errors.telefono.message}
                                        </p>
                                    )}
                                </fieldset>

                                {/* Email */}
                                <fieldset className="flex-1">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-900"
                                    >
                                        Correo Electrónico:
                                    </label>
                                    <input
                                        {...register("email", {
                                            required: "Este campo es requerido",
                                            pattern: {
                                                value: /^\S+@\S+\.\S+$/,
                                                message: "Ingrese una dirección de correo electrónico válida",
                                            },
                                        })}
                                        type="email"
                                        placeholder="juanperez@gmail.com"
                                        id="email"
                                        className="w-full text-sm input input-bordered"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-white badge badge-error badge-sm">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </fieldset>

                                {/* País */}
                                <fieldset className="flex-1">
                                    <label
                                        htmlFor="pais_id"
                                        className="block text-sm font-medium text-gray-900"
                                    >
                                        País:
                                    </label>
                                    <select
                                        {...register("pais_id", {
                                            required: "Seleccione un país",
                                        })}
                                        id="pais_id"
                                        className="w-full text-sm input input-bordered input-ghost text-gray-900"
                                    >
                                        {/* Agregar opciones para el menú desplegable */}
                                        <option value="">Seleccione un país</option>
                                        {paises.map((pais) => (
                                            <option key={pais.id} value={pais.id}>
                                                {pais.nombre}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.pais_id && (
                                        <p className="mt-2 text-white badge badge-error badge-sm">
                                            {errors.pais_id.message}
                                        </p>
                                    )}
                                </fieldset>

                                {/* Lugar */}
                                <fieldset className="flex-1">
                                    <label
                                        htmlFor="ciudad"
                                        className="block text-sm font-medium text-gray-900"
                                    >
                                        Ciudad/Cantón/Lugar:
                                    </label>
                                    <input
                                        {...register("ciudad", { required: "Este campo es requerido" })}
                                        type="text"
                                        placeholder="Cantón Daule"
                                        id="ciudad"
                                        className="w-full text-sm input input-bordered"
                                    />
                                    {errors.ciudad && (
                                        <p className="mt-2 text-white badge badge-error badge-sm">
                                            {errors.ciudad.message}
                                        </p>
                                    )}
                                </fieldset>

                                {/* Interés */}
                                <fieldset className="flex-1">
                                    <label
                                        htmlFor="asunto"
                                        className="block text-sm font-medium text-gray-900"
                                    >
                                        Asunto:
                                    </label>
                                    <input
                                        {...register("asunto", { required: "Este campo es requerido" })}
                                        type="text"
                                        placeholder="Información"
                                        id="asunto"
                                        className="w-full text-sm input input-bordered"
                                    />
                                    {errors.asunto && (
                                        <p className="mt-1 text-white badge badge-error badge-sm">
                                            {errors.asunto.message}
                                        </p>
                                    )}
                                </fieldset>

                                {/* Discapacidad */}
                                <fieldset className="flex-1">
                                    <label
                                        htmlFor="discapacidad"
                                        className="block text-sm font-medium text-gray-900"
                                    >
                                        Discapacidad:
                                    </label>
                                    <select
                                        {...register("discapacidad", {
                                            required: "Este campo es requerido",
                                        })}
                                        id="discapacidad"
                                        className="w-full text-sm input input-bordered"
                                    >
                                        <option value="">Seleccione una opción</option>
                                        <option value="true">Sí</option>
                                        <option value="false">No</option>
                                    </select>
                                    {errors.discapacidad && (
                                        <p className="mt-2 text-white badge badge-error badge-sm">
                                            {errors.discapacidad.message}
                                        </p>
                                    )}
                                </fieldset>
                            </div>

                            {/* Mensaje */}
                            <fieldset className="col-span-2">
                                <label
                                    htmlFor="mensaje"
                                    className="block text-sm font-medium text-gray-900"
                                >
                                    Mensaje:
                                </label>
                                <textarea
                                    {...register("mensaje", {
                                        required: "Este campo es requerido",
                                    })}
                                    placeholder="Necesito Información sobre..."
                                    id="mensaje"
                                    className="w-full textarea textarea-bordered"
                                    rows="4"
                                ></textarea>
                                {errors.mensaje && (
                                    <p className="mt-1 text-white badge badge-error badge-sm">
                                        {errors.mensaje.message}
                                    </p>
                                )}
                            </fieldset>

                            <fieldset className="flex items-center justify-end gap-4">
                                <button
                                    type="button"
                                    //className="px-4 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700"
                                    className="px-4 py-2 text-red-700 bg-white rounded-lg hover:text-white hover:bg-red-700 hover:shadow-lg hover:shadow-gray-500"
                                    //onClick={closeModal}
                                    onClick={() => setShowModal(false)}
                                >
                                    Cerrar
                                </button>
                                <button
                                    type="submit"
                                    //color="primary"
                                    className="px-4 py-2 text-sm text-white bg-colorcito rounded-lg hover:bg-colorcito hover:shadow-lg hover:shadow-gray-500"
                                >
                                    Enviar
                                </button>

                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        )
    );

};

export default FormularioSectionModal;
