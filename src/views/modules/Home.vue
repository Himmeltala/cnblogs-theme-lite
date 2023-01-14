<script setup lang="ts">
import { getEssayList } from "@/utils/api";
import { closeLoader } from "@/utils/loader";

const data = ref((await getEssayList(1, false)).list);
const pageCount = ref(2);
const pagination = ref();

closeLoader();

function floatChange(page: any) {}

function fixedChange(page: any) {}
</script>

<template>
  <div class="home">
    <PaginationPage ref="pagination" @fixed-change="fixedChange" @float-change="floatChange" :page-count="pageCount">
      <template #content>
        <EssayItem v-if="data" :data="data" />
      </template>
    </PaginationPage>
  </div>
</template>

<style scoped lang="scss"></style>
