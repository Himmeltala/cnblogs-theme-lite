<script setup lang="ts">
import { getTagPageList } from "@/utils/api";
import { closeLoader } from "@/utils/loader";

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

const asyncComp = ref(null);
const emits = defineEmits(["complete"]);
watch(asyncComp, () => {
  emits("complete", asyncComp);
});
</script>

<template>
  <div ref="asyncComp" id="lite-tagpage">
    <div class="fsz-1.25 mx-1.3 mt-1 mb-3">{{ tagname }}</div>
    <div id="t-content">
      <Card style="flex: 1 1 40%" class="mb-2.5" v-for="(item, index) in taglist" :key="index">
        <div class="fsz-1.1 break-all">
          <router-link class="hover color-#a7a7a7" :to="'/e/' + item.id">{{
            item.title
          }}</router-link>
        </div>
        <div class="flex content-center items-center justify-start fsz-0.9 mt-6">
          <el-icon>
            <i-ep-caret-right />
          </el-icon>
          <router-link
            class="hover color-#a7a7a7 b-b-#cccccc b-b-dotted b-b-1 p-b-0.3"
            :to="'/e/' + item.id">
            阅读全文
          </router-link>
        </div>
        <EssaySynopsis
          class="mt-4"
          :data="{ date: item.date, view: item.view, comm: item.comm, digg: item.digg }" />
      </Card>
    </div>
  </div>
</template>

<style scoped lang="scss">
#t-content {
  @include flex($justify: space-between, $items: stretch, $content: stretch);
}
</style>
