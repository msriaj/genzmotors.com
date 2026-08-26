import tailwindcss from '@tailwindcss/vite'

const site = {
  url: 'https://genzmotorsbd.com',
  name: 'Gen-Z Motors',
  description:
    'Authorized GPX motorcycle dealer and 3S centre in Sector 15, Diabari, Uttara, Dhaka. GPX Demon GR165R and GR165RR Da Corsa, servicing, genuine spare parts and test rides.',
}

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  future: { compatibilityVersion: 4 },

  modules: ['@nuxt/image', '@nuxtjs/seo'],

  css: ['~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },

  site,

  // Static output: every route is prerendered, no server required.
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/sitemap.xml', '/robots.txt'],
      failOnError: false,
    },
  },

  routeRules: {
    '/**': { prerender: true },
  },

  image: {
    quality: 78,
    format: ['avif', 'webp'],
    screens: { xs: 360, sm: 640, md: 768, lg: 1024, xl: 1280, xxl: 1536, '2xl': 1920 },
  },

  sitemap: {
    autoLastmod: true,
    defaults: { changefreq: 'monthly', priority: 0.7 },
  },

  robots: {
    // Nothing to hide: the whole static site should be crawlable.
    disallow: [],
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      // Page titles already carry the brand; suppress the module's automatic suffix.
      titleTemplate: '%s',
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Inter:wght@400;500;600&display=swap',
        },
      ],
      meta: [{ name: 'theme-color', content: '#000000' }],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  typescript: { strict: true },
  devtools: { enabled: false },
})
