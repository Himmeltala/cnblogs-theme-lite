<script setup lang="ts">
import { pcDevice } from "@/lite.config";
import { getSetting } from "@/utils/common";

const setting = getSetting();
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
    <span><span v-show="!setting.openPager">隐藏</span><span v-show="setting.openPager">开启</span>翻页按钮</span>
    <el-switch v-model="setting.openPager" size="small" class="ml-2" style="--el-switch-on-color: var(--l-theme-color)" />
  </div>
  <div v-if="pcDevice" class="mt-4 f-c-s">
    <div>GitHub 角标</div>
    <el-select size="small" v-model="setting.githubPostion" class="ml-2">
      <el-option v-for="item in positions" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </div>
</template>

<style scoped lang="scss"></style>
