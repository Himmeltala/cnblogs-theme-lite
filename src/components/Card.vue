<script setup lang="ts">
defineProps({
  padding: {
    default: "10px 20px"
  },
  width: {
    default: ""
  },
  height: {
    default: "100%"
  },
  margin: {
    default: ""
  }
});
</script>

<template>
  <div class="card"
       :style="{ padding: padding, 'width': width ? width : '', height: height, 'margin': margin ? margin : '' }">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.card {
  box-sizing: border-box;
  background-color: #252525;
  border-radius: 6px;
}
</style>
