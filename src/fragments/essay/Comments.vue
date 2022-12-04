<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import * as DataType from "../../types/data-type";
import * as Native from "../../utils/native";
import * as Api from "../../utils/api";

const props = defineProps({
  postId: {
    type: Number,
    required: true
  }
});

const route = useRoute();
const router = useRouter();

function nav(path: string, out?: boolean) {
  if (out) {
    window.open(path, "__blank");
  } else router.push(path);
}

let commentForm = ref<DataType.Comment>({ postId: props.postId, parentCommentId: 0, body: "" });
let btnLoading = ref(false);
let comments = ref<Array<DataType.Comment>>();
let commentCount = ref(1);
let currentIndex = ref(0);
let skeleton = ref(true);

interface Legal {
  message?: string;

  success?: (res: any) => void;
}

interface Illegal {
  message?: string;

  error?: () => void;
}

function fetchComment(f: boolean, y?: Legal, n?: Illegal, bf?: Function) {
  if (f) {
    if (bf) bf();
    Api.getCommentCount(props.postId, count => {
      commentCount.value = count;
      currentIndex.value = count;
      Api.getCommentList(props.postId, currentIndex.value, (res: Array<DataType.Essay>) => {
        if (y && y.success) {
          y.success(res);
          if (y.message) {
            ElMessage({
              message: y.message,
              grouping: true,
              type: "success"
            });
          }
        }
      });
    });
  } else {
    if (n && n.error) {
      n.error();
      if (n.message) {
        ElMessage({
          message: n.message,
          grouping: true,
          type: "error"
        });
      }
    }
  }
}

fetchComment(true, {
  message: "", success: (res) => {
    comments.value = res;
    skeleton.value = false;
  }
}, undefined, undefined);

function uploadImage() {
  Native.openImageUploadWindow((imgUrl: any) => {
    commentForm.value.body += `\n\n${imgUrl}\n\n`;
  });
}

function paginationChange() {
  skeleton.value = true;
  Api.getCommentList(props.postId, currentIndex.value, (res: Array<DataType.Essay>) => {
    comments.value = res;
    skeleton.value = false;
  });
}

function insertComment() {
  if (commentForm.value.body) {
    btnLoading.value = true;
    Api.setComment(commentForm.value, ({ data }) => {
      fetchComment(data.isSuccess, {
          message: "你的评论传达成功！😀",
          success(res: any) {
            comments.value = res;
            btnLoading.value = false;
          }
        }, {
          message: "你的评论似乎没有发出去！😑",
          error: () => btnLoading.value = false
        }, () => commentForm.value.body = ""
      );
    });
  } else {
    ElMessage({
      message: "评论不能为空，或字数不够⚠️",
      grouping: true,
      type: "error"
    });
  }
}

/**
 * 删除评论
 *
 * @param comment 评论实体
 * @param index 评论在数组中的 index
 */
function deleteComment(comment: DataType.Comment, index: number) {
  Api.deleteComment(
    {
      commentId: comment.commentId,
      pageIndex: currentIndex.value - 1,
      parentId: props.postId
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
          message: "这可能不是你的评论哦！",
          grouping: true,
          type: "error"
        });
      }
    }
  );
}

/**
 * 更新评论
 *
 * @param comment 评论实体
 */
function updateComment(comment: DataType.Comment) {
  comment.updateEditable = !comment.updateEditable;
  if (comment.replayEditable) comment.replayEditable = false;
  if (comment.updateEditable) Api.getComment({ commentId: comment.commentId }, ({ data }) => comment.body = data);

  if (!comment.updateEditable) {
    Api.updateComment(
      {
        body: comment.body,
        commentId: comment.commentId
      },
      ({ data }) => {
        if (data.isSuccess) {
          ElMessage({
            message: "评论修改成功！",
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
}

/**
 * 点赞或反对评论
 *
 * @param comment 评论实体
 * @param voteType 类型，点赞？反对？
 */
function voteComment(comment: DataType.Comment, voteType: DataType.VoteType) {
  Api.voteComment(
    {
      isAbandoned: false,
      commentId: comment.commentId,
      postId: props.postId,
      voteType: voteType
    },
    ajax => {
      if (ajax.isSuccess) {
        if (voteType == "Bury") comment.bury = comment.bury! + 1;
        else comment.digg = comment.digg! + 1;
      }
      ElMessage({
        message: ajax.message,
        grouping: true,
        type: ajax.isSuccess ? "success" : "error"
      });
    }
  );
}

let replayCommentBody = ref("");
let lastReplayComment = ref();

/**
 * 回复一条评论
 *
 * @param comment 传递一个自定义的博客评论实体，传送数据时需要对应博客园的实体字段，即 CnBlogComment。
 */
function replayComment(comment: DataType.Comment) {
  comment.replayEditable = !comment.replayEditable;
  if (lastReplayComment.value && lastReplayComment.value.commentId !== comment.commentId) lastReplayComment.value.replayEditable = false;
  if (comment.updateEditable) comment.updateEditable = false;

  if (!comment.replayEditable) {
    Api.replayComment({
      body: replayCommentBody.value,
      postId: props.postId,
      parentCommentId: comment.commentId
    }, (ajax: any) => {
      fetchComment(ajax.isSuccess, {
        message: "回复成功！😀",
        success: res => comments.value = res
      }, {
        message: "回复失败！😑"
      });
    });
  } else {
    replayCommentBody.value = "";
    replayCommentBody.value += `回复 ${comment.layer} [@${comment.author}](${comment.space})\n\n`;
  }
  lastReplayComment.value = comment;
}
</script>

<template>
  <div class="comments">
    <h3>发表评论</h3>
    <div class="edit-form">
      <div class="tools">
        <el-tooltip effect="dark" content="插入图片" placement="top-start">
          <el-icon class="upload-img" @click="uploadImage">
            <Picture />
          </el-icon>
        </el-tooltip>
      </div>
      <div class="edit-area">
        <textarea
          v-model="commentForm.body"
          placeholder="请发表一条友善的评论哦~😀支持 Markdown 语法"></textarea>
      </div>
      <div class="img-link__packer">
        <textarea id="img-link" />
      </div>
      <el-button type="primary" :loading="btnLoading" class="upload" @click="insertComment">发送评论
      </el-button>
    </div>
    <h3>评论列表</h3>
    <el-skeleton style="margin-top: 10px" :rows="20" animated :loading="skeleton" />
    <div class="comment-list" v-if="comments?.length && !skeleton">
      <div class="item" v-for="(item, index) in comments" :key="index">
        <div class="header">
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
          <div class="content" v-show="!item.updateEditable" v-html="item.body" v-parse-code="false"></div>
          <div class="edit-area">
            <textarea
              v-show="item.updateEditable"
              v-model="item.body"
              placeholder="请编辑一条友善的评论，支持 Markdown 语法" />
          </div>
          <div class="replay-area">
            <textarea
              v-show="item.replayEditable"
              v-model="replayCommentBody"
              placeholder="请回复一条友善的评论，支持 Markdown 语法" />
          </div>
          <div>
            <div class="replay actions" @click="replayComment(item)">
              <div v-if="!item.replayEditable">
                <el-icon>
                  <ChatRound />
                </el-icon>
                <span>回复</span>
              </div>
              <div v-else>
                <el-icon>
                  <Check />
                </el-icon>
                <span>完成</span>
              </div>
            </div>
            <div class="digg actions" @click="voteComment(item, 'Digg')">
              <el-icon>
                <CaretTop />
              </el-icon>
              <span>{{ item.digg }}</span>
            </div>
            <div class="bury actions" @click="voteComment(item, 'Bury')">
              <el-icon>
                <CaretBottom />
              </el-icon>
              <span>{{ item.bury }}</span>
            </div>
            <div class="delete actions" @click="deleteComment(item, index)">
              <el-icon>
                <Delete />
              </el-icon>
              <span>删除</span>
            </div>
            <div class="update actions" @click="updateComment(item)">
              <div v-if="!item.updateEditable">
                <el-icon>
                  <EditPen />
                </el-icon>
                <span>编辑</span>
              </div>
              <div v-else>
                <el-icon>
                  <CircleCheck />
                </el-icon>
                <span>完成</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination" v-if="!comments?.length">
        <el-pagination
          @current-change="paginationChange"
          layout="prev, pager, next"
          v-model:current-page="currentIndex"
          v-model:page-count="commentCount" />
      </div>
    </div>
    <el-empty v-if="!comments?.length" description="没有评论，来一条友善的评论吧🤨也许是你没有登录所以看不到哦~" />
  </div>
</template>

<style lang="scss">
.comment-list {
  .bottom {
    img {
      border-radius: 6px;
      max-width: 100%;
    }

    p {
      margin: 13px 0 !important;
    }
  }
}
</style>

<style scoped lang="scss">
@import "../../scss/mixins";

@mixin textarea-style($box: yes, $height: 300px) {
  transition: 0.3s;
  border-radius: 8px;
  box-sizing: border-box;

  @if $box == yes {
    border: 1px solid var(--el-border-color-lighter);
  }

  &:hover {
    transition: 0.3s;
    border: 1px solid var(--el-color-primary);
  }

  textarea {
    border: none;
    background-color: #202020;
    width: 100%;
    outline: none;
    border-radius: 8px;
    box-sizing: border-box;
    font-family: font1;
    font-weight: 300;
    color: #a7a7a7;
    padding: 10px;
    height: $height;
    line-height: 1.3;
    font-size: 15px;
    resize: none;
  }
}

.edit-form {
  margin-bottom: 50px;
  position: relative;

  .img-link__packer {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
  }

  .edit-area {
    @include textarea-style($box: yes);
  }

  .tools {
    margin-bottom: 10px;
    @include flex($justify: flex-end);

    .upload-img {
      cursor: pointer;
    }
  }

  .upload {
    margin-top: 15px;
  }
}

.comment-list {
  margin-top: 35px;

  .item {
    margin-bottom: 15px;
  }

  .item:last-child {
    margin-bottom: 0px;
  }

  .header {
    font-size: 14px;
    @include flex($justify: flex-start);

    .avatar {
      margin-right: 15px;
      border-radius: 6px;
    }

    .space {
      font-size: 18px;
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
      font-size: 15px;
      margin-top: 8px;

      .layer {
        @include flex($justify: flex-start);
        margin-right: 10px;
      }
    }
  }

  .bottom {
    margin-top: 12px;
    margin-left: 60px;

    .content {
      font-size: 16px;
      word-break: break-all;
      margin: 4px 0 12px 0;
    }

    .edit-area, .replay-area {
      margin-bottom: 15px;
      @include textarea-style($box: no, $height: 150px);
    }

    & > div + div + div {
      cursor: pointer;
      font-size: 14px;
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

      .replay > div,
      .delete,
      .replay,
      .update,
      .update > div,
      .digg,
      .bury {
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
</style>