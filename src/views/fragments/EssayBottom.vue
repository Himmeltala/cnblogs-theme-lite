<script setup lang="ts">
import { PropType } from "vue";

defineProps({
  data: {
    type: Object as PropType<{
      date: string;
      view: string;
      comm: string;
      digg: string;
    }>,
    required: true
  },
  align: {
    type: String as PropType<"flex-start" | "flex-end">,
    default: "flex-start"
  }
});
</script>

<template>
  <div class="bottom-data" :style="{'justify-content': align}">
    <div class="date">
      <el-icon>
        <Clock />
      </el-icon>
      <span>{{ data.date }}</span>
    </div>
    <div class="view">
      <el-icon>
        <View />
      </el-icon>
      <span>{{ data.view }}</span>
    </div>
    <div class="comm">
      <el-icon>
        <ChatLineSquare />
      </el-icon>
      <span>{{ data.comm }}</span>
    </div>
    <div class="digg">
      <el-icon>
        <Star />
      </el-icon>
      <span> {{ data.digg }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../scss/mixins";

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