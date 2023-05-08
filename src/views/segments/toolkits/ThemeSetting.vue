<script setup lang="ts">
const localSetting = LiteUtils.getLocalSetting();
const active = ref("1");

const computeThemeColor = computed({
  get: () => localSetting.value.theme.color,
  set(value) {
    localSetting.value.theme.color = value;
    LiteConfig.eleHtml.style.setProperty(LiteConstants.CssVars.themeColor, value);
  }
});

const computeBgFilter = computed({
  get: () => localSetting.value.background.filter,
  set(value) {
    localSetting.value.background.filter = value;
    LiteConfig.eleHtml.style.setProperty(LiteConstants.CssVars.bgFilter, value + "px");
  }
});

const computeMainFont = computed({
  get: () => localSetting.value.theme.mainFont,
  set(value) {
    localSetting.value.theme.mainFont = value;
    LiteConfig.eleHtml.style.setProperty(LiteConstants.CssVars.mainFont, value);
  }
});

const computeCodeFont = computed({
  get: () => localSetting.value.theme.codeFont,
  set(value) {
    localSetting.value.theme.codeFont = value;
    LiteConfig.eleHtml.style.setProperty(LiteConstants.CssVars.codeFont, value);
  }
});

let dark: HTMLElement;
let light: HTMLElement;
let bgImg: HTMLElement;

onMounted(() => {
  bgImg = document.getElementById("l-background__img");
  bgImg.setAttribute("src", localSetting.value.background.src);
  dark = document.querySelector("html[class='dark']");
  dark && dark.style.setProperty(LiteConstants.CssVars.boxBg, localSetting.value.theme.darkBgColor);
  light = document.querySelector("html[class='light']");
  light && light.style.setProperty(LiteConstants.CssVars.boxBg, localSetting.value.theme.darkBgColor);
});

const computeBgImg = computed({
  get: () => localSetting.value.background.src,
  set(value) {
    localSetting.value.background.src = value;
    document.getElementById("l-background__img").setAttribute("src", value);
  }
});

const computeLightBgColor = computed({
  get: () => localSetting.value.theme.lightBgColor,
  set(value) {
    localSetting.value.theme.lightBgColor = value;
    light && light.style.setProperty(LiteConstants.CssVars.boxBg, localSetting.value.theme.lightBgColor);
  }
});

const computeDarkBgColor = computed({
  get: () => localSetting.value.theme.darkBgColor,
  set(value) {
    localSetting.value.theme.darkBgColor = value;
    dark && dark.style.setProperty(LiteConstants.CssVars.boxBg, localSetting.value.theme.darkBgColor);
  }
});

const computedFontSizeRatio = computed({
  get() {
    for (let i = 0; i < 12; i++) {
      LiteConfig.eleHtml.style.setProperty(`--l-size-${i + 1}`, `${0.7 + (i + 1) * localSetting.value.theme.fontSizeRatio}rem`);
    }
    return localSetting.value.theme.fontSizeRatio;
  },
  set(value) {
    localSetting.value.theme.fontSizeRatio = value;
    for (let i = 0; i < 12; i++) {
      LiteConfig.eleHtml.style.setProperty(`--l-size-${i + 1}`, `${0.7 + (i + 1) * value}rem`);
    }
  }
});

function setFontLevelColor(level: number | string, value: string) {
  LiteConfig.eleHtml.style.setProperty(`--l-color-${level}`, `${value}`);
}

const computeFontLevel1Color = computed({
  get() {
    setFontLevelColor(1, localSetting.value.theme.fontColor[0]);
    return localSetting.value.theme.fontColor[0];
  },
  set(value) {
    localSetting.value.theme.fontColor[0] = value;
    setFontLevelColor(1, value);
  }
});

const computeFontLevel2Color = computed({
  get() {
    setFontLevelColor(2, localSetting.value.theme.fontColor[1]);
    return localSetting.value.theme.fontColor[1];
  },
  set(value) {
    localSetting.value.theme.fontColor[1] = value;
    setFontLevelColor(2, value);
  }
});

const computeFontLevel3Color = computed({
  get() {
    setFontLevelColor(3, localSetting.value.theme.fontColor[2]);
    return localSetting.value.theme.fontColor[2];
  },
  set(value) {
    localSetting.value.theme.fontColor[2] = value;
    setFontLevelColor(3, value);
  }
});
</script>

<template>
  <div class="l-size-2">
    <el-collapse v-model="active" accordion>
      <el-collapse-item title="基本设置">
        <div class="mb-4">
          <span class="mr-2">设置主题颜色</span>
          <el-color-picker size="small" :predefine="LiteConstants.ThemeColors" show-alpha v-model="computeThemeColor" />
        </div>
        <div class="mb-4">
          <div class="mb-2">设置白天背景颜色</div>
          <el-color-picker size="small" :predefine="LiteConstants.ThemeColors" show-alpha v-model="computeLightBgColor" />
        </div>
        <div class="mb-4">
          <div class="mb-2">设置夜晚背景颜色</div>
          <el-color-picker size="small" :predefine="LiteConstants.ThemeColors" show-alpha v-model="computeDarkBgColor" />
        </div>
        <div class="mb-4">
          <span v-show="localSetting.card.open">开启</span>
          <span v-show="!localSetting.card.open">关闭</span>卡片样式
          <el-switch v-model="localSetting.card.open" size="small" class="ml-2" style="--el-switch-on-color: var(--l-theme-color)" />
        </div>
        <div>
          <span v-show="localSetting.background.open">开启</span>
          <span v-show="!localSetting.background.open">关闭</span>背景图片
          <el-switch size="small" class="ml-2" v-model="localSetting.background.open" style="--el-switch-on-color: var(--l-theme-color)" />
        </div>
      </el-collapse-item>
      <el-collapse-item title="边距设置">
        <div class="mb-4">
          <div class="mb-2">设置上边距</div>
          <el-input-number size="small" v-model="localSetting.theme.margin.top" :precision="2" :min="0" :step="0.1" :max="10" />
        </div>
        <div>
          <div class="mb-2">设置下边距</div>
          <el-input-number size="small" v-model="localSetting.theme.margin.bottom" :precision="2" :min="0" :step="0.1" :max="10" />
        </div>
      </el-collapse-item>
      <el-collapse-item title="字体样式设置">
        <div class="mb-4">
          <div class="mb-2">主要字体样式</div>
          <el-input size="small" v-model="computeMainFont" placeholder="默认字体样式" />
        </div>
        <div class="mb-4">
          <div class="mb-2">代码字体样式</div>
          <el-input size="small" v-model="computeCodeFont" />
        </div>
        <div class="mb-4">
          <div class="mb-2">各级别字体差异比率</div>
          <el-input-number size="small" v-model="computedFontSizeRatio" :precision="2" :min="0.1" :step="0.01" :max="0.2" />
        </div>
        <div class="mb-4">
          <span class="mr-2">一级字体颜色</span>
          <el-color-picker size="small" :predefine="LiteConstants.ThemeColors" show-alpha v-model="computeFontLevel1Color" />
        </div>
        <div class="mb-4">
          <span class="mr-2">二级字体颜色</span>
          <el-color-picker size="small" :predefine="LiteConstants.ThemeColors" show-alpha v-model="computeFontLevel2Color" />
        </div>
        <div>
          <span class="mr-2">三级字体颜色</span>
          <el-color-picker size="small" :predefine="LiteConstants.ThemeColors" show-alpha v-model="computeFontLevel3Color" />
        </div>
      </el-collapse-item>
      <el-collapse-item title="卡片样式设置" v-show="localSetting.card.open">
        <div class="mb-4">
          <div class="mb-2">设置卡片背景颜色</div>
          <el-color-picker size="small" :predefine="LiteConstants.ThemeColors" show-alpha v-model="localSetting.card.color" />
        </div>
        <div class="mb-4">
          <div class="mb-2">设置卡片圆角单位</div>
          <el-input-number size="small" v-model="localSetting.card.radius" :precision="2" :min="0.5" :step="0.5" :max="30" />
        </div>
      </el-collapse-item>
      <el-collapse-item title="背景样式设置" v-show="localSetting.background.open">
        <div class="mb-4">
          <div class="mb-2">图片网络地址</div>
          <el-input size="small" v-model="computeBgImg" placeholder="请输入网络地址" />
        </div>
        <div>
          <div class="mb-2">背景毛玻璃效果</div>
          <el-slider v-model="computeBgFilter" />
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
