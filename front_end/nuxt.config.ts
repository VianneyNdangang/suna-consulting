// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  // devServer: {
  //   port:4000
  // },
  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: '',
    storageKey: 'nuxt-ui-color-mode',
  },
  // Only import public main.css (adminStyle.css is scoped to admin layout to prevent double-tailwind compilation)
  css: [
    './app/assets/css/main.css',
  ],
  i18n: {
  defaultLocale: 'fr',

  locales: [
    {
      code: 'fr',
      name: 'Français',
      file: 'fr.json',
    },
    {
      code: 'en',
      name: 'English',
      file: 'en.json',
    },
  ],
},
  vite: {
    plugins: [
      tailwindcss(),
    ],
    build: {
      cssMinify: true,
    }
  },
  ssr:true,
  modules: [
    "@nuxt/icon",
    "@pinia/nuxt",
    'pinia-plugin-persistedstate/nuxt',
    'motion-v/nuxt',
    '@nuxt/ui',
    '@vee-validate/nuxt',
    '@nuxt/image',
    "@nuxtjs/i18n",
  ],

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Súna Consulting | Votre représentant de confiance au Cameroun',
      htmlAttrs: {
        lang: 'fr',
        dir: 'ltr',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#8a3e12' },
        {
          name: 'description',
          content: 'Súna Consulting : Représentation, assistance administrative, vérification foncière, suivi de chantiers et conciergerie au Cameroun pour la diaspora.'
        },
        {
          name: 'keywords',
          content: 'Cameroun, diaspora camerounaise, démarches administratives Cameroun, titre foncier Douala Yaoundé, suivi chantier Cameroun, conciergerie Cameroun, acheter terrain Cameroun'
        },
        { name: 'author', content: 'Súna Consulting' },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        // Open Graph
        { property: 'og:site_name', content: 'Súna Consulting' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'fr_FR' },
        { property: 'og:title', content: 'Súna Consulting | Votre représentant de confiance au Cameroun' },
        {
          property: 'og:description',
          content: 'Pilotez vos démarches administratives, vérifications foncières et projets au Cameroun en toute sérénité depuis l’étranger.'
        },
        { property: 'og:image', content: '/logo_primary.png' },
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Súna Consulting | Votre représentant de confiance au Cameroun' },
        {
          name: 'twitter:description',
          content: 'Pilotez vos démarches administratives, vérifications foncières et projets au Cameroun en toute sérénité depuis l’étranger.'
        },
        { name: 'twitter:image', content: '/logo_primary.png' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/icon.png' },
        { rel: 'canonical', href: 'https://sunaconsulting.com' },
      ],
    },
  },

  // runtimeConfig: {
  //   public: {
  //     apiUrl: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:3000/'
  //   }
  // }
});