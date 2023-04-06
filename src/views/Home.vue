<script setup lang="ts">
import { getHomeWritingList } from "@/apis/remote-api";

LiteUtils.startLoading();

const setting = LiteUtils.getSetting();
const listing = shallowRef(await getHomeWritingList(1));

async function fetchData(e: any) {
  LiteUtils.startLoading();
  listing.value = await getHomeWritingList(e.currentIndex);
  LiteUtils.endLoading();
}

onMounted(() => {
  LiteUtils.endLoading();
});
</script>

<template>
  <ContextMenu>
    <div id="l-home" class="min-height">
      <Pagination
        @prev="(e: any) => fetchData(e)"
        @next="(e: any) => fetchData(e)"
        @nexpr="(e: any) => fetchData(e)"
        :count="listing.page"
        :disabled="setting.other.pagation.pin">
        <template #content>
          <WritingItem
            v-if="listing.data.length > 0"
            :padding="setting.pages.sort.padding"
            :margin="setting.pages.sort.margin"
            :data="listing.data" />
        </template>
      </Pagination>
    </div>
    <template #title>盒子模型设置</template>
    <template #content>
      <BoxSetting :padding="setting.pages.home.padding" :margin="setting.pages.home.margin" />
    </template>
  </ContextMenu>
</template>
