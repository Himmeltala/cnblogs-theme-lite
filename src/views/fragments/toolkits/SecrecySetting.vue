<script setup lang="ts">
import { pcDevice } from "@/lite.config";
import { getSetting } from "@/utils/common";

const setting = getSetting();
</script>

<template>
  <div v-if="pcDevice">
    <el-tooltip content="建议开启，具体请阅读仓库自述文件。" placement="top">
      <span>博客数据从<span v-show="!setting.cabinet.remote">本地</span><span v-show="setting.cabinet.remote">远程</span>加载</span>
    </el-tooltip>
    <el-switch v-model="setting.cabinet.remote" size="small" class="ml-2" style="--el-switch-on-color: var(--l-theme-color)" />
  </div>
</template>
