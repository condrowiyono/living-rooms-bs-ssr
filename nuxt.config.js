require('dotenv').config()

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { href: 'https://fonts.googleapis.com/css?family=Muli:400,600,800&display=swap', rel: 'stylesheet' }
    ],
    script: [
      { src: 'https://cdn.jwplayer.com/libraries/136FlbbE.js' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/custom.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~plugins/resizer.js' }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    // 'bootstrap-vue/nuxt'
    '@nuxtjs/dotenv',
    [
      '@nuxtjs/device',
      { defaultUserAgent: 'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Mobile Safari/537.36' }
    ]
  ],

  router: {
    linkActiveClass: 'active',
    linkExactActiveClass: 'active'
  },
  bootstrapVue: {
    // components: [
    //   'BNavbar',
    //   'BNavbarBrand',
    // ],
    // bootstrapCSS: false,
    // bootstrapVueCSS: false
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },

  babel: {
    presets (env, [preset, options]) {
      return [
        ['@nuxt/babel-preset-app', options]
      ]
    }
  }
}
