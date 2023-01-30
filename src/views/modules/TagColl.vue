<script setup lang="ts">
import { getTagPageList } from "@/utils/remote-api";
import { closeLoader } from "@/utils/common";

const route = useRoute();
const data = await getTagPageList(String(route.params.tag));

let tagname = ref(data.text);
let taglist = ref(data.array);

closeLoader();

watch(route, async () => {
  const data = await getTagPageList(String(route.params.tag));
  tagname.value = data.text;
  taglist.value = data.array;
});
</script>

<template>
  <div id="l-tagcoll">
    <div class="fsz-1.25 mb-10">{{ tagname }}</div>
    <div class="content">
      <Card class="item mr-6 mb-6 pb-4" v-for="(item, index) in taglist" :key="index">
        <div class="fsz-1.2">
          <router-link class="hover" :to="'/p/' + item.id">
            {{ item.title }}
          </router-link>
        </div>
        <div class="f-c-s fsz-0.9 mt-6">
          <el-icon>
            <i-ep-caret-right />
          </el-icon>
          <router-link class="hover ml-0.5 b-b-1 b-b-dotted p-b-0.3" :to="'/p/' + item.id">
            阅读全文
          </router-link>
        </div>
        <JottingSynopsis
          class="mt-6"
          :data="{ date: item.date, view: item.view, comm: item.comm, digg: item.digg }" />
      </Card>
    </div>
  </div>
</template>

<style scoped lang="scss">
.content {
  @include flex($justify: space-between, $items: stretch, $content: stretch);

  .item {
    flex: 1 1 40%;
  }

  @media screen and (max-width: 1000px) {
    .item {
      flex: 1 1 100%;
    }
  }
}
</style>
