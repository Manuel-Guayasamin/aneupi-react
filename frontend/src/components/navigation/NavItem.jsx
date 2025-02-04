import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

export const NavItem = ({ href, label, isDropdown, className }) => {
  return (
    <NavLink
      to={href}
      className={`w-full max-w-xs flex flex-nowrap ${href ? 'current:bg-yellow-500 current:text-colorcito' : ''} text-sm text-white btn btn-ghost ${className}`}
    >
      <span className="text-nowrap">{label}</span>
      <FaChevronDown className={`text-md ml-4 ${!isDropdown && 'hidden'}`} />
    </NavLink>
  );
};
