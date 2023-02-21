<script setup lang="ts">
import { blogApp } from "@/lite.config";
import { useStorage } from "@vueuse/core";
import { CustType } from "@/types/data-type";

const settings = useStorage<CustType.Settings>(`l-${blogApp}-settings`, {});
</script>

<template>
  <div class="mb-4">
    <span><span v-show="!settings.cabinet.pinLeft">隐藏</span><span v-show="settings.cabinet.pinLeft">固定</span>左陈列柜</span>
    <el-switch v-model="settings.cabinet.pinLeft" size="small" class="ml-2" style="--el-switch-on-color: var(--l-theme-color)" />
  </div>
  <div class="mb-4">
    <span><span v-show="!settings.cabinet.pinRight">隐藏</span><span v-show="settings.cabinet.pinRight">固定</span>右陈列柜</span>
    <el-switch v-model="settings.cabinet.pinRight" size="small" class="ml-2" style="--el-switch-on-color: var(--l-theme-color)" />
  </div>
  <div class="mb-4">
    <span><span v-show="settings.cabinet.break">脱离</span><span v-show="!settings.cabinet.break">贴住</span>中间内容</span>
    <el-switch v-model="settings.cabinet.break" size="small" class="ml-2" style="--el-switch-on-color: var(--l-theme-color)" />
  </div>
  <div class="mb-4" v-show="settings.cabinet.break">
    <div class="mb-2">左陈列柜偏移量</div>
    <el-slider v-model="settings.cabinet.left" show-input size="small" />
  </div>
  <div class="mb-4" v-show="settings.cabinet.break">
    <div class="mb-2">右陈列柜偏移量</div>
    <el-slider v-model="settings.cabinet.right" show-input size="small" />
  </div>
  <el-collapse>
    <el-collapse-item title="陈列柜项设置">
      <div v-for="(v, k, i) in settings.toggles" class="mt-4">
        <span><span v-show="!v.show">隐藏</span><span v-show="v.show">显示</span>{{ k }}项</span>
        <el-switch v-model="v.show" size="small" class="ml-2" style="--el-switch-on-color: var(--l-theme-color)" />
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<style scoped lang="scss"></style>
