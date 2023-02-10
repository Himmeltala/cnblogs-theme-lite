<script setup lang="ts">
import { closeLoader } from "@/utils/common";
import { getCateList } from "@/utils/remote-api";

const route = useRoute();
const initData = await getCateList(route.params.id, true, 1);
const pageCount = ref(initData.pages[initData.pages.length - 1]);
const data = ref(initData.array);
const label = ref(initData.label);

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

watch(route, async () => {
  const { array, label: l } = await getCateList(route.params.id, true, 1);
  data.value = array;
  label.value = l;
});
</script>

<template>
  <div id="l-cate">
    <Pagination @nexpr="nexpr" @next="next" @prev="prev" :page-count="pageCount">
      <template #content>
        <div class="fsz-1.25 mb-10">{{ label }}</div>
        <EssayItem v-if="data" :data="data" />
      </template>
    </Pagination>
  </div>
</template>
