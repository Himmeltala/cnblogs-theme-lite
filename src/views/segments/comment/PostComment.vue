<script setup lang="ts">
import { CommentApi } from "@/apis";

const props = defineProps({
  postId: { type: String, required: true }
});

const emits = defineEmits(["onPost"]);

const comment = ref<BlogType.IComment>({
  postId: parseInt(props.postId),
  parentCommentId: 0,
  body: ""
});

const loading = ref(false);

function uploadImage(el: string) {
  LiteUtils.openImageUploadWindow(el, (imgUrl: any) => {
    comment.value.body += `\n\n${imgUrl}\n\n`;
  });
}

async function AddComment() {
  if (comment.value.body) {
    loading.value = true;
    const data = await CommentApi.insert(comment.value);
    if (data.isSuccess) {
      const count = await CommentApi.getCount(props.postId);
      const comments = await CommentApi.getList(props.postId, 0);
      comment.value.body = "";
      emits("onPost", { count, comments });
      ElMessage({ message: "发送评论成功！", grouping: true, type: "success" });
    } else {
      ElMessage({ message: "发送评论失败！", grouping: true, type: "error" });
    }
    loading.value = false;
  } else ElMessage({ message: "评论字数不够！", grouping: true, type: "error" });
}
</script>

<template>
  <div class="l-comment__post">
    <h3>发表评论</h3>
    <div class="mb-12 relative">
      <div class="tools mb-2 f-c-e">
        <el-tooltip effect="dark" content="插入图片" placement="top-start">
          <span class="hover" @click="uploadImage('main-upload-img')">
            <i-ep-picture-rounded />
          </span>
        </el-tooltip>
      </div>
      <div class="textarea">
        <textarea v-model="comment.body" placeholder="请发表一条友善的评论哦~😀支持 Markdown 语法"></textarea>
      </div>
      <div class="z--1 opacity-0 absolute top-0 left-0">
        <textarea id="main-upload-img" />
      </div>
      <el-button plain :disabled="!LiteConfig.isLogin" :loading="loading" @click="AddComment"> 发送评论 </el-button>
    </div>
  </div>
</template>
