<script setup lang="ts">
import { __LITE_CONFIG__ } from "@/lite.config";
import { nav } from "@/helpers/route-helper";

const router = useRouter();
const navor = __LITE_CONFIG__.navor;
</script>

<template>
  <div
    id="navigation"
    class="fixed z-999 w-200 h-15 f-c-c top-0 bg-color"
    :style="{ 'justify-content': navor?.header ? 'space-between' : 'flex-end' }">
    <div
      class="hover fsz-1.5 font-normal f-c-c sec-color"
      @click="nav('/', router)"
      v-if="navor?.header"
      v-html="navor.header"></div>
    <div class="f-c-c fsz-1">
      <div class="hover mr-4" @click="nav('https://www.cnblogs.com')">博客园</div>
      <div class="hover mr-4" @click="nav('/', router)">首页</div>
      <div class="hover" :class="{ 'mr-4': navor?.navs }" @click="nav('/', router)">标签</div>
      <div
        v-if="navor?.navs"
        v-for="(item, index) in navor.navs"
        :key="index"
        :class="{ 'mr-4': index !== navor.navs.length - 1 }"
        class="hover f-c-c">
        <div v-if="item.text" @click="nav(item.href)">{{ item.text }}</div>
        <div class="f-c-c" v-else>
          <svg
            v-if="(item.svg || item.img) && item.svg"
            class="w-6 h-6"
            fill="var(--pri-text-color)"
            @click="nav(item.href)"
            viewBox="0 0 1024 1024"
            v-html="item.svg" />
          <img v-else class="rd-50 w-6 h-6" alt="FAILED" @click="nav(item.href)" :src="item.img" />
        </div>
      </div>
    </div>
  </div>
</template>
