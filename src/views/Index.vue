<script setup lang="ts">
import { WorksApi } from "@/apis";

LiteUtils.startLoading();

const localSetting = LiteUtils.getLocalSetting();
const listing = shallowRef(await WorksApi.getList(1));

async function fetchData(index: any) {
  LiteUtils.startLoading();
  listing.value = await WorksApi.getList(index);
  LiteUtils.endLoading();
}

onMounted(() => {
  LiteUtils.endLoading();
});
</script>

<template>
  <ContextMenu>
    <div id="l-home" class="min-height">
      <Pagination @prev="fetchData" @next="fetchData" @nexpr="fetchData" :count="listing.page" :disabled="localSetting.other.pagation.pin">
        <template #content>
          <WorksItem
            v-if="listing.data.length > 0"
            :padding="localSetting.pages.home.padding"
            :margin="localSetting.pages.home.margin"
            :data="listing.data" />
        </template>
      </Pagination>
    </div>
    <template #title>盒子模型设置</template>
    <template #content>
      <BoxSetting :padding="localSetting.pages.home.padding" :margin="localSetting.pages.home.margin" />
    </template>
  </ContextMenu>
</template>
