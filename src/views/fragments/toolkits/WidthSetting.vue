<script setup lang="ts">
import { blogApp } from "@/lite.config";
import { useStorage } from "@vueuse/core";
import { CustType } from "@/types/data-type";

const settings = useStorage<CustType.Settings>(`l-${blogApp}-settings`, {});
const isSetContentWidth = ref(false);

watch(settings, val => {
  document.querySelector("html").style.setProperty("--cabinet-width", val.cabinet.width + "rem");
  document.querySelector("html").style.setProperty("--content-width", val.contentWidth + "vw");
});

watch(settings, val => {
  if (val.cabinet.pinLeft || settings.value.cabinet.pinRight) {
    isSetContentWidth.value = false;
    settings.value.contentWidth = 50;
  } else {
    isSetContentWidth.value = true;
  }
});
</script>

<template>
  <div>
    <div class="mb-2">设置陈列柜宽度</div>
    <el-slider :min="13" :step="0.5" :max="17.5" v-model="settings.cabinet.width" size="small" show-input />
  </div>
  <div class="mt-4">
    <div class="mb-2">设置中间内容宽度</div>
    <el-slider :disabled="!isSetContentWidth" :min="50" :step="1" :max="57" v-model="settings.contentWidth" size="small" show-input />
  </div>
</template>

<style scoped lang="scss"></style>
