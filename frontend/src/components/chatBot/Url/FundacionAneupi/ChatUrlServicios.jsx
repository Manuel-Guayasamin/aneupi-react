import React from "react";
import { useNavigate } from "react-router-dom";

const ChatUrlServicios = ({ steps }) => {
    const navigate = useNavigate();
    const { selectServicios } = steps;
    const handleRedirect = () => {
        switch (selectServicios.value) {
            case "atencion":
                navigate("/atencion-en-linea");
                break;
            case "contacto":
                navigate("/contactanos");
                break;
            default:
                break;
        }
        steps.select = null;
        steps.selectServicios = null;
    };
    return (
        <div>
            <button onClick={handleRedirect} className="underline">
                Has Clic aquí para ir a la página seleccionada
            </button>
        </div>
    );
};
export default ChatUrlServicios;
