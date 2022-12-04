<script setup lang="ts">
import { PropType } from "vue";

defineProps({
  data: {
    type: Object as PropType<{
      date: string;
      viewCount: string;
      commCount: string;
      diggCount: string;
    }>,
    required: true
  }
});
</script>

<template>
  <div class="bottom-data">
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
      <span>{{ data.viewCount }}</span>
    </div>
    <div class="comm">
      <el-icon>
        <ChatLineSquare />
      </el-icon>
      <span>{{ data.commCount }}</span>
    </div>
    <div class="digg">
      <el-icon>
        <Star />
      </el-icon>
      <span> {{ data.diggCount }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../scss/mixins";

.bottom-data {
  color: #989898;
  @include flex($justify: flex-start);

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