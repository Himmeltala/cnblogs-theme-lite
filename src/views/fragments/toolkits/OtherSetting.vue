<script setup lang="ts">
import { useStorage } from "@vueuse/core";
import { blogApp, pcDevice } from "@/lite.config";
import { CustType } from "@/types/data-type";

const settings = useStorage<CustType.Settings>(`l-${blogApp}-settings`, {});
const positions = [
  {
    label: "靠左",
    value: "left"
  },
  {
    label: "靠右",
    value: "right"
  }
];
</script>

<template>
  <div v-if="pcDevice">
    <span><span v-show="!settings.openPager">隐藏</span><span v-show="settings.openPager">开启</span>翻页按钮</span>
    <el-switch v-model="settings.openPager" size="small" class="ml-2" style="--el-switch-on-color: var(--l-theme-color)" />
  </div>
  <div v-if="pcDevice" class="mt-4 f-c-s">
    <div>GitHub 角标</div>
    <el-select size="small" v-model="settings.cornerPosition" class="ml-2">
      <el-option v-for="item in positions" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </div>
</template>

<style scoped lang="scss"></style>
