<script setup lang="ts">
import { getGalleryImg } from "@/utils/local-api";
import { closeLoader } from "@/utils/loader";

const router = useRouter();
const url = getGalleryImg();
const srcList = <string[]>[url];

closeLoader();
</script>

<template>
  <div id="gallery" style="height: 100%; width: 100%" class="flex items-center content-center justify-center">
    <Card
      style="width: inherit; height: inherit"
      :class="{
        'flex items-center content-center justify-center': !url || !srcList.length,
        'flex justify-center': url
      }">
      <el-image
        class="image"
        style="max-width: 100%; height: inherit"
        fit="cover"
        :src="url"
        :preview-src-list="srcList" />
      <el-result
        v-if="!url || !srcList.length"
        icon="error"
        title="图片加载失败！"
        sub-title="检查你的网络状态或图片已从相册移除">
        <template #extra>
          <el-button @click="router.push('/')" type="primary">返回首页</el-button>
        </template>
      </el-result>
    </Card>
  </div>
</template>
