import "../styles/index.css";
import { useState } from "react";
import { AnimateSharedLayout } from "framer-motion";
import { ThemeContext } from "../utlis";

function MyApp({ Component, pageProps }) {
  
  const [theme, setTheme] = useState('dark')

  const contextValue = {
      theme,
      toggleTheme: setTheme
  }
  return (
    <ThemeContext.Provider value={contextValue}>
      <AnimateSharedLayout>
        <Component {...pageProps} />
      </AnimateSharedLayout>
    </ThemeContext.Provider>
  );
}

export default MyApp;
