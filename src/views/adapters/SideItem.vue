<script setup lang="ts">
defineProps({
  text: String
});
</script>

<template>
  <div>
    <h3>
      <slot name="icon" />
      {{ text }}
    </h3>
    <slot />
  </div>
</template>

<style scoped lang="scss">
h3 {
  --at-apply: flex justify-start items-center content-center my-5 fsz-p-18 p-l-1.5 font-300 b-rd-1;
  border-left: 4px solid var(--el-color-primary);
}
</style>
