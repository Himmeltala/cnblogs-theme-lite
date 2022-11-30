<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import * as API from "../utils/api";
import * as DataType from "../types/data-type";

const router = useRouter();

let essayLoading = ref(true);

let essayList = ref<Array<DataType.Essay>>();
let page = ref(1);

API.getEssayList(page.value, (str: Array<DataType.Essay>) => {
  essayList.value = str;
  essayLoading.value = false;
});

function nextPage() {
  page.value++;
  API.getEssayList(page.value, (str: Array<DataType.Essay>) => {
    essayList.value = str;
  });
}

function lastPage() {
  page.value--;
  API.getEssayList(page.value, (str: Array<DataType.Essay>) => {
    essayList.value = str;
  });
}

function href(postId?: number) {
  router.push(`/p/${postId}`);
}
</script>

<template>
  <div class="home">
    <el-skeleton :loading="essayLoading" animated>
      <template #template>
        <Card v-for="item in 10" :key="item">
          <el-skeleton-item variant="p" style="width: 60%" />
          <div style="display: flex; align-items: center; justify-items: space-between">
            <el-skeleton-item variant="text" style="margin-right: 16px; margin-top: 8px" />
            <el-skeleton-item variant="text" style="margin-right: 16px; margin-top: 8px" />
            <el-skeleton-item variant="text" style="width: 30%; margin-top: 8px" />
          </div>
          <el-skeleton-item variant="text" style="width: 100%; margin-top: 8px" />
          <el-skeleton-item variant="text" style="width: 100%" />
          <div style="display: flex; align-items: center; justify-content: flex-end; width: 100%">
            <el-skeleton-item variant="text" style="width: 30%; margin-top: 4px" />
          </div>
        </Card>
      </template>
    </el-skeleton>
    <Card v-for="(item, index) in essayList" :key="index" v-if="!essayLoading">
      <div class="title" @click="href(item.postId)">
        {{ item.title }}
      </div>
      <div class="desc">摘要：{{ item.desc }}</div>
      <div class="info">
        <div class="date">
          <el-icon><Clock /></el-icon>
          <span>{{ item.date }}</span>
        </div>
        <div class="view">
          <el-icon><View /></el-icon>
          <span>{{ item.viewCount }}</span>
        </div>
        <div class="comm">
          <el-icon><ChatLineSquare /></el-icon>
          <span>{{ item.commCount }}</span>
        </div>
        <div class="digg">
          <el-icon><Star /></el-icon>
          <span> {{ item.diggCount }}</span>
        </div>
      </div>
    </Card>
    <el-button type="primary" plain round @click="lastPage">上一页</el-button>
    <el-button type="success" plain round @click="nextPage">下一页</el-button>
  </div>
</template>

<style scoped lang="scss">
@import "../scss/mixins.scss";

.title {
  cursor: pointer;
  font-size: 19px;
  word-break: break-all;
  transition: 0.3s;

  &:hover {
    color: var(--el-color-primary);
  }
}

.desc {
  padding: 10px 0;
  font-size: 15px;
}

.info {
  @include flex($justify: flex-end);
  font-size: 14px;

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
