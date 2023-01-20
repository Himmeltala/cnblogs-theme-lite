<script setup lang="ts">
import { getTag } from "@/utils/remote-api";
import { closeLoader } from "@/utils/common";

const data = await getTag();

closeLoader();
</script>

<template>
  <div id="lite-mytags" class="min-height">
    <Tag
      class="mb-3 px-3 py-3"
      :class="{ 'mr-3': (index + 1) % 4 !== 0 }"
      style="flex: 1 1 20%"
      v-for="(item, index) in data"
      :key="index">
      <router-link class="hover pri-color" :to="'/t/' + item.text">
        {{ item.text }} ({{ item.count }})
      </router-link>
    </Tag>
  </div>
</template>

<style scoped lang="scss">
#lite-mytags {
  @include flex($justify: space-between, $items: stretch, $content: stretch);
}
</style>
