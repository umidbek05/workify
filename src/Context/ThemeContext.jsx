import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";

// Context yaratish
const ThemeContext = createContext(undefined);

// 1. ThemeProvider - Nomli eksport (Named Export)
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Birinchi renderda mavzuni aniqlash
  useLayoutEffect(() => {
    try {
      const savedTheme = localStorage.getItem("theme");
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
        setIsDarkMode(true);
      }
    } catch (error) {
      console.error("LocalStorage error:", error);
    }
    setMounted(true);
  }, []);

  // Mavzu o'zgarganda DOM-ni yangilash
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

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const value = {
    isDarkMode,
    setIsDarkMode,
    toggleTheme,
    mounted, // mounted holatini ham uzatish foydali (miltillashni oldini olish uchun)
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// 2. useTheme Custom Hook - Nomli eksport
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme hooki ThemeProvider ichida ishlatilishi shart!");
  }
  return context;
};
