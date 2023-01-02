<script setup lang="ts">
import { watch } from "vue";
import { $ref } from "vue/macros";
import { ElMessage } from "element-plus";

const props = defineProps({
  pageCount: {
    type: Number,
    default: 2
  }
});

let _pageCount = $ref<number>(props.pageCount);
let _currentIndex = $ref<number>(1);

const updateProps = () => {
  _pageCount = 2;
  _currentIndex = 1;
};

defineExpose({ updateProps });

watch(() => props.pageCount, () => {
  _pageCount = props.pageCount;
});

const emits = defineEmits(["floatChange", "fixedChange"]);

function floatSorterChange(direction: "left" | "right") {
  if (direction === "left") {
    if (_currentIndex >= 0) {
      _currentIndex--;
      emits("floatChange", {
        pageCount: _pageCount,
        currentIndex: _currentIndex
      });
    }
  } else {
    if (_currentIndex <= _pageCount - 1) {
      _currentIndex++;
      emits("floatChange", {
        pageCount: _pageCount,
        currentIndex: _currentIndex
      });
    } else {
      ElMessage({ message: "已经是最后一页！", grouping: true, showClose: true, type: "warning" });
    }
  }
}

function fixedSorterChange() {
  emits("fixedChange", {
    pageCount: _pageCount,
    currentIndex: _currentIndex
  });
}
</script>

<template>
  <div class="pagination-page">
    <div class="pg pg-top" v-if="_currentIndex > 1 && _pageCount >= 1">
      <el-pagination
        @current-change="fixedSorterChange"
        v-model:current-page="_currentIndex"
        v-model:page-count="_pageCount"
        :background="true"
        layout="prev, pager, next, jumper"
      />
    </div>
    <slot name="loading" />
    <div v-show="_currentIndex > 1" class="float-sorter left-sorter" @click="floatSorterChange('left')">
      <el-tooltip effect="dark" content="上一页" placement="left">
        <el-icon>
          <ArrowLeftBold />
        </el-icon>
      </el-tooltip>
    </div>
    <slot name="content" />
    <div class="float-sorter right-sorter" @click="floatSorterChange('right')">
      <el-tooltip effect="dark" content="下一页" placement="left">
        <el-icon>
          <ArrowRightBold />
        </el-icon>
      </el-tooltip>
    </div>
    <div class="pg pg-bottom" v-if="_currentIndex > 1 && _pageCount >= 1">
      <el-pagination
        @current-change="fixedSorterChange"
        v-show="_pageCount"
        v-model:current-page="_currentIndex"
        v-model:page-count="_pageCount"
        :background="true"
        layout="prev, pager, next, jumper"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../scss/mixins";

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
