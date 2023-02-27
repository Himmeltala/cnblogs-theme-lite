<script setup lang="ts">
import { PropType } from "vue";
import { openImageUploadWindow } from "@/utils/common";
import { updateComment, getComment, getCommentCount, getCommentList } from "@/apis/remote-api";

const props = defineProps({
  comment: {
    type: Object as PropType<any>,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  postId: {
    type: String,
    required: true
  }
});
const emits = defineEmits(["onBefore", "onFinish", "onCancel"]);

let htmlContent = "";
const content = ref("");

function uploadImage(el: string) {
  openImageUploadWindow(el, (imgUrl: any) => {
    content.value += `\n\n${imgUrl}\n\n`;
  });
}

async function before() {
  htmlContent = props.comment.content;
  content.value = await getComment({ commentId: props.comment.commentId });
  props.comment.isEditingUpdate = !props.comment.isEditingUpdate;
}

async function finish() {
  const response = await updateComment({
    body: content.value,
    commentId: props.comment.commentId
  });

  if (response.isSuccess) {
    content.value = "";
    props.comment.isEditingReplay = !props.comment.isEditingReplay;
    emits("onFinish", {
      count: await getCommentCount(props.postId),
      comments: await getCommentList(props.postId, 0)
    });
    ElMessage({ message: "修改评论成功！", grouping: true, type: "success" });
  } else {
    ElMessage({ message: "这不是你的评论，没有权限编辑！", grouping: true, type: "error" });
  }
}

function cancel() {
  props.comment.content = htmlContent;
  props.comment.isEditingUpdate = !props.comment.isEditingUpdate;
}
</script>

<template>
  <div class="l-comment__editor">
    <div class="float-right w-100%" v-show="comment.isEditingUpdate">
      <div class="mb-2 f-c-e">
        <el-tooltip effect="dark" content="插入图片" placement="top-start">
          <span class="hover" @click="uploadImage('upload-img-' + index)">
            <i-ep-picture-rounded />
          </span>
        </el-tooltip>
      </div>
      <div class="textarea">
        <textarea v-model="content" placeholder="请编辑一条友善的评论，支持 Markdown 语法" />
      </div>
    </div>
    <div
      v-show="!comment.isEditingReplay"
      class="float-right f-c-e l-fiv-size l-sec-color"
      :class="{ 're-item': !comment.isEditingUpdate, 'w-100%': comment.isEditingUpdate }">
      <div v-show="!comment.isEditingUpdate" class="hover f-c-e" @click="before">
        <i-ep-edit-pen class="mr-1" />
        <span>编辑</span>
      </div>
      <div v-show="comment.isEditingUpdate" class="hover f-c-e mr-4" @click="finish">
        <i-ep-circle-check class="mr-1" />
        <span>完成编辑</span>
      </div>
      <div class="hover" v-if="comment.isEditingUpdate">
        <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" title="确定取消编辑该评论？" @confirm="cancel">
          <template #reference>
            <div class="hover f-c-e">
              <i-ep-circle-close class="mr-1" />
              <span>取消编辑</span>
            </div>
          </template>
        </el-popconfirm>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@include pc() {
  .re-item {
    --at-apply: w-8%;
  }
}

@include mb() {
  .re-item {
    --at-apply: w-18%;
  }
}
</style>
