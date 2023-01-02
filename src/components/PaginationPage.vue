<script setup lang="ts">
import { $ref } from "vue/macros";
import { PropType } from "vue";

const props = defineProps({});

let currentIndex = $ref(1);
let pageCount = $ref(0);

function floatSorterChange(direction: "left" | "right") {
}

function fixedSorterChange() {
}
</script>

<template>
  <div class="common">
    <div class="pagination pg-top" v-if="currentIndex > 1 && pageCount >= 1">
      <el-pagination
        @current-change="fixedSorterChange"
        v-model:current-page="currentIndex"
        v-model:page-count="pageCount"
        :background="true"
        layout="prev, pager, next, jumper"
      />
    </div>
    <slot name="loading" />
    <div v-show="currentIndex > 1" class="float-sorter left-sorter" @click="floatSorterChange('left')">
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
    <div class="pagination pg-bottom" v-if="pageCount >= 1">
      <el-pagination
        @current-change="fixedSorterChange"
        v-show="pageCount"
        v-model:current-page="currentIndex"
        v-model:page-count="pageCount"
        :background="true"
        layout="prev, pager, next, jumper"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../scss/mixins";

$border-radius: 6px;

.common {
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

.pagination {
  margin-bottom: 10px;
  @include flex($justify: flex-end);
}

.pg-top {
  margin-top: 10px;
}
</style>
