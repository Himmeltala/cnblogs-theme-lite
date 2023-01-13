<script setup lang="ts">
import $ from "jquery";
import { __LITE_CONFIG__ } from "@/lite.config";
import { nav } from "@/utils/route-helper";
import * as DataType from "@/types/data-type";
import * as Native from "@/utils/native";
import * as RemoteApi from "@/utils/api";
import { useCommentsAnchorStore } from "@/store";

const props = defineProps({
  postId: { type: Number, required: true }
});
const commentAnchorQuote = ref<any>(null);
const { commentAnchor } = storeToRefs(useCommentsAnchorStore());

let form = ref<DataType.Comment>({ postId: props.postId, parentCommentId: 0, content: "" });
let loading = ref(false);
let skeleton = ref(true);
let comments = ref<Array<DataType.Comment>>();
let commentCount = ref(1);
let currentIndex = ref(0);
let commentContent = ref("");
let tempReplayComment: DataType.Comment;
let tempUpdateComment: DataType.Comment;

function fetchComment(
  f: boolean,
  y?: { message?: string; success?: (res: any) => void },
  n?: { message?: string; error?: () => void }
) {
  if (f) {
    RemoteApi.getCommentCount(props.postId, count => {
      commentCount.value = count;
      currentIndex.value = count;
      RemoteApi.getCommentList(
        props.postId,
        currentIndex.value,
        (res: any) => {
          if (y && y.success) {
            y.success(res);
            if (y.message) ElMessage({ message: y.message, grouping: true, type: "success" });
          }
        },
        commentAnchor.value
      );
    });
  } else {
    if (n) {
      n.error && n.error();
      if (n.message) ElMessage({ message: n.message, grouping: true, type: "error" });
    }
  }
}

fetchComment(true, {
  success: res => {
    comments.value = res;
    skeleton.value = false;
  }
});

watch(commentAnchorQuote, () => {
  if (commentAnchorQuote.value.length > 0) {
    const top = commentAnchorQuote.value[0].offsetTop;
    $("#h-content").animate({ scrollTop: top }, 200, "linear");
  }
  commentAnchor.value = 0;
});

function uploadImage(el: string, comment?: DataType.Comment) {
  Native.openImageUploadWindow(el, (imgUrl: any) => {
    if (comment) commentContent.value += `\n\n${imgUrl}\n\n`;
    else form.value.content += `\n\n${imgUrl}\n\n`;
  });
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
    RemoteApi.setComment(
      {
        postId: form.value.postId,
        body: form.value.content,
        parentCommentId: form.value.parentCommentId
      },
      ({ data }) => {
        fetchComment(
          data.isSuccess,
          {
            message: "发送评论成功！",
            success(res: any) {
              comments.value = res;
              loading.value = false;
              form.value.content = "";
            }
          },
          {
            message: "发送评论失败！",
            error: () => (loading.value = false)
          }
        );
      }
    );
  } else ElMessage({ message: "评论不能为空，或字数不够⚠️", grouping: true, type: "error" });
}

function deleteComment(comment: DataType.Comment, index: number) {
  RemoteApi.deleteComment(
    { commentId: comment.commentId, pageIndex: currentIndex.value - 1, parentId: props.postId },
    ({ data }) => {
      if (data) {
        comments.value?.splice(index, 1);
        ElMessage({ message: "删除评论成功！", grouping: true, type: "success" });
      } else ElMessage({ message: "这不是你的评论，没有权限删除！", grouping: true, type: "error" });
    }
  );
}

function confirmDeleteComment(comment: DataType.Comment, index: number) {
  deleteComment(comment, index);
}

function cancelUpdateComment(comment: DataType.Comment) {
  comment.updateEditable = !comment.updateEditable;
  comment.isEditingUpdate = !comment.isEditingUpdate;
  comment.content = comment.htmlContent;
}

function beforeUpdateComment(comment: DataType.Comment) {
  comment.htmlContent = comment.content;
  if (tempUpdateComment && tempUpdateComment.commentId !== comment.commentId) {
    if (tempUpdateComment.updateEditable) tempUpdateComment.updateEditable = false;
    if (tempUpdateComment.isEditingUpdate) tempUpdateComment.isEditingUpdate = false;
    tempUpdateComment.content = tempUpdateComment.htmlContent;
  }

  RemoteApi.getComment({ commentId: comment.commentId }, ({ data }) => {
    comment.content = data;
    comment.updateEditable = !comment.updateEditable;
    comment.isEditingUpdate = !comment.isEditingUpdate;
  });
  tempUpdateComment = comment;
}

function finishUpdateComment(comment: DataType.Comment) {
  RemoteApi.updateComment(
    {
      body: comment.content,
      commentId: comment.commentId
    },
    ({ data }) => {
      if (data.isSuccess) {
        fetchComment(true, {
          success: res => {
            comments.value = res;
            comment.updateEditable = !comment.updateEditable;
            comment.isEditingUpdate = !comment.isEditingUpdate;
            ElMessage({ message: "修改评论成功！", grouping: true, type: "success" });
          }
        });
      } else {
        ElMessage({ message: "这不是你的评论，没有权限编辑！", grouping: true, type: "error" });
      }
    }
  );
}

function cancelReplayComment(comment: DataType.Comment) {
  comment.replayEditable = !comment.replayEditable;
  comment.isEditingReplay = !comment.isEditingReplay;
  comment.content = comment.htmlContent;
}

function beforeReplayComment(comment: DataType.Comment) {
  comment.htmlContent = comment.content;
  comment.replayEditable = !comment.replayEditable;
  comment.isEditingReplay = !comment.isEditingReplay;

  if (tempReplayComment && tempReplayComment.commentId !== comment.commentId) {
    if (tempReplayComment.replayEditable) tempReplayComment.replayEditable = false;
    if (tempReplayComment.isEditingReplay) tempReplayComment.isEditingReplay = false;
    tempReplayComment.content = tempReplayComment.htmlContent;
  }

  commentContent.value = "";
  commentContent.value += `回复 ${comment.layer} [@${comment.author}](${comment.space})\n\n`;
  tempReplayComment = comment;
}

function finishReplayComment(comment: DataType.Comment) {
  RemoteApi.replayComment(
    {
      body: commentContent.value,
      postId: props.postId,
      parentCommentId: comment.commentId
    },
    (ajax: any) => {
      fetchComment(
        ajax.isSuccess,
        {
          message: `成功回复 ${comment.author} 的评论！`,
          success: res => {
            comments.value = res;
            comment.replayEditable = !comment.replayEditable;
            comment.isEditingReplay = !comment.isEditingReplay;
          }
        },
        {
          message: ajax.message
        }
      );
      commentContent.value = "";
    }
  );
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
    <div class="mb-12 relative">
      <div class="tools mb-2 flex justify-end content-center items-center">
        <el-tooltip effect="dark" content="插入图片" placement="top-start">
          <el-icon class="cursor-pointer" @click="uploadImage('main-upload-img')">
            <i-ep-picture-rounded />
          </el-icon>
        </el-tooltip>
      </div>
      <div class="pusharea">
        <textarea v-model="form.content" placeholder="请发表一条友善的评论哦~😀支持 Markdown 语法"></textarea>
      </div>
      <div class="absolute opacity-0 top-0 left-0">
        <textarea id="main-upload-img" />
      </div>
      <el-button
        class="mt-4"
        type="primary"
        :disabled="!__LITE_CONFIG__.isLogined"
        :loading="loading"
        @click="insertComment">
        发送评论
      </el-button>
    </div>
    <h3>评论列表</h3>
    <el-skeleton v-if="comments?.length" style="margin-top: 10px" :rows="20" animated :loading="skeleton" />
    <div class="mt-10" v-if="comments?.length && !skeleton && __LITE_CONFIG__.isLogined">
      <div class="mb-9" v-for="(item, index) in comments" :key="index">
        <div class="flex items-center content-center justify-start">
          <el-image class="mr-4 rd-50 w-14 h-14" :src="item.avatar" fit="fill" />
          <div>
            <div class="fsz-0.95 hover cursor-pointer" @click="nav(item.space)">{{ item.author }}</div>
            <div class="fsz-0.8 color-#8D9095 mt-1.5 flex items-center content-center justify-center">
              <div
                v-if="commentAnchor === item.commentId"
                ref="commentAnchorQuote"
                :id="'#' + item.commentId"
                class="mr-2">
                {{ item.layer }}
              </div>
              <div v-else :id="'#' + item.commentId" class="mr-2">
                {{ item.layer }}
              </div>
              <div>{{ item.date }}</div>
            </div>
          </div>
        </div>
        <div class="mt-3 relative" style="margin-left: 4.5rem">
          <div class="c-content" v-show="!item.updateEditable" v-html="item.content" v-parse-code="false"></div>
          <div class="absolute opacity-0 top-0 left-0">
            <textarea :id="'upload-img-' + index" />
          </div>
          <div class="editarea" v-show="item.updateEditable">
            <div class="tools mb-2 flex justify-end content-center items-center">
              <el-tooltip effect="dark" content="插入图片" placement="top-start">
                <el-icon class="cursor-pointer" @click="uploadImage('upload-img-' + index, item)">
                  <i-ep-picture-rounded />
                </el-icon>
              </el-tooltip>
            </div>
            <div>
              <textarea ref="editarea" v-model="item.content" placeholder="请编辑一条友善的评论，支持 Markdown 语法" />
            </div>
          </div>
          <div class="replayarea" v-show="item.replayEditable">
            <div class="tools mb-2 flex justify-end content-center items-center">
              <el-tooltip effect="dark" content="插入图片" placement="top-start">
                <el-icon class="cursor-pointer" @click="uploadImage('upload-img-' + index, item)">
                  <i-ep-picture-rounded />
                </el-icon>
              </el-tooltip>
            </div>
            <div>
              <textarea
                ref="replayarea"
                v-model="commentContent"
                placeholder="请回复一条友善的评论，支持 Markdown 语法" />
            </div>
          </div>
          <div class="actions fsz-0.8 cursor-pointer color-#a8abb2 flex justify-end items-center content-center">
            <div
              v-show="!item.replayEditable && !item.isEditingUpdate"
              class="hover mr-3 flex justify-end items-center content-center"
              @click="beforeReplayComment(item)">
              <el-icon class="mr-0.5">
                <i-ep-chat-round />
              </el-icon>
              <span>回复</span>
            </div>
            <div
              v-show="item.replayEditable && !item.isEditingUpdate"
              class="hover mr-3 flex justify-end items-center content-center"
              @click="finishReplayComment(item)">
              <el-icon class="mr-0.5">
                <i-ep-check />
              </el-icon>
              <span>完成回复</span>
            </div>
            <div
              v-show="item.replayEditable && !item.isEditingUpdate"
              class="hover mr-3 flex justify-end items-center content-center"
              @click="cancelReplayComment(item)">
              <el-icon class="mr-0.5">
                <i-ep-close />
              </el-icon>
              <span>取消回复</span>
            </div>
            <div
              v-show="!item.isEditingUpdate && !item.isEditingReplay"
              class="hover mr-3 flex justify-end items-center content-center actions"
              @click="voteComment(item, 'Digg')">
              <el-icon class="mr-0.5">
                <i-ep-caret-top />
              </el-icon>
              <span>{{ item.digg }}</span>
            </div>
            <div
              v-show="!item.isEditingUpdate && !item.isEditingReplay"
              class="hover mr-3 flex justify-end items-center content-center actions"
              @click="voteComment(item, 'Bury')">
              <el-icon class="mr-0.5">
                <i-ep-caret-bottom />
              </el-icon>
              <span>{{ item.bury }}</span>
            </div>
            <div v-show="!item.isEditingUpdate && !item.isEditingReplay" class="mr-3">
              <el-popconfirm
                confirm-button-text="确定"
                cancel-button-text="取消"
                title="确定删除该评论？"
                @confirm="confirmDeleteComment(item, index)">
                <template #reference>
                  <div class="hover flex justify-end items-center content-center">
                    <el-icon class="mr-0.5">
                      <i-ep-delete />
                    </el-icon>
                    <span>删除</span>
                  </div>
                </template>
              </el-popconfirm>
            </div>
            <div
              v-show="!item.updateEditable && !item.isEditingReplay"
              class="hover flex justify-end items-center content-center"
              @click="beforeUpdateComment(item)">
              <el-icon class="mr-0.5">
                <i-ep-edit-pen />
              </el-icon>
              <span>编辑</span>
            </div>
            <div
              v-show="item.updateEditable && !item.isEditingReplay"
              class="hover mr-3 flex justify-end items-center content-center"
              @click="finishUpdateComment(item)">
              <el-icon class="mr-0.5">
                <i-ep-circle-check />
              </el-icon>
              <span>完成编辑</span>
            </div>
            <div class="hover" v-if="item.updateEditable && !item.isEditingReplay">
              <el-popconfirm
                confirm-button-text="确定"
                cancel-button-text="取消"
                title="确定取消编辑该评论？"
                @confirm="cancelUpdateComment(item)">
                <template #reference>
                  <div class="hover flex justify-end items-center content-center">
                    <el-icon class="mr-0.5">
                      <i-ep-circle-close />
                    </el-icon>
                    <span>取消编辑</span>
                  </div>
                </template>
              </el-popconfirm>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-10 flex items-center content-center justify-end" v-if="!comments?.length">
        <el-pagination
          @current-change="paginationChange"
          layout="prev, pager, next"
          v-model:current-page="currentIndex"
          v-model:page-count="commentCount" />
      </div>
    </div>
    <el-empty v-else-if="__LITE_CONFIG__.isLogined && !comments?.length" description="没有评论，来一条友善的评论吧🤨" />
    <el-empty v-else-if="!__LITE_CONFIG__.isLogined" description="你没有登录或没有申请博客权限，所以看不到评论哦~" />
  </div>
</template>

<style lang="scss">
.c-content {
  --at-apply: fsz-0.9 break-all;
  @include font-space();

  img {
    border-radius: 6px;
    max-width: 100%;
    object-fit: cover;
  }

  a {
    color: #a7a7a7;
    padding-bottom: 1px;
    border-bottom: 1px dotted #a7a7a7;

    @include hover() {
      border-bottom-color: var(--el-color-primary);
    }
  }
}
</style>

<style scoped lang="scss">
@mixin textarea($height: 270px) {
  --at-apply: rd-2 box-border p-2.5;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial,
    sans-serif;
  background-color: #202020;
  width: 100%;
  border: none;
  outline: none;
  font-weight: 300;
  color: #a7a7a7;
  height: $height;
  line-height: 1.3;
  font-size: 14px;
  resize: none;
}

@mixin container() {
  --at-apply: mb-5 rd-2 box-border;
  border: 1px solid var(--el-border-color-lighter);

  @include hover() {
    border: 1px solid var(--el-color-primary);
  }
}

.pusharea {
  @include container();

  textarea {
    @include textarea();
  }
}

.editarea,
.replayarea {
  & > div + div {
    @include container();
  }

  textarea {
    @include textarea($height: 150px);
  }
}
</style>
