<script setup lang="ts">
defineProps({
  text: String
});
</script>

<template>
  <div class="side-item">
    <h3>{{ text }}</h3>
    <div class="side-item__slot">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
h3 {
  display: block;
  margin: 20px 0;
  font-size: 20px;
  font-weight: inherit;
  text-align: left;
  border-left: 4px solid var(--el-color-primary);
  border-radius: 4px;
  padding-left: 7px;
}
</style>