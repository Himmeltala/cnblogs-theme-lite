<script setup lang="ts">
import { WorksApi } from "@/apis";

const route = useRoute();
const router = useRouter();
const listing = shallowRef(await WorksApi.getListByMark(`${route.params.tag}`));
const setting = LiteUtils.getLocalSetting();

LiteUtils.setTitle(listing.value.hint);

async function fetchData(index?: any) {
  LiteUtils.startLoading();
  listing.value = await WorksApi.getListByMark(`${route.params.tag}`, index);
  LiteUtils.setTitle(listing.value.hint);
  LiteUtils.endLoading();
}

watch(route, async () => {
  if (route.name === RouterName.WORKS_BY_MARK) await fetchData();
});

onMounted(() => {
  LiteUtils.endLoading();
});
</script>

<template>
  <ContextMenu>
    <div id="l-tagcoll" class="min-height">
      <el-page-header :icon="null" @back="LiteUtils.Router.go({ path: 'back', router })">
        <template #title>
          <div class="f-c-c">
            <i-ep-back />
          </div>
        </template>
        <template #content>
          <div class="l-size-3 mb-5 mt-4">{{ listing.hint }}</div>
        </template>
      </el-page-header>
      <Card line v-for="item of listing.data" :padding="setting.pages.markSort.padding" :margin="setting.pages.markSort.margin">
        <div class="l-size-3">
          <router-link class="hover" :to="'/p/' + item.id">
            {{ item.text }}
          </router-link>
        </div>
        <div class="f-c-s l-size-2 mt-4">
          <i-ep-caret-right />
          <router-link class="hover ml-0.5 b-b-1 b-b-dotted p-b-0.3" :to="'/p/' + item.id"> 阅读全文 </router-link>
        </div>
        <div class="l-article-item__synopsis f-c-s l-size-2 l-color-2">
          <div class="mr-3 f-c-c">
            <i-ep-clock class="mr-1" />
            {{ item.date }}
          </div>
          <div class="mr-3 f-c-c">
            <i-ep-view class="mr-1" />
            {{ item.view }}
          </div>
          <div class="mr-3 f-c-c">
            <i-ep-chat-line-square class="mr-1" />
            {{ item.comm }}
          </div>
          <div class="f-c-c">
            <i-ep-star class="mr-1" />
            {{ item.digg }}
          </div>
        </div>
      </Card>
    </div>
    <template #title>盒子模型设置</template>
    <template #content>
      <BoxSetting :padding="setting.pages.markSort.padding" :margin="setting.pages.markSort.margin" />
    </template>
  </ContextMenu>
</template>
