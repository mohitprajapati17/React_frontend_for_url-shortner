// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Export Vite config
export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
      theme: {
        extend: {
          backgroundImage: {
            "custom-gradient": "linear-gradient(to right, #3b82f6, #9333ea)",
            "custom-gradient-2": "linear-gradient(to left, #3b82f6, #f43f5e)",
            "card-gradient": "linear-gradient(to right, #38b2ac, #4299e1)",
          },
          colors: {
            navbarColor: "#ffffff",
            btnColor: "#3364f7",
            LinkColor: "#2a5bd7",
          },
          boxShadow: {
            custom: "0 0 15px rgba(0, 0, 0, 0.3)",
            right: "10px 0px 10px -5px rgba(0, 0, 0, 0.3)",
          },
          fontFamily: {
            roboto: ["Roboto", "sans-serif"],
            montserrat: ["Montserrat"],
          },
        },
      },
    }),
  ],
  server: {
    port: 5174,
    strictPort: true,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
