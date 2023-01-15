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
    class="noscroll absolute tpv-10 rtv-10 bg-#252525 color-#878787 hvh-90 wvw-13.5 ofw-auto box-border rd-2 px-5">
    <SideItem text="随笔目录" v-if="anchors && anchors.length > 0">
      <template #icon>
        <el-icon style="margin-right: 5px">
          <i-ep-location />
        </el-icon>
      </template>
      <div class="catalog mb-2 break-all fsz-0.9" v-for="(item, index) in anchors" :key="index" v-html="item.content" />
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
      <div class="mb-2 break-all fsz-0.9" v-for="(item, index) in links" :key="index">
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
        class="mb-2.5 flex content-center items-center justify-center fsz-1"
        v-for="(item, index) in books"
        :key="index">
        <img class="hvh-10 wvw-3.8 rd-1.5 object-cover" :src="item.img" alt="FAILED" />
        <div class="ml-2 break-all" style="width: calc(100% - 3.8vw - 0.5rem)">
          <span v-if="!item.href">{{ item.text }}</span>
          <a class="hover fsz-0.9" v-else :href="item.href" target="_blank">{{ item.text }}</a>
          <div class="fsz-0.8">{{ item.author }}</div>
          <el-rate style="width: 100%" v-model="item.rate" disabled size="small" />
        </div>
      </div>
    </SideItem>
  </div>
</template>

<style scoped lang="scss">
a {
  --at-apply: color-#878787;
}
</style>
