<script setup lang="ts">
import $ from "jquery";
import { getSetting } from "@/utils/common";

const setting = getSetting();
const props = defineProps({
  text: {
    type: String,
    required: true
  }
});

const record = `${props.text}`;
if (!setting.value.cabinet.toggles[record]) {
  setting.value.cabinet.toggles[record] = {
    open: true,
    show: true
  };
}

let toggle: any;
const content = ref();

onMounted(() => {
  const height = $(content.value).height();

  if (!setting.value.cabinet.toggles[record]?.open) {
    content.value.style.height = `${0}px`;
  } else {
    content.value.style.height = `${height}px`;
  }

  toggle = () => {
    let counter = 9;
    if (setting.value.cabinet.toggles[record]?.open) {
      let cHeight = height;
      const interval = setInterval(() => {
        cHeight -= height / 10;
        content.value.style.height = `${cHeight}px`;
        counter--;
        if (counter == 0) {
          content.value.style.height = `${0}px`;
          setting.value.cabinet.toggles[record].open = !setting.value.cabinet.toggles[record].open;
          clearInterval(interval);
        }
      }, 10);
    } else {
      let cHeight = 0;
      const interval = setInterval(() => {
        cHeight += height / 10;
        content.value.style.height = `${cHeight}px`;
        counter--;
        if (counter == 0) {
          content.value.style.height = `${height}px`;
          setting.value.cabinet.toggles[record].open = !setting.value.cabinet.toggles[record].open;
          clearInterval(interval);
        }
      }, 10);
    }
  };
});
</script>

<template>
  <div class="l-thr-color" v-show="setting.cabinet.toggles[record]?.show">
    <div class="title f-c-b my-5 l-sec-size pl-1.5 rd-1">
      <div class="f-c-s">
        <div class="f-c-c mr-1">
          <slot name="icon" />
        </div>
        {{ text }}
      </div>
      <div
        @click="toggle"
        class="f-c-c opacity-70 hover"
        :class="{ 'arrow-up': !setting.cabinet.toggles[record]?.open, 'arrow-down': setting.cabinet.toggles[record]?.open }">
        <div class="arrow">
          <i-ep-arrow-down />
        </div>
      </div>
    </div>
    <div ref="content" class="content">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.title {
  border-left: 4px solid var(--el-color-primary);
}

.arrow {
  transform: scale(0, 0);
}

.title:hover .arrow {
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

.content {
  overflow: hidden;
  transition: var(--l-transition);
}
</style>
