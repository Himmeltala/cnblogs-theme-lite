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

async function buryComment() {
  const data = await voteComment({
    isAbandoned: false,
    commentId: props.comment.commentId,
    postId: props.postId,
    voteType: "Bury"
  });
  if (data.isSuccess) {
    props.comment.bury = props.comment.bury! + 1;
  }
  ElMessage({
    message: data.message,
    grouping: true,
    type: data.isSuccess ? "success" : "error"
  });
}
</script>

<template>
  <div v-show="!comment.isEditingUpdate && !comment.isEditingReplay" class="hover fsz-0.8 l-sec-color" @click="buryComment">
    <el-icon class="mr-1">
      <i-ep-caret-bottom />
    </el-icon>
    <span>{{ comment.bury }}</span>
  </div>
</template>
