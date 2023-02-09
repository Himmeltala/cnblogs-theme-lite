<script setup lang="ts">
const hiddenNavModal = ref(true);
const hiddenLCabinet = ref(true);
const hiddenRCabinet = ref(true);

function listener(el: string, fn: any, ev?: string) {
  document.querySelector(el).addEventListener(ev || "mouseover", fn);
}

onMounted(() => {
  listener("#nav-strip", () => (hiddenNavModal.value = !hiddenNavModal.value));
  listener(
    "#lcabinet-strip",
    () => {
      hiddenLCabinet.value = !hiddenLCabinet.value;
      if (!hiddenRCabinet.value) hiddenRCabinet.value = !hiddenRCabinet.value;
    },
    "click"
  );
  listener(
    "#rcabinet-strip",
    () => {
      hiddenRCabinet.value = !hiddenRCabinet.value;
      if (!hiddenLCabinet.value) hiddenLCabinet.value = !hiddenLCabinet.value;
    },
    "click"
  );
  listener(
    "#full-modal",
    () => {
      if (!hiddenLCabinet.value) {
        hiddenLCabinet.value = true;
      } else if (!hiddenRCabinet.value) {
        hiddenRCabinet.value = true;
      }
    },
    "click"
  );
});
</script>

<template>
  <GitHub />
  <div
    id="nav-strip"
    :class="{ 'top-6vh h-6': !hiddenNavModal, 'h-5 top-0': hiddenNavModal }"
    class="z-999 fixed w-50vw" />
  <Navigation :class="{ 'show-nav': !hiddenNavModal, 'hidden-nav': hiddenNavModal }" />
  <div
    id="lcabinet-strip"
    :class="{ 'left-250px': !hiddenLCabinet, 'left-0 w-3px l-strip-bg rd-2': hiddenLCabinet }"
    class="z-999 fixed top-40vh h-20vh cursor-pointer opacity-70" />
  <LCabinet :class="{ 'show-lcabinet': !hiddenLCabinet, 'hidden-lcabinet': hiddenLCabinet }" />
  <div id="l-content">
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
      <a
        class="hover mx-1 l-sec-color"
        href="https://github.com/Himmelbleu/cnblogs-theme-lite"
        target="__blank">
        Himmelbleu,
      </a>
      powered by
      <a class="hover mx-1 l-sec-color" href="https://v3.cn.vuejs.org/" target="__blank">Vue3</a>
      on
      <a class="hover mx-1 l-sec-color" href="https://vitejs.cn/vite3-cn/" target="__blank"
        >Vite.</a
      >
    </div>
  </div>
  <div
    id="full-modal"
    class="full-modal z-99 opacity-50 l-modal-bg"
    :class="{ 'fixed top-0 left-0 w-100% h-100vh': !hiddenRCabinet || !hiddenLCabinet }"></div>
  <div
    id="rcabinet-strip"
    :class="{ 'right-250px': !hiddenRCabinet, 'right-0 w-3px l-strip-bg rd-2': hiddenRCabinet }"
    class="z-999 fixed top-40vh h-20vh cursor-pointer opacity-70" />
  <RCabinet :class="{ 'show-rcabinet': !hiddenRCabinet, 'hidden-rcabinet': hiddenRCabinet }" />
  <!-- <ToolKits /> -->
</template>

<style scoped lang="scss">
$quota: 10;

@media screen and (max-width: 1000px) {
  #l-content {
    --at-apply: p-5 w-100%;
  }
}

@media screen and (min-width: 1000px) {
  #l-content {
    --at-apply: py-5 w-50vw;
  }
}

.show-nav {
  animation: shownav 0.2s ease-in;
  transform: translateY(0);
}

@keyframes shownav {
  @for $i from 0 to $quota {
    #{$i * 10%} {
      transform: translateY(-6vh + ($i * 0.6vh));
    }
  }
}

.hidden-nav {
  animation: hiddennav 0.2s ease-out;
  transform: translateY(-6vh);
}

@keyframes hiddennav {
  @for $i from 0 to $quota {
    #{$i * 10%} {
      transform: translateY($i * -0.6vh);
    }
  }
}

.show-lcabinet {
  animation: showlcase 0.2s ease-in;
  transform: translateX(0);
}

@keyframes showlcase {
  @for $i from 0 to $quota {
    #{$i * 10%} {
      transform: translateX(-250px + ($i * 25px));
    }
  }
}

.hidden-lcabinet {
  animation: hiddenlcase 0.2s ease-out;
  transform: translateX(-250px);
}

@keyframes hiddenlcase {
  @for $i from 0 to $quota {
    #{$i * 10%} {
      transform: translateX($i * -25px);
    }
  }
}

.show-rcabinet {
  animation: showrcase 0.2s ease-in;
  transform: translateX(0);
}

@keyframes showrcase {
  @for $i from 0 to $quota {
    #{$i * 10%} {
      transform: translateX(250px + ($i * -25px));
    }
  }
}

.hidden-rcabinet {
  animation: hiddenrcase 0.2s ease-out;
  transform: translateX(250px);
}

@keyframes hiddenrcase {
  @for $i from 0 to $quota {
    #{$i * 10%} {
      transform: translateX($i * 25px);
    }
  }
}
</style>
