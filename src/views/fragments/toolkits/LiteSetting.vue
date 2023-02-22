<script setup lang="ts">
import { pcDevice } from "@/lite.config";
import { useToolKitsSettingStore } from "@/store";

const { toolKitsSetting } = storeToRefs(useToolKitsSettingStore());
const collapseActive = ref("1");
</script>

<template>
  <el-dialog draggable v-model="toolKitsSetting" title="自定义博客" align-center width="25rem">
    <el-collapse v-model="collapseActive" accordion>
      <el-collapse-item title="陈列柜设置" v-if="pcDevice">
        <CabinetSetting />
      </el-collapse-item>
      <el-collapse-item title="宽度设置" v-if="pcDevice">
        <WidthSetting />
      </el-collapse-item>
      <el-collapse-item title="主题设置">
        <ThemeSetting />
      </el-collapse-item>
      <el-collapse-item title="其他设置">
        <OtherSetting />
      </el-collapse-item>
      <el-collapse-item title="管理设置">
        <ManageSetting />
      </el-collapse-item>
      <el-collapse-item title="隐藏设置">
        <SecrecySetting />
      </el-collapse-item>
    </el-collapse>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
