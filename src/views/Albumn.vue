<script setup lang="ts">
import { blogApp } from "@/lite.config";
import { getAlbumn } from "@/apis/remote-api";
import { startLoading, endLoading, nav } from "@/utils/common";

startLoading();

const route = useRoute();
const router = useRouter();
const albumn = ref(await getAlbumn(`${route.params.id}`));
const srcList = ref(albumn.value.data.map(i => i.src));

document.querySelector("title").innerText = `相册 - ${blogApp} - 博客园`;

onMounted(() => {
  endLoading();
});

watch(route, async () => {
  if (route.name === "Albumn") {
    startLoading();
    albumn.value = await getAlbumn(`${route.params.id}`);
    srcList.value = albumn.value.data.map(i => i.src);
    endLoading();
  }
});
</script>

<template>
  <div id="l-albumn" class="min-height">
    <el-page-header :icon="null" @back="nav({ path: 'back', router })">
      <template #title>
        <div class="f-c-c">
          <i-ep-back />
        </div>
      </template>
      <template #content>
        <div class="l-sec-size mb-5 mt-4">相册 - {{ albumn.title }}</div>
      </template>
    </el-page-header>
    <div class="mb-4 l-fiv-size l-sec-color">{{ albumn.desc }}</div>
    <div class="f-c-b flex-wrap">
      <el-image
        class="w-50 h-50 mb-4"
        v-for="(item, index) in srcList"
        :key="index"
        :initial-index="index"
        :src="item"
        :preview-src-list="srcList" />
      <el-result v-if="!albumn.data.length" icon="error" title="相册加载失败" sub-title="相册可能被移除">
        <template #extra>
          <el-button @click="router.push('/')" type="primary">返回首页</el-button>
        </template>
      </el-result>
    </div>
  </div>
</template>
