<template>
  <div class="toggle_button">
    <p class="label">{{ label }}: &nbsp;</p>
    <p>
      <label class="switch">
        <input
          type="checkbox"
          @change="handleToggleChange"
          :checked="hotspotConfig.editable"
        />
        <span class="slider round"></span>
      </label>
    </p>
  </div>
</template>

<style>
.toggle_button {
  display: flex;
  justify-content: center;
}
.label {
  font-size: 1.3em;
}
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
</style>

<script>
export default {
  props: {
    label: String,
    hotspotConfig: Object
  },
  methods: {
    handleToggleChange () {
      this.$emit('change-editable', this.hotspotConfig)
    }
  }
}
</script>
