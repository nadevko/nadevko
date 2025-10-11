import { defineConfig } from "vite";
import htmlMinifier from "vite-plugin-html-minifier";
import Icons from 'unplugin-icons/vite'
import cdn from "vite-plugin-cdn-import";

export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";
  const modules = [
    {
      name: "iconify-icon",
      var: "Iconify",
      path: "https://code.iconify.design/iconify-icon/3.0.1/iconify-icon.min.js",
    },
  ];

  return {
    plugins: [
      isProduction && cdn({ modules }),
      htmlMinifier({ minify: isProduction }),
      Icons({
        compiler: 'web-components',
        webComponents: {
          autoDefine: true,
        },
      }),
    ].filter(Boolean),

    build: {
      minify: isProduction,
      cssMinify: isProduction,
      rolldownOptions: {
        external: isProduction ? modules.map((mod) => mod.name) : [],
      },
    },
  };
});
