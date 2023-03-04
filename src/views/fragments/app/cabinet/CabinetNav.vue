<script setup lang="ts">
import { nav } from "@/utils/common";
import { __LITE_CONFIG__ } from "@/lite.config";

const router = useRouter();
</script>

<template>
  <div class="noscroll ofw-auto h-4vh l-thr-color f-c wce-nowrap">
    <div class="hover mr-4" @click="nav({ path: 'https://www.cnblogs.com' })">博客园</div>
    <div class="hover mr-4" @click="nav({ path: '/', router })">首页</div>
    <div
      v-if="__LITE_CONFIG__.cabinet?.navs"
      v-for="(item, index) in __LITE_CONFIG__.cabinet.navs"
      :key="index"
      :class="{ 'mr-4': index !== __LITE_CONFIG__.cabinet.navs.length - 1 }"
      class="hover f-c-c">
      <div v-if="item.text" @click="nav({ path: item.href })">{{ item.text }}</div>
      <div class="f-c-c w-6 h-6" v-else>
        <svg
          v-if="(item.svg || item.img) && item.svg"
          @click="nav({ path: item.href })"
          class="w-6 h-6"
          fill="var(--l-thr-color)"
          viewBox="0 0 1024 1024"
          v-html="item.svg"></svg>
        <img v-else class="rd-50 w-6 h-6" alt="FAILED" @click="nav({ path: item.href })" :src="item.img" />
      </div>
    </div>
  </div>
</template>
