<script setup lang="ts">
const props = defineProps({
  pageCount: {
    type: Number,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
});
const emits = defineEmits(["next", "prev", "nexpr"]);

const currIndex = ref(1);
const index = ref(1);

function nextChange() {
  if (currIndex.value < props.pageCount) {
    currIndex.value++;
    index.value = currIndex.value;
    emits("next", {
      elIndex: index.value,
      pageCount: props.pageCount,
      currentIndex: currIndex.value
    });
  } else {
    ElMessage({ message: "已经到末页！", grouping: true, type: "warning" });
  }
}

function prevChange() {
  if (currIndex.value > 1) {
    currIndex.value--;
    index.value = currIndex.value;
    emits("prev", {
      elIndex: index.value,
      pageCount: props.pageCount,
      currentIndex: currIndex.value
    });
  } else {
    ElMessage({ message: "已经到首页！", grouping: true, type: "warning" });
  }
}

function nexprChange(elIndex: number) {
  currIndex.value = elIndex;
  emits("nexpr", {
    elIndex: index.value,
    pageCount: props.pageCount,
    currentIndex: currIndex.value
  });
}
</script>

<template>
  <div class="relative">
    <div class="hover sorter left w-10 h-10 z-1 f-c-c l-thr-color fixed top-50vh rd-l-4 opacity-70" @click="prevChange" v-show="disabled">
      <el-tooltip effect="dark" content="上一页" placement="left">
        <el-icon>
          <i-ep-arrow-left-bold />
        </el-icon>
      </el-tooltip>
    </div>
    <slot name="content" />
    <div class="hover sorter right w-10 h-10 z-1 f-c-c l-thr-color fixed top-50vh rd-l-4 opacity-70" @click="nextChange" v-show="disabled">
      <el-tooltip effect="dark" content="下一页" placement="right">
        <el-icon>
          <i-ep-arrow-right-bold />
        </el-icon>
      </el-tooltip>
    </div>
    <div class="f-c-e my-4">
      <el-pagination layout="pager, next" :page-count="pageCount" v-model:current-page="index" @current-change="nexprChange" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@include mb() {
  .sorter {
    display: none;
  }
}

@include pc() {
  .sorter.left {
    left: calc(calc(calc(100vw - var(--content-width)) / 2) - 2.5rem);
  }

  .sorter.right {
    right: calc(calc(calc(100vw - var(--content-width)) / 2) - 2.5rem);
  }
}
</style>
