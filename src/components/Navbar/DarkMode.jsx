import React from 'react';
import LightButton from '../../assets/LightPng.png' ;
import DarkButton from '../../assets/LightPng.png';

const DarkMode = () => {
  const [theme, setTheme] = React.useState("light");

  // Initialize theme from localStorage
  React.useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  React.useEffect(() => {
    const element = document.documentElement; // html element
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  return (
    <div className='relative'>
      {theme === "light" ? (
        <img
          src={LightButton}
          alt="Light Mode"
          onClick={() => setTheme("dark")}
        />
      ) : (
        <img
          src={DarkButton}
          alt="Dark Mode"
          onClick={() => setTheme("light")}
        />
      )}
    </div>
  );
};

export default DarkMode;
