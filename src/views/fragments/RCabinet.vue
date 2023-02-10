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
    style="width: 250px"
    class="noscroll fixed top-0 right-0 w-250px h-100vh px-2 z-999 l-box-bg ofw-auto">
    <CabinetItem text="随笔目录" v-if="anchors && anchors.length">
      <template #icon>
        <el-icon style="margin-right: 5px">
          <i-ep-location />
        </el-icon>
      </template>
      <div
        class="catalog mb-2 fsz-0.9"
        v-for="(item, index) in anchors"
        :key="index"
        v-html="item.content"
        v-anchor-event="item" />
    </CabinetItem>
    <CabinetItem text="我的技术栈" v-if="__LITE_CONFIG__.graph">
      <template #icon>
        <el-icon style="margin-right: 5px">
          <i-ep-aim />
        </el-icon>
      </template>
      <SkillGraph />
    </CabinetItem>
    <CabinetItem text="常用链接" v-if="links && links.length">
      <template #icon>
        <el-icon style="margin-right: 5px">
          <i-ep-link />
        </el-icon>
      </template>
      <a
        class="hover block mb-3 fsz-0.9 l-pri-color"
        v-for="(item, index) in links"
        :key="index"
        :href="item.href"
        target="_blank">
        {{ item.text }}
      </a>
    </CabinetItem>
    <CabinetItem text="推荐书籍" v-if="books && books.length">
      <template #icon>
        <el-icon style="margin-right: 5px">
          <i-ep-notebook />
        </el-icon>
      </template>
      <div class="mb-4 f-c-b" v-for="(item, index) in books" :key="index">
        <img class="h-25 w-20" :src="item.img" alt="FAILED" />
        <div style="width: calc(100% - 6rem)">
          <div class="mb-1 fsz-0.9 l-pri-color" v-if="!item.href">
            <span>{{ item.text }}</span>
          </div>
          <div class="mb-2 fsz-0.9 l-pri-color" v-else>
            <a class="hover" target="_blank" :href="item.href">
              {{ item.text }}
            </a>
          </div>
          <div class="mb-1 fsz-0.8 l-sec-color">{{ item.author }}</div>
          <el-rate style="width: 100%" v-model="item.rate" disabled size="small" />
        </div>
      </div>
    </CabinetItem>
  </div>
</template>
