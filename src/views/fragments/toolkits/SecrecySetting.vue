<script setup lang="ts">
import { useStorage } from "@vueuse/core";
import { blogApp, pcDevice } from "@/lite.config";
import { CustType } from "@/types/data-type";

const settings = useStorage<CustType.Settings>(`l-${blogApp}-settings`, {});
</script>

<template>
  <div v-if="pcDevice">
    <el-tooltip content="建议开启，具体请阅读仓库自述文件。" placement="top">
      <span>博客数据从<span v-show="!settings.cabinet.remote">本地</span><span v-show="settings.cabinet.remote">远程</span>加载</span>
    </el-tooltip>
    <el-switch v-model="settings.cabinet.remote" size="small" class="ml-2" style="--el-switch-on-color: var(--l-theme-color)" />
  </div>
</template>
