<script setup lang="ts">
import { getSetting } from "@/utils/common";

const setting = getSetting();
</script>

<template>
  <div class="mb-4">
    <span><span v-show="!setting.cabinet.pinLeft">隐藏</span><span v-show="setting.cabinet.pinLeft">固定</span>左陈列柜</span>
    <el-switch v-model="setting.cabinet.pinLeft" size="small" class="ml-2" style="--el-switch-on-color: var(--l-theme-color)" />
  </div>
  <div class="mb-4">
    <span><span v-show="!setting.cabinet.pinRight">隐藏</span><span v-show="setting.cabinet.pinRight">固定</span>右陈列柜</span>
    <el-switch v-model="setting.cabinet.pinRight" size="small" class="ml-2" style="--el-switch-on-color: var(--l-theme-color)" />
  </div>
  <div class="mb-4">
    <span><span v-show="setting.cabinet.break">脱离</span><span v-show="!setting.cabinet.break">贴住</span>中间内容</span>
    <el-switch v-model="setting.cabinet.break" size="small" class="ml-2" style="--el-switch-on-color: var(--l-theme-color)" />
  </div>
  <div class="mb-4" v-show="setting.cabinet.break">
    <div class="mb-2">左陈列柜偏移量</div>
    <el-slider v-model="setting.cabinet.left" size="small" />
  </div>
  <div class="mb-4" v-show="setting.cabinet.break">
    <div class="mb-2">右陈列柜偏移量</div>
    <el-slider v-model="setting.cabinet.right" size="small" />
  </div>
  <el-collapse>
    <el-collapse-item title="选项开关">
      <div v-for="(v, k, i) in setting.toggles" class="mt-4">
        <span><span v-show="!v.show">隐藏</span><span v-show="v.show">显示</span>{{ k }}项</span>
        <el-switch v-model="v.show" size="small" class="ml-2" style="--el-switch-on-color: var(--l-theme-color)" />
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<style scoped lang="scss"></style>
