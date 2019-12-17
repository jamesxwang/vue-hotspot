<template>
  <div class="ui__vue_hotspot_buttons_box">
    <div class="ui__vue_hotspot_buttons"
        :class="isEditable ? 'active' : ''">
      <button class="ui__vue_hotspot_save" @click="saveAllHotspots">Save</button>
      <button class="ui__vue_hotspot_remove" @click="removeAllHotspots">Remove</button>
    </div>
  </div>
</template>

<script>
import { createComponent, computed } from '@vue/composition-api'
export default createComponent({
  props: {
    config: Object
  },
  setup (props, { emit }) {
    const isEditable = computed(() => props.config && props.config.editable)

    function saveAllHotspots () {
      emit('save-data', props.config.data)
    }

    function removeAllHotspots () {
      props.config.data = []
      emit('after-delete')
    }

    return {
      isEditable,
      saveAllHotspots,
      removeAllHotspots
    }
  }
})
</script>

<style scoped>
/* To set fixed height for buttons area pops up */
.ui__vue_hotspot_buttons_box {
  height: 5em;
}

.ui__vue_hotspot_buttons {
  transition: padding 0.4s ease-out, opacity 0.2s ease-in;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 0 0 1em 1em;
  padding: 0em;
  opacity: 0;
}
.ui__vue_hotspot_buttons.active {
  padding: 1em;
  opacity: 1;
}
/* Action button CSS classes used in `editable:true` mode */
.ui__vue_hotspot_buttons > .ui__vue_hotspot_save,
.ui__vue_hotspot_buttons > .ui__vue_hotspot_remove {
  width: 8em;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: .1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  margin-left: 10px;
}
.ui__vue_hotspot_buttons > .ui__vue_hotspot_save {
  color: #fff;
  background-color: #67c23a;
  border-color: #67c23a;
}
.ui__vue_hotspot_buttons > .ui__vue_hotspot_save:hover {
  background: #85ce61;
  border-color: #85ce61;
  color: #fff;
}
.ui__vue_hotspot_buttons > .ui__vue_hotspot_remove {
  color: #fff;
  background-color: #f56c6c;
  border-color: #f56c6c;
}
.ui__vue_hotspot_buttons > .ui__vue_hotspot_remove:hover {
  color: #fff;
  background: #f78989;
  border-color: #f78989;
}
</style>
