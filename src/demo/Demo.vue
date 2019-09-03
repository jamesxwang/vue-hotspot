<template>
  <main>
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1><a href="https://github.com/cn-wx/vue-hotspot">Vue-Hotspot</a></h1>
    <p class="desc">Hotspot component for Vue.js.</p>
    <section>
      <h1>
        <span style="width:3em;height:3em;border:1px solid #333;">
          Here is the hotspot component
        </span>
      </h1>
    </section>

    <footer>
      <!-- eslint-disable-next-line -->
      <a href="//github.com/cn-wx">@James Wang</a>|<a href="#">MIT License</a>|<a href="//github.com/cn-wx/vue-hotspot">View on GitHub</a>
    </footer>
  </main>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  components: {
    // HelloWorld
  }
};
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
</style>
