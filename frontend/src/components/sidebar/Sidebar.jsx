import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import aneupilogo1 from '../../assets/paneladmin/aneupi.png';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v } from '../../styles/Variables';
import { AiOutlineLeft, AiOutlineHome, AiOutlineApartment, AiOutlineAreaChart, AiOutlineDollarCircle, AiOutlineGlobal, AiOutlineSetting } from "react-icons/ai";
import { MdLogout, MdOutlineAnalytics } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../admin_pages/adLayout";
import { FaUniversity, FaUsers } from "react-icons/fa";
import { SiEventstore } from "react-icons/si";
import { RiCustomerService2Line } from "react-icons/ri";
import { logout } from '../../redux/slices/authSlice';

export function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const ModSidebaropen = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const { setTheme, theme } = useContext(ThemeContext)
  const [modoTema, setModoTema] = useState(() => {
    return localStorage.getItem('modoTema') || 'claro';
  });

  useEffect(() => {
    // Cuando el componente se monta, establece el tema según el modoTema
    setTheme(modoTema === 'claro' ? 'light' : 'dark');
  }, [modoTema, setTheme]);

  const CambiarTheme = () => {
    const nuevoTema = modoTema === "claro" ? "oscuro" : "claro";
    setModoTema(nuevoTema)
    setTheme(nuevoTema === 'claro' ? 'light' : 'dark');

    // Guarda el nuevo modo de tema en localStorage
    localStorage.setItem('modoTema', nuevoTema);
  };

  const usuario = useSelector((state) => state.authentication.usuario); // Obtener el usuario del estado
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!usuario) {
      navigate('/');
    }
  }, [usuario, navigate]);



  const handleLogout = () => {
    dispatch(logout()); // Llama a la acción de logout
    navigate('/');
  };
  const homePage = () => {
    navigate('/');
  };

  return (
    <Container isOpen={sidebarOpen} themeUse={theme}>
      <button className="Sidebarbutton" onClick={ModSidebaropen}>
        <AiOutlineLeft />
      </button>
      <div
        className="Aneupicontent">
        <div
          className="imgcontent">
          <a href="/">
            <img
              src={aneupilogo1}

            />
          </a>

        </div>

        <h2 style={{ color: theme === 'dark' ? 'white' : 'black', textAlign: 'center' }}><center>Fundación ANEUPI</center></h2>

      </div>
      {linksArray.map(({ icon, label, to }) => (
        <div className="LinkContainer" key={label}>
          <NavLink to={to} className={({ isActive }) => `Links${isActive ? ` active` : ``}`}>
            <div className="Linkicon">
              {icon}

            </div>

            {
              sidebarOpen && (
                <span> {label} </span>
              )
            }

          </NavLink>
        </div>

      ))}
      <Divider />
      {
        /*{secondarylinksArray.map(({icon, label, to}) => (
        <div className="LinkContainer" key={label}>
         <NavLink to={to}  className={({isActive})=>`Links${isActive?` active`:``}`}>
           <div className="Linkicon">
            {icon}
            
            </div>
              
            {
              sidebarOpen &&(
                <span> {label} </span>
              )
            }
          
          </NavLink>
       </div>
      ))}
      <Divider/>*/
      }

      <div className="Themecontent">
        {sidebarOpen &&
          <span className="titleTheme">Modo {modoTema === "claro" ? "Claro" : "Oscuro"}</span>
        }
        <div className="Togglecontent">
          <div className="grid theme-container">
            <div className="content">
              <div className="demo">
                <label className="switch">
                  <input type="checkbox" className="theme-swither" onClick={CambiarTheme}>
                  </input>
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Divider />
      <div className="flex items-center justify-center h-10 p-2 mt-3 mb-3s">
        <button className={`text-white btn btn-error btn-sm rounded ${sidebarOpen ? 'w-24' : ''} mr-2`}
          onClick={handleLogout}
          title="Cerrar sesión"
        >
          <i className="fa-solid fa-right-from-bracket"></i>
          {sidebarOpen ? 'Salir' : ''}
        </button>
        <button //btn home para ir a la pestaña de inicio
          className='text-white rounded btn btn-success btn-sm'
          onClick={homePage}
          title="Página principal"
        >
          <i class="fa-solid fa-house"></i>
          {sidebarOpen ? 'Home' : ''}
        </button>
      </div>


      <div className='flex items-center justify-center p-3 mb-4 Sesion'>
        <div className='flex items-center'>
          <div className='flex items-center justify-center w-10 h-10 font-semibold text-white bg-blue-500 rounded-md'>
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
          {sidebarOpen &&
            <div className={'flex items-center justify-center ml-3 w-25'}>
              <div className="">
                <h4 className={`items-center font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{usuario?.nombres} {usuario?.apellidos}</h4>
                <span className={`text-xs ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{usuario?.email}</span>
              </div>
            </div>
          }
        </div>
      </div>






      {/*<p className='text-sm'>Bienvenido/a, <span className='font-semibold'>{usuario?.nombreUsuario}</span></p>
		<button
		className='text-white btn btn-error btn-sm'
		onClick={handleLogout}
		>
			Cerrar Sesión
		</button>*/}


    </Container >
  );
}

//#Data links
const linksArray = [
  {
    label: "Usuarios",
    icon: <FaUsers />,
    to: "/ad/admin-usuario",
  },
  {
    label: "Eventos",
    icon: <SiEventstore />,
    to: "/ad/admin-eventos",
  },
  {
    label: "Trabajos",
    icon: <AiOutlineApartment />,
    to: "/ad/admin-trabajos",
  },
  {
    label: "Practicas",
    icon: <FaUniversity />,
    to: "/ad/admin-practicas",
  },
  {
    label: "Servicios",
    icon: <RiCustomerService2Line />,
    to: "/ad/admin-servicios",
  },

]


const secondarylinksArray = [
  {
    label: "Configuración",
    icon: <AiOutlineSetting />,
    to: "",
  },


]



//#styled components
const Container = styled.div`
color: ${(props) => props.theme.text};
background: ${(props) => props.theme.bg};
position:sticky;
padding-top:30px;

width: ${({ isOpen }) => (isOpen ? '280px' : '100px')}; /* Ajusta el ancho del sidebar */
  transition: width 0.3s; /* Agrega una transición suave para el cambio de ancho */
.Sidebarbutton {
  position: absolute;
  top: ${v.xxlSpacing};
  right: -18px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${(props) => props.theme.bgtderecha};
  box-shadow: 0 0 4px ${(props) => props.theme.bg3}, 0 0 7px ${(props) => props.theme.bg};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  transform: ${({ isOpen }) => (isOpen ? `initial` : `rotate(180deg)`)};
  border:none;
  letter-spacing: inherit;
  font-size: inherit;
  text-align: inherit;
  padding:0;
  font-family: inherit;
  outline:none;
}
.Aneupicontent {
  display: flex;
  justify-content:center;
  align-items:center;
  padding-top:100px
  padding-bottom:${v.lgSpacing};
  .imgcontent{
    display:flex;
    img{
      max-width: 100%;
      height: auto;
      
    }
    cursor:pointer;
    transition: all 0.3s;
    transform: ${({ isOpen }) => (isOpen ? `scale(1)` : `scale(1)`)};
  }
  h2{
    display:${({ isOpen }) => (isOpen ? `block` : `none`)};
    padding-right:20px;
    padding-left:10px;
    font-weight: bold;
    font-size: 20px;
    color: white;
  }
}
.LinkContainer {
  margin: 30px 0;
  padding: 0 20%;
  
 
  :hover{
    background: ${(props) => props.theme.bg3};
    
  }
  .Links {
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: calc(${v.smSpacing}-2px) 0;
    color: ${(props) => props.theme.text};
    .Linkicon {
      padding: ${v.mdSpacing} ${v.mdSpacing};
      display:flex;
      
      svg {
        font-size: 25px;
      }
     
 
    }

    &.active {
      .Linkicon {
        svg {
          color: ${(props) => props.theme.bg4};
        }
      }
    }
  }
}
.Themecontent {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: ${({ isOpen }) => (isOpen ? `auto 20px` : `auto 0px`)};
 
  .titleTheme {
    display:block;
    padding: 10px;
    font-weight: 700;
    opacity:${({ isOpen }) => (isOpen ? `1` : `0`)};
    transition: all 0.3s;
    white-space:nowrap;
    overflow:hidden;
    
  }
  .Togglecontent{
    margin: ${({ isOpen }) => (isOpen ? `auto 30px` : `auto 15px`)};
    width: 36px;
    height: 40px;
    border-radius: 10px;
    transition: all 0.3s;
    position: relative;
    .theme-container{
      background-blend-mode: multiply, multiply;
      transition: 0.4s;
      .grid{
        display: grid;
        justify-items: center;
        align-comtent: center;
        height: 100vh;
        width: 100vw;
        font-family: "Lato" , sans-serif;
        color: white;
      }
      .demo {
        font-size: 32px;
        .switch{
          position: relative;
          display: inline-block;
          width: 60px;
          height: 34px;
          .theme-swither{
            opacity: 0;
            width: 0;
            height: 0;
            &:checked +.slider:before{
              left: 4px;
              content: "🌑";
              transform:translatex(26px);
            }
          }
          .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right:0;
            bottom: 0;
            background: ${({ themeUse }) => (themeUse === "light" ? v.lightcheckbox : v.darkcheckbox)};
            transition: 0.4s;
            &::before{
              position: absolute;
              content: "☀️";
              height: 0px;
              width: 0px;
              left:-10px;
              top: 16px;
              line-height: 0px;
              transition: 0.4s;
            }
            &.round{
              border-radius: 34px;
              &::before{
                border-radius: 50%;
              }
            }
          }
          
        }
      }
      
    }
  }
  
}
.Sesion{
  
      
}
`;

const Divider = styled.div`
height: 1px;
width: 100%;
background: ${(props) => props.theme.bg3};
margin: ${v.lgSpacing} 0;
}
`;

