<script setup lang="ts">
import { WorksApi } from "@/apis";

const route = useRoute();
const localSetting = LiteUtils.getLocalSetting();
let sortId = route.params.id as string;
const typeL2Works = shallowRef();
const typeL1Works = shallowRef();

async function fetchData(index?: any) {
  LiteUtils.startLoading();
  typeL1Works.value = await WorksApi.getByL1(`${sortId}`, index);
  LiteUtils.endLoading();
  typeL2Works.value = await WorksApi.getByL2(`${sortId}`, typeL1Works.value.isArticle);
  LiteUtils.setTitle(typeL1Works.value.hint);
}

await fetchData();

watch(route, async () => {
  if (route.name === RouterConstants.Name.WORKS_BY_SORT) {
    sortId = route.params.id as string;
    await fetchData();
  }
});
</script>

<template>
  <ContextMenu>
    <div id="l-sort" class="min-height">
      <Pagination
        @nexpr="fetchData"
        @next="fetchData"
        @prev="fetchData"
        :count="typeL1Works.page"
        :disabled="localSetting.other.pagation.pin">
        <template #content>
          <Card :padding="{ left: 1, right: 1, bottom: 1 }" :margin="{ bottom: 1 }">
            <el-page-header :icon="null" @back="LiteUtils.Router.go({ path: 'back', router: $router })">
              <template #title>
                <div class="f-c-c">
                  <i-ep-back />
                </div>
              </template>
              <template #content>
                <div class="l-size-3 mb-5 mt-4">{{ typeL1Works.hint }}</div>
              </template>
            </el-page-header>
            <div class="l-sort__desc mb-4 l-for-size l-color-2" v-html="typeL1Works.desc2 || typeL1Works.desc"></div>
            <div class="l-sort__child l-size-2" v-if="typeL2Works.length > 0">
              <div class="hover f-c-s" v-for="(item, index) in typeL2Works" :class="{ 'mb-4': index != typeL2Works.length - 1 }">
                <span class="mr-2">📁</span>
                <router-link :to="RouterConstants.Path.WORKS_BY_SORT(item.id)">{{ item.text }}</router-link>
              </div>
            </div>
          </Card>
          <WorksItem :padding="localSetting.pages.sort.padding" :margin="localSetting.pages.sort.margin" :data="typeL1Works.data" />
        </template>
      </Pagination>
    </div>
    <template #title>盒子模型设置</template>
    <template #content>
      <BoxSetting :padding="localSetting.pages.sort.padding" :margin="localSetting.pages.sort.margin" />
    </template>
  </ContextMenu>
</template>
