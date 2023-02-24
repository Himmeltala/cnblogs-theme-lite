<script setup lang="ts">
import { getSetting } from "@/utils/common";
import { closeLoader } from "@/utils/common";
import { getEssayList } from "@/utils/remote-api";

const setting = getSetting();
const data = ref((await getEssayList(1, false)).array);
const pages = (await getEssayList(1, true)).pages;
const count = ref(pages[pages.length - 1]);

closeLoader();

async function next(e: any) {
  data.value = (await getEssayList(e.currentIndex, false)).array;
}

async function prev(e: any) {
  data.value = (await getEssayList(e.currentIndex, false)).array;
}

async function nexpr(e: any) {
  data.value = (await getEssayList(e.currentIndex, false)).array;
}
</script>

<template>
  <ContextMenu>
    <div id="l-home" class="min-height">
      <Pagination @prev="prev" @next="next" @nexpr="nexpr" :page-count="count" :disabled="setting.openPager">
        <template #content>
          <EssayItem v-if="data" :data="data" />
        </template>
      </Pagination>
    </div>
    <template #title>列表项盒子模型设置</template>
    <template #content>
      <BoxSetting :padding="setting.listing.padding" :margin="setting.listing.margin" />
    </template>
  </ContextMenu>
</template>
