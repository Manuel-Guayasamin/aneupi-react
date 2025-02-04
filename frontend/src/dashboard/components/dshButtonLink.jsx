import React from 'react';
import { NavLink } from 'react-router-dom';

const DshButtonLink = ({ to, Icon, label, className, iconClass, labelClass }) => {
  return (
    <NavLink to={to} className={`${className} flex items-center justify-center h-8 px-2 gap-x-2 text-sm font-medium rounded dsh-btn-icon`}>
      {Icon && <Icon className={`${iconClass} text-xl`} />}
      {label && <span className={`md:flex pr-1 ${labelClass}`}>{label}</span>}
    </NavLink>
  );
};


export default DshButtonLink;
