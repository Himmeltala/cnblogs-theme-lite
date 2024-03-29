<script setup lang="ts">
const localSetting = LiteUtils.getLocalSetting();
const collapseActive = ref("1");
const disabled = ref(inspect());

function inspect() {
  if (localSetting.value.cabinet.left.pin || localSetting.value.cabinet.right.pin) {
    localSetting.value.content.width = 50;
    return true;
  } else return false;
}

const computeCabinetWidth = computed({
  get() {
    return localSetting.value.cabinet.width;
  },
  set(value) {
    disabled.value = inspect();
    localSetting.value.cabinet.width = value;
    LiteConfig.eleHtml.style.setProperty(LiteConstants.CssVars.cabinetWidth, value + "rem");
  }
});

const computeContentWidth = computed({
  get() {
    return localSetting.value.content.width;
  },
  set(value) {
    disabled.value = inspect();
    localSetting.value.content.width = value;
    LiteConfig.eleHtml.style.setProperty(LiteConstants.CssVars.contentWidth, value + "vw");
  }
});
</script>

<template>
  <el-collapse v-model="collapseActive" accordion>
    <el-collapse-item title="位置设置">
      <div class="mb-4">
        <span>
          <span v-show="!localSetting.cabinet.left.pin">隐藏</span>
          <span v-show="localSetting.cabinet.left.pin">固定</span>左陈列柜
        </span>
        <el-switch v-model="localSetting.cabinet.left.pin" size="small" class="ml-2" style="--el-switch-on-color: var(--l-theme-color)" />
      </div>
      <div class="mb-4">
        <span>
          <span v-show="!localSetting.cabinet.right.pin">隐藏</span>
          <span v-show="localSetting.cabinet.right.pin">固定</span>右陈列柜
        </span>
        <el-switch v-model="localSetting.cabinet.right.pin" size="small" class="ml-2" style="--el-switch-on-color: var(--l-theme-color)" />
      </div>
      <div class="mb-4">
        <span>
          <span v-show="localSetting.cabinet.position.break">脱离</span>
          <span v-show="!localSetting.cabinet.position.break">贴住</span>中间内容
        </span>
        <el-switch
          v-model="localSetting.cabinet.position.break"
          size="small"
          class="ml-2"
          style="--el-switch-on-color: var(--l-theme-color)" />
      </div>
      <div class="mb-4" v-show="localSetting.cabinet.position.break">
        <div class="mb-2">左陈列柜偏移量</div>
        <el-input-number v-model="localSetting.cabinet.position.left" :precision="2" :min="0" ::max="100" size="small" />
      </div>
      <div class="mb-4" v-show="localSetting.cabinet.position.break">
        <div class="mb-2">右陈列柜偏移量</div>
        <el-input-number v-model="localSetting.cabinet.position.right" :precision="2" :min="0" ::max="100" size="small" />
      </div>
    </el-collapse-item>
    <el-collapse-item title="选项开关">
      <div v-for="(v, k, i) in localSetting.cabinet.toggles" class="mt-4">
        <span><span v-show="!v.show">隐藏</span><span v-show="v.show">显示</span>{{ k }}项</span>
        <el-switch v-model="v.show" size="small" class="ml-2" style="--el-switch-on-color: var(--l-theme-color)" />
      </div>
    </el-collapse-item>
    <el-collapse-item title="宽度设置">
      <div class="mb-4">
        <div class="mb-2">设置陈列柜宽度</div>
        <el-slider :min="13" :step="0.5" :max="20" v-model="computeCabinetWidth" size="small" />
      </div>
      <div>
        <div class="mb-2">设置中间内容宽度</div>
        <el-slider :disabled="disabled" :min="50" :step="1" :max="60" v-model="computeContentWidth" size="small" />
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<style scoped lang="scss"></style>
