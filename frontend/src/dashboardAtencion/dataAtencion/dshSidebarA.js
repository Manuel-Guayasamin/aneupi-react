import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServicios } from "../../redux/slices/serviciosSlice";
import { BiSolidDashboard } from "react-icons/bi";

// Esta función crea los elementos del sidebar
export const useSidebarItems = () => {
    const dispatch = useDispatch();
    const servicios = useSelector((state) => state.servicios.servicios);

    useEffect(() => {
        dispatch(fetchServicios());
    }, [dispatch]);

    const sidebarItems = servicios.map((servicio) => ({
        title: servicio.nombre,
        icon: BiSolidDashboard,
        //to: "/dashboardAtencion/bienvenida",
        to: `/dashboardAtencion/${servicio.slug || servicio.nombre.toLowerCase()}`,
    }));

    return sidebarItems;
};

