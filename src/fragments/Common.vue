<script setup lang="ts">
import { $ref } from "vue/macros";
import { PropType, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import * as RemoteApi from "../utils/api";
import * as LocalApi from "../utils/local-api";
import * as DataType from "../types/data-type";
import { RouteName } from "../utils/route-helper";
import { closeLoader } from "../utils/loader";
import { useRouterStore } from "../store";

const props = defineProps({
  id: { type: String },
  type: { type: String as PropType<RouteName.CATEGORY | RouteName.HOME>, required: true },
  page: { type: String },
  data: { type: Array as PropType<Array<DataType.Essay>>, required: true }
});

const router = useRouter();
const route = useRoute();

let loading = $ref(true);
let calcPage = $ref(false);
let rubric = $ref<any>();
let pages = $ref<any>();
let currentIndex = $ref(1);
let pageCount = $ref(0);
let essays = $ref<Array<DataType.Essay>>();

const routerStore = useRouterStore();

routerStore.$onAction(({ store, args }) => {
  if (args[0] === RouteName.HOME) {
    fetchData(false, currentIndex, calcPage, () => closeLoader());
  }
});

if (props.type === RouteName.CATEGORY) fetchData(props.id, 1, calcPage, () => closeLoader());
else if (props.type === RouteName.HOME) {
  let data = LocalApi.getEssayList().list;
  (data.length > 0 && (essays = data)) || fetchData(false, currentIndex, calcPage, () => closeLoader());
  loading = false;
  closeLoader();
}

function fetchData(id: any, index: number, calc: boolean, complete?: Function) {
  if (id) {
    RemoteApi.getCategories(id, calc, index, res => {
      rubric = res.label;
      essays = res.list;
      pages = res.pages;
      calc && (pageCount = parseInt(res.pages[res.pages.length - 1]));
      loading = false;
      complete && complete();
    });
  } else {
    RemoteApi.getEssayList(index, calc, res => {
      essays = res.list;
      pages = res.pages;
      calc && (pageCount = parseInt(res.pages[res.pages.length - 1]));
      loading = false;
      complete && complete();
    });
  }
}

function nav(path: string, out?: boolean) {
  if (out) window.open(path, "_blank");
  else router.push(path);
}

function floatSorterChange(direction: "left" | "right") {
  loading = true;
  if (direction === "right") currentIndex++;
  else if (direction === "left") currentIndex--;
  pageCount ? (calcPage = false) : (calcPage = true);
  fetchData(props.id, currentIndex, calcPage);
}

function fixedSorterChange() {
  loading = true;
  pageCount ? (calcPage = false) : (calcPage = true);
  fetchData(props.id, currentIndex, calcPage);
}
</script>

<template>
  <div class="common">
    <div class="pagination pg-top" v-if="currentIndex > 1 && pageCount >= 1">
      <el-pagination
        @current-change="fixedSorterChange"
        v-model:current-page="currentIndex"
        v-model:page-count="pageCount"
        :background="true"
        layout="prev, pager, next, jumper"
      />
    </div>
    <el-skeleton style="margin-top: 10px" :loading="loading" animated>
      <template #template>
        <Card v-for="item in 10" :key="item" width="auto" padding="15px 25px"
              margin="12px 10px 12px 10px"
        >
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
      <el-tooltip effect="dark" content="上一页" placement="left">
        <el-icon>
          <ArrowLeftBold />
        </el-icon>
      </el-tooltip>
    </div>
    <div class="category" v-if="rubric">{{ rubric }}</div>
    <div class="essay">
      <Card class="item"
            v-for="(item, index) in essays" :key="index"
            v-if="!loading"
            width="auto"
            padding="15px 25px"
      >
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
              <EssayBottomData :data="{date: item.date, comm: item.comm, digg: item.digg, view: item.view}" />
            </div>
          </div>
        </div>
      </Card>
    </div>
    <div class="right-sorter float-sorter"
         @click="floatSorterChange('right')"
    >
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
    <div class="pagination" v-if="pageCount >= 1">
      <el-pagination
        @current-change="fixedSorterChange"
        v-show="pageCount"
        v-model:current-page="currentIndex"
        v-model:page-count="pageCount"
        :background="true"
        layout="prev, pager, next, jumper"
      />
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
    left: calc(23.5vw);
    top: 50vh;
  }

  .right-sorter {
    border-radius: 0 60px 60px 0;
    right: calc(23.5vw);
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
              padding: 10px 0 10px 0;
              font-size: 16px;
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
          margin: 15px 0 5px 0;

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
