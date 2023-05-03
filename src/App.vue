<script setup lang="ts">
const route = useRoute();
const setting = LiteUtils.getLocalSetting();
const ldisabled = ref(true);
const rdisabled = ref(true);

onMounted(() => {
  const eleL = document.getElementById("l-lstrip");
  const eleR = document.getElementById("l-rstrip");
  const eleMatte = document.getElementById("l-matte");

  eleL.onclick = () => {
    ldisabled.value = !ldisabled.value;
  };

  eleR.onclick = () => {
    rdisabled.value = !rdisabled.value;
  };

  eleMatte.onclick = () => {
    if (!ldisabled.value) ldisabled.value = true;
    else if (!rdisabled.value) rdisabled.value = true;
  };

  document.getElementById("l-background__img").setAttribute("src", setting.value.background.src);
  document.getElementById("l-background__img").setAttribute("src", setting.value.background.src);
});

watch(route, async () => {
  if (route.name === RouterName.INDEX) {
    document.querySelector("title").innerText = `${LiteConfig.blogApp} - 博客园`;
  }
});
</script>

<template>
  <div id="l-menu-container"></div>
  <div id="l-left">
    <GitHub />
    <ContextMenu>
      <div id="l-background" class="fixed left-0 top-0 w-100vw h-100vw">
        <img v-show="setting.background.src && setting.background.open" id="l-background__img" class="w-100% h-100%" />
      </div>
      <template #title> 主题设置 </template>
      <template #content>
        <ThemeSetting />
      </template>
    </ContextMenu>
    <div
      id="l-lstrip"
      v-show="!setting.cabinet.left.pin"
      class="fixed z-2 left-0 top-47.5vh w-5px h-5vh rd-2 cursor-pointer opacity-70 l-strip-bg"></div>
    <Suspense>
      <LeftCabinet :disabled="ldisabled" />
    </Suspense>
    <div id="l-progress" class="z-99 fixed left-0 top-0 w-100vw">
      <div class="track absolute top-0">
        <div class="bar rd-2"></div>
      </div>
    </div>
  </div>
  <div id="l-content" class="z-1 fade-in-out">
    <div id="l-top-nail"></div>
    <div :class="{ 'l-box-bg': !setting.card.open, 'py-2 px-4': !LiteConfig.pcDevice }">
      <div id="l-main">
        <RouterView v-slot="{ Component }">
          <template v-if="Component">
            <KeepAlive :include="[RouterName.INDEX, RouterName.MARK_LIST, RouterName.PROFILE, RouterName.WORKS_BY_CALENDAR]">
              <Suspense>
                <component :is="Component" />
              </Suspense>
            </KeepAlive>
          </template>
        </RouterView>
      </div>
    </div>
    <div id="l-bottom-nail"></div>
  </div>
  <div id="l-right">
    <div id="l-matte" class="fixed top-0 left-0 z-3 l-matee-bg" :class="{ 'w-100% h-100vh': !rdisabled || !ldisabled }"></div>
    <div
      id="l-rstrip"
      v-show="!setting.cabinet.right.pin"
      class="fixed z-2 right-0 top-47.5vh w-5px h-5vh rd-2 cursor-pointer opacity-70 l-strip-bg"></div>
    <RightCabinet :disabled="rdisabled" />
    <ToolKits />
  </div>
</template>

<style lang="scss">
#l-progress {
  height: 0.15rem;

  .bar,
  .track {
    height: 100%;
    background: var(--l-theme-color);
  }

  .bar.bar-active {
    width: 3rem;
  }

  .track.track-active {
    animation: track-active-animation 4s infinite ease-in;
  }

  @keyframes track-active-animation {
    @for $index from 0 to 25 {
      #{$index * 4%} {
        left: $index * 4vw;
      }
    }
  }

  .bar.static {
    width: 0;
  }

  .track.static {
    left: 0;
  }
}
</style>

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

#l-background::after {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  backdrop-filter: blur(var(--l-bg-filter));
}
</style>
