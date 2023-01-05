<script setup lang="ts">
const props = defineProps({
  pageCount: {
    type: Number,
    default: 2
  }
});

// 由于 local prop bindings are not writable. element-plus 的分页器是双向绑定的，因此不可以直接给 props
let _pageCount = ref<number>(props.pageCount);
let currentIndex = ref<number>(1);

/**
 * 暴露一个函数，当页面发生变化时，或其他情况时，可以调用该函数，把 pageCount
 * 和 currentIndex 恢复到默认值
 */
const updateProps = () => {
  _pageCount.value = 2;
  currentIndex.value = 1;
};

// 暴露函数
defineExpose({ updateProps });

// 监听 pageCount，如果 pageCount 发生了变化，就把父组件传递过来的新的 pageCount 赋值给 _pageCount
watch(() => props.pageCount, () => {
  _pageCount.value = props.pageCount;
});

// 声明触发函数
const emits = defineEmits(["floatChange", "fixedChange"]);

function floatSorterChange(direction: "left" | "right") {
  if (direction === "left") {
    if (currentIndex.value >= 0) {
      currentIndex.value--;
      emits("floatChange", {
        pageCount: _pageCount,
        currentIndex: currentIndex
      });
    }
  } else {
    if (currentIndex.value <= _pageCount.value - 1) {
      currentIndex.value++;
      emits("floatChange", {
        pageCount: _pageCount.value,
        currentIndex: currentIndex.value
      });
    } else {
      ElMessage({ message: "已经是最后一页！", grouping: true, showClose: true, type: "warning" });
    }
  }
}

function fixedSorterChange() {
  emits("fixedChange", {
    pageCount: _pageCount,
    currentIndex: currentIndex
  });
}
</script>

<template>
  <div class="pagination-page">
    <div class="pg pg-top" v-if="currentIndex > 1 && _pageCount >= 1">
      <el-pagination
        @current-change="fixedSorterChange"
        v-model:current-page="currentIndex"
        v-model:page-count="_pageCount"
        :background="true"
        layout="prev, pager, next, jumper"
      />
    </div>
    <slot name="loading" />
    <div v-show="currentIndex > 1" class="float-sorter left-sorter" @click="floatSorterChange('left')">
      <el-tooltip effect="dark" content="上一页" placement="left">
        <el-icon>
          <i-ep-arrow-left-bold />
        </el-icon>
      </el-tooltip>
    </div>
    <slot name="content" />
    <div class="float-sorter right-sorter" @click="floatSorterChange('right')">
      <el-tooltip effect="dark" content="下一页" placement="left">
        <el-icon>
          <i-ep-arrow-right-bold />
        </el-icon>
      </el-tooltip>
    </div>
    <div class="pg pg-bottom" v-if="currentIndex > 1 && _pageCount >= 1">
      <el-pagination
        @current-change="fixedSorterChange"
        v-show="_pageCount"
        v-model:current-page="currentIndex"
        v-model:page-count="_pageCount"
        :background="true"
        layout="prev, pager, next, jumper"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.pagination-page {
  position: relative;

  .float-sorter {
    position: fixed;
    font-size: 10px;
    width: 15px;
    height: 30px;
    background-color: #3c3c3c;
    z-index: 999;
    cursor: pointer;
    opacity: 0.6;
    @include flex();
    @include ahover() {
      opacity: 1;
    }
  }

  .left-sorter {
    border-radius: 60px 0 0 60px;
    left: calc(23.5vw);
    top: 50vh;
  }

  .right-sorter {
    border-radius: 0 60px 60px 0;
    right: calc(23.5vw);
    top: 50vh;
  }
}

.pg {
  margin-bottom: 10px;
  @include flex($justify: flex-end);
}

.pg-top {
  margin-top: 10px;
}
</style>
