<script setup lang="ts">
import { blogApp } from "@/lite.config";
import { closeLoader } from "@/utils/common";
import { getTags } from "@/apis/remote-api";

const tags = await getTags();

document.querySelector("title").innerText = `标签 - ${blogApp} - 博客园`;

closeLoader();
</script>

<template>
  <Card border>
    <div id="l-tags" class="min-height">
      <Label class="item mb-4 p-3 l-fiv-size f-c-s" v-for="(item, index) in tags" :key="index">
        <router-link class="hover" :to="'/label/' + item.text"> {{ item.text }} ({{ item.count }}) </router-link>
      </Label>
    </div>
  </Card>
</template>

<style scoped lang="scss">
#l-tags {
  @include flex($justify: space-between, $items: stretch, $content: stretch);

  @include pc() {
    .item {
      flex: 1 1 20%;

      &:not(:nth-child(4n)) {
        --at-apply: mr-3;
      }
    }
  }

  @include mb() {
    .item {
      flex: 1 1 40%;

      &:nth-child(odd) {
        --at-apply: mr-3;
      }
    }
  }
}
</style>
