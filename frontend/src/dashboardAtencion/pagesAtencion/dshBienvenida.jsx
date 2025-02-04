import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DshContainer from '../../dashboard/layout/dshContainer';
import DshDateDisplay from '../../dashboard/components/dshDateDisplay';
import { fetchServicioLineas } from "../../../src/redux/slices/serviciolineasSlice";
import { fetchServicios } from "../../redux/slices/serviciosSlice";
import { getAllUsuarios } from '../../redux/slices/usuariosSlice';
import { RiCalendarScheduleLine } from "react-icons/ri";
import { AiFillSchedule } from "react-icons/ai";
import { fetchServiciosCitas } from '../../redux/slices/serviciocitasSlice'
import ModalRegistroCita from "../../admin_pages/Citas/ModalRegistroCita";

import { Calendar, dayjsLocalizer } from "react-big-calendar" //librerias necesarias para manejar el calendar,
//import moment from 'moment';
//import 'moment/locale/es';
import "react-big-calendar/lib/css/react-big-calendar.css";
//se requiere el install de "npm install react-big-calendar y npm i dayjs

import dayjs from 'dayjs';
import "dayjs/locale/es";
import CitaInformacion from '../../components/ui/CitaInformacion';

dayjs.locale("es");
//moment.locale('es');
//const localizer = momentLocalizer(moment);

const DshBienvenida = ({ id_servicio }) => {
    const [showRegistroModal, setShowRegistroModal] = useState(false);
    const [selectedServicioId, setSelectedServicioId] = useState(null);

    const localizer = dayjsLocalizer(dayjs)

    const dispatch = useDispatch();
    const serviciosLinea = useSelector((state) => state.serviciolineas.serviciolineas);
    const servicios = useSelector((state) => state.servicios.servicios);
    const usuarios = useSelector((state) => state.usuarios.usuarios);
    const citas = useSelector((state) => state.citas.citas);

    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        dispatch(fetchServicioLineas());
        dispatch(fetchServicios());
        dispatch(getAllUsuarios());
        dispatch(fetchServiciosCitas())
    }, [dispatch]);

    //Obtener descripcion de los servicios
    const obtenerDescripcionServicio = (idServicio) => {
        const servicio = servicios.find(serv => serv.id === idServicio);
        return servicio ? servicio.descripcion : 'Error';
    };

    //Obtener profesionales relacionados al servicio con sus nombres y apellidos
    const obtenerNombreProfesional = (idProfesional) => {
        const profesional = usuarios.find(pro => pro.id === idProfesional);
        return profesional ? `${profesional.nombres} ${profesional.apellidos}` : 'Error';
    };

    // Filtrar serviciosLinea basado en id_servicio
    const serviciosFiltrados = serviciosLinea.filter(servicio => servicio.id_servicio === id_servicio);

    // Determinar la hora actual
    const currentHour = new Date().getHours();
    let greeting;

    // Determinar el saludo basado en la hora actual
    if (currentHour >= 5 && currentHour < 12) {
        greeting = "¡Buenos días";
    } else if (currentHour >= 12 && currentHour < 18) {
        greeting = "¡Buenas tardes";
    } else {
        greeting = "¡Buenas noches";
    }

    const date = <DshDateDisplay />;

    //Se mapea las citas realizadas para mostrar en el calendario con el nombre del solicitante de la cita
    const events = citas.map((cita) => ({
        start: dayjs(cita.fecha_inicio).toDate(),
        end: dayjs(cita.fecha_fin).toDate(),
        title: (
            <div className="flex items-center"> {/* bg-sky-700 */}
                <span className="mr-2">
                    <AiFillSchedule />
                </span>
                {cita.solicitante_nombre}
            </div>
        ),
    }));

    const openRegistroModal = (idServicio) => {
        setShowRegistroModal(true);
        setSelectedServicioId(idServicio);
    };

    const closeRegistroModal = () => {
        setShowRegistroModal(false);
        setSelectedServicioId(null);
    };

    return (
        <DshContainer title="Bienvenido al Portal de Atención en Línea de Fundación ANEUPI" content={date}>
            <ModalRegistroCita
                showModal={showRegistroModal}
                closeModal={closeRegistroModal}
                idServicio={selectedServicioId}
                setShowNotification={setShowNotification}
            />
            <div className="overflow-x-auto">
                <table className="w-full mb-8">
                    <thead className="text-xs font-bold tracking-wider text-white uppercase ">
                        <tr className='text-left colorcito dark:bg-blue-700'>
                            <th className="px-6 py-3">#</th>
                            <th className="px-6 py-3">Nombre del profesional</th>
                            <th className="px-6 py-3">Descripción del servicio</th>
                            <th className="px-6 py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="dsh-tertiary divider-y divider-yellow-400">
                        {serviciosFiltrados && serviciosFiltrados.map((servicio) => (
                            <tr key={servicio.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{servicio.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{obtenerNombreProfesional(servicio.id_profesional)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{obtenerDescripcionServicio(servicio.id_servicio)}</td>
                                <td className="px-6 py-4 text-sm whitespace-nowrap">
                                    <button
                                        //onClick={openRegistroModal}
                                        onClick={() => openRegistroModal(servicio.id)}
                                        className="mr-2 hover:text-blue-500 p-1.5 hover:bg-black/0 rounded-md badge badge-info">
                                        <RiCalendarScheduleLine /> Agendar Cita
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <article className="max-w-screen-xl py-8 mx-auto md:py-8">
                <main className='prose-sm text-center md:prose
                md:max-w-xl md:prose-h2:text-4xl prose-h2:text-colorcito
                 prose-h2:text-2xl prose-h2:font-bold md:text-left'>
                    <h2 className='dark:text-white'>Calendario de citas</h2></main>
            </article>
            <div class="h-[95vh] bg-red-50 dark:bg-slate-950" >
                <Calendar
                    style={{ stopColor: "#ffffff" }}
                    localizer={localizer}
                    events={events}
                    defaultView={'month'}
                    min={dayjs('0000-00-00T08:00:00').toDate()}
                    max={dayjs('0000-00-00T17:00:00').toDate()}
                    messages={{
                        today: 'Hoy',
                        previous: 'Atrás',
                        next: 'Siguiente',
                        month: 'Mes',
                        week: 'Semana',
                        day: 'Día',
                        agenda: 'Agenda',
                        date: 'Fecha',
                        time: 'Hora',
                        event: 'Citas',
                        allDay: 'Todo el día',
                        noEventsInRange: 'No hay citas en este rango',
                        showMore: (total) => `+ Ver más (${total})`,
                    }}
                />
            </div>
            <CitaInformacion
              showNotification={showNotification}
              setShowNotification={setShowNotification}
            />
        </DshContainer>
    )
}

export default DshBienvenida;
