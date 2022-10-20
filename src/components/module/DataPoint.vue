<template>
  <div class="ui__vue_hotspot_hotspot"
    :style="`top: ${positionTop}; left: ${positionLeft}; background-color: ${hotspotColor};`"
    :class="isActive || interactivity === 'none' ? 'active' : ''"
    @mouseenter="interactivity === 'hover' ? isActive=true : null"
    @mouseleave="interactivity === 'hover' ? isActive=false : null"
    @click="interactivity === 'click' ? toggleActive() : null">
    <!-- message box -->
    <div :style="`color:${textColor}`">
      <div
        class="ui__vue_hotspot_title"
        :style="`
          background: ${messageBoxColor};
          opacity: ${opacity}`"
      >
        {{ hotspot['Title'] }}
      </div>
      <div
        class="ui__vue_hotspot_message"
        :style="`
          background: ${messageBoxColor};
          opacity: ${opacity}`"
      >
        {{ hotspot['Message'] }}
      </div>
    </div>
  </div>
</template>

<script>
import { throttle } from '../utils/common.js'
import {
  defineComponent,
  ref,
  reactive,
  toRefs,
  computed,
  watch
} from 'vue-demi'

export default defineComponent({
  props: {
    hotspot: Object,
    config: Object,
    imageLoaded: Boolean,
    vueHotspotBackgroundImage: HTMLImageElement,
    vueHotspot: HTMLDivElement
  },
  onMounted () {
    window.addEventListener('resize', throttle(this.getHotspotStyle, 50))
  },
  onUnmounted () {
    window.removeEventListener('resize', throttle(this.getHotspotStyle, 50))
  },
  setup (props, { emit }) {
    const isActive = ref(false)
    const conf = reactive({
      positionTop: 0,
      positionLeft: 0,
      hotspotColor: computed(() => props.config && props.config.hotspotColor),
      interactivity: computed(() => props.config && props.config.interactivity),
      textColor: computed(() => props.config && props.config.textColor),
      messageBoxColor: computed(() => props.config && props.config.messageBoxColor),
      opacity: computed(() => props.config && props.config.opacity)
    })

    watch(() => props.imageLoaded, (loaded, prev) => {
      if (loaded) {
        getHotspotStyle()
      }
    })

    function getHotspotStyle () {
      conf.positionTop = `${(props.hotspot.y * props.vueHotspotBackgroundImage.clientHeight / 100) + (props.vueHotspotBackgroundImage.offsetTop - props.vueHotspot.clientTop)}px;`
      conf.positionLeft = `${(props.hotspot.x * props.vueHotspotBackgroundImage.clientWidth / 100) + (props.vueHotspotBackgroundImage.offsetLeft - props.vueHotspot.clientLeft)}px;`
    }

    function toggleActive () {
      isActive.value = !isActive.value
    }

    return {
      // data
      isActive,
      ...toRefs(conf),
      // methods
      getHotspotStyle,
      toggleActive
    }
  }
})
</script>

<style scoped>
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
</style>
