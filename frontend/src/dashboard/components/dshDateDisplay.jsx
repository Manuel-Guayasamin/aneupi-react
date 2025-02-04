import React, { useState, useEffect } from 'react';

const DateTimeDisplay = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    // Función para actualizar la fecha y hora cada segundo
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []);

  // Obtener partes de la fecha y hora actual en español
  const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const optionsDateShort = { day: 'numeric', month: 'numeric', year: 'numeric' };
  const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: true };

  const formattedDate = currentDateTime.toLocaleDateString('es-EC', optionsDate);
  const formattedDateShort = currentDateTime.toLocaleDateString('es-EC', optionsDateShort);
  const formattedTime = currentDateTime.toLocaleTimeString('es-EC', optionsTime);

  return (
    <div className='text-center xl:text-right flex md:flex-col gap-x-4'>
      {/* <p className='hidden md:block'>{formattedDate}</p>
      <p className='md:hidden'>{formattedDateShort}</p>
      <p>{formattedTime}</p> */}
      <div className='hidden md:block'>{formattedDate}</div>
      <div className='md:hidden'>{formattedDateShort}</div>
      <div>{formattedTime}</div>
    </div>
  );
};

export default DateTimeDisplay;
