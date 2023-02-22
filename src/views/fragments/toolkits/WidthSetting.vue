<script setup lang="ts">
import { getSetting } from "@/utils/common";

const setting = getSetting();
const isSetContentWidth = ref(false);

if (setting.value.cabinet.pinLeft || setting.value.cabinet.pinRight) {
  isSetContentWidth.value = false;
  setting.value.contentWidth = 50;
} else {
  isSetContentWidth.value = true;
}

watch(setting, (val, old) => {
  if (val.cabinet.pinLeft != old.cabinet.pinLeft || val.cabinet.pinRight != old.cabinet.pinRight) {
    if (val.cabinet.pinLeft || setting.value.cabinet.pinRight) {
      isSetContentWidth.value = false;
      setting.value.contentWidth = 50;
    } else {
      isSetContentWidth.value = true;
    }
  }

  document.querySelector("html").style.setProperty("--cabinet-width", val.cabinet.width + "rem");
  document.querySelector("html").style.setProperty("--content-width", val.contentWidth + "vw");
});
</script>

<template>
  <div>
    <div class="mb-2">设置陈列柜宽度</div>
    <el-slider :min="13" :step="0.5" :max="20" v-model="setting.cabinet.width" size="small" show-input />
  </div>
  <div class="mt-4">
    <div class="mb-2">设置中间内容宽度</div>
    <el-slider :disabled="!isSetContentWidth" :min="50" :step="1" :max="60" v-model="setting.contentWidth" size="small" show-input />
  </div>
</template>

<style scoped lang="scss"></style>
