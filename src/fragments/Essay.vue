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

let essay = ref<DataType.Essay>();
let tagsCategroies = ref<any>({ categories: {}, tags: {} });

let commCount = ref(1);
let currentCommPage = ref(1);
let comments = ref<Array<DataType.Comment>>();
let holeSkeleton = ref(true);

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

/**
 * 该页面初始化时第一时间要做的事情
 */
API.getEssay(postId, (str: DataType.Essay) => {
  essay.value = str;
  API.getCommCount(postId, count => {
    commCount.value = count;
    currentCommPage.value = count;
    API.getCommList(postId, count, (str: Array<DataType.Essay>) => {
      comments.value = str;
      API.getEssayTagsAndCategories(666252, postId, str => {
        tagsCategroies.value = str;
        holeSkeleton.value = false;
      });
    });
  });
});

let comment = ref<DataType.Comment>({ postId, parentCommentId: 0, body: "" });
let commBtnLoading = ref(false);

/**
 * 添加一条评论
 */
function setComm() {
  if (comment.value.body) {
    commBtnLoading.value = true;
    API.setComm(comment.value, ({ data }) => {
      if (data.isSuccess) {
        comment.value.body = "";
        API.getCommCount(postId, count => {
          commCount.value = count;
          currentCommPage.value = count;
          API.getCommList(postId, currentCommPage.value, (str: Array<DataType.Essay>) => {
            comments.value = str;
            commBtnLoading.value = false;
            ElMessage({
              message: "你的评论已经飞走了！😀",
              grouping: true,
              type: "success"
            });
          });
        });
      } else {
        ElMessage({
          message: "你的评论在原地踏步！😟",
          grouping: true,
          type: "error"
        });
        commBtnLoading.value = false;
      }
    });
  } else {
    ElMessage({
      message: "评论不能为空，或字数不够",
      grouping: true,
      type: "error"
    });
  }
}

let fontSize = ref(16);

/**
 * 缩放随笔文章区域的字体大小
 */
function zoomIn() {
  fontSize.value >= 18 ? (fontSize.value = 16) : fontSize.value++;
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

/**
 * 编辑评论点击上传照片
 */
function uploadImage() {
  Native.openImageUploadWindow((imgUrl: any) => {
    comment.value.body += "\n\n" + imgUrl;
  });
}

let commsSkeleton = ref(false);

/**
 *分页符改变时重新获取评论列表
 */
function paginationChange() {
  commsSkeleton.value = true;
  API.getCommList(postId, currentCommPage.value, (str: Array<DataType.Essay>) => {
    comments.value = str;
    commsSkeleton.value = false;
  });
}

/**
 * 删除评论
 *
 * @param comm 评论实体
 * @param index 评论在数组中的 index
 */
function commDelete(comm: DataType.Comment, index: number) {
  API.delComm(
    {
      commentId: comm.commentId,
      pageIndex: currentCommPage.value - 1,
      parentId: parseInt(postId)
    },
    ({ data }) => {
      if (data) {
        comments.value?.splice(index, 1);
        ElMessage({
          message: "评论删除成功！",
          grouping: true,
          type: "success"
        });
      } else {
        ElMessage({
          message: "这可能不是你的评论哦~",
          grouping: true,
          type: "error"
        });
      }
    }
  );
}

/**
 * 修改评论
 */
function commUpdate() {}
</script>

<template>
  <div class="essay">
    <Card class="wrap" padding="20px 20px">
      <el-skeleton style="margin-top: 10px" :rows="20" animated :loading="holeSkeleton" />
      <div v-if="!holeSkeleton">
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
        <div class="essay-content" :style="{ 'font-size': fontSize + 'px' }" v-parse-code="true" v-html="essay?.content"></div>
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
        <div class="comment-form">
          <div class="tools">
            <el-tooltip effect="dark" content="插入图片" placement="top-start">
              <el-icon class="upload-img" @click="uploadImage"><Picture /></el-icon>
            </el-tooltip>
          </div>
          <div class="comment-textarea-box">
            <textarea
              id="comment-textarea"
              v-model="comment.body"
              placeholder="请发表一条友善的评论哦~😀支持 Markdown 语法"></textarea>
          </div>
          <div class="comment-img-link-box">
            <textarea id="comment-img-link" />
          </div>
          <el-button type="primary" :loading="commBtnLoading" class="actions" @click="setComm">发送评论</el-button>
        </div>
        <div class="essay-comments">
          <h3>评论列表</h3>
          <el-skeleton style="margin-top: 10px" :rows="20" animated :loading="commsSkeleton" />
          <div v-if="comments?.length && !commsSkeleton">
            <div class="item" v-for="(item, index) in comments" :key="index">
              <div class="top">
                <el-image class="avatar" style="width: 45px; height: 45px" :src="item.avatar" fit="fill" />
                <div>
                  <div class="space" @click="nav('' + item.space, true)">{{ item.author }}</div>
                  <div class="brief">
                    <div class="layer">{{ item.layer }}</div>
                    <div class="date">{{ item.date }}</div>
                  </div>
                </div>
              </div>
              <div class="bottom">
                <div class="body" v-html="item.body" v-parse-code="false"></div>
                <div>
                  <div class="digg actions">
                    <el-icon><CaretTop /></el-icon>
                    <span>{{ item.digg }}</span>
                  </div>
                  <div class="burry actions">
                    <el-icon><CaretBottom /></el-icon>
                    <span>{{ item.burry }}</span>
                  </div>
                  <div class="delete actions" @click="commDelete(item, index)">
                    <el-icon><Delete /></el-icon>
                    <span>删除</span>
                  </div>
                  <div class="update actions" @click="commUpdate">
                    <el-icon><EditPen /></el-icon>
                    <span>修改</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="pagination" v-if="!comments?.length">
              <el-pagination
                @current-change="paginationChange"
                layout="prev, pager, next"
                v-model:current-page="currentCommPage"
                v-model:page-count="commCount" />
            </div>
          </div>
          <el-empty v-if="!comments?.length" description="没有评论，来一条友善的评论吧🤨也许是你没有登录所以看不到哦~" />
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
    margin: 0 !important;
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
      line-height: 1.2;
      letter-spacing: 1px;
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

.cust-img {
  border-radius: 6px;
  width: 100%;
  object-fit: cover;
}

.essay-content {
  @mixin font() {
    letter-spacing: 1.2px;
    word-break: break-all;
    @content;
  }

  a {
    padding-bottom: 1px;
    border-bottom: 1px dotted #a7a7a7;
    transition: 0.3s;

    &:hover {
      transition: 0.3s;
      border-bottom: 1px dotted var(--el-color-primary);
    }
  }

  p {
    margin: 13px 0 !important;
    @include font() {
      line-height: 1.5;
    }
  }

  ol,
  ul {
    li {
      @include font() {
        line-height: 1.5;
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

.essay-comments {
  .bottom {
    img {
      border-radius: 6px;
    }

    p {
      margin: 13px 0 !important;
    }
  }
}

.el-page-header__left {
  margin-right: 0 !important;
}
</style>

<style lang="scss">
@import "../scss/mixins.scss";

/* ------global properties start------ */
// 字体颜色
$color: #a7a7a7;
// 随笔标题字体
$title-size: 24px;
// info、labels 的字体
$info-size: 14px;
// 评论区个人信息字体
$comm-brief-size: 13px;
// 评论区的字体
$comm-body-size: 16px;
/* ------global properties end------ */

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

  .comment-form {
    position: relative;

    .comment-textarea-box {
      transition: 0.3s;
      border-radius: 8px;
      box-sizing: border-box;
      border: 1px solid var(--el-border-color-lighter);

      &:hover {
        transition: 0.3s;
        border: 1px solid var(--el-color-primary);
      }
    }

    .comment-img-link-box {
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
    }

    #comment-textarea {
      border: none;
      background-color: #202020;
      width: 100%;
      outline: none;
      border-radius: 8px;
      box-sizing: border-box;
      font-family: sans-serif;
      font-weight: 300;
      color: #a7a7a7;
      padding: 10px;
      height: 300px;
      line-height: 1.3;
      font-size: 15px;
      resize: none;
    }

    .tools {
      margin-bottom: 10px;

      @include flex($justify: flex-end);
      .upload-img {
        cursor: pointer;
      }
    }

    .actions {
      margin-top: 15px;
    }
  }

  .essay-comments {
    .item {
      margin-bottom: 15px;
    }

    .item:last-child {
      margin-bottom: 0px;
    }

    .top {
      font-size: 14px;
      @include flex($justify: flex-start);

      .avatar {
        margin-right: 10px;
        border-radius: 6px;
      }

      .space {
        cursor: pointer;
        transition: 0.3s;

        &:hover {
          transition: 0.3s;
          color: var(--el-color-primary);
        }
      }

      .brief {
        color: var(--el-text-color-placeholder);
        @include flex($justify: flex-start);
        font-size: $comm-brief-size;
        margin-top: 2px;

        .layer {
          @include flex($justify: flex-start);
          margin-right: 10px;
        }
      }
    }

    .bottom {
      margin-left: 55px;

      .body {
        font-size: $comm-body-size;
        word-break: break-all;
        margin: 4px 0 8px 0;
      }

      & > div + div {
        cursor: pointer;
        font-size: $comm-brief-size;
        @include flex($justify: flex-end);

        @mixin actions-hover() {
          transition: 0.3s;

          &:hover {
            transition: 0.3s;
            color: var(--el-color-primary);
          }
        }

        .actions {
          margin-right: 15px;

          &:last-child {
            margin-right: 0 !important;
          }
        }

        .delete,
        .update,
        .digg,
        .burry {
          @include flex();
          @include actions-hover();
        }
      }
    }

    .pagination {
      margin-top: 30px;
      @include flex($justify: flex-end);
    }
  }
}
</style>
