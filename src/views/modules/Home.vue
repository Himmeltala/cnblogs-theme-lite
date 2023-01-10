<script setup lang="ts">
import * as RemoteApi from "@/utils/api";
import * as DataType from "@/types/data-type";
import { closeLoader } from "@/utils/loader";

let data = ref<DataType.Essay[]>();
let loading = ref<boolean>(true);
let pageCount = ref<number>(2);

const pagination = ref();

function fetchData(complete?: ((pages: string[]) => void) | null, isCalc: boolean = false, pageIndex: number = 1) {
  loading.value = true;
  RemoteApi.getEssayList(pageIndex, isCalc, res => {
    if (res.list.length === 0) {
      pagination.value.updateProps();
    } else {
      data.value = res.list;
    }
    loading.value = false;
    complete && complete(res.pages);
  });
}

fetchData(() => {
  closeLoader();
});

let isCalc = true;

function floatChange(page: any) {
  fetchData(
    pages => {
      if (isCalc) {
        pageCount.value = parseInt(pages[pages.length - 1]);
        if (pageCount.value === 1) pageCount.value = 2;
        isCalc = false;
      }
    },
    isCalc,
    page.currentIndex
  );
}

function fixedChange(page: any) {
  fetchData(null, false, page.currentIndex);
}
</script>

<template>
  <div class="home">
    <PaginationPage ref="pagination" @fixed-change="fixedChange" @float-change="floatChange" :page-count="pageCount">
      <template #loading>
        <el-skeleton style="margin-top: 10px" :loading="loading" animated>
          <template #template>
            <Card v-for="item in 10" :key="item" width="auto" padding="15px 25px" margin="12px 10px 12px 10px">
              <el-skeleton-item variant="p" style="width: 60%" />
              <div style="display: flex; align-items: center">
                <el-skeleton-item variant="text" style="margin-right: 16px; margin-top: 8px" />
                <el-skeleton-item variant="text" style="margin-right: 16px; margin-top: 8px" />
                <el-skeleton-item variant="text" style="width: 30%; margin-top: 8px" />
              </div>
              <el-skeleton-item v-for="i in 6" :key="i" variant="text" style="width: 100%; margin-top: 8px" />
              <el-skeleton-item variant="text" style="width: 100%" />
              <div style="display: flex; align-items: center; justify-content: flex-end; width: 100%">
                <el-skeleton-item variant="text" style="width: 30%; margin-top: 4px" />
              </div>
            </Card>
          </template>
        </el-skeleton>
      </template>
      <template #content>
        <EssayItem v-if="data" :data="data" :loading="loading" />
      </template>
    </PaginationPage>
  </div>
</template>

<style scoped lang="scss"></style>
