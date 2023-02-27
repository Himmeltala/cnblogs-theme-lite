<script setup lang="ts">
import { getArticleList } from "@/apis/remote-api";
import { getSetting, startLoading, endLoading } from "@/utils/common";

startLoading();

const setting = getSetting();
const data = ref((await getArticleList(1, false)).array);
const pages = (await getArticleList(1, true)).pages;
const count = ref(pages[pages.length - 1]);

onMounted(() => {
  endLoading();
});

async function next(e: any) {
  startLoading();
  data.value = (await getArticleList(e.currentIndex, false)).array;
  endLoading();
}

async function prev(e: any) {
  startLoading();
  data.value = (await getArticleList(e.currentIndex, false)).array;
  endLoading();
}

async function nexpr(e: any) {
  startLoading();
  data.value = (await getArticleList(e.currentIndex, false)).array;
  endLoading();
}
</script>

<template>
  <ContextMenu>
    <div id="l-home" class="min-height">
      <Pagination @prev="prev" @next="next" @nexpr="nexpr" :page-count="count" :disabled="setting.other.pagation.pin">
        <template #content>
          <ArticleItem :padding="setting.pages.sort.padding" :margin="setting.pages.sort.margin" v-if="data" :data="data" />
        </template>
      </Pagination>
    </div>
    <template #title>首页列表盒子模型设置</template>
    <template #content>
      <BoxSetting :padding="setting.pages.home.padding" :margin="setting.pages.home.margin" />
    </template>
  </ContextMenu>
</template>
