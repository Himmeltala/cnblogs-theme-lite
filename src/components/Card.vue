<script setup lang="ts">
defineProps({
  padding: {
    default: "10px 20px"
  }
});
</script>

<template>
  <div class="card" :style="{ padding: padding }">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.card {
  box-sizing: border-box;
  color: #a7a7a7;
  margin-bottom: 10px;
  background-color: #252525;
  border-radius: 6px;
  width: 100%;
  height: 100%;
}
</style>
