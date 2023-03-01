<script setup lang="ts">
import { blogApp } from "@/lite.config";
import { getMarkSort } from "@/apis/remote-api";
import { endLoading, startLoading, getSetting, nav } from "@/utils/common";

startLoading();

const route = useRoute();
const router = useRouter();
const sort = ref(await getMarkSort(`${route.params.tag}`));
const setting = getSetting();

document.querySelector("title").innerText = `${sort.value.hint} - ${blogApp} - 博客园`;

onMounted(() => {
  endLoading();
});

watch(route, async () => {
  startLoading();
  sort.value = await getMarkSort(`${route.params.tag}`);
  document.querySelector("title").innerText = `${sort.value.hint} - ${blogApp} - 博客园`;
  endLoading();
});
</script>

<template>
  <ContextMenu>
    <div id="l-tagcoll" class="min-height">
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
      <Card
        line
        v-for="(item, index) in sort.data"
        :key="index"
        :padding="setting.pages.tagColl.padding"
        :margin="setting.pages.tagColl.margin">
        <div class="l-sec-size">
          <router-link class="hover" :to="'/p/' + item.id">
            {{ item.title }}
          </router-link>
        </div>
        <div class="f-c-s l-fiv-size mt-4">
          <i-ep-caret-right />
          <router-link class="hover ml-0.5 b-b-1 b-b-dotted p-b-0.3" :to="'/p/' + item.id"> 阅读全文 </router-link>
        </div>
        <EssaySynopsis class="mt-4" :data="{ date: item.date, view: item.view, comm: item.comm, digg: item.digg }" />
      </Card>
    </div>
    <template #title>标签页列表盒子模型设置</template>
    <template #content>
      <BoxSetting :padding="setting.pages.tagColl.padding" :margin="setting.pages.tagColl.margin" />
    </template>
  </ContextMenu>
</template>
