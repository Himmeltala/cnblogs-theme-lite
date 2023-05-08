<script setup lang="ts">
import { getAlbumn } from "@/apis";

LiteUtils.startLoading();

const route = useRoute();
const router = useRouter();
const albumn = shallowRef(await getAlbumn(`${route.params.id}`));
const srcList = shallowRef(albumn.value.data.map(i => i.src));

LiteUtils.setTitle("相册");

watch(route, async () => {
  if (route.name === RouterConstants.Name.ALBUMN) {
    LiteUtils.startLoading();
    albumn.value = await getAlbumn(`${route.params.id}`);
    srcList.value = albumn.value.data.map(i => i.src);
    LiteUtils.endLoading();
  }
});

onMounted(() => {
  LiteUtils.endLoading();
});
</script>

<template>
  <Card id="l-albumn" class="min-height" :padding="{ left: 2, right: 2 }">
    <el-page-header :icon="null" @back="LiteUtils.Router.go({ path: 'back', router })">
      <template #title>
        <div class="f-c-c">
          <i-ep-back />
        </div>
      </template>
      <template #content>
        <div class="l-size-3 mb-5 mt-4">相册 - {{ albumn.title }}</div>
      </template>
    </el-page-header>
    <div class="mb-4 l-size-2 l-color-2">{{ albumn.desc }}</div>
    <div class="f-c-b flex-wrap">
      <el-image class="w-50 h-50 mb-4" v-for="(item, index) in srcList" :initial-index="index" :src="item" :preview-src-list="srcList" />
      <el-result v-if="!albumn.data.length" icon="error" title="相册加载失败" sub-title="相册可能被移除">
        <template #extra>
          <el-button @click="router.push('/')" type="primary">返回首页</el-button>
        </template>
      </el-result>
    </div>
  </Card>
</template>
