import { useState, useEffect, useRef } from "react";
import {
  FaPlay,
  FaPause,
  FaHandHoldingHeart,
  FaWhatsapp,
} from "react-icons/fa";
import { RiCustomerService2Fill } from "react-icons/ri";
import Footer from "../layouts/Footer";
//import Header from "../layouts/Header";
//import { useSelector } from "react-redux";
import { MdSpaceDashboard } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

import { TbMessageChatbot } from "react-icons/tb"; // El icono MainChatBot
//import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import { useSelector } from "react-redux";
//import { MdSpaceDashboard } from "react-icons/md";
//import { useLocation } from "react-router-dom";
import MainChatBot from "../components/chatBot/MainChatBot"; // El MainChatBot
import chatbot from "../assets/imgChatBot/btt-chatbot.png";

const Layout = ({ children }) => {
  const usuario = useSelector((store) => store.authentication.usuario);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const location = useLocation();
  const [showVideo, setShowVideo] = useState(false);
  const [videoURL, setVideoURL] = useState(
    "https://www.youtube.com/embed/ClVTntoUVvw?enablejsapi=1"
  );
  const [showChatBot, setShowChatBot] = useState(false); // Estado para mostrar/ocultar el ChatBot
  const isAdmin = usuario?.id_rol === 1;
  // Parametros del Video
  useEffect(() => {
    // Reproducir el video automáticamente solo una vez cuando se carga la página de inicio
    if (location.pathname === "/") {
      setShowChatBot(true);
    }
  }, [location.pathname]);

  const handleVideoToggle = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.contentWindow.postMessage(
          JSON.stringify({
            event: "command",
            func: "pauseVideo",
          }),
          "*"
        );
      } else {
        if (!showVideo) {
          setShowVideo(true);
        }

        videoRef.current.contentWindow.postMessage(
          JSON.stringify({
            event: "command",
            func: "playVideo",
          }),
          "*"
        );
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleCloseVideo = () => {
    setShowVideo(false);
    if (videoRef.current) {
      videoRef.current.contentWindow.postMessage(
        JSON.stringify({
          event: "command",
          func: "pauseVideo",
        }),
        "*"
      );
      setIsPlaying(false);
    }
  };

  // Parametros del containser del ChatBot

  const handleOpenChatBot = () => {
    setShowChatBot(true);
  };

  const handleCloseChatBot = () => {
    setShowChatBot(false);
  };

  const chatBotContainerStyle = `
    fixed bottom-4 right-4 p-4 bg-white rounded-lg shadow-lg 
    w-full max-w-96 h-full max-h-[550px] z-50 transition-all duration-300 ease-in-out 
    sm:w-[475px] sm:h-[650px]
  `;

  const closeButtonStyle = `
    absolute top-1 right-1 w-8 h-8 flex 
    items-center justify-center z-[100] text-2xl font-bold 
    text-white bg-red-500 rounded-full
  `;

  return (
    <>
      <Header />

      <div className="fixed bottom-0 z-50 flex flex-col gap-3 p-2 right-5 ">
        {isAdmin && (
          <a
            href="/dashboard/inicio"
            className=" bg-sky-500 border-transparent bottom-[16.45rem] right-7 btn btn-neutral btn-circle h-14 w-14 md:btn-lg"
            style={{ display: showChatBot ? "none" : "flex" }}
          >
            <span className="sr-only">Dashboard</span>
            <MdSpaceDashboard className="text-4xl text-white" />
          </a>
        )}
        <button
          onClick={handleVideoToggle}
          className=" bg-red-500 border-transparent bottom-[11.50rem] right-7 btn btn-neutral btn-circle h-14 w-14 md:btn-lg"
          style={{ display: showChatBot ? "none" : "flex" }}
        >
          <span className="sr-only">Ver Video</span>
          {isPlaying ? (
            <FaPause className="text-4xl text-white" />
          ) : (
            <FaPlay className="text-4xl text-white" />
          )}
        </button>
        <button
          onClick={handleOpenChatBot} // ChatBot
          className="  bg-blue-900 border-transparent bottom-[6.50rem] right-7 btn btn-neutral btn-circle h-14 w-14 md:btn-lg"
          style={{ display: showChatBot ? "none" : "flex" }}
        >
          <span className="sr-only">ChatBot</span>
          <img
            src={chatbot}
            alt="ChatBot"
            className="object-cover w-6/12 h-6/12"
          />
        </button>
        <a
          href="https://chat.whatsapp.com/BuQIHzyLKJP43PoHpgdZ5L"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 border-transparent bottom-7 right-7 btn btn-neutral btn-circle h-14 w-14 md:btn-lg"
          style={{ display: showChatBot ? "none" : "flex" }}
        >
          <span className="sr-only">WhatsApp</span>
          <FaWhatsapp className="text-4xl text-white" />
        </a>
        <Link
          to="/donaciones"
          className="bg-pink-500 border-transparent bottom-64 right-7 btn btn-neutral btn-circle h-14 w-14 md:btn-lg"
        >
          <span className="sr-only">Donaciones/Pagos</span>
          <FaHandHoldingHeart className="text-4xl text-white" />
        </Link>
        {/* Modal para el video */}
        <div
          className={"fixed inset-0 z-30 " + (showVideo ? "flex" : "hidden")}
          onClick={handleCloseVideo} // Ocultar el video al hacer clic fuera del video
        >
          <div
            className="absolute p-4 bg-white rounded-lg"
            style={{
              bottom: "3rem",
              right: "7rem",
              width: "19%",
              height: "30%",
            }}
            onClick={(e) => e.stopPropagation()} // Detener la propagación del evento clic en el modal para evitar ocultar el video
          >
            <button
              onClick={handleCloseVideo}
              className="absolute text-3xl font-bold text-white bg-red-500 rounded-full top-1 right-1"
              style={{
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              x
            </button>
            <iframe
              ref={videoRef}
              title="YouTube Video"
              src={videoURL}
              allow="autoplay; encrypted-media"
              allowFullScreen
              style={{
                width: "100%",
                height: "calc(100%)",
                border: "3px solid white",
              }}
            />
          </div>
        </div>{" "}
        {/* Modal para el ChatBot */}
        {showChatBot && (
          <div
            className="fixed inset-0 z-30 flex items-end justify-end"
            onClick={handleCloseChatBot}
          >
            <div
              className={chatBotContainerStyle}
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={handleCloseChatBot} className={closeButtonStyle}>
                ×
              </button>
              <MainChatBot handleCloseChatBot={handleCloseChatBot} />
            </div>
          </div>
        )}
      </div>

      <main className="animate__animated">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
