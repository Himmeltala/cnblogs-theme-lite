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

watch(settings, (val, old) => {
  if (val.themeColor != old.themeColor) {
    document.querySelector("html").style.setProperty("--l-theme-color", val.themeColor);
  }
  document.querySelector("html").style.setProperty("--l-bg-filter", val.bgFilter + "px");
});
</script>

<template>
  <div class="mb-4">
    <span class="mr-2">设置主题颜色</span>
    <el-color-picker size="small" :predefine="colors" show-alpha v-model="settings.themeColor" />
  </div>
  <el-collapse>
    <el-collapse-item title="卡片样式设置">
      <div class="mb-4">
        <span><span v-show="settings.themeCard.open">开启</span><span v-show="!settings.themeCard.open">关闭</span>卡片样式</span>
        <el-switch v-model="settings.themeCard.open" size="small" class="ml-2" style="--el-switch-on-color: var(--l-theme-color)" />
      </div>
      <div class="mb-4">
        <span class="mr-2">设置卡片背景颜色</span>
        <el-color-picker size="small" :predefine="colors" show-alpha v-model="settings.themeCard.color" />
      </div>
      <div>
        <span class="mr-2">设置卡片圆角单位</span>
        <el-input-number size="small" v-model="settings.themeCard.radius" :precision="2" :min="0.5" :step="0.5" :max="30" />
      </div>
    </el-collapse-item>
  </el-collapse>
  <el-collapse>
    <el-collapse-item title="背景样式设置">
      <div class="mb-4 f-c-s">
        <span class="mr-2 w-28%">设置背景图片</span>
        <el-input class="w-60%" size="small" v-model="settings.bgImage" placeholder="请输入网络地址" />
      </div>
      <div>
        <div class="mb-2">设置背景毛玻璃效果</div>
        <el-slider v-model="settings.bgFilter" />
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<style scoped lang="scss"></style>
