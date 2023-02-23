<script setup lang="ts">
import { getSetting } from "@/utils/common";

const setting = getSetting();
const props = defineProps({
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
  },
  // 左外边距
  marginLeft: {
    type: Boolean,
    default: false
  },
  // 上外边距
  marginTop: {
    type: Boolean,
    default: false
  },
  // 底外边距
  marginBottom: {
    type: Boolean,
    default: false
  },
  // 右外边距
  marginRight: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <div
    :style="{
      'background-color': setting.themeCard?.open ? setting.themeCard.color : 'initial',
      'border-radius': setting.themeCard?.open ? setting.themeCard.radius + 'px' : 'initial',
      'padding-left': setting.themeCard?.open && padding ? setting.themeCard.padding.left + 'rem' : 0,
      'padding-right': setting.themeCard?.open && padding ? setting.themeCard.padding.right + 'rem' : 0,
      'padding-top': setting.themeCard?.open && padding ? setting.themeCard.padding.top + 'rem' : 0,
      'padding-bottom': padding ? setting.themeCard.padding.bottom + 'rem' : 0,
      'margin-left': setting.themeCard?.open && marginLeft ? setting.themeCard.margin.left + 'rem' : 0,
      'margin-right': setting.themeCard?.open && marginRight ? setting.themeCard.margin.right + 'rem' : 0,
      'margin-top': setting.themeCard?.open && marginTop ? setting.themeCard.margin.top + 'rem' : 0,
      'margin-bottom': marginBottom ? setting.themeCard.margin.bottom + 'rem' : 0
    }"
    :class="{
      border: index !== length - 1 && !setting.themeCard?.open && border
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
