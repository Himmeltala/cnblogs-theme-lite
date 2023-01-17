<script setup lang="ts">
const nhidden = ref(true);
const lhidden = ref(true);
const rhidden = ref(true);

onMounted(() => {
  document
    .querySelector("#n-mask")
    .addEventListener("mouseover", () => (nhidden.value = !nhidden.value));
  document
    .querySelector("#l-mask")
    .addEventListener("mouseover", () => (lhidden.value = !lhidden.value));
  document
    .querySelector("#r-mask")
    .addEventListener("mouseover", () => (rhidden.value = !rhidden.value));
});
</script>

<template>
  <GitHub />
  <div
    id="n-mask"
    :class="{ 'top-15': !nhidden }"
    class="fixed z-999 h-10 w-50 top-0"
    style="left: calc(50vw - 6.25rem)"></div>
  <Navigation :class="{ 'show-nav': !nhidden, 'hidden-nav': nhidden }" />
  <div
    id="l-mask"
    :class="{ 'left-60': !lhidden }"
    class="z-999 hvh-50 fixed w-15 left-0 tpv-25"></div>
  <LShowcase :class="{ 'show-lcase': !lhidden, 'hidden-lcase': lhidden }" />
  <div id="lite-content" class="w-200 pt-5">
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <KeepAlive :include="['Home']">
          <Suspense>
            <component :is="Component" />
          </Suspense>
        </KeepAlive>
      </template>
    </RouterView>
    <div class="copyright flex pb-2 justify-center fsz-0.8 color-#878787">
      Copyright @2023
      <a
        class="hover mx-1 color-#878787"
        href="https://github.com/Himmelbleu/cnblogs-theme-lite"
        target="__blank">
        Himmelbleu
      </a>
      Powered by Vue3 on Vite.
    </div>
  </div>
  <div
    id="r-mask"
    :class="{ 'right-60': !rhidden }"
    class="z-999 hvh-50 fixed w-15 right-0 tpv-25"></div>
  <RShowcase :class="{ 'show-rcase': !rhidden, 'hidden-rcase': rhidden }" />
  <ToolKits />
</template>

<style scoped lang="scss">
$quota: 10;

.show-nav {
  animation: shownav 0.2s ease-in;
  transform: translateY(0rem);
}

@keyframes shownav {
  @for $i from 0 to $quota {
    #{$i * 10%} {
      transform: translateY(-3.75rem + ($i * 0.375rem));
    }
  }
}

.hidden-nav {
  animation: hiddennav 0.2s ease-out;
  transform: translateY(-3.75rem);
}

@keyframes hiddennav {
  @for $i from 0 to $quota {
    #{$i * 10%} {
      transform: translateY($i * -0.375rem);
    }
  }
}

.show-lcase {
  animation: showlcase 0.2s ease-in;
  transform: translateX(0rem);
}

@keyframes showlcase {
  @for $i from 0 to $quota {
    #{$i * 10%} {
      transform: translateX(-15rem + ($i * 1.5rem));
    }
  }
}

.hidden-lcase {
  animation: hiddenlcase 0.2s ease-out;
  transform: translateX(-15rem);
}

@keyframes hiddenlcase {
  @for $i from 0 to $quota {
    #{$i * 10%} {
      transform: translateX($i * -1.5rem);
    }
  }
}

.show-rcase {
  animation: showrcase 0.2s ease-in;
  transform: translateX(0rem);
}

@keyframes showrcase {
  @for $i from 0 to $quota {
    #{$i * 10%} {
      transform: translateX(15rem + ($i * -1.5rem));
    }
  }
}

.hidden-rcase {
  animation: hiddenrcase 0.2s ease-out;
  transform: translateX(15rem);
}

@keyframes hiddenrcase {
  @for $i from 0 to $quota {
    #{$i * 10%} {
      transform: translateX($i * 1.5rem);
    }
  }
}
</style>
