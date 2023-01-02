<script setup lang="ts">
import { $ref } from "vue/macros";
import * as RemoteApi from "../../../utils/api";
import * as DataType from "../../../types/data-type";
import { closeLoader } from "../../../utils/loader";

let data = $ref<Array<DataType.Essay>>();
let loading = $ref<boolean>(true);
let pageCount = $ref<number>(2);

function fetchData(
  complete?: ((pages: string[]) => void) | null,
  calc: boolean = false, page: number = 1
) {
  loading = true;
  RemoteApi.getEssayList(page, calc, res => {
    data = res.list;
    loading = false;
    console.log(res);
    complete && complete(res.pages);
  });
}

fetchData(() => {
  closeLoader();
});

let isCalced = true;

function floatChange(page: any) {
  fetchData(res => {
    if (isCalced) {
      pageCount = parseInt(res[res.length - 1]);
      isCalced = false;
    }
  }, isCalced, page.currentIndex);
}

function fixedChange(page: any) {
  fetchData(null, false, page.currentIndex);
}
</script>

<template>
  <div class="home">
    <PaginationPage
      @fixed-change="fixedChange"
      @float-change="floatChange"
      :page-count="pageCount">
      <template #loading>
        <el-skeleton style="margin-top: 10px" :loading="loading" animated>
          <template #template>
            <Card v-for="item in 10" :key="item" width="auto" padding="15px 25px"
                  margin="12px 10px 12px 10px"
            >
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
        <EssayItem :data="data" :loading="loading" />
      </template>
    </PaginationPage>
  </div>
</template>

<style scoped lang="scss">
</style>