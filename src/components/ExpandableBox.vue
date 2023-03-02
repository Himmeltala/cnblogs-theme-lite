<script setup lang="ts">
import $ from "jquery";
import { getSetting } from "@/utils/common";

const setting = getSetting();
const props = defineProps({
  text: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    required: false
  }
});

const title = `${props.text}`;
if (!setting.value.cabinet.toggles[title]) {
  setting.value.cabinet.toggles[title] = {
    open: true,
    show: true
  };
}

const content = ref();
const height = ref();

function toggleClose() {
  let counter = 9;
  let cHeight = height.value;
  const interval = setInterval(() => {
    cHeight -= height.value / 10;
    content.value.style.height = `${cHeight}px`;
    counter--;
    if (counter == 0) {
      content.value.style.height = `${0}px`;
      setting.value.cabinet.toggles[title].open = !setting.value.cabinet.toggles[title].open;
      clearInterval(interval);
    }
  }, 10);
}

function toggleOpen() {
  let counter = 9;
  let cHeight = 0;
  const interval = setInterval(() => {
    cHeight += height.value / 10;
    content.value.style.height = `${cHeight}px`;
    counter--;
    if (counter == 0) {
      content.value.style.height = `${height.value}px`;
      setting.value.cabinet.toggles[title].open = !setting.value.cabinet.toggles[title].open;
      clearInterval(interval);
    }
  }, 10);
}

function toggle() {
  if (setting.value.cabinet.toggles[title]?.open) {
    toggleClose();
  } else {
    toggleOpen();
  }
}

onMounted(() => {
  height.value = $(content.value).height();

  if (!props.disabled) {
    if (!setting.value.cabinet.toggles[title]?.open) {
      content.value.style.height = `${0}px`;
    } else {
      content.value.style.height = `${height.value}px`;
    }
  }
});
</script>

<template>
  <div class="l-expandable l-thr-color" v-show="setting.cabinet.toggles[title]?.show">
    <div class="l-expandable__title f-c-b my-5 l-sec-size pl-1.5 rd-1">
      <div class="f-c-s">
        <div class="f-c-c mr-1">
          <slot name="icon" />
        </div>
        {{ text }}
      </div>
      <div
        v-if="!disabled"
        @click="toggle"
        class="f-c-c opacity-70 hover"
        :class="{ 'arrow-up': !setting.cabinet.toggles[title]?.open, 'arrow-down': setting.cabinet.toggles[title]?.open }">
        <div class="arrow">
          <i-ep-arrow-down />
        </div>
      </div>
    </div>
    <div ref="content" class="l-expandable__content">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.l-expandable__title {
  border-left: 4px solid var(--el-color-primary);
}

.arrow {
  transform: scale(0, 0);
}

.l-expandable__title:hover .arrow {
  transform: scale(1, 1);
}

.arrow-up {
  animation: arrow-up-animation 0.3s ease-in;
  transform: rotate(180deg);
}

.arrow-down {
  animation: arrow-down-animation 0.3s ease-in;
  transform: rotate(0deg);
}

@keyframes arrow-up-animation {
  @for $index from 0 to 10 {
    #{$index * 10%} {
      transform: rotate($index * 18deg);
    }
  }
}

@keyframes arrow-down-animation {
  @for $index from 0 to 10 {
    #{$index * 10%} {
      transform: rotate(180deg - $index * 18deg);
    }
  }
}

.l-expandable__content {
  overflow: hidden;
  transition: var(--l-transition);
}
</style>
