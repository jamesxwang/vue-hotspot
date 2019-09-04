<template>
  <div>
    <button @click="handleCollapse" :class="{active: isActive}" class="collapsible">Show Code</button>
    <div class="content">
      <pre>
        {{ code }}
      </pre>
    </div>
  </div>
</template>

<style scoped>
.collapsible {
  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  margin: 0;
  margin-top: 1em;
  border: none;
  text-align: center;
  outline: none;
  font-size: 15px;
}
.collapsible:after {
  content: '\02795';
  font-size: 13px;
  color: white;
  float: right;
  margin-left: 5px;
}

.active:after {
  content: "\2796";
}
.collapsible.active + .content {
  display: block;
}
.active, .collapsible:hover {
  background-color: #ccc;
}
.content {
  padding: 0 18px;
  display: none;
  overflow: hidden;
  background-color: #f1f1f1;
  text-align: left;
  transition: max-height 0.2s ease-out;
}
</style>

<script>
export default {
  name: 'ShowCode',
  props: {
    code: String
  },
  data () {
    return {
      isActive: false
    }
  },
  methods: {
    handleCollapse () {
      this.isActive = !this.isActive
    }
  }
}
</script>
