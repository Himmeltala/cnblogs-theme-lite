<script setup lang="ts">
import { blogApp } from "@/lite.config";
import { getSort, getSortChild } from "@/apis/remote-api";
import { endLoading, startLoading, nav, getSetting } from "@/utils/common";

startLoading();

const route = useRoute();
const router = useRouter();
const setting = getSetting();
const child = ref(await getSortChild(`${route.params.id}`));
const sort = ref(await getSort(`${route.params.id}`, true, 1));

document.querySelector("title").innerText = `${sort.value.hint} - ${blogApp} - 博客园`;

onMounted(() => {
  endLoading();
});

async function nexpr(e: any) {
  startLoading();
  sort.value = await getSort(`${route.params.id}`, true, e.currentIndex);
  endLoading();
}

async function next(e: any) {
  startLoading();
  sort.value = await getSort(`${route.params.id}`, true, e.currentIndex);
  endLoading();
}

async function prev(e: any) {
  startLoading();
  sort.value = await getSort(`${route.params.id}`, true, e.currentIndex);
  endLoading();
}

watch(route, async () => {
  startLoading();
  sort.value = await getSort(`${route.params.id}`, true, 1);
  child.value = await getSortChild(`${route.params.id}`);
  endLoading();
  document.querySelector("title").innerText = `${sort.value.hint} - ${blogApp} - 博客园`;
});
</script>

<template>
  <ContextMenu>
    <div id="l-sort" class="min-height">
      <Pagination @nexpr="nexpr" @next="next" @prev="prev" :page-count="sort.page" :disabled="setting.other.pagation.pin">
        <template #content>
          <Card :padding="setting.pages.sort.padding" :margin="setting.pages.sort.margin">
            <el-page-header :icon="null" @back="nav({ path: 'back', router })">
              <template #title>
                <div class="f-c-c">
                  <i-ep-back />
                </div>
              </template>
              <template #content>
                <div class="l-sec-size mb-5 mt-4">{{ sort.hint }}</div>
              </template>
            </el-page-header>
            <div class="l-sort__desc mb-4 l-fiv-size l-sec-color">
              {{ sort.desc }}
            </div>
            <div class="l-sort__child mb-4" v-if="child.length > 0">
              <el-collapse>
                <el-collapse-item title="子分类">
                  <div class="hover" v-for="(item, index) in child" :key="index" :class="{ 'mb-1 ': index != child.length - 1 }">
                    <router-link :to="'/sort/' + item.id">{{ item.text }}</router-link>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </Card>
          <EssayItem
            v-if="sort.data.length > 0"
            :padding="setting.pages.sort.padding"
            :margin="setting.pages.sort.margin"
            :data="sort.data" />
        </template>
      </Pagination>
    </div>
    <template #title>分类页盒子模型设置</template>
    <template #content>
      <BoxSetting :padding="setting.pages.sort.padding" :margin="setting.pages.sort.margin" />
    </template>
  </ContextMenu>
</template>
