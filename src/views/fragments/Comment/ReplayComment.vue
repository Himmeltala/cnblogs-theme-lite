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

const content = ref("");

function uploadImage(el: string) {
  openImageUploadWindow(el, (imgUrl: any) => {
    content.value += `\n\n${imgUrl}\n\n`;
  });
}

function before() {
  props.comment.htmlContent = props.comment.content;
  props.comment.isEditingReplay = !props.comment.isEditingReplay;

  emits("onBefore");
}

async function finish() {
  const response = await replayComment({
    body:
      `回复 ${props.comment.layer} [@${props.comment.author}](${props.comment.space})\n\n` +
      content.value,
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
  props.comment.content = props.comment.htmlContent;
  props.comment.isEditingReplay = !props.comment.isEditingReplay;

  emits("onCancel");
}
</script>

<template>
  <div v-show="comment.isEditingReplay">
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
  <div class="f-c-e cursor-pointer fsz-0.8 l-sec-color">
    <div v-show="!comment.isEditingReplay" class="hover mr-4 f-c-e" @click="before">
      <el-icon class="mr-1">
        <i-ep-chat-round />
      </el-icon>
      <span>回复</span>
    </div>
    <div v-show="comment.isEditingReplay" class="hover mr-4 f-c-e" @click="finish">
      <el-icon class="mr-1">
        <i-ep-check />
      </el-icon>
      <span>完成回复</span>
    </div>
    <div v-show="comment.isEditingReplay" class="hover mr-4 f-c-e" @click="cancel">
      <el-icon class="mr-1">
        <i-ep-close />
      </el-icon>
      <span>取消回复</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@mixin textarea($height: 15rem) {
  --at-apply: rd-2 p-2 0.5 fsz-0.9;
  background-color: var(--l-textarea-bg);
  width: 100%;
  border: none;
  outline: none;
  color: var(--pri-text-color);
  height: $height;
  resize: none;
}

@mixin container() {
  --at-apply: mb-5 rd-2;
  border: 1px solid var(--el-border-color-lighter);
  background-color: var(--l-textarea-bg);
  @include hover($border-color: all, $font-color: false);
}

.textarea {
  @include container();

  textarea {
    @include textarea($height: 10rem);
  }
}
</style>
