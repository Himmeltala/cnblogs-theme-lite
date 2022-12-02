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
  }
});
</script>

<template>
  <div class="card" :style="{ padding: padding, width: width, height: height }">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.card {
  box-sizing: border-box;
  color: #a7a7a7;
  background-color: #252525;
  border-radius: 6px;
}
</style>
