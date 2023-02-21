<script setup lang="ts">
import { blogApp } from "@/lite.config";
import { useStorage } from "@vueuse/core";
import { CustType } from "@/types/data-type";

const settings = useStorage<CustType.Settings>(`l-${blogApp}-settings`, {});
const colors = ref([
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

watch(settings, val => {
  document.querySelector("html").style.setProperty("--l-theme-color", val.themeColor);
});
</script>

<template>
  <div>
    <span class="mr-2">设置主题颜色</span>
    <el-color-picker size="small" :predefine="colors" show-alpha v-model="settings.themeColor" />
  </div>
</template>

<style scoped lang="scss"></style>
