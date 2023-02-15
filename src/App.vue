<script setup lang="ts">
const hiddenLeft = ref(true);
const hiddenRight = ref(true);

function listener(el: string, fn: any, ev?: string) {
  document.querySelector(el).addEventListener(ev || "click", fn);
}

onMounted(() => {
  listener("#left-strip", () => {
    hiddenLeft.value = !hiddenLeft.value;
    if (!hiddenRight.value) hiddenRight.value = !hiddenRight.value;
  });
  listener("#right-strip", () => {
    hiddenRight.value = !hiddenRight.value;
    if (!hiddenLeft.value) hiddenLeft.value = !hiddenLeft.value;
  });
  listener("#full-modal", () => {
    if (!hiddenLeft.value) hiddenLeft.value = true;
    else if (!hiddenRight.value) hiddenRight.value = true;
  });
});
</script>

<template>
  <GitHub />
  <el-tooltip content="点击展示陈列柜" placement="right">
    <div
      id="left-strip"
      :class="{ 'left-250px': !hiddenLeft, 'left-0 w-6px l-strip-bg rd-2': hiddenLeft }"
      class="z-999 fixed top-40vh h-20vh cursor-pointer opacity-70"></div>
  </el-tooltip>
  <LeftCabinet :class="{ 'show-lcabinet': !hiddenLeft, 'hidden-lcabinet': hiddenLeft }" />
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
  <div
    id="full-modal"
    class="full-modal z-99 opacity-50 l-modal-bg"
    :class="{ 'fixed top-0 left-0 w-100% h-100vh': !hiddenRight || !hiddenLeft }"></div>
  <el-tooltip content="点击展示陈列柜" placement="left">
    <div
      id="right-strip"
      :class="{ 'right-250px': !hiddenRight, 'right-0 w-6px l-strip-bg rd-2': hiddenRight }"
      class="z-999 fixed top-40vh h-20vh cursor-pointer opacity-70"></div>
  </el-tooltip>
  <RightCabinet :class="{ 'show-rcabinet': !hiddenRight, 'hidden-rcabinet': hiddenRight }" />
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
