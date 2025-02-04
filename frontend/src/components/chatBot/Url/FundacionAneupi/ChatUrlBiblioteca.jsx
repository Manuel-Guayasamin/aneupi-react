import React from "react";
import { useNavigate } from "react-router-dom";

const ChatUrlBiblioteca = ({ steps }) => {
    const navigate = useNavigate();
    const { selectbiblio } = steps;
    const handleRedirect = () => {

        switch (selectbiblio.value) {
            case 'biblioteca':
                console.log("hsd");
                navigate('/biblioteca');
                break;
            case 'articulos':
                navigate('/articulos');
                break;
            case 'revi':
                navigate('/revistas');
                break;
            case 'libros':
                navigate('/libros');
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
            <button onClick={handleRedirect} className="underline">Has Clic aquí para ir a la página seleccionada</button>
        </div>
    );
};

export default ChatUrlBiblioteca;