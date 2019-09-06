<template>
  <main>
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1><a href="https://github.com/cn-wx/vue-hotspot">Vue-Hotspot</a></h1>
    <p class="desc">Hotspot component for Vue.js.</p>
    <section>
      <div class="container">
        <div class="text">Editable: {{ hotspotConfig1.editable }}</div>
        <hotspot
          :initOptions="hotspotConfig1" />

        <div class="toggle_button" style="display:flex;justify-content:center;">
          <p style="font-size:1.3em;">Change Editable: &nbsp;</p>
          <p>
            <label class="switch">
              <input type="checkbox" @change="changeEditable(hotspotConfig1)" :checked="hotspotConfig1.editable">
              <span class="slider round"></span>
            </label>
          </p>

        </div>

        <!-- <show-code :code="hotspotCode1"/> -->
      </div>
    </section>
    <!-- <section>
      <div class="container">
        <div class="text">Editable: false</div>
        <hotspot
          :initOptions="hotspotConfig2" />
        <show-code
          :code="hotspotCode2"/>
      </div>
    </section> -->
    <footer>
      <!-- eslint-disable-next-line -->
      <a href="//github.com/cn-wx">@James Wang</a>|<a href="//github.com/cn-wx/vue-hotspot/blob/master/LICENSE">MIT License</a>|<a href="//github.com/cn-wx/vue-hotspot">View on GitHub</a>
    </footer>
  </main>
</template>

<script>
import VueHotspot from '../components/VueHotspot.vue'
// import ShowCode from './components/ShowCode.vue'
export default {
  components: {
    hotspot: VueHotspot
    // ShowCode
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
        editable: false
      },
      hotspotCode1: 'test 1',
      hotspotCode2: 'test 2'
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

// toggle button
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
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
