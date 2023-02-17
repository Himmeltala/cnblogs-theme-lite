<script setup lang="ts">
import { blogApp } from "@/lite.config";
import { useStorage } from "@vueuse/core";

const hiddenLeft = ref(true);
const hiddenRight = ref(true);

const isFixedLeftCabinet = useStorage(`l-${blogApp}-fixed-left-cabinet`, false);
const isFixedRightCabinet = useStorage(`l-${blogApp}-fixed-right-cabinet`, false);

function listener(el: string, fn: any, ev?: string) {
  document.querySelector(el).addEventListener(ev || "click", fn);
}

onMounted(() => {
  listener("#left-strip", () => {
    hiddenLeft.value = !hiddenLeft.value;
    if (!hiddenRight.value) hiddenRight.value = !hiddenRight.value;
  });
  listener("#right-strip", () => {
    hiddenRight.value = !hiddenRight.value;
    if (!hiddenLeft.value) hiddenLeft.value = !hiddenLeft.value;
  });
  listener("#full-modal", () => {
    if (!hiddenLeft.value) hiddenLeft.value = true;
    else if (!hiddenRight.value) hiddenRight.value = true;
  });
});
</script>

<template>
  <GitHub />
  <div
    id="left-strip"
    v-show="!isFixedLeftCabinet"
    :class="{ 'left-250px': !hiddenLeft, 'left-0 w-5px l-strip-bg rd-2': hiddenLeft }"
    class="z-999 fixed top-47.5vh h-5vh cursor-pointer opacity-70"></div>
  <LeftCabinet
    class="lcabinet"
    :class="{
      'show-lcabinet fixed top-0 left-0 z-9999': !hiddenLeft && !isFixedLeftCabinet,
      'hidden-lcabinet fixed top-0 left-0 z-99': hiddenLeft && !isFixedLeftCabinet,
      'fixed-left-cabinet fixed top-0': isFixedLeftCabinet
    }" />
  <div id="l-content">
    {{}}
    <span id="top-nail"></span>
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <KeepAlive :include="['Home']">
          <Suspense>
            <component :is="Component" />
          </Suspense>
        </KeepAlive>
      </template>
    </RouterView>
    <div class="f-c-c py-2 fsz-0.8 l-sec-color h-4">
      Created By
      <a class="hover mx-1 l-sec-color" href="https://github.com/Himmelbleu/cnblogs-theme-lite" target="__blank"> Himmelbleu, </a>
      powered by
      <a class="hover mx-1 l-sec-color" href="https://v3.cn.vuejs.org/" target="__blank">Vue3</a>
      on
      <a class="hover mx-1 l-sec-color" href="https://vitejs.cn/vite3-cn/" target="__blank">Vite.</a>
    </div>
  </div>
  <div
    id="full-modal"
    class="z-999 opacity-50 l-modal-bg"
    :class="{ 'fixed top-0 left-0 w-100% h-100vh': !hiddenRight || !hiddenLeft }"></div>
  <div
    id="right-strip"
    v-show="!isFixedRightCabinet"
    :class="{ 'right-250px': !hiddenRight, 'right-0 w-5px rd-2 l-strip-bg': hiddenRight }"
    class="z-999 fixed top-47.5vh h-5vh cursor-pointer opacity-70"></div>
  <RightCabinet
    class="rcabinet"
    :class="{
      'show-rcabinet fixed top-0 right-0 z-9999': !hiddenRight && !isFixedRightCabinet,
      'hidden-rcabinet fixed top-0 right-0 z-99': hiddenRight && !isFixedRightCabinet,
      'fixed-right-cabinet fixed top-0': isFixedRightCabinet
    }" />
  <ToolKits />
</template>

<style scoped lang="scss">
$quota: 10;

@include pc() {
  #l-content {
    --at-apply: py-5 w-50vw;
  }
}

@include mb() {
  #l-content {
    --at-apply: p-5 w-100%;
  }
}

.fixed-left-cabinet {
  left: calc(25vw - 19rem);
}

.fixed-right-cabinet {
  right: calc(25vw - 19rem);
}

.show-lcabinet {
  animation: showlcabinet 0.2s ease-in;
  transform: translateX(0);
}

@keyframes showlcabinet {
  @for $i from 0 to $quota {
    #{$i * 10%} {
      transform: translateX(-12.5rem + ($i * 1.25rem));
    }
  }
}

.hidden-lcabinet {
  animation: hiddenlcabinet 0.2s ease-out;
  transform: translateX(-17.5rem);
}

@keyframes hiddenlcabinet {
  @for $i from 0 to $quota {
    #{$i * 10%} {
      transform: translateX($i * -1.75rem);
    }
  }
}

.show-rcabinet {
  animation: showrcabinet 0.2s ease-in;
  transform: translateX(0);
}

@keyframes showrcabinet {
  @for $i from 0 to $quota {
    #{$i * 10%} {
      transform: translateX(17.5rem + ($i * -1.75rem));
    }
  }
}

.hidden-rcabinet {
  animation: hiddenrcabinet 0.2s ease-out;
  transform: translateX(17.5rem);
}

@keyframes hiddenrcabinet {
  @for $i from 0 to $quota {
    #{$i * 10%} {
      transform: translateX($i * 1.75rem);
    }
  }
}
</style>
