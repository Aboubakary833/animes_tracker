import Head from "next/head";
import { useContext } from "react";
import { ThemeContext } from "../utlis";
import { HiMoon, HiSun } from "react-icons/hi";

export default function Layout({ children }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <>
      <Head>
        <meta name="description" content="Animes and mangas tracker website." />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
      </Head>
      {children}

      {theme == "light" ? (
        <button
          style={{ width: "50px", height: "50px" }}
          className="flex justify-center items-center rounded-full bg-slate-400 text-2xl fixed bottom-3 right-3"
          onClick={updateTheme}
        >
          <HiMoon className="text-slate-900" />
        </button>
      ) : (
        <button
        type="button"
          style={{ width: "50px", height: "50px" }}
          className="flex justify-center items-center rounded-full bg-slate-700 text-2xl fixed bottom-3 right-3"
          onClick={updateTheme}
        >
          <HiSun className="text-yellow-500" />
        </button>
      )}
    </>
  );

  function updateTheme() {
      if(theme === 'dark') {
          toggleTheme('light')
      } else toggleTheme('dark')
  }
}
