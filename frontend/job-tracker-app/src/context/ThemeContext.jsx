import { createContext, useContext, useEffect, useState } from "react";


// create context
const ThemeContext = createContext();

// custom hook for easy access
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext)

// provider component
export const ThemeProvider = ({ children }) => {
    // get theme from localstorage or fallback to light
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || 'light';
    });

    // update html class when theme changes
    useEffect(() => {
        const root = document.documentElement
        root.classList.remove("light", "dark")
        root.classList.add(theme)

        localStorage.setItem("theme", theme)
    }, [theme])


    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"))
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )

}