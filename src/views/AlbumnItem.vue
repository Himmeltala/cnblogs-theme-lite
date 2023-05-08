<script setup lang="ts">
import { getAlbumnItem } from "@/apis";

LiteUtils.startLoading();

const route = useRoute();
const router = useRouter();
const imgUrl = shallowRef(await getAlbumnItem(`${route.params.id}`));

LiteUtils.setTitle("相册照片");

onMounted(() => {
  LiteUtils.endLoading();
});
</script>

<template>
  <Card id="l-albumn-item" class="min-height" :padding="{ left: 2, right: 2 }">
    <el-page-header :icon="null" @back="LiteUtils.Router.go({ path: 'back', router })">
      <template #title>
        <div class="f-c-c">
          <i-ep-back />
        </div>
      </template>
      <template #content>
        <div class="l-size-3 mb-5 mt-4">我的照片</div>
      </template>
    </el-page-header>
    <div class="f-c-c">
      <el-image class="albumn-item" :src="imgUrl" :preview-src-list="[imgUrl]" />
      <el-result v-if="!imgUrl" icon="error" title="图片加载失败" sub-title="图片可能从相册移除">
        <template #extra>
          <el-button @click="router.push('/')" type="primary">返回首页</el-button>
        </template>
      </el-result>
    </div>
  </Card>
</template>

<style lang="scss">
.albumn-item {
  img {
    max-height: 70vh !important;
  }
}
</style>
