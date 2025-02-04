import React from "react";
import { useNavigate } from "react-router-dom";

const ChatUrlNosotros = ({ steps }) => {
  const navigate = useNavigate();
  const { selectNosotros } = steps;
  const handleRedirect = () => {
    switch (selectNosotros.value) {
      case "about":
        navigate("/acerca-de-nosotros");
        break;
      case "MisionVision":
        navigate("/mision");
        break;
      case "organizacion":
        navigate("/organigrama");
        break;
      case "estructura":
        navigate("/estructura");
        break;
      case "contactanos":
        navigate("/contactanos");
        break;
      case "privacy":
        navigate("/acerca-de-nosotros/politicas-de-privacidad");
        break;
      default:
        break;
    }
    steps.select = null;
    steps.selectNosotros = null;
    steps.selectbiblio = null;
  };
  return (
    <div>
      <button onClick={handleRedirect} className="underline">
        Has Clic aquí para ir a la página seleccionada
      </button>
    </div>
  );
};
export default ChatUrlNosotros;
