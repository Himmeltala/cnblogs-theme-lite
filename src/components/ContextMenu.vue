<script setup lang="ts">
import { getSetting } from "@/utils/common";

const setting = getSetting();
const menu = ref<HTMLElement>();
const head = ref<HTMLElement>();
const panel = ref<HTMLElement>();
const seconds = new Date().getMilliseconds();
const { x, y } = useDraggable(head);

function close() {
  panel.value.style.display = "none";
}

onMounted(() => {
  menu.value.onmouseup = e => {
    if (e.button == 2) {
      const box = document.querySelector("#l-menu-container");
      const id = box.getAttribute("pre-menu-id");
      id && (document.getElementById(`l-menu__panel__${id}`).style.display = "none");
      box.setAttribute("pre-menu-id", `${seconds}`);
      panel.value.style.left = `${e.clientX}px`;
      panel.value.style.top = `${e.clientY}px`;
      panel.value.style.display = "block";
    }
  };
});
</script>

<template>
  <div ref="menu" class="l-menu">
    <slot />
    <Teleport to="#l-menu-container">
      <div
        ref="panel"
        :id="'l-menu__panel__' + seconds"
        :class="{ 'l-box-bg': !setting.card.open }"
        :style="{ left: x + 'px', top: y + 'px' }"
        class="z-99 fixed hidden">
        <Card>
          <div ref="head" class="l-menu__head px-4 pt-4 f-c-b mb-6 cursor-move">
            <div class="l-menu__title mr-10 l-for-size pl-1.5 rd-1">
              <slot name="title" />
            </div>
            <div class="hover f-c-c" @click="close">
              <i-ep-close />
            </div>
          </div>
          <div class="l-menu__main px-4 pb-4">
            <slot name="content" />
          </div>
        </Card>
      </div>
    </Teleport>
  </div>
</template>

<style scoped lang="scss">
.l-menu__title {
  border-left: 4px solid var(--el-color-primary);
}
</style>
