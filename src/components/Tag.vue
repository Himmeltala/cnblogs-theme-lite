<script setup lang="ts">
defineProps({
  color: {
    type: String
  }
});
</script>

<template>
  <div class="tag">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.tag {
  box-sizing: border-box;
  padding: 6px 8px;
  border-radius: 6px;
  font-size: 12px;
  transition: 0.3s;
  border: {
    width: 1px;
    style: dotted;
    color: #5d5d5d;
  }
  cursor: pointer;

  &:hover {
    transition: 0.3s;
    color: var(--el-color-primary);
    border-color: var(--el-color-primary);
  }
}
</style>
