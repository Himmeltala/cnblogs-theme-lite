<script setup lang="ts">
import { pcDevice } from "@/lite.config";
import { useToolKitsSettingStore } from "@/store";

const { toolKitsSetting } = storeToRefs(useToolKitsSettingStore());
const collapseActive = ref("1");
</script>

<template>
  <el-dialog draggable v-model="toolKitsSetting" title="自定义博客" align-center width="25rem">
    <el-collapse v-model="collapseActive" accordion>
      <el-collapse-item v-if="pcDevice">
        <template #title>
          <span class="fsz-1">陈列柜设置</span>
        </template>
        <CabinetSetting />
      </el-collapse-item>
      <el-collapse-item v-if="pcDevice">
        <template #title>
          <span class="fsz-1">宽度设置</span>
        </template>
        <WidthSetting />
      </el-collapse-item>
      <el-collapse-item>
        <template #title>
          <span class="fsz-1">主题设置</span>
        </template>
        <ThemeSetting />
      </el-collapse-item>
      <el-collapse-item>
        <template #title>
          <span class="fsz-1">其他设置</span>
        </template>
        <OtherSetting />
      </el-collapse-item>
      <el-collapse-item>
        <template #title>
          <span class="fsz-1">管理设置</span>
        </template>
        <ManageSetting />
      </el-collapse-item>
      <el-collapse-item>
        <template #title>
          <span class="fsz-1">隐藏设置</span>
        </template>
        <SecrecySetting />
      </el-collapse-item>
    </el-collapse>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
