<script setup lang="ts">
const props = defineProps({
  width: {
    type: String,
    required: true
  }
});

const menu = ref<HTMLElement>();
const main = ref<HTMLElement>();
let close = () => {};

onMounted(() => {
  main.value.style.transform = "scale(0, 0)";

  menu.value.onmouseup = e => {
    if (e.button == 2) {
      main.value.style.left = e.offsetX + "px";
      main.value.style.top = e.clientY + "px";
      main.value.style.transform = "scale(1, 1)";
    }
  };

  close = () => {
    main.value.style.transform = "scale(0, 0)";
  };
});
</script>

<template>
  <div class="l-menu" ref="menu">
    <slot />
    <div ref="main" class="menu-content z-99 absolute" :style="{ width: width }">
      <Card class="p-4">
        <div class="head f-c-e mb-4">
          <div class="hover" @click="close">
            <i-ep-close />
          </div>
        </div>
        <div class="menu-main">
          <slot name="content" />
        </div>
      </Card>
    </div>
  </div>
</template>

<style scoped lang="scss">
.menu-content {
  transition: all 0.2s ease-in-out;
}
</style>
