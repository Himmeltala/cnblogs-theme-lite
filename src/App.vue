<script setup lang="ts">
const nhidden = ref(true);
const lhidden = ref(true);
const rhidden = ref(true);

function listener(el: string, fn: any) {
  document.querySelector(el).addEventListener("mouseover", fn);
}

onMounted(() => {
  listener("#nmask", () => (nhidden.value = !nhidden.value));
  listener("#lmask", () => {
    lhidden.value = !lhidden.value;
    if (!rhidden.value) rhidden.value = !rhidden.value;
  });
  listener("#rmask", () => {
    rhidden.value = !rhidden.value;
    if (!lhidden.value) lhidden.value = !lhidden.value;
  });
});
</script>

<template>
  <GitHub />
  <div
    id="nmask"
    :class="{ 't-vh-6 h-vh-6': !nhidden, 'h-vh-4 t-vh-0': nhidden }"
    class="z-999 fixed w-vw-20" />
  <Navigation :class="{ 'show-nav': !nhidden, 'hidden-nav': nhidden }" />
  <div
    id="lmask"
    :class="{ 'l-px-250 w-vw-20': !lhidden, 'l-px-0 w-vw-10': lhidden }"
    class="z-999 fixed t-vh-25 h-vh-50" />
  <LCabinet :class="{ 'show-lcabinet': !lhidden, 'hidden-lcabinet': lhidden }" />
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
      Copyright @2023
      <a
        class="hover mx-1 sec-color"
        href="https://github.com/Himmelbleu/cnblogs-theme-lite"
        target="__blank">
        Himmelbleu
      </a>
      Powered by Vue3 on Vite.
    </div>
  </div>
  <div
    id="rmask"
    :class="{ 'r-px-250 w-vw-20': !rhidden, 'r-px-0 w-vw-10': rhidden }"
    class="z-999 fixed t-vh-25 h-vh-50" />
  <RCabinet :class="{ 'show-rcabinet': !rhidden, 'hidden-rcabinet': rhidden }" />
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
