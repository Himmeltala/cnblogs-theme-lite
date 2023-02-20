<script setup lang="ts">
import { blogApp, pcDevice } from "@/lite.config";
import { useStorage } from "@vueuse/core";
import { nav } from "@/utils/router-helper";

function moveToTopNail() {
  document.querySelector("#top-nail").scrollIntoView();
}

const themeMode = useStorage(`l-${blogApp}-theme-mode`, "");

function changeDayTime() {
  const html = document.querySelector("html");
  if (themeMode.value === "dark") {
    html.className = "light";
    themeMode.value = "light";
  } else {
    html.className = "dark";
    themeMode.value = "dark";
  }
}

const disToolKits = useStorage(`l-${blogApp}-dis-tool-kits`, true);
const themeColor = useStorage(`l-${blogApp}-theme-color`, "");
const preColors = ref([
  "#ff4500",
  "#ff8c00",
  "#ffd700",
  "#90ee90",
  "#00ced1",
  "#409eff",
  "#c71585",
  "rgba(255, 69, 0, 0.68)",
  "rgb(255, 120, 0)",
  "hsv(51, 100, 98)",
  "hsva(120, 40, 94, 0.5)",
  "hsl(181, 100%, 37%)",
  "hsla(209, 100%, 56%, 0.73)",
  "#c7158577"
]);

watch(themeColor, val => {
  document.querySelector("html").style.setProperty("--l-theme-color", val);
});

const router = useRouter();
const settingDialog = ref(false);

const isOpenPager = useStorage(`l-${blogApp}-open-pager`, false);
const fixedlcabinet = useStorage(`l-${blogApp}-fixed-left-cabinet`, false);
const fixedrcabinet = useStorage(`l-${blogApp}-fixed-right-cabinet`, false);
</script>

<template>
  <div id="toolkits" class="noselect fixed right-15 top-65vh fsz-1.2 z-99">
    <div class="relative">
      <div
        :class="{ 'show-0 l-box-bg': disToolKits, 'close-0': !disToolKits }"
        class="back-home absolute hover left-0 w-8 h-8 f-c-c rd-2"
        @click="nav({ path: 'back', router })">
        <i-ep-back />
      </div>
      <div
        :class="{ 'show-1 l-box-bg': disToolKits, 'close-1': !disToolKits }"
        class="back-top absolute hover left-0 w-8 h-8 f-c-c rd-2"
        @click="moveToTopNail">
        <i-ep-position />
      </div>
      <div
        :class="{ 'show-2 l-box-bg': disToolKits, 'close-2': !disToolKits }"
        @click="changeDayTime"
        class="daytime absolute hover left-0 w-8 h-8 f-c-c rd-2">
        <template v-if="themeMode === 'light'">
          <i-ep-sunny />
        </template>
        <template v-else>
          <i-ep-moon />
        </template>
      </div>
      <div
        :class="{ 'show-3 l-box-bg': disToolKits, 'close-3': !disToolKits }"
        @click="settingDialog = !settingDialog"
        class="setting absolute hover left-0 w-8 h-8 f-c-c rd-2">
        <i-ep-setting class="rotate-setting" />
      </div>
      <div
        @click="disToolKits = !disToolKits"
        :class="{ 'show-toolkits': disToolKits, 'close-toolkits': !disToolKits }"
        class="kits-box absolute hover top-40 left-0 w-8 h-8 f-c-c l-box-bg rd-2">
        <i-ep-arrow-right />
      </div>
    </div>
    <el-dialog v-model="settingDialog" title="设置博客" align-center width="25rem">
      <div class="mt-4" v-if="pcDevice">
        <span><span v-show="!fixedlcabinet">隐藏</span><span v-show="fixedlcabinet">固定</span>左陈列柜</span>
        <el-switch v-model="fixedlcabinet" size="small" class="ml-2" style="--el-switch-on-color: var(--l-theme-color)" />
      </div>
      <div class="mt-4" v-if="pcDevice">
        <span><span v-show="!fixedrcabinet">隐藏</span><span v-show="fixedrcabinet">固定</span>右陈列柜</span>
        <el-switch v-model="fixedrcabinet" size="small" class="ml-2" style="--el-switch-on-color: var(--l-theme-color)" />
      </div>
      <div class="mt-4" v-if="pcDevice">
        <span><span v-show="!isOpenPager">隐藏</span><span v-show="isOpenPager">开启</span>翻页按钮</span>
        <el-switch v-model="isOpenPager" size="small" class="ml-2" style="--el-switch-on-color: var(--l-theme-color)" />
      </div>
      <div :class="{ 'mt-4': pcDevice }">
        <span class="mr-2">设置主题颜色</span>
        <el-color-picker size="small" :predefine="preColors" show-alpha v-model="themeColor" />
      </div>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
$count: 4;
$show-top: 0;
$close-end: 10rem;

@for $index from 0 to $count {
  @if $index != 0 {
    $show-top: $show-top + 2.5rem;
  }

  .show-#{$index} {
    animation: show-#{$index}-animation math.div($index, 10) + 0.2s ease-in;
    top: $show-top;
  }

  .close-#{$index} {
    animation: close-#{$index}-animation math.div($index, 10) + 0.2s ease-in;
    top: $close-end;
    z-index: -1;
  }

  @keyframes show-#{$index}-animation {
    $show-anime-top: 0;

    @for $i from 0 to 11 {
      @if $index == 0 {
        $show-anime-top: $close-end - $i * 1rem;
      } @else {
        $show-anime-top: $i * math.div($show-top, 10);
      }

      #{$i * 10%} {
        top: $show-anime-top;
      }
    }
  }

  @keyframes close-#{$index}-animation {
    @for $i from 0 to 11 {
      #{ $i * 10%} {
        top: $show-top + $i * math.div(($close-end - $show-top), 10);
      }
    }
  }
}

.show-toolkits {
  animation: show-toolkits-animation 0.3s ease-in;
  transform: rotate(0);
}

.close-toolkits {
  animation: close-toolkits-animation 0.3s ease-in;
  transform: rotate(180deg);
}

@keyframes show-toolkits-animation {
  @for $index from 0 to 10 {
    #{$index * 10%} {
      transform: rotate(180deg - $index * 18deg);
    }
  }
}

@keyframes close-toolkits-animation {
  @for $index from 0 to 10 {
    #{$index * 10%} {
      transform: rotate($index * 18deg);
    }
  }
}

.rotate-setting:hover {
  animation: 1.5s infinite rotate-setting-animation;
}

@keyframes rotate-setting-animation {
  @for $index from 0 to 10 {
    #{$index * 10%} {
      transform: rotate($index * 36deg);
    }
  }

  @for $index from 10 to 0 {
    #{$index * 10%} {
      transform: rotate($index * 36deg);
    }
  }
}
</style>
