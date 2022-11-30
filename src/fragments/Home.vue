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
  essayLoading.value = true;
  API.getEssayList(page.value, (str: Array<DataType.Essay>) => {
    essayList.value = str;
    essayLoading.value = false;
  });
}

function lastPage() {
  page.value--;
  essayLoading.value = true;
  API.getEssayList(page.value, (str: Array<DataType.Essay>) => {
    essayList.value = str;
    essayLoading.value = false;
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
    <Card class="list" v-for="(item, index) in essayList" :key="index" v-if="!essayLoading">
      <div class="show">
        <el-image v-if="index % 2 != 0" class="cover" src="/100086620_p0.png" fit="cover" />
        <div class="wrap">
          <div class="title" @click="href(item.postId)">
            {{ item.title }}
          </div>
          <div class="desc">摘要：{{ item.desc }}</div>
          <div class="bottom">
            <div>
              <el-icon><CaretRight /></el-icon>
              <router-link :to="'/p/' + item.postId">阅读全文</router-link>
            </div>
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
          </div>
        </div>
        <el-image v-if="index % 2 == 0" class="cover" src="/100086620_p0.png" fit="cover" />
      </div>
    </Card>
    <el-button type="primary" plain round @click="lastPage">上一页</el-button>
    <el-button type="success" plain round @click="nextPage">下一页</el-button>
  </div>
</template>

<style scoped lang="scss">
@import "../scss/mixins.scss";

$border-radius: 6px;
$title-size: 19px;
$desc-size: 15px;
$bottom-size: 14px;
$margin: 3px;

.list {
  .show {
    @include flex($justify: space-between, $wrap: nowrap);

    .cover {
      border-radius: $border-radius;
      width: 25%;
      height: 150px;
    }

    .wrap {
      width: 73%;

      .title {
        cursor: pointer;
        font-size: $title-size;
        word-break: break-all;
        transition: 0.3s;

        &:hover {
          color: var(--el-color-primary);
        }
      }

      .desc {
        padding: 10px 0;
        font-size: $desc-size;
      }

      .bottom {
        font-size: $bottom-size;
        @include flex($justify: space-between);

        & > div {
          @include flex();

          a {
            margin-left: $margin;
            border-bottom: 1px dotted #cccccc;

            &:hover {
              transition: 0.3s;
              border-bottom: 1px dotted var(--el-color-primary);
            }
          }
        }

        .info {
          @include flex($justify: flex-start);

          & > div {
            @include flex($justify: space-between);

            & > i {
              margin-right: $margin;
            }
          }

          .date,
          .view,
          .comm {
            margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>
