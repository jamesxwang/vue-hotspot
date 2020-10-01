<p align="center">
  <img width="320" src="./src/demo/assets/logo.png">
</p>
<p align="center">
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-2.6.10-brightgreen.svg" alt="Vue">
  </a>
  <a href="https://circleci.com/gh/cn-wx/vue-hotspot/tree/master">
    <img src="https://circleci.com/gh/cn-wx/vue-hotspot/tree/master.svg?style=shield" alt="circle-ci">
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
        interactivity: 'hover',
        data: [
          { Message: '预加载热点', Title: 'Vue Hotspot 1', x: 33.3, y: 58.33 },
          { Message: '预加载热点', Title: 'Vue Hotspot 2', x: 53.3, y: 78.3 }
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

## 目录结构
<pre>
.
├── CHANGELOG.md
├── LICENSE
├── README.md
├── README.zh-CN.md
├── babel.config.js
├── dist                        // 文件夹, 文件夹 src/components 打包后的代码
├── docs                        // 文件夹, 文件夹 src/demo 打包后的代码
├── jest.config.js              // jest 框架的配置信息
├── package-lock.json
├── package.json
├── public                      // 文件夹, 存放demo公共文件
│   ├── favicon.ico
│   └── index.html
├── publish.sh                  // 发布npm的脚本
├── rollup.config.js            // rollup 配置信息
├── src                         // src 文件夹
│   ├── components              // 主文件夹
│   │   ├── VueHotspot.vue      // 入口文件
│   │   ├── module              // module 文件夹
│   │   │   ├── ControlBox.vue
│   │   │   └── DataPoint.vue
│   │   └── utils               // 工具类文件夹
│   │       └── common.js
│   └── demo                    // demo 文件夹
│       ├── Demo.vue
│       ├── assets
│       │   ├── logo.png
│       │   └── unimelb.jpg
│       ├── components
│       │   ├── ShowCode.vue
│       │   └── Toggle.vue
│       └── main.js
├── tests                       // 单元测试文件文件夹
│   └── unit
│       ├── ControlBox.spec.js
│       ├── DataPoint.spec.js
│       └── common.spec.js
└── vue.config.js               // vue 配置信息
</pre>

## 配置选项

|     配置选项    | 简介                                                                                                                  | 是否必须 |                   默认值                   |
|:---------------:|-----------------------------------------------------------------------------------------------------------------------|:--------:|:------------------------------------------:|
| image           | 背景图片                                                                                                              | 是       | 一张带有'Oops! image not found...'字的图片 |
| data            | 存放热点的数据.<br>数据结构: `[ Message: 'String', Title: 'String, x: Float, y: Float' ]`                             |    否    |                     []                     |
| editable        | 指定要在其中使用插件的可编辑项。<br>`true`: 用户可以通过组件UI创建新的热点。<br>`false`: 组件从`data`对象中读取数据。 |    否    |                    true                    |
| interactivity   | 显示热点的条件事件，可允许设置值: `click`, `hover`, `none`                                                            |    否    |                    hover                   |
| hotspotColor    | 热点的颜色                                                                                                            |    否    |             'rgb(66, 184, 131)'            |
| messageBoxColor | 热点消息框的颜色                                                                                                      |    否    |            'rgb(255, 255, 255)'            |
| textColor       | 热点消息框中字的颜色                                                                                                  |    否    |              'rgb(53, 73, 94)'             |
| opacity         | 热点消息框的透明度                                                                                                    |    否    |                     0.8                    |
| overlayText     | 编辑模式下的覆盖层的文字                                                                                                |    否    | 'Please Click The Image To Add Hotspots.'  |

## 本地开发

```bash
$ npm i
$ npm run serve
```

打开 `http://localhost:8080/` 来查看例子。

# 版权说明

Vue-hotspot 组件的证书是 [MIT 证书](https://github.com/cn-wx/vue-hotspot/blob/master/LICENSE)