<script setup lang="ts">
import { getEssayList } from "@/utils/remote-api";
import { closeLoader } from "@/utils/common";

const data = ref((await getEssayList(1, false)).array);
const pages = (await getEssayList(1, true)).pages;
const pageCount = ref(pages[pages.length - 1]);
const pagination = ref();

closeLoader();

async function next(e: any) {
  data.value = (await getEssayList(e.currentIndex, false)).array;
}

async function prev(e: any) {
  data.value = (await getEssayList(e.currentIndex, false)).array;
}

async function nexpr(e: any) {
  data.value = (await getEssayList(e.currentIndex, false)).array;
}
</script>

<template>
  <div id="lite-home">
    <Pagination ref="pagination" @prev="prev" @next="next" @nexpr="nexpr" :page-count="pageCount">
      <template #content>
        <EssayItem v-if="data" :data="data" />
      </template>
    </Pagination>
  </div>
</template>
