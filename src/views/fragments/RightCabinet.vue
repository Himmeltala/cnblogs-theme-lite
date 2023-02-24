<script setup lang="ts">
import { useCatalogStore } from "@/store";
import { __LITE_CONFIG__ } from "@/lite.config";
import { getSetting } from "@/utils/common";

const setting = getSetting();
const route = useRoute();
const anchors = ref();
const store = useCatalogStore();
const active = ref("1");

store.$onAction(({ store, args }) => {
  anchors.value = args[0];
}, true);

watch(route, val => {
  if (val.name === "home") anchors.value = [];
});
</script>

<template>
  <ContextMenu id="l-rcabinet" class="z-1" style="width: var(--cabinet-width)">
    <Card
      class="noscroll l-fiv-size h-100vh ofw-auto"
      :class="{ 'l-box-bg px-2': !setting.card.open }"
      :padding="setting.cabinet.right.padding"
      :margin="setting.cabinet.right.margin">
      <ExpandableBox text="随笔目录" v-if="anchors && anchors.length">
        <template #icon>
          <i-ep-location />
        </template>
        <div class="catalog mb-2" v-for="(item, index) in anchors" :key="index" v-html="item.content" v-cateve="item" />
      </ExpandableBox>
      <ExpandableBox text="我的技术栈" v-if="__LITE_CONFIG__.graph">
        <template #icon>
          <i-ep-aim />
        </template>
        <SkillGraph />
      </ExpandableBox>
      <ExpandableBox text="常用链接" v-if="__LITE_CONFIG__.links && __LITE_CONFIG__.links.length">
        <template #icon>
          <i-ep-link />
        </template>
        <a class="hover block mb-3" v-for="(item, index) in __LITE_CONFIG__.links" :key="index" :href="item.href" target="_blank">
          {{ item.text }}
        </a>
      </ExpandableBox>
      <ExpandableBox text="推荐书籍" v-if="__LITE_CONFIG__.books && __LITE_CONFIG__.books.length">
        <template #icon>
          <i-ep-notebook />
        </template>
        <div class="mb-3 f-c-b" v-for="(item, index) in __LITE_CONFIG__.books" :key="index">
          <img class="h-25 w-20" :src="item.img" alt="FAILED" />
          <div style="width: calc(100% - 6rem)">
            <div class="mb-1" v-if="!item.href">
              <span>{{ item.text }}</span>
            </div>
            <div class="mb-2" v-else>
              <a class="hover" target="_blank" :href="item.href">
                {{ item.text }}
              </a>
            </div>
            <div class="mb-1">{{ item.author }}</div>
            <el-rate style="width: 100%" v-model="item.rate" disabled size="small" />
          </div>
        </div>
      </ExpandableBox>
    </Card>
    <template #title> 右陈列柜设置 </template>
    <template #content>
      <el-collapse v-model="active" accordion>
        <el-collapse-item title="统一设置">
          <div class="ml-4">
            <CabinetSetting />
          </div>
        </el-collapse-item>
        <el-collapse-item title="盒子模型">
          <div class="ml-4">
            <BoxSetting :padding="setting.cabinet.right.padding" :margin="setting.cabinet.right.margin" />
          </div>
        </el-collapse-item>
      </el-collapse>
    </template>
  </ContextMenu>
</template>

<style scoped lang="scss">
#l-rcabinet {
  transition: var(--l-transition);
}
</style>
