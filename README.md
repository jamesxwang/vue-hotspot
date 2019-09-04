# Vue-Hotspot

> Hotspot component for Vue.js.

Depends on [Vue.js](https://vuejs.org/) `v2`+.

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
  <v-hotspot :initOptions="hotspotConfig"/>
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
  }
}
</script>
```

See Live Demo [here](https://cn-wx.github.io/vue-hotspot/).

## Local development
```bash
$ npm i
$ npm run serve
```

Open `http://localhost:8080/` to see the demo.