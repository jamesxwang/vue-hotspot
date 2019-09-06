<template>
  <main>
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1><a href="https://github.com/cn-wx/vue-hotspot">Vue-Hotspot</a></h1>
    <p class="desc">Hotspot component for Vue.js.</p>
    <section>
      <div class="container">
        <div class="text">Editable: {{ hotspotConfig1.editable }} | interactivity: Click</div>
        <hotspot
          :initOptions="hotspotConfig1" />
        <toggle
          :label="'Change Editable'"
          :hotspotConfig="hotspotConfig1"
          @change-editable="changeEditable" />
        <!-- <show-code :code="hotspotCode1"/> -->
      </div>
    </section>
    <section>
      <div class="container">
        <div class="text">Editable: {{ hotspotConfig2.editable }} | interactivity: Hover</div>
        <hotspot
          :initOptions="hotspotConfig2" />
        <toggle
          :label="'Change Editable'"
          :hotspotConfig="hotspotConfig2"
          @change-editable="changeEditable" />
        <!-- <show-code :code="hotspotCode1"/> -->
      </div>
    </section>
    <footer>
      <!-- eslint-disable-next-line -->
      <a href="//github.com/cn-wx">@James Wang</a>|<a href="//github.com/cn-wx/vue-hotspot/blob/master/LICENSE">MIT License</a>|<a href="//github.com/cn-wx/vue-hotspot">View on GitHub</a>
    </footer>
  </main>
</template>

<script>
import VueHotspot from '../components/VueHotspot.vue'
import Toggle from './components/Toggle.vue'

export default {
  components: {
    hotspot: VueHotspot,
    toggle: Toggle
  },
  data () {
    return {
      hotspotConfig1: {
        image: 'https://about.unimelb.edu.au/__data/assets/image/0022/92911/varieties/large.jpg',
        editable: true,
        interactivity: 'click'
      },
      hotspotConfig2: {
        image: 'https://about.unimelb.edu.au/__data/assets/image/0013/10840/varieties/large.jpg',
        editable: false,
        interactivity: 'hover'
      }
    }
  },
  methods: {
    changeEditable (conf) {
      if (!conf) return
      conf.editable = !conf.editable
    }
  }
}
</script>

<style lang="less">
html {
  scroll-behavior: smooth;
}
body {
  margin: 0;
  padding: 3em 0 0;
  font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
  color: #666;
  text-align: center;
}
a {
  color: inherit;
  text-decoration: none;
}
h1 {
  margin-bottom: 1em;
  font-family: Dosis, "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
}
h1,
h2 {
  color: #2c3e50;
  font-weight: 300;
}
h2 {
  margin-top: 2em;
  padding-top: 1em;
  font-size: 1.2em;
}
button {
  margin-left: 1em;
  vertical-align: middle;
}
.desc {
  margin-bottom: 3em;
  color: #7f8c8d;
}
.container {
  display: inline-block;
  position: relative;
  margin: 2em auto;
  border: 1px solid rgba(0,0,0,.1);
  border-radius: 8px;
  box-shadow: 0 0 45px rgba(0,0,0,.2);
  padding: 1.5em 2em;
  min-width: calc(40vw + 4em);
  .text {
    margin-bottom: 1em;
    font-size: 1.2em;
  }
}
footer {
  margin: 5em 0 3em;
  font-size: 0.5em;
  vertical-align: middle;
  a {
    display: inline-block;
    margin: 0 5px;
    padding: 3px 0 6px;
    color: #7f8c8d;
    font-size: 2em;
    text-decoration: none;
  }
  a:hover {
    padding-bottom: 3px;
    border-bottom: 3px solid #42b983;
  }
}

// @media screen {
//   @media (max-width: 980px) {
//     .container {
//       width: 100vw;
//       margin: 1em auto;
//       padding: 0 1em;
//       border: none;
//       border-radius: 0;
//       box-shadow: none;
//     }
//   }
// }
</style>
