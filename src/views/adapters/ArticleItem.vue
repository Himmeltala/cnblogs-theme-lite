<script setup lang="ts">
import { PropType } from "vue";
import { CustType } from "@/types/data-type";
import { getSetting, nav } from "@/utils/common";

const router = useRouter();
const setting = getSetting();

defineProps({
  data: {
    type: Array as PropType<CustType.IArticle[]>,
    required: true
  }
});
</script>

<template>
  <Card v-for="(item, index) in data" :key="index" line :padding="setting.listing.padding" :margin="setting.listing.margin">
    <div class="l-article-item__head f-c-b" :class="{ 'mb-5': item.surface }">
      <el-image v-if="index % 2 !== 0 && item.surface" class="cover h-35 rd-2" :src="item.surface" fit="cover" />
      <div :class="{ 'w-100%': !item.surface, 'has-cover w-60%': item.surface }">
        <div class="l-article-item__title hover f-c-s mb-5 l-pri-size" @click="nav({ path: '/p/' + item.id, router })">
          {{ item.text }}
        </div>
        <div class="l-article-item__desc l-thr-color" :class="{ 'mb-5': !item.surface, 'f-c-s': item.isLocked }">
          {{ item.desc }}
        </div>
      </div>
      <el-image v-if="index % 2 === 0 && item.surface" class="cover h-35 rd-2" :src="item.surface" fit="cover" />
    </div>
    <div class="l-article-item__read hover f-c-s mb-4 l-fiv-size">
      <i-ep-caret-right />
      <router-link class="ml-0.5 b-b-1 b-b-dotted p-b-0.3" :to="'/p/' + item.id"> 阅读全文 </router-link>
    </div>
    <ArticleSynopsis :align="'flex-end'" :data="{ date: item.date, comm: item.comm, digg: item.digg, view: item.view }" />
    <div class="l-article-item__bottom" :class="{ 'mt-4': item.isTop || item.isOnlyMe || item.isLocked }">
      <el-tag v-if="item.isTop" size="small" round effect="plain" class="mr-2">置顶随笔</el-tag>
      <el-tag v-if="item.isOnlyMe" class="mr-2" size="small" round effect="plain">仅自己可见</el-tag>
      <el-tag v-if="item.isLocked" class="mr-2" size="small" round effect="plain">被密码锁定</el-tag>
    </div>
  </Card>
</template>

<style scoped lang="scss">
@include pc() {
  .cover {
    --at-apply: w-26%;
  }

  .has-cover {
    --at-apply: w-72%;
  }
}

@include mb() {
  .cover {
    --at-apply: w-38%;
  }

  .has-cover {
    --at-apply: w-60%;
  }
}
</style>
