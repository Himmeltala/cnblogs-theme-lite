<script setup lang="ts">
import { getGalleryImg } from "@/utils/local-api";
import { closeLoader } from "@/utils/common";

const router = useRouter();
const imgUrl = getGalleryImg();

closeLoader();
</script>

<template>
  <div id="l-gallery" class="f-c-c min-height">
    <el-image fit="cover" :src="imgUrl" :preview-src-list="[imgUrl]" />
    <el-result v-if="!imgUrl" icon="error" title="图片加载失败" sub-title="图片可能从相册移除">
      <template #extra>
        <el-button @click="router.push('/')" type="primary">返回首页</el-button>
      </template>
    </el-result>
  </div>
</template>
