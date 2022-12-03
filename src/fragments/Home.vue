<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import * as Api from "../utils/api";
import * as DataType from "../types/data-type";

const router = useRouter();
const route = useRoute();

let loading = ref(true);
let essayList = ref<Array<DataType.Essay>>();
let pages = ref();
let currentIndex = ref(1);
let pageCount = ref(0);
let calcPage = ref(false);
let category = ref();

let categoryId: any = route.params.id;
let page: any = route.params.page;

if (categoryId) {
  calcPage.value = true;
  Api.getCategories(categoryId, calcPage.value, page, res => {
    essayList.value = res.list;
    pages.value = res.pages;
    category.value = res.category;
    if (calcPage.value) pageCount.value = parseInt(res.pages[res.pages.length - 1]);
    loading.value = false;
  });
} else {
  Api.getEssayList(0, calcPage.value, res => {
    essayList.value = res.list;
    loading.value = false;
  });
}

/**
 * 导航
 *
 * @param path 导航地址，可以是 router 地址也可以是外部 url 地址
 * @param out 当是外部 url 地址时，必须设置为 true
 */
function nav(path: string, out?: boolean) {
  if (out) {
    window.open(path, "__blank");
  } else router.push(path);
}

function floatSorterChange(direction: "left" | "right") {
  loading.value = true;
  if (direction === "right") currentIndex.value++;
  else if (direction === "left") currentIndex.value--;
  pageCount.value ? (calcPage.value = false) : (calcPage.value = true);
  if (categoryId) {
    Api.getCategories(categoryId, calcPage.value, page, res => {
      essayList.value = res.list;
      pages.value = res.pages;
      category.value = res.category;
      if (calcPage.value) pageCount.value = parseInt(res.pages[res.pages.length - 1]);
      loading.value = false;
    });
  } else {
    Api.getEssayList(currentIndex.value, calcPage.value, res => {
      essayList.value = res.list;
      pages.value = res.pages;
      if (calcPage.value) pageCount.value = parseInt(res.pages[res.pages.length - 1]);
      loading.value = false;
    });
  }
}

function fixedSorterChange() {
  loading.value = true;
  pageCount.value ? (calcPage.value = false) : (calcPage.value = true);
  if (categoryId) {
    Api.getCategories(categoryId, calcPage.value, page, res => {
      essayList.value = res.list;
      pages.value = res.pages;
      category.value = res.category;
      if (calcPage.value) pageCount.value = parseInt(res.pages[res.pages.length - 1]);
      loading.value = false;
    });
  } else {
    Api.getEssayList(currentIndex.value, calcPage.value, res => {
      essayList.value = res.list;
      pages.value = res.pages;
      if (calcPage.value) pageCount.value = parseInt(res.pages[res.pages.length - 1]);
      loading.value = false;
    });
  }
}
</script>

<template>
  <div class="home">
    <div class="resume">
      <div class="modal"></div>
      <img loading="lazy"
           src="https://img2.baidu.com/it/u=3208290999,1116912473&fm=253&fmt=auto&app=120&f=JPEG?w=862&h=500" alt="" />
      <div class="panel">
        <div class="prime">
          <el-image
            style="width: 80px; height: 80px; border-radius: 50px"
            fit="cover"
            src="https://images.cnblogs.com/cnblogs_com/blogs/666252/galleries/1934022/t_221121082134_QQ%E5%9B%BE%E7%89%8720221121162116.jpg"></el-image>
          <div class="prime__packer">
            <div class="username">
              <span class="text">Enziandom</span>
              <span class="tag">
                <el-tag type="success" effect="plain" round> 摸鱼中... </el-tag>
              </span>
            </div>
            <div class="signature">个签：Time tick away, dream faded away!</div>
          </div>
        </div>
        <div class="floating">
          <div>QQ：1282957580</div>
          <div>Email：enziandom@qq.com</div>
          <div>公司：中二病会社</div>
        </div>
      </div>
    </div>
    <div class="pagination pg-top" v-if="currentIndex > 1">
      <el-pagination
        @current-change="fixedSorterChange"
        v-model:current-page="currentIndex"
        v-model:page-count="pageCount"
        :background="true"
        layout="prev, pager, next, jumper" />
    </div>
    <el-skeleton style="margin-top: 10px" :loading="loading" animated>
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
    <div v-show="currentIndex > 1" class="left-sorter float-sorter" @click="floatSorterChange('left')">
      <el-tooltip
        effect="dark"
        content="上一页"
        placement="left"
      >
        <el-icon>
          <ArrowLeftBold />
        </el-icon>
      </el-tooltip>
    </div>
    <div class="category" v-if="category">{{ category }}</div>
    <Card class="essay" v-for="(item, index) in essayList" :key="index" v-if="!loading" :width="'auto'">
      <div class="essay__vessel">
        <div class="packer">
          <div class="header">
            <el-image v-if="index % 2 !== 0 && item.cover" class="cover" :src="item.cover" fit="cover" />
            <div class="header__middle" :class="{ 'cover-exist': !item.cover }">
              <div class="title" @click="nav('/e/' + item.postId)">{{ item.title }}</div>
              <div class="desc">摘要：{{ item.desc }}</div>
            </div>
            <el-image v-if="index % 2 === 0 && item.cover" class="cover" :src="item.cover" fit="cover" />
          </div>
          <div class="browse">
            <el-icon>
              <CaretRight />
            </el-icon>
            <router-link :to="'/e/' + item.postId">阅读全文</router-link>
          </div>
          <div class="bottom">
            <div class="prime__packer">
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
    <div class="right-sorter float-sorter" @click="floatSorterChange('right')">
      <el-tooltip
        effect="dark"
        content="下一页"
        placement="left"
      >
        <el-icon>
          <ArrowRightBold />
        </el-icon>
      </el-tooltip>
    </div>
    <div class="pagination">
      <el-pagination
        @current-change="fixedSorterChange"
        v-show="pageCount"
        v-model:current-page="currentIndex"
        v-model:page-count="pageCount"
        :background="true"
        layout="prev, pager, next, jumper" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../scss/mixins.scss";

$border-radius: 6px;
$title-size: 22px;
$desc-size: 17px;
$bottom-size: 16px;
$margin: 3px;

.home {
  position: relative;

  .float-sorter {
    position: fixed;
    font-size: 10px;
    width: 15px;
    height: 30px;
    background-color: #3c3c3c;
    z-index: 999;
    cursor: pointer;
    @include flex();
    transition: 0.3s;
    opacity: 0.6;

    &:hover {
      opacity: 1;
      transition: 0.3s;
      background-color: var(--el-color-primary);
    }
  }

  .left-sorter {
    border-radius: 60px 0 0 60px;
    left: calc(20vw + 54px);
    top: 50vh;
  }

  .right-sorter {
    border-radius: 0 60px 60px 0;
    right: calc(20vw + 54px);
    top: 50vh;
  }
}

.resume {
  margin: 0 5px 0 5px;
  position: relative;
  width: 100%;
  height: 150px;
  border-radius: 6px;

  .modal,
  .panel {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 6px;
  }

  .modal {
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

    .prime {
      @include flex($justify: flex-start);

      .prime__packer {
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

    .floating {
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

.category {
  font-size: 20px;
  margin: 10px 20px;
}

.essay {
  padding: 15px 25px;
  margin: 12px 10px 12px 10px;

  &:first-child {
    margin: 0 5px 0 5px !important;
  }

  .essay__vessel {
    @include flex($justify: space-between, $wrap: nowrap);

    .cover {
      border-radius: $border-radius;
      width: 25%;
      height: 150px;
    }

    .packer {
      .cover-exist {
        width: 100% !important;
      }

      .header {
        @include flex($justify: space-between);

        .header__middle {
          width: 73%;

          .title {
            cursor: pointer;
            font-size: $title-size;
            word-break: break-all;
            transition: 0.3s;
            letter-spacing: 1px;

            &:hover {
              color: var(--el-color-primary);
              transition: 0.3s;
            }
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

        .prime__packer {
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
