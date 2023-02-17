<script setup lang="ts">
import { blogApp } from "@/lite.config";
import { useStorage } from "@vueuse/core";

const lstrip = ref(true);
const rstrip = ref(true);
const fixedlcabinet = useStorage(`l-${blogApp}-fixed-left-cabinet`, false);
const fixedrcabinet = useStorage(`l-${blogApp}-fixed-right-cabinet`, false);

onMounted(() => {
  document.querySelector("#left-strip").addEventListener("click", () => {
    lstrip.value = !lstrip.value;
  });

  document.querySelector("#right-strip").addEventListener("click", () => {
    rstrip.value = !rstrip.value;
  });

  document.querySelector("#full-modal").addEventListener("click", () => {
    if (!lstrip.value) lstrip.value = true;
    else if (!rstrip.value) rstrip.value = true;
  });
});
</script>

<template>
  <GitHub />
  <div
    id="left-strip"
    v-show="!fixedlcabinet"
    :class="{ 'left-70': !lstrip, 'left-0 w-5px l-strip-bg rd-2': lstrip }"
    class="fixed top-47.5vh h-5vh cursor-pointer opacity-70"></div>
  <LeftCabinet
    class="lcabinet"
    :class="{
      'show-lcabinet fixed top-0 left-0 z-999': !lstrip && !fixedlcabinet,
      'hidden-lcabinet fixed top-0 left-0': lstrip && !fixedlcabinet,
      'fixed-left-cabinet fixed top-0': fixedlcabinet
    }" />
  <div id="l-content">
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
  <div id="full-modal" class="z-99 opacity-50 l-modal-bg" :class="{ 'fixed top-0 left-0 w-100% h-100vh': !rstrip || !lstrip }"></div>
  <div
    id="right-strip"
    v-show="!fixedrcabinet"
    :class="{ 'right-70': !rstrip, 'right-0 w-5px l-strip-bg rd-2': rstrip }"
    class="fixed top-47.5vh h-5vh cursor-pointer opacity-70"></div>
  <RightCabinet
    class="rcabinet"
    :class="{
      'show-rcabinet fixed top-0 right-0 z-999': !rstrip && !fixedrcabinet,
      'hidden-rcabinet fixed top-0 right-0': rstrip && !fixedrcabinet,
      'fixed-right-cabinet fixed top-0': fixedrcabinet
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
