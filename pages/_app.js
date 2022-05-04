import "../styles/index.css";
import { useState } from "react";
import { ThemeContext } from "../utlis";

function MyApp({ Component, pageProps }) {
  
  const [theme, setTheme] = useState('dark')

  const contextValue = {
      theme,
      toggleTheme: setTheme
  }
  return (
    <ThemeContext.Provider value={contextValue}>
        <Component {...pageProps} />
    </ThemeContext.Provider>
  );
}

export default MyApp;
