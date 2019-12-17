/**
 * @file rollup.config.js
 * @author James Wang <github.com/cn-wx>
 */

const vue = require('rollup-plugin-vue')
const buble = require('rollup-plugin-buble')
const { terser } = require('rollup-plugin-terser')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')

export default {
  input: 'src/components/VueHotspot.vue',
  output: {
    file: 'dist/vue-hotspot.js',
    name: 'VueHotspot',
    format: 'umd',
    globals: {
      'vue': 'Vue',
      '@vue/composition-api': 'VueCompositionApi'
    }
  },
  external: [
    'vue',
    '@vue/composition-api'
  ],
  plugins: [
    resolve(),
    commonjs(),
    vue({
      compileTemplate: true,
      css: true
    }),
    buble({
      objectAssign: 'Object.assign'
    }),
    terser({
      compress: {
        global_defs: {
          __DEV__: process.env.NODE_ENV !== 'production'
        }
      }
    })
  ]
}
