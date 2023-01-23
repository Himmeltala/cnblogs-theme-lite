<script setup lang="ts">
import { useAnchorStore } from "@/store";
import { __LITE_CONFIG__ } from "@/lite.config";
import { RouteName } from "@/helpers/route-helper";

const route = useRoute();
const links = __LITE_CONFIG__.links;
const books = __LITE_CONFIG__.books;

const anchors = ref();
const store = useAnchorStore();

store.$onAction(({ store, args }) => {
  anchors.value = args[0];
}, true);

watch(route, value => {
  if (value.name === RouteName.HOME) anchors.value = [];
});
</script>

<template>
  <div
    id="r-cabinet"
    class="noscroll fixed top-0 right-0 hd-100 ofw-auto bg-color w-60 px-2 z-999 box-border">
    <CabinetItem text="随笔目录" v-if="anchors && anchors.length > 0">
      <template #icon>
        <el-icon style="margin-right: 5px">
          <i-ep-location />
        </el-icon>
      </template>
      <div
        class="catalog mb-3 fsz-0.9"
        v-for="(item, index) in anchors"
        :key="index"
        v-html="item.content"
        v-anchor-events="item" />
    </CabinetItem>
    <CabinetItem text="我的技术栈" v-if="__LITE_CONFIG__.graph">
      <template #icon>
        <el-icon style="margin-right: 5px">
          <i-ep-aim />
        </el-icon>
      </template>
      <SkillGraph />
    </CabinetItem>
    <CabinetItem text="常用链接" v-if="links && links.length > 0">
      <template #icon>
        <el-icon style="margin-right: 5px">
          <i-ep-link />
        </el-icon>
      </template>
      <a
        class="hover block mb-3 fsz-0.9 pri-color"
        v-for="(item, index) in links"
        :key="index"
        :href="item.href"
        target="_blank">
        {{ item.text }}
      </a>
    </CabinetItem>
    <CabinetItem text="推荐书籍" v-if="books && books.length > 0">
      <template #icon>
        <el-icon style="margin-right: 5px">
          <i-ep-notebook />
        </el-icon>
      </template>
      <div class="mb-3 f-c-c" v-for="(item, index) in books" :key="index">
        <img class="hvh-10 wvw-3.8" :src="item.img" alt="FAILED" />
        <div class="ml-2" style="width: calc(100% - 3.8vw - 0.5rem)">
          <span v-if="!item.href">{{ item.text }}</span>
          <a class="hover fsz-0.9 pri-color" v-else :href="item.href" target="_blank">
            {{ item.text }}
          </a>
          <div class="fsz-0.8 sec-color">{{ item.author }}</div>
          <el-rate style="width: 100%" v-model="item.rate" disabled size="small" />
        </div>
      </div>
    </CabinetItem>
  </div>
</template>
