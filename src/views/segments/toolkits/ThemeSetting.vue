<script setup lang="ts">
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
const collapseActive = ref("1");

watch(LiteConfig.localSetting, newVal => {
  LiteConfig.eleHtml.style.setProperty("--l-theme-color", newVal.theme.color);
  LiteConfig.eleHtml.style.setProperty("--l-bg-filter", newVal.background.filter + "px");
});
</script>

<template>
  <div class="l-size-2">
    <div class="mb-4">
      <span class="mr-2">设置主题颜色</span>
      <el-color-picker size="small" :predefine="colors" show-alpha v-model="LiteConfig.localSetting.theme.color" />
    </div>
    <div class="mb-4">
      <span v-show="LiteConfig.localSetting.card.open">开启</span>
      <span v-show="!LiteConfig.localSetting.card.open">关闭</span>卡片样式
      <el-switch v-model="LiteConfig.localSetting.card.open" size="small" class="ml-2" style="--el-switch-on-color: var(--l-theme-color)" />
    </div>
    <div class="mb-4">
      <span v-show="LiteConfig.localSetting.background.open">开启</span>
      <span v-show="!LiteConfig.localSetting.background.open">关闭</span>背景图片
      <el-switch
        size="small"
        class="ml-2"
        v-model="LiteConfig.localSetting.background.open"
        style="--el-switch-on-color: var(--l-theme-color)" />
    </div>
    <div class="mb-4">
      <div class="mb-2">主要字体</div>
      <el-input size="small" v-model="LiteConfig.localSetting.theme.mainFont" />
    </div>
    <div class="mb-4">
      <div class="mb-2">代码字体</div>
      <el-input size="small" v-model="LiteConfig.localSetting.theme.codeFont" />
    </div>
    <el-collapse v-model="collapseActive" accordion>
      <el-collapse-item title="卡片样式设置" v-show="LiteConfig.localSetting.card.open">
        <div class="mb-4">
          <div class="mb-2">设置卡片背景颜色</div>
          <el-color-picker size="small" :predefine="colors" show-alpha v-model="LiteConfig.localSetting.card.color" />
        </div>
        <div class="mb-4">
          <div class="mb-2">设置卡片圆角单位</div>
          <el-input-number size="small" v-model="LiteConfig.localSetting.card.radius" :precision="2" :min="0.5" :step="0.5" :max="30" />
        </div>
      </el-collapse-item>
      <el-collapse-item title="背景样式设置" v-show="LiteConfig.localSetting.background.open">
        <div class="mb-4">
          <div class="mb-2">图片网络地址</div>
          <el-input size="small" v-model="LiteConfig.localSetting.background.src" placeholder="请输入网络地址" />
        </div>
        <div>
          <div class="mb-2">背景毛玻璃效果</div>
          <el-slider v-model="LiteConfig.localSetting.background.filter" />
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
