<template>
<div>
  <div class="ui__vue_hotspot" v-if="config">
    <img class="ui__vue_hotspot_background_image" :src="config.image" @load="successLoadImg" alt="Hotspot Image" >
    <span class="ui__vue_hotspot_overlay" v-if="config.editable" @click.stop.prevent="addHotspot">
      <p>Please Click The Image To Add Hotspots.</p>
    </span>
    <div class="ui__vue_hotspot_hotspot"
      v-for="(hotspot, i) in config.data"
      :key="i"
      :style="getHotspotPosition(hotspot)"
      :class="'ui__vue_hotspot_hotspot_'+i"
      @mouseenter="config.interactivity === 'hover' ? toggleClass(i) : null"
      @mouseleave="config.interactivity === 'hover' ? toggleClass(i) : null"
      @click="config.interactivity === 'click' ? toggleClass(i) : null">
      <div>
        <div class="ui__vue_hotspot_title">{{ hotspot['Title'] }}</div>
        <div class="ui__vue_hotspot_message">{{ hotspot['Message'] }}</div>
      </div>
    </div>
  </div>
  <div class="ui__vue_hotspot_buttons" v-if="config && config.editable">
    <button class="ui__vue_hotspot_save">Save</button>
    <button class="ui__vue_hotspot_remove">Remove</button>
  </div>
</div>
</template>

<style>
.ui__vue_hotspot {
  width: auto;
  height: auto;
  position: relative;
}
/* CSS class for hotspot data points */
.ui__vue_hotspot_hotspot {
  height: 20px;
  width: 20px;
  position: absolute;
  background: #1ABC9C;
  border-radius: 50%;
  cursor: pointer;
  z-index: 200;
  margin-left: -10px;
  margin-top: -10px;
}
.ui__vue_hotspot_hotspot > div {
  background: rgba(26, 188, 156, 0.4);
  width: 140px;
  height: 94px;
  margin: -94px -60px;
  border-radius: 4px;
  overflow: hidden;
  font-size: 10px;
  display: none;
}
.ui__vue_hotspot_hotspot.active > div {
  display: block; /* Required */
}
.ui__vue_hotspot_hotspot > div > .ui__vue_hotspot_title {
  background: rgba(255, 255, 255, 0.4);
  height: 20px;
  font-weight: bold;
  padding: 4px 10px;
}
.ui__vue_hotspot_hotspot > div > .ui__vue_hotspot_message {
  background: rgba(255, 255, 255, 0.4);
  margin-top: 2px;
  padding: 4px 10px;
  height: 72px;
  overflow-y: auto;
}
.ui__vue_hotspot_buttons {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 1em;
  border-radius: 0 0 1em 1em;
}
/* Action button CSS classes used in `editable:true` mode */
.ui__vue_hotspot_buttons > .ui__vue_hotspot_save,
.ui__vue_hotspot_buttons > .ui__vue_hotspot_remove {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: .1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  margin-left: 10px;
}
.ui__vue_hotspot_buttons > .ui__vue_hotspot_save {
  color: #fff;
  background-color: #67c23a;
  border-color: #67c23a;
}
.ui__vue_hotspot_buttons > .ui__vue_hotspot_save:hover {
  background: #85ce61;
  border-color: #85ce61;
  color: #fff;
}
.ui__vue_hotspot_buttons > .ui__vue_hotspot_remove {
  color: #fff;
  background-color: #f56c6c;
  border-color: #f56c6c;
}
.ui__vue_hotspot_buttons > .ui__vue_hotspot_remove:hover {
  color: #fff;
  background: #f78989;
  border-color: #f78989;
}

/* CSS class for hotspot data points that are yet to be saved */
.ui__vue_hotspot_unsaved {
  background: #409EFF;
}

/* CSS class for overlay used in `editable:true` mode */
span.ui__vue_hotspot_overlay {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.4);
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

<script>
export default {
  props: {
    initOptions: Object
  },
  data () {
    return {
      defaultOptions: {
        // Object to hold the hotspot data points
        data: [],

        // Default image placeholder
        image: 'https://via.placeholder.com/600x500',

        // Specify editable in which the plugin is to be used
        // `true`: Allows to create hotspot from UI
        // `false`: Display hotspots from `data` object
        editable: true,

        // Event on which the hotspot data point will show up
        // allowed values: `click`, `hover`, `none`
        interactivity: 'hover',

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
      config: null
    }
  },
  methods: {
    init () {
      // Add resize listener
      window.addEventListener('resize', this.resizeHotspot)
    },
    getHotspotPosition (hotspot) {
      let element = this.$el.querySelector('.ui__vue_hotspot')
      let tagElement = element.querySelector(`.ui__vue_hotspot_background_image`)

      let height = tagElement.clientHeight
      let width = tagElement.clientWidth

      return `
        top: ${(hotspot.y * height / 100) + (tagElement.offsetTop - element.clientTop)}px;
        left: ${(hotspot.x * width / 100) + (tagElement.offsetLeft - element.clientLeft)}px;
      `
    },
    resizeHotspot () {
      let element = this.$el.querySelector('.ui__vue_hotspot')
      let overlay = element.querySelector('.ui__vue_hotspot_overlay')
      if (!overlay) return
      let image = element.querySelector(`.ui__vue_hotspot_background_image`)
      overlay.style.height = `${(image.clientHeight / element.clientHeight) * 100}%`
      overlay.style.width = `${(image.clientWidth / element.clientWidth) * 100}%`
      overlay.style.left = `${image.offsetLeft - element.clientLeft}px`
      overlay.style.top = `${image.offsetTop - element.clientTop}px`
    },
    setOptions () {
      this.config = Object.assign({}, this.defaultOptions, this.initOptions)
    },
    successLoadImg (e) {
      // Resize after image loaded
      if (event.target.complete === true) {
        this.resizeHotspot()
      }
    },
    addHotspot (e) {
      let overlay = this.$el.querySelector('.ui__vue_hotspot_overlay')
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
    toggleClass (i) {
      let hotspot = this.$el.querySelector(`.ui__vue_hotspot_hotspot_${i}`)
      hotspot.classList.toggle('active')
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
    }
  }
}
</script>
