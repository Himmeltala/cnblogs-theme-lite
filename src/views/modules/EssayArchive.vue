<script setup lang="ts">
import { blogApp } from "@/lite.config";
import { getEssayArchive } from "@/apis/remote-api";
import { endLoading, startLoading, nav, getSetting } from "@/utils/common";

startLoading();

const route = useRoute();
const router = useRouter();
const archiveDate = route.params.date;
const setting = getSetting();

const archive = ref(await getEssayArchive(`${archiveDate}`));

document.querySelector("title").innerText = `${archive.value.hint} - ${blogApp} - 博客园`;

async function nexpr(e: any) {
  startLoading();
  archive.value = await getEssayArchive(`${archiveDate}`);
  endLoading();
}

async function next(e: any) {
  startLoading();
  archive.value = await getEssayArchive(`${archiveDate}`);
  endLoading();
}

async function prev(e: any) {
  startLoading();
  archive.value = await getEssayArchive(`${archiveDate}`);
  endLoading();
}

onMounted(() => {
  endLoading();
});

watch(route, async () => {
  if (route.name === "essayArchive") {
    startLoading();
    archive.value = await getEssayArchive(`${route.params.date}`);
    document.querySelector("title").innerText = `${archive.value.hint} - ${blogApp} - 博客园`;
    endLoading();
  }
});
</script>

<template>
  <ContextMenu>
    <div id="l-archive" class="min-height">
      <Pagination @nexpr="nexpr" @next="next" @prev="prev" :count="archive.page" :disabled="setting.other.pagation.pin">
        <template #content>
          <Card :padding="setting.pages.sort.padding" :margin="setting.pages.sort.margin">
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
          <EssayItem
            v-if="archive.data.length > 0"
            :padding="setting.pages.sort.padding"
            :margin="setting.pages.sort.margin"
            :data="archive.data" />
        </template>
      </Pagination>
    </div>
    <template #title>随笔档案盒子模型设置</template>
    <template #content>
      <BoxSetting :padding="setting.pages.sort.padding" :margin="setting.pages.sort.margin" />
    </template>
  </ContextMenu>
</template>

<style scoped lang="scss"></style>
