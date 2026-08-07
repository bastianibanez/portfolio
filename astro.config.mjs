import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://bastianibanez.com",
  output: "static",
  build: {
    format: "file",
  },
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith("/404") && !page.endsWith("/en/404"),
      serialize(item) {
        if (item.url === "https://bastianibanez.com/en") {
          item.url = `${item.url}/`;
        }
        return item;
      },
    }),
  ],
});
