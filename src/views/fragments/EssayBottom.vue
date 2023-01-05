<script setup lang="ts">
import { PropType } from "vue";

type DataType = {
  date: string;
  view: string;
  comm: string;
  digg: string;
}

type AlignType = "flex-start" | "flex-end";

defineProps({
  data: {
    type: Object as PropType<DataType>,
    required: true
  },
  align: {
    type: String as PropType<AlignType>,
    default: "flex-start"
  }
});
</script>

<template>
  <div class="bottom-data" :style="{'justify-content': align}">
    <div class="date">
      <el-icon>
        <i-ep-clock />
      </el-icon>
      <span>{{ data.date }}</span>
    </div>
    <div class="view">
      <el-icon>
        <i-ep-view />
      </el-icon>
      <span>{{ data.view }}</span>
    </div>
    <div class="comm">
      <el-icon>
        <i-ep-chat-line-square />
      </el-icon>
      <span>{{ data.comm }}</span>
    </div>
    <div class="digg">
      <el-icon>
        <i-ep-star />
      </el-icon>
      <span> {{ data.digg }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bottom-data {
  color: #989898;
  @include flex();

  & > div {
    @include flex($justify: space-between);

    & > i {
      margin-right: 3px;
    }
  }

  .date,
  .view,
  .comm {
    margin-right: 10px;
  }
}
</style>