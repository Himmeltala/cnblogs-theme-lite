<script setup lang="ts">
defineProps({
  padding: {
    default: "10px 20px"
  },
  width: {
    default: "100%"
  },
  height: {
    default: "100%"
  },
  margin: {
    default: "0"
  }
});
</script>

<template>
  <div class="card" :style="{ padding: padding, width: width, height: height, margin: margin }">
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
