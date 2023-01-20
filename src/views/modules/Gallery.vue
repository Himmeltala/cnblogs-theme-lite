<script setup lang="ts">
import { getGalleryImg } from "@/utils/local-api";
import { closeLoader } from "@/utils/common";

const router = useRouter();
const imgUrl = getGalleryImg();
const srcList = <string[]>[imgUrl];

closeLoader();
</script>

<template>
  <div id="lite-gallery" class="f-c-c min-height">
    <el-image fit="cover" :src="imgUrl" :preview-src-list="srcList" />
    <el-result
      v-if="!imgUrl || !srcList.length"
      icon="error"
      title="图片加载失败！"
      sub-title="检查你的网络状态或图片已从相册移除">
      <template #extra>
        <el-button @click="router.push('/')" type="primary">返回首页</el-button>
      </template>
    </el-result>
  </div>
</template>
