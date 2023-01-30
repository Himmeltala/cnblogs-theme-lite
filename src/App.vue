<script setup lang="ts">
const hiddenNavModal = ref(true);
const hiddenLCabinet = ref(true);
const hiddenRCabinet = ref(true);

function listener(el: string, fn: any) {
  document.querySelector(el).addEventListener("mouseover", fn);
}

onMounted(() => {
  listener("#nav-modal", () => (hiddenNavModal.value = !hiddenNavModal.value));
  listener("#lcabinet-modal", () => {
    hiddenLCabinet.value = !hiddenLCabinet.value;
    if (!hiddenRCabinet.value) hiddenRCabinet.value = !hiddenRCabinet.value;
  });
  listener("#rcabinet-modal", () => {
    hiddenRCabinet.value = !hiddenRCabinet.value;
    if (!hiddenLCabinet.value) hiddenLCabinet.value = !hiddenLCabinet.value;
  });
});
</script>

<template>
  <GitHub />
  <div
    id="nav-modal"
    :class="{ 't-vh-6 h-6': !hiddenNavModal, 'h-5 t-vh-0': hiddenNavModal }"
    class="z-999 fixed w-vw-50" />
  <Navigation :class="{ 'show-nav': !hiddenNavModal, 'hidden-nav': hiddenNavModal }" />
  <div
    id="lcabinet-modal"
    :class="{ 'l-px-250': !hiddenLCabinet, 'l-px-0': hiddenLCabinet }"
    class="z-999 fixed t-vh-25 h-vh-50 w-20" />
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
    <div class="f-c-c py-2 fsz-0.8 sec-color h-4">
      Created By
      <a
        class="hover mx-1 sec-color"
        href="https://github.com/Himmelbleu/cnblogs-theme-lite"
        target="__blank">
        Himmelbleu,
      </a>
      powered by
      <a class="hover mx-1 sec-color" href="https://v3.cn.vuejs.org/" target="__blank">Vue3</a>
      on
      <a class="hover mx-1 sec-color" href="https://vitejs.cn/vite3-cn/" target="__blank">Vite.</a>
    </div>
  </div>
  <div
    id="rcabinet-modal"
    :class="{ 'r-px-250': !hiddenRCabinet, 'r-px-0': hiddenRCabinet }"
    class="z-999 fixed t-vh-25 h-vh-50 w-20" />
  <RCabinet :class="{ 'show-rcabinet': !hiddenRCabinet, 'hidden-rcabinet': hiddenRCabinet }" />
  <!-- <ToolKits /> -->
</template>

<style scoped lang="scss">
$quota: 10;

@media screen and (max-width: 1000px) {
  #l-content {
    --at-apply: p-5 w-%-100;
  }
}

@media screen and (min-width: 1000px) {
  #l-content {
    --at-apply: py-5 w-vw-50;
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
