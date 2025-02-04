import React from "react";

const DshInfoCard = ({ Icon, title, value, color, iconColor }) => {
  return (
    <div className="flex items-center dsh-tertiary border rounded-md overflow-hidden shadow-md min-w-[15rem]">
      <div className={`p-4 ${color} bg-opacity-40`}>
        <Icon className={`text-5xl ${iconColor} drop-shadow-lg`} />
      </div>
      <div className="px-4">
        <h3 className="text-sm tracking-wider">{title}</h3>
        <p className="text-3xl">{value}</p>
      </div>
    </div>
  );
};

export default DshInfoCard;
