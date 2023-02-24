<script setup lang="ts">
import { getSetting } from "@/utils/common";

const setting = getSetting();
const active = ref("1");
const disabled = ref(inspect());

function inspect() {
  if (setting.value.cabinet.pinLeft || setting.value.cabinet.pinRight) {
    setting.value.contentWidth = 50;
    return false;
  } else {
    return true;
  }
}

watch(setting, (val, old) => {
  if (val.cabinet.pinLeft != old.cabinet.pinLeft || val.cabinet.pinRight != old.cabinet.pinRight) {
    disabled.value = inspect();
  }

  document.querySelector("html").style.setProperty("--cabinet-width", val.cabinet.width + "rem");
  document.querySelector("html").style.setProperty("--content-width", val.contentWidth + "vw");
});
</script>

<template>
  <el-collapse v-model="active" accordion>
    <el-collapse-item title="位置设置">
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
    </el-collapse-item>
    <el-collapse-item title="选项开关">
      <div v-for="(v, k, i) in setting.toggles" class="mt-4">
        <span><span v-show="!v.show">隐藏</span><span v-show="v.show">显示</span>{{ k }}项</span>
        <el-switch v-model="v.show" size="small" class="ml-2" style="--el-switch-on-color: var(--l-theme-color)" />
      </div>
    </el-collapse-item>
    <el-collapse-item title="宽度设置">
      <div class="mb-4">
        <div class="mb-2">设置陈列柜宽度</div>
        <el-slider :min="13" :step="0.5" :max="20" v-model="setting.cabinet.width" size="small" />
      </div>
      <div>
        <div class="mb-2">设置中间内容宽度</div>
        <el-slider :disabled="!disabled" :min="50" :step="1" :max="60" v-model="setting.contentWidth" size="small" />
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<style scoped lang="scss"></style>
