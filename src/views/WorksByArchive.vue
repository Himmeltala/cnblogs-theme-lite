<script setup lang="ts">
import { WorksApi } from "@/apis";

LiteUtils.startLoading();

const route = useRoute();
let archiveDate = route.params.date;
let archiveMode = route.params.mode;
const setting = LiteUtils.getLocalSetting();
const archiveWorks = shallowRef();

async function fetchData() {
  let fetchDataPromise;
  LiteUtils.startLoading();

  switch (archiveMode) {
    case "a":
      fetchDataPromise = WorksApi.getListByArchive(`${archiveDate}`, "article");
      break;
    case "p":
      fetchDataPromise = WorksApi.getListByArchive(`${archiveDate}`, "works");
      break;
    case "d":
      fetchDataPromise = WorksApi.getListByDay(`${String(archiveDate).replaceAll("-", "/")}`);
      break;
    default:
      fetchDataPromise = Promise.reject(new Error("Invalid archive mode provided."));
  }

  try {
    archiveWorks.value = await fetchDataPromise;
    LiteUtils.setTitle(archiveWorks.value.hint);
  } catch (error) {
    ElMessage.error(error);
  } finally {
    LiteUtils.endLoading();
  }
}

await fetchData();

async function nexpr(e: any) {
  // await fetchData();
}

async function next(e: any) {
  // await fetchData();
}

async function prev(e: any) {
  // await fetchData();
}

watch(route, async () => {
  if (route.name === RouterName.WORKS_BY_ARCHIVE) {
    archiveMode = route.params.mode;
    archiveDate = route.params.date;
    await fetchData();
  }
});
</script>

<template>
  <ContextMenu>
    <div id="l-archive" class="min-height">
      <Pagination @nexpr="nexpr" @next="next" @prev="prev" :count="archiveWorks.page" :disabled="setting.other.pagation.pin">
        <template #content>
          <Card>
            <el-page-header :icon="null" @back="LiteUtils.Router.go({ path: 'back', router: $router })">
              <template #title>
                <div class="f-c-c">
                  <i-ep-back />
                </div>
              </template>
              <template #content>
                <div class="l-size-3 mb-5 mt-4">{{ archiveWorks.hint }}</div>
              </template>
            </el-page-header>
          </Card>
          <WorksItem
            v-if="archiveWorks.data.length > 0"
            :padding="setting.pages.sort.padding"
            :margin="setting.pages.sort.margin"
            :data="archiveWorks.data" />
        </template>
      </Pagination>
    </div>
    <template #title>盒子模型设置</template>
    <template #content>
      <BoxSetting :padding="setting.pages.sort.padding" :margin="setting.pages.sort.margin" />
    </template>
  </ContextMenu>
</template>
