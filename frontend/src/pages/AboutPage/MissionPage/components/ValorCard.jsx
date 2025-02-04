import { cloneElement } from "react";

const ValorCard = ({ icon, title, description }) => (
  <div className="flex items-center w-full gap-4 p-4 transition duration-300 cursor-pointer hover:shadow rounded-2xl hover:scale-110 group hover:bg-[#00335f]">
    <div className="w-1/5 text-[#00335f] transition group-hover:text-white">
      {cloneElement(icon, { className: "text-6xl md:text-8xl" })}
    </div>
    <div className="w-4/5 space-y-2">
      <h3 className="text-base font-bold transition md:text-xl group-hover:text-white">
        {title}
      </h3>
      <p className="mt-1 text-sm text-gray-500 transition group-hover:text-white">
        {description}
      </p>
    </div>
  </div>
);
export default ValorCard;
