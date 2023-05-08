<script setup lang="ts">
const localSetting = LiteUtils.getLocalSetting();
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
  <div v-if="LiteConfig.pcDevice">
    <span
      ><span v-show="!localSetting.other.pagation.pin">隐藏</span><span v-show="localSetting.other.pagation.pin">开启</span>翻页按钮</span
    >
    <el-switch v-model="localSetting.other.pagation.pin" size="small" class="ml-2" style="--el-switch-on-color: var(--l-theme-color)" />
  </div>
  <div v-if="LiteConfig.pcDevice" class="mt-4 f-c-s">
    <div>GitHub 角标</div>
    <el-select size="small" v-model="localSetting.other.github.position" class="ml-2">
      <el-option v-for="item in positions" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </div>
</template>

<style scoped lang="scss"></style>
