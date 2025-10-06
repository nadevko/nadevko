import { defineConfig } from "vite";
import htmlMinifier from "vite-plugin-html-minifier";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  plugins: [htmlMinifier({ minify: isProduction })],

  build: {
    minify: isProduction,
    cssMinify: isProduction,
  },
});
