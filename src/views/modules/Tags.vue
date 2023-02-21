<script setup lang="ts">
import { getTags } from "@/utils/remote-api";
import { closeLoader } from "@/utils/common";

const tags = await getTags();

closeLoader();
</script>

<template>
  <Card :padding="true" :border="false">
    <div id="l-tags" class="min-height">
      <Label class="item mb-4 p-3 fsz-0.8 f-c-s" v-for="(item, index) in tags" :key="index">
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
