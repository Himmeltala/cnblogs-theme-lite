<script setup lang="ts">
import type { UploadInstance, UploadProps, UploadRawFile } from "element-plus";
import { genFileId } from "element-plus";
import { useNow, useDateFormat } from "@vueuse/core";
import { getSetting } from "@/utils/common";

const upload = ref<UploadInstance>();
const setting = getSetting();
const dialog = ref(false);
const result = ref();

function exportJson() {
  const blob = new Blob([JSON.stringify(setting.value, null, 2)], { type: "text/json" });
  const a = document.createElement("a");
  const timestamp = useDateFormat(useNow(), "YYYYMMDDHHmmss");
  a.download = `setting-${timestamp.value}.json`;
  a.href = URL.createObjectURL(blob);
  a.click();
}

function confirm() {
  setting.value = JSON.parse(result.value);
  dialog.value = false;
  ElMessage({
    message: "导入成功！",
    type: "success"
  });
}

function cancel() {
  dialog.value = false;
}

const exceed: UploadProps["onExceed"] = files => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};

const importJson: UploadProps["onChange"] = async file => {
  if (file.raw) {
    const reader = new FileReader();
    reader.readAsText(file.raw);
    reader.onload = () => {
      dialog.value = true;
      result.value = reader.result;
    };
  }
};
</script>

<template>
  <div class="mb-4">
    <el-button size="small" plain type="primary" @click="exportJson">导出设置</el-button>
  </div>
  <el-upload drag ref="upload" :limit="1" :auto-upload="false" :on-change="importJson" :on-exceed="exceed">
    点击导入 (可拖拽上传)
  </el-upload>
  <el-dialog draggable align-center v-model="dialog" width="20rem" title="操作提示">
    <div class="mb-10">该操作会覆盖之前的设置，是否继续执行本次操作？</div>
    <div class="f-c-c">
      <el-button size="small" type="primary" @click="confirm">确定</el-button>
      <el-button size="small" @click="cancel">取消</el-button>
    </div>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
