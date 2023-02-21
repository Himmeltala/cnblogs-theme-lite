<script setup lang="ts">
import { blogApp } from "@/lite.config";
import { useStorage } from "@vueuse/core";
import { CustType } from "@/types/data-type";

const settings = useStorage<CustType.Settings>(`l-${blogApp}-settings`, {});

const lstrip = ref(true);
const rstrip = ref(true);

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

  document.getElementById("l-bg-img").setAttribute("src", settings.value.bgImage);
  watch(settings, (val, old) => {
    if (val.bgImage != old.bgImage) {
      document.getElementById("l-bg-img").setAttribute("src", settings.value.bgImage);
    }
  });
});
</script>

<template>
  <GitHub />
  <div id="progress" class="f-c-c">
    <div class="bar" :class="{ exebar: false }"></div>
  </div>
  <div id="l-bg-box" class="fixed left-0 top-0 w-100vw h-100vw z-0" v-show="settings.bgImage">
    <img id="l-bg-img" />
  </div>
  <div
    id="left-strip"
    v-show="!settings.cabinet.pinLeft"
    :class="{ 'left-70': !lstrip, 'left-0 w-5px l-strip-bg rd-2': lstrip }"
    class="fixed top-47.5vh h-5vh cursor-pointer opacity-70"></div>
  <Suspense>
    <LeftCabinet
      :style="{ left: settings.cabinet.pinLeft && settings.cabinet.break ? settings.cabinet.left + 'vw' : 0 }"
      :class="{
        'show-lcabinet fixed top-0 left-0 z-999': !lstrip && !settings.cabinet.pinLeft,
        'hidden-lcabinet fixed top-0 left-0': lstrip && !settings.cabinet.pinLeft,
        'fixed-left-cabinet fixed top-0': settings.cabinet.pinLeft && !settings.cabinet.break,
        'fixed top-0': settings.cabinet.pinLeft && settings.cabinet.break
      }" />
  </Suspense>
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
    <div class="f-c-c my-2 fsz-0.8 l-sec-color h-4">
      Created By
      <a class="hover mx-1" href="https://github.com/Himmelbleu/cnblogs-theme-lite" target="__blank"> Himmelbleu, </a>
      powered by
      <a class="hover mx-1" href="https://v3.cn.vuejs.org/" target="__blank">Vue3</a>
      on
      <a class="hover mx-1" href="https://vitejs.cn/vite3-cn/" target="__blank">Vite.</a>
    </div>
  </div>
  <div id="full-modal" class="z-99 opacity-50 l-modal-bg" :class="{ 'fixed top-0 left-0 w-100% h-100vh': !rstrip || !lstrip }"></div>
  <div
    id="right-strip"
    v-show="!settings.cabinet.pinRight"
    :class="{ 'right-70': !rstrip, 'right-0 w-5px l-strip-bg rd-2': rstrip }"
    class="fixed top-47.5vh h-5vh cursor-pointer opacity-70"></div>
  <RightCabinet
    :style="{ right: settings.cabinet.pinRight && settings.cabinet.break ? settings.cabinet.right + 'vw' : 0 }"
    :class="{
      'show-rcabinet fixed top-0 right-0 z-999': !rstrip && !settings.cabinet.pinRight,
      'hidden-rcabinet fixed top-0 right-0': rstrip && !settings.cabinet.pinRight,
      'fixed-right-cabinet fixed top-0': settings.cabinet.pinRight && !settings.cabinet.break,
      'fixed top-0': settings.cabinet.pinRight && settings.cabinet.break
    }" />
  <ToolKits />
</template>

<style scoped lang="scss">
$quota: 10;

#l-bg-box {
  #l-bg-img {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 1;
    backdrop-filter: blur(var(--l-bg-filter));
  }
}

#progress {
  height: 2px;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
}

#progress .exebar {
  height: inherit;
  animation: exebar infinite 10s ease-in-out;
  background-color: var(--l-theme-color);
}

@keyframes exebar {
  @for $i from 0 to 100 {
    #{$i * 1%} {
      width: $i * 1vw;
    }
  }
}

@include pc() {
  #l-content {
    width: var(--content-width);
  }
}

@include mb() {
  #l-content {
    --at-apply: w-100%;
  }
}

.fixed-left-cabinet {
  left: calc(calc(var(--content-width) / 2) - calc(var(--cabinet-width) + 2rem)) !important;
}

.fixed-right-cabinet {
  left: calc(calc(var(--content-width) / 2) + var(--content-width) + 2rem) !important;
}

.show-lcabinet {
  animation: showlcabinet 0.2s ease-in;
  transform: translateX(0);
}

@keyframes showlcabinet {
  @for $i from 0 to $quota {
    #{$i * 10%} {
      transform: translateX(calc(calc(-1 * var(--cabinet-width)) + calc($i * calc(var(--cabinet-width) / 10))));
    }
  }
}

.hidden-lcabinet {
  animation: hiddenlcabinet 0.2s ease-out;
  transform: translateX(calc(-1 * var(--cabinet-width)));
}

@keyframes hiddenlcabinet {
  @for $i from 0 to $quota {
    #{$i * 10%} {
      transform: translateX(calc($i * calc(calc(-1 * var(--cabinet-width)) / 10)));
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
      transform: translateX(calc(var(--cabinet-width) + calc($i * calc(calc(-1 * var(--cabinet-width)) / 10))));
    }
  }
}

.hidden-rcabinet {
  animation: hiddenrcabinet 0.2s ease-out;
  transform: translateX(var(--cabinet-width));
}

@keyframes hiddenrcabinet {
  @for $i from 0 to $quota {
    #{$i * 10%} {
      transform: translateX(calc($i * calc(var(--cabinet-width) / 10)));
    }
  }
}
</style>
