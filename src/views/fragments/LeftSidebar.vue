<script setup lang="ts">
import { $ref } from "vue/macros";
import { useRouter } from "vue-router";
import * as Api from "../../utils/api";
import Config from "../../config";

const side = Config.__LITE_CONFIG__.side;
const router = useRouter();

function nav(path: string, out?: boolean) {
  if (out) window.open(path, "__blank");
  else router.push(path);
}

let categories = $ref<any>();
let tags = $ref<any>();
let blogger = $ref<any>();
let blogInfo = $ref<any>();
let toplist = $ref<any>();
let loading = $ref(true);

Api.getSideBlogerInfo(res => {
  blogger = res;
  Api.getSideBlogInfo(res => {
    blogInfo = res;
    Api.getSideCategories(res => {
      tags = res.tags;
      categories = res.categories;
      loading = false;
      Api.getSideTopList(res => {
        toplist = res;
      });
    });
  });
});

const tabName = $ref("随笔");
</script>

<template>
  <div class="left-side" v-loading="loading">
    <Card padding="1px 20px">
      <SideItem class="blogger" text="博客信息">
        <template #icon>
          <el-icon style="margin-right: 5px">
            <House />
          </el-icon>
        </template>
        <div v-if="side?.avatar" class="avatar">
          <el-tooltip effect="dark" placement="right">
            <img alt="FAILED" :src="side?.avatar" />
            <template #content>
              <div v-if="side?.signature" v-html="side.signature" />
              <div v-else>这个人很懒，什么也没有留下</div>
            </template>
          </el-tooltip>
        </div>
        <div class="item" v-for="(item, index) in blogger" :key="index">
          <div class="text" @click="nav(item.href, true)">
            <div v-if="index === 0">
              <el-icon class="icon">
                <UserFilled />
              </el-icon>
              昵称：{{ item.text }}
            </div>
            <div v-if="index === 1">
              <el-icon class="icon">
                <Clock />
              </el-icon>
              园龄：{{ item.text }}
            </div>
            <div v-if="index === 2">
              <el-icon class="icon">
                <StarFilled />
              </el-icon>
              粉丝：{{ item.text }}
            </div>
            <div v-if="index === 3">
              <el-icon class="icon">
                <BellFilled />
              </el-icon>
              关注：{{ item.text }}
            </div>
          </div>
        </div>
        <el-tooltip effect="dark" placement="bottom">
          <template #content>
            暂时没有更多数据...
          </template>
          <div class="blog-data">
            <span v-for="(item, index) in blogInfo" :key="index">{{ item }}</span>
          </div>
        </el-tooltip>
      </SideItem>
      <el-tabs type="card" v-model="tabName">
        <el-tab-pane label="随笔" name="随笔">
          <template #label>
            <div class="flex-align-center flex-justify-center">
              <el-icon style="margin-right: 5px">
                <Folder />
              </el-icon>
              <div>随笔</div>
            </div>
          </template>
          <div class="item" v-for="(item, index) in categories" :key="index">
            <div class="text" @click="nav('/c/' + item.id + '/1')">
              {{ item.text }}
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="标签" name="标签">
          <template #label>
            <div class="flex-align-center flex-justify-center">
              <el-icon style="margin-right: 5px">
                <CollectionTag />
              </el-icon>
              <div>标签</div>
            </div>
          </template>
          <div class="item" v-for="(item, index) in tags" :key="index">
            <div class="text" @click="nav('/t/' + item.id)">
              {{ item.text }}
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <SideItem text="阅读排行榜">
        <template #icon>
          <el-icon style="margin-right: 5px">
            <DCaret />
          </el-icon>
        </template>
        <div class="item" v-for="(item, index) in toplist" :key="index">
          <div class="text" @click="nav('/e/' + item.id)">
            {{ item.text }}
          </div>
        </div>
      </SideItem>
    </Card>
  </div>
</template>

<style scoped lang="scss">
@import "../../scss/mixins";

.left-side {
  color: #878787;
  position: absolute;
  top: 10vh;
  left: 10vw;
  width: 13.5vw;
  height: 90vh;
  background-color: #252525;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #a7a7a7;
  }

  .blogger {
    margin-bottom: 20px;

    .avatar {
      margin: 20px 0;
      @include flex();

      img {
        width: 80px;
        height: 80px;
        border-radius: 50px;
        object-fit: cover;
        cursor: pointer;
      }
    }

    .blog-data {
      cursor: pointer;
      font-size: 14px;
      margin-top: 10px;
    }
  }

  .item {
    margin: 10px 0;
    font-size: 14px;
    word-break: break-all;

    .text {
      cursor: pointer;
      @include ahover();
    }
  }
}
</style>
