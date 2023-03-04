<script setup lang="ts">
import { getEssayList } from "@/apis/remote-api";
import { getSetting, startLoading, endLoading } from "@/utils/common";

startLoading();

const setting = getSetting();
const listing = ref(await getEssayList(1));

async function next(e: any) {
  startLoading();
  listing.value = await getEssayList(e.currentIndex);
  endLoading();
}

async function prev(e: any) {
  startLoading();
  listing.value = await getEssayList(e.currentIndex);
  endLoading();
}

async function nexpr(e: any) {
  startLoading();
  listing.value = await getEssayList(e.currentIndex);
  endLoading();
}

onMounted(() => {
  endLoading();
});
</script>

<template>
  <ContextMenu>
    <div id="l-home" class="min-height">
      <Pagination @prev="prev" @next="next" @nexpr="nexpr" :count="listing.page" :disabled="setting.other.pagation.pin">
        <template #content>
          <EssayItem
            v-if="listing.data.length > 0"
            :padding="setting.pages.sort.padding"
            :margin="setting.pages.sort.margin"
            :data="listing.data" />
        </template>
      </Pagination>
    </div>
    <template #title>首页列表盒子模型设置</template>
    <template #content>
      <BoxSetting :padding="setting.pages.home.padding" :margin="setting.pages.home.margin" />
    </template>
  </ContextMenu>
</template>
