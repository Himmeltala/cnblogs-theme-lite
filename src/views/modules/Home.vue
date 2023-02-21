<script setup lang="ts">
import { blogApp } from "@/lite.config";
import { useStorage } from "@vueuse/core";
import { getEssayList } from "@/utils/remote-api";
import { closeLoader } from "@/utils/common";
import { CustType } from "@/types/data-type";

const settings = useStorage<CustType.Settings>(`l-${blogApp}-settings`, {});
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
  <div id="l-home" class="min-height">
    <Pagination @prev="prev" @next="next" @nexpr="nexpr" :page-count="count" :disabled="settings.openPager">
      <template #content>
        <EssayItem v-if="data" :data="data" />
      </template>
    </Pagination>
  </div>
</template>
