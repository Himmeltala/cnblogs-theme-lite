<script setup lang="ts">
defineProps({
  color: {
    type: String
  },
  fontSize: {
    type: String
  }
});
</script>

<template>
  <div class="tag" :style="{'font-size': fontSize ? fontSize : '12px'}">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.tag {
  box-sizing: border-box;
  padding: 6px 8px;
  border-radius: 6px;
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
