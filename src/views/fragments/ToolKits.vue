<script setup lang="ts">
import $ from "jquery";
import { useStorage } from "@vueuse/core";

function moveToTopNail() {
  document.querySelector("#top-nail").scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "start"
  });
}

const daytime = ref<"light" | "dark">("dark");

function changeDayTime() {
  if (daytime.value === "dark") {
    $("html").attr("class", "light");
    daytime.value = "light";
  } else {
    $("html").attr("class", "dark");
    daytime.value = "dark";
  }
}

const disToolKits = ref(true);
const colorDialog = ref(false);
const themeColor = useStorage("l-theme-color", "");
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
  $("html").css({
    "--l-theme-color": themeColor.value
  });
  colorDialog.value = !colorDialog.value;
}
</script>

<template>
  <div id="toolkits" class="noselect fixed right-15 top-75vh fsz-1.1">
    <div class="relative">
      <div
        :class="{ 'show-back-top l-box-bg': disToolKits, 'close-back-top': !disToolKits }"
        class="back-top absolute left-0 w-8 h-8 f-c-c"
        @click="moveToTopNail">
        <el-tooltip content="回到顶部" placement="left">
          <div class="hover f-c-c">
            <i-ep-top />
          </div>
        </el-tooltip>
      </div>
      <div
        @click="colorDialog = !colorDialog"
        :class="{ 'show-magic-stick l-box-bg': disToolKits, 'close-magic-stick': !disToolKits }"
        class="magic-stick absolute left-0 w-8 h-8 f-c-c">
        <el-tooltip content="切换主题颜色" placement="left">
          <div class="hover f-c-c">
            <i-ep-magic-stick />
          </div>
        </el-tooltip>
      </div>
      <div
        :class="{ 'show-daytime l-box-bg': disToolKits, 'close-daytime': !disToolKits }"
        @click="changeDayTime"
        class="daytime absolute left-0 w-8 h-8 f-c-c">
        <el-tooltip content="切换昼夜模式" placement="left">
          <div class="hover f-c-c">
            <template v-if="daytime === 'light'">
              <i-ep-sunny />
            </template>
            <template v-else>
              <i-ep-moon />
            </template>
          </div>
        </el-tooltip>
      </div>
      <div
        @click="disToolKits = !disToolKits"
        :class="{ 'show-toolkits': disToolKits, 'close-toolkits': !disToolKits }"
        class="kits-box absolute top-30 left-0 w-8 h-8 f-c-c l-box-bg">
        <el-tooltip content="收起工具箱" placement="left">
          <div class="hover f-c-c">
            <i-ep-arrow-right />
          </div>
        </el-tooltip>
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
.show-back-top {
  animation: show-back-top-animation 0.4s ease-in;
  top: 0;
}

.close-back-top {
  animation: close-back-top-animation 0.4s ease-in;
  top: 7.5rem;
  z-index: -1;
}

@keyframes show-back-top-animation {
  @for $i from 0 to 10 {
    #{$i * 10%} {
      top: 7.5rem - $i * 0.75rem;
    }
  }
}

@keyframes close-back-top-animation {
  @for $i from 0 to 10 {
    #{$i * 10%} {
      top: $i * 0.75rem;
    }
  }
}

.show-magic-stick {
  animation: show-magic-stick-animation 0.3s ease-in;
  top: 2.5rem;
}

.close-magic-stick {
  animation: close-magic-stick-animation 0.3s ease-in;
  top: 7.5rem;
  z-index: -1;
}

@keyframes show-magic-stick-animation {
  @for $i from 0 to 10 {
    #{$i * 10%} {
      top: $i * 0.25rem;
    }
  }
}

@keyframes close-magic-stick-animation {
  @for $i from 0 to 10 {
    #{$i * 10%} {
      top: 2.5rem + $i * 0.5rem;
    }
  }
}

.show-daytime {
  animation: show-daytime-animation 0.2s ease-in;
  top: 5rem;
}

.close-daytime {
  animation: close-daytime-animation 0.2s ease-in;
  top: 7.5rem;
  z-index: -1;
}

@keyframes show-daytime-animation {
  @for $i from 0 to 10 {
    #{$i * 10%} {
      top: $i * 0.5rem;
    }
  }
}

@keyframes close-daytime-animation {
  @for $i from 0 to 10 {
    #{$i * 10%} {
      top: 5rem + $i * 0.25rem;
    }
  }
}

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
