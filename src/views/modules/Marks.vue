<script setup lang="ts">
import { blogApp } from "@/lite.config";
import { getMarks } from "@/apis/remote-api";
import { endLoading, startLoading, getSetting } from "@/utils/common";

startLoading();

const marks = await getMarks();
const setting = getSetting();

document.querySelector("title").innerText = `标签 - ${blogApp} - 博客园`;

onMounted(() => {
  endLoading();
});
</script>

<template>
  <ContextMenu>
    <Card border :padding="setting.pages.tags.padding" :margin="setting.pages.tags.margin">
      <div id="l-tags" class="min-height">
        <LTag round hover line="dotted" class="item mb-4" v-for="(item, index) in marks" :key="index">
          <div class="f-c-c w-100% h-100%">
            <router-link :to="'/mark/sort/' + item.text"> {{ item.text }} ({{ item.count }}) </router-link>
          </div>
        </LTag>
      </div>
    </Card>
    <template #title>标签集合页盒子模型设置</template>
    <template #content>
      <BoxSetting :padding="setting.pages.tags.padding" :margin="setting.pages.tags.margin" />
    </template>
  </ContextMenu>
</template>

<style scoped lang="scss">
#l-tags {
  @include flex($justify: space-between, $items: stretch, $content: stretch);

  @include pc() {
    .item {
      flex: 1 1 20%;

      &:not(:nth-child(4n)) {
        --uno: mr-3;
      }
    }
  }

  @include mb() {
    .item {
      flex: 1 1 40%;

      &:nth-child(odd) {
        --uno: mr-3;
      }
    }
  }
}
</style>
