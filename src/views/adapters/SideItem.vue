<script setup lang="ts">
defineProps({
  text: String
});
</script>

<template>
  <div class="side-item">
    <h3>
      <slot name="icon" class="icon" />
      {{ text }}
    </h3>
    <div class="side-item__slot">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
h3 {
  @include flex($justify: flex-start);
  margin: 20px 0;
  font-weight: 300 !important;
  font-size: 18px !important;
  text-align: left;
  border-left: 4px solid var(--el-color-primary);
  border-radius: 4px;
  padding-left: 7px;
}
</style>