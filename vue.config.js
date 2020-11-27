const PreloadPlugin = require('@vue/preload-webpack-plugin')

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pwa: {
    name: 'Musicify',
    themeColor: '#ff5136',
    msTileColor: '#ff5136',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'orange',


    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "src/service-worker.js"
    }
  },
  chainWebpack: config => {
    config.plugins.delete('prefetch')

    config
        .plugin('preload')
        .use(PreloadPlugin, [{
          rel: 'preload',
          include: 'asyncChunks'
        }])
  }
}