<template>
  <figure class="ui__vue_hotspot" v-if="config">
    <img class="ui__vue_hotspot_background_image" :src="config.image" @load="successLoadImg" alt="Hotspot Image" >
    <div class="editable" v-if="config.editable">
      <span class="ui__vue_hotspot_overlay">
        <p>Please Click The Image To Add Hotspots.</p>
      </span>
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
const INIT_TRIGGERS = ['initOptions', 'autoresize']

export default {
  props: {
    initOptions: Object,
    autoresize: Boolean
  },
  data () {
    return {
      defaultOptions: {
        // Object to hold the hotspot data points
        data: [],

        // Default image placeholder
        image: 'https://via.placeholder.com/600',

        // Element tag upon which hotspot is (to be) build
        tag: 'img',

        // Specify editable in which the plugin is to be used
        // `true`: Allows to create hotspot from UI
        // `false`: Display hotspots from `data` object
        editable: true,

        // HTML5 LocalStorage variable where hotspot data points are (will be) stored
        LS_Variable: 'localstorage_vue_hotspot',

        // Event on which the hotspot data point will show up
        // allowed values: `click`, `hover`, `none`
        interactivity: 'hover',

        // Enable `ajax` to read data directly from server
        ajax: false,
        ajaxOptions: { url: '' },

        listenOnResize: true,

        // Hotspot schema
        schema: {
          title: 'Vue Hotspot',
          message: 'This is a Vue Hotspot Component which lets you create hotspot to any HTML element.'
        }
      },
      config: null
    }
  },
  methods: {
    init () {
      console.log('✧ Init! ✧')
      // Add resize listener
      window.addEventListener('resize', this.resizeHotspot)
    },
    resizeHotspot () {
      let tagElement = document.querySelector(`.ui__vue_hotspot > ${this.config.tag}`)
      let overlay = document.querySelector('.ui__vue_hotspot_overlay')

      overlay.style.height = tagElement.offsetHeight + 'px'
      overlay.style.width = tagElement.offsetWidth + 'px'
      overlay.style.top = tagElement.offsetTop + 'px'
      overlay.style.left = tagElement.offsetLeft + 'px'
    },
    setOptions () {
      this.config = Object.assign({}, this.defaultOptions, this.initOptions)
    },
    refresh () {
      this.destroy()
      this.init()
    },
    successLoadImg (e) {
      // Image Loaded
      if (event.target.complete === true) {
        this.resizeHotspot()
      }
    }
  },
  created () {
    INIT_TRIGGERS.forEach(prop => {
      this.$watch(prop, () => {
        console.log('↺ Refresh!')
        this.refresh()
      }, { deep: true })
    })
  },
  mounted () {
    // set options if `initOptions` is already provided
    // Overwriting defaults with initOptions
    if (this.initOptions) {
      this.setOptions()
      this.init()
    }
  },
  watch: {
    imgLoaded: function (val) {

    }
  }
}
</script>
