<script setup lang="ts">
defineProps({
  index: {
    type: Number
  },
  length: {
    type: Number
  }
});
</script>

<template>
  <div class="mb-4 pb-4 box-border" :class="{ 'bt-style': index !== length - 1 }">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.bt-style {
  border: {
    bottom: {
      width: 1px;
      style: dotted;
      color: #464646;
    }
  }
}
</style>
