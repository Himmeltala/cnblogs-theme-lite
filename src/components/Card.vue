<script setup lang="ts">
import { PropType } from "vue";
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
  margin: {
    type: Object as PropType<any>,
    default: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }
  },
  padding: {
    type: Object as PropType<any>,
    default: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }
  }
});
</script>

<template>
  <div
    class="l-card"
    :style="{
      'background-color': setting.themeCard?.open ? setting.themeCard.color : 'initial',
      'border-radius': setting.themeCard?.open ? setting.themeCard.radius + 'px' : 'initial',
      'padding-left': padding.left + 'rem',
      'padding-right': padding.right + 'rem',
      'padding-top': padding.top + 'rem',
      'padding-bottom': padding.bottom + 'rem',
      'margin-left': margin.left + 'rem',
      'margin-right': margin.right + 'rem',
      'margin-top': margin.top + 'rem',
      'margin-bottom': margin.bottom + 'rem'
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
