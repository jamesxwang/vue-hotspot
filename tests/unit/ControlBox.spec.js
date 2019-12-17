import { createLocalVue, mount } from '@vue/test-utils'
import ControlBox from '@/components/module/ControlBox.vue'
import VueCompositionApi from '@vue/composition-api'

describe('ControlBox.vue', () => {
  const localVue = createLocalVue()
  localVue.use(VueCompositionApi)

  const propsConfig = {
    editable: true,
    data: []
  }
  let wrapper, vm

  beforeEach(() => {
    wrapper = mount(ControlBox, {
      localVue,
      propsData: {
        config: propsConfig
      },
      attachToDocument: true
    })
    vm = wrapper.vm
  })

  it('save data function', () => {
    const saveButton = wrapper.find('.ui__vue_hotspot_save')
    expect(saveButton.exists()).toEqual(true)

    saveButton.trigger('click')
    console.log(wrapper.emitted())
  })

  it('remove all datapoints', () => {
    const removeButton = wrapper.find('.ui__vue_hotspot_remove')
    expect(removeButton.exists()).toEqual(true)

    removeButton.trigger('click')
    expect(vm.config.data = [])
    console.log(wrapper.emitted())
  })
})
