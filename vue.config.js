module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: 'docs',
  chainWebpack: config => {
    config
      .entry('app')
      .clear()
      .add('./src/docs/main.js')
  }
}
