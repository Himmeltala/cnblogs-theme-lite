<script setup lang="ts">
import { ref } from "vue";
import * as API from "../utils/api";
import * as DataType from "../types/data-type";

let essayLoading = ref(true);
let essayList = ref<Array<DataType.Essay>>();
let pages = ref();
let currentPage = ref(1);
let pageCount = ref(0);
let calcPage = ref(false);

API.getEssayList(0, calcPage.value, str => {
  essayList.value = str.list;
  essayLoading.value = false;
});

function changePage(flag: boolean) {
  if (flag) currentPage.value++;
  essayLoading.value = true;
  pageCount.value ? (calcPage.value = false) : (calcPage.value = true);
  API.getEssayList(currentPage.value, calcPage.value, str => {
    essayList.value = str.list;
    pages.value = str.pages;
    if (calcPage.value) pageCount.value = parseInt(str.pages[str.pages.length - 1]);
    essayLoading.value = false;
  });
}

function paginationChange() {
  changePage(false);
}

let covers = ref([
  "http://tva1.sinaimg.cn/large/0073YlnVgy1h78k53dtekj31q9185qv6.jpg",
  "http://tva1.sinaimg.cn/large/0073YlnVgy1h78k4iy34gj34g02i0b29.jpg",
  "http://tva1.sinaimg.cn/large/0073YlnVgy1h78k285eaaj348s2dznpf.jpg",
  "http://tva1.sinaimg.cn/large/0073YlnVgy1h7nhmeikjyj31e00s4u0x.jpg",
  "http://tva1.sinaimg.cn/large/0073YlnVgy1h78kvs2pa3j331f1we4qr.jpg",
  "http://tva1.sinaimg.cn/large/0073YlnVgy1h78jytvu6wj32p81odtdr.jpg",
  "http://tva1.sinaimg.cn/large/0073YlnVgy1h6e7546raxj31z41400vb.jpg",
  "http://tva1.sinaimg.cn/large/0073YlnVgy1h70g4ge139j30mm0weqfr.jpg",
  "http://tva1.sinaimg.cn/large/0073YlnVgy1h70g4ger0qj30og0ydtmo.jpg",
  "http://tva1.sinaimg.cn/large/0073YlnVgy1h6e73qud5tj31u00u00zq.jpg",
  "http://tva1.sinaimg.cn/large/0073YlnVgy1h6e720k0z0j32fr1h5x6p.jpg",
  "http://tva1.sinaimg.cn/large/0073YlnVgy1h6c0schlj6j31uo11idjl.jpg",
  "http://tva1.sinaimg.cn/large/74944c5fgy1h5p5u79jfij22lc140jxb.jpg",
  "http://tva1.sinaimg.cn/large/74944c5fgy1h5p5u54ocpj22lc140dnn.jpg"
]);

function mixCover() {
  let r = Math.floor(Math.random() * covers.value.length);
  return covers.value[r];
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
        <el-image v-if="index % 2 != 0" class="cover" :src="mixCover()" fit="cover" />
        <div class="wrap">
          <router-link class="title" :to="'/p/' + item.postId"> {{ item.title }}</router-link>
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
        <el-image v-if="index % 2 == 0" class="cover" :src="mixCover()" fit="cover" />
      </div>
    </Card>
    <div class="pagination">
      <el-pagination
        @current-change="paginationChange"
        v-show="pageCount"
        v-model:current-page="currentPage"
        v-model:page-count="pageCount"
        :background="true"
        layout="prev, pager, next, jumper" />
      <el-button v-show="!pageCount" type="primary" bg text @click="changePage(true)">下一页</el-button>
    </div>
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
        font-size: $title-size;
        word-break: break-all;
        transition: 0.3s;
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
            transition: 0.3s;

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

.pagination {
  margin-bottom: 10px;
  @include flex($justify: flex-end);
}
</style>
