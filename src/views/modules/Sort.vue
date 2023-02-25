<script setup lang="ts">
import { blogApp } from "@/lite.config";
import { closeLoader } from "@/utils/common";
import { getSorts } from "@/utils/remote-api";

const route = useRoute();
const cates = await getSorts(route.params.id, true, 1);
const count = ref(cates.pages[cates.pages.length - 1]);
const data = ref(cates.array);
const hint = ref(cates.label);

document.querySelector("title").innerText = `${hint.value} - ${blogApp} - 博客园`;

closeLoader();

async function nexpr(e: any) {
  data.value = (await getSorts(route.params.id, true, e.currentIndex)).array;
}

async function next(e: any) {
  data.value = (await getSorts(route.params.id, true, e.currentIndex)).array;
}

async function prev(e: any) {
  data.value = (await getSorts(route.params.id, true, e.currentIndex)).array;
}

watch(route, async () => {
  const { array, label } = await getSorts(route.params.id, true, 1);
  data.value = array;
  hint.value = label;
});
</script>

<template>
  <div id="l-sort" class="min-height">
    <Pagination @nexpr="nexpr" @next="next" @prev="prev" :page-count="count">
      <template #content>
        <div class="l-sec-size mb-5 mt-4">{{ hint }}</div>
        <ArticleItem v-if="data" :data="data" />
      </template>
    </Pagination>
  </div>
</template>
