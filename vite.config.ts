import { defineConfig } from "vite";
import icons from "unplugin-icons/vite";
import html, { type NpmModule } from "@tomjs/vite-plugin-html";

export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";
  const cdnModules: NpmModule[] = isProduction ? [] : [];

  return {
    plugins: [
      html({ minify: isProduction, cdn: { modules: cdnModules } }),
      icons({
        compiler: "web-components",
        webComponents: {
          autoDefine: true,
        },
      }),
    ].filter(Boolean),

    build: {
      minify: isProduction,
      cssMinify: isProduction,
      rolldownOptions: {
        external: cdnModules.map((mod) => mod.name),
      },
    },
  };
});
