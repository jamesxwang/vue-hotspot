<template>
  <main>
    <img style="max-width: 80%" alt="Vue logo" src="./assets/logo.png" />
    <h1><a href="https://github.com/cn-wx/vue-hotspot">Vue-Hotspot</a></h1>
    <p class="desc">Hotspot component for Vue.js.</p>

    <section v-for="(item, i) in hotspots" :key="i">
      <div class="container">
        <!-- Title -->
        <div class="text mb-sm">
          <span class="bold">Example {{ i + 1 }}</span>
        </div>
        <!-- Main -->
        <v-hotspot
          :init-options="item"
          @save-data="saveData"
          @after-delete="afterDelete" />
        <div class="text">
          Editable: {{ item.editable }} | interactivity: {{ item.interactivity }}
        </div>
        <!-- Button -->
        <toggle
          :label="'Change Editable'"
          :hotspot-config="item"
          @change-editable="changeEditable" />
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
    'v-hotspot': VueHotspot,
    toggle: Toggle
  },
  data () {
    return {
      hotspots: [
        {
          image: 'https://about.unimelb.edu.au/__data/assets/image/0022/92911/varieties/large.jpg',
          editable: true,
          interactivity: 'hover'
        },
        {
          image: 'https://about.unimelb.edu.au/__data/assets/image/0013/10840/varieties/large.jpg',
          editable: false,
          interactivity: 'click'
        },
        {
          image: 'https://about.unimelb.edu.au/__data/assets/image/0021/15582/varieties/banner.jpg',
          editable: false,
          interactivity: 'hover',
          data: [
            { Message: 'A prepopulated hotspot with custom color', Title: 'Vue Hotspot 1', x: 33.3973, y: 58.3333 },
            { Message: 'Another prepopulated hotspot with custom color', Title: 'Vue Hotspot 2', x: 53.3973, y: 78.3333 },
            { Message: 'Another prepopulated hotspot with custom color', Title: 'Vue Hotspot 3', x: 73.3973, y: 28.3333 }
          ],
          hotspotColor: '#85ce61',
          messageBoxColor: '#409eff',
          textColor: '#333'
        },
        {
          image: 'https://about.unimelb.edu.au/__data/assets/image/0025/11599/varieties/medium.jpg',
          editable: false,
          interactivity: 'none',
          data: [
            { Message: 'A prepopulated hotspot with interactivity: none', Title: 'Vue Hotspot 1', x: 33.3973, y: 68.3333 },
            { Message: 'Another prepopulated hotspot with interactivity: none', Title: 'Vue Hotspot 2', x: 73.3973, y: 38.3333 }
          ]
        }
      ]
    }
  },
  methods: {
    changeEditable (conf) {
      if (!conf) return
      conf.editable = !conf.editable
    },
    saveData (data) {
      // A list of hotspots
      console.log(data)
    },
    afterDelete () {
      // Do something after delete
      console.log('Do something after delete ...')
    }
  }
}
</script>

<style lang="less">
@small: 1em;
@medium: 2em;
@gray: #666666;

.no-margin{margin: 0}
.mt-sm {margin-top: @small}.mb-sm {margin-bottom: @small}.ml-sm {margin-left: @small}.mr-sm {margin-right: @small}
.mt-m{margin-top: @medium}.mb-m{margin-bottom: @medium}.ml-m{margin-left: @medium}.mr-m{margin-right: @medium}

.no-padding{padding: 0}
.pt-sm {padding-top: @small}.pb-sm {padding-bottom: @small}.pl-sm {padding-left: @small}.pr-sm {padding-right: @small}
.pt-m {padding-top: @medium}.pb-m {padding-bottom: @medium}.pl-m {padding-left: @medium}.pr-m {padding-right: @medium}

html {
  scroll-behavior: smooth;
}
body {
  margin: 0;
  padding: 3em 0 0;
  font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
  color: @gray;
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
  // min-width: calc(40vw + 4em);
  width: 50vw;
  .text {
    &.mb-sm {
      margin-bottom: 1em;
    }
    font-size: 1.2em;
    .bold {
      font-weight: bold;
    }
    .left {
      float: left;
    }
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

@media screen {
  @media (max-width: 980px) {
    .container {
      width: 100vw;
      margin: @small auto;
      padding: 0;
      border: none;
      border-radius: 0;
      box-shadow: none;
    }
  }
}
</style>
