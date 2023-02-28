<script setup lang="ts">
import { getSetting } from "@/utils/common";

const setting = getSetting();

onMounted(() => {
  document.getElementById("l-background__img").setAttribute("src", setting.value.background.src);
});

watch(setting, () => {
  document.getElementById("l-background__img").setAttribute("src", setting.value.background.src);
});
</script>

<template>
  <ContextMenu>
    <div id="l-background" class="fixed left-0 top-0 w-100vw h-100vw">
      <img v-show="setting.background.src && setting.background.open" id="l-background__img" class="w-100% h-100%" />
    </div>
    <template #title> 主题设置 </template>
    <template #content>
      <ThemeSetting />
    </template>
  </ContextMenu>
</template>

<style scoped lang="scss">
#l-background::after {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  backdrop-filter: blur(var(--l-bg-filter));
}
</style>
