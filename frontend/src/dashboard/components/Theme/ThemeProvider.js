import { createContext, useContext } from "react";

// Creating a new context object
export const ThemeContext = createContext({
  themeMode: "light",
  darkTheme: () => {},
  lightTheme: () => {},
});

// Exporting ThemeProvider as an alias for ThemeContext.Provider
export const ThemeProvider = ThemeContext.Provider;

// Custom hook to access the ThemeContext values
export default function useTheme() {
  // Using useContext to get the current context value
  return useContext(ThemeContext);
}
