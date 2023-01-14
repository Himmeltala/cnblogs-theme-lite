<script setup lang="ts">
import * as RemoteApi from "@/utils/api";
import { closeLoader } from "@/utils/loader";

const route = useRoute();

let taglist = ref<any>();
let tagname = "";
let loading = ref(true);

function fetchTagPageList() {
  RemoteApi.getTagPageList(String(route.params.tag), res => {
    tagname = res.text;
    taglist.value = res.list;
    loading.value = false;
    closeLoader();
  });
}

watch(route, () => {
  loading.value = true;
  fetchTagPageList();
});

fetchTagPageList();
</script>

<template>
  <div id="tagpage">
    <div class="fsz-1.25 mx-1.3 mt-1 mb-3">{{ tagname }}</div>
    <div id="t-content">
      <Card v-if="loading" style="flex: 1 1 40%" :class="{ 'mb-2.5': item < 8 }" v-for="item in 10" :key="item">
        <el-skeleton animated :loading="loading"></el-skeleton>
      </Card>
      <Card style="flex: 1 1 40%" class="mb-2.5" v-if="!loading" v-for="(item, index) in taglist" :key="index">
        <div class="fsz-1.1 break-all">
          <router-link class="hover color-#a7a7a7" :to="'/e/' + item.id">{{ item.title }}</router-link>
        </div>
        <div class="flex content-center items-center justify-start fsz-0.9 mt-6">
          <el-icon>
            <i-ep-caret-right />
          </el-icon>
          <router-link class="hover color-#a7a7a7 b-b-#cccccc b-b-dotted b-b-1 p-b-0.3" :to="'/e/' + item.id">
            阅读全文
          </router-link>
        </div>
        <EssayBottom class="mt-4" :data="{ date: item.date, view: item.view, comm: item.comm, digg: item.digg }" />
      </Card>
    </div>
  </div>
</template>

<style scoped lang="scss">
#t-content {
  @include flex($justify: space-between, $items: stretch, $content: stretch);
}
</style>
