import React from "react";
import { useNavigate } from "react-router-dom";

const ChatUrlComponent = ({ steps }) => {
    const navigate = useNavigate();
    const { fundacionMenu } = steps;
    const handleRedirect = () => {

        switch (fundacionMenu.value) {
            case 'eventos':
                navigate('/eventos');
                break;
            case 'convenios':
                navigate('/convenios');
                break;
            case 'support':
                navigate('/atencion-en-linea');
                break;
            case 'jobs':
                navigate('/ofertas-laborales');
                break;
            case 'jobs2':
                navigate('/ofertas-practicas');
                break;
            case 'denuncia':
                navigate('/reportes');
                break;
            case 'dona':
                navigate('/donaciones');
                break;
            default:
                break;
        }
        steps.fundacionMenu = null;
        steps.selectNosotros = null;
        steps.selectbiblio = null;
    };
    return (
        <div>
            <button onClick={handleRedirect} className="underline">Has Clic aquí para ir a la página seleccionada</button>
        </div>
    );
};

export default ChatUrlComponent;