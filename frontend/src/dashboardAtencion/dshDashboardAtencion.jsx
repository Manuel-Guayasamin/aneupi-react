import { Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServicios } from "../../src/redux/slices/serviciosSlice";
import DshLayout from "./layoutAtencion/dshLayoutA";
// import { ProtectedRoute } from '../dashboard/layout/ProtectedRoute';
import DshBienvenida from "./pagesAtencion/dshBienvenida";

const DshDashboard = () => {
  const dispatch = useDispatch();
  const servicios = useSelector((state) => state.servicios.servicios);

  useEffect(() => {
    dispatch(fetchServicios());
  }, [dispatch]);

  return (
    <DshLayout>
      <Routes>
        {/* <Route path="/bienvenida" element={<ProtectedRoute><DshBienvenida /></ProtectedRoute>} /> */}
        {/* <Route path="/bienvenida" element={<DshBienvenida />} /> */}
        {servicios.map((servicio) => (
          <Route
            key={servicio.nombre}
            path={`/${servicio.nombre.toLowerCase()}`}
            element={<DshBienvenida id_servicio={servicio.id} />}
          />
        ))}
      </Routes>
    </DshLayout>
  );
};

export default DshDashboard;
