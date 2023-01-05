<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { __LITE_CONFIG__ } from "@/config";
import * as DataType from "@/types/data-type";
import * as Native from "@/utils/native";
import * as RemoteApi from "@/utils/api";

const props = defineProps({
  postId: { type: Number, required: true }
});

const route = useRoute();
const router = useRouter();

function nav(path: string, out?: boolean) {
  if (out) window.open(path, "_blank");
  else router.push(path);
}

let form = ref<DataType.Comment>({ postId: props.postId, parentCommentId: 0, content: "" });
let loading = ref(false);
let comments = ref<Array<DataType.Comment>>();
let commentCount = ref(1);
let currentIndex = ref(0);
let skeleton = ref(true);

function fetchComment(
  f: boolean, y?: { message?: string, success?: (res: any) => void },
  n?: { message?: string, error?: () => void }, bf?: Function
) {
  if (f) {
    bf && bf();
    RemoteApi.getCommentCount(props.postId, count => {
      commentCount.value = count;
      currentIndex.value = count;
      RemoteApi.getCommentList(props.postId, currentIndex.value,
        (res: Array<DataType.Essay>) => {
          if (y && y.success) {
            y.success(res);
            if (y.message) {
              ElMessage({ message: y.message, grouping: true, type: "success" });
            }
          }
        });
    });
  } else {
    if (n && n.error) {
      n.error();
      if (n.message) {
        ElMessage({ message: n.message, grouping: true, type: "error" });
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
  Native.openImageUploadWindow((imgUrl: any) => form.value.content += `\n\n${imgUrl}\n\n`);
}

function paginationChange() {
  skeleton.value = true;
  RemoteApi.getCommentList(props.postId, currentIndex.value, (res: Array<DataType.Essay>) => {
    comments.value = res;
    skeleton.value = false;
  });
}

function insertComment() {
  if (form.value.content) {
    loading.value = true;
    RemoteApi.setComment({
        postId: form.value.postId,
        body: form.value.content,
        parentCommentId: form.value.parentCommentId
      },
      ({ data }) => {
        fetchComment(data.isSuccess, {
            message: "你的评论传达成功！😀",
            success(res: any) {
              comments.value = res;
              loading.value = false;
            }
          }, {
            message: "你的评论似乎没有发出去！😑",
            error: () => loading.value = false
          }, () => form.value.content = ""
        );
      });
  } else {
    ElMessage({ message: "评论不能为空，或字数不够⚠️", grouping: true, type: "error" });
  }
}

function deleteComment(comment: DataType.Comment, index: number) {
  RemoteApi.deleteComment(
    { commentId: comment.commentId, pageIndex: currentIndex.value - 1, parentId: props.postId },
    ({ data }) => {
      if (data) {
        comments.value?.splice(index, 1);
        ElMessage({ message: "评论删除成功！", grouping: true, type: "success" });
      } else {
        ElMessage({ message: "这可能不是你的评论哦！", grouping: true, type: "error" });
      }
    }
  );
}

function confirmDeleteComment(comment: DataType.Comment, index: number) {
  deleteComment(comment, index);
}

function updateComment(comment: DataType.Comment) {
  comment.updateEditable = !comment.updateEditable;
  if (comment.replayEditable) comment.replayEditable = false;
  if (comment.updateEditable) RemoteApi.getComment({ commentId: comment.commentId }, ({ data }) => comment.content = data);

  if (!comment.updateEditable) {
    RemoteApi.updateComment(
      {
        body: comment.content,
        commentId: comment.commentId
      },
      ({ data }) => {
        if (data.isSuccess) {
          ElMessage({ message: "评论修改成功！", grouping: true, type: "success" });
        } else {
          ElMessage({ message: "这可能不是你的评论哦~", grouping: true, type: "error" });
        }
      }
    );
  }
}

let reCommentBody = ref("");
let lastReComment = ref<any>();

function replayComment(comment: DataType.Comment) {
  comment.replayEditable = !comment.replayEditable;
  if (lastReComment.value && lastReComment.value.commentId !== comment.commentId) lastReComment.value.replayEditable = false;
  if (comment.updateEditable) comment.updateEditable = false;

  if (!comment.replayEditable) {
    RemoteApi.replayComment({
      body: reCommentBody.value,
      postId: props.postId,
      parentCommentId: comment.commentId
    }, (ajax: any) => {
      fetchComment(ajax.isSuccess, {
        message: "回复成功！😀",
        success: res => comments = res
      }, {
        message: "回复失败！😑"
      });
    });
  } else {
    reCommentBody.value = "";
    reCommentBody.value += `回复 ${comment.layer} [@${comment.author}](${comment.space})\n\n`;
  }
  lastReComment.value = comment;
}

function voteComment(comment: DataType.Comment, voteType: DataType.VoteType) {
  RemoteApi.voteComment(
    { isAbandoned: false, commentId: comment.commentId, postId: props.postId, voteType: voteType },
    ajax => {
      if (ajax.isSuccess) {
        if (voteType == "Bury") comment.bury = comment.bury! + 1;
        else comment.digg = comment.digg! + 1;
      }
      ElMessage({ message: ajax.message, grouping: true, type: ajax.isSuccess ? "success" : "error" });
    }
  );
}
</script>

<template>
  <div class="comments">
    <h3>发表评论</h3>
    <div class="edit-form">
      <div class="tools">
        <el-tooltip effect="dark" content="插入图片" placement="top-start">
          <el-icon class="upload-img" @click="uploadImage">
            <i-ep-picture-rounded />
          </el-icon>
        </el-tooltip>
      </div>
      <div class="edit-area">
        <textarea
          v-model="form.content"
          placeholder="请发表一条友善的评论哦~😀支持 Markdown 语法"
        ></textarea>
      </div>
      <div class="img-link__packer">
        <textarea id="img-link" />
      </div>
      <el-button
        type="primary" :disabled="!__LITE_CONFIG__.isLogined" :loading="loading"
        class="upload" @click="insertComment"
      >
        发送评论
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
          <div class="content" v-show="!item.updateEditable" v-html="item.content" v-parse-code="false"></div>
          <div class="edit-area">
            <textarea
              v-show="item.updateEditable"
              v-model="item.content"
              placeholder="请编辑一条友善的评论，支持 Markdown 语法"
            />
          </div>
          <div class="replay-area">
            <textarea
              v-show="item.replayEditable"
              v-model="reCommentBody"
              placeholder="请回复一条友善的评论，支持 Markdown 语法"
            />
          </div>
          <div>
            <div class="replay actions" @click="replayComment(item)">
              <div v-if="!item.replayEditable">
                <el-icon>
                  <i-ep-chat-round />
                </el-icon>
                <span>回复</span>
              </div>
              <div v-else>
                <el-icon>
                  <i-ep-check />
                </el-icon>
                <span>完成</span>
              </div>
            </div>
            <div class="digg actions" @click="voteComment(item, 'Digg')">
              <el-icon>
                <i-ep-caret-top />
              </el-icon>
              <span>{{ item.digg }}</span>
            </div>
            <div class="bury actions" @click="voteComment(item, 'Bury')">
              <el-icon>
                <i-ep-caret-bottom />
              </el-icon>
              <span>{{ item.bury }}</span>
            </div>
            <div class="actions">
              <el-popconfirm
                confirm-button-text="确定"
                cancel-button-text="取消"
                icon-color="#626AEF"
                title="确定删除该评论？"
                @confirm="confirmDeleteComment(item, index)"
              >
                <template #reference>
                  <div class="delete">
                    <el-icon>
                      <i-ep-delete />
                    </el-icon>
                    <span>删除</span>
                  </div>
                </template>
              </el-popconfirm>
            </div>
            <div class="update actions" @click="updateComment(item)">
              <div v-if="!item.updateEditable">
                <el-icon>
                  <i-ep-edit-pen />
                </el-icon>
                <span>编辑</span>
              </div>
              <div v-else>
                <el-icon>
                  <i-ep-circle-check />
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
          v-model:page-count="commentCount"
        />
      </div>
    </div>
    <el-empty v-if="__LITE_CONFIG__.isLogined && !comments?.length" description="没有评论，来一条友善的评论吧🤨" />
    <el-empty v-if="!__LITE_CONFIG__.isLogined" description="你没有登录所以看不到评论哦~" />
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
@mixin textarea-style($box: yes, $height: 300px) {
  border-radius: 8px;
  box-sizing: border-box;

  @if $box == yes {
    border: 1px solid var(--el-border-color-lighter);
  }

  @include ahover() {
    border: 1px solid var(--el-color-primary);
  }

  textarea {
    font-family: sans-serif;
    border: none;
    background-color: #202020;
    width: 100%;
    outline: none;
    border-radius: 8px;
    box-sizing: border-box;
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
    margin-bottom: 0;
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

      @include ahover();
    }

    .brief {
      color: var(--el-text-color-placeholder);
      @include flex($justify: flex-start);
      font-size: 13px;
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
      color: var(--el-text-color-placeholder);
      cursor: pointer;
      font-size: 13px;
      @include flex($justify: flex-end);

      .replay > div,
      .update > div,
      .actions, .delete {
        margin-right: 15px;
        @include flex();
        @include ahover();

        &:last-child {
          margin-right: 0 !important;
        }
      }
    }
  }

  .pagination {
    margin-top: 30px;
    @include flex($justify: flex-end);
  }
}
</style>