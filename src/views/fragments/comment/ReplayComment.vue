<script setup lang="ts">
import { PropType } from "vue";
import { openImageUploadWindow } from "@/utils/common";
import { replayComment, getCommentCount, getCommentList } from "@/utils/remote-api";

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
    type: Number,
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

function before() {
  htmlContent = props.comment.content;
  props.comment.isEditingReplay = !props.comment.isEditingReplay;

  emits("onBefore");
}

async function finish() {
  const response = await replayComment({
    body: `回复 ${props.comment.layer} [@${props.comment.author}](${props.comment.space})\n\n` + content.value,
    postId: props.postId,
    parentCommentId: props.comment.commentId
  });

  if (response.isSuccess) {
    content.value = "";
    props.comment.isEditingReplay = !props.comment.isEditingReplay;
    emits("onFinish", {
      count: await getCommentCount(props.postId),
      comments: await getCommentList(props.postId, 0)
    });
    ElMessage({ message: "回复评论成功！", grouping: true, type: "success" });
  } else {
    ElMessage({ message: "回复评论失败！", grouping: true, type: "error" });
  }
}

function cancel() {
  props.comment.content = htmlContent;
  props.comment.isEditingReplay = !props.comment.isEditingReplay;

  emits("onCancel");
}
</script>

<template>
  <div class="replay-comment">
    <div class="float-right w-100%" v-show="comment.isEditingReplay">
      <div class="mb-2 f-c-e">
        <el-tooltip content="插入图片" placement="top-start">
          <el-icon class="cursor-pointer" @click="uploadImage('upload-img-' + index)">
            <i-ep-picture-rounded />
          </el-icon>
        </el-tooltip>
      </div>
      <div class="textarea">
        <textarea v-model="content" placeholder="请回复一条友善的评论，支持 Markdown 语法" />
      </div>
    </div>
    <div
      v-show="!comment.isEditingUpdate"
      class="float-right f-c-e l-fiv-size l-sec-color"
      :class="{ 'ed-item': !comment.isEditingReplay, ' w-100%': comment.isEditingReplay }">
      <div v-show="!comment.isEditingReplay" class="hover f-c-e" @click="before">
        <el-icon class="mr-1">
          <i-ep-chat-round />
        </el-icon>
        <span>回复</span>
      </div>
      <div v-show="comment.isEditingReplay" class="hover f-c-e mr-4" @click="finish">
        <el-icon class="mr-1">
          <i-ep-check />
        </el-icon>
        <span>完成回复</span>
      </div>
      <div v-show="comment.isEditingReplay" class="hover f-c-e" @click="cancel">
        <el-icon class="mr-1">
          <i-ep-close />
        </el-icon>
        <span>取消回复</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@include pc() {
  .ed-item {
    --at-apply: w-8%;
  }
}

@include mb() {
  .ed-item {
    --at-apply: w-18%;
  }
}
</style>
