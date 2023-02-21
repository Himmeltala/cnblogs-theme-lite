<script setup lang="ts">
import { blogApp } from "@/lite.config";
import { useStorage } from "@vueuse/core";
import { CustType } from "@/types/data-type";

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

const settings = useStorage<CustType.Settings>(`l-${blogApp}-settings`, {});
</script>

<template>
  <div
    :style="{
      'background-color': settings.themeCard?.open ? settings.themeCard.color : false || 'initial',
      'border-radius': settings.themeCard?.open ? settings.themeCard.radius + 'px' : false || 'initial'
    }"
    :class="{
      'bt-border': index !== length - 1 && !settings.themeCard?.open && !border,
      'p-4': padding && settings.themeCard?.open
    }">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.bt-border {
  border: {
    bottom: {
      width: 1px;
      style: dotted;
      color: var(--l-divider-bg);
    }
  }
}
</style>
