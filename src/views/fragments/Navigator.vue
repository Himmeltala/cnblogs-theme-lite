<script setup lang="ts">
import { __LITE_CONFIG__ } from "@/lite.config";
import { nav } from "@/utils/route-helper";

const router = useRouter();
const navor = __LITE_CONFIG__.navor;

let input = ref("");

function search() {
  window.open(`https://zzk.cnblogs.com/s?w=blog:${__LITE_CONFIG__.currentBlogApp}%${input.value}`, "__blank");
}
</script>

<template>
  <div
    id="navigator"
    class="fixed ltv-10 px-5 py-3 wvw-80 hvh-9 flex content-center items-center bg-#252525"
    :style="{ 'justify-content': navor?.header ? 'space-between' : 'flex-end' }">
    <div
      class="hover font-normal flex items-center content-center justify-center color-#878787"
      @click="nav('/', router)"
      v-if="navor?.header"
      v-html="navor.header"></div>
    <div class="flex items-center content-center justify-center fsz-1.1">
      <div class="mr-5 w-50" v-if="navor?.search">
        <el-input @keyup.enter="search" v-model="input">
          <template #prefix>
            <el-icon @click="search">
              <i-ep-search />
            </el-icon>
          </template>
        </el-input>
      </div>
      <div class="hover mr-5" @click="nav('https://www.cnblogs.com')">博客园</div>
      <div class="hover mr-5" @click="nav('/', router)">首页</div>
      <div class="hover" :class="{ 'mr-5': navor?.navs }" @click="nav('/', router)">标签</div>
      <div
        v-if="navor?.navs"
        v-for="(item, index) in navor.navs"
        :key="index"
        :class="{ 'mr-5': index !== navor.navs.length - 1 }"
        class="hover flex items-center content-center justify-center">
        <div v-if="item.text" @click="nav(item.href)">{{ item.text }}</div>
        <div class="flex items-center content-center justify-center" v-else>
          <svg
            v-if="(item.svg || item.img) && item.svg"
            @click="nav(item.href)"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            v-html="item.svg"></svg>
          <img
            v-else
            alt="FAILED"
            @click="nav(item.href)"
            style="width: 25px; height: 25px; object-fit: cover; border-radius: 50px"
            :src="item.img" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
svg {
  fill: #a7a7a7;
  cursor: pointer;
}
</style>

<style scoped lang="scss">
#navigator {
  box-sizing: border-box;
  border-radius: 0 0 6px 6px;
}
</style>
