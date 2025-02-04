import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LogoImage from '../assets/brand/brand.png';
import { logout } from '../redux/slices/authSlice'; // Importa la acción de logout
import { Sidebar } from '../components/sidebar/Sidebar';
import {ThemeProvider} from "styled-components";
import {Light} from "../styles/LightTheme";
import {Dark} from "../styles/DarkTheme";
import styled from "styled-components";

export const ThemeContext = React.createContext(null);

const AdminLayout = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const themeStyle = theme === "light" ? Light : Dark;
  
  //este apartado es para traer informacion del usuario
  const [sidebarOpen, setSidebarOpen] = useState(true);
	const usuario = useSelector((state) => state.authentication.usuario); // Obtener el usuario del estado
	const navigate = useNavigate();
	const dispatch = useDispatch();

  useEffect(() => {
    if (!usuario) {
      navigate("/");
    }
  }, [usuario, navigate]);

	// Maneja el logout
	const handleLogout = () => {
		dispatch(logout()); // Llama a la acción de logout
		navigate('/');
	};
// informacion del usuario cuando se logean...
	return (
		<>
    <ThemeContext.Provider value={{setTheme, theme}}>
      <ThemeProvider theme={themeStyle}>
		<Container className={sidebarOpen?"sidebarState active":""}>
		<Sidebar sidebarOpen={sidebarOpen}
         setSidebarOpen={setSidebarOpen}/>
		<section>
					
			<main>{children}</main>
		</section>
		</Container>
		</ThemeProvider>
    </ThemeContext.Provider>
   
    
    </>
	);
}

const Container = styled.div`


display:grid;
grid-template-columns:85px auto;
background:${({theme})=>theme.bgtotal};
transition: all 0.3s;
&.active{
grid-template-columns:360px auto;
}
color:${({theme})=>theme.text};


`;

export default AdminLayout;

{
  /*
<header>
				<div className='container flex items-center justify-between py-4 mx-auto'>
					<a
						href='/'
						className='inline-block mx-auto'
					>
						<img
							src={LogoImage}
							alt='logo'
							className='w-40'
						/>
					</a>
					<div className='flex items-center justify-end flex-1 gap-2'>
						<p className='text-sm'>Bienvenido/a, {usuario?.nombreUsuario}</p>
						<button
							className='text-white btn btn-error btn-sm'
							onClick={handleLogout}
						>
							Cerrar Sesión
						</button>
					</div>
				</div>
				<nav className='flex items-center justify-center gap-10 py-4 mx-auto text-white bg-indigo-900'>
					<ul className='flex items-center gap-4 text-sm md:gap-8'>
						<li>
							<a href='/ad/admin-usuario'>Usuarios</a>
						</li>
						<li>
							<a href='/ad/admin-eventos'>Eventos</a>
						</li>
						<li>
							<a href='/ad/admin-trabajos'>Trabajos</a>
						</li>
						<li>
							<a href='/ad/admin-practicas'>Practicas</a>
						</li>
						<li>
							<a href='/ad/admin-servicios'>Servicios</a>
						</li>
						 <li>
							<a href='/ad/admin-postulantes'>Solicitud Postulantes</a>
						</li> 
					</ul>
				</nav>
			</header>

			*/
}
