<script setup lang="ts">
const menu = ref<HTMLElement>();
const movbox = ref();
const disabled = ref(true);

onMounted(() => {
  menu.value.onmouseup = e => {
    if (e.button == 2) {
      disabled.value = !disabled.value;
      movbox.value.x = e.clientX;
      movbox.value.y = e.clientY;
    }
  };
});
</script>

<template>
  <div ref="menu" class="l-menu">
    <slot></slot>
    <Teleport to="#l-menu-container">
      <MovableBox ref="movbox" :disabled="disabled" :class="{ 'l-box-bg': !LiteConfig.localSetting.card.open }">
        <template #head>
          <div class="f-c-b">
            <div class="headtip mr-4 l-size-5">
              <slot name="title"></slot>
            </div>
            <div class="hover f-c-c" @click="disabled = !disabled">
              <i-ep-close />
            </div>
          </div>
        </template>
        <slot name="content"></slot>
      </MovableBox>
    </Teleport>
  </div>
</template>
