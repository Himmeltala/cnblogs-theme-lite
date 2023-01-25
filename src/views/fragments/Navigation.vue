<script setup lang="ts">
import { __LITE_CONFIG__ } from "@/lite.config";
import { nav } from "@/helpers/route-helper";

const router = useRouter();
const navor = __LITE_CONFIG__.navor;
</script>

<template>
  <div
    id="navigation"
    class="fixed top-0 h-vh-6 f-c-c bg-color z-999 w-vw-50"
    :style="{ 'justify-content': navor?.header ? 'space-between' : 'flex-end' }">
    <div
      class="hover fsz-1.5 font-normal f-c-c sec-color"
      @click="nav('/', router)"
      v-if="navor?.header"
      v-html="navor.header"></div>
    <div class="f-c-c fsz-1">
      <NavItem :nav="nav" :router="router" :navor="navor" />
    </div>
  </div>
</template>

<style lang="scss">
@media screen and (max-width: 1000px) {
  #nmask,
  #navigation {
    display: none;
  }
}
</style>
