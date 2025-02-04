import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./admin.css";

import AdminLayout from "./adLayout";
import AdminEventos from "./Eventos/adEvents";
import AdminUsuarios from "./adUsers";
import AdminTrabajos from "./Trabajos/adTrabajos";
import AdminPracticas from "./Practicas/adPracticas";
/* import AdminPostulanteSolicitud from './PostulanteSolicitud/adPostulante'; */
import { useSelector } from "react-redux";
import AdminServicios from "./Servicios/adServicios";

const AdminHome = () => {
  const { active, usuario } = useSelector((state) => state.authentication);

  const navigate = useNavigate();

  useEffect(() => {
    if (active && usuario.id_rol === 2) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <AdminLayout>
      <main className="p-4">
        <Routes>
          <Route
            path="/admin-home"
            element={<div>Página principal de Admin</div>}
          />
          <Route path="/admin-usuario" element={<AdminUsuarios />} />
          <Route path="/admin-eventos" element={<AdminEventos />} />
          <Route path="/admin-trabajos" element={<AdminTrabajos />} />
          <Route path="/admin-practicas" element={<AdminPracticas />} />
          <Route path="/admin-servicios" element={<AdminServicios />} />
          {/* <Route
						path='/admin-postulantes'
						element={<AdminPostulanteSolicitud />}
					/> */}
        </Routes>
      </main>
    </AdminLayout>
  );
};

export default AdminHome;
