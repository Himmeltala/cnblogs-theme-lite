<script setup lang="ts">
defineProps({
  text: String
});
</script>

<template>
  <div>
    <div class="title f-c-s my-5 fsz-1.2 pl-1.5 rd-1">
      <slot name="icon" />
      {{ text }}
    </div>
    <slot />
  </div>
</template>

<style scoped lang="scss">
.title {
  border-left: 4px solid var(--el-color-primary);
}
</style>
