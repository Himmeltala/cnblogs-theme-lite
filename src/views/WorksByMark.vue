<script setup lang="ts">
import { WorksApi } from "@/apis";

const route = useRoute();
const router = useRouter();
const localSetting = LiteUtils.getLocalSetting();
const listing = shallowRef(await WorksApi.getListByMark(`${route.params.tag}`));

LiteUtils.setTitle(listing.value.hint);

async function fetchData(index?: any) {
  LiteUtils.startLoading();
  listing.value = await WorksApi.getListByMark(`${route.params.tag}`, index);
  LiteUtils.setTitle(listing.value.hint);
  LiteUtils.endLoading();
}

watch(route, async () => {
  if (route.name === RouterConstants.Name.WORKS_BY_MARK) await fetchData();
});

onMounted(() => {
  LiteUtils.endLoading();
});
</script>

<template>
  <ContextMenu>
    <div id="l-tagcoll" class="min-height">
      <Card line v-for="item of listing.data" :padding="localSetting.pages.markSort.padding" :margin="localSetting.pages.markSort.margin">
        <div class="l-size-3">
          <router-link class="hover" :to="'/p/' + item.id">
            {{ item.text }}
          </router-link>
        </div>
        <div class="f-c-s l-size-2 mt-4">
          <i-ep-caret-right />
          <router-link class="hover ml-0.5 b-b-1 b-b-dotted p-b-0.3" :to="'/p/' + item.id"> 阅读全文 </router-link>
        </div>
        <div class="mt-4 f-c-s l-size-2 l-color-2">
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
      <BoxSetting :padding="localSetting.pages.markSort.padding" :margin="localSetting.pages.markSort.margin" />
    </template>
  </ContextMenu>
</template>
