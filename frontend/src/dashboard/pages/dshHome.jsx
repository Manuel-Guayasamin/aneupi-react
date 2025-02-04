import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getUsuarios } from "../../redux/slices/usuariosSlice";
import { fetchTrabajos } from "../../redux/slices/trabajosSlice";
import { fetchEvents } from "../../redux/slices/eventSlice";

import DshContainer from '../layout/dshContainer';
import DshInfoCard from '../components/dshInfoCard';
import DshDateDisplay from '../components/dshDateDisplay';
import { FaUserGroup, FaFileInvoice, FaComments, FaServer, FaBriefcase, FaCalendarDays, FaIdCardClip } from "react-icons/fa6";
import { fetchConvenios } from '../../redux/slices/conveniosSlice';
import { fetchContactos } from '../../redux/slices/contactosSlice';

const DshHome = () => {
  const usuario = useSelector((state) => state.authentication.usuario);
  const dispatch = useDispatch();
  const usuarios = useSelector((state) => state.usuarios.usuarios.totalItems);
  const trabajos = useSelector((state) => state.trabajos.trabajos);
  const eventos = useSelector((state) => state.eventos.eventos);
  const convenios = useSelector((state) => state.convenios.convenios);
  const contactos  = useSelector((state) => state.contactos.contactos);

  useEffect(() => {
    dispatch(getUsuarios({ page: 1, pageSize: 10 }));
    dispatch(fetchTrabajos());
    dispatch(fetchEvents());
    dispatch(fetchConvenios());
    dispatch(fetchContactos());
  }, [dispatch]);

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

  return (
    <DshContainer title={`${greeting}, ${usuario?.nombres && usuario.nombres}! 👋`} content={date}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        <DshInfoCard
          Icon={FaUserGroup}
          title="Usuarios"
          value={usuarios}
          color="bg-green-400"
          iconColor="text-green-600"
        />
        <DshInfoCard
          Icon={FaBriefcase}
          title="Trabajos"
          value={trabajos.length}
          color="bg-yellow-400"
          iconColor="text-yellow-600"
        />
        <DshInfoCard
          Icon={FaCalendarDays}
          title="Eventos"
          value={eventos.length}
          color="bg-orange-400"
          iconColor="text-orange-600"
        />
        <DshInfoCard
          Icon={FaFileInvoice}
          title="Convenios"
          value={convenios.length}
          color="bg-orange-400"
          iconColor="text-orange-600"
        />
        <DshInfoCard
          Icon={FaIdCardClip}
          title="Contacto"
          value={contactos.length}
          color="bg-indigo-400"
          iconColor="text-indigo-600"
        />
        <DshInfoCard
          Icon={FaServer}
          title="Server Load"
          value="34.12%"
          color="bg-red-400"
          iconColor="text-red-600"
        />
      </div>
    </DshContainer>
  )
}

export default DshHome;