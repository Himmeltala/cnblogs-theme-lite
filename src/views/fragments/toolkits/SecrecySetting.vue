<script setup lang="ts">
import { pcDevice } from "@/lite.config";
import { getSetting } from "@/utils/common";

const setting = getSetting();
</script>

<template>
  <div v-if="pcDevice">
    <span>博客数据从<span v-show="!setting.cabinet.remote">本地</span><span v-show="setting.cabinet.remote">远程</span>加载</span>
    <el-switch v-model="setting.cabinet.remote" size="small" class="ml-2" style="--el-switch-on-color: var(--l-theme-color)" />
    <div class="mt-4 l-fiv-size l-thr-color">博客园自带一个国外请求，导致加载变慢，所以建议开启该选项，具体阅读仓库自述文件。</div>
  </div>
</template>
