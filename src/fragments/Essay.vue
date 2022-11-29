<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import * as API from "../utils/api";
import * as DataType from "../types/data-type";

const route = useRoute();
let id: any = route.params.id;

let essay = ref<DataType.Essay>();

API.getEssay(id, (str: DataType.Essay) => {
  essay.value = str;
});

let comment = ref<DataType.Comment>({ postId: essay.value?.postId, parentCommentId: 0 });

function setComm() {
  API.setComm(comment.value, res => {
    console.log(res);
  });
}
</script>

<template>
  <div class="essay">
    <div class="comment">
      <el-input v-model="comment.body" />
      <el-button @click="setComm">发送评论</el-button>
    </div>
    <div class="title">{{ essay?.title }}</div>
    <div class="content" v-html="essay?.content"></div>
    <!-- 评论 -->
  </div>
</template>

<style scoped lang="scss">
.essay {
  color: #a7a7a7;
}
</style>
