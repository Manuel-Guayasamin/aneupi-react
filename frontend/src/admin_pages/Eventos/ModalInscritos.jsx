import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/button";
import { FaRegFilePdf } from "react-icons/fa6";
import { RxOpenInNewWindow } from "react-icons/rx";
import { FaTrash, FaCheck } from "react-icons/fa6";
import { toast } from "react-toastify";

const serverURL = import.meta.env.VITE_API_URL;

const ModalInscritos = ({ showModal, closeModal, postId }) => {
  const [inscripciones, setInscripciones] = useState([]);

  const [ponentes, setPonentes] = useState([]);

  useEffect(() => {
    fetch(`${serverURL}/api/inscripciones/${postId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setInscripciones(data);
      });
  }, []);

  useEffect(() => {
    fetch(`${serverURL}/api/inscripciones/ponentes/${postId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPonentes(data);
      });
  }, []);

  const eliminarInscripcion = (id_inscripcion) => {
    fetch(`${serverURL}/api/inscripciones/${id_inscripcion}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setInscripciones((currentInscripciones) =>
            currentInscripciones.filter((ins) => ins.id !== id_inscripcion)
          );
          toast.success("Inscripción eliminada correctamente");
        } else {
          response.json().then((data) => {
            toast.error(data.message || "No se pudo eliminar la inscripción");
          });
        }
      })
      .catch((error) => {
        toast.error("Error al eliminar la inscripción");
      });
  };

  const eliminarPonente = (id_ponente) => {
    fetch(`${serverURL}/api/inscripciones/ponentes/${id_ponente}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setPonentes((currentPonentes) =>
            currentPonentes.filter((ponente) => ponente.id !== id_ponente)
          );
          toast.success("Ponente eliminado correctamente");
        } else {
          response.json().then((data) => {
            toast.error(data.message || "No se pudo eliminar al Ponente");
          });
        }
      })
      .catch((error) => {
        toast.error("Error al eliminar al ponente");
      });
  };

  const aprobarPonente = (id_ponente) => {
    fetch(`${serverURL}/api/inscripciones/ponentes/aprobar/${id_ponente}`, {
      method: "POST", // Asumiendo que es un método POST
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast.success("Ponente aprobado correctamente");
          // Actualizar estado o recargar ponentes
          setPonentes((ponentes) =>
            ponentes.map((ponente) =>
              ponente.id === id_ponente
                ? { ...ponente, aprobado: true }
                : ponente
            )
          );
        } else {
          toast.error(data.message || "No se pudo aprobar al ponente");
        }
      })
      .catch((error) => {
        toast.error("Error al aprobar al ponente");
      });
  };

  const desaprobarPonente = (id_ponente) => {
    fetch(`${serverURL}/api/inscripciones/ponentes/desaprobar/${id_ponente}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast.success("Ponente desaprobado correctamente");
          // Actualizar estado o recargar ponentes
          setPonentes((ponentes) =>
            ponentes.filter((ponente) => ponente.id !== id_ponente)
          );
        } else {
          toast.error(data.message || "No se pudo desaprobar al ponente");
        }
      })
      .catch((error) => {
        toast.error("Error al desaprobar al ponente");
      });
  };

  if (!showModal) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div style={{ background: "white", padding: "20px" }}>
        <h1 className="text-3xl font-bold leading-tight text-center text-gray-900 mb-4">
          Detalles del Evento
        </h1>
        <h2 className="text-xl font-bold leading-tight text-left text-gray-900 mb-4">
          Ponentes
        </h2>
        <div className="w-full mb-8 max-h-60 overflow-auto">
          <table className="w-full">
            <thead className="text-xs font-bold tracking-wider text-white uppercase">
              <tr className="colorcito text-center dark:bg-blue-700">
                <th className="px-4 py-2">Cédula</th>
                <th className="px-4 py-2">Nombres</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Edad</th>
                <th className="px-4 py-2">Profesión</th>
                <th className="px-4 py-2">Temática</th>
                <th className="px-4 py-2">Teléfono</th>
                <th className="px-4 py-2">Curriculum</th>
                <th className="px-4 py-2">Comprobante</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ponentes.map((ponente, index) => (
                <tr
                  className="text-black text-center dark:bg-blue-700"
                  key={index}
                >
                  <td className="px-4 py-2">{ponente.cedula}</td>
                  <td className="px-4 py-2">{ponente.nombres}</td>
                  <td className="px-4 py-2">{ponente.email}</td>
                  <td className="px-4 py-2">{ponente.edad}</td>
                  <td className="px-4 py-2">{ponente.profesion}</td>
                  <td className="px-4 py-2">{ponente.tematica}</td>
                  <td className="px-4 py-2">{ponente.telefono}</td>
                  <td>
                    {ponente.curriculum_url ? (
                      <div className="flex items-center justify-center">
                        <Button
                          as={Link}
                          color="primary"
                          className="text-white mx-auto"
                          isIconOnly
                          target="_blank"
                          to={ponente.curriculum_url}
                        >
                          <FaRegFilePdf size={20} />
                        </Button>
                      </div>
                    ) : (
                      <p>No hay curriculum</p>
                    )}
                  </td>
                  <td className="px-4 py-2 flex items-center justify-center">
                    {ponente.comprobante_url ? (
                      <div className="flex items-center justify-center">
                        <Button
                          as={Link}
                          color="success"
                          className="text-white mx-auto"
                          isIconOnly
                          target="_blank"
                          to={ponente.comprobante_url}
                        >
                          <FaRegFilePdf size={20} />
                        </Button>
                      </div>
                    ) : (
                      <p>No hay comprobante</p>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center justify-center space-x-2">
                      <Button
                        color="danger"
                        className="text-white mx-auto"
                        isIconOnly
                        onClick={() => eliminarPonente(ponente.id)}
                      >
                        <FaTrash size={20} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-bold leading-tight text-left text-gray-900 mb-4">
          Asistentes
        </h2>
        <div className="w-full mb-8 max-h-60 overflow-auto">
          <table className="w-full mb-8">
            <thead className="text-xs font-bold tracking-wider text-white uppercase">
              <tr className="colorcito  text-center  dark:bg-blue-700">
                <th className="px-4 py-2">Nombres</th>
                <th className="px-4 py-2">Apellidos</th>
                <th className="px-4 py-2">Dirección</th>
                <th className="px-4 py-2">Modalidad</th>
                <th className="px-4 py-2">Costo</th>
                <th className="px-4 py-2">Edad</th>
                <th className="px-4 py-2">Profesión</th>
                <th className="px-4 py-2">Cedula</th>
                <th className="px-4 py-2">Certificado Discapacidad</th>
                <th className="px-4 py-2">Comprobante</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {inscripciones.map((inscripcion, index) => (
                <tr
                  className="text-black text-center  dark:bg-blue-700"
                  key={inscripcion.id || index}
                >
                  <td className="px-4 py-2">{inscripcion.nombres}</td>
                  <td className="px-4 py-2">{inscripcion.apellidos}</td>
                  <td className="px-4 py-2">{inscripcion.direccion}</td>
                  <td className="px-4 py-2">{inscripcion.id_modalidad}</td>
                  <td className="px-4 py-2">{inscripcion.costo}</td>
                  <td className="px-4 py-2">{inscripcion.edad}</td>
                  <td className="px-4 py-2">{inscripcion.profesion}</td>
                  <td className="px-4 py-2">{inscripcion.cedula}</td>
                  <td className="px-4 py-2 flex items-center justify-center">
                    {inscripcion.certificado_url ? (
                      <div className="flex items-center justify-center">
                        <Button
                          as={Link}
                          color="secondary"
                          className="text-white mx-auto"
                          isIconOnly
                          target="_blank"
                          to={inscripcion.certificado_url}
                        >
                          <FaRegFilePdf size={20} />
                        </Button>
                      </div>
                    ) : (
                      <p className="px-4 py-2">No tiene discapacidad</p>
                    )}
                  </td>
                  <td className="px-4 py-2 ">
                    {inscripcion.comprobante_url ? (
                      <div className="flex items-center justify-center">
                        <Button
                          color="success"
                          className="text-white mx-auto"
                          as={Link}
                          isIconOnly
                          target="_blank"
                          to={inscripcion.comprobante_url}
                        >
                          <FaRegFilePdf size={20} />
                        </Button>
                      </div>
                    ) : (
                      <p>No hay comprobante</p>
                    )}
                  </td>

                  <td className="px-4 py-2">
                    <div className="flex items-center justify-center">
                      <Button
                        color="danger"
                        className="text-white mx-auto"
                        isIconOnly
                        onClick={() => eliminarInscripcion(inscripcion.id)}
                      >
                        <FaTrash size={20} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button className="btn btn-error" onClick={closeModal}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ModalInscritos;
