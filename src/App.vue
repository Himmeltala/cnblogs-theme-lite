<script setup lang="ts">
const route = useRoute();
const setting = LiteUtils.getLocalSetting();
const ldisabled = ref(true);
const rdisabled = ref(true);
const catalogDisabled = ref(!LiteConfig.pcDevice);
provide(ProvideKey.CATALOG_DISABLED, catalogDisabled);

onMounted(() => {
  document.getElementById("l-lstrip").onmouseover = () => {
    ldisabled.value = !ldisabled.value;
  };

  document.getElementById("l-rstrip").onmouseover = () => {
    rdisabled.value = !rdisabled.value;
  };

  document.getElementById("l-matte").onclick = () => {
    if (!ldisabled.value) ldisabled.value = true;
    else rdisabled.value = true;
  };

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
    <div id="l-matte" class="fixed top-0 left-0 z-3 l-matee-bg" :class="{ 'w-100% h-100vh': !rdisabled || !ldisabled }"></div>
    <div id="l-lstrip" class="fixed z-2 left-0 top-20vh w-2 h-20vh"></div>
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
    <div id="l-rstrip" class="fixed z-2 right-0 top-20vh w-2 h-20vh"></div>
    <RightCabinet :disabled="rdisabled" />
    <ToolKits />
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
    <a
      id="l-github"
      class="fixed top-0 w-15 h-15 border-0 z-1"
      :style="{ transform: setting.other.github.position === 'right' ? 'rotate(90deg)' : 'rotate(0deg)' }"
      :class="{ 'left-0': setting.other.github.position === 'left', 'right-0': setting.other.github.position === 'right' }"
      :href="LiteConfig.__LITE_CONFIG__.github"
      target="_blank">
      <svg viewBox="0 0 250 250" style="color: #fff">
        <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
        <path
          d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
          fill="currentColor"
          style="transform-origin: 130px 106px"
          class="octo-arm"></path>
        <path
          d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
          fill="currentColor"></path>
      </svg>
    </a>
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

  #l-github {
    display: none;
  }
}

#l-github {
  &:hover .octo-arm {
    animation: octocat-wave 560ms ease-in-out;
  }

  svg {
    fill: var(--el-color-primary);
    transform: scale(-1, 1);
  }
}

@keyframes octocat-wave {
  0%,
  100% {
    transform: rotate(0);
  }

  20%,
  60% {
    transform: rotate(-25deg);
  }

  40%,
  80% {
    transform: rotate(10deg);
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
