import React, { Component } from "react";
import ChatBot from "react-simple-chatbot";
import ChatUrlComponent from "./Url/FundacionAneupi/ChatUrlComponent";
import ChatUrlNosotros from "./Url/FundacionAneupi/ChatUrlNosotros";
import ChatUrlBiblioteca from "./Url/FundacionAneupi/ChatUrlBiblioteca";
import ChatFundacionWS from "./Url/FundacionAneupi/ChatFundacionWS";
import ChatUrlLeceni from "./Url/Leceni/ChatUrlLeceni";
import ChatLeceniWS from "./Url/Leceni/ChatLeceniWS";
import ChatUrlAcademia from "./Url/AcademiaAneupi/ChatUrlAcademia";
import ChatUrlAneupiTv from "./Url/AneupiTv/ChatUrlAneupiTv";
import ChatAneupiTVWS from "./Url/AneupiTv/ChatAneupiTvWS";
import ChatUrlCoop from "./Url/CoopAneupi/ChatUrlCoop";
import ChatUrlServicios from "./Url/FundacionAneupi/ChatUrlServicios";
import "../chatBot/App.css";
import { ThemeProvider } from "styled-components";
import chatbot from "../../assets/imgChatBot/chatbot4.png";
import user from "../../assets/imgChatBot/user4.png";

const theme = {
  background: "#f5f8fb",
  fontFamily: "Open Sans, sans-serif",
  headerBgColor: "#00335f",
  headerFontColor: "#fff",
  headerFontSize: "15px",
  botBubbleColor: "#00335f",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a",
};

export default class MainChatBot extends Component {
  render() {
    return (
      <div className="relative z-50 w-full h-full overflow-hidden bg-gray-100 rounded-lg shadow-lg">
        <ThemeProvider theme={theme}>
          <ChatBot
            className="z-40"
            headerTitle="Asistente Virtual"
            steps={[
              {
                //inicio
                id: "intro",
                component: (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "5px",
                    }}
                  >
                    <img
                      src={chatbot} // Usa la imagen local
                      alt="Nuestra"
                      style={{
                        width: "25%",
                        height: "auto",
                        marginRight: "0px",
                      }}
                    />
                    <h1 className="text-center">
                      ¡Bienvenido a Fundación ANEUPI!
                    </h1>
                  </div>
                ),
                trigger: "marcas",
              }, //-----------------------------------------

              {
                //Mensaje de presentación
                id: "marcas",
                component: (
                  <div>
                    <h2>Nuestras Marcas Corporativas</h2>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <img
                        src="https://aneupi.com/assets/brand-B_L3wkGX.png"
                        alt="Nuestra"
                        style={{
                          width: "20%",
                          height: "auto",
                          marginRight: "20px",
                        }}
                      />
                      <h3>Fundación ANEUPI</h3>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <img
                        src="https://aneupi.com/assets/AneupiCoop-C41DVkUq.png"
                        alt="Nuestra"
                        style={{
                          width: "20%",
                          height: "auto",
                          marginRight: "20px",
                        }}
                      />
                      <h3>Cooperativa ANEUPI</h3>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <img
                        src="https://aneupi.com/assets/Leceni-BmMrxtG7.png"
                        alt="Nuestra"
                        style={{
                          width: "20%",
                          height: "auto",
                          marginRight: "20px",
                        }}
                      />
                      <h3>Constructora LECENI</h3>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <img
                        src="https://aneupi.com/assets/AneupiTV-BupbLIMM.png"
                        alt="Nuestra"
                        style={{
                          width: "20%",
                          height: "auto",
                          marginRight: "20px",
                        }}
                      />
                      <h3>ANEUPI TV Internacional</h3>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <img
                        src="https://aneupi.com/assets/AcademiaAneupi3-Cn1GZEY5.jpg"
                        alt="Nuestra"
                        style={{
                          width: "20%",
                          height: "auto",
                          marginRight: "20px",
                        }}
                      />
                      <h3>Academia ANEUPI</h3>
                    </div>
                  </div>
                ),
                trigger: "3",
              },
              {
                id: "3",
                message: "¿En que te puedo ayudar?",
                trigger: "select",
              }, //-----------------------------------------

              {
                //Menú principal
                id: "select",
                options: [
                  {
                    value: "fundacionAneupi",
                    label: "Fundación ANEUPI",
                    trigger: "fundacion",
                  },
                  {
                    value: "coop",
                    label: "Cooperativa ANEUPI",
                    trigger: "coop",
                  },
                  {
                    value: "Constleceni",
                    label: "Constructora LECENI",
                    trigger: "leceni",
                  },
                  {
                    value: "tv",
                    label: "ANEUPI TV Internacional",
                    trigger: "aneupiTV",
                  },
                  {
                    value: "academiaAneupi",
                    label: "Academia ANEUPI",
                    trigger: "academia",
                  },
                  {
                    value: "gatito",
                    label: "Gatito Plis",
                    trigger: "preguntaVuelta",
                  },
                ],
              }, //-----------------------------------------

              {
                //Menú Fundación Aneupi
                id: "fundacion",
                component: (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "15px",
                      backgroundColor: "#f5f8fb",
                      borderRadius: "10px",
                    }}
                  >
                    <img
                      src={"https://aneupi.com/assets/brand-B_L3wkGX.png"}
                      style={{
                        width: "70%",
                        height: "70%",
                        marginBottom: "0px",
                      }}
                    />
                    <h2
                      style={{
                        textAlign: "center",
                        fontSize: "16px",
                        color: "#333",
                      }}
                    >
                      La fundación es constituida con proyección internacional
                      comprometida con el desarrollo de la educación inclusiva
                      para mejorar la calidad educativa en las universidades
                    </h2>
                  </div>
                ),
                trigger: "fundacionMenu",
              },
              {
                id: "fundacionMenu",
                options: [
                  { value: "nos", label: "Sobre Nosotros", trigger: "4" },
                  {
                    value: "eventos",
                    label: "Proponer un Evento",
                    trigger: "5",
                  },
                  {
                    value: "convenios",
                    label: "Nuestros Convenios",
                    trigger: "6",
                  },
                  {
                    value: "support",
                    label: "Servicios",
                    trigger: "7",
                  },
                  { value: "jobs", label: "Ofertas Laborales", trigger: "8" },
                  { value: "jobs2", label: "Ofertas de Practicas", trigger: "12" },
                  {
                    value: "denuncia", label: "Realizar una Denuncia", trigger: "reporte"
                  },
                  {
                    value: "biblio",
                    label: "Nuestra Biblioteca",
                    trigger: "9",
                  },
                  { value: "dona", label: "Donaciones", trigger: "10" },
                  { value: "ws", label: "Whatsapp", trigger: "redirectWS" },
                ],
              },
              {
                //Descripciones de fundación Aneupi
                id: "4",
                component: (
                  <div className="break-words">
                    {" "}
                    Nuestra empresa impulsa y ayuda a la idependencia y
                    desarrollo de habilidades de las personas con discapacidad,
                    ¡Abajo puedes encontrar más información!.{" "}
                  </div>
                ),
                trigger: "selectNosotros",
              },
              {
                id: "5",
                component: (
                  <div>
                    {" "}
                    ¡Aquí puedes proponernos un evento que quieras realizar!.{" "}
                  </div>
                ),
                trigger: "redirectComponent",
              },
              {
                id: "6",
                component: (
                  <div>
                    {" "}
                    Establecemos alianzas con universidades y colaboradores para
                    ampliar oportunidades educativas, ¡Puedes observarlas aquí!.{" "}
                  </div>
                ),
                trigger: "redirectComponent",
              },
              {
                id: "7",
                component: (
                  <div>
                    {" "}
                    Por este medio puedes contactarnos a nuestros servicios en
                    linea.{" "}
                  </div>
                ),
                trigger: "selectServicios",
              },
              {
                id: "8",
                component: (
                  <div>
                    {" "}
                    Aquí temos ofertas laborales que te pueden interesar.{" "}
                  </div>
                ),
                trigger: "redirectComponent",
              },
              {
                id: "12",
                component: (
                  <div>
                    {" "}
                    Aquí temos ofertas sobre practicas pre-profecionales que te pueden interesar.{" "}
                  </div>
                ),
                trigger: "redirectComponent",
              },
              {
                id: "reporte",
                component: (
                  <div className="break-words">
                    {" "}
                    Sí ves un abuso, tú deber es reportar un mal comportamiento cuando presencies o experimentes acciones
                    de los docentes o de otras personas, que violen las normas establecidas de
                    convivencia o ética, ya sea en el ámbito universitario, laboral o social,
                    dentro y fuera de las universidades.{" "}
                  </div>
                ),
                trigger: "redirectComponent",
              },
              {
                id: "9",
                component: (
                  <div>
                    {" "}
                    Este es un espacio para fomentar la lectura y contribuir al
                    enriquecimiento de conocimiento además de promover la
                    cultura, ¡Abajo puedes encontrar más información!.{" "}
                  </div>
                ),
                trigger: "selectbiblio",
              },
              {
                id: "10",
                component: (
                  <h2>
                    {" "}
                    Contribuye al crecimiento continuo de nuestra comunidad
                    mediante donaciones solidarias.
                  </h2>
                ),
                trigger: "redirectComponent",
              },
              {
                //Botones del menú fundación aneupi
                id: "selectNosotros",
                options: [
                  {
                    value: "about",
                    label: "Acerca de nosotros",
                    trigger: "redirectNosotros",
                  },
                  {
                    value: "MisionVision",
                    label: "Nuestra Misión y Visión",
                    trigger: "redirectNosotros",
                  },
                  {
                    value: "organizacion",
                    label: "Nuestra Organización",
                    trigger: "redirectNosotros",
                  },
                  {
                    value: "estructura",
                    label: "Estructura de la Fundación",
                    trigger: "redirectNosotros",
                  },
                  {
                    value: "estatuto",
                    label: "Estatuto Orgánico",
                    trigger: "redirectNosotros",
                  },
                  {
                    value: "privacy",
                    label: "Nuestras Políticas",
                    trigger: "redirectNosotros",
                  },
                ],
              },
              {
                //Botones del menú fundación aneupi
                id: "selectServicios",
                options: [
                  {
                    value: "atencion",
                    label: "Atención en línea",
                    trigger: "redirectServicios",
                  },
                  {
                    value: "contacto",
                    label: "Contáctanos",
                    trigger: "redirectServicios",
                  },
                ],
              },
              {
                id: "selectbiblio",
                options: [
                  {
                    value: "biblioteca",
                    label: "Biblioteca",
                    trigger: "redirectBiblioteca",
                  },
                  {
                    value: "articulos",
                    label: "Nuestros Artículos",
                    trigger: "redirectBiblioteca",
                  },
                  {
                    value: "revi",
                    label: "Colección de Revistas",
                    trigger: "redirectBiblioteca",
                  },
                  {
                    value: "libros",
                    label: "Colección de Libros",
                    trigger: "redirectBiblioteca",
                  },
                ],
              }, //-----------------------------------------

              {
                //Menú Constructora Leceni
                id: "leceni",
                component: (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "15px",
                      backgroundColor: "#f5f8fb",
                      borderRadius: "10px",
                    }}
                  >
                    <img
                      src={"https://aneupi.com/assets/Leceni-BmMrxtG7.png"}
                      style={{
                        width: "70%",
                        height: "70%",
                        marginBottom: "0px",
                      }}
                    />
                    <h2
                      style={{
                        textAlign: "center",
                        fontSize: "16px",
                        color: "#333",
                      }}
                    >
                      Desarrollamos proyectos Inmobiliarios y construcciones
                      altamente calificado, responsable y comprometido con la
                      sociedad y el medio ambiente
                    </h2>
                  </div>
                ),
                trigger: "selectleceni",
              },
              {
                //botones del menú Constructora Leceni
                id: "selectleceni",
                options: [
                  {
                    value: "urlleceni",
                    label: "Sitio web LECENI",
                    trigger: "redirectLeceni",
                  },
                  {
                    value: "urlwhatsappLeceni",
                    label: "Whatsapp",
                    trigger: "redirectLeceniWha",
                  },
                ],
              }, //-----------------------------------------
              {
                //Menú Cooperativa ANEUPI
                id: "coop",
                component: (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "15px",
                      backgroundColor: "#f5f8fb",
                      borderRadius: "10px",
                    }}
                  >
                    <img
                      src={"https://aneupi.com/assets/AneupiCoop-C41DVkUq.png"}
                      style={{
                        width: "70%",
                        height: "70%",
                        marginBottom: "0px",
                      }}
                    />
                    <h2
                      style={{
                        textAlign: "center",
                        fontSize: "16px",
                        color: "#333",
                      }}
                    >
                      Nuestra misión es satisfacer las necesidades financieras
                      de nuestros futuros socios, brindando productos
                      financieros de calidad y confianza
                    </h2>
                  </div>
                ),
                trigger: "selectcoop",
              },
              {
                //botones del menú Cooperativa ANEUPI
                id: "selectcoop",
                options: [
                  {
                    value: "urlcoop",
                    label: "Sitio web Cooperativa",
                    trigger: "redirectCoop",
                  },
                  {
                    value: "urlwhatsappLeceni",
                    label: "Whatsapp",
                    trigger: "redirectLeceniWha",
                  },
                ],
              }, //-----------------------------------------
              {
                //Menú Academia ANEUPI
                id: "academia",
                component: (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "15px",
                      backgroundColor: "#f5f8fb",
                      borderRadius: "10px",
                    }}
                  >
                    <img
                      src={
                        "https://aneupi.com/assets/AcademiaAneupi3-Cn1GZEY5.jpg"
                      }
                      style={{
                        width: "70%",
                        height: "70%",
                        marginBottom: "0px",
                      }}
                    />
                    <h2
                      style={{
                        textAlign: "center",
                        fontSize: "16px",
                        color: "#333",
                      }}
                    >
                      La Academia ANEUPI es una institución nacional con
                      proyección internacional que ofrece varios programas,
                      diplomados, además cuenta con una academia en idiomas
                    </h2>
                  </div>
                ),
                trigger: "selectacademia",
              },
              {
                //botones del menú Academia ANEUPI
                id: "selectacademia",
                options: [
                  {
                    value: "urlAcademi",
                    label: "Sitio web Academia",
                    trigger: "redirectAcademia",
                  },
                  {
                    value: "urlwhatsappAcademia",
                    label: "Whatsapp",
                    trigger: "redirectTVWha",
                  },
                ],
              }, //-----------------------------------------
              {
                //Menú AneupiTV
                id: "aneupiTV",
                component: (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "15px",
                      backgroundColor: "#f5f8fb",
                      borderRadius: "10px",
                    }}
                  >
                    <img
                      src={"https://aneupi.com/assets/AneupiTV-BupbLIMM.png"}
                      style={{
                        width: "70%",
                        height: "70%",
                        marginBottom: "0px",
                      }}
                    />
                    <h2
                      style={{
                        textAlign: "center",
                        fontSize: "16px",
                        color: "#333",
                      }}
                    >
                      Únete a nuestra comunidad en las redes sociales y mantente
                      al tanto de las últimas noticias, programas especiales y
                      eventos de la Televisión Internacional de la Fundación
                      ANEUPI
                    </h2>
                  </div>
                ),
                trigger: "selectTV",
              },
              {
                //botones del menú AneupiTV
                id: "selectTV",
                options: [
                  {
                    value: "urlTV",
                    label: "Sitio web AneupiTV",
                    trigger: "redirectTv",
                  },
                  {
                    value: "urlwhatsappTV",
                    label: "Whatsapp",
                    trigger: "redirectTVWha",
                  },
                ],
              }, //-----------------------------------------

              {
                //Componentes para redireccionar a las páginas de Fundación Aneupi
                id: "redirectComponent",
                component: <ChatUrlComponent />,
                asMessage: true,
                trigger: "preguntaVuelta",
              },
              {
                id: "redirectNosotros",
                component: <ChatUrlNosotros />,
                asMessage: true,
                trigger: "preguntaVuelta",
              },
              {
                id: "redirectServicios",
                component: <ChatUrlServicios />,
                asMessage: true,
                trigger: "preguntaVuelta",
              },
              {
                id: "redirectWS",
                component: <ChatFundacionWS />,
                asMessage: true,
                trigger: "preguntaVuelta",
              },
              {
                id: "redirectBiblioteca",
                component: <ChatUrlBiblioteca />,
                asMessage: true,
                trigger: "preguntaVuelta",
              }, //-----------------------------------------

              {
                //Componentes para redireccionar a las páginas de cooperativa ANEUPI
                id: "redirectCoop",
                component: <ChatUrlCoop />,
                asMessage: true,
                trigger: "preguntaVuelta",
              }, //-----------------------------------------

              {
                //Componentes para redireccionar a las páginas de constructora Leceni
                id: "redirectLeceni",
                component: <ChatUrlLeceni />,
                asMessage: true,
                trigger: "preguntaVuelta",
              },
              {
                id: "redirectLeceniWha",
                component: <ChatLeceniWS />,
                asMessage: true,
                trigger: "preguntaVuelta",
              }, //-----------------------------------------

              {
                //Componentes para redireccionar a las páginas de constructora Academia Aneupi
                id: "redirectAcademia",
                component: <ChatUrlAcademia />,
                asMessage: true,
                trigger: "preguntaVuelta",
              }, //-----------------------------------------

              {
                //Componentes para redireccionar a las páginas de Aneupi.TV
                id: "redirectTv",
                component: <ChatUrlAneupiTv />,
                asMessage: true,
                trigger: "preguntaVuelta",
              },
              {
                id: "redirectTVWha",
                component: <ChatAneupiTVWS />,
                asMessage: true,
                trigger: "preguntaVuelta",
              }, //-----------------------------------------

              {
                //Mensaje de retorno
                id: "preguntaVuelta",
                message: "¿Necesitas algo más?",
                trigger: "11",
              },
              {
                id: "11",
                options: [
                  {
                    value: "yes",
                    label: "Sí, necesito más ayuda",
                    trigger: "3",
                  },
                  { value: "no", label: "No gracias", trigger: "finChat" },
                ],
              },
              {
                //Fin del Chat
                id: "finChat",
                message: "¡Estupendo! ¡Ten un buen día!",
                end: true,
              },
            ]}
            botAvatar={chatbot}
            userAvatar={user}
          />
        </ThemeProvider>
      </div>
    );
  }
}
