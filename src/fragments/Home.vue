<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getDefault } from "../utils/api";
import Card from "../components/Card.vue";

const router = useRouter();

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

function href(id: string) {
  router.push(`/essay/${id}`);
}
</script>

<template>
  <div class="home">
    <button @click="lastPage">上一页</button>
    <button @click="nextPage">下一页</button>
    <Card v-for="(item, index) in essayArr" :key="index">
      <div class="essay" @click="href(item.id)">
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
    </Card>
  </div>
</template>

<style scoped lang="scss"></style>
