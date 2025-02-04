import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import { CgClose } from "react-icons/cg";
import { FaChevronDown } from "react-icons/fa6";

import { sidebarItems } from "../data/dshSidebar";
import { IconAneupi } from "../icons";

const DshSidebar = ({ open, onClose }) => {
  const [openSidebar, setOpenSidebar] = useState(true);

  const [openSubmenuIndex, setOpenSubmenuIndex] = useState(null);

  const handleItemClick = (index) => {
    setOpenSubmenuIndex(openSubmenuIndex === index ? null : index);
  };

  const activedUser = useSelector((state) => state.authentication.active); // Obtener el estado de session del usuario
  const usuario = useSelector((state) => state.authentication.usuario); // Obtener el estado del usuario 

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!activedUser) {
      navigate('/');
    }
  }, [activedUser, navigate]);
  const handleLogout = () => {
    dispatch(logout()); // Llama a la acción de logout
    navigate('/');
  };

  return (
    <>
      {/* MARK: Sidebar Desktop */}
      <div className={`flex flex-col ${openSidebar ? 'w-72' : 'w-20'} transition-w duration-300 border-r dsh-primary hidden md:flex`}>
        <div className="relative">
          {/* Botón del sidebar */}
          <div
            className={`absolute cursor-pointer -right-3.5 top-6 z-30 w-7 dsh-primary border rounded ${!openSidebar && "rotate-180"} duration-300`} onClick={() => setOpenSidebar(!openSidebar)} >
            <svg
              fill="currentColor"
              viewBox="0 0 256 256"
              xmlns="http://www.w3.org/2000/svg"
              className="dsh-btn-icon p-1"
            >
              <path d="M208.49,199.51a12,12,0,0,1-17,17l-80-80a12,12,0,0,1,0-17l80-80a12,12,0,0,1,17,17L137,128ZM57,128l71.52-71.51a12,12,0,0,0-17-17l-80,80a12,12,0,0,0,0,17l80,80a12,12,0,0,0,17-17Z" />
            </svg>
          </div>
        </div>
        {/* Fin del botón del sidebar */}

        {/* Header del Sidebar */}
        <div className="flex items-center gap-4 w-full h-20 px-4 dsh-primary border-b">
          <IconAneupi className={`cursor-pointer w-12 rounded dsh-tertiary p-1 text-2xl duration-500 ${openSidebar && "rotate-[360deg]"}`} />
          <h1
            className={`origin-left font-bold truncate text-xl duration-200 ${!openSidebar && "scale-0 hidden"
              }`}
          >
            Fundación ANEUPI
          </h1>
        </div>

        <div className="flex flex-col flex-grow px-4 pb-4 mt-4 overflow-auto"
          style={{ scrollbarGutter: openSidebar && 'stable' }}
        >
          {sidebarItems.map((item, index) => (
            <>
              {!item.submenu ?
                <NavLink
                  key={index}
                  to={item.to}
                  className={`dsh-item-nav flex rounded-md p-2 cursor-pointer text-md items-center font-bold gap-x-4 ${item.gap ? "mt-9" : "mt-2"}`}
                >
                  <item.icon className="text-3xl" />
                  <span className={`ml-2 truncate leading-none origin-left duration-300 ${!openSidebar && 'hidden'}`}>{item.title}</span>
                </NavLink>
                :
                <>
                  <button
                    className={`dsh-item-nav w-full flex rounded-md p-2 cursor-pointer text-md items-center font-bold gap-x-4 ${item.gap ? "mt-9" : "mt-2"} ${openSubmenuIndex === index && 'dsh-tertiary'}`}
                    onClick={() => handleItemClick(index)}
                  >
                    <item.icon className="text-3xl" />
                    <span className={`ml-2 truncate leading-none origin-left duration-300 ${!openSidebar && 'hidden'}`}>{item.title}</span>
                    <FaChevronDown className={`text-md ml-auto transition-transform ${openSubmenuIndex && 'rotate-180'} ${!openSidebar && 'hidden'}`} />
                  </button>
                  {openSubmenuIndex === index && (
                    <div className="flex flex-col gap-2 border-l-2 border-slate-300 dark:border-slate-600">
                      {item.submenu.map((subitem, idx) => (
                        <NavLink
                          key={idx}
                          exact={subitem.to ? "true" : undefined}
                          to={subitem.to}
                          className={`dsh-item-nav flex rounded-md p-2 cursor-pointer text-md items-center font-bold gap-x-4 ${openSidebar && 'ml-4'}`}
                        >
                          <subitem.icon className="text-3xl" />
                          <span className={`ml-2 truncate leading-none origin-left duration-300 ${!openSidebar && 'hidden'}`}>{subitem.title}</span>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </>
              }
            </>
          ))}
        </div>

        {/* User info */}
        <div className={`relative flex items-center flex-col dsh-secondary rounded-md select-none ${openSidebar ? "p-4 m-4" : "p-2 m-2"}`}>
          <div className={`flex h-16 w-full justify-center rounded-lg bg-cover ${!openSidebar ? "invisible" : "mb-8"}`} style={{ backgroundImage: `url(https://i.ibb.co/FWggPq1/banner.png)` }} />
          <div className={`dsh-secondary absolute rounded-full p-1 ${openSidebar ? "top-10 h-16 w-16" : "top-1 rounded-md h-14 w-14"}`}>
            <div className={`w-full h-full flex items-center justify-center rounded-full font-semibold bg-purple-600 text-blacks text-2xl text-white truncate ${!openSidebar && 'rounded-md'}`}>
              {usuario?.nombres &&
                usuario.nombres
                  .split(' ')[0][0] // Primera letra del primer nombre
                  .toUpperCase()
              }
              {usuario?.apellidos &&
                usuario.apellidos
                  .split(' ')[0][0] // Primera letra del primer apellido
                  .toUpperCase()
              }
            </div>
          </div>

          <div className={`flex flex-col items-center origin-left animate-fadeIn ${!openSidebar && "hidden"}`}>
            <h4 className="text-lg font-semibold text-center">
              {usuario?.nombres} {usuario?.apellidos}
            </h4>
            <h5 className=" text-gray-500 mb-4">{usuario?.email}</h5>
          </div>
          <button
            className="flex w-full text-center items-center bg-red-500 hover:bg-red-800 gap-x-2 p-1 rounded-md text-white"
            onClick={handleLogout} >
            <TbLogout className={`text-xl mx-auto ${openSidebar && "hidden"}`} />
            <h4 className={`w-full truncate ${!openSidebar && "hidden"}`}>
              Cerrar Sesión
            </h4>
          </button>
        </div>
        {/* End User info */}
      </div>

      {/* MARK: Sidebar Mobile */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-lg z-50">
          <div className="w-full h-full" onClick={onClose}></div>
          <div className=" flex flex-col absolute right-0 top-0 h-full dsh-primary w-80 p-3">
            <div className="flex items-center gap-4 w-full h-20 dsh-primary border-b">
              <IconAneupi className={`cursor-pointer w-12 rounded dsh-tertiary p-1 text-2xl duration-500 ${openSidebar && "rotate-[360deg]"}`} />
              <h1
                className={`origin-left font-bold truncate text-xl duration-200 ${!openSidebar && "scale-0 hidden"}`}>
                ANEUPI
              </h1>
              <button onClick={onClose} className="p-2 ml-auto focus:outline-none">
                <CgClose className="text-2xl" />
              </button>
            </div>

            <div className="flex flex-col flex-grow pb-4 mt-4 dashboard-scroll overflow-y-auto">
              {sidebarItems.map((item, index) => (
                <>
                  {!item.submenu ?
                    <NavLink
                      key={index}
                      exact to={item.to}
                      className={`dsh-item-nav flex rounded-md p-2 cursor-pointer text-md items-center font-bold gap-x-4 ${item.gap ? "mt-9" : "mt-2"}`}
                      onClick={() => { onClose(); }}
                    >
                      <item.icon className="text-3xl" />
                      <span className="ml-2 truncate leading-none origin-left duration-300">{item.title}</span>
                    </NavLink>
                    :
                    <>
                      <div
                        className={`dsh-item-nav w-full flex rounded-md p-2 cursor-pointer text-md items-center font-bold gap-x-4 dsh-tertiary ${item.gap ? "mt-9" : "mt-2"}`}
                      >
                        <item.icon className="text-3xl" />
                        <span className="ml-2 truncate leading-none origin-left duration-300">{item.title}</span>
                        <FaChevronDown className="text-md ml-auto transition-transform" />
                      </div>
                      <div className="flex flex-col gap-2 border-l-2 dsh-tertiary ml-4">
                        {item.submenu.map((subitem, idx) => (
                          <NavLink
                            key={idx}
                            to={subitem.to}
                            className="dsh-item-nav flex rounded-md p-2 cursor-pointer text-md items-center font-bold gap-x-4"
                            onClick={() => { onClose(); }}
                          >
                            <subitem.icon className="text-3xl" />
                            <span className="ml-2 truncate leading-none origin-left duration-300">{subitem.title}</span>
                          </NavLink>
                        ))}
                      </div>
                    </>
                  }
                </>
              ))}
            </div>

            <div className="relative flex items-center flex-col mt-4 p-2 dsh-secondary rounded-md select-none">
              <div className="flex flex-row gap-2 h-16 w-full rounded-lg" >
                <div className="w-12 h-12 flex items-center justify-center rounded-md font-semibold bg-purple-600 text-blacks text-2xl text-white" >
                  {usuario?.nombres &&
                    usuario.nombres
                      .split(' ')[0][0] // Primera letra del primer nombre
                      .toUpperCase()
                  }
                  {usuario?.apellidos &&
                    usuario.apellidos
                      .split(' ')[0][0] // Primera letra del primer apellido
                      .toUpperCase()
                  }
                </div>
                <div className="flex flex-col" >
                  <h4 className="font-semibold">
                    {usuario?.nombres} {usuario?.apellidos}
                  </h4>
                  <h5 className="text-sm text-gray-500">{usuario?.email}</h5>
                </div>
              </div>
              <button
                className="w-full flex justify-center gap-2 bg-red-500 hover:bg-red-800 p-2 rounded-md text-white"
                onClick={handleLogout} >
                <TbLogout className="text-2xl" />
                <h4>
                  Cerrar Sesión
                </h4>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DshSidebar;