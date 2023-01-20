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
  <div class="box-border" :class="{ 'bt-border': index !== length - 1 }">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.bt-border {
  border: {
    bottom: {
      width: 1px;
      style: dotted;
      color: var(--divider-color);
    }
  }
}
</style>
