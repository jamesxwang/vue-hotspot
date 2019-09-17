import { mount } from '@vue/test-utils'
import VueHotspot from '@/components/VueHotspot.vue'

describe('VueHotspot.vue', () => {
  const option = {
    data: [],
    image: '',
    editable: true,
    interactivity: 'click'
  }

  let wrapper, vm
  beforeEach(() => {
    wrapper = mount(VueHotspot, {
      attachToDocument: true
    })
    vm = wrapper.vm
    wrapper.setProps({ initOptions: option })
  })

  it('set config correctly when props.initOptions passed', () => {
    const config = { ...vm.defaultOptions, ...option }
    expect(vm.config).not.toBeNull()
    expect(vm.config).toEqual(config)
  })

  it('img module', () => {
    const opt = {
      image: 'https://via.placeholder.com/600x500'
    }

    wrapper.setProps({ initOptions: opt })
    expect(vm.config.image).toEqual(opt.image)

    const imageTag = wrapper.find('.ui__vue_hotspot_background_image')
    expect(imageTag.exists()).toEqual(true)
  })

  it('save button', () => {
    const opt = {
      data: ['a', 'b']
    }
    wrapper.setProps({ initOptions: opt })
    expect(vm.config.data).toEqual(opt.data)

    const saveButton = wrapper.find('.ui__vue_hotspot_save')
    expect(saveButton.exists()).toEqual(true)

    saveButton.trigger('click') // vm.saveAllHotspots()
    console.log(wrapper.emitted())
  })

  it('remove button', () => {
    const opt = {
      data: ['a', 'b']
    }
    wrapper.setProps({ initOptions: opt })
    expect(vm.config.data).toEqual(opt.data)

    const removeButton = wrapper.find('.ui__vue_hotspot_remove')
    expect(removeButton.exists()).toEqual(true)

    removeButton.trigger('click')
    expect(vm.config.data).toEqual([])
  })

  it('clicking overlay', () => {
    window.prompt = jest.fn()
    const overlay = wrapper.find('.ui__vue_hotspot_overlay')
    expect(overlay.exists()).toBe(true)
    overlay.trigger('click')
  })

  // it('trigger class', () => {
  //   const opt = {
  //     interactivity: 'click',
  //     data: [
  //       {"x":1,"y":2,"Title":"a","Message":"aa"},
  //       {"x":2,"y":3,"Title":"b","Message":"bb"}
  //     ]
  //   }
  //   console.log(wrapper.html())

  //   wrapper.setProps({ initOptions: opt })
  //   console.log(wrapper.html())
  //   expect(vm.config.data).toEqual(opt.data)
  //   expect(vm.config.interactivity).toEqual(opt.interactivity)

  //   vm.$nextTick(() => {
  //     const hotspots = wrapper.findAll('.ui__vue_hotspot_hotspot')
  //     expect(hotspots.exists()).toBe(true)
  //     expect(hotspots.html()).toMatchSnapshot()
  //   })

  //   hotspots.forEach(hotspot => {
  //     hotspot.trigger('click')
  //   })
  // })
})
