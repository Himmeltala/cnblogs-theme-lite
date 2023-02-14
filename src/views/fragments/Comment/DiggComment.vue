<script setup lang="ts">
import { PropType } from "vue";
import { voteComment } from "@/utils/remote-api";

const props = defineProps({
  comment: {
    type: Object as PropType<any>,
    required: true
  },
  postId: {
    type: Number,
    required: true
  }
});

async function diggComment() {
  const data = await voteComment({
    isAbandoned: false,
    commentId: props.comment.commentId,
    postId: props.postId,
    voteType: "Digg"
  });
  if (data.isSuccess) {
    props.comment.digg = props.comment.digg! + 1;
  }
  ElMessage({
    message: data.message,
    grouping: true,
    type: data.isSuccess ? "success" : "error"
  });
}
</script>

<template>
  <div
    v-show="!comment.isEditingUpdate && !comment.isEditingReplay"
    class="hover fsz-0.8 l-sec-color"
    @click="diggComment">
    <el-icon class="mr-1">
      <i-ep-caret-top />
    </el-icon>
    <span>{{ comment.digg }}</span>
  </div>
</template>
