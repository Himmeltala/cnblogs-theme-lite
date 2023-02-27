<script setup lang="ts">
import { blogApp } from "@/lite.config";
import { getSorts } from "@/apis/remote-api";
import { endLoading, startLoading, nav, getSetting } from "@/utils/common";

startLoading();

const route = useRoute();
const router = useRouter();
const setting = getSetting();
const cates = await getSorts(route.params.id, true, 1);
const count = ref(cates.pages[cates.pages.length - 1]);
const data = ref(cates.array);
const hint = ref(cates.label);

document.querySelector("title").innerText = `${hint.value} - ${blogApp} - 博客园`;

endLoading();

async function nexpr(e: any) {
  startLoading();
  data.value = (await getSorts(route.params.id, true, e.currentIndex)).array;
  endLoading();
}

async function next(e: any) {
  startLoading();
  data.value = (await getSorts(route.params.id, true, e.currentIndex)).array;
  endLoading();
}

async function prev(e: any) {
  startLoading();
  data.value = (await getSorts(route.params.id, true, e.currentIndex)).array;
  endLoading();
}

watch(route, async () => {
  const { array, label } = await getSorts(route.params.id, true, 1);
  data.value = array;
  hint.value = label;
  document.querySelector("title").innerText = `${hint.value} - ${blogApp} - 博客园`;
});
</script>

<template>
  <ContextMenu>
    <div id="l-sort" class="min-height">
      <Pagination @nexpr="nexpr" @next="next" @prev="prev" :page-count="count" :disabled="setting.other.pagation.pin">
        <template #content>
          <el-page-header :icon="null" @back="nav({ path: 'back', router })">
            <template #title>
              <div class="f-c-c">
                <i-ep-back />
              </div>
            </template>
            <template #content>
              <div class="l-sec-size mb-5 mt-4">{{ hint }}</div>
            </template>
          </el-page-header>
          <ArticleItem :padding="setting.pages.sort.padding" :margin="setting.pages.sort.margin" v-if="data" :data="data" />
        </template>
      </Pagination>
    </div>
    <template #title>分类页盒子模型设置</template>
    <template #content>
      <BoxSetting :padding="setting.pages.sort.padding" :margin="setting.pages.sort.margin" />
    </template>
  </ContextMenu>
</template>
