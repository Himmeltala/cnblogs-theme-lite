<script setup lang="ts">
import { getSetting } from "@/utils/common";

const setting = getSetting();
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

watch(setting, (val, old) => {
  document.querySelector("html").style.setProperty("--l-theme-color", val.themeColor);
  document.querySelector("html").style.setProperty("--l-bg-filter", val.background.filter + "px");
});
</script>

<template>
  <div class="mb-4">
    <span class="mr-2">设置主题颜色</span>
    <el-color-picker size="small" :predefine="colors" show-alpha v-model="setting.themeColor" />
  </div>
  <el-collapse>
    <el-collapse-item title="卡片样式设置">
      <div class="mb-4">
        <span><span v-show="setting.themeCard.open">开启</span><span v-show="!setting.themeCard.open">关闭</span>卡片样式</span>
        <el-switch v-model="setting.themeCard.open" size="small" class="ml-2" style="--el-switch-on-color: var(--l-theme-color)" />
      </div>
      <div class="mb-4">
        <div class="mb-2">设置卡片背景颜色</div>
        <el-color-picker size="small" :predefine="colors" show-alpha v-model="setting.themeCard.color" />
      </div>
      <div>
        <div class="mb-2">设置卡片圆角单位</div>
        <el-input-number size="small" v-model="setting.themeCard.radius" :precision="2" :min="0.5" :step="0.5" :max="30" />
      </div>
    </el-collapse-item>
  </el-collapse>
  <el-collapse>
    <el-collapse-item title="背景样式设置">
      <div class="mb-4">
        <div class="mb-2">设置背景图片</div>
        <el-input size="small" v-model="setting.background.src" placeholder="请输入网络地址" />
      </div>
      <div>
        <div class="mb-2">设置背景毛玻璃效果</div>
        <el-slider v-model="setting.background.filter" />
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<style scoped lang="scss"></style>
