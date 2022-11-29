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
  color: #a7a7a7;
  box-sizing: border-box;
  padding: 3px 6px;
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
