import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  vite: {
   plugins: [tailwindcss()],
 },

  markdown: {
    drafts: true,
    shikiConfig: {
      theme: "css-variables"
    }
  },

  shikiConfig: {
    wrap: true,
    skipInline: false,
    drafts: true
  },

  site: 'https://yourwebsite.com',
  integrations: [sitemap(), mdx()],
  adapter: cloudflare()
});