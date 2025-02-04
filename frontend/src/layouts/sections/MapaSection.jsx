import React from "react";

const MapaSection = () => {
  return (
    <section className="relative z-10 text-gray-600 body-font">
      <div className="max-w-screen-xl mx-auto">
        <div className=" bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 md:p-14 flex items-end justify-start relative w-full h-[40rem]">
          <iframe
            width="100%"
            height="100%"
            className="absolute inset-0 z-10"
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3984.698076334019!2d-79.0412571!3d-2.9030389!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91cd23f6f92fa71b%3A0xd927ad30589eaea8!2sFundaci%C3%B3n%20ANEUPI!5e0!3m2!1ses-419!2sec!4v1706734523761!5m2!1ses-419!2sec"
          ></iframe>

          <div className="relative z-10 flex flex-wrap w-full gap-4 p-4 bg-white rounded shadow-md md:gap-8">
            <div className="">
              <h2 className="text-xs font-semibold text-gray-900 md:text-sm title-font">
                Dirección
              </h2>
              <p className="mt-1 text-xs md:text-sm">
                Av.Enrique Arizaga e Isauro Rodriguez - Junto a la constructora-
                LECENI. Cuenca - Ecuador
              </p>
            </div>
            <div className="flex-1 lg:mt-0">
              <h2 className="text-sm font-semibold text-gray-900 title-font">
                Correo Electrónico
              </h2>
              <a
                href="mailto:fundaciónaneupi2020@gmail.com"
                className="text-xs leading-relaxed text-indigo-900 truncate md:text-sm link"
              >
                fundaciónaneupi2020@gmail.com
              </a>
              <h2 className="mt-4 text-sm font-semibold text-gray-900 title-font">
                Teléfono
              </h2>
              <a
                href="tel:+593074095869"
                className="text-xs leading-relaxed text-indigo-900 md:text-sm link"
              >
                07 4095869
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapaSection;
