import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    domains: ["images.unsplash.com"],
  },
  markdown: {
    drafts: true,
    shikiConfig: {
      theme: "css-variables",
      wrap: true,
      skipInline: false,
    }
  },
  site: 'https://expiatoriovoyeur.com',
  integrations: [sitemap(), mdx()],
  adapter: cloudflare()
});
