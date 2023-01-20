<script setup lang="ts">
import { closeLoader } from "@/utils/common";
import { getCateList } from "@/utils/remote-api";

const route = useRoute();
const initData = await getCateList(route.params.id, true, 1);
const pageCount = ref(initData.pages[initData.pages.length - 1]);
const data = ref(initData.array);

closeLoader();

async function nexpr(e: any) {
  data.value = (await getCateList(route.params.id, true, e.currentIndex)).array;
}

async function next(e: any) {
  data.value = (await getCateList(route.params.id, true, e.currentIndex)).array;
}

async function prev(e: any) {
  data.value = (await getCateList(route.params.id, true, e.currentIndex)).array;
}
</script>

<template>
  <div id="lite-category">
    <Pagination @nexpr="nexpr" @next="next" @prev="prev" :page-count="pageCount">
      <template #content>
        <div class="fsz-1.25 mb-8">{{ initData.label }}</div>
        <EssayItem v-if="data" :data="data" />
      </template>
    </Pagination>
  </div>
</template>
