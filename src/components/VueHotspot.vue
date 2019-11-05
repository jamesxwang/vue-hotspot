<template>
  <div class="ui__vue_hotspot" ref="vueHotspot" v-if="config">
    <!-- image -->
    <img class="ui__vue_hotspot_background_image"
      ref="vueHotspotBackgroundImage"
      :src="config.image"
      @load="successLoadImg"
      alt="Hotspot Image">
    <!-- overlay -->
    <span class="ui__vue_hotspot_overlay"
      ref="vueHotspotOverlay"
      :style="`height: ${overlayHeight}; width: ${overlayWidth}; left: ${overlayLeft}; top: ${overlayTop};`"
      v-if="config.editable"
      @click.stop.prevent="addHotspot">
      <p>Please Click The Image To Add Hotspots.</p>
    </span>
    <!-- hotspot -->
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
    <!-- ControlBox -->
    <ControlBox
      :config="config"
      @save-data="saveAllHotspots"
      @after-delete="removeAllHotspots"
    />
  </div>
</template>

<script>
import { ref, reactive, toRefs, onMounted, onUnmounted, watch } from '@vue/composition-api'
import ControlBox from './module/ControlBox'
export default {
  props: {
    initOptions: Object
  },
  setup (props, { emit }) {
    const vueHotspot = ref(null)
    const vueHotspotOverlay = ref(null)
    const vueHotspotBackgroundImage = ref(null)

    const defaultOptions = reactive({
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
    })
    const config = ref(null)
    const imageLoaded = ref(false)
    const frameSize = reactive({
      overlayHeight: 0,
      overlayWidth: 0,
      overlayLeft: 0,
      overlayTop: 0
    })

    watch(imageLoaded, (loaded, prev) => {
      if (loaded) {
        resizeOverlay()
      }
    })

    watch(() => props.initOptions, (initOptions, prev) => {
      // overwrite defaults with initOptions
      config.value = { ...deepCopy(defaultOptions), ...initOptions }
    }, {
      deep: true
    })

    onMounted(() => {
      window.addEventListener('resize', resizeOverlay)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', resizeOverlay)
    })

    function resizeOverlay () {
      frameSize.overlayHeight = `${(vueHotspotBackgroundImage.value.clientHeight / vueHotspot.value.clientHeight) * 100}%`
      frameSize.overlayWidth = `${(vueHotspotBackgroundImage.value.clientWidth / vueHotspot.value.clientWidth) * 100}%`
      frameSize.overlayLeft = `${vueHotspotBackgroundImage.value.offsetLeft - vueHotspot.value.clientLeft}px`
      frameSize.overlayTop = `${vueHotspotBackgroundImage.value.offsetTop - vueHotspot.value.clientTop}px`
    }

    function deepCopy (obj) {
      return JSON.parse(JSON.stringify(obj))
    }

    function successLoadImg (event) {
      if (event.target.complete === true) {
        imageLoaded.value = true
      }
    }

    function saveAllHotspots () {
      emit('save-data', config.value.data)
    }

    function removeAllHotspots () {
      emit('after-delete')
    }

    return {
      // data
      defaultOptions,
      config,
      imageLoaded,
      ...toRefs(frameSize),
      // dom
      vueHotspot,
      vueHotspotOverlay,
      vueHotspotBackgroundImage,
      // methods
      deepCopy,
      successLoadImg,
      saveAllHotspots,
      removeAllHotspots,
      resizeOverlay
    }
  },
  components: {
    ControlBox
  },
  methods: {
    getHotspotPosition (hotspot) {
      if (!this.imageLoaded) return ''
      let element = this.$refs['vueHotspot']
      let tagElement = this.$refs['vueHotspotBackgroundImage']

      let height = tagElement.clientHeight
      let width = tagElement.clientWidth

      return `
        top: ${(hotspot.y * height / 100) + (tagElement.offsetTop - element.clientTop)}px;
        left: ${(hotspot.x * width / 100) + (tagElement.offsetLeft - element.clientLeft)}px;
        background-color: ${this.config.hotspotColor}
      `
    },
    addHotspot (e) {
      let overlay = this.$refs['vueHotspotOverlay']
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
      let hotspot = this.$refs[`vue_hotspot_hotspot_${i}`]
      hotspot[0].classList.toggle('active')
    }
  }
}
</script>

<style scoped>
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
