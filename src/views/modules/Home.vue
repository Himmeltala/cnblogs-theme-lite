<script setup lang="ts">
import { getEssayList } from "@/utils/api";
import { closeLoader } from "@/utils/loader";

const data = ref((await getEssayList(1, false)).array);
const pageCount = ref(2);
const pagination = ref();

closeLoader();

function floatChange(page: any) {}

function fixedChange(page: any) {}

const asyncComp = ref(null);
const emits = defineEmits(["complete"]);
watch(asyncComp, () => {
  emits("complete", asyncComp);
});
</script>

<template>
  <div id="lite-home" ref="asyncComp">
    <Pagination
      ref="pagination"
      @fixed-change="fixedChange"
      @float-change="floatChange"
      :page-count="pageCount">
      <template #content>
        <EssayItem v-if="data" :data="data" />
      </template>
    </Pagination>
  </div>
</template>
