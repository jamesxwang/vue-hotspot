/**
 * @file vue.config.js
 * @author James Wang <github.com/jamesxwang>
 */

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: 'docs',
  chainWebpack: config => {
    config.externals({
      ...config.get('externals'),
      'vue': 'vue',
      'vue-demi': 'vue-demi',
      '@vue/composition-api': '@vue/composition-api'
    })

    config
      .entry('app')
      .clear()
      .add('./src/demo/main.js')
  }
}
