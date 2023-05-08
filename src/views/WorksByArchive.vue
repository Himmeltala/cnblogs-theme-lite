<script setup lang="ts">
import { WorksApi } from "@/apis";

LiteUtils.startLoading();

const route = useRoute();
const localSetting = LiteUtils.getLocalSetting();
let archiveDate = route.params.date;
let archiveMode = route.params.mode;
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

watch(route, async () => {
  if (route.name === RouterConstants.Name.WORKS_BY_ARCHIVE) {
    archiveMode = route.params.mode;
    archiveDate = route.params.date;
    await fetchData();
  }
});
</script>

<template>
  <ContextMenu>
    <div id="l-archive" class="min-height">
      <Pagination
        @nexpr="fetchData"
        @next="fetchData"
        @prev="fetchData"
        :count="archiveWorks.page"
        :disabled="localSetting.other.pagation.pin">
        <template #content>
          <Card :padding="{ left: 1, right: 1, bottom: 1 }" :margin="{ bottom: 1 }">
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
            :padding="localSetting.pages.sort.padding"
            :margin="localSetting.pages.sort.margin"
            :data="archiveWorks.data" />
        </template>
      </Pagination>
    </div>
    <template #title>盒子模型设置</template>
    <template #content>
      <BoxSetting :padding="localSetting.pages.sort.padding" :margin="localSetting.pages.sort.margin" />
    </template>
  </ContextMenu>
</template>
