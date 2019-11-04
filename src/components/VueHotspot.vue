<template>
<div>
  <div class="ui__vue_hotspot" ref="vue_hotspot" v-if="config">
    <img class="ui__vue_hotspot_background_image"
      ref="vue_hotspot_background_image"
      :src="config.image"
      @load="successLoadImg"
      alt="Hotspot Image">
    <span class="ui__vue_hotspot_overlay"
      ref="vue_hotspot_overlay"
      v-if="config.editable"
      @click.stop.prevent="addHotspot">
      <p>Please Click The Image To Add Hotspots.</p>
    </span>
    <div class="ui__vue_hotspot_hotspot"
      v-for="(hotspot, i) in config.data"
      :key="i"
      :style="getHotspotPosition(hotspot)"
      :class="'ui__vue_hotspot_hotspot_'+i"
      :ref="'vue_hotspot_hotspot_'+i"
      @mouseenter="config.interactivity === 'hover' ? toggleClass(i) : null"
      @mouseleave="config.interactivity === 'hover' ? toggleClass(i) : null"
      @click="config.interactivity === 'click' ? toggleClass(i) : null">
      <div :style="`color:${config.textColor}`">
        <div
          class="ui__vue_hotspot_title"
          :style="`
            background: ${config.messageBoxColor};
            opacity: ${config.opacity}`"
        >
          {{ hotspot['Title'] }}
        </div>
        <div
          class="ui__vue_hotspot_message"
          :style="`
            background: ${config.messageBoxColor};
            opacity: ${config.opacity}`"
        >
          {{ hotspot['Message'] }}
        </div>
      </div>
    </div>
    <ControlBox
      :config="config"
      @save-data="saveAllHotspots"
      @after-delete="removeAllHotspots"
    />
  </div>
</div>
</template>

<script>
import ControlBox from './module/ControlBox'
export default {
  props: {
    initOptions: Object
  },
  components: {
    ControlBox
  },
  data () {
    return {
      defaultOptions: {
        // Object to hold the hotspot data points
        data: [],

        // Default image placeholder
        image: 'https://via.placeholder.com/600x500?text=Oops!+image+not+found...',

        // Specify editable in which the plugin is to be used
        // `true`: Allows to create hotspots from UI
        // `false`: Display hotspots from `data` object
        editable: true,

        // Event on which the hotspot data point will show up
        // allowed values: `click`, `hover`, `none`
        interactivity: 'hover',

        // background color for hotspots
        hotspotColor: 'rgb(66, 184, 131)',
        messageBoxColor: 'rgb(255, 255, 255)',
        textColor: 'rgb(53, 73, 94)',

        // opacity for hotspots, default is 0.8
        opacity: 0.8,

        // Hotspot schema
        schema: [
          {
            'property': 'Title',
            'default': 'Vue Hotspot'
          },
          {
            'property': 'Message',
            'default': 'This is a Vue Hotspot Component which lets you create hotspot. '
          }
        ]
      },
      config: null,
      imageLoaded: false
    }
  },
  methods: {
    init () {
      // Add resize listener
      window.addEventListener('resize', this.resizeHotspot)
    },
    copyObj (obj) {
      return JSON.parse(JSON.stringify(obj))
    },
    getHotspotPosition (hotspot) {
      if (!this.imageLoaded) return ''
      let element = this.$refs['vue_hotspot']
      let tagElement = this.$refs['vue_hotspot_background_image']

      let height = tagElement.clientHeight
      let width = tagElement.clientWidth

      return `
        top: ${(hotspot.y * height / 100) + (tagElement.offsetTop - element.clientTop)}px;
        left: ${(hotspot.x * width / 100) + (tagElement.offsetLeft - element.clientLeft)}px;
        background-color: ${this.config.hotspotColor}
      `
    },
    resizeHotspot () {
      let element = this.$refs['vue_hotspot']
      let overlay = this.$refs['vue_hotspot_overlay']
      if (!overlay) return
      let image = this.$refs['vue_hotspot_background_image']
      overlay.style.height = `${(image.clientHeight / element.clientHeight) * 100}%`
      overlay.style.width = `${(image.clientWidth / element.clientWidth) * 100}%`
      overlay.style.left = `${image.offsetLeft - element.clientLeft}px`
      overlay.style.top = `${image.offsetTop - element.clientTop}px`
    },
    setOptions () {
      let defaultOptions = this.copyObj(this.defaultOptions)
      if (this.config) {
        defaultOptions = this.config
      }
      this.config = { ...defaultOptions, ...this.initOptions }
    },
    successLoadImg (event) {
      if (event.target.complete === true) {
        this.imageLoaded = true
      }
    },
    addHotspot (e) {
      let overlay = this.$refs['vue_hotspot_overlay']
      let relativeX = e.offsetX
      let relativeY = e.offsetY
      let height = overlay.offsetHeight
      let width = overlay.offsetWidth
      let hotspot = { x: relativeX / width * 100, y: relativeY / height * 100 }
      let schema = this.config.schema
      for (let i = 0; i < schema.length; i++) {
        const value = schema[i]
        let fill = prompt(`Please enter ${value.property}`, value.default)
        if (fill === null) {
          return
        }
        hotspot[value.property] = fill
      }
      this.config.data.push(hotspot)
    },
    saveAllHotspots () {
      this.$emit('save-data', this.config.data)
    },
    removeAllHotspots () {
      this.$emit('after-delete')
    },
    toggleClass (i) {
      let hotspot = this.$refs[`vue_hotspot_hotspot_${i}`]
      hotspot[0].classList.toggle('active')
    }
  },
  mounted () {
    // set options if `initOptions` is already provided
    if (this.initOptions) {
      // overwrite defaults with initOptions
      this.setOptions()
      this.init()
    }
  },
  watch: {
    initOptions: {
      handler: function (after, before) {
        this.setOptions()
        this.$nextTick(() => {
          this.resizeHotspot()
        })
      },
      deep: true
    },
    imageLoaded: function (after, before) {
      // Resize after image loaded
      this.resizeHotspot()
    }
  }
}
</script>

<style>
.ui__vue_hotspot {
  width: auto;
  height: auto;
  display: inline-block;
  position: relative;
}
/* CSS class for hotspot data points */
.ui__vue_hotspot_hotspot {
  height: 20px;
  width: 20px;
  position: absolute;
  border-radius: 50%;
  cursor: pointer;
  z-index: 200;
  margin-left: -10px;
  margin-top: -10px;
}
.ui__vue_hotspot_background_image {
  max-width: 100%;
}
.ui__vue_hotspot_hotspot > div {
  width: 140px;
  height: 94px;
  margin: -104px -60px;
  border-radius: 4px;
  overflow: hidden;
  font-size: 10px;
  display: none;
}
.ui__vue_hotspot_hotspot.active > div {
  display: block; /* Required */
}
.ui__vue_hotspot_hotspot.active > div:before {
  border: solid transparent;
  content: ' ';
  height: 0;
  left: 0;
  position: absolute;
  width: 0;
  border-width: 10px;
  border-left-color: rgba(255, 255, 255, 0.4);
  transform: rotate(90deg);
  top: -10px;
}
.ui__vue_hotspot_hotspot > div > .ui__vue_hotspot_title {
  height: 20px;
  line-height: 20px;
  font-weight: bold;
  padding: 4px 10px;
  transition: opacity 0.2s ease-in;
}
.ui__vue_hotspot_hotspot > div > .ui__vue_hotspot_message {
  margin-top: 2px;
  padding: 10px 10px;
  height: 72px;
  overflow-y: auto;
  transition: opacity 0.2s ease-in;
}

/* CSS class for overlay used in `editable:true` mode */
span.ui__vue_hotspot_overlay {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0px;
  left: 0px;
  cursor: pointer;
}
span.ui__vue_hotspot_overlay > p {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.4);
  margin-top: 0px;
  padding: 20px;
  text-align: center;
}
</style>
