/**
 * Additional configurations for Vue project
 *
 * @summary Additional configurations for Vue project
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-29 16:43:38 
 * Last modified  : 2020-10-26 06:56:27
 */

module.exports = {
  runtimeCompiler: true,
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'es',
      localeDir: 'locales',
      enableInSFC: false
    }
  },
  pwa: {
    name: 'MyEats Scheduler',
    themeColor: '#2A4365',
    msTileColor: '#2A4365',
    favicon32: 'img/icons/favicon-32x32.png',
    favicon16: 'img/icons/favicon-16x16.png',
    appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
    maskIcon: 'img/icons/safari-pinned-tab.svg',
    msTileImage: 'img/icons/msapplication-icon-144x144.png'
  }
}
