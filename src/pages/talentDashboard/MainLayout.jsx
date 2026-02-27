import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useTheme } from "../../Context/ThemeContext";

const MainLayout = () => {
  const { settings } = useTheme();

  return (
    <div
      className={`min-h-screen flex flex-col md:flex-row transition-colors duration-500 ${
        // 12-qator: Optional chaining (?.) qo'shildi
        settings?.darkMode ? "bg-[#121212]" : "bg-gray-100"
      }`}
    >
      <Sidebar />

      {/* Responsive layout uchun ml-0 va md:ml-[290px] qo'shildi */}
      <main className="flex-1 p-4 ml-0 md:ml-[290px] md:p-6 talent-sidebar">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;