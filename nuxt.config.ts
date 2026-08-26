import tailwindcss from '@tailwindcss/vite'

const site = {
  // Overridable per environment (Vercel previews set NUXT_PUBLIC_SITE_URL) so canonical
  // URLs, the sitemap and OG images always point at the host actually serving the build.
  url: process.env.NUXT_PUBLIC_SITE_URL || 'https://genzmotorsbd.com',
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

    // Sitemap weighting: the local landing pages and the lineup do the ranking work,
    // so they sit above the supporting pages.
    '/': { sitemap: { priority: 1.0, changefreq: 'weekly' } },
    '/motorcycles': { sitemap: { priority: 0.9, changefreq: 'weekly' } },
    '/motorcycles/**': { sitemap: { priority: 0.9, changefreq: 'monthly' } },
    '/gpx-showroom-uttara': { sitemap: { priority: 0.9, changefreq: 'monthly' } },
    '/gpx-showroom-mymensingh': { sitemap: { priority: 0.8, changefreq: 'monthly' } },
    '/showrooms': { sitemap: { priority: 0.8, changefreq: 'monthly' } },
    '/test-ride': { sitemap: { priority: 0.8, changefreq: 'monthly' } },
    '/service-support': { sitemap: { priority: 0.7, changefreq: 'monthly' } },
    '/contact': { sitemap: { priority: 0.7, changefreq: 'yearly' } },
    '/gear': { sitemap: { priority: 0.6, changefreq: 'monthly' } },
    '/authorized-dealer': { sitemap: { priority: 0.6, changefreq: 'yearly' } },
    '/sitemap': { sitemap: { priority: 0.2, changefreq: 'yearly' } },
  },

  image: {
    quality: 78,
    format: ['avif', 'webp'],
    screens: { xs: 360, sm: 640, md: 768, lg: 1024, xl: 1280, xxl: 1536, '2xl': 1920 },
  },

  sitemap: {
    autoLastmod: true,
    defaults: { changefreq: 'monthly', priority: 0.7 },
    // Pull the motorcycle photography into the sitemap as <image:image> entries.
    discoverImages: true,
    xslColumns: [
      { label: 'URL', width: '52%' },
      { label: 'Priority', select: 'sitemap:priority', width: '16%' },
      { label: 'Changefreq', select: 'sitemap:changefreq', width: '16%' },
      { label: 'Last modified', select: 'sitemap:lastmod', width: '16%' },
    ],
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
      meta: [
        { name: 'theme-color', content: '#000000' },
        // Local relevance signals for the two service areas.
        { name: 'geo.region', content: 'BD-13' },
        { name: 'geo.placename', content: 'Uttara, Dhaka' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  typescript: { strict: true },
  devtools: { enabled: false },
})
