import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // Shuni qo'shing

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Va shuni qo'shing
  ],
});
