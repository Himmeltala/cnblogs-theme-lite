<script setup lang="ts">
import { getGalleryImg } from "@/utils/api";
import { closeLoader } from "@/utils/loader";

const router = useRouter();

const url = getGalleryImg();
const srcList = <string[]>[url];

closeLoader();
</script>

<template>
  <div id="gallery" class="flex items-center content-center justify-center">
    <Card
      :class="{
        'flex items-center content-center justify-center': !url || !srcList.length,
        'flex justify-center': url
      }"
      width="100%"
      margin="0 10px 7px 10px"
      height="calc(90vh - 7px)">
      <el-image
        class="image"
        style="max-width: 100%; height: 100%"
        :src="url"
        fit="cover"
        :preview-src-list="srcList" />
      <el-result
        v-if="!url || !srcList.length"
        icon="error"
        title="相册图片加载失败！"
        sub-title="检查你的网络状态或相册图片已被移除">
        <template #extra>
          <el-button @click="router.push('/')" type="primary">返回首页</el-button>
        </template>
      </el-result>
    </Card>
  </div>
</template>
