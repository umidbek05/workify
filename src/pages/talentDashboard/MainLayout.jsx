import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useTheme } from "../../Context/ThemeContext";

const MainLayout = () => {
  const { isDarkMode } = useTheme();
  const isDark = isDarkMode;

  return (
    <div
      className={`min-h-screen flex flex-col md:flex-row transition-colors duration-500 ${
        isDark ? "bg-[#121212]" : "bg-gray-100"
      }`}
    >
      <Sidebar />

      <main className="flex-1 p-4 ml-[290px] md:p-6 talent-sidebar">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;