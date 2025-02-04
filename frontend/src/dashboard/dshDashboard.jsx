import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DshLayout from './layout/dshLayout';
import { ProtectedRoute } from './layout/ProtectedRoute';

import DshHome from './pages/dshHome';
import DshUsers from './pages/dshUsers';
import DshTrabajos from './pages/dshTrabajos';
import DshConvenio from './pages/dshConvenio';
import DshEvents from './pages/dshEvents';
import DshServices from './pages/dshServices';
import DshPracticas from './pages/dshPracticas';
import DshContacto from './pages/dshContacto';

import DshPostulaPracticas from './pages/Postulaciones/dshPostulaPracticas';
import DshPostulaTrabajo from './pages/Postulaciones/dshPostulaTrabajo';
import DshPostulaSolicitudes from './pages/Postulaciones/dshPostulaSolicitudes';
import DshBiblioteca from './pages/dshBiblioteca';
import DshExpediente from './pages/dshExpediente';
import DshProfesionales from './pages/dshProfesionales';
import DshPaises from './pages/dshPaises';
import DshCiudades from './pages/dshCiudades';
import DshCitas from './pages/dshCitas';
import DshPostulaPracticasLibres from './pages/Postulaciones/dshPostulaPracticasLibres';
import DshPostulaTrabajoLibre from './pages/Postulaciones/dshPostulaTrabajoLibre';
import DshDenuncia from './pages/dshDenuncias';


const DshDashboard = () => {
  return (
    <DshLayout>
      <Routes>
        <Route path="/inicio" element={<ProtectedRoute><DshHome /></ProtectedRoute>} />
        <Route path="/usuarios" element={<ProtectedRoute><DshUsers /></ProtectedRoute>} />
        <Route path="/trabajos" element={<ProtectedRoute><DshTrabajos /></ProtectedRoute>} />
        <Route path="/convenios" element={<ProtectedRoute><DshConvenio /></ProtectedRoute>} />
        <Route path="/eventos" element={<ProtectedRoute><DshEvents /></ProtectedRoute>} />
        <Route path="/practicas" element={<ProtectedRoute><DshPracticas /></ProtectedRoute>} />
        <Route path="/postulaciones-practicas" element={<ProtectedRoute><DshPostulaPracticas /></ProtectedRoute>} />
        <Route path="/postulaciones-trabajos" element={<ProtectedRoute><DshPostulaTrabajo /></ProtectedRoute>} />
        {/* <Route path="/postulaciones-solicitudes" element={<ProtectedRoute><DshPostulaSolicitudes /></ProtectedRoute>} /> */}

        <Route path="/servicios" element={<ProtectedRoute><DshServices /></ProtectedRoute>} />
        <Route path="/profesionales" element={<ProtectedRoute><DshProfesionales /></ProtectedRoute>} />
        <Route path="/paises" element={<ProtectedRoute><DshPaises /></ProtectedRoute>} />
        {/* <Route path="/ciudades" element={<ProtectedRoute><DshCiudades /></ProtectedRoute>} /> */}
        <Route path="/contactos" element={<ProtectedRoute><DshContacto /></ProtectedRoute>} />
        <Route path="/biblioteca" element={<ProtectedRoute><DshBiblioteca /></ProtectedRoute>} />
        <Route path="/expediente" element={<ProtectedRoute><DshExpediente /></ProtectedRoute>} />
        <Route path="/citas" element={<ProtectedRoute><DshCitas /></ProtectedRoute>} />

        <Route path="/postulaciones-practicas-libres" element={<ProtectedRoute><DshPostulaPracticasLibres /></ProtectedRoute>} />
        <Route path="/postulaciones-trabajos-libres" element={<ProtectedRoute><DshPostulaTrabajoLibre /></ProtectedRoute>} />

        <Route path="/reportes" element={<ProtectedRoute><DshDenuncia /></ProtectedRoute>} />

      </Routes>
    </DshLayout>
  )
}

export default DshDashboard;
