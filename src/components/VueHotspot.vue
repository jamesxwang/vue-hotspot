<template>
  <figure class="ui__vue_hotspot" v-if="config">
    <img class="ui__vue_hotspot_background_image" :src="config.image" @load="successLoadImg" alt="Hotspot Image" >
    <div class="editable" v-if="config.editable">
      <span class="ui__vue_hotspot_overlay" @click.stop.prevent="addHotspot">
        <p>Please Click The Image To Add Hotspots.</p>
      </span>
      <div v-for="(hotspot, i) in config.data" :key="i"
        class="ui__vue_hotspot_hotspot"
        :style="getHotspotStyle(hotspot)">
        <div class="ui__vue_hotspot_title">{{ hotspot.title }}</div>
        <div class="ui__vue_hotspot_message">{{ hotspot.message }}</div>
      </div>
      <div class="ui__vue_hotspot_buttons">
        <button class="ui__vue_hotspot_save">Save</button>
        <button class="ui__vue_hotspot_remove">Remove</button>
        <button class="ui__vue_hotspot_send">Send</button>
      </div>
    </div>
  </figure>
</template>

<style>
.ui__vue_hotspot {
  width: auto;
  height: auto;
}

.ui__vue_hotspot_background_image {

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
.ui__vue_hotspot_hotspot:hover > div {
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

/* CSS class which is added when hotspot is to hidden */
.ui__vue_hotspot_hidden {
  display: none !important;
  visibility: hidden !important;
}
.ui__vue_hotspot_buttons {
  border: 1px solid #000;
  padding: 1em;
  border-radius: 1em;
}
/* Action button CSS classes used in `editable:true` mode */
.ui__vue_hotspot_buttons > .ui__vue_hotspot_save,
.ui__vue_hotspot_buttons > .ui__vue_hotspot_remove,
.ui__vue_hotspot_buttons > .ui__vue_hotspot_send {
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
.ui__vue_hotspot_buttons > .ui__vue_hotspot_remove {
  color: #fff;
  background-color: #f56c6c;
  border-color: #f56c6c;
}
.ui__vue_hotspot_buttons > .ui__vue_hotspot_send{
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
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
  /* width: 100%; */
  /* height: 100%; */
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

        listenOnResize: true,

        // Hotspot schema
        schema: [
          {
            'property': 'Title',
            'default': 'jQuery Hotspot'
          },
          {
            'property': 'Message',
            'default': 'This is a Vue Hotspot Component which lets you create hotspot to any HTML element. '
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
    getHotspotStyle (hotspot) {
      // TODO - FIX Position
      return `top: ${hotspot.y / 100}px; left: ${hotspot.x / 100}px`
    },
    resizeHotspot () {
      let tagElement = document.querySelector(`.ui__vue_hotspot > img`)
      let overlay = document.querySelector('.ui__vue_hotspot_overlay')

      overlay.style.height = tagElement.offsetHeight + 'px'
      overlay.style.width = tagElement.offsetWidth + 'px'
      overlay.style.top = tagElement.offsetTop + 'px'
      overlay.style.left = tagElement.offsetLeft + 'px'
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
      console.log('clicked!')
      let overlay = document.querySelector('.ui__vue_hotspot_overlay')
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
    }
  },
  mounted () {
    // set options if `initOptions` is already provided
    if (this.initOptions) {
      // overwrite defaults with initOptions
      this.setOptions()
      this.init()
    }
  }
}
</script>
