import { useSelector } from "react-redux"; // Se importa useSelector de react-redux
import Layout from "../layout";
import BreadCrumb from "../../components/navigation/BreadCrumb";
import { FaNewspaper, FaBookOpen, FaTrello, FaWhatsapp } from "react-icons/fa6";
import ServiceCardBiblioteca from "../../components/ui/ServiceCardBiblioteca";
import DotsBackground from "../../assets/background/fondo.png";
import ImagenInclusiva from "../../assets/images/biblioteca/imagen.png";
import misionBiblioteca from "../../assets/images/biblioteca/misionBiblioteca.jpg";
import visionBiblioteca from "../../assets/images/biblioteca/visionBiblioteca.jpg";
import ValidationBiblioteca from "../../components/validations/ValidationBiblioteca"; //se importa el componente de validación de la biblioteca
import BibliotecaSection from "./sections/BibliotecaSection"; //se importa el componente de la sección de la biblioteca
import "../../App.css";
import Subtitle from "../../components/ui/Subtitle";
const breadcrumbLinks = [
  { label: "Inicio", path: "/" },
  { label: "Biblioteca", path: "/biblioteca" },
];
const BibliotecaPage = () => {
  const active = useSelector((state) => state.authentication.active);
  return (
    <Layout>
      <BreadCrumb
        links={breadcrumbLinks}
        title="Bienvenido a nuestra Biblioteca"
      />
      <main className="grid max-w-screen-xl gap-6 px-4 py-12 pt-20 mx-auto md:grid-cols-2 lg:grid-cols-3">
        <ServiceCardBiblioteca
          link="/revistas"
          Icon={FaNewspaper}
          title="Revistas"
          description="Explora nuestra selección de revistas, que ofrecen contenido actualizado regularmente sobre una variedad de temas, desde moda hasta ciencia."
        />

        <ServiceCardBiblioteca
          link="/libros"
          Icon={FaBookOpen}
          title="Libros"
          description="Descubre nuestra colección de libros, que abarcan una amplia gama de géneros, desde ficción hasta no ficción, y desde clásicos hasta bestsellers contemporáneos."
        />

        <ServiceCardBiblioteca
          link="/articulos"
          Icon={FaTrello}
          title="Artículos"
          description="Explora nuestra selección de artículos, que incluyen piezas informativas sobre una variedad de temas, desde consejos de vida hasta análisis científicos y políticos."
        />
      </main>
      <section className="p-4">
        <article className="grid items-center max-w-screen-xl gap-20 mx-auto md:grid-cols-2 md:pt-24">
          <img
            controls
            className="object-cover w-full h-full max-h-[400px]" //object-cover w-full h-full aspect-ratio-[16/9] max-h-[300px]
            src={misionBiblioteca}
          />
          <div>
            <h3>Misión</h3>
            <Subtitle>Un espacio para todos los lectores</Subtitle>
            <p className="text-justify">
              Fomentar el intercambio de recomendaciones y el acceso a la
              información a travéz de esta seccion de la página web, promoviendo
              la lectura como una actividad enriquecedora contribuyendo a la
              construcción de un conocimiento colectivo, recopilando y
              organizando las recomendaciones de la comunidad para que sirvan
              como guía para otros lectores.
            </p>
          </div>
        </article>
      </section>
      <section className="p-4">
        <article className="grid items-center max-w-screen-xl gap-20 mx-auto md:grid-cols-2 md:py-24">
          <div>
            <h3>Visión</h3>
            <Subtitle>Acceso a la información</Subtitle>
            <p className="text-justify">
              Contribuir a la democratización del acceso a la información y a la
              promoción de la cultura a nivel nacional e internacional, haciendo
              de la lectura una actividad accesible para todos.
            </p>
          </div>
          <img
            controls
            className="object-cover w-full h-full max-h-[400px]"
            src={visionBiblioteca}
          />
        </article>
      </section>
      <article className="max-w-screen-xl p-10 mx-auto mt-10 mb-20 rounded-xl bg-[#00335f] md:p-24">
        <main className="grid gap-10 md:grid-cols-2">
          <picture className="relative flex items-center justify-center w-full h-96">
            <img
              src={DotsBackground}
              alt="Fondo de puntos"
              className="absolute z-10 object-cover w-full h-full rounded-md"
            />
            <img
              src={ImagenInclusiva}
              alt="Imagen de la inclusión"
              className="relative z-30 object-contain max-w-full max-h-full rounded-md"
            />
          </picture>
          <div className="flex flex-col justify-center h-full prose-sm prose text-white sm:prose-base prose-h3:text-2xl sm:prose-h3:text-4xl">
            <h3 className="text-white">Educación Inclusiva</h3>
            <p className="text-justify">
              La educación inclusiva es el enfoque y las prácticas que buscan
              garantizar que todos los estudiantes, independientemente de sus
              habilidades físicas, cognitivas, sociales, emocionales o
              lingüísticas, tengan igual acceso a la educación en un ambiente
              común con sus pares. Este modelo se centra en adaptar el sistema
              educativo para atender a las necesidades de todos los alumnos y no
              solo a aquellos que tienen necesidades especiales.
            </p>
            <a
              href="https://chat.whatsapp.com/BuQIHzyLKJP43PoHpgdZ5L"
              target="_blank"
              className="mt-2 ml-auto text-white no-underline bg-green-500 border-2 border-transparent rounded-lg btn w-max hover:bg-white hover:text-green-600 hover:border-green-600"
            >
              Contactános
              <FaWhatsapp className="text-2xl" />
            </a>
          </div>
        </main>
      </article>

      <ValidationBiblioteca />
      <section className="p-4" id="inscripcion">
        {active && (
          <article className="max-w-screen-xl py-12 mx-auto md:py-24">
            <BibliotecaSection />
          </article>
        )}
      </section>
    </Layout>
  );
};

export default BibliotecaPage;
