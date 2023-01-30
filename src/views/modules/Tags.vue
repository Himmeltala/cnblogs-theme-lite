<script setup lang="ts">
import { getTag } from "@/utils/remote-api";
import { closeLoader } from "@/utils/common";

const data = await getTag();

closeLoader();
</script>

<template>
  <div id="l-tags" class="min-height">
    <Label class="item mb-4 p-3 fsz-0.8 f-c-s" v-for="(item, index) in data" :key="index">
      <router-link class="hover" :to="'/label/' + item.text">
        {{ item.text }} ({{ item.count }})
      </router-link>
    </Label>
  </div>
</template>

<style scoped lang="scss">
#l-tags {
  @include flex($justify: space-between, $items: stretch, $content: stretch);

  @media screen and (min-width: 1000px) {
    .item {
      flex: 1 1 20%;

      &:not(:nth-child(4n)) {
        --at-apply: mr-3;
      }
    }
  }

  @media screen and (max-width: 1000px) {
    .item {
      flex: 1 1 40%;

      &:nth-child(odd) {
        --at-apply: mr-3;
      }
    }
  }
}
</style>
