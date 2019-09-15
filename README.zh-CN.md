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

简体中文 | [English](./README.md)

## 简介

[Vue-Hotspot](https://github.com/cn-wx/vue-hotspot) 是一个基于Vue.js的图片热点组件。

* [在线预览](https://cn-wx.github.io/vue-hotspot/)

## 安装

### npm (推荐方式)

```bash
$ npm install vue-hotspot --save
```

### yarn

```
$ yarn add vue-hotspot
```

## 使用方法

用 npm 基于 ES Module 引入（推荐用法）

```js
import Vue from 'vue'
import VueHotspot from 'vue-hotspot' // 在 webpack 环境下指向 components/VueHotspot.vue

// 注册组件后即可使用
Vue.component('v-hotspot', VueHotspot)
```

### 全局变量

在没有使用任何模块系统的情况下，组件将通过 window.VueHotspot 变量暴露接口：

```js
// 注册组件后即可使用
Vue.component('v-hotspot', VueHotspot)
```

## 调用组件

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
      // 保存所有热点后的回调事件
      console.log(data)
    },
    afterDelete () {
      // 删除所有热点后的回调事件
      console.log('Do something after delete ...')
    }
  }
}
</script>
```

## 在线演示

查看[这里](https://cn-wx.github.io/vue-hotspot/)了解更多例子。

## 本地开发

```bash
$ npm i
$ npm run serve
```

打开 `http://localhost:8080/` 来查看例子。
