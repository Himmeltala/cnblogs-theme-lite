<script setup lang="ts">
import { ref } from "vue";
import * as API from "../utils/api";
import * as DataType from "../types/data-type";

let listLoading = ref(true);
let essayList = ref<Array<DataType.Essay>>();
let pages = ref();
let currentPage = ref(1);
let pageCount = ref(0);
let calcPage = ref(false);

API.getEssayList(0, calcPage.value, str => {
  essayList.value = str.list;
  listLoading.value = false;
});

function changePage(flag: boolean) {
  if (flag) currentPage.value++;
  listLoading.value = true;
  pageCount.value ? (calcPage.value = false) : (calcPage.value = true);
  API.getEssayList(currentPage.value, calcPage.value, str => {
    essayList.value = str.list;
    pages.value = str.pages;
    if (calcPage.value) pageCount.value = parseInt(str.pages[str.pages.length - 1]);
    listLoading.value = false;
  });
}

function paginationChange() {
  changePage(false);
}
</script>

<template>
  <div class="home">
    <div class="personal">
      <div class="mask"></div>
      <img loading="lazy"
           src="https://img2.baidu.com/it/u=3208290999,1116912473&fm=253&fmt=auto&app=120&f=JPEG?w=862&h=500" />
      <div class="panel">
        <!-- src="https://img0.baidu.com/it/u=2322283728,1741375128&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1670173200&t=aaf09069779fc719038c5290a6b5bdf0" /> -->
        <div class="row-1">
          <el-image
            style="width: 80px; height: 80px; border-radius: 50px"
            fit="cover"
            src="https://images.cnblogs.com/cnblogs_com/blogs/666252/galleries/1934022/t_221121082134_QQ%E5%9B%BE%E7%89%8720221121162116.jpg"></el-image>
          <div class="info">
            <div class="username">
              <span class="text">Enziandom</span>
              <span class="tag">
                <el-tag type="success" effect="plain" round> 摸鱼中... </el-tag>
              </span>
            </div>
            <div class="signature">个签：Time tick away, dream faded away!</div>
          </div>
        </div>
        <div class="right-top">
          <div>QQ：1282957580</div>
          <div>Email：enziandom@qq.com</div>
          <div>公司：中二病会社</div>
        </div>
      </div>
    </div>
    <div class="pagination pg-top" v-if="currentPage > 1">
      <el-pagination
        @current-change="paginationChange"
        v-model:current-page="currentPage"
        v-model:page-count="pageCount"
        :background="true"
        layout="prev, pager, next, jumper" />
    </div>
    <el-skeleton style="margin-top: 10px" :loading="listLoading" animated>
      <template #template>
        <Card v-for="item in 10" :key="item">
          <el-skeleton-item variant="p" style="width: 60%" />
          <div style="display: flex; align-items: center">
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
    <Card class="essay" v-for="(item, index) in essayList" :key="index" v-if="!listLoading" :width="'auto'">
      <div class="vessel">
        <div class="pack">
          <div class="header">
            <el-image v-if="index % 2 !== 0 && item.cover" class="cover" :src="item.cover" fit="cover" />
            <div class="header__middle" :class="{ 'cover-exist': !item.cover }">
              <router-link class="title" :to="'/p/' + item.postId"> {{ item.title }}</router-link>
              <div class="desc">摘要：{{ item.desc }}</div>
            </div>
            <el-image v-if="index % 2 === 0 && item.cover" class="cover" :src="item.cover" fit="cover" />
          </div>
          <div class="browse">
            <el-icon>
              <CaretRight />
            </el-icon>
            <router-link :to="'/p/' + item.postId">阅读全文</router-link>
          </div>
          <div class="bottom">
            <div class="info">
              <div class="date">
                <el-icon>
                  <Clock />
                </el-icon>
                <span>{{ item.date }}</span>
              </div>
              <div class="view">
                <el-icon>
                  <View />
                </el-icon>
                <span>{{ item.viewCount }}</span>
              </div>
              <div class="comm">
                <el-icon>
                  <ChatLineSquare />
                </el-icon>
                <span>{{ item.commCount }}</span>
              </div>
              <div class="digg">
                <el-icon>
                  <Star />
                </el-icon>
                <span> {{ item.diggCount }}</span>
              </div>
            </div>
          </div>
        </div>
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
      <el-button style="margin-right: 5px" v-show="!pageCount" type="primary" bg text @click="changePage(true)">下一页
      </el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../scss/mixins.scss";

$border-radius: 6px;
$title-size: 22px;
$desc-size: 18px;
$bottom-size: 16px;
$margin: 3px;

.personal {
  // padding: 20px 20px;
  margin: 0 5px 0 5px;
  position: relative;
  width: 100%;
  height: 150px;
  border-radius: 6px;

  .mask,
  .panel {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 6px;
  }

  .mask {
    backdrop-filter: saturate(50%) blur(1px);
    background: rgba(36, 36, 36, 0.6);
  }

  .panel {
    font-family: font1;
    color: #bcbcbc;
    padding: 15px;
    box-sizing: border-box;
    font-weight: 400;
    z-index: 999;

    .row-1 {
      @include flex($justify: flex-start);

      .info {
        margin-left: 15px;

        .username {
          margin-bottom: 4px;
          font-size: 20px;
          @include flex($justify: flex-start);

          .text {
            margin-right: 10px;
          }
        }

        .signature {
          font-size: 15px;
        }
      }
    }

    .right-top {
      position: absolute;
      top: 15px;
      right: 15px;
      font-size: 15px;

      div {
        margin-bottom: 4px;
      }
    }
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 6px;
    object-fit: cover;
  }
}

.essay {
  padding: 20px 20px;
  margin: 12px 5px 12px 5px;

  &:first-child {
    margin: 0 5px 0 5px !important;
  }

  .vessel {
    @include flex($justify: space-between, $wrap: nowrap);

    .cover {
      border-radius: $border-radius;
      width: 25%;
      height: 150px;
    }

    .pack {
      .cover-exist {
        width: 100% !important;
      }

      .header {
        @include flex($justify: space-between);

        .header__middle {
          width: 73%;

          .title {
            font-size: $title-size;
            word-break: break-all;
            transition: 0.3s;
            letter-spacing: 1px;
          }

          .desc {
            color: #878787;
            padding: 10px 0 25px 0;
            font-size: $desc-size;
            letter-spacing: 0.6px;
          }

          .title,
          .desc {
            line-height: 1.4;
          }
        }

        .cover {
          border-radius: $border-radius;
          width: 25%;
          height: 160px;
        }
      }

      .browse {
        @include flex($justify: flex-start);
        margin-bottom: 15px;

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

      .bottom {
        font-size: $bottom-size;
        @include flex($justify: flex-end);

        .info {
          color: #989898;
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

.pg-top {
  margin-top: 10px;
}
</style>
