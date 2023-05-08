<script setup lang="ts">
const localSetting = LiteUtils.getLocalSetting();
const colors = [
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
];

const dark = document.querySelector("html[class='dark']");
const light = document.querySelector("html[class='light']");

const computeDarkColor = computed({
  get: () => localSetting.value.pages.writing.code.dark.color,
  set(value) {
    localSetting.value.pages.writing.code.dark.color = value;
    // @ts-ignore
    dark && dark.style.setProperty(LiteConstants.CssVars.codeBg, value);
  }
});

const computeLightColor = computed({
  get: () => localSetting.value.pages.writing.code.light.color,
  set(value) {
    localSetting.value.pages.writing.code.light.color = value;
    // @ts-ignore
    light && light.style.setProperty(LiteConstants.CssVars.codeBg, value);
  }
});
</script>

<template>
  <div class="mb-4">
    <span class="mr-2">设置黑夜代码块颜色</span>
    <el-color-picker size="small" :predefine="colors" show-alpha v-model="computeDarkColor" />
  </div>
  <div class="mb-4">
    <span class="mr-2">设置白天代码块颜色</span>
    <el-color-picker size="small" :predefine="colors" show-alpha v-model="computeLightColor" />
  </div>
</template>

<style scoped lang="scss"></style>
