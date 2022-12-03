<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import * as DataType from "../../types/data-type";
import * as API from "../../utils/api";
import * as Native from "../../utils/native";

const props = defineProps({
  postId: {
    type: Number,
    required: true
  }
});

let editComment = ref<DataType.Comment>({ postId: props.postId, parentCommentId: 0, body: "" });
let editCommentLoading = ref(false);
let comments = ref<Array<DataType.Comment>>();
let commentCount = ref(1);
let currCommentPage = ref(1);
let commentSkeleton = ref(false);

API.getCommentCount(props.postId, count => {
  commentCount.value = count;
  currCommentPage.value = count;
  commentSkeleton.value = true;
  API.getCommentList(props.postId, count, (str: Array<DataType.Essay>) => {
    comments.value = str;
    commentSkeleton.value = false;
  });
});

function uploadImage() {
  Native.openImageUploadWindow((imgUrl: any) => {
    editComment.value.body += `\n\n${imgUrl}\n\n`;
  });
}

function paginationChange() {
  commentSkeleton.value = true;
  API.getCommentList(props.postId, currCommentPage.value, (str: Array<DataType.Essay>) => {
    comments.value = str;
    commentSkeleton.value = false;
  });
}

function insertComment() {
  if (editComment.value.body) {
    editCommentLoading.value = true;
    API.setComment(editComment.value, ({ data }) => {
      if (data.isSuccess) {
        editComment.value.body = "";
        API.getCommentCount(props.postId, count => {
          commentCount.value = count;
          currCommentPage.value = count;
          API.getCommentList(props.postId, currCommentPage.value, (str: Array<DataType.Essay>) => {
            comments.value = str;
            editCommentLoading.value = false;
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
        editCommentLoading.value = false;
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

/**
 * 删除评论
 *
 * @param comment 评论实体
 * @param index 评论在数组中的 index
 */
function deleteComment(comment: DataType.Comment, index: number) {
  API.deleteComment(
    {
      commentId: comment.commentId,
      pageIndex: currCommentPage.value - 1,
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
          message: "这可能不是你的评论哦~",
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
  comment.contenteditable = !comment.contenteditable;

  if (comment.contenteditable) {
    API.getComment({ commentId: comment.commentId }, ({ data }) => {
      comment.body = data;
    });
  }

  if (!comment.contenteditable) {
    API.updateComment(
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
function voteComm(comment: DataType.Comment, voteType: DataType.VoteType) {
  API.voteComment(
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
</script>

<template>
  <div class="comments">
    <h3>发表评论</h3>
    <div class="comment-form">
      <div class="tools">
        <el-tooltip effect="dark" content="插入图片" placement="top-start">
          <el-icon class="upload-img" @click="uploadImage">
            <Picture />
          </el-icon>
        </el-tooltip>
      </div>
      <div class="comment-textarea-box">
        <textarea
          id="comment-textarea"
          v-model="editComment.body"
          placeholder="请发表一条友善的评论哦~😀支持 Markdown 语法"></textarea>
      </div>
      <div class="comment-img-link-box">
        <textarea id="comment-img-link" />
      </div>
      <el-button type="primary" :loading="editCommentLoading" class="actions" @click="insertComment">发送评论
      </el-button>
    </div>
    <h3>评论列表</h3>
    <el-skeleton style="margin-top: 10px" :rows="20" animated :loading="loading" />
    <div v-if="comments?.length && !loading">
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
          <div class="body" v-show="!item.contenteditable" v-html="item.body" v-parse-code="false"></div>
          <div class="comment-textarea-box">
            <textarea
              v-show="item.contenteditable"
              v-model="item.body"
              placeholder="请发表一条友善的评论哦~😀支持 Markdown 语法" />
          </div>
          <div>
            <div class="digg actions" @click="voteComm(item, 'Digg')">
              <el-icon>
                <CaretTop />
              </el-icon>
              <span>{{ item.digg }}</span>
            </div>
            <div class="burry actions" @click="voteComm(item, 'Bury')">
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
              <div v-if="!item.contenteditable">
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
      <div class="pagination" v-if="!data?.length">
        <el-pagination
          @current-change="paginationChange"
          layout="prev, pager, next"
          v-model:current-page="currCommentPage"
          v-model:page-count="commentCount" />
      </div>
    </div>
    <el-empty v-if="!data?.length" description="没有评论，来一条友善的评论吧🤨也许是你没有登录所以看不到哦~" />
  </div>
</template>

<style scoped lang="scss">

</style>