<script setup lang="ts">
import { getMarkList } from "@/apis";

LiteUtils.startLoading();

const localSetting = LiteUtils.getLocalSetting();
const markList = await getMarkList();

LiteUtils.setTitle("标签");

onMounted(() => {
  LiteUtils.endLoading();
});
</script>

<template>
  <ContextMenu>
    <Card :padding="localSetting.pages.markList.padding" :margin="localSetting.pages.markList.margin">
      <div id="l-tags" class="min-height">
        <LTag round hover line="dotted" class="item mb-4" v-for="item of markList">
          <div class="f-c-c w-100% h-100%">
            <router-link :to="'/mark/' + item.text"> {{ item.text }} ({{ item.count }}) </router-link>
          </div>
        </LTag>
      </div>
    </Card>
    <template #title>盒子模型设置</template>
    <template #content>
      <BoxSetting :padding="localSetting.pages.markList.padding" :margin="localSetting.pages.markList.margin" />
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
