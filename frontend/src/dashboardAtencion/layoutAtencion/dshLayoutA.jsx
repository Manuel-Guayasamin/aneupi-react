import React, { useEffect, useState } from "react";
import DshHeader from "../../dashboard/layout/dshHeader";
import DshSidebar from "./dshSidebarA";
import { ThemeProvider } from "../../dashboard/components/Theme/ThemeProvider";

const DshLayout = ({ children }) => {
    const [open, setOpen] = useState(false);

    // Obtener el tema actual del localStorage al iniciar
    const storedTheme = localStorage.getItem("theme");
    const [themeMode, setThemeMode] = useState(storedTheme || "light");

    const lightTheme = () => {
        setThemeMode("light");
        localStorage.setItem("theme", "light"); // Guardar el tema en localStorage
    };

    const darkTheme = () => {
        setThemeMode("dark");
        localStorage.setItem("theme", "dark"); // Guardar el tema en localStorage
    };

    useEffect(() => {
        document.querySelector('html').classList.remove("light", "dark");
        document.querySelector('html').classList.add(themeMode);
    }, [themeMode]);

    const handleToggleSidebar = () => {
        setOpen(!open);
    };

    return (
        <ThemeProvider value={{ themeMode, lightTheme, darkTheme }} >
            <div className="flex w-screen h-screen text-gray-700 overflow-hidden dashboard-scroll">
                <DshSidebar open={open} onClose={() => setOpen(false)} />
                <div className="flex flex-col flex-grow overflow-hidden">
                    <DshHeader handleToggleSidebar={handleToggleSidebar} />
                    <main className="flex-grow overflow-y-auto dsh-secondary">
                        {children}
                    </main>
                </div>
            </div>
        </ThemeProvider >
    );
};

export default DshLayout;
