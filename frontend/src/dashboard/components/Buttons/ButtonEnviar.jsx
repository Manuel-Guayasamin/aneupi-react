import React from 'react';

const ButtonEnviar = ({ text, onClick, className, disable }) => {
    return (
        <button
            className={`bg-colorcito hover:bg-white hover:text-colorcito hover:border-colorcito border-2 border-transparent text-white py-2 px-9 rounded cursor-pointer transition-all duration-300 font-bold ${className}`}
            onClick={onClick}
            disabled={disable}
            type="submit"
        >
            {text}
        </button>
    );
};


export default ButtonEnviar;
