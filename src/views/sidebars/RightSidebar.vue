<script setup lang="ts">
import { watch } from "vue";
import { $ref } from "vue/macros";
import { useRoute } from "vue-router";
import { useAnchorStore } from "../../store";
import { RouteName } from "../../utils/route-helper";
import Config from "../../config";

const route = useRoute();
const links = Config.__LITE_CONFIG__.links;
const books = Config.__LITE_CONFIG__.books;

let anchors = $ref<any>();
const anchorsStore = useAnchorStore();
anchorsStore.$onAction(({ store, args }) => {
  anchors = args[0];
}, true);

watch(route, (value, oldValue, onCleanup) => {
  if (value.name === RouteName.HOME) anchors = [];
});
</script>

<template>
  <div class="right-side">
    <Card padding="1px 20px">
      <SideItem text="随笔目录" v-if="anchors && anchors.length > 0">
        <template #icon>
          <el-icon style="margin-right: 5px">
            <Location />
          </el-icon>
        </template>
        <div class="catalog">
          <div class="item" v-for="(item, index) in anchors" :key="index" v-html="item.content" />
        </div>
      </SideItem>
      <SideItem text="我的技术栈" v-if="Config.__LITE_CONFIG__.graph">
        <template #icon>
          <el-icon style="margin-right: 5px">
            <Aim />
          </el-icon>
        </template>
        <SkillGraph />
      </SideItem>
      <SideItem text="常用链接" v-if="links && links.length > 0">
        <template #icon>
          <el-icon style="margin-right: 5px">
            <Link />
          </el-icon>
        </template>
        <div class="link" v-for="(item, index) in links" :key="index">
          <el-tooltip
            v-if="item.tip"
            effect="dark"
            :content="item.tip"
            placement="right"
          >
            <a :href="item.href" target="_blank">{{ item.text }}</a>
          </el-tooltip>
          <a v-else :href="item.href" target="_blank">{{ item.text }}</a>
        </div>
      </SideItem>
      <SideItem text="推荐书籍" v-if="books && books.length > 0">
        <template #icon>
          <el-icon style="margin-right: 5px">
            <Notebook />
          </el-icon>
        </template>
        <div class="book" v-for="(item, index) in books" :key="index">
          <img :src="item.img" alt="FAILED" />
          <div class="text">
            <span v-if="!item.href">{{ item.text }}</span>
            <a v-else :href="item.href" target="_blank">{{ item.text }}</a>
            <div class="author">{{ item.author }}</div>
            <el-rate
              style="width: 100%"
              v-model="item.rate"
              disabled
              size="small"
            />
          </div>
        </div>
      </SideItem>
    </Card>
  </div>
</template>

<style lang="scss">
@import "../../scss/mixins";

.catalog {
  .item {
    margin-bottom: 7px;
    word-break: break-all;
    font-size: 14px;

    a {
      color: #878787;
      @include ahover();
    }
  }
}
</style>

<style scoped lang="scss">
@import "../../scss/mixins";

.right-side {
  color: #878787;
  position: absolute;
  top: 10vh;
  right: 10vw;
  width: 13.5vw;
  height: 90vh;
  overflow: auto;
  background-color: #252525;

  &::-webkit-scrollbar {
    display: none;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #a7a7a7;
  }

  .link {
    word-break: break-all;
    font-size: 14px;
    margin: 10px 0 0 0;

    a {
      @include ahover();
    }
  }

  .book {
    margin: 10px 0 0 0;
    @include flex($justify: flex-start);
    font-size: 14px;

    & > div {
      margin-left: 8px;
    }

    .text {
      word-break: break-all;
      width: calc(100% - 3.8vw - 8px);
    }

    .author {
      margin-top: 4px;
      font-size: 12px;
    }

    a {
      @include ahover();
    }

    img {
      height: 9vh;
      object-fit: cover;
      width: 3.8vw;
      border-radius: 6px;
    }
  }
}
</style>
