import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",

      devOptions: {
        enabled: false,
      },

      includeAssets: [
        "favicon.svg",
        "icons/icon-192.png",
        "icons/icon-512.png",
      ],

      manifest: {
        name: "¿Quién miente?",
        short_name: "Quién miente",
        description:
          "Juego local offline para descubrir quién recibió la pregunta diferente.",
        theme_color: "#0b1016",
        background_color: "#0b1016",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        scope: "/",
        icons: [
          {
            src: "/icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp,json}"],
        cleanupOutdatedCaches: true,
      },
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});