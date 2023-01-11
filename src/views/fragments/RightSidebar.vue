<script setup lang="ts">
import { useAnchorStore } from "@/store";
import { RouteName } from "@/utils/route-helper";
import { __LITE_CONFIG__ } from "@/lite.config";

const route = useRoute();
const links = __LITE_CONFIG__.links;
const books = __LITE_CONFIG__.books;

let anchors = ref<any>();
const anchorsStore = useAnchorStore();
anchorsStore.$onAction(({ store, args }) => {
  anchors.value = args[0];
}, true);

watch(route, value => {
  if (value.name === RouteName.HOME) anchors.value = [];
});
</script>

<template>
  <div
    id="r-showcase"
    class="noscroll absolute top-vh-10 right-vw-10 color-#878787 bg-#252525 h-vh-90 w-vw-13.5 ofw-auto box-border px-5">
    <SideItem text="随笔目录" v-if="anchors && anchors.length > 0">
      <template #icon>
        <el-icon style="margin-right: 5px">
          <i-ep-location />
        </el-icon>
      </template>
      <div
        class="catalog break-all fsz-p-14 mb-2"
        v-for="(item, index) in anchors"
        :key="index"
        v-html="item.content" />
    </SideItem>
    <SideItem text="我的技术栈" v-if="__LITE_CONFIG__.graph">
      <template #icon>
        <el-icon style="margin-right: 5px">
          <i-ep-aim />
        </el-icon>
      </template>
      <SkillGraph />
    </SideItem>
    <SideItem text="常用链接" v-if="links && links.length > 0">
      <template #icon>
        <el-icon style="margin-right: 5px">
          <i-ep-link />
        </el-icon>
      </template>
      <div class="break-all fsz-p-14 mb-2" v-for="(item, index) in links" :key="index">
        <a class="hover" :key="index" :href="item.href" target="_blank">{{ item.text }}</a>
      </div>
    </SideItem>
    <SideItem text="推荐书籍" v-if="books && books.length > 0">
      <template #icon>
        <el-icon style="margin-right: 5px">
          <i-ep-notebook />
        </el-icon>
      </template>
      <div
        class="book mb-2.5 fsz-p-14 flex content-center items-center justify-center"
        v-for="(item, index) in books"
        :key="index">
        <img class="h-vh-10 w-vw-3.8 object-cover rd-1.5" :src="item.img" alt="FAILED" />
        <div class="break-all ml-2" style="width: calc(100% - 3.8vw - 0.5rem)">
          <span v-if="!item.href">{{ item.text }}</span>
          <a class="hover" v-else :href="item.href" target="_blank">{{ item.text }}</a>
          <div class="fsz-p-12">{{ item.author }}</div>
          <el-rate style="width: 100%" v-model="item.rate" disabled size="small" />
        </div>
      </div>
    </SideItem>
  </div>
</template>

<style lang="scss">
#catalog {
  a {
    color: #878787;
  }
}
</style>

<style scoped lang="scss">
a {
  color: #878787;
}
</style>
