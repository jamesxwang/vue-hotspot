/**
 * @file vue.config.js
 * @author James Wang <github.com/jamesxwang>
 */

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: 'docs',
  chainWebpack: config => {
    config
      .entry('app')
      .clear()
      .add('./src/demo/main.js')
  }
}
