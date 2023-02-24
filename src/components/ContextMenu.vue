<script setup lang="ts">
import { useDraggable } from "@vueuse/core";
import { getSetting } from "@/utils/common";

const setting = getSetting();
const timestamp = new Date().getMilliseconds();
const menu = ref<HTMLElement>();
const panel = ref<HTMLElement>();
const head = ref<HTMLElement>();

const { x, y } = useDraggable(head);

let close = () => {};

onMounted(() => {
  menu.value.onmouseup = e => {
    if (e.button == 2) {
      const panels = document.querySelectorAll(".l-menu-panel");
      panels.forEach(ele => {
        if (ele.id !== "l-panel-" + timestamp) {
          // @ts-ignore
          ele.style.display = "none";
        }
      });

      panel.value.style.left = `${e.clientX}px`;
      panel.value.style.top = `${e.clientY}px`;
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
      <div
        ref="panel"
        :class="{ 'l-box-bg': !setting.card.open }"
        :id="'l-panel-' + timestamp"
        :style="{ left: 'calc(' + x + 'px + 1rem)', top: 'calc(' + y + 'px + 1rem)' }"
        class="l-menu-panel z-99 fixed hidden">
        <Card>
          <div ref="head" class="head px-4 pt-4 f-c-b mb-6 cursor-move">
            <div class="title mr-10 l-for-size pl-1.5 rd-1">
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

<style scoped lang="scss">
.title {
  border-left: 4px solid var(--el-color-primary);
}
</style>
