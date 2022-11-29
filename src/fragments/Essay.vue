<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import * as API from "../utils/api";
import * as DataType from "../types/data-type";

const route = useRoute();
let id: any = route.params.id;

let essay = ref<DataType.Essay>();
let comments = ref<Array<DataType.Comment>>();

API.getEssay(id, (str: DataType.Essay) => {
  essay.value = str;
  API.getCommList({ postId: id }, (str: Array<DataType.Essay>) => {
    comments.value = str;
  });
});

let comment = ref<DataType.Comment>({ postId: id, parentCommentId: 0 });

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
    <div class="comments">
      <div class="item" v-for="(item, index) in comments" :key="index">
        <div class="layer">{{ item.layer }}</div>
        <div class="author">{{ item.author }}</div>
        <div class="date">{{ item.date }}</div>
        <div class="digg">{{ item.digg }}</div>
        <div class="burry">{{ item.burry }}</div>
        <div class="body">{{ item.body }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.essay {
  color: #a7a7a7;
}
</style>
