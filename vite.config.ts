import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  preview: {
    allowedHosts: [
      "7min-production.up.railway.app",
      "7min.tinygods.dev",
    ],
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "7 Minutes",
        short_name: "7 min",
        description: "A configurable seven-minute workout",
        lang: "en",
        theme_color: "#f4f1e8",
        background_color: "#f4f1e8",
        display: "standalone",
        orientation: "portrait",
        id: "/",
        start_url: "/app",
        scope: "/",
        icons: [
          {
            src: "/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        cleanupOutdatedCaches: true,
        globPatterns: ["**/*.{js,css,html,png,svg,webp,woff2}"],
        globIgnores: ["**/icon-192.png", "**/icon-512.png"],
        navigateFallback: "/index.html",
      },
    }),
  ],
});
