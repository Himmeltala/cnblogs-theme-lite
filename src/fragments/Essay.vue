<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import * as API from "../utils/api";
import * as DataType from "../types/data-type";

const route = useRoute();
const router = useRouter();
let id: any = route.params.id;

let essay = ref<DataType.Essay>();
let comments = ref<Array<DataType.Comment>>();
let tagsCategroies = ref<any>({ categories: {}, tags: {} });

// comments.value = [
//   {
//     layer: "#1楼",
//     date: "2022-11-29 14:47",
//     author: "Enziandom",
//     body: "这只是一个测试评论......",
//     digg: " 支持(0) ",
//     burry: " 反对(0) ",
//     avatar: " https://pic.cnblogs.com/face/2271881/20221121232108.png "
//   },
//   {
//     layer: "#2楼",
//     date: "2022-11-29 15:21",
//     author: "Enziandom",
//     body: "这只是一个测试评论......",
//     digg: " 支持(0) ",
//     burry: " 反对(0) ",
//     avatar: " https://pic.cnblogs.com/face/2271881/20221121232108.png "
//   }
// ];

let contentSkeletonLoading = ref(true);

API.getEssay(id, (str: DataType.Essay) => {
  essay.value = str;
  contentSkeletonLoading.value = true;
  API.getCommList(id, 0, (str: Array<DataType.Essay>) => {
    contentSkeletonLoading.value = false;
    comments.value = str;
    skeletonLoading.value = true;
    API.getEssayTagsAndCategories(666252, id, str => {
      tagsCategroies.value = str;
      skeletonLoading.value = false;
    });
  });
});

let comment = ref<DataType.Comment>({ postId: id, parentCommentId: 0 });

function setComm() {
  API.setComm(
    comment.value,
    "CfDJ8NfDHj8mnYFAmPyhfXwJojcLmH5FQKBU6I9JmTZ7EZv8CHznhefSwrC9bhMz6MPu5L74E-gvI4nLRpIAQWlWV0QPcVyR2ZnJfuABSA3Eu6fyiYubrc5iRYfKOIffdlGAhYC0MqHM5MJsWvuE8dctwRGNzJK_XaSs8jF_tB6iujBaNMnSICsF11A9_zj8nTCNMg",
    res => {
      console.log(res);
    }
  );
}

let fontSize = ref(16);

function zoomIn() {
  fontSize.value >= 18 ? (fontSize.value = 16) : fontSize.value++;
}

let skeletonLoading = ref(true);

function nav(path: string, out?: boolean) {
  if (out) {
    window.open(path, "__blank");
  } else router.push(path);
}
</script>

<template>
  <div class="essay">
    <Card padding="20px 20px">
      <el-skeleton style="margin-top: 10px" :rows="2" animated :loading="contentSkeletonLoading" />
      <div class="title" v-if="!contentSkeletonLoading">{{ essay?.title }}</div>
      <div class="info" v-if="!contentSkeletonLoading">
        <div class="date">
          <el-icon><Clock /></el-icon>
          <span>
            {{ essay?.date }}
          </span>
        </div>
        <div class="view-count">
          <el-icon><View /></el-icon>
          <span>{{ essay?.viewCount }}次阅读</span>
        </div>
        <div class="comm-count">
          <el-icon><ChatLineSquare /></el-icon>
          <span>{{ essay?.commCount }}条评论</span>
        </div>
        <div class="zoom-in" @click="zoomIn">
          <el-icon><ZoomIn /></el-icon>
          <span>放大</span>
        </div>
      </div>
      <el-skeleton style="margin-top: 20px" :rows="1" animated :loading="skeletonLoading" />
      <div class="labels" v-if="!skeletonLoading">
        <div class="categories">
          <div class="caption">
            <el-icon><FolderOpened /></el-icon>
            <span>分类：</span>
          </div>
          <div class="item" v-for="(item, index) in tagsCategroies.categories" :key="index">
            <Tag :color="item.color" @click="nav(item.href, true)">
              {{ item.text }}
            </Tag>
          </div>
        </div>
        <div class="tags">
          <div class="caption">
            <el-icon><PriceTag /></el-icon>
            <span>标签：</span>
          </div>
          <div class="item" v-for="(item, index) in tagsCategroies.tags" :key="index">
            <Tag :color="item.color" @click="nav(item.href, true)">
              {{ item.text }}
            </Tag>
          </div>
        </div>
      </div>
      <el-skeleton style="margin-top: 10px" :rows="12" animated :loading="contentSkeletonLoading" />
      <div
        v-if="!contentSkeletonLoading"
        class="content"
        :style="{ 'font-size': fontSize + 'px' }"
        v-parse-code
        v-html="essay?.content"></div>
      <div class="comment">
        <el-input v-model="comment.body" />
        <el-button @click="setComm">发送评论</el-button>
      </div>
      <div class="comments">
        <div class="item" v-for="(item, index) in comments" :key="index">
          <div class="row-1">
            <el-image class="image" style="width: 45px; height: 45px" :src="item.avatar" fit="fill" />
            <div class="col-1">
              <div class="row-1-1">{{ item.author }}</div>
              <div class="row-1-2">
                <div class="layer">
                  {{ item.layer }}
                </div>
                <div class="date">{{ item.date }}</div>
              </div>
            </div>
          </div>
          <div class="row-2">
            <div class="body">{{ item.body }}</div>
            <div>
              <div class="digg">
                <el-icon><CaretTop /></el-icon>
                <span>{{ item.digg }}</span>
              </div>
              <div class="burry">
                <el-icon><CaretBottom /></el-icon>
                <span>{{ item.burry }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<style lang="scss">
h1,
h2,
h3 {
  font-weight: 400 !important;
}

h1 {
  font-size: 21px !important;
}

h2 {
  font-size: 19px !important;
}

h3 {
  font-size: 18px !important;
}

h4 {
  font-size: 17px !important;
}

h5 {
  font-size: 17px !important;
}

h6 {
  font-size: 17px !important;
}
</style>

<style scoped lang="scss">
@import "../scss/mixins.scss";

.essay {
  color: #a7a7a7;

  .labels {
    font-size: 14px;
    margin-top: 10px;

    .caption {
      @include flex();

      span {
        margin-left: 4px;
      }
    }

    .item {
      margin-right: 4px;
    }

    .item:last-child {
      margin-left: 0;
    }

    .categories {
      margin-bottom: 4px;
    }

    .categories,
    .tags {
      @include flex($justify: flex-start);
    }
  }

  .title {
    word-break: break-all;
    font-size: 24px;
  }

  .info {
    font-size: 14px;
    margin-top: 10px;
    @include flex($justify: flex-start);

    .date {
      @include flex();
    }

    div > span {
      user-select: none;
      margin-left: 6px;
    }
  }

  .breadcrumb {
    margin-top: 10px;
  }

  .date,
  .comm-count,
  .view-count {
    margin-right: 10px;
  }

  .zoom-in {
    cursor: pointer;
  }

  .view-count,
  .zoom-in,
  .crumb,
  .comm-count {
    font-size: 14px;
    @include flex();
  }

  .comments {
    .item {
      margin-bottom: 15px;
    }

    .item:last-child {
      margin-bottom: 0px;
    }

    .row-1 {
      font-size: 14px;
      @include flex($justify: flex-start);

      .row-1-2 {
        color: var(--el-text-color-placeholder);
        margin-top: 2px;
        font-size: 13px;
        @include flex($justify: flex-start);

        .layer {
          @include flex($justify: flex-start);
          margin-right: 10px;
        }
      }

      .image {
        margin-right: 10px;
        border-radius: 6px;
      }
    }

    .row-2 {
      margin-left: 55px;

      .body {
        font-size: 16px;
        margin: 4px 0;
      }

      & > div + div {
        font-size: 13px;
        @include flex($justify: flex-end);
      }

      .digg {
        margin-right: 6px;
      }

      .digg,
      .burry {
        @include flex();
      }
    }
  }
}
</style>
