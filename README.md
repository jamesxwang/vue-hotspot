<p align="center">
  <img width="320" src="./src/demo/assets/logo.png">
</p>
<p align="center">
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-2.6.10-brightgreen.svg" alt="Vue">
  </a>
  <a href="https://travis-ci.org/cn-wx/vue-hotspot">
    <img src="https://travis-ci.org/cn-wx/vue-hotspot.svg?branch=master" alt="travis-ci">
  </a>
  <a href="https://codecov.io/github/cn-wx/vue-hotspot?branch=master">
    <img src="https://img.shields.io/codecov/c/github/cn-wx/vue-hotspot/master.svg" alt="Coverage Status">
  </a>
  <a href="https://www.npmjs.com/package/vue-hotspot">
    <img alt="npm" src="https://img.shields.io/npm/dy/vue-hotspot" alt="Downloads">
  </a>
  <a href="https://github.com/cn-wx/vue-hotspot/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/mashape/apistatus.svg" alt="License">
  </a>
  <a href="#">
    <img src="https://img.shields.io/github/languages/code-size/cn-wx/vue-hotspot" alt="GitHub code size in bytes">
  </a>
  <a href="#">
    <img src="https://img.shields.io/github/package-json/v/cn-wx/vue-hotspot" alt="Version">
  </a>
</p>

English | [简体中文](./README.zh-CN.md)

## Introduction

[Vue-Hotspot](https://github.com/cn-wx/vue-hotspot) is an image hotspot component for Vue.js.

* [Live Demo](https://cn-wx.github.io/vue-hotspot/)

## Installation

### npm (Recommended)

```bash
$ npm install vue-hotspot --save
```

### yarn

```
$ yarn add vue-hotspot
```

## Usage

ES Modules with npm (Recommended)

```js
import Vue from 'vue'
import VueHotspot from 'vue-hotspot' // refers to components/VueHotspot.vue in webpack

// register component to use
Vue.component('v-hotspot', VueHotspot)
```

### Global variable

Without any module system, the component is exposed as `window.VueHotspot`.

```js
// register component to use
Vue.component('v-hotspot', VueHotspot)
```

## Using the component

```html
<template>
  <v-hotspot
    :init-options="hotspotConfig"
    @save-data="saveData"
    @after-delete="afterDelete" />
</template>

<script>
import Vue from 'vue'
import VueHotspot from 'vue-hotspot'
export default {
  components: {
    'v-hotspot': VueHotspot
  },
  data () {
    return {
      hotspotConfig: {
        image: 'your-image-url.png',
        editable: true,
        interactivity: 'hover',
        data: [
          { Message: 'A prepopulated hotspot', Title: 'Vue Hotspot 1', x: 33.3, y: 58.33 },
          { Message: 'Another prepopulated hotspot', Title: 'Vue Hotspot 2', x: 53.3, y: 78.3 }
        ],
        hotspotColor: '#85ce61',
        messageBoxColor: '#409eff',
        textColor: '#333',
        opacity: 0.9
      }
    }
  },
  methods: {
    saveData (data) {
      // Do something with the list of hotspots
      console.log(data)
    },
    afterDelete () {
      // Do something after delete
      console.log('Do something after delete ...')
    }
  }
}
</script>
```

## Live Demo

You can see more examples [here](https://cn-wx.github.io/vue-hotspot/).

## Config Options

|     options     | description                                                                                                                                       | required |                       default                       |
|:---------------:|---------------------------------------------------------------------------------------------------------------------------------------------------|:--------:|:---------------------------------------------------:|
| image           | Default image placeholder                                                                                                                         | true     | an empty image with text 'Oops! image not found...' |
| data            | Object to hold the hotspot data points.<br>Data structure: `[ {Message: 'String', Title: 'String, x: Float, y: Float'} ]`                           |   false  |                          []                         |
| editable        | Specify editable in which the plugin is to be used.<br>`true`: Allows to create hotspots from UI.<br>`false`: Display hotspots from `data` object |   false  |                         true                        |
| interactivity   | Event on which the hotspot data point will show up.<br>allowed values: `click`, `hover`, `none`                                                   |   false  |                        hover                        |
| hotspotColor    | background color for hotspot dots                                                                                                                 |   false  |                 'rgb(66, 184, 131)'                 |
| messageBoxColor | background color for hotspot message boxes                                                                                                        |   false  |                 'rgb(255, 255, 255)'                 |
| textColor       | background color for hotspot text                                                                                                                 |   false  |                 'rgb(53, 73, 94)'                 |
| opacity         | opacity for hotspots                                                                                                                              |   false  |                         0.8                         |

## Local development

```bash
$ npm i
$ npm run serve
```

Open `http://localhost:8080/` to see the demo.

# License

Vue-hotspot component is delivered under the [MIT License](https://github.com/cn-wx/vue-hotspot/blob/master/LICENSE)