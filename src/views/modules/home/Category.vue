<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { watch } from "vue";
import { $ref } from "vue/macros";
import * as DataType from "../../../types/data-type";
import * as RemoteApi from "../../../utils/api";
import { closeLoader } from "../../../utils/loader";

const route = useRoute();

let data = $ref<Array<DataType.Essay>>();
let label = $ref<any>();
let pages = $ref<any>();
let rubric = $ref<any>();
let loading = $ref<boolean>(true);

function fetchData(complete?: Function) {
  loading = true;
  RemoteApi.getCategories(route.params.id, true, route.params.page, res => {
    data = res.list;
    pages = res.pages;
    rubric = res.label;
    loading = false;
    complete && complete();
  });
}

fetchData(() => {
  closeLoader();
});

watch(route, () => {
  fetchData();
});
</script>

<template>
  <div class="category">
    <PaginationPage>
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
        <div class="label">{{ rubric }}</div>
        <EssayItem :data="data" :loading="loading" />
      </template>
    </PaginationPage>
  </div>
</template>

<style scoped lang="scss">
@import "../../../scss/mixins";

.category {
  .label {
    font-size: 20px;
    margin: 5px 10px 12px 10px;
  }
}
</style>