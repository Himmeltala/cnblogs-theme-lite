<script setup lang="ts">
import { PropType, ref, watch } from "vue";
import { useRouter } from "vue-router";
import * as Api from "../utils/api";
import * as DataType from "../types/data-type";
import { manageLoader } from "../utils/loader";

const props = defineProps({
  type: {
    type: String as PropType<"Category" | "Home">,
    required: true
  },
  id: {
    type: String
  },
  page: {
    type: String
  }
});

const router = useRouter();

let loading = ref(true);
let essays = ref<Array<DataType.Essay>>();
let categories = ref();
let pages = ref();
let currentIndex = ref(1);
let pageCount = ref(0);
let calcPage = ref(false);

watch(() => props.id, () => {
  loading.value = true;
  fetchData(props.id, 1, true);
});

function fetchData(id: any, index: number, calc: boolean, complete?: Function) {
  if (id) {
    Api.getCategories(id, calc, index, res => {
      categories.value = res.category;
      essays.value = res.list;
      pages.value = res.pages;
      if (calc) pageCount.value = parseInt(res.pages[res.pages.length - 1]);
      loading.value = false;
      if (complete) complete();
    });
  } else {
    Api.getEssayList(index, calc, res => {
      essays.value = res.list;
      pages.value = res.pages;
      if (calc) pageCount.value = parseInt(res.pages[res.pages.length - 1]);
      loading.value = false;
      if (complete) complete();
    });
  }
}

if (props.type === "Category") {
  fetchData(props.id, parseInt(props.page!), true, () => {
    manageLoader();
  });
} else if (props.type === "Home") {
  fetchData(false, 1, false, () => {
    manageLoader();
  });
}

function nav(path: string, out?: boolean) {
  if (out) window.open(path, "__blank");
  else router.push(path);
}

function floatSorterChange(direction: "left" | "right") {
  loading.value = true;
  if (direction === "right") currentIndex.value++;
  else if (direction === "left") currentIndex.value--;
  pageCount.value ? (calcPage.value = false) : (calcPage.value = true);
  fetchData(props.id, currentIndex.value, calcPage.value);
}

function fixedSorterChange() {
  loading.value = true;
  pageCount.value ? (calcPage.value = false) : (calcPage.value = true);
  fetchData(props.id, currentIndex.value, calcPage.value);
}
</script>

<template>
  <div class="common">
    <div class="pagination pg-top" v-if="currentIndex > 1 && pageCount > 1">
      <el-pagination
        @current-change="fixedSorterChange"
        v-model:current-page="currentIndex"
        v-model:page-count="pageCount"
        :background="true"
        layout="prev, pager, next, jumper" />
    </div>
    <el-skeleton style="margin-top: 10px" :loading="loading" animated>
      <template #template>
        <Card v-for="item in 10" :key="item" width="auto" padding="15px 25px"
              margin="12px 10px 12px 10px">
          <el-skeleton-item variant="p" style="width: 60%" />
          <div style="display: flex; align-items: center">
            <el-skeleton-item variant="text" style="margin-right: 16px; margin-top: 8px" />
            <el-skeleton-item variant="text" style="margin-right: 16px; margin-top: 8px" />
            <el-skeleton-item variant="text" style="width: 30%; margin-top: 8px" />
          </div>
          <el-skeleton-item v-for="i in 6" :key="i" variant="text" style="width: 100%; margin-top: 8px" />
          <el-skeleton-item variant="text" style="width: 100%" />
          <div style="display: flex; align-items: center; justify-content: flex-end; width: 100%">
            <el-skeleton-item variant="text" style="width: 30%; margin-top: 4px" />
          </div>
        </Card>
      </template>
    </el-skeleton>
    <div v-show="currentIndex > 1" class="left-sorter float-sorter" @click="floatSorterChange('left')">
      <el-tooltip
        effect="dark"
        content="上一页"
        placement="left"
      >
        <el-icon>
          <ArrowLeftBold />
        </el-icon>
      </el-tooltip>
    </div>
    <div class="category" v-if="categories">{{ categories }}</div>
    <div class="essay">
      <Card class="item"
            v-for="(item, index) in essays" :key="index"
            v-if="!loading"
            width="auto"
            padding="15px 25px">
        <div class="essay__vessel">
          <div class="packer">
            <div class="header">
              <el-image v-if="index % 2 !== 0 && item.surface" class="cover" :src="item.surface" fit="cover" />
              <div class="header__middle" :class="{ 'nocover': !item.surface }">
                <div class="title" @click="nav('/e/' + item.id)">{{ item.text }}</div>
                <div class="desc">{{ item.desc }}</div>
              </div>
              <el-image v-if="index % 2 === 0 && item.surface" class="cover" :src="item.surface" fit="cover" />
            </div>
            <div class="browse">
              <el-icon>
                <CaretRight />
              </el-icon>
              <router-link :to="'/e/' + item.id">阅读全文</router-link>
            </div>
            <div class="bottom">
              <EssayBottomData
                :data="{date: item.date,
               view: item.view,
                comm: item.comm,
                 digg: item.digg}" />
            </div>
          </div>
        </div>
      </Card>
    </div>
    <div class="right-sorter float-sorter" v-if="(pageCount > 1 || pageCount === 0) && currentIndex !== pageCount"
         @click="floatSorterChange('right')">
      <el-tooltip
        effect="dark"
        content="下一页"
        placement="left"
      >
        <el-icon>
          <ArrowRightBold />
        </el-icon>
      </el-tooltip>
    </div>
    <div class="pagination" v-if="pageCount > 1">
      <el-pagination
        @current-change="fixedSorterChange"
        v-show="pageCount"
        v-model:current-page="currentIndex"
        v-model:page-count="pageCount"
        :background="true"
        layout="prev, pager, next, jumper" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../scss/mixins.scss";

$border-radius: 6px;

.common {
  position: relative;

  .float-sorter {
    position: fixed;
    font-size: 10px;
    width: 15px;
    height: 30px;
    background-color: #3c3c3c;
    z-index: 999;
    cursor: pointer;
    opacity: 0.6;
    @include flex();
    @include ahover() {
      opacity: 1;
    }
  }

  .left-sorter {
    border-radius: 60px 0 0 60px;
    left: calc(20vw + 54px);
    top: 50vh;
  }

  .right-sorter {
    border-radius: 0 60px 60px 0;
    right: calc(20vw + 54px);
    top: 50vh;
  }
}

.category {
  font-size: 20px;
  margin: 10px 12px;
}

.essay {
  .item:nth-child(1) {
    margin: 0 10px 12px 10px;
  }

  .item {
    padding: 15px 25px;
    margin: 12px 10px 12px 10px;

    .essay__vessel {
      @include flex($justify: space-between, $wrap: nowrap);

      .cover {
        border-radius: $border-radius;
        width: 25%;
        height: 150px;
      }

      .packer {
        .nocover {
          width: 100% !important;
        }

        .header {
          @include flex($justify: space-between);

          .header__middle {
            width: 73%;

            .title {
              cursor: pointer;
              font-size: 20px;
              letter-spacing: 1px;

              @include ahover();
            }

            .desc {
              color: #878787;
              padding: 10px 0 15px 0;
              font-size: 17px;
              letter-spacing: 0.6px;
            }

            .title,
            .desc {
              word-break: break-all;
              line-height: 1.4;
            }
          }

          .cover {
            border-radius: $border-radius;
            width: 25%;
            height: 160px;
          }
        }

        .browse {
          font-size: 14px;
          @include flex($justify: flex-start);
          margin: 15px 0;

          a {
            margin-left: 3px;
            border-bottom: 1px dotted #cccccc;

            @include ahover() {
              border-bottom: 1px dotted var(--el-color-primary);
            }
          }
        }

        .bottom {
          font-size: 14px;
          @include flex($justify: flex-end);
        }
      }
    }
  }
}

.pagination {
  margin-bottom: 10px;
  @include flex($justify: flex-end);
}

.pg-top {
  margin-top: 10px;
}
</style>
