<script setup lang="ts">
import { getSetting } from "@/utils/common";

const setting = getSetting();
defineProps({
  index: {
    type: Number
  },
  length: {
    type: Number
  },
  border: {
    type: Boolean,
    default: true
  },
  padding: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <div
    :style="{
      'background-color': setting.themeCard?.open ? setting.themeCard.color : false || 'initial',
      'border-radius': setting.themeCard?.open ? setting.themeCard.radius + 'px' : false || 'initial'
    }"
    :class="{
      border: index !== length - 1 && !setting.themeCard?.open && border,
      'p-4': setting.themeCard?.open && padding
    }">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.border {
  border: {
    bottom: {
      width: 1px;
      style: dotted;
      color: var(--l-divider-bg);
    }
  }
}
</style>
