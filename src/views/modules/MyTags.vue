<script setup lang="ts">
import { getTag } from "@/utils/api";
import { closeLoader } from "@/utils/loader";

const tags = await getTag();
closeLoader();
</script>

<template>
  <div id="mytags">
    <Card style="width: 100%; min-height: 90vh">
      <Tag
        class="mb-3 px-3 py-3"
        :class="{ 'mr-3': (index + 1) % 4 !== 0 }"
        style="flex: 1 1 20%"
        v-for="(item, index) in tags"
        :key="index">
        <router-link class="hover color-#a7a7a7" :to="'/t/' + item.text">
          {{ item.text }} ({{ item.count }})
        </router-link>
      </Tag>
    </Card>
  </div>
</template>

<style scoped lang="scss">
#mytags {
  & > div {
    @include flex($justify: space-between, $items: stretch, $content: stretch);
  }
}
</style>
