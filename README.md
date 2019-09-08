# Vue-Hotspot

<p align="left">
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-2.6.10-brightgreen.svg" alt="vue">
  </a>
  <a href="https://www.npmjs.com/package/vue-hotspot">
    <img alt="npm" src="https://img.shields.io/npm/dy/vue-hotspot" alt="downloads">
  </a>
  <a href="https://github.com/cn-wx/vue-hotspot/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/mashape/apistatus.svg" alt="license">
  </a>
  <a href="#">
    <img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/cn-wx/vue-hotspot">
  </a>
</p>

English | [简体中文](./README.zh-CN.md)

> Hotspot component for Vue.js.

## Installation

### npm (Recommended)

```bash
$ npm install vue-hotspot --save
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
        interactivity: 'hover'
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

## Local development

```bash
$ npm i
$ npm run serve
```

Open `http://localhost:8080/` to see the demo.
