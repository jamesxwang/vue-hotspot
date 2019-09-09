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
    // const event = {
    //   target: {
    //     complete: true
    //   }
    // }

    // const successLoadImgStub = sinon.stub()
    // const resizeHotspotStub = sinon.stub()
    // wrapper.setMethods({
    //   successLoadImg: successLoadImgStub,
    //   resizeHotspot: resizeHotspotStub
    // })

    wrapper.setProps({ initOptions: opt })
    expect(vm.config.image).toEqual(opt.image)

    const imageTag = wrapper.find('.ui__vue_hotspot_background_image')
    expect(imageTag.exists()).toEqual(true)

    // expect(successLoadImgStub.calledOnceWith(event)).toBe(true)
    // expect(resizeHotspotStub.called).toBe(true)
    // done()
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
})
