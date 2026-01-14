"use client";

import React from "react";
import { useTheme } from "./TailwindThemeProvider";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  console.log(theme);
  return (
    <button
      onClick={toggleTheme}
      className='p-2 rounded-full bg-theme-secondary border border-theme hover:bg-theme transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <MdDarkMode className='w-5 h-5 text-theme-primary' />
      ) : (
        <MdLightMode className='w-5 h-5 text-theme-primary' />
      )}
    </button>
  );
};

export default ThemeToggle;
