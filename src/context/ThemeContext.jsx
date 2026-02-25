import React, { createContext, useContext, useState, useEffect, useLayoutEffect } from "react";

const ThemeContext = createContext(undefined);

export const ThemeProvider = ({ children }) => {
  // 1. State-ni boshida oddiy qiymat bilan e'lon qilamiz
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 2. Birinchi renderda mavzuni aniqlash
  // useLayoutEffect ekranda miltillash (flicker) bo'lmasligi uchun ishlatiladi
  useLayoutEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
    }
    setMounted(true);
  }, []);

  // 3. Mavzu o'zgarganda DOM-ni yangilash
  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode, mounted]);

  // 4. Toggle funksiyasi
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Agar komponent hali mounted bo'lmagan bo'lsa, xatoliklarni oldini olish uchun
  // (Faqatgina juda zarur bo'lsa server-side rendering uchun ishlatiladi)
  const value = {
    isDarkMode,
    setIsDarkMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme hooki ThemeProvider ichida ishlatilishi shart!");
  }
  return context;
};