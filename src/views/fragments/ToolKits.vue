<script setup lang="ts">
import { blogApp } from "@/lite.config";
import { useStorage } from "@vueuse/core";
import { nav } from "@/helpers/route-helper";

function moveToTopNail() {
  document.querySelector("#top-nail").scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "start"
  });
}

const themeMode = ref<"light" | "dark">("dark");

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

const disToolKits = useStorage(`dis-${blogApp}-tool-kits`, false);
const colorDialog = ref(false);
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

function changeThemeColor() {
  document.querySelector("html").style.setProperty("--l-theme-color", themeColor.value);
  colorDialog.value = !colorDialog.value;
}

const route = useRoute();
const router = useRouter();
const disBack = ref(false);
const iconType = ref<"backArrow" | "home">("backArrow");

watch(route, val => {
  if (val.name === "essay") {
    disBack.value = true;
    iconType.value = "home";
  } else if (val.name === "sort" || val.name === "label") {
    disBack.value = true;
    iconType.value = "backArrow";
  } else {
    disBack.value = false;
  }
});
</script>

<template>
  <div id="toolkits" class="noselect fixed right-15 top-75vh fsz-1.1">
    <div class="relative">
      <div
        v-show="disBack"
        :class="{ 'show-back-home l-box-bg': disToolKits, 'close-back-home': !disToolKits }"
        class="back-home absolute left-0 w-8 h-8 f-c-c">
        <div class="hover f-c-c">
          <div v-if="iconType === 'home'" @click="nav({ path: '/', router })">
            <i-ep-house />
          </div>
          <div v-else-if="iconType === 'backArrow'" @click="nav({ path: 'back', router })">
            <i-ep-back />
          </div>
        </div>
      </div>
      <div
        :class="{ 'show-back-top l-box-bg': disToolKits, 'close-back-top': !disToolKits }"
        class="back-top absolute hover left-0 w-8 h-8 f-c-c"
        @click="moveToTopNail">
        <i-ep-position />
      </div>
      <div
        @click="colorDialog = !colorDialog"
        :class="{ 'show-magic-stick l-box-bg': disToolKits, 'close-magic-stick': !disToolKits }"
        class="magic-stick absolute hover left-0 w-8 h-8 f-c-c">
        <i-ep-magic-stick />
      </div>
      <div
        :class="{ 'show-daytime l-box-bg': disToolKits, 'close-daytime': !disToolKits }"
        @click="changeDayTime"
        class="daytime absolute hover left-0 w-8 h-8 f-c-c">
        <template v-if="themeMode === 'light'">
          <i-ep-sunny />
        </template>
        <template v-else>
          <i-ep-moon />
        </template>
      </div>
      <div
        @click="disToolKits = !disToolKits"
        :class="{ 'show-toolkits': disToolKits, 'close-toolkits': !disToolKits }"
        class="kits-box absolute hover top-40 left-0 w-8 h-8 f-c-c l-box-bg">
        <i-ep-arrow-right />
      </div>
    </div>
    <el-dialog v-model="colorDialog" title="修改主题颜色" align-center width="25rem">
      <div>
        <span class="demonstration">当前选择的颜色：</span>
        <el-color-picker :predefine="preColors" show-alpha v-model="themeColor" />
      </div>
      <el-button @click="changeThemeColor" type="primary" class="mt-4" size="small">确定</el-button>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
// 从随笔返回到主页
.show-back-home {
  animation: show-back-home-animation 0.5s ease-in;
  top: 0;
}

.close-back-home {
  animation: close-back-home-animation 0.5s ease-in;
  top: 10rem;
  z-index: -1;
}

@keyframes show-back-home-animation {
  @for $i from 0 to 10 {
    #{$i * 10%} {
      top: 10rem - $i * 1rem;
    }
  }
}

@keyframes close-back-home-animation {
  @for $i from 0 to 10 {
    #{$i * 10%} {
      top: $i * 1rem;
    }
  }
}

// 返回到顶部
.show-back-top {
  animation: show-back-top-animation 0.4s ease-in;
  top: 2.5rem;
}

.close-back-top {
  animation: close-back-top-animation 0.4s ease-in;
  top: 10rem;
  z-index: -1;
}

@keyframes show-back-top-animation {
  @for $i from 0 to 10 {
    #{$i * 10%} {
      top: $i * 0.25rem;
    }
  }
}

@keyframes close-back-top-animation {
  @for $i from 0 to 10 {
    #{$i * 10%} {
      top: 2.5rem + $i * 0.75rem;
    }
  }
}

// 修改主题颜色
.show-magic-stick {
  animation: show-magic-stick-animation 0.3s ease-in;
  top: 5rem;
}

.close-magic-stick {
  animation: close-magic-stick-animation 0.3s ease-in;
  top: 10rem;
  z-index: -1;
}

@keyframes show-magic-stick-animation {
  @for $i from 0 to 10 {
    #{$i * 10%} {
      top: $i * 0.5rem;
    }
  }
}

@keyframes close-magic-stick-animation {
  @for $i from 0 to 10 {
    #{$i * 10%} {
      top: 5rem + $i * 0.5rem;
    }
  }
}

// 修改昼夜模式
.show-daytime {
  animation: show-daytime-animation 0.2s ease-in;
  top: 7.5rem;
}

.close-daytime {
  animation: close-daytime-animation 0.2s ease-in;
  top: 10rem;
  z-index: -1;
}

@keyframes show-daytime-animation {
  @for $i from 0 to 10 {
    #{$i * 10%} {
      top: $i * 0.75rem;
    }
  }
}

@keyframes close-daytime-animation {
  @for $i from 0 to 10 {
    #{$i * 10%} {
      top: 7.5rem + $i * 0.25rem;
    }
  }
}

// 展开或收起工具箱
.show-toolkits {
  animation: show-toolkits-animation 0.2s ease-in;
  transform: rotate(0);
}

.close-toolkits {
  animation: close-toolkits-animation 0.2s ease-in;
  transform: rotate(180deg);
}

@keyframes show-toolkits-animation {
  @for $i from 0 to 10 {
    #{$i * 10%} {
      transform: rotate(180deg - $i * 18deg);
    }
  }
}

@keyframes close-toolkits-animation {
  @for $i from 0 to 10 {
    #{$i * 10%} {
      transform: rotate($i * 18deg);
    }
  }
}
</style>
