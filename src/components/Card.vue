<script setup lang="ts">
defineProps({
  line: {
    type: Boolean,
    default: false
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
      'background-color': LiteConfig.localSetting.card?.open ? LiteConfig.localSetting.card.color : 'initial',
      'border-radius': LiteConfig.localSetting.card?.open ? LiteConfig.localSetting.card.radius + 'px' : 'initial',
      'margin-left': margin.left + 'rem',
      'margin-right': margin.right + 'rem',
      'margin-top': margin.top + 'rem',
      'margin-bottom': margin.bottom + 'rem'
    }">
    <div
      class="l-card__content"
      :style="{
        'padding-left': LiteConfig.localSetting.card?.open ? padding.left + 'rem' : 0,
        'padding-right': LiteConfig.localSetting.card?.open ? padding.right + 'rem' : 0,
        'padding-top': padding.top + 'rem',
        'padding-bottom': LiteConfig.localSetting.card?.open ? padding.bottom + 'rem' : 0
      }">
      <div class="l-card__main">
        <slot />
      </div>
      <div
        class="l-card__border"
        v-if="line"
        :style="{ 'margin-top': !LiteConfig.localSetting.card?.open ? padding.bottom + 'rem' : 0 }"
        :class="{ border: !LiteConfig.localSetting.card?.open }"></div>
    </div>
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
