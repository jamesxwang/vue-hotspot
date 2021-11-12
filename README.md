<p align="center">
  <img width="320" src="./src/demo/assets/logo.png">
</p>
<p align="center">
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-2.6.10-brightgreen.svg" alt="Vue">
  </a>
  <a href="https://circleci.com/gh/jamesxwang/vue-hotspot/tree/master">
    <img src="https://circleci.com/gh/jamesxwang/vue-hotspot/tree/master.svg?style=shield" alt="circle-ci">
  </a>
  <a href="https://codecov.io/github/jamesxwang/vue-hotspot?branch=master">
    <img src="https://img.shields.io/codecov/c/github/jamesxwang/vue-hotspot/master.svg" alt="Coverage Status">
  </a>
  <a href="https://www.npmjs.com/package/vue-hotspot">
    <img alt="npm" src="https://img.shields.io/npm/dy/vue-hotspot" alt="Downloads">
  </a>
  <a href="https://github.com/jamesxwang/vue-hotspot/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/mashape/apistatus.svg" alt="License">
  </a>
  <a href="#">
    <img src="https://img.shields.io/github/languages/code-size/jamesxwang/vue-hotspot" alt="GitHub code size in bytes">
  </a>
  <a href="#">
    <img src="https://img.shields.io/github/package-json/v/jamesxwang/vue-hotspot" alt="Version">
  </a>
</p>

English | [简体中文](./README.zh-CN.md)

## Introduction

[Vue-Hotspot](https://github.com/jamesxwang/vue-hotspot) is an image hotspot component for Vue.js.

* [Live Demo](https://jamesxwang.github.io/vue-hotspot/)

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

You can see more examples [here](https://jamesxwang.github.io/vue-hotspot/).

## Project Structure
<pre>
.
├── CHANGELOG.md
├── LICENSE
├── README.md
├── README.zh-CN.md
├── babel.config.js
├── dist                        // folder, build files from src/components
├── docs                        // folder, build files from src/demo
├── jest.config.js              // jest config
├── package-lock.json
├── package.json
├── public                      // folder, demo public files
│   ├── favicon.ico
│   └── index.html
├── publish.sh                  // publish shell script
├── rollup.config.js            // rollup config
├── src                         // folder, src folder
│   ├── components              // folder, main folder
│   │   ├── VueHotspot.vue      // entry file
│   │   ├── module              // folder, module folder
│   │   │   ├── ControlBox.vue
│   │   │   └── DataPoint.vue
│   │   └── utils               // folder, utils folder
│   │       └── common.js
│   └── demo                    // folder, demo files source folder
│       ├── Demo.vue
│       ├── assets
│       │   ├── logo.png
│       │   └── unimelb.jpg
│       ├── components
│       │   ├── ShowCode.vue
│       │   └── Toggle.vue
│       └── main.js
├── tests                       // folder, unit test folder
│   └── unit
│       ├── ControlBox.spec.js
│       ├── DataPoint.spec.js
│       └── common.spec.js
└── vue.config.js               // vue config file
</pre>

## Project Structure
<pre>
.
├── CHANGELOG.md
├── LICENSE
├── README.md
├── README.zh-CN.md
├── babel.config.js
├── dist                        // folder, build files from src/components
├── docs                        // folder, build files from src/demo
├── jest.config.js              // jest config
├── package-lock.json
├── package.json
├── public                      // folder, demo public files
│   ├── favicon.ico
│   └── index.html
├── publish.sh                  // publish shell script
├── rollup.config.js            // rollup config
├── src                         // folder, src folder
│   ├── components              // folder, main folder
│   │   ├── VueHotspot.vue      // entry file
│   │   ├── module              // folder, module folder
│   │   │   ├── ControlBox.vue
│   │   │   └── DataPoint.vue
│   │   └── utils               // folder, utils folder
│   │       └── common.js
│   └── demo                    // folder, demo files source folder
│       ├── Demo.vue
│       ├── assets
│       │   ├── logo.png
│       │   └── unimelb.jpg
│       ├── components
│       │   ├── ShowCode.vue
│       │   └── Toggle.vue
│       └── main.js
├── tests                       // folder, unit test folder
│   └── unit
│       ├── ControlBox.spec.js
│       ├── DataPoint.spec.js
│       └── common.spec.js
└── vue.config.js               // vue config file
</pre>

## Config Options

|     options     | description                                                                                                                                       | required |                       default                       |
|:---------------:|---------------------------------------------------------------------------------------------------------------------------------------------------|:--------:|:---------------------------------------------------:|
| image           | Default image placeholder                                                                                                                         | true     | an empty image with text 'Oops! image not found...' |
| data            | Object to hold the hotspot data points.<br>Data structure: `[ {Message: 'String', Title: 'String, x: Float, y: Float'} ]`                           |   false  |                          []                         |
| editable        | Specify editable in which the plugin is to be used.<br>`true`: Allows to create hotspots from UI.<br>`false`: Display hotspots from `data` object |   false  |                         true                        |
| interactivity   | Event on which the hotspot data point will show up.<br>allowed values: `click`, `hover`, `none`                                                   |   false  |                        hover                        |
| hotspotColor    | background color for hotspot dots                                                                                                                 |   false  |                 'rgb(66, 184, 131)'                 |
| messageBoxColor | background color for hotspot message boxes                                                                                                        |   false  |                 'rgb(255, 255, 255)'                |
| textColor       | background color for hotspot text                                                                                                                 |   false  |                 'rgb(53, 73, 94)'                   |
| opacity         | opacity for hotspots                                                                                                                              |   false  |                         0.8                         |
| overlayText     | text for overlay in edit mode                                                                                                                     |   false  |    'Please Click The Image To Add Hotspots.'        |

## Local development

```bash
$ npm i
$ npm run serve
```

Open `http://localhost:8080/` to see the demo.

# License

Vue-hotspot component is delivered under the [MIT License](https://github.com/jamesxwang/vue-hotspot/blob/master/LICENSE)