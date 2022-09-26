/**
 * @file rollup.config.js
 * @author James Wang <github.com/jamesxwang>
 */

const vueV2 = require('rollup-plugin-vue2')
const vueV3 = require('rollup-plugin-vue3')
const buble = require('rollup-plugin-buble')
const { terser } = require('rollup-plugin-terser')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const postcss = require('rollup-plugin-postcss')

const vue = process.env.VUE_VERSION === 'vue3' ? vueV3 : vueV2
const outputDir = process.env.VUE_VERSION === 'vue3' ? 'dist/vue3' : 'dist/vue2'

export default {
  input: 'src/components/VueHotspot.vue',
  output: {
    file: `${outputDir}/vue-hotspot.js`,
    name: 'VueHotspot',
    format: 'umd',
    globals: {
      'vue': 'Vue',
      'vue-demi': 'vueDemi'
    }
  },
  external: [
    'vue',
    '@vue/composition-api',
    'vue-demi'
  ],
  plugins: [
    resolve(),
    vue({
      compileTemplate: true,
      preprocessStyles: true
    }),
    // https://github.com/vuejs/rollup-plugin-vue/issues/364#issuecomment-748215652
    postcss(),
    commonjs(),
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
