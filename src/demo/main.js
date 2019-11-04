import Vue from 'vue'
import Demo from './Demo.vue'
import VueCompositionApi from '@vue/composition-api'

Vue.use(VueCompositionApi)
Vue.config.productionTip = false

new Vue({
  render: h => h(Demo)
}).$mount('#app')
