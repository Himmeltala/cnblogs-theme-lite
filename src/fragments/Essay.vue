<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import * as API from "../utils/api";
import * as DataType from "../types/data-type";

const route = useRoute();
const router = useRouter();
const postId: any = route.params.id;

const essay = ref<DataType.Essay>();
const tagsCategroies = ref<any>({ categories: {}, tags: {} });
let comments = ref<Array<DataType.Comment>>();

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

let contentLoading = ref(true);

API.getEssay(postId, (str: DataType.Essay) => {
  essay.value = str;
  contentLoading.value = true;
  API.getCommList(postId, 0, (str: Array<DataType.Essay>) => {
    comments.value = str;
    API.getEssayTagsAndCategories(666252, postId, str => {
      tagsCategroies.value = str;
      contentLoading.value = false;
    });
  });
});

let comment = ref<DataType.Comment>({ postId, parentCommentId: 0 });

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

function nav(path: string, out?: boolean) {
  if (out) {
    window.open(path, "__blank");
  } else router.push(path);
}
</script>

<template>
  <div class="essay">
    <Card class="wrap" padding="20px 20px">
      <div class="back" @click="nav('/')">
        <el-icon><ArrowLeftBold /></el-icon>
        <span>返回</span>
      </div>
      <el-skeleton style="margin-top: 10px" :rows="2" animated :loading="contentLoading" />
      <div class="title" v-if="!contentLoading">{{ essay?.title }}</div>
      <div class="info" v-if="!contentLoading">
        <div class="date">
          <el-icon><Clock /></el-icon>
          <span>{{ essay?.date }}</span>
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
      <div class="labels" v-if="!contentLoading">
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
      <el-skeleton style="margin-top: 10px" :rows="16" animated :loading="contentLoading" />
      <div
        v-if="!contentLoading"
        class="content"
        :style="{ 'font-size': fontSize + 'px' }"
        v-parse-code
        v-html="essay?.content"></div>
      <div class="comment" v-if="!contentLoading">
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

pre {
  border-radius: 6px;
  position: relative;
  box-sizing: border-box;

  code {
    border-radius: 6px;
    background-color: #2b2b2b !important;

    &::-webkit-scrollbar {
      display: none;
      width: 3px;
      height: 3px;
    }

    &:hover::-webkit-scrollbar {
      display: block;
      width: 3px;
      height: 3px;
    }
  }
}

code {
  font-size: 14px;
  font-weight: 300;
  font-family: Hack, monospace;
}

.cust-img {
  border-radius: 6px;
  width: 100%;
  object-fit: cover;
}

.code-type {
  box-sizing: border-box;
  padding: 4px;
  font-size: 13px;
  color: #6d6d6d;
  font-weight: 300;
  font-family: Hack, monospace;
  position: absolute;
  right: 0;
  top: 0;
}
</style>

<style scoped lang="scss">
@import "../scss/mixins.scss";

$color: #a7a7a7;
$title-size: 24px;
$info-size: 14px;
$comm-size-1: 13px;
$comm-size-2: 16px;

.essay {
  color: $color;

  .wrap {
    position: relative;

    .back {
      right: 12px;
      top: 10px;
      position: absolute;
      cursor: pointer;
      @include flex();
      transition: 0.3s;

      &:hover {
        transition: 0.3s;
        color: var(--el-color-primary);
      }

      span {
        font-size: 14px;
      }
    }
  }

  .title {
    word-break: break-all;
    font-size: $title-size;
  }

  .info {
    font-size: $info-size;
    margin-top: 10px;
    @include flex($justify: flex-start);

    div > span {
      user-select: none;
      margin-left: 6px;
    }

    .date {
      @include flex();
    }

    .zoom-in {
      cursor: pointer;
    }

    .date,
    .view-count,
    .comm-count {
      margin-right: 10px;
    }

    .view-count,
    .comm-count,
    .zoom-in {
      @include flex();
    }
  }

  .labels {
    font-size: $info-size;
    margin-top: 10px;

    .categories {
      margin-bottom: 8px;
    }

    .categories,
    .tags {
      @include flex($justify: flex-start);

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
    }
  }

  .content {
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

      .image {
        margin-right: 10px;
        border-radius: 6px;
      }

      .row-1-2 {
        color: var(--el-text-color-placeholder);
        @include flex($justify: flex-start);
        font-size: $comm-size-1;
        margin-top: 2px;

        .layer {
          @include flex($justify: flex-start);
          margin-right: 10px;
        }
      }
    }

    .row-2 {
      margin-left: 55px;

      .body {
        font-size: $comm-size-2;
        margin: 4px 0;
      }

      & > div + div {
        font-size: $comm-size-1;
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
