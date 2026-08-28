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

  modules: ['@nuxt/fonts', '@nuxt/image', '@nuxtjs/seo'],

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

    // Legacy WooCommerce URLs. Search Console still shows impressions on these, so they
    // 301 to the closest page on the new site rather than 404ing.
    '/product/gpx-demon-gr165r-black-space/': { redirect: { to: '/motorcycles/gpx-demon-gr165r', statusCode: 301 } },
    '/product/gpx-demon-gr165r-red-fire/': { redirect: { to: '/motorcycles/gpx-demon-gr165r', statusCode: 301 } },
    '/product/gpx-demon-gr165rr-da-corsa-daytona-black/': { redirect: { to: '/motorcycles/gpx-demon-gr165rr-da-corsa', statusCode: 301 } },
    '/product/gpx-demon-gr165rr-da-corsa-blue/': { redirect: { to: '/motorcycles/gpx-demon-gr165rr-da-corsa', statusCode: 301 } },
    '/product/gpx-demon-gr165rr-da-corsa-red/': { redirect: { to: '/motorcycles/gpx-demon-gr165rr-da-corsa', statusCode: 301 } },
    '/product/1859/': { redirect: { to: '/motorcycles/gpx-demon-gr165rr-da-corsa', statusCode: 301 } },
    '/product-category/helmet/': { redirect: { to: '/gear', statusCode: 301 } },
    '/product-category/helmet/mt/': { redirect: { to: '/gear', statusCode: 301 } },
    '/product-category/helmet/torq/': { redirect: { to: '/gear', statusCode: 301 } },
    '/product-category/helmet/origine/': { redirect: { to: '/gear', statusCode: 301 } },
    '/category/body-parts/': { redirect: { to: '/service-support', statusCode: 301 } },
    '/about-us/': { redirect: { to: '/authorized-dealer', statusCode: 301 } },
    '/contact-us/': { redirect: { to: '/contact', statusCode: 301 } },
    '/faq/': { redirect: { to: '/gpx-showroom-uttara', statusCode: 301 } },
    '/shop/': { redirect: { to: '/motorcycles', statusCode: 301 } },
    '/cart/': { redirect: { to: '/motorcycles', statusCode: 301 } },
    '/checkout/': { redirect: { to: '/motorcycles', statusCode: 301 } },
    '/my-account/': { redirect: { to: '/contact', statusCode: 301 } },
    '/2020/': { redirect: { to: '/', statusCode: 301 } },
    '/product/**': { redirect: { to: '/motorcycles', statusCode: 301 } },
    '/product-category/**': { redirect: { to: '/gear', statusCode: 301 } },
    '/category/**': { redirect: { to: '/service-support', statusCode: 301 } },
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

  linkChecker: {
    // The report is what tells us which links it dislikes.
    report: { markdown: true },
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

  fonts: {
    families: [
      { name: 'Barlow Condensed', provider: 'google', weights: [500, 600, 700] },
      { name: 'Inter', provider: 'google', weights: [400, 500, 600] },
    ],
    defaults: { subsets: ['latin'] },
  },

  typescript: { strict: true },
  devtools: { enabled: false },
})
