<script setup lang="ts">
import { closeLoader } from "@/utils/common";
import { getCateList } from "@/utils/remote-api";

const route = useRoute();
const cates = await getCateList(route.params.id, true, 1);
const count = ref(cates.pages[cates.pages.length - 1]);
const data = ref(cates.array);
const hint = ref(cates.label);

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
  const { array, label } = await getCateList(route.params.id, true, 1);
  data.value = array;
  hint.value = label;
});
</script>

<template>
  <div id="l-cate">
    <Pagination @nexpr="nexpr" @next="next" @prev="prev" :page-count="count">
      <template #content>
        <div class="fsz-1.25 mb-10">{{ hint }}</div>
        <EssayItem v-if="data" :data="data" />
      </template>
    </Pagination>
  </div>
</template>
