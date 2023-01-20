<script setup lang="ts">
import { getGalleryImg } from "@/utils/local-api";
import { closeLoader } from "@/utils/common";

const router = useRouter();
const imgUrl = getGalleryImg();
const srcList = <string[]>[imgUrl];

closeLoader();

const asyncComp = ref(null);
const emits = defineEmits(["complete"]);
watch(asyncComp, () => {
  emits("complete", asyncComp);
});
</script>

<template>
  <div ref="asyncComp" id="lite-gallery" style="height: 100%; width: 100%" class="f-c-c">
    <Card
      style="width: inherit; height: inherit"
      :class="{
        'f-c-c': !imgUrl || !srcList.length,
        'flex justify-center': imgUrl
      }">
      <el-image
        style="max-width: 100%; height: inherit"
        fit="cover"
        :src="imgUrl"
        :preview-src-list="srcList" />
      <el-result
        v-if="!imgUrl || !srcList.length"
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
