<script setup lang="ts">
const props = defineProps({
  pageCount: {
    type: Number
  }
});

const currentIndex = ref(1);
const index = ref(1);

type EmitType = {
  pageCount: number;
  currentIndex: number;
  elIndex: number;
};

const emits = defineEmits<{
  (e: "next", data: EmitType): void;
  (e: "prev", data: EmitType): void;
  (e: "nexpr", data: EmitType): void;
}>();

function nextChange() {
  if (currentIndex.value < props.pageCount) {
    currentIndex.value++;
    index.value = currentIndex.value;
    emits("next", {
      elIndex: index.value,
      pageCount: props.pageCount,
      currentIndex: currentIndex.value
    });
  } else {
    ElMessage({ message: "已经到末页！", grouping: true, type: "warning" });
  }
}

function prevChange() {
  if (currentIndex.value > 1) {
    currentIndex.value--;
    index.value = currentIndex.value;
    emits("prev", {
      elIndex: index.value,
      pageCount: props.pageCount,
      currentIndex: currentIndex.value
    });
  } else {
    ElMessage({ message: "已经到首页！", grouping: true, type: "warning" });
  }
}

function nexprChange(elIndex: number) {
  currentIndex.value = elIndex;
  emits("nexpr", {
    elIndex: index.value,
    pageCount: props.pageCount,
    currentIndex: currentIndex.value
  });
}
</script>

<template>
  <div class="relative">
    <div class="hover sorter left-20vw" @click="prevChange">
      <el-tooltip effect="dark" content="上一页" placement="left">
        <el-icon>
          <i-ep-arrow-left-bold />
        </el-icon>
      </el-tooltip>
    </div>
    <slot name="content" />
    <div class="hover sorter right-20vw" @click="nextChange">
      <el-tooltip effect="dark" content="下一页" placement="right">
        <el-icon>
          <i-ep-arrow-right-bold />
        </el-icon>
      </el-tooltip>
    </div>
    <div class="f-c-e my-4">
      <el-pagination
        layout="pager, next"
        :page-count="pageCount"
        v-model:current-page="index"
        @current-change="nexprChange" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.sorter {
  --at-apply: fixed fsz-1 w-10 h-10 z-9 f-c-c l-thr-color top-50vh rd-l-4;
  opacity: 0.5;
}

@include mb() {
  .sorter {
    display: none;
  }
}
</style>
