<script setup lang="ts">
import { useDraggable } from "@vueuse/core";

const timestamp = new Date().getMilliseconds();
const menu = ref<HTMLElement>();
const panel = ref<HTMLElement>();
const head = ref<HTMLElement>();

const { x, y, style } = useDraggable(head);

let close = () => {};

onMounted(() => {
  panel.value.style.display = "none";

  menu.value.onmouseup = e => {
    if (e.button == 2) {
      const panels = document.querySelectorAll(".l-menu-panel");
      panels.forEach(ele => {
        if (ele.id !== "l-panel-" + timestamp) {
          // @ts-ignore
          ele.style.display = "none";
        }
      });

      panel.value.style.left = e.clientX + "px";
      panel.value.style.top = e.clientY + "px";
      panel.value.style.display = "block";
    }
  };

  close = () => {
    panel.value.style.display = "none";
  };
});
</script>

<template>
  <div ref="menu" class="l-menu">
    <slot />
    <Teleport to="body">
      <div ref="panel" :id="'l-panel-' + timestamp" :style="style" class="l-menu-panel z-99 fixed">
        <Card>
          <div ref="head" class="head px-4 pt-4 f-c-b mb-6 cursor-move">
            <div class="title">
              <slot name="title" />
            </div>
            <div class="hover f-c-c" @click="close">
              <i-ep-close />
            </div>
          </div>
          <div class="main px-4 pb-4">
            <slot name="content" />
          </div>
        </Card>
      </div>
    </Teleport>
  </div>
</template>

<style scoped lang="scss"></style>
