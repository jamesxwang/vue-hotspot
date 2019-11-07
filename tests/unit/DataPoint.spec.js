import { createLocalVue, mount } from '@vue/test-utils'
import DataPoint from '@/components/module/DataPoint.vue'
import VueCompositionApi from '@vue/composition-api'

describe('DataPoint.vue', () => {
  const localVue = createLocalVue()
  localVue.use(VueCompositionApi)

  const propsHotspot = { Message: 'test', Title: 'test', x: 12, y: 34 }
  const propsConfig = {
    hotspotColor: 'blue',
    interactivity: 'hover',
    textColor: 'black',
    messageBoxColor: 'white',
    opacity: 0.5
  }
  let wrapper, vm

  const image = new Image()
  const div = document.createElement('div')

  beforeEach(() => {
    wrapper = mount(DataPoint, {
      localVue,
      propsData: {
        hotspot: propsHotspot,
        config: propsConfig,
        imageLoaded: true,
        vueHotspotBackgroundImage: image,
        vueHotspot: div
      },
      attachToDocument: true
    })
    vm = wrapper.vm
  })

  it('test', () => {
    console.log('help wanted', vm)
  })
})
