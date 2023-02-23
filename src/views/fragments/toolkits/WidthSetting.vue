<script setup lang="ts">
import { getSetting } from "@/utils/common";

const setting = getSetting();
const disabled = ref(inspect());

function inspect() {
  if (setting.value.cabinet.pinLeft || setting.value.cabinet.pinRight) {
    setting.value.contentWidth = 50;
    return false;
  } else {
    return true;
  }
}

watch(setting, (val, old) => {
  if (val.cabinet.pinLeft != old.cabinet.pinLeft || val.cabinet.pinRight != old.cabinet.pinRight) {
    disabled.value = inspect();
  }

  document.querySelector("html").style.setProperty("--cabinet-width", val.cabinet.width + "rem");
  document.querySelector("html").style.setProperty("--content-width", val.contentWidth + "vw");
});
</script>

<template>
  <div>
    <div class="mb-2">设置陈列柜宽度</div>
    <el-slider :min="13" :step="0.5" :max="20" v-model="setting.cabinet.width" size="small" />
  </div>
  <div class="mt-4">
    <div class="mb-2">设置中间内容宽度</div>
    <el-slider :disabled="!disabled" :min="50" :step="1" :max="60" v-model="setting.contentWidth" size="small" />
  </div>
</template>

<style scoped lang="scss"></style>
