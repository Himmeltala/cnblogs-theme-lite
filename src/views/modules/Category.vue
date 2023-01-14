<script setup lang="ts">
import * as DataType from "@/types/data-type";
import * as RemoteApi from "@/utils/api";
import { closeLoader } from "@/utils/loader";

const route = useRoute();

let data = ref<Array<DataType.Essay>>();
let label = ref<any>();
let loading = ref<boolean>(true);

/**
 * 获取该随笔分类下的所有随笔列表。
 * @param complete 请求完成的回调函数
 * @param calcPage 是否获取分页情况
 * @param pageIndex 当前页数
 */
function fetchData(complete?: ((pages: string[]) => void) | null, calcPage: boolean = false, pageIndex: number = 1) {
  loading.value = true;
  RemoteApi.getCategories(route.params.id, calcPage, pageIndex, res => {
    data.value = res.list;
    loading.value = false;
    label.value = res.label;
    complete && complete(res.pages);
  });
}

// 组件初始化数据
fetchData(() => {
  closeLoader();
});

let isCalc = ref<boolean>(true);
const pagination = ref();

// 监听路由状态，左侧边栏随笔分类发生变化时，触发 pagination 子组件，更新 pageCount 和 pageIndex
watch(route, () => {
  isCalc.value = true;
  pagination.value.updateProps();
  fetchData();
});

let pageCount = ref<number>(2);

/**
 * 触发左或右时，该函数获取 page 对象，包含当前分类的总页数以及当前页数 index
 * @param page 子组件传递到父组件的当前分页情况
 */
function floatChange(page: any) {
  fetchData(
    pages => {
      if (isCalc) {
        // 获取 pages，即分页情况，只获取第一次，页面第一页默认时没有分页情况，只有第二页才有
        pageCount.value = parseInt(pages[pages.length - 1]);
        // 如果页数总数只有 1 页，防止错误发生，将变量设置为 2
        if (pageCount.value === 1) pageCount.value = 2;
        isCalc.value = false;
      }
    },
    isCalc.value,
    page.currentIndex
  );
}

/**
 * 固定分页点击之后时触发
 * @param page 子组件传递到父组件的当前分页情况
 */
function fixedChange(page: any) {
  fetchData(null, false, page.currentIndex);
}
</script>

<template>
  <div id="category">
    <Pagination ref="pagination" @fixed-change="fixedChange" @float-change="floatChange" :page-count="pageCount">
      <template #content>
        <div class="fsz-1.25 mx-1.3 mt-1 mb-3">{{ label }}</div>
        <EssayItem v-if="data" :data="data" />
      </template>
    </Pagination>
  </div>
</template>
