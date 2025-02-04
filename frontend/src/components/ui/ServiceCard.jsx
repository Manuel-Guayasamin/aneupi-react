import { Link } from "react-router-dom";
import "../../App.css";

export const ServiceCard = ({ link, imageSrc, title, description }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 transition shadow rounded-xl group hover:shadow-xl colorcito">
      <Link to={link} className="w-full">
        <header className="flex items-center justify-center h-32 text-indigo-800 text-8xl">
          <img
            src={imageSrc}
            alt={title}
            className="object-contain w-20 h-20"
          />
        </header>
        <h3 className="w-full pt-4 pb-2 text-lg font-semibold text-center text-white transition border-b-4 border-transparent group-hover:border-b-yellow-400">
          {title}
        </h3>
      </Link>
      <p className="mt-2 text-sm text-center text-white">{description}</p>
    </div>
  );
};
