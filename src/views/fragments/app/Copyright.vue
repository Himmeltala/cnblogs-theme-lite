<script setup lang="ts">
import { blogApp } from "@/lite.config";
</script>

<template>
  <div class="l-copyright f-c-c my-2 l-six-size l-sec-color h-8">
    <div class="l-copyright__content">
      <div class="f-c-c">
        <div>Powered by <a class="hover" href="https://www.cnblogs.com" target="__blank">博客园</a> Copyright © {{ blogApp }}</div>
      </div>
      <div class="f-c-c mt-1">
        <div>
          Powered by
          <a class="hover" href="https://github.com/Himmelbleu/cnblogs-theme-lite" target="__blank"> Himmelbleu </a>
          <a class="hover" href="https://v3.cn.vuejs.org/" target="__blank"> Vue3 </a>
          on
          <a class="hover" href="https://vitejs.cn/vite3-cn/" target="__blank"> Vite.</a>
        </div>
      </div>
    </div>
  </div>
</template>
