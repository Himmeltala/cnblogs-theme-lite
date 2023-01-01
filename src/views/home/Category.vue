<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { watch } from "vue";
import { $ref } from "vue/macros";
import * as DataType from "../../types/data-type";
import * as RemoteApi from "../../utils/api";
import { closeLoader } from "../../utils/loader";

const router = useRouter();
const route = useRoute();

let data = $ref<Array<DataType.Essay>>();
let label = $ref<any>();
let pages = $ref<any>();
let rubric = $ref<any>();
let loading = $ref<boolean>(true);

function fetchData(complete?: Function) {
  loading = true;
  RemoteApi.getCategories(route.params.id, true, route.params.page, res => {
    data = res.list;
    pages = res.pages;
    rubric = res.label;
    loading = false;
    complete && complete();
  });
}

function nav(path: string, out?: boolean) {
  if (out) window.open(path, "_blank");
  else router.push(path);
}

fetchData(() => {
  closeLoader();
});

watch(route, () => {
  fetchData();
});
</script>

<template>
  <div class="category">
    <Common>
      <template #loading>
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
      </template>
      <template #content>
        <div class="label">{{ rubric }}</div>
        <div class="category">
          <Card class="item"
                v-if="!loading"
                width="auto"
                padding="15px 25px"
                v-for="(item, index) in data" :key="index"
          >
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
            <EssayBottomData align="flex-end"
                             :data="{date: item.date, comm: item.comm, digg: item.digg, view: item.view}" />
          </Card>
        </div>
      </template>
    </Common>
  </div>
</template>

<style scoped lang="scss">
@import "../../scss/mixins";

.category {
  .label {
    font-size: 20px;
    margin: 5px 10px 12px 10px;
  }

  .item:nth-child(1) {
    margin: 0 10px 12px 10px;
  }

  .item {
    padding: 15px 25px;
    margin: 12px 10px 12px 10px;

    .cover {
      border-radius: 6px;
      width: 25%;
      height: 150px;
    }

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
        border-radius: 6px;
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

      .bottom {
        font-size: 14px;
        @include flex($justify: flex-end);
      }
    }
  }
}
</style>