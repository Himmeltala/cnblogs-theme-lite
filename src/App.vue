<script setup lang="ts">
import { getSetting } from "@/utils/common";

const setting = getSetting();
const lstrip = ref(true);
const rstrip = ref(true);

onMounted(() => {
  document.querySelector("#l-lstrip").addEventListener("click", () => {
    lstrip.value = !lstrip.value;
  });

  document.querySelector("#l-rstrip").addEventListener("click", () => {
    rstrip.value = !rstrip.value;
  });

  document.querySelector("#l-matte").addEventListener("click", () => {
    if (!lstrip.value) lstrip.value = true;
    else if (!rstrip.value) rstrip.value = true;
  });

  document.getElementById("l-photo").setAttribute("src", setting.value.background.src);
  watch(setting, (val, old) => {
    if (val.background.src != old.background.src) {
      document.getElementById("l-photo").setAttribute("src", setting.value.background.src);
    }
  });
});
</script>

<template>
  <div id="l-left">
    <GitHub />
    <div id="l-progress" class="f-c-c">
      <div class="bar" :class="{ exebar: false }"></div>
    </div>
    <div id="l-back" class="fixed left-0 top-0 w-100vw h-100vw" v-show="setting.background.src">
      <img id="l-photo" class="w-100% h-100%" />
    </div>
    <div
      id="l-lstrip"
      v-show="!setting.cabinet.pinLeft"
      class="fixed left-0 top-47.5vh w-5px h-5vh rd-2 cursor-pointer opacity-70 l-strip-bg"></div>
    <Suspense>
      <LeftCabinet
        :style="{ left: setting.cabinet.pinLeft && setting.cabinet.break ? setting.cabinet.left + 'vw' : 0 }"
        :class="{
          'show-lcabinet fixed top-0 left-0 z-2': !lstrip && !setting.cabinet.pinLeft,
          'hidden-lcabinet fixed top-0 left-0': lstrip && !setting.cabinet.pinLeft,
          'fixed-left-cabinet fixed top-0': setting.cabinet.pinLeft && !setting.cabinet.break,
          'fixed top-0': setting.cabinet.pinLeft && setting.cabinet.break
        }" />
    </Suspense>
  </div>
  <div id="l-content" class="z-1">
    <div id="l-nail"></div>
    <div id="l-main">
      <RouterView v-slot="{ Component }">
        <template v-if="Component">
          <KeepAlive :include="['Home']">
            <Suspense>
              <component :is="Component" />
            </Suspense>
          </KeepAlive>
        </template>
      </RouterView>
    </div>
    <Card>
      <div class="f-c-c my-2 fsz-0.8 l-sec-color h-4">
        Created By
        <a class="hover mx-1" href="https://github.com/Himmelbleu/cnblogs-theme-lite" target="__blank"> Himmelbleu, </a>
        powered by
        <a class="hover mx-1" href="https://v3.cn.vuejs.org/" target="__blank">Vue3</a>
        on
        <a class="hover mx-1" href="https://vitejs.cn/vite3-cn/" target="__blank">Vite.</a>
      </div>
    </Card>
  </div>
  <div id="l-right">
    <div id="l-matte" class="fixed top-0 left-0 z-1 opacity-50 l-matee-bg" :class="{ 'w-100% h-100vh': !rstrip || !lstrip }"></div>
    <div
      id="l-rstrip"
      v-show="!setting.cabinet.pinRight"
      class="fixed right-0 top-47.5vh w-5px h-5vh rd-2 cursor-pointer opacity-70 l-strip-bg"></div>
    <RightCabinet
      :style="{ right: setting.cabinet.pinRight && setting.cabinet.break ? setting.cabinet.right + 'vw' : 0 }"
      :class="{
        'show-rcabinet fixed top-0 right-0 z-2': !rstrip && !setting.cabinet.pinRight,
        'hidden-rcabinet fixed top-0 right-0': rstrip && !setting.cabinet.pinRight,
        'fixed-right-cabinet fixed top-0': setting.cabinet.pinRight && !setting.cabinet.break,
        'fixed top-0': setting.cabinet.pinRight && setting.cabinet.break
      }" />
    <ToolKits />
  </div>
</template>

<style scoped lang="scss">
$quota: 10;

#l-back::after {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  backdrop-filter: blur(var(--l-bg-filter));
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
    width: 100%;
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
