<script setup lang="ts">
defineProps({
  nav: {
    type: Function
  },
  navor: {
    type: Object
  },
  router: {
    type: Object
  }
});
</script>

<template>
  <div class="hover mr-4 wce-nowrap" @click="nav({ path: 'https://www.cnblogs.com' })">博客园</div>
  <div class="hover mr-4 wce-nowrap" @click="nav({ path: '/', router })">首页</div>
  <div
    class="hover wce-nowrap"
    :class="{ 'mr-4': navor?.navs }"
    @click="nav({ path: '/', router })">
    标签
  </div>
  <div
    v-if="navor?.navs"
    v-for="(item, index) in navor.navs"
    :key="index"
    :class="{ 'mr-4': index !== navor.navs.length - 1 }"
    class="hover f-c-c wce-nowrap">
    <div v-if="item.text" @click="nav({ path: item.href })">{{ item.text }}</div>
    <div class="f-c-c w-6 h-6" v-else>
      <svg
        class="w-6 h-6"
        v-if="(item.svg || item.img) && item.svg"
        fill="var(--pri-text-color)"
        @click="nav({ path: item.href })"
        viewBox="0 0 1024 1024"
        v-html="item.svg" />
      <img
        v-else
        class="rd-50 w-6 h-6"
        alt="FAILED"
        @click="nav({ path: item.href })"
        :src="item.img" />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
