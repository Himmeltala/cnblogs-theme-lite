<script setup lang="ts">
import { getSetting } from "@/utils/common";
import { blogApp, pcDevice } from "@/lite.config";

const route = useRoute();
const setting = getSetting();
const ldisabled = ref(true);
const rdisabled = ref(true);

onMounted(() => {
  document.getElementById("l-lstrip").onclick = () => {
    ldisabled.value = !ldisabled.value;
  };

  document.getElementById("l-rstrip").onclick = () => {
    rdisabled.value = !rdisabled.value;
  };

  document.getElementById("l-matte").onclick = () => {
    if (!ldisabled.value) ldisabled.value = true;
    else if (!rdisabled.value) rdisabled.value = true;
  };
});

watch(route, async () => {
  if (route.name === "home") {
    document.querySelector("title").innerText = `${blogApp} - 博客园`;
  }
});
</script>

<template>
  <div id="l-left">
    <GitHub />
    <Background />
    <div
      id="l-lstrip"
      v-show="!setting.cabinet.left.pin"
      class="fixed z-2 left-0 top-47.5vh w-5px h-5vh rd-2 cursor-pointer opacity-70 l-strip-bg"></div>
    <Suspense>
      <LeftCabinet :disabled="ldisabled" />
    </Suspense>
    <Progress />
  </div>
  <div id="l-content" class="z-1 l-transition">
    <div id="l-nail"></div>
    <div :class="{ 'l-box-bg': !setting.card.open, 'py-2 px-4': !pcDevice }">
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
    </div>
    <Copyright />
  </div>
  <div id="l-right">
    <div id="l-matte" class="fixed top-0 left-0 z-3 opacity-50 l-matee-bg" :class="{ 'w-100% h-100vh': !rdisabled || !ldisabled }"></div>
    <div
      id="l-rstrip"
      v-show="!setting.cabinet.right.pin"
      class="fixed z-2 right-0 top-47.5vh w-5px h-5vh rd-2 cursor-pointer opacity-70 l-strip-bg"></div>
    <RightCabinet :disabled="rdisabled" />
    <ToolKits />
  </div>
</template>

<style scoped lang="scss">
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

.l-transition {
  animation: transition-animation 0.5s ease-in;

  @keyframes transition-animation {
    @for $index from 0 to 10 {
      #{$index * 10%} {
        opacity: math.div($index, 10);
      }
    }
  }
}
</style>
