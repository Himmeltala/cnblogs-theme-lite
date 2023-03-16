<script setup lang="ts">
import { blogApp } from "@/lite.config";
import { getWritingArchive, getDayArchive } from "@/apis/remote-api";
import { endLoading, startLoading, nav, getSetting } from "@/utils/common";

startLoading();

const route = useRoute();
const router = useRouter();
const date = ref(route.params.date);
const mode = ref(route.params.mode);
const setting = getSetting();
const archive = ref();

async function fetchData() {
  startLoading();
  if (mode.value === "a") {
    archive.value = await getWritingArchive(`${date.value}`, "article");
  } else if (mode.value === "p") {
    archive.value = await getWritingArchive(`${date.value}`, "essay");
  } else if (mode.value === "d") {
    archive.value = await getDayArchive(`${String(date.value).replaceAll("-", "/")}`);
  }
  document.querySelector("title").innerText = `${archive.value.hint} - ${blogApp} - 博客园`;
  endLoading();
}

await fetchData();

async function nexpr(e: any) {
  await fetchData();
}

async function next(e: any) {
  await fetchData();
}

async function prev(e: any) {
  await fetchData();
}

watch(route, async () => {
  if (route.name === "Archive") {
    mode.value = route.params.mode;
    date.value = route.params.date;
    await fetchData();
  }
});
</script>

<template>
  <ContextMenu>
    <div id="l-archive" class="min-height">
      <Pagination @nexpr="nexpr" @next="next" @prev="prev" :count="archive.page" :disabled="setting.other.pagation.pin">
        <template #content>
          <Card>
            <el-page-header :icon="null" @back="nav({ path: 'back', router })">
              <template #title>
                <div class="f-c-c">
                  <i-ep-back />
                </div>
              </template>
              <template #content>
                <div class="l-sec-size mb-5 mt-4">{{ archive.hint }}</div>
              </template>
            </el-page-header>
          </Card>
          <WritingItem
            v-if="archive.data.length > 0"
            :padding="setting.pages.sort.padding"
            :margin="setting.pages.sort.margin"
            :data="archive.data" />
        </template>
      </Pagination>
    </div>
    <template #title>盒子模型设置</template>
    <template #content>
      <BoxSetting :padding="setting.pages.sort.padding" :margin="setting.pages.sort.margin" />
    </template>
  </ContextMenu>
</template>
