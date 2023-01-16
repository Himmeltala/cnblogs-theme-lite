<script setup lang="ts">
defineProps({
  text: String
});
</script>

<template>
  <div>
    <div class="title">
      <slot name="icon" />
      {{ text }}
    </div>
    <slot />
  </div>
</template>

<style scoped lang="scss">
.title {
  --at-apply: flex justify-start items-center content-center my-5 fsz-1.2 pl-1.5 font-300 rd-1;
  border-left: 4px solid var(--el-color-primary);
}
</style>
