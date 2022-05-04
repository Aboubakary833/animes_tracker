import { createContext } from "react";

export const ThemeContext = createContext({
    theme: null,
    toggleTheme: (theme) => {}
})