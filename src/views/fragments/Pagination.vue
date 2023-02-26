<script setup lang="ts">
import { getSetting } from "@/utils/common";

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

const setting = getSetting();
const currIndex = ref(1);
const index = ref(1);

function nextChange() {
  if (currIndex.value < props.pageCount) {
    currIndex.value++;
    index.value = currIndex.value;
    emits("next", { elIndex: index.value, pageCount: props.pageCount, currentIndex: currIndex.value });
  } else {
    ElMessage({ message: "已经到末页！", grouping: true, type: "warning" });
  }
}

function prevChange() {
  if (currIndex.value > 1) {
    currIndex.value--;
    index.value = currIndex.value;
    emits("prev", { elIndex: index.value, pageCount: props.pageCount, currentIndex: currIndex.value });
  } else {
    ElMessage({ message: "已经到首页！", grouping: true, type: "warning" });
  }
}

function nexprChange(elIndex: number) {
  currIndex.value = elIndex;
  emits("nexpr", { elIndex: index.value, pageCount: props.pageCount, currentIndex: currIndex.value });
}
</script>

<template>
  <div class="l-pagination relative">
    <div class="l-pagination__sorter hover left z-1 f-c-c rd-l-4" @click="prevChange" v-show="disabled">
      <i-ep-arrow-left-bold />
    </div>
    <div class="l-pagination__content">
      <slot name="content" />
    </div>
    <div class="l-pagination__sorter hover right z-1 f-c-c rd-l-4" @click="nextChange" v-show="disabled">
      <i-ep-arrow-right-bold />
    </div>
    <div class="l-pagination__bottom f-c-e my-4" :class="{ 'l-box-bg': !setting.card.open }">
      <Card>
        <el-pagination layout="pager, next" :page-count="pageCount" v-model:current-page="index" @current-change="nexprChange" />
      </Card>
    </div>
  </div>
</template>

<style scoped lang="scss">
@include mb() {
  .l-pagination__sorter {
    display: none;
  }
}

@include pc() {
  .l-pagination__sorter {
    position: fixed;
    top: 50vh;
    opacity: 0.7;
    color: var(--l-thr-color);
    width: 2.5rem;
    height: 2.5rem;
  }

  .l-pagination__sorter.left {
    left: calc(calc(calc(100vw - var(--content-width)) / 2) - 2.2rem);
  }

  .l-pagination__sorter.right {
    right: calc(calc(calc(100vw - var(--content-width)) / 2) - 2.2rem);
  }
}
</style>
