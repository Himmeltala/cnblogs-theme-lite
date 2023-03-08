<script setup lang="ts">
import { blogApp } from "@/lite.config";
import { getWritingSort, getWritingSortChild } from "@/apis/remote-api";
import { endLoading, startLoading, nav, getSetting } from "@/utils/common";

const route = useRoute();
const router = useRouter();
const id = ref(route.params.id);
const mode = ref(route.params.mode);
const setting = getSetting();
const child = ref();
const sort = ref();

async function fetchData(index?: number) {
  startLoading();
  sort.value = await getWritingSort(`${id.value}`, index || 1);
  if (mode.value === "a") {
    child.value = await getWritingSortChild(`${id.value}`, "2");
  } else if (mode.value === "p") {
    child.value = await getWritingSortChild(`${id.value}`);
  }
  document.querySelector("title").innerText = `${sort.value.hint} - ${blogApp} - 博客园`;
  endLoading();
}

await fetchData();

async function nexpr(e: any) {
  await fetchData(e.currentIndex);
}

async function next(e: any) {
  await fetchData(e.currentIndex);
}

async function prev(e: any) {
  await fetchData(e.currentIndex);
}

watch(route, async () => {
  if (route.name === "Sort") {
    id.value = route.params.id;
    mode.value = route.params.mode;
    await fetchData();
  }
});
</script>

<template>
  <ContextMenu>
    <div id="l-sort" class="min-height">
      <Pagination @nexpr="nexpr" @next="next" @prev="prev" :count="sort.page" :disabled="setting.other.pagation.pin">
        <template #content>
          <Card :padding="setting.pages.sort.padding" :margin="setting.pages.sort.margin">
            <el-page-header :icon="null" @back="nav({ path: 'back', router })">
              <template #title>
                <div class="f-c-c">
                  <i-ep-back />
                </div>
              </template>
              <template #content>
                <div class="l-sec-size mb-5 mt-4">{{ sort.hint }}</div>
              </template>
            </el-page-header>
            <div class="l-sort__desc mb-4 l-fiv-size l-sec-color">
              <span v-if="sort.desc2">
                {{ sort.desc2 }}
              </span>
              <span v-else>
                {{ sort.desc }}
              </span>
            </div>
            <div class="l-sort__child mb-4 l-four-size l-sec-color" v-if="child.length > 0">
              <div class="hover f-c-s" v-for="(item, index) in child" :key="index" :class="{ 'mb-2': index != child.length - 1 }">
                <span class="mr-2">●</span>
                <router-link :to="'/sort/p/' + item.id">{{ item.text }}</router-link>
              </div>
            </div>
          </Card>
          <WritingItem :padding="setting.pages.sort.padding" :margin="setting.pages.sort.margin" :data="sort.data" />
        </template>
      </Pagination>
    </div>
    <template #title>分类盒子模型</template>
    <template #content>
      <BoxSetting :padding="setting.pages.sort.padding" :margin="setting.pages.sort.margin" />
    </template>
  </ContextMenu>
</template>
