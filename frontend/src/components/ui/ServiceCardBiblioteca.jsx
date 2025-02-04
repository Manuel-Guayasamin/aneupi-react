import React from "react";
import { Link } from "react-router-dom";

const ServiceCardBiblioteca = ({ link, Icon, title, description }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 transition shadow rounded-xl group hover:shadow-xl colorcito">
      <Link to={link} className="block">
        <div className="flex items-center justify-center h-32 text-white text-8xl">
          {Icon && <Icon className="object-contain w-20 h-20" />}
        </div>
        <div className="p-4">
          <h3 className="'w-full pt-4 pb-2 text-lg font-semibold text-center text-white transition border-b-4 border-transparent group-hover:border-b-white">
            {title}
          </h3>
          <p className="mt-2 text-white">{description}</p>
        </div>
      </Link>
    </div>
  );
};

export default ServiceCardBiblioteca;
