import "animate.css";
import "react-medium-image-zoom/dist/styles.css";
import "react-multi-carousel/lib/styles.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import AdminHome from "./admin_pages/adHome";
import AboutPage from "./pages/AboutPage/AboutPage";
import PrivacyPage from "./pages/AboutPage/PrivacyPage/PrivacyPage";
import CongresoPage from "./pages/CongresoPage/CongresoPage";
import ConvenioPage from "./pages/ConvenioPage/conveniopage";
import DonacionesPage from "./pages/DonacionesPage/DonacionesPage";
import EventoPage from "./pages/EventoPage/EventoPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import OfertaPage from "./pages/OfertaPage/OfertaPage";
import OfertaPracticaPage from "./pages/OfertaPage/OfertaPracticaPage";
import PracticaPage from "./pages/PracticaPage/PracticaPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import EventoDetallePage from "./pages/EventoPage/EventoDetallePage";
import AtencionPage from "./pages/AtencionPage/AtencionPage";
import BibliotecaPage from "./pages/BibliotecaPage/BibliotecaPage";
import RevistaDetallePage from "./pages/BibliotecaPage/RevistaDetallePage";
import ArticulosPage from "./pages/BibliotecaPage/ArticulosPage";
import RevistasPage from "./pages/BibliotecaPage/RevistasPage";
import LibrosPage from "./pages/BibliotecaPage/LibrosPage";
import DshDashboard from "./dashboard/dshDashboard";
import ReportPage from "./pages/ReportPage/ReportPage";
import DshDashboardAtencion from "./dashboardAtencion/dshDashboardAtencion";
import { HistoriaPage } from "./pages/AboutPage/historiaPage";
//Todas las importaciones de las paginas usadas en el modulo de "Nosotros" del dashboard
import MisionPage from "./pages/AboutPage/MisionPage"; //importo Mision Page
import OrganigramaPage from "./pages/AboutPage/OrganigramaPage"; //importo Organigrama Page
import EstructuraPage from "./pages/AboutPage/EstructuraPage"; //importo Estructura Page
import ContactanosPage from "./pages/AboutPage/ContactanosPage"; //importo Contacto Page
import ExpedientesPage from "./pages/BibliotecaPage/ExpedientesPage"; //importo Sentencias Page
import BusquedaAvanzadaPage from "./pages/BibliotecaPage/BusquedaAvanzadaPage"; //importo Busqueda Avanzada Page
import SentenciasPage from "./pages/BibliotecaPage/SentenciasPage"; //importo Busqueda Avanzada Page
import ResolucionesPage from "./pages/BibliotecaPage/ResolucionesPage";

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        {/* 1- Menú INICIO */}
        <Route path="/*" element={<HomePage />} />
        {/* 2- Menú ANEUPI */}
        <Route path="/acerca-de-nosotros" element={<AboutPage />} />
        <Route
          path="/acerca-de-nosotros/politicas-de-privacidad"
          element={<PrivacyPage />}
        />
        {/* 0- Sesión */}
        <Route path="/iniciar-sesion" element={<LoginPage />} />

        <Route path="/registrarse" element={<RegisterPage />} />
        {/* 6- Menú Convenios */}
        <Route path="/convenios" element={<ConvenioPage />} />
        {/* 6- Menú Convenios */}
        <Route path="/donaciones" element={<DonacionesPage />} />
        <Route path="/practicasgit " element={<PracticaPage />} />

        {/* 8- Menú Vacantes */}
        <Route path="/ofertas-laborales" element={<OfertaPage />} />
        <Route path="/historia" element={<HistoriaPage />} />

        <Route path="/ofertas-practicas" element={<OfertaPracticaPage />} />
        {/* 4- Menú Eventos */}
        <Route path="/eventos" element={<EventoPage />} />

        <Route path="/eventos/:id" element={<EventoDetallePage />} />

        <Route path="/revistas/:id" element={<RevistaDetallePage />} />

        <Route path="/congreso-internacional" element={<CongresoPage />} />

        <Route path="/atencion-en-linea" element={<AtencionPage />} />

        <Route path="/ad/*" element={<AdminHome />} />
        <Route path="/reportes" element={<ReportPage />} />
        <Route path="/dashboard/*" element={<DshDashboard />} />

        <Route path="/biblioteca" element={<BibliotecaPage />} />
        <Route path="/dashboardAtencion/*" element={<DshDashboardAtencion />} />

        <Route path="/biblioteca" element={<BibliotecaPage />} />

        <Route path="/articulos" element={<ArticulosPage />} />

        <Route path="/revistas" element={<RevistasPage />} />

        <Route path="/libros" element={<LibrosPage />} />
        {/*Todas las rutas para el uso del modulo de "Nosotros" del dashboard*/}
        <Route path="/mision" element={<MisionPage />} />
        <Route path="/organigrama" element={<OrganigramaPage />} />
        <Route path="/estructura" element={<EstructuraPage />} />
        <Route path="/contactanos" element={<ContactanosPage />} />
        <Route path="/expedientes" element={<ExpedientesPage />} />
        <Route path="/sentencias" element={<SentenciasPage />} />
        <Route path="/resoluciones" element={<ResolucionesPage />} />
        <Route path="/busqueda-avanzada" element={<BusquedaAvanzadaPage />} />
      </Routes>
    </>
  );
}

export default App;
