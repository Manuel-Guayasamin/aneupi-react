import React from 'react';
import { BiPaintRoll } from "react-icons/bi";
import DesarrolandoPagina from "./../img/desarrollando_pagina.jpg"

const Anuncio = () => {
  return (
    <div className="max-w-screen-xl p-10 mx-auto mt-10 mb-20 rounded-xl bg-gradient-to-tr from-indigo-0 to-indigo-900 md:p-24 ">
        <div className='grid gap-10 md:grid-cols-2'>
            <picture className="relative flex items-center justify-center w-full h-96">
                <img src={DesarrolandoPagina} alt="En desarrollo" className="relative z-30 object-contain max-w-full max-h-full rounded-md"/>
            </picture>
        <div className="bg-indigo-0 border-l-0 border-blue-0 text-white p-4" role="alert">
        <div className='flex flex-col justify-center h-full prose-sm prose text-black sm:prose-base prose-p:text-2xl sm:prose-p:text-2xl'>
            <p className="font-bold text-size-20 ">En Desarrollo</p>
            <p className='text-justify'>Esta página está actualmente en desarrollo.</p>
            <p className='text-justify'>¡Vuelve pronto para ver las actualizaciones!</p>
        </div>
      </div>
        </div>
    </div>
  );
};

export default Anuncio;
