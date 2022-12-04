<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import * as Api from "../utils/api";

const route = useRoute();
const router = useRouter();

let taglist = ref();
let tagname = "";

Api.getTagPageList(String(route.params.tagName), res => {
  tagname = res.title;
  taglist.value = res.list;
});
</script>

<template>
  <div class="tagpage">
    <div class="tagname">{{ tagname }}</div>
    <div class="taglist">
      <Card class="item" v-for="(item, index) in taglist" :key="index" width="48.7%" height="auto" margin="5px">
        <div class="name">
          <router-link :to="{path: '/e', params: {id: item.id}}">{{ item.title }}</router-link>
        </div>
        <div class="browse">
          <el-icon>
            <CaretRight />
          </el-icon>
          <router-link :to="{path: '/e', params: {id: item.id}}">阅读全文</router-link>
        </div>
        <div class="desc">
          <EssayBottomData :data="{
            date: item.date,
            viewCount: item.viewCount,
            commCount: item.commCount,
            diggCount: item.diggCount
          }" />
        </div>
      </Card>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../scss/mixins";

.tagpage {
  .tagname {
    font-size: 20px;
    margin: 10px 20px 10px 5px;
  }

  .taglist {
    @include flex($justify: space-between, $items: stretch, $content: stretch);

    .item {
      .name {
        font-size: 20px;
        word-break: break-all;

        a {
          @include ahover();
        }
      }

      .browse {
        margin-top: 20px;
        @include flex($justify: flex-start);

        a {
          border-bottom: 1px dotted #cccccc;
          padding-bottom: 2px;

          @include ahover() {
            border-bottom: 1px dotted var(--el-color-primary);
          }
        }
      }

      .desc {
        word-break: break-all;
        margin-top: 20px;
      }
    }
  }
}
</style>