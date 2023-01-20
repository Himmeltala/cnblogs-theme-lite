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

const asyncComp = ref(null);
const emits = defineEmits(["complete"]);
watch(asyncComp, () => {
  emits("complete", asyncComp);
});
</script>

<template>
  <div ref="asyncComp" id="lite-tagpage">
    <div class="fsz-1.25 mb-8">{{ tagname }}</div>
    <div id="t-content">
      <Card
        class="mr-6 mb-6 pb-4"
        style="flex: 1 1 40%"
        v-for="(item, index) in taglist"
        :key="index">
        <div class="fsz-1">
          <router-link class="hover pri-color" :to="'/e/' + item.id">
            {{ item.title }}
          </router-link>
        </div>
        <div class="f-c-s fsz-0.9 mt-6">
          <el-icon>
            <i-ep-caret-right />
          </el-icon>
          <router-link
            class="hover pri-color ml-0.5 b-b-1 b-b-dotted p-b-0.3"
            :to="'/e/' + item.id">
            阅读全文
          </router-link>
        </div>
        <EssaySynopsis
          class="mt-6"
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
