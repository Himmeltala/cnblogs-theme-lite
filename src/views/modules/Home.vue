<script setup lang="ts">
import { getEssayList } from "@/utils/api";
import { closeLoader } from "@/utils/loader";

const data = ref((await getEssayList(1, false)).list);
const loading = ref(true);
const pageCount = ref(2);
const pagination = ref();

closeLoader();
loading.value = false;

function floatChange(page: any) {}

function fixedChange(page: any) {}
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
