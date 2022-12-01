<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ArrowLeft } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import * as API from "../utils/api";
import * as DataType from "../types/data-type";
import * as Native from "../utils/native";

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

let skeleton = ref(true);

API.getEssay(postId, (str: DataType.Essay) => {
  essay.value = str;
  skeleton.value = true;
  API.getCommList(postId, 0, (str: Array<DataType.Essay>) => {
    comments.value = str;
    API.getEssayTagsAndCategories(666252, postId, str => {
      tagsCategroies.value = str;
      skeleton.value = false;
    });
  });
});

let comment = ref<DataType.Comment>({ postId, parentCommentId: 0, body: "" });

function setComm() {
  API.setComm(comment.value, ({ data }) => {
    if (data.isSuccess) {
      ElMessage({
        message: "你的评论正在去的路上！😀",
        grouping: true,
        type: "success"
      });
    } else {
      ElMessage({
        message: "你的评论丢失了哦！😟",
        grouping: true,
        type: "error"
      });
    }
  });
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

function uploadImage() {
  Native.openImageUploadWindow((imgUrl: any) => {
    console.log(imgUrl);
    comment.value.body += imgUrl;
    console.log(comment.value.body);
  });
}
</script>

<template>
  <div class="essay">
    <Card class="wrap" padding="20px 20px">
      <el-skeleton style="margin-top: 10px" :rows="20" animated :loading="skeleton" />
      <template v-if="!skeleton">
        <el-page-header :icon="ArrowLeft" @back="nav('/')">
          <template #content>
            <div class="title">{{ essay?.title }}</div>
          </template>
        </el-page-header>
        <div class="info">
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
        <div class="labels">
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
        <div class="content" :style="{ 'font-size': fontSize + 'px' }" v-parse-code v-html="essay?.content"></div>
        <el-divider style="margin-bottom: 10px" border-style="dashed" />
        <div class="info-bottom">
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
        </div>
        <h3>发表评论</h3>
        <div class="comment">
          <div class="menus">
            <el-tooltip effect="dark" content="插入图片" placement="top-start">
              <el-icon class="upload-img" @click="uploadImage"><Picture /></el-icon>
            </el-tooltip>
          </div>
          <div>
            <textarea id="comment-textarea" v-model="comment.body" placeholder="请发表一条友善的评论哦~😀"></textarea>
          </div>
          <div>
            <textarea id="comment-img-link" placeholder="上传的图片链接在这里哦~" />
          </div>
          <el-button type="primary" class="btns" @click="setComm">发送评论</el-button>
        </div>
        <div class="comments">
          <h3>评论列表</h3>
          <template v-if="comments?.length">
            <div class="item" v-for="(item, index) in comments" :key="index">
              <div class="row-1">
                <el-image class="image" style="width: 45px; height: 45px" :src="item.avatar" fit="fill" />
                <div class="col-1">
                  <div class="row-1-1" @click="nav('https://www.cnblogs.com/' + item.author, true)">{{ item.author }}</div>
                  <div class="row-1-2">
                    <div class="layer">
                      {{ item.layer }}
                    </div>
                    <div class="date">{{ item.date }}</div>
                  </div>
                </div>
              </div>
              <div class="row-2">
                <div class="body" v-html="item.body"></div>
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
          </template>
          <el-empty v-if="!comments?.length" description="没有评论哦！🤨" />
        </div>
      </template>
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

    &,
    span {
      line-height: 1.6;
      letter-spacing: 0.9px;
      word-break: break-all;
    }
  }
}

code {
  font-size: 14px;
  font-weight: 300;
  font-family: Hack, monospace;
  background: #2e2e2e;
  color: var(--el-color-danger-light-3);
  padding: 3px 6px;
  border-radius: 6px;
  word-break: break-all;
  margin: 0 4px;
  box-sizing: border-box;
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
  right: 4px;
  top: 0;
}

.content {
  @mixin font() {
    letter-spacing: 1px;
    word-break: break-all;
    @content;
  }

  p {
    @include font() {
      line-height: 1.8;
    }
  }

  ol,
  ul {
    li {
      @include font() {
        line-height: 1.4;
      }
    }

    li:last-child {
      margin-bottom: 0;
    }
  }

  table {
    padding: 10px;
    box-sizing: border-box;

    th,
    td {
      padding: 8px 13px;
      border-bottom: 1px solid var(--el-border-color-lighter);
    }

    tbody {
      tr:nth-child(even) {
        background-color: #2b2b2b;
      }
    }
  }
}

.el-page-header__left {
  margin-right: 0 !important;
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
  }

  .title {
    line-height: 1.3;
    color: $color !important;
    word-break: break-all;
    font-size: $title-size;
  }

  .info-bottom {
    @include flex($justify: flex-end);
  }

  .info {
    @include flex($justify: flex-start);
  }

  .info,
  .info-bottom {
    font-size: $info-size;
    margin-top: 10px;

    div:last-child {
      margin-right: 0 !important;
    }

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
    margin: 25px 0;

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

  .comment {
    #comment-img-link,
    #comment-textarea {
      background-color: #202020;
      border: 1px solid var(--el-border-color-lighter);
      width: 100%;
      outline: none;
      border-radius: 8px;
      box-sizing: border-box;
      font-family: sans-serif;
      font-weight: 300;
      color: #a7a7a7;
      resize: none;

      &:hover {
        border: 1px solid var(--el-border-color-lighter);
      }

      &:focus {
        border: 1px solid var(--el-border-color-lighter);
      }
    }

    #comment-img-link {
      padding: 2px 10px;
      font-size: 12px;
      height: 25px;
    }

    #comment-textarea {
      padding: 10px;
      height: 300px;
      line-height: 1.3;
      font-size: 16px;
    }

    .menus {
      margin-bottom: 10px;

      @include flex($justify: flex-end);
      .upload-img {
        cursor: pointer;
      }
    }

    .btns {
      margin-top: 15px;
    }
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

      .row-1-1 {
        cursor: pointer;
        transition: 0.3s;

        &:hover {
          transition: 0.3s;
          color: var(--el-color-primary);
        }
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
        word-break: break-all;
        margin: 4px 0 8px 0;
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
