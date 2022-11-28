<script setup lang="ts">
import { ref } from "vue";
import { getDefault } from "../utils/api";

let essayArr = ref<any>([]);

let page = ref(1);

getDefault(page.value, str => {
  essayArr.value = str;
});

function nextPage() {
  page.value++;
  getDefault(page.value, str => {
    essayArr.value = str;
  });
}

function lastPage() {
  page.value--;
  getDefault(page.value, str => {
    essayArr.value = str;
  });
}
</script>

<template>
  <div class="container">
    <button @click="lastPage">上一页</button>
    <button @click="nextPage">下一页</button>
    <div v-for="(item, index) in essayArr" :key="index" class="essay">
      <div class="title">
        {{ item.title }}
      </div>
      <div class="desc">
        {{ item.desc }}
      </div>
      <div class="info">
        <div class="date">{{ item.date }}</div>
        <div class="view">{{ item.viewCount }}</div>
        <div class="comm">{{ item.commCount }}</div>
        <div class="digg">{{ item.diggCount }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
