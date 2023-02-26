<script setup lang="ts">
import { blogApp } from "@/lite.config";
import { nav } from "@/utils/router-helper";
import { getTagColl } from "@/utils/remote-api";
import { closeLoader, getSetting } from "@/utils/common";

const route = useRoute();
const router = useRouter();
const data = await getTagColl(String(route.params.tag));
const hint = ref(data.text);
const tagList = ref(data.array);
const setting = getSetting();

document.querySelector("title").innerText = `${hint.value} - ${blogApp} - 博客园`;

closeLoader();

watch(route, async () => {
  const data = await getTagColl(String(route.params.tag));
  hint.value = data.text;
  tagList.value = data.array;
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
          <div class="l-sec-size mb-5 mt-4">{{ hint }}</div>
        </template>
      </el-page-header>
      <Card v-for="(item, index) in tagList" :key="index" line :padding="setting.listing.padding" :margin="setting.listing.margin">
        <div class="l-sec-size">
          <router-link class="hover" :to="'/p/' + item.id">
            {{ item.title }}
          </router-link>
        </div>
        <div class="f-c-s l-fiv-size mt-4">
          <i-ep-caret-right />
          <router-link class="hover ml-0.5 b-b-1 b-b-dotted p-b-0.3" :to="'/p/' + item.id"> 阅读全文 </router-link>
        </div>
        <ArticleSynopsis class="mt-4" :data="{ date: item.date, view: item.view, comm: item.comm, digg: item.digg }" />
      </Card>
    </div>
    <template #title>列表项盒子模型设置</template>
    <template #content>
      <BoxSetting :padding="setting.listing.padding" :margin="setting.listing.margin" />
    </template>
  </ContextMenu>
</template>
